import { NextResponse } from "next/server";
import { pandals } from "@/frontend/lib/mockData";

// Coordinate mappings for 93 pandals to support distance-based proximity calculations
// If a pandal is not explicitly mapped, we fallback to coordinates based on its zone/location
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
        console.log(`[TomTom Live Traffic] Point: ${lat},${lng} | Speed Ratio: ${ratio.toFixed(2)} (${current}/${freeFlow} km/h)`);
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
    console.error("TomTom live crowd calculation failed, falling back to time-of-day simulation:", err);
  }

  return getFallbackCrowdLevel();
}

function getFallbackCrowdLevel(): string {
  const now = new Date();
  // Adjust to Indian Standard Time (IST: UTC + 5:30)
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
    const { currentPandalId, visitedIds } = await request.json();

    if (!currentPandalId) {
      return NextResponse.json({ error: "Current Pandal ID is required" }, { status: 400 });
    }

    const currentPandal = pandals.find((p) => p.id === currentPandalId);
    if (!currentPandal) {
      return NextResponse.json({ error: "Current Pandal not found" }, { status: 404 });
    }

    const visitedSet = new Set<string>(visitedIds || []);

    // Get current coordinates
    const currentCoords = coordinates[currentPandalId] || zoneCoordinates[currentPandal.category];

    // Filter and rank remaining unvisited pandals
    const candidates = pandals
      .filter((p) => p.id !== currentPandalId && !visitedSet.has(p.id))
      .map((p) => {
        const coords = coordinates[p.id] || zoneCoordinates[p.category];
        const distance = calculateDistance(
          currentCoords.lat,
          currentCoords.lng,
          coords.lat,
          coords.lng
        );

        // Score formulation: Closer is better, and boost based on category match & crowd safety
        let score = 10 / (distance + 0.1); // Avoid division by zero
        
        if (p.category === currentPandal.category) {
          score += 2; // Category match boost (keep them in the same zone)
        }
        
        if (p.crowdLevel === "Medium") {
          score += 1.5; // Medium crowd boost for easier hopping
        } else if (p.crowdLevel === "High") {
          score += 0.5;
        }

        return { pandal: p, distance, score };
      })
      .sort((a, b) => b.score - a.score);

    // Get the top recommendation
    const topMatch = candidates[0];

    if (!topMatch) {
      return NextResponse.json({
        success: true,
        message: "Dugga-Dugga! You have completed exploring all listed pandals. A truly grand achievement! Ashbe Bochor Abar Hobe!",
        completedAll: true
      });
    }

    const recPandal = topMatch.pandal;
    const distanceVal = topMatch.distance;

    // Form walk/drive description
    let travelTime = "";
    if (distanceVal <= 0.8) {
      const mins = Math.max(3, Math.round(distanceVal * 12));
      travelTime = `walk just ${mins} minutes (about ${Math.round(distanceVal * 1000)} meters)`;
    } else {
      const mins = Math.max(5, Math.round(distanceVal * 5));
      travelTime = `drive/auto for ${mins} minutes (about ${distanceVal.toFixed(1)} km)`;
    }

    const theme = pandalThemes[recPandal.id] || defaultThemes[Math.floor((recPandal.name.length) % defaultThemes.length)];
    
    // Get live crowd level from TomTom or fallback
    const recCoords = coordinates[recPandal.id] || zoneCoordinates[recPandal.category];
    const liveCrowd = await getLiveCrowdLevel(recCoords.lat, recCoords.lng);

    // Generate traditional Bengali recommendation description (Grok/Gemini fallback style)
    let aiText = "";

    const didiBlessings = [
      `Dugga-Dugga! Bacha (my child), since you are currently at **${currentPandal.name}**, you must make **${recPandal.name}** your next Thakur Darshan stop! It's just a quick ${travelTime} away. The crowd there is **${liveCrowd}** right now, so it's the perfect time to go. You will be absolutely mesmerized by their spectacular theme showcasing **${theme}** this year! Safe travels, and bolo Dugga!`,
      
      `Dugga-Dugga! Bacha, aami dekchi tumi **${currentPandal.name}**-e aacho. Cholo, ekhon **${recPandal.name}**-er dike jao! It is merely a ${travelTime} journey from here. With a **${liveCrowd}** crowd, you can explore their beautiful pandal very comfortably. Their exquisite theme of **${theme}** is a true visual feast! Safe travels, aar mathaye chepe jeo na!`,
      
      `Dugga-Dugga! Thakur Darshan is incomplete without visiting **${recPandal.name}** next, my child! From **${currentPandal.name}**, it will take you a ${travelTime}. The crowd level is **${liveCrowd}** right now, which is highly favorable. Go and experience their magnificent theme displaying **${theme}** this autumn! May Maa Durga bless your path, and Dugga-Dugga!`
    ];
    
    // Simulated high-fidelity intelligence response utilizing motherly Dugga Dugga tone
    aiText = didiBlessings[Math.floor((currentPandal.name.length + recPandal.name.length) % didiBlessings.length)];

    // Dynamic AI Check - Support live LLM generation securely in backend if key is set
    const apiKey = process.env.GROQ_API_KEY || process.env.GROK_API_KEY || process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const prompt = `You are a warm, wise traditional Bengali grandmother and navigator named 'Dugga-Dugga'. Write a highly engaging 2-sentence recommendation to go to next pandal. Current location: ${currentPandal.name}. Next Pandal: ${recPandal.name} (${travelTime} away, Live Crowd Level: ${liveCrowd}, Theme: ${theme}). Start with 'Dugga-Dugga!' and wish them safe travels. Keep it under 65 words.`;
        
        let responseText = "";
        
        if (process.env.GEMINI_API_KEY) {
          // Gemini REST fetch
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }]
            })
          });
          const data = await res.json();
          responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        } else {
          // Grok REST fetch (x.ai API)
          const res = await fetch("https://api.x.ai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${process.env.GROK_API_KEY}`
            },
            body: JSON.stringify({
              model: "grok-beta",
              messages: [{ role: "user", content: prompt }],
              temperature: 0.7
            })
          });
          const data = await res.json();
          responseText = data.choices?.[0]?.message?.content || "";
        }

        if (responseText) {
          aiText = responseText.trim();
        }
      } catch (err) {
        console.error("AI Generation failed. Falling back to structured matching:", err);
      }
    }

    return NextResponse.json({
      success: true,
      recommendation: {
        id: recPandal.id,
        name: recPandal.name,
        location: recPandal.location,
        crowdLevel: liveCrowd,
        imageUrl: recPandal.imageUrl,
        mapUrl: recPandal.mapUrl,
        distance: distanceVal,
        travelTime
      },
      text: aiText
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
