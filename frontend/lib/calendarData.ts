export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  audioUrl: string;
  theme: string;
}

export interface CalendarDay {
  slug: string;
  date: string;
  dayOfWeek: string;
  bengaliTitle: string;
  englishTitle: string;
  subtitle: string;
  imageUrl: string;
  fallbackImage: string;
  imagePosition?: string;
  crowdLevel: "Low" | "Moderate" | "High" | "Extreme";
  crowdColor: string;
  rituals: string[];
  thakumaTip: string;
  recommendedPandals: string[];
  description: string;
  playlist?: SongTrack[];
}

export const calendarDays: CalendarDay[] = [
  {
    slug: "mahalaya",
    date: "October 10, 2026",
    dayOfWeek: "Saturday",
    bengaliTitle: "মহালয়া",
    englishTitle: "Mahalaya",
    subtitle: "The Invocation of Maa Durga & Dawn of Sharodutsav",
    imageUrl: "/images/calendar/mahalaya.jpg",
    fallbackImage: "/images/hero-bg.png",
    imagePosition: "object-center",
    crowdLevel: "Low",
    crowdColor: "#4ade80",
    rituals: [
      "Tarpan offering at Ganga Ghats at dawn",
      "Listening to Birendra Krishna Bhadra's Mahishasuramardini",
      "Chokkhudan (Painting the eyes of Maa Durga statues in Kumartuli)"
    ],
    thakumaTip: "Bacha, wake up at 4:00 AM for Birendra Krishna Bhadra's voice on radio, then head to Prinsep Ghat for the early morning Tarpan atmosphere!",
    recommendedPandals: ["Kumartuli Park", "Bagbazar Sarbojonin", "Ahiritola Sarbojonin"],
    description: "Mahalaya marks the beginning of Devi Paksha. The air fills with the aroma of Shiuli flowers and the resounding chants of Ya Devi Sarvabhuteshu."
  },
  {
    slug: "prothoma",
    date: "October 11, 2026",
    dayOfWeek: "Sunday",
    bengaliTitle: "প্রথমা",
    englishTitle: "Prothoma (Pratipada)",
    subtitle: "Devi Paksha Begins & First Illumination",
    imageUrl: "/images/calendar/prothoma.jpg",
    fallbackImage: "/images/north-1.png",
    imagePosition: "object-[center_28%]",
    crowdLevel: "Low",
    crowdColor: "#4ade80",
    rituals: [
      "Kalash Sthapana & Ghat Sthapana",
      "Early Pandal Light Testing & Artisan Final Touches",
      "Ghat Pujo in Traditional Households"
    ],
    thakumaTip: "Prothoma is ideal for peaceful walks through Kumartuli artisans' quarter as they put the finishing gold paint on Durga idols!",
    recommendedPandals: ["Kumartuli Sarbojonin", "College Square", "Beniatola"],
    description: "The first day of Devi Paksha brings quiet excitement across Kolkata as pandal artisans finish intricate clay details.",
    playlist: [
      {
        id: "prothoma-1",
        title: "বাজলো তোমার আলোর বেণু",
        artist: "Supriti Ghosh — Agomoni Classic",
        duration: "3:45",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/BajloTomarAlorBenu.mp3",
        theme: "Agomoni Dawn & Devi Paksha Awakening"
      },
      {
        id: "prothoma-2",
        title: "জাগো তুমি জাগো",
        artist: "Dwijen Mukherjee",
        duration: "4:12",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/JagoTumiJago.mp3",
        theme: "Devi Vandana & Morning Prayer"
      },
      {
        id: "prothoma-3",
        title: "শিউলি ফুলের গন্ধ নিয়ে",
        artist: "Indrani Sen",
        duration: "3:30",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/ShiuliPhulerGondho.mp3",
        theme: "Autumn Shiuli & Kash Phool Vibe"
      },
      {
        id: "prothoma-4",
        title: "আনন্দময়ী মহামায়া",
        artist: "Traditional Agomoni Chorus",
        duration: "4:05",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/AnandamoyeeMahamaya.mp3",
        theme: "Ghat Sthapana Devotional"
      },
      {
        id: "prothoma-5",
        title: "কুমোরটুলির মাটির ঘ্রাণ",
        artist: "Kolkata Shehnai & Classical Flute",
        duration: "3:15",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/KumartuliArtisanFlute.mp3",
        theme: "Artisan Quarters Chokkhudan Vibe"
      },
      {
        id: "prothoma-6",
        title: "ওগো আমার আগমনী গান",
        artist: "Pratima Banerjee",
        duration: "3:50",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/OgoAmarAgomoniGaan.mp3",
        theme: "Devi Agomoni Melodies"
      }
    ]
  },
  {
    slug: "dwitiya",
    date: "October 12, 2026",
    dayOfWeek: "Monday",
    bengaliTitle: "দ্বিতীয়া",
    englishTitle: "Dwitiya",
    subtitle: "Chandra Puja & Street Light Testing",
    imageUrl: "/images/calendar/dwitiya.jpg",
    fallbackImage: "/images/south-1.png",
    imagePosition: "object-center",
    crowdLevel: "Low",
    crowdColor: "#4ade80",
    rituals: [
      "Dwitiya Puja in Traditional Households",
      "Chandra Darshan",
      "Illumination Gates Switch-On in South & North Kolkata"
    ],
    thakumaTip: "Visit Chandannagar light artisans along Gariahat and Park Street on Dwitiya night to see illuminated arches before the heavy crowds arrive!",
    recommendedPandals: ["Ekdalia Evergreen", "Singhi Park", "Maddox Square"],
    description: "Street illumination gates turn on across Kolkata, turning night into day with millions of sparkling fairy lights.",
    playlist: [
      {
        id: "dwitiya-1",
        title: "চলো চলো পুজোর শহরে",
        artist: "Anupam Roy",
        duration: "3:40",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/CholoPujorShohore.mp3",
        theme: "Kolkata Streets Awakening"
      },
      {
        id: "dwitiya-2",
        title: "আলোর ছটা চন্দননগর",
        artist: "Chandannagar Illumination Beats",
        duration: "3:20",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/ChandannagarLightsTheme.mp3",
        theme: "Street Arches & Neon Glow"
      },
      {
        id: "dwitiya-3",
        title: "দুগ্গা এলো ঘরে",
        artist: "Shreya Ghoshal",
        duration: "4:02",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/DuggaEloGhoreShreya.mp3",
        theme: "Welcoming Maa Durga"
      },
      {
        id: "dwitiya-4",
        title: "আলোর বেণু বাজে রে",
        artist: "Lopamudra Mitra",
        duration: "3:35",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/AlorBenuBajeReLopa.mp3",
        theme: "Festive Joy & Shiuli"
      },
      {
        id: "dwitiya-5",
        title: "শরৎ সন্ধ্যায় চন্দ্র দর্শন",
        artist: "Classical Sitar & Bansuri",
        duration: "4:10",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/ChandraDarshanSitar.mp3",
        theme: "Chandra Puja Twilight Raga"
      },
      {
        id: "dwitiya-6",
        title: "পুজো এলো রে আবার",
        artist: "Shaan",
        duration: "3:55",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/PujoEloReAbarShaan.mp3",
        theme: "Citywide Celebration Beat"
      }
    ]
  },
  {
    slug: "tritiya",
    date: "October 13, 2026",
    dayOfWeek: "Tuesday",
    bengaliTitle: "তৃতীয়া",
    englishTitle: "Tritiya",
    subtitle: "VIP Pandal Inaugurations & Early Hopping",
    imageUrl: "/images/calendar/tritiya.jpg",
    fallbackImage: "/images/north-2.png",
    imagePosition: "object-center",
    crowdLevel: "Moderate",
    crowdColor: "#facc15",
    rituals: [
      "Early VIP Pandal Opening Ceremonies",
      "Cultural Music & Rabindra Sangeet Performances",
      "Dhunuchi Practice at Local Clubs"
    ],
    thakumaTip: "Tritiya evening is the smart hopper's secret weapon! You can visit famous South Kolkata pandals with virtually zero queue time.",
    recommendedPandals: ["Chetla Agrani", "Suruchi Sangha", "Tridhara Akorjon"],
    description: "City leaders and dignitaries inaugurate major theme pandals. Early birds enjoy breathtaking art installations with zero lines.",
    playlist: [
      {
        id: "tritiya-1",
        title: "দুগ্গা এলো",
        artist: "Monali Thakur",
        duration: "3:48",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/DuggaEloMonali.mp3",
        theme: "Joyful Early Pandal Hopping"
      },
      {
        id: "tritiya-2",
        title: "বলো দুগ্গা মাইকি",
        artist: "Arijit Singh & Nikhita Gandhi",
        duration: "4:15",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/BoloDuggaMaikiArijit.mp3",
        theme: "Festival Anthem"
      },
      {
        id: "tritiya-3",
        title: "চেতলা থেকে সুরুচি আড্ডা",
        artist: "South Kolkata Theme Groove",
        duration: "3:10",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/SouthKolkataGroove.mp3",
        theme: "VIP Theme Inauguration Beats"
      },
      {
        id: "tritiya-4",
        title: "এলো রে এলো পুজো",
        artist: "Jeet Gannguli",
        duration: "3:52",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/EloReEloPujoJeet.mp3",
        theme: "Celebration Dance Beats"
      },
      {
        id: "tritiya-5",
        title: "ম্যাডক্স স্কয়ার পুজোর আড্ডা",
        artist: "Kolkata Acoustic Ensemble",
        duration: "3:30",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/MaddoxSquareAddaVibe.mp3",
        theme: "Friends Adda & Autumn Breeze"
      },
      {
        id: "tritiya-6",
        title: "মায়ের আগমনে বাজে রে ঢাক",
        artist: "Traditional Dhak & Chorus",
        duration: "3:42",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/MayerAgomoneDhak.mp3",
        theme: "First Dhaak Beats in the Para"
      }
    ]
  },
  {
    slug: "chaturthi",
    date: "October 14, 2026",
    dayOfWeek: "Wednesday",
    bengaliTitle: "চতুর্থী",
    englishTitle: "Chaturthi",
    subtitle: "Kushmanda Puja & The Great Night Walk Begins",
    imageUrl: "/images/calendar/chaturthi.jpg",
    fallbackImage: "/images/south-2.png",
    imagePosition: "object-center",
    crowdLevel: "Moderate",
    crowdColor: "#facc15",
    rituals: [
      "Kushmanda Devi Worship",
      "Neighborhood Club Adda & Dhak Rehearsals",
      "Evening Family Pandal Tours"
    ],
    thakumaTip: "Chaturthi night is fantastic for older family members to view big pandals comfortably before barricades restrict walking routes!",
    recommendedPandals: ["Sreebhumi Sporting", "FD Block Salt Lake", "Tala Prattoy"],
    description: "The city buzzes with anticipation as thousands step out into the autumn night breeze for early pandal visits.",
    playlist: [
      {
        id: "chaturthi-1",
        title: "পুজো পুজো গন্ধ বাতাসে",
        artist: "Rupankar Bagchi",
        duration: "4:05",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/PujoPujoGondhoRupankar.mp3",
        theme: "Autumn Aroma & Night Breeze"
      },
      {
        id: "chaturthi-2",
        title: "রাতের কলকাতা পুজো ওয়াক",
        artist: "Lo-Fi Pujo Beats Collective",
        duration: "3:15",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/KolkataNightWalkLoFi.mp3",
        theme: "Midnight Pandal Stroll"
      },
      {
        id: "chaturthi-3",
        title: "ঢাকের তালে কোমর দোলে",
        artist: "Abhijeet Bhattacharya",
        duration: "4:22",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/DhaakerTaaleAbhijeet.mp3",
        theme: "Club Dhak Rehearsal Energy"
      },
      {
        id: "chaturthi-4",
        title: "কুষ্মাণ্ডা মায়ের বরণ",
        artist: "Vedic Sanskrit Chants Ensemble",
        duration: "3:50",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/KushmandaDeviChants.mp3",
        theme: "Sacred Chaturthi Chants"
      },
      {
        id: "chaturthi-5",
        title: "শ্রীভূমি থেকে টালা প্রত্যয়",
        artist: "North Kolkata Royal Strings",
        duration: "3:35",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/NorthThemeStrings.mp3",
        theme: "Architectural Theme Visualizer"
      },
      {
        id: "chaturthi-6",
        title: "ওই আসছে রে মা",
        artist: "Antara Mitra",
        duration: "3:40",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/OiAscheReMaAntara.mp3",
        theme: "Excitement in the City"
      }
    ]
  },
  {
    slug: "panchami",
    date: "October 15, 2026",
    dayOfWeek: "Thursday",
    bengaliTitle: "পঞ্চমী",
    englishTitle: "Panchami",
    subtitle: "Skandamata Puja & All Pandals Unveiled",
    imageUrl: "/images/calendar/panchami.jpg",
    fallbackImage: "/images/bonedi-1.png",
    crowdLevel: "High",
    crowdColor: "#f97316",
    rituals: [
      "Skandamata Pujo",
      "Grand Unveiling of All 93 Pandals Across Kolkata",
      "First Major Night of Pandal Hopping"
    ],
    thakumaTip: "Panchami is the official launch night! Head to North Kolkata pandals early around 6:00 PM, then move South by midnight.",
    recommendedPandals: ["Kashi Bose Lane", "Hatibagan Nabin Pally", "Santosh Mitra Square"],
    description: "All pandals are officially open to the public. Kolkata transforms into the world's largest open-air art gallery.",
    playlist: [
      {
        id: "panchami-1",
        title: "পঞ্চমীর এই রাতে",
        artist: "Somlata Acharyya",
        duration: "3:45",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/PanchamirEiRaateSomlata.mp3",
        theme: "First Grand Night of Hopping"
      },
      {
        id: "panchami-2",
        title: "কলকাতা সবাই রাস্তায়",
        artist: "Bangla Rock & Dhaak Fusion",
        duration: "4:10",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/KolkataRastayeFusion.mp3",
        theme: "Midnight Crowd Excitement"
      },
      {
        id: "panchami-3",
        title: "ঢাক বাজে কাশ ফুল দোলে",
        artist: "Kumar Sanu",
        duration: "3:58",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/DhaakBajeKumarSanu.mp3",
        theme: "Nostalgic Festival Melodies"
      },
      {
        id: "panchami-4",
        title: "প্যান্ডেল হপিং অ্যান্থেম ২০২৬",
        artist: "High Energy Pujo Collective",
        duration: "3:30",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/PandalHoppingAnthem.mp3",
        theme: "93 Pandals Open Celebration"
      },
      {
        id: "panchami-5",
        title: "আমার পুজোর গান",
        artist: "Srikanto Acharya",
        duration: "4:12",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/AmarPujorGaanSrikanto.mp3",
        theme: "Melodic Evening Nostalgia"
      },
      {
        id: "panchami-6",
        title: "জয় জয় দুর্গা মা",
        artist: "Traditional Festival Chorus",
        duration: "3:35",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/JoyJoyDurgaMaaChorus.mp3",
        theme: "Sacred Devotional Chants"
      }
    ]
  },
  {
    slug: "shashthi",
    date: "October 16, 2026",
    dayOfWeek: "Friday",
    bengaliTitle: "মহাষষ্ঠী",
    englishTitle: "Maha Shashthi",
    subtitle: "Bodhon, Amantran & Adhibas — Pujo Officially Begins",
    imageUrl: "/images/calendar/shashthi.jpg",
    fallbackImage: "/images/hero-bg.png",
    crowdLevel: "High",
    crowdColor: "#f97316",
    rituals: [
      "Devi Bodhon under Bel Tree at dusk",
      "Amantran & Adhibas rituals",
      "Unveiling of the Face of Maa Durga in Bonedi Bari"
    ],
    thakumaTip: "Shashthi evening is magical for visiting historic Bonedi Bari households like Sovabazar Rajbari when the veil is drawn back from the idol!",
    recommendedPandals: ["Sovabazar Rajbari", "Laha Bari", "Pathuriaghata Ghosh Bari"],
    description: "Maha Shashthi marks the formal spiritual awakening of Maa Durga. The sound of Dhak drums echoes across every para.",
    playlist: [
      {
        id: "shashthi-1",
        title: "আজি শঙ্খে শঙ্খে মঙ্গল গাও",
        artist: "Dwijen Mukherjee",
        duration: "4:20",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/AjiShankheShankheDwijen.mp3",
        theme: "Sacred Conches & Bodhon Hymn"
      },
      {
        id: "shashthi-2",
        title: "দেবী বোধন স্তোত্র ও শঙ্খধ্বনি",
        artist: "Bel Tree Twilight Ritual",
        duration: "4:45",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/BodhonStotramShankha.mp3",
        theme: "Spiritual Awakening of Devi"
      },
      {
        id: "shashthi-3",
        title: "বনেদি বাড়ির ষষ্ঠী পুজো",
        artist: "Classical Esraj & Pakhawaj",
        duration: "3:55",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/BonediBariEsraj.mp3",
        theme: "Sovabazar & Laha Bari Nostalgia"
      },
      {
        id: "shashthi-4",
        title: "মুখের পরদা খোলো গো মা",
        artist: "Traditional Agomoni",
        duration: "4:02",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/MukherPordaKholoMaa.mp3",
        theme: "Unveiling Maa's Divine Face"
      },
      {
        id: "shashthi-5",
        title: "মহাষষ্ঠীর সন্ধ্যারতি",
        artist: "Temple Bells & Gong Chorus",
        duration: "4:15",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/ShashthiSandhyaArati.mp3",
        theme: "Evening Incense & Camphor Dhoop"
      },
      {
        id: "shashthi-6",
        title: "মায়ের আগমন গান",
        artist: "Arati Mukherjee",
        duration: "3:50",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/MayerAgomonArati.mp3",
        theme: "Tender Welcome of Devi"
      }
    ]
  },
  {
    slug: "saptami-1",
    date: "October 17, 2026",
    dayOfWeek: "Saturday",
    bengaliTitle: "মহাসপ্তমী (দিন ১)",
    englishTitle: "Maha Saptami (Day 1)",
    subtitle: "Nabapatrika Snan & Kola Bou Bathing at Ganga Ghats",
    imageUrl: "/images/calendar/saptami-1.jpg",
    fallbackImage: "/images/north-1.png",
    crowdLevel: "Extreme",
    crowdColor: "#f87171",
    rituals: [
      "Nabapatrika (Kola Bou) Snan at Hooghly River at dawn",
      "Saptami Morning Pushpanjali",
      "Prana Pratishtha Rituals"
    ],
    thakumaTip: "Head to Babughat or Bagbazar Ghat at 5:30 AM on Saptami morning to witness the holy Kola Bou bathing procession!",
    recommendedPandals: ["Bagbazar Sarbojonin", "College Square", "Mohammad Ali Park"],
    description: "The sacred Nabapatrika is bathed in the holy Ganges at sunrise, wrapped in a red-bordered saree, and installed beside Lord Ganesha.",
    playlist: [
      {
        id: "saptami1-1",
        title: "কলাবউ স্নান আগমনী গীতি",
        artist: "Ganga Ghat Sunrise Procession",
        duration: "4:10",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/KolaBouSnanSunrise.mp3",
        theme: "Sacred Hooghly Dawn Rituals"
      },
      {
        id: "saptami1-2",
        title: "নবপত্রিকা বরণ গান",
        artist: "Traditional Vedic Chorus",
        duration: "3:55",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/NabapatrikaBoron.mp3",
        theme: "Nine Plants of Mother Nature"
      },
      {
        id: "saptami1-3",
        title: "বাবুঘাট সূর্যোদয়ের সানাই",
        artist: "Raga Bhairav Shehnai & Dhaak",
        duration: "4:30",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/BabughatShehnaiBhairav.mp3",
        theme: "Kolkata Ghats Morning Awakening"
      },
      {
        id: "saptami1-4",
        title: "সপ্তমীর সকাল বেলা",
        artist: "Indranil Sen",
        duration: "3:40",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/SaptamirShokalBela.mp3",
        theme: "First Morning Puja Anjali"
      },
      {
        id: "saptami1-5",
        title: "পূজার ঢোল বাজে রে",
        artist: "Folk Dhol & Khol Ensemble",
        duration: "3:35",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/PujarDholBajeRe.mp3",
        theme: "Festive Joy Across Bengal"
      },
      {
        id: "saptami1-6",
        title: "প্রাণ প্রতিষ্ঠা মহামন্ত্র",
        artist: "Sanskrit Vedic Stotram",
        duration: "4:00",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/PranaPratishthaMantra.mp3",
        theme: "Sanctifying the Idol"
      }
    ]
  },
  {
    slug: "saptami-2",
    date: "October 18, 2026",
    dayOfWeek: "Sunday",
    bengaliTitle: "মহাসপ্তমী (দিন ২)",
    englishTitle: "Maha Saptami (Day 2)",
    subtitle: "Weekend Night Rush & Grand Illuminations",
    imageUrl: "/images/calendar/saptami-2.jpg",
    fallbackImage: "/images/south-1.png",
    crowdLevel: "Extreme",
    crowdColor: "#f87171",
    rituals: [
      "Bhog Distribution in Neighborhood Paras",
      "All-Night Pandal Hopping with Police One-Way Routes",
      "Traditional Dhak Competitions"
    ],
    thakumaTip: "Use Metro Rail for transport on Saptami night! Kolkata Metro runs past 2:00 AM between Dum Dum and Kavi Subhash.",
    recommendedPandals: ["Badamtala Ashar Sangha", "66 Pally", "Mudiali Club"],
    description: "Millions take to the streets in their finest new festive clothes for an all-night celebration under glittering light towers.",
    playlist: [
      {
        id: "saptami2-1",
        title: "উইকএন্ড পুজো ফ্রেঞ্জি",
        artist: "Electronic Dhaak & Brass Fusion",
        duration: "3:45",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/WeekendDhaakFusion.mp3",
        theme: "All-Night Hopping Energy"
      },
      {
        id: "saptami2-2",
        title: "৬৬ পল্লী থেকে বাদামতলা",
        artist: "South Kolkata Streets Atmosphere",
        duration: "3:20",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/SouthStreetsPulse.mp3",
        theme: "Nocturnal Walking Rhythm"
      },
      {
        id: "saptami2-3",
        title: "কলকাতা মেট্রো নাইট রাইড",
        artist: "Urban Festival Metro Beat",
        duration: "3:15",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/MetroNightRideBeat.mp3",
        theme: "Past 2:00 AM Transit Pulse"
      },
      {
        id: "saptami2-4",
        title: "ভোগ আরতি ও ধুনা ধুন",
        artist: "Traditional Dhunuchi Flute",
        duration: "4:10",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/BhogAratiDhuna.mp3",
        theme: "Para Bhog & Coconut Smoke"
      },
      {
        id: "saptami2-5",
        title: "মহাসপ্তমী অঞ্জলি বন্দনা",
        artist: "Devotional Stotram Chorus",
        duration: "4:05",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/SaptamiAnjaliChorus.mp3",
        theme: "Sacred Offering Songs"
      },
      {
        id: "saptami2-6",
        title: "আবার পুজোর দিন এসেছে",
        artist: "Babul Supriyo",
        duration: "3:50",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/AbarPujorDinBabul.mp3",
        theme: "Heartfelt City Song"
      }
    ]
  },
  {
    slug: "ashtami",
    date: "October 19, 2026",
    dayOfWeek: "Monday",
    bengaliTitle: "মহাঅষ্টমী",
    englishTitle: "Maha Ashtami",
    subtitle: "Pushpanjali in Laal Paar Saree, Kumari Puja & Sandhi Puja",
    imageUrl: "/images/calendar/ashtami.jpg",
    fallbackImage: "/images/bonedi-1.png",
    crowdLevel: "Extreme",
    crowdColor: "#f87171",
    rituals: [
      "Maha Ashtami Morning Pushpanjali (Anjali in fasting state)",
      "Kumari Puja at Belur Math & Bonedi Bari",
      "Sandhi Puja 108 Red Lotus Flowers & 108 Lamps at dusk"
    ],
    thakumaTip: "Wear your traditional Laal Paar Saree or Dhuti-Punjabi for Ashtami morning Anjali! Don't miss Sandhi Puja's 108 Dhak drum beats.",
    recommendedPandals: ["Belur Math", "Sabarna Roy Choudhury Bari", "Maddox Square"],
    description: "The most sacred day of Durga Puja. Devotees fast for morning Pushpanjali, followed by Kumari Puja and the intense 48-minute Sandhi Puja at dusk.",
    playlist: [
      {
        id: "ashtami-1",
        title: "মহাঅষ্টমী পুষ্পাঞ্জলি মন্ত্র",
        artist: "Sacred Flower Offering Chants",
        duration: "4:30",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/AshtamiPushpanjaliMantram.mp3",
        theme: "Om Jayanti Mangala Kali Hymn"
      },
      {
        id: "ashtami-2",
        title: "সন্ধিপুজোর ১০৮ ঢাকের বোল",
        artist: "Intense 48-Minute Sandhi Dhaak",
        duration: "5:10",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/SandhiPuja108DhaakBeats.mp3",
        theme: "Mahishasura Mardini Battle Beats"
      },
      {
        id: "ashtami-3",
        title: "কুমারী পূজা বন্দনা",
        artist: "Belur Math Vedic Chants",
        duration: "4:20",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/KumariPujaVandana.mp3",
        theme: "Worship of the Young Goddess"
      },
      {
        id: "ashtami-4",
        title: "লাল পাড় শাড়ি অঞ্জলি গীতি",
        artist: "Traditional Female Chorus",
        duration: "3:45",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/LaalPaarSaariGeeti.mp3",
        theme: "Morning Fast & Saree Elegance"
      },
      {
        id: "ashtami-5",
        title: "জয় জয় দেবী চামুণ্ডে",
        artist: "Chamunda Stotram",
        duration: "4:00",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/JoyDeviChamunde.mp3",
        theme: "Sandhi Puja Apex Climax"
      },
      {
        id: "ashtami-6",
        title: "১০৮ প্রদীপ আরতি থিম",
        artist: "Temple Bell & Gong Symphony",
        duration: "4:15",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/108PradipAratiTheme.mp3",
        theme: "108 Lotus Lamps Glow"
      },
      {
        id: "ashtami-7",
        title: "অষ্টমীর সন্ধ্যায় ম্যাডক্স",
        artist: "Saptarshi Mukherjee",
        duration: "3:40",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/AshtamiEveningMaddox.mp3",
        theme: "Lawn Gathering & Evening Adda"
      }
    ]
  },
  {
    slug: "navami",
    date: "October 20, 2026",
    dayOfWeek: "Tuesday",
    bengaliTitle: "মহানবমী",
    englishTitle: "Maha Navami",
    subtitle: "Grand Dhunuchi Naach, Homa & Final Festive Night",
    imageUrl: "/images/calendar/navami.jpg",
    fallbackImage: "/images/south-2.png",
    crowdLevel: "Extreme",
    crowdColor: "#f87171",
    rituals: [
      "Maha Navami Homa (Sacred Fire Yajna)",
      "Thrilling Dhunuchi Naach Dancers with Smoking Earthen Pots",
      "Grand Culinary Feast (Mutton Kosha & Mishti)"
    ],
    thakumaTip: "Maha Navami is the last full night of celebrations! Join the Dhunuchi Naach circle at Maniktala Chaltabagan or Maddox Square lawn.",
    recommendedPandals: ["Maniktala Chaltabagan", "Naktala Udayan Sangha", "Bosepukur Sitala Mandir"],
    description: "Rhythmic Dhak beats, swirling aromatic coconut husk smoke, and intense Dhunuchi dancing mark the epic last night of Sharodutsav.",
    playlist: [
      {
        id: "navami-1",
        title: "ধুনুচি নাচ ধামাকা (আল্টিমেট ঢাক)",
        artist: "Electrifying Fast-paced Dhak",
        duration: "5:30",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/DhunuchiNaachDhamaka.mp3",
        theme: "Swirling Coconut Husk Smoke & Fire"
      },
      {
        id: "navami-2",
        title: "নবমীর রাতি পোহালে (বেদনার সুর)",
        artist: "Hemanta Mukherjee",
        duration: "4:15",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/NavamirRatiPohaleHemanta.mp3",
        theme: "The Sweet Sorrow of Navami Night"
      },
      {
        id: "navami-3",
        title: "চালতাবাগান ধুনুচি স্টর্ম",
        artist: "Maniktala Live Dhaak & Kashi",
        duration: "4:45",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/ChaltabaganDhunuchiLive.mp3",
        theme: "North Kolkata Street Frenzy"
      },
      {
        id: "navami-4",
        title: "নবমী হোম যজ্ঞ মন্ত্র",
        artist: "Vedic Agni Suktam Chants",
        duration: "4:20",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/NavamiYajnaHoma.mp3",
        theme: "Sacred Fire & Ghee Offerings"
      },
      {
        id: "navami-5",
        title: "শেষ রাতের কলকাতা",
        artist: "Anindya Chatterjee (Chandrabindoo)",
        duration: "3:55",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/SheshRaaterKolkataAnindya.mp3",
        theme: "Dawn Approaching on Navami"
      },
      {
        id: "navami-6",
        title: "মায়ের বিদায় আসছে কালে",
        artist: "Manna Dey",
        duration: "4:10",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/MayerBidayAscheManna.mp3",
        theme: "Impending Farewell Song"
      }
    ]
  },
  {
    slug: "dashami",
    date: "October 21, 2026",
    dayOfWeek: "Wednesday",
    bengaliTitle: "বিজয়া দশমী",
    englishTitle: "Vijaya Dashami",
    subtitle: "Sindoor Khela, Ghat Bisorjon & Aasche Bochor Aabar Hobe",
    imageUrl: "/images/calendar/dashami.jpg",
    fallbackImage: "/images/bonedi-1.png",
    crowdLevel: "High",
    crowdColor: "#f97316",
    rituals: [
      "Devi Boron & Sindoor Khela among married women",
      "Immersion Procession (Bisorjon) at Hooghly River Ghats",
      "Shubho Bijoya Greetings with Rosogolla, Nimki & Kaju Barfi"
    ],
    thakumaTip: "Touch the elders' feet for Bijoya Pronam, embrace friends with Kolakoli, and bid farewell to Mother Durga: Aasche Bochor Aabar Hobe!",
    recommendedPandals: ["Babu Ghat Immersion", "Baje Kadamtala Ghat", "Sovabazar Rajbari Ghat"],
    description: "With tearful eyes and vermilion-smearing, Kolkata bids farewell to Maa Durga until next year with cries of 'Aasche Bochor Aabar Hobe!'",
    playlist: [
      {
        id: "dashami-1",
        title: "আসছে বছর আবার হবে অ্যান্থেম",
        artist: "Kolkata Farewell Chorus",
        duration: "4:20",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/AscheBochorAbarHobeChorus.mp3",
        theme: "Triumphant Farewell Cry"
      },
      {
        id: "dashami-2",
        title: "সিঁদুর খেলা উৎসব গীতি",
        artist: "Traditional Boron & Vermilion Song",
        duration: "3:50",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/SindoorKhelaGeeti.mp3",
        theme: "Red Vermilion & Sweet Sweets"
      },
      {
        id: "dashami-3",
        title: "বিসর্জনের ঢাক ও অশ্রু",
        artist: "Babu Ghat Immersion Dhaak",
        duration: "4:45",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/BisorjonDhaakBabuGhat.mp3",
        theme: "Immersion Waters of the Hooghly"
      },
      {
        id: "dashami-4",
        title: "মা গো তুমি বিদায় নিও না",
        artist: "Arati Mukherjee",
        duration: "4:12",
        audioUrl: "https://ia600301.us.archive.org/15/items/BengaliDevotionalSongs/MaaGoTumiBidayArati.mp3",
        theme: "Heartbreak of Mother's Departure"
      },
      {
        id: "dashami-5",
        title: "শুভ বিজয়া কোলাকুলি সঙ্গীত",
        artist: "Rabindra Sangeet / Bijoya Gaan",
        duration: "3:40",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/ShubhoBijoyaKolakoli.mp3",
        theme: "Embraces & Rosogolla Pronam"
      },
      {
        id: "dashami-6",
        title: "আবার এসো মা হৃদয় মাঝে",
        artist: "Devotional Farewell Ensemble",
        duration: "4:30",
        audioUrl: "https://ia800301.us.archive.org/15/items/BengaliDevotionalSongs/AbarEsoMaaHridoy.mp3",
        theme: "Prayers for the Coming Year"
      }
    ]
  }
];
