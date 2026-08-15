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
  "south-10": { lat: 22.5204, lng: 88.3468 }, // Badamtala Ashar Sangha
  "south-12": { lat: 22.5150, lng: 88.3475 }, // Suruchi Sangha
  "south-14": { lat: 22.5280, lng: 88.3580 }, // Maddox Square
  
  // North / Sreebhumi
  "north-1": { lat: 22.6128, lng: 88.4015 }, // Sreebhumi Sporting Club
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
  "bonedi-4": { lat: 22.5645, lng: 88.3485 }  // Pathuriaghata Ghosh Bari
};

const zoneCoordinates: Record<string, { lat: number; lng: number }> = {
  "south-kolkata": { lat: 22.5150, lng: 88.3500 },
  "north-kolkata": { lat: 22.6000, lng: 88.3850 },
  "bonedi-bari": { lat: 22.5850, lng: 88.3550 }
};

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
  "bonedi-1": "Zamindari Household Vintage Chandelier Heritage",
  "bonedi-3": "Vintage Gold Ornaments & Traditional Durga Idol"
};

const defaultThemes = [
  "Traditional Clay Craftsmanship & Hand-woven Weaves",
  "Spectacular Neon lighting & Traditional Dhaaki themes",
  "Vintage Bonedi Heritage Architecture & Royal Lanterns",
  "Eco-friendly Terracotta Art & Glowing Diya lamps"
];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
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

async function getLiveCrowdLevel(lat: number, lng: number): Promise<string> {
  const apiKey = process.env.TOMTOM_API_KEY || "mDQOyEpPOUF23uZTosuVGhQ2bBv1mKNu";
  if (!apiKey) return getFallbackCrowdLevel();

  try {
    const url = `https://api.tomtom.com/traffic/services/4/flowSegmentData/relative/10/json?key=${apiKey}&point=${lat},${lng}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(`TomTom API status ${res.status}`);

    const data = await res.json();
    const flowData = data.flowSegmentData;

    if (flowData && flowData.currentSpeed !== undefined && flowData.freeFlowSpeed !== undefined) {
      const current = flowData.currentSpeed;
      const freeFlow = flowData.freeFlowSpeed;
      if (freeFlow > 0) {
        const ratio = current / freeFlow;
        if (ratio < 0.4) return "High";
        if (ratio < 0.75) return "Medium";
        return "Low";
      }
    }
  } catch (err) {
    console.error("TomTom crowd check error:", err);
  }

  return getFallbackCrowdLevel();
}

function getFallbackCrowdLevel(): string {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + istOffset);
  const hour = istTime.getUTCHours();

  if (hour >= 5 && hour < 12) return "Low";
  if (hour >= 12 && hour < 17) return "Medium";
  return "High";
}

export async function POST(request: Request) {
  try {
    const { messages, visitedIds } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages thread is required" }, { status: 400 });
    }

    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    const formattedTime = istTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    const visitedSet = new Set<string>(visitedIds || []);

    const catalogText = pandals
      .map((p) => {
        const theme = pandalThemes[p.id] || defaultThemes[Math.floor(p.name.length % defaultThemes.length)];
        const coords = coordinates[p.id] || zoneCoordinates[p.category];
        const visitedStatus = visitedSet.has(p.id) ? "Already Visited" : "Unvisited";
        return `- ID: "${p.id}", Name: "${p.name}", Zone: "${p.category}", Location: "${p.location}", Theme: "${theme}", Status: "${visitedStatus}", Coords: (${coords.lat}, ${coords.lng})`;
      })
      .join("\n");

    const systemPrompt = `You are Dugga-Dugga Thakuma 👵, the wise, affectionate, and deeply knowledgeable Bengali grandmother navigation companion for Kolkata's grandest festival: Durga Puja 2026.

### YOUR PERSONALITY & VOICE:
- You speak with profound maternal warmth, authentic Bengali culture, and genuine grandmotherly care.
- Frequently use loving terms like "Bacha" (my child), "Thakur Darshan" (idol viewing), "Dugga-Dugga!" (blessings for safe travel), "Maa Durga", "Cholo" (let's go), "Khaowa-Dawa" (feasting), "Bhog" (sacred food offering), "Dhunuchi Naach", and "Anjali".
- Provide GENUINE, authentic, detailed answers. If asked about Kolkata street food, metro routes, pandal history, or ritual traditions, share real insider Kolkata knowledge!

### CULTURAL & LOCAL KNOWLEDGE BANK:
- **Food & Feasting ("Khaowa-Dawa")**: Recommend legendary Kolkata spots nearby: Egg-Mutton Rolls at Nizam's or Kusum Rolls, Mutton Biryani at Arsalan/Royal/Aminia, Kabiraji Cutlet at Mitra Cafe, Paramount Sherbet at College Street, Rosogolla & Sandesh at K.C. Das & Balaram Mullick, and street-side Phuchka & Telebhaja.
- **Kolkata Metro & Transit**: Advise users on Sobhabazar Sutanuti Metro (for Sovabazar & North Bonedi Baris), Kalighat / Netaji Bhavan Metro (for Deshapriya Park, Tridhara, Chetla), Dum Dum / Belgachia Metro (for Sreebhumi & Dum Dum Park), and Esplanade (for Central Bonedi Baris).
- **Puja Traditions**: Explain Anjali on Maha Ashtami morning, Sandhi Puja (108 lotus flowers & 108 lamps at the juncture of Ashtami and Nabami), Dhunuchi Naach on Nabami evening, and Sindoor Khela & Bisharjan (immersion) on Dashami.

### CURRENT CONTEXT:
- Kolkata Local Time: ${formattedTime} IST.
- User's Completed Pandals: [${Array.from(visitedSet).join(", ")}].

### ACTIVE CATALOG OF KOLKATA'S 93 DURGA PUJA PANDALS:
${catalogText}

### SPATIAL & ROUTE GUIDELINES:
1. When asked for recommendations, suggest unvisited pandals in close geographical proximity.
2. Sreebhumi ("north-1") is close to Dum Dum Park ("north-31", "north-32", "north-33") — walking takes 10 mins.
3. Badamtala Ashar Sangha ("south-10") is right next to Suruchi Sangha ("south-12") and Mudiali.
4. Sovabazar Rajbari ("bonedi-1") is walking distance from Ahiritola & Kumartuli Park.

### OUTPUT FORMAT:
- Keep answers warm, detailed, accurate, and deeply helpful (approx. 120-180 words).
- Bold key pandals, metro stops, food spots, and crowd levels.
- If you recommend a specific next pandal, append '[RECOMMEND: pandal-id]' at the very end (e.g., '[RECOMMEND: north-31]').`;

    const groqKey = process.env.GROQ_API_KEY || process.env.GROK_API_KEY || "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";
    const geminiKey = process.env.GEMINI_API_KEY || "AQ.Ab8RN6KHSnFxvHYQSornxXfYh047zKMz1MG2HPjXwL482m0wMg";

    let responseText = "";

    // 1. Try Groq AI (Llama-3.3-70b-versatile)
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
            temperature: 0.7,
            max_tokens: 500
          }),
          signal: AbortSignal.timeout(7000)
        });

        if (response.ok) {
          const data = await response.json();
          responseText = data.choices?.[0]?.message?.content || "";
        }
      } catch (err) {
        console.error("Groq AI chatbot request failed, attempting Gemini fallback:", err);
      }
    }

    // 2. Gemini 2.5 Flash Fallback
    if (!responseText && geminiKey) {
      try {
        const chatContext = messages
          .map((m: { role: string; content: string }) => `${m.role === "user" ? "Explorer" : "Thakuma"}: ${m.content}`)
          .join("\n");
        const fullPrompt = `${systemPrompt}\n\nConversation History:\n${chatContext}\n\nResponse (as Thakuma):`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: fullPrompt }] }] }),
            signal: AbortSignal.timeout(7000)
          }
        );

        if (response.ok) {
          const data = await response.json();
          responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        }
      } catch (err) {
        console.error("Gemini AI chatbot fallback query failed:", err);
      }
    }

    if (!responseText) {
      responseText = "Dugga-Dugga, bacha! 👵 Thakuma's divine signal flickered for a second, but my heart is always with you. Tell me what pandals or food stops you're looking for, and Maa Durga will guide our journey! Bolo Dugga!";
    }

    // Extract dynamic recommendation ID if present
    let recommendedPandalId: string | null = null;
    const match = responseText.match(/\[RECOMMEND:\s*([a-zA-Z0-9-]+)\]/);
    if (match) {
      recommendedPandalId = match[1];
      responseText = responseText.replace(/\[RECOMMEND:\s*([a-zA-Z0-9-]+)\]/, "").trim();
    }

    let recommendationObj = null;
    if (recommendedPandalId) {
      const matchPandal = pandals.find((p) => p.id === recommendedPandalId);
      if (matchPandal) {
        const coords = coordinates[recommendedPandalId] || zoneCoordinates[matchPandal.category];
        const liveCrowd = await getLiveCrowdLevel(coords.lat, coords.lng);

        let travelTime = "10 mins";
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
