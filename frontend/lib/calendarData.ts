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
    description: "The first day of Devi Paksha brings quiet excitement across Kolkata as pandal artisans finish intricate clay details."
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
    crowdLevel: "Low",
    crowdColor: "#4ade80",
    rituals: [
      "Dwitiya Puja in Traditional Households",
      "Chandra Darshan",
      "Illumination Gates Switch-On in South & North Kolkata"
    ],
    thakumaTip: "Visit Chandannagar light artisans along Gariahat and Park Street on Dwitiya night to see illuminated arches before the heavy crowds arrive!",
    recommendedPandals: ["Ekdalia Evergreen", "Singhi Park", "Maddox Square"],
    description: "Street illumination gates turn on across Kolkata, turning night into day with millions of sparkling fairy lights."
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
    crowdLevel: "Moderate",
    crowdColor: "#facc15",
    rituals: [
      "Early VIP Pandal Opening Ceremonies",
      "Cultural Music & Rabindra Sangeet Performances",
      "Dhunuchi Practice at Local Clubs"
    ],
    thakumaTip: "Tritiya evening is the smart hopper's secret weapon! You can visit famous South Kolkata pandals with virtually zero queue time.",
    recommendedPandals: ["Chetla Agrani", "Suruchi Sangha", "Tridhara Akorjon"],
    description: "City leaders and dignitaries inaugurate major theme pandals. Early birds enjoy breathtaking art installations with zero lines."
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
    crowdLevel: "Moderate",
    crowdColor: "#facc15",
    rituals: [
      "Kushmanda Devi Worship",
      "Neighborhood Club Adda & Dhak Rehearsals",
      "Evening Family Pandal Tours"
    ],
    thakumaTip: "Chaturthi night is fantastic for older family members to view big pandals comfortably before barricades restrict walking routes!",
    recommendedPandals: ["Sreebhumi Sporting", "FD Block Salt Lake", "Tala Prattoy"],
    description: "The city buzzes with anticipation as thousands step out into the autumn night breeze for early pandal visits."
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
    description: "All pandals are officially open to the public. Kolkata transforms into the world's largest open-air art gallery."
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
    description: "Maha Shashthi marks the formal spiritual awakening of Maa Durga. The sound of Dhak drums echoes across every para."
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
    description: "The sacred Nabapatrika is bathed in the holy Ganges at sunrise, wrapped in a red-bordered saree, and installed beside Lord Ganesha."
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
    description: "Millions take to the streets in their finest new festive clothes for an all-night celebration under glittering light towers."
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
    description: "The most sacred day of Durga Puja. Devotees fast for morning Pushpanjali, followed by Kumari Puja and the intense 48-minute Sandhi Puja at dusk."
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
    description: "Rhythmic Dhak beats, swirling aromatic coconut husk smoke, and intense Dhunuchi dancing mark the epic last night of Sharodutsav."
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
    description: "With tearful eyes and vermilion-smearing, Kolkata bids farewell to Maa Durga until next year with cries of 'Aasche Bochor Aabar Hobe!'"
  }
];
