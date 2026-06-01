import { NextResponse } from "next/server";
import { pandals } from "@/frontend/lib/mockData";

// Coordinate mappings for 93 pandals to support distance-based proximity calculations
const coordinates: Record<string, { lat: number; lng: number }> = {
  // Behala / South
  "south-1": { lat: 22.4984, lng: 88.3129 },
  "south-2": { lat: 22.5015, lng: 88.3185 },
  "south-3": { lat: 22.4962, lng: 88.3095 },
  "south-4": { lat: 22.5028, lng: 88.3102 },
  "south-5": { lat: 22.5110, lng: 88.3245 },
  "south-6": { lat: 22.5105, lng: 88.3210 },
  "south-7": { lat: 22.5167, lng: 88.3618 },
  "south-8": { lat: 22.5080, lng: 88.3300 },
  "south-9": { lat: 22.4842, lng: 88.3456 },
  "south-10": { lat: 22.5204, lng: 88.3468 }, // Badamtala
  "south-12": { lat: 22.5150, lng: 88.3475 }, // Suruchi Sangha
  "south-14": { lat: 22.5280, lng: 88.3580 }, // Maddox Square
  
  // North / Sreebhumi
  "north-1": { lat: 22.6128, lng: 88.4015 }, // Sreebhumi
  "north-2": { lat: 22.6015, lng: 88.3750 },
  "north-3": { lat: 22.5990, lng: 88.3712 },
  "north-24": { lat: 22.6020, lng: 88.3880 },
  "north-31": { lat: 22.5985, lng: 88.4095 }, // Dum Dum Park Yubak Brinda
  "north-32": { lat: 22.5978, lng: 88.4080 }, // Dum Dum Park Bharat Chakra
  "north-33": { lat: 22.5992, lng: 88.4065 }, // Dum Dum Park Tarun Sangha
  
  // Bonedi Bari
  "bonedi-1": { lat: 22.5960, lng: 88.3610 }, // Sovabazar Rajbari
  "bonedi-2": { lat: 22.5972, lng: 88.3590 },
  "bonedi-3": { lat: 22.5680, lng: 88.3520 }, // Laha Bari
  "bonedi-4": { lat: 22.5645, lng: 88.3485 }
};

// Fallback coordinate mappings based on zone category if not explicitly listed
const zoneCoordinates: Record<string, { lat: number; lng: number }> = {
  "south-kolkata": { lat: 22.5150, lng: 88.3500 },
  "north-kolkata": { lat: 22.6000, lng: 88.3850 },
  "bonedi-bari": { lat: 22.5850, lng: 88.3550 }
};

// Custom themes for pandals to enrich recommendations dynamically
const pandalThemes: Record<string, string> = {
  "south-1": "Traditional Clay Work & Terracotta Art",
  "south-2": "Village Folk Heritage & Santhal Puppetry",
  "south-10": "Glowing Paper Lanterns & Hand-woven Crafts",
  "south-12": "Socio-Environmental Eco-green Forest Sanctuary",
  "south-14": "Heritage Nostalgia & Massive Mela Canopy",
  "north-1": "Royal Palace Glass Palace of Mysore",
  "north-31": "Clay lamps & Vedic Sound Vibration acoustics",
  "north-32": "Copper Sculptures & Ancient Metalware Artistry",
  "north-33": "Golden Temple Replica & Glowing Diyas",
  "bonedi-1": "Zamina Household Vintage Chandelier Heritage",
  "bonedi-3": "Vintage Gold Ornaments & Traditional Durga Idol"
};

const defaultThemes = [
  "Traditional Clay Craftsmanship & Hand-woven Weaves",
  "Spectacular Neon lighting & Traditional Dhaaki themes",
  "Vintage Bonedi Heritage Architecture & Royal Lanterns",
  "Eco-friendly Terracotta Art & Glowing Diya lamps"
];

// Helper to calculate distance in km using the Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Helper to calculate live crowd level based on TomTom traffic data
async function getLiveCrowdLevel(lat: number, lng: number): Promise<string> {
  const apiKey = process.env.TOMTOM_API_KEY;
  if (!apiKey) {
    return getFallbackCrowdLevel();
  }

  try {
    const url = `https://api.tomtom.com/traffic/services/4/flowSegmentData/relative/10/json?key=${apiKey}&point=${lat},${lng}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(`TomTom API responded with status ${res.status}`);

    const data = await res.json();
    const flowData = data.flowSegmentData;

    if (flowData && flowData.currentSpeed !== undefined && flowData.freeFlowSpeed !== undefined) {
      const current = flowData.currentSpeed;
      const freeFlow = flowData.freeFlowSpeed;

      if (freeFlow > 0) {
        const ratio = current / freeFlow;
        if (ratio < 0.4) {
          return "High";
        } else if (ratio < 0.75) {
          return "Medium";
        } else {
          return "Low";
        }
      }
    }
  } catch (err) {
    console.error("TomTom live crowd calculation failed inside chatbot, falling back:", err);
  }

  return getFallbackCrowdLevel();
}

function getFallbackCrowdLevel(): string {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + istOffset);
  const hour = istTime.getUTCHours();

  if (hour >= 5 && hour < 12) {
    return "Low";
  } else if (hour >= 12 && hour < 17) {
    return "Medium";
  } else {
    return "High";
  }
}

export async function POST(request: Request) {
  try {
    const { messages, visitedIds } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages thread is required" }, { status: 400 });
    }

    // Determine current time in Kolkata for time constraint math
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    const formattedTime = istTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    const visitedSet = new Set<string>(visitedIds || []);

    // Build dynamic catalog and coordinate text to inject in system prompt
    const catalogText = pandals
      .map((p) => {
        const theme = pandalThemes[p.id] || defaultThemes[Math.floor(p.name.length % defaultThemes.length)];
        const coords = coordinates[p.id] || zoneCoordinates[p.category];
        const visitedStatus = visitedSet.has(p.id) ? "Already Visited" : "Unvisited";
        return `- ID: "${p.id}", Name: "${p.name}", Zone: "${p.category}", Location: "${p.location}", Theme: "${theme}", Status: "${visitedStatus}", Coordinates: (${coords.lat}, ${coords.lng})`;
      })
      .join("\n");

    const systemPrompt = `You are a warm, wise, traditional, and deeply caring Bengali grandmother navigation companion named 'Dugga-Dugga Thakuma'.
Your purpose is to guide Durga Puja explorers ("bacha" or my child) as they navigate Kolkata's monumental pandals.
You speak with maternal love, warmth, and wisdom, frequently using affectionate Bengali terms like "Bacha" (my child), "Thakur Darshan" (idol viewing), "Dugga-Dugga!" (safe travels), "Cholo" (let's go), "Abar hete?" (walking again?), and "Maa Durga".

Current active Kolkata local time is: ${formattedTime} (autumn festive night).
User's completed Pandal IDs: [${Array.from(visitedSet).join(", ")}].

Here is the COMPLETE active catalog of Kolkata's 93 Durga Puja Pandals:
${catalogText}

### CRITICAL NAVIGATIONAL MATH GUIDELINES:
1. Distance is computed using spatial math. If a user asks for pandals around/near a specific location (e.g. Sreebhumi, which has ID "north-1" at coordinates 22.6128, 88.4015):
   * Look up coordinates for the starting point.
   * Recommend unvisited pandals in the SAME zone (North Kolkata, South Kolkata, or Bonedi Bari) that are physically close.
   * Dum Dum Park zones (north-31, north-32, north-33) are extremely close to Sreebhumi (north-1), walking takes only 5-10 minutes.
   * Distance <= 0.8 km is Walkable (walk minutes = distance * 12).
   * Distance > 0.8 km requires Auto/Drive (drive minutes = distance * 5).
2. Time Constraints:
   * Bengalis love hopping all night, but if the user has a curfew or needs to get home (e.g. home is 2 hours away, and it is 10:30 PM), calculate carefully!
   * Tell them honestly if they have enough time to visit specific nearby pandals before their home journey.
   * Advise them to prioritize the closest, highest-value unvisited pandals so they don't get stuck in peak traffic (which is High between 5 PM - 3 AM).

### OUTPUT RULES:
- Keep your answers highly engaging, conversational, and warm. Under 140 words is best for chat bubbles.
- Bold key names and crowd levels (e.g., **Sreebhumi**, **High Crowd**).
- If you recommend one specific next pandal for them to visit, you MUST append '[RECOMMEND: pandal-id]' at the very end of your response, replacing 'pandal-id' with the actual ID from the list (e.g. '[RECOMMEND: north-31]'). Only recommend one specific pandal ID at the end. If no specific next stop is decided, do not append it.`;

    const groqKey = process.env.GROQ_API_KEY || process.env.GROK_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    let responseText = "";

    // 1. Try Groq API first (Llama-3.3-70b-versatile for sub-300ms speed!)
    if (groqKey) {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${groqKey}`
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: systemPrompt },
              ...messages.map((m: { role: string; content: string }) => ({ role: m.role, content: m.content }))
            ],
            temperature: 0.6,
            max_tokens: 450
          }),
          signal: AbortSignal.timeout(6000) // 6 second timeout for speed guarantee
        });

        if (response.ok) {
          const data = await response.json();
          responseText = data.choices?.[0]?.message?.content || "";
          console.log("[Groq AI Chatbot] Successfully generated dynamic Thakuma response.");
        } else {
          console.warn(`Groq API responded with status ${response.status}. Falling back to Gemini.`);
        }
      } catch (err) {
        console.error("Groq AI chatbot request failed, attempting Gemini fallback:", err);
      }
    }

    // 2. Try Gemini API fallback if Groq failed/was missing
    if (!responseText && geminiKey) {
      try {
        // Construct single prompt thread for Gemini
        const chatContext = messages
          .map((m: { role: string; content: string }) => `${m.role === "user" ? "Explorer" : "Thakuma"}: ${m.content}`)
          .join("\n");
        const fullPrompt = `${systemPrompt}\n\nConversation History:\n${chatContext}\n\nResponse (as Thakuma):`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: fullPrompt }] }]
            }),
            signal: AbortSignal.timeout(6000)
          }
        );

        if (response.ok) {
          const data = await response.json();
          responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
          console.log("[Gemini AI Chatbot Fallback] Successfully generated Thakuma response.");
        }
      } catch (err) {
        console.error("Gemini AI chatbot fallback query failed:", err);
      }
    }

    // 3. Static traditional Thakuma fallback in case both APIs are rate-limited or offline
    if (!responseText) {
      responseText = "Dugga-Dugga! Bacha, Thakuma's connection to the heavens is currently offline, but my blessings are always with you. Keep walking safely, check your itinerary, and Maa Durga will guide your path! Bolo Dugga!";
    }

    // Extract dynamic recommendation ID if the LLM appended [RECOMMEND: pandal-id]
    let recommendedPandalId: string | null = null;
    const match = responseText.match(/\[RECOMMEND:\s*([a-zA-Z0-9-]+)\]/);
    if (match) {
      recommendedPandalId = match[1];
      // Clean the [RECOMMEND: ...] token out of the user-facing text
      responseText = responseText.replace(/\[RECOMMEND:\s*([a-zA-Z0-9-]+)\]/, "").trim();
    }

    // Calculate dynamic coordinates and live crowd info for the recommended card if extracted
    let recommendationObj = null;
    if (recommendedPandalId) {
      const matchPandal = pandals.find((p) => p.id === recommendedPandalId);
      if (matchPandal) {
        const coords = coordinates[recommendedPandalId] || zoneCoordinates[matchPandal.category];
        const liveCrowd = await getLiveCrowdLevel(coords.lat, coords.lng);
        
        let travelTime = "10 mins";
        // Calculate mock travel metadata if current location context exists in messages
        const lastUserMessage = [...messages].reverse().find((m: { role: string; content: string }) => m.role === "user")?.content || "";
        const currentMatch = pandals.find((p) => lastUserMessage.toLowerCase().includes(p.name.toLowerCase()));
        if (currentMatch) {
          const curCoords = coordinates[currentMatch.id] || zoneCoordinates[currentMatch.category];
          const dist = calculateDistance(curCoords.lat, curCoords.lng, coords.lat, coords.lng);
          if (dist <= 0.8) {
            travelTime = `walk just ${Math.max(3, Math.round(dist * 12))} mins (${Math.round(dist * 1000)}m)`;
          } else {
            travelTime = `drive for ${Math.max(5, Math.round(dist * 5))} mins (${dist.toFixed(1)} km)`;
          }
        }

        recommendationObj = {
          id: matchPandal.id,
          name: matchPandal.name,
          location: matchPandal.location,
          crowdLevel: liveCrowd,
          imageUrl: matchPandal.imageUrl,
          mapUrl: matchPandal.mapUrl,
          travelTime
        };
      }
    }

    return NextResponse.json({
      success: true,
      text: responseText,
      recommendation: recommendationObj
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
