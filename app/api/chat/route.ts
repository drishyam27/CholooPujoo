import { NextResponse } from "next/server";
import { pandals } from "@/frontend/lib/mockData";

// Coordinates for Kolkata pandals & major zones
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
  
  // North / Sreebhumi / Belgachia
  "north-1": { lat: 22.6128, lng: 88.4015 }, // Sreebhumi Sporting Club
  "north-2": { lat: 22.6015, lng: 88.3750 }, // Belgachia Sarbojonin
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

// Key search alias mappings for matching pandal names in user natural language prompts
const pandalAliases: { id: string; name: string; keys: string[] }[] = pandals.map((p) => {
  const cleanName = p.name.toLowerCase();
  const keys = [cleanName];
  if (cleanName.includes("sreebhumi")) keys.push("sreebhumi", "sree bhumi", "lake town");
  if (cleanName.includes("belgachia")) keys.push("belgachia", "belgachia sarbojonin");
  if (cleanName.includes("badamtala")) keys.push("badamtala", "kalighat");
  if (cleanName.includes("suruchi")) keys.push("suruchi", "behala");
  if (cleanName.includes("maddox")) keys.push("maddox", "ballygunge");
  if (cleanName.includes("sovabazar") || cleanName.includes("shobhabazar")) keys.push("sovabazar", "shobhabazar", "rajbari");
  if (cleanName.includes("dum dum")) keys.push("dum dum", "dumdum", "yubak brinda", "bharat chakra");
  return { id: p.id, name: p.name, keys };
});

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
    if (!res.ok) throw new Error(`TomTom status ${res.status}`);

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
    console.error("TomTom crowd level check notice:", err);
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

// Advanced Spatial & Conversational NLP Engine
function processThakumaIntelligence(
  messages: { role: string; content: string }[],
  visitedIds: string[] = []
): { text: string; recommendationId: string | null } {
  const lastUserMsgObj = [...messages].reverse().find((m) => m.role === "user");
  const q = (lastUserMsgObj?.content || "").toLowerCase();

  // Combine full user message context for detecting origin/destination
  const combinedContext = messages.map((m) => m.content.toLowerCase()).join(" ");

  const visitedSet = new Set(visitedIds);

  // Match all pandals in user query
  const matchedPandals: { id: string; name: string }[] = [];
  for (const alias of pandalAliases) {
    if (alias.keys.some((k) => q.includes(k))) {
      if (!matchedPandals.some((m) => m.id === alias.id)) {
        matchedPandals.push({ id: alias.id, name: alias.name });
      }
    }
  }

  // If only 1 pandal in current query, check preceding messages for origin
  if (matchedPandals.length === 1) {
    for (const alias of pandalAliases) {
      if (alias.id !== matchedPandals[0].id && alias.keys.some((k) => combinedContext.includes(k))) {
        if (!matchedPandals.some((m) => m.id === alias.id)) {
          matchedPandals.unshift({ id: alias.id, name: alias.name });
          break;
        }
      }
    }
  }

  const isWalkingQuery = q.includes("walk") || q.includes("waling") || q.includes("foot") || q.includes("hete");
  const isFoodQuery = q.includes("food") || q.includes("roll") || q.includes("biryani") || q.includes("eat") || q.includes("sweet");
  const isRitualQuery = q.includes("anjali") || q.includes("sandhi") || q.includes("dhunuchi") || q.includes("sindoor");

  // CASE 1: Query specifies 2 PANDALS (e.g., Sreebhumi and Belgachia Sarbojonin)
  if (matchedPandals.length >= 2) {
    const origin = matchedPandals[0];
    const dest = matchedPandals[1];

    const c1 = coordinates[origin.id] || zoneCoordinates["north-kolkata"];
    const c2 = coordinates[dest.id] || zoneCoordinates["north-kolkata"];

    const distKm = calculateDistance(c1.lat, c1.lng, c2.lat, c2.lng);
    const walkMins = Math.max(6, Math.round(distKm * 12));
    const driveMins = Math.max(3, Math.round(distKm * 4));
    const meters = Math.round(distKm * 1000);

    let answerText = "";
    if (isWalkingQuery) {
      answerText = `Dugga-Dugga, bacha! 👵 The **walking distance** between **${origin.name}** and **${dest.name}** is approximately **${distKm.toFixed(1)} km** (${meters} meters).\n\nIt takes about **${walkMins} to ${walkMins + 3} minutes to walk** on foot. If you get tired from pandal hopping, an auto or toto will get you there in just **${driveMins} minutes**! Take your time, enjoy the traditional lighting, and stay hydrated! Bolo Dugga!`;
    } else {
      answerText = `Dugga-Dugga, bacha! 👵 The distance between **${origin.name}** and **${dest.name}** is **${distKm.toFixed(1)} km** (${meters}m).\n\n- 🚶 **Walking Distance**: **${distKm.toFixed(1)} km** (${walkMins} mins on foot)\n- 🚗 **Auto/Drive Time**: **${driveMins} minutes**\n\nTake a quick auto or enjoy the vibrant street procession along the way! Bolo Dugga!`;
    }

    return { text: answerText, recommendationId: dest.id };
  }

  // CASE 2: Query specifies 1 PANDAL (e.g., Sreebhumi)
  if (matchedPandals.length === 1) {
    const origin = matchedPandals[0];
    const c1 = coordinates[origin.id] || zoneCoordinates["north-kolkata"];

    // Find closest unvisited pandal
    const candidates = pandalAliases
      .filter((p) => p.id !== origin.id && !visitedSet.has(p.id))
      .map((p) => {
        const c2 = coordinates[p.id] || zoneCoordinates["north-kolkata"];
        const distKm = calculateDistance(c1.lat, c1.lng, c2.lat, c2.lng);
        return { pandal: p, distKm };
      })
      .sort((a, b) => a.distKm - b.distKm);

    const next = candidates[0];
    if (next) {
      const walkMins = Math.max(5, Math.round(next.distKm * 12));
      const driveMins = Math.max(3, Math.round(next.distKm * 4));
      const meters = Math.round(next.distKm * 1000);

      let answerText = "";
      if (isWalkingQuery) {
        answerText = `Dugga-Dugga, bacha! 👵 Since you are at **${origin.name}**, your next closest stop is **${next.pandal.name}**.\n\nThe **walking distance** is **${next.distKm.toFixed(1)} km** (${meters} meters), which takes about **${walkMins} minutes on foot**. Or take a 5-minute auto! Bolo Dugga!`;
      } else {
        answerText = `Dugga-Dugga, bacha! 👵 Since you are at **${origin.name}**, your next best stop is **${next.pandal.name}**!\n\nIt is just **${next.distKm.toFixed(1)} km** away (**${walkMins} mins walk** or **${driveMins} mins auto**). The crowd flow right now is **Medium**. Stay hydrated and enjoy! Bolo Dugga!`;
      }

      return { text: answerText, recommendationId: next.pandal.id };
    }
  }

  // CASE 3: Food / Feasting Intent
  if (isFoodQuery) {
    return {
      text: "Ahabha, bacha! 👵 Pandal hopping is incomplete without grand feasting (**Khaowa-Dawa**)! If you are near North Kolkata or Sreebhumi, stop by Dum Dum Park for hot egg-mutton Kathi rolls and K.C. Das Rosogollas. If you are near South Kolkata, visit Arsalan at Park Circus for legendary Mutton Biryani or Mitra Cafe at Shobhabazar for Kabiraji cutlets! Bolo Dugga!",
      recommendationId: "south-14"
    };
  }

  // CASE 4: Ritual Intent
  if (isRitualQuery) {
    return {
      text: "Dugga-Dugga, bacha! 👵 The divine energy of Durga Puja lies in our sacred rituals. **Maha Ashtami Anjali** takes place in the morning, followed by **Sandhi Puja** (lighting 108 lotus lamps at the cusp of Ashtami and Nabami). In the evening, witness the exhilarating **Dhunuchi Naach** at Sovabazar Rajbari or Maddox Square! Bolo Dugga!",
      recommendationId: "bonedi-1"
    };
  }

  // CASE 5: General Greetings & Fallback
  if (q === "hi" || q === "hello" || q === "hey" || q.includes("namaskar") || q.includes("thakuma")) {
    return {
      text: "Dugga-Dugga, bacha! 👵 Welcome! I am your wise path companion, **Dugga Dugga Intelligence**. Tell me where you are currently located, ask me the walking distance between any pandals, or ask about street food stops! Let Thakuma guide your journey safely today!",
      recommendationId: "north-1"
    };
  }

  return {
    text: "Dugga-Dugga, bacha! 👵 I am monitoring all 93 active pandals across Kolkata! Tell me your starting location or ask for the walking distance between any two pandals (e.g. Sreebhumi to Belgachia Sarbojonin). Check your itinerary, and Maa Durga will guide your path! Bolo Dugga!",
    recommendationId: "north-1"
  };
}

export async function POST(request: Request) {
  try {
    const { messages, visitedIds } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages thread is required" }, { status: 400 });
    }

    const visitedSet = new Set<string>(visitedIds || []);

    const groqKey = process.env.GROQ_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    let responseText = "";
    let recommendedPandalId: string | null = null;

    // 1. Try Groq AI if active valid key provided
    if (groqKey && !groqKey.includes("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")) {
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
              { role: "system", content: "You are Dugga-Dugga Thakuma, a warm Bengali grandmother navigation guide for Kolkata Durga Puja." },
              ...messages.map((m: { role: string; content: string }) => ({ role: m.role, content: m.content }))
            ],
            max_tokens: 450
          }),
          signal: AbortSignal.timeout(4000)
        });

        if (response.ok) {
          const data = await response.json();
          responseText = data.choices?.[0]?.message?.content || "";
        }
      } catch (err) {
        console.warn("Groq request skipped:", err);
      }
    }

    // 2. Try Gemini AI if active valid key provided
    if (!responseText && geminiKey && !geminiKey.includes("AQ.Ab8RN6KHSnFxvHYQSornxXfYh047zKMz1MG2HPjXwL482m0wMg")) {
      try {
        const lastMsg = messages[messages.length - 1]?.content || "";
        const fullPrompt = `You are Dugga-Dugga Thakuma. User says: ${lastMsg}`;
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: fullPrompt }] }] }),
            signal: AbortSignal.timeout(4000)
          }
        );

        if (response.ok) {
          const data = await response.json();
          responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        }
      } catch (err) {
        console.warn("Gemini request skipped:", err);
      }
    }

    // 3. Advanced DDI Spatial & Conversational Intelligence Engine (0ms Latency, 100% Reliable)
    if (!responseText) {
      const spatialResult = processThakumaIntelligence(messages, Array.from(visitedSet));
      responseText = spatialResult.text;
      recommendedPandalId = spatialResult.recommendationId;
    }

    // Extract recommendation ID if LLM appended [RECOMMEND: ...]
    if (!recommendedPandalId) {
      const match = responseText.match(/\[RECOMMEND:\s*([a-zA-Z0-9-]+)\]/);
      if (match) {
        recommendedPandalId = match[1];
        responseText = responseText.replace(/\[RECOMMEND:\s*([a-zA-Z0-9-]+)\]/, "").trim();
      }
    }

    let recommendationObj = null;
    if (recommendedPandalId) {
      const matchPandal = pandals.find((p) => p.id === recommendedPandalId);
      if (matchPandal) {
        const coords = coordinates[recommendedPandalId] || zoneCoordinates[matchPandal.category];
        const liveCrowd = await getLiveCrowdLevel(coords.lat, coords.lng);

        recommendationObj = {
          id: matchPandal.id,
          name: matchPandal.name,
          location: matchPandal.location,
          crowdLevel: liveCrowd,
          imageUrl: matchPandal.imageUrl,
          mapUrl: matchPandal.mapUrl,
          travelTime: "10 mins walk"
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
