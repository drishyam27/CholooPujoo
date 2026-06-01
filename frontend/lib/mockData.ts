export type CrowdLevel = "Medium" | "High" | "Extreme";

export interface Pandal {
  id: string;
  name: string;
  category: "bonedi-bari" | "north-kolkata" | "south-kolkata";
  location: string;
  crowdLevel: CrowdLevel;
  imageUrl: string;
  mapUrl: string;
}

export const pandals: Pandal[] = [
  // ==================== SOUTH KOLKATA PANDALS (38 items) ====================
  {
    id: "south-1",
    name: "Barisha Sarbojonin",
    category: "south-kolkata",
    location: "Behala, South Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Barisha+Sarbojonin+Kolkata"
  },
  {
    id: "south-2",
    name: "Behala Friends'",
    category: "south-kolkata",
    location: "Behala, South Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Behala+Friends+Club+Kolkata"
  },
  {
    id: "south-3",
    name: "Jayrampur sarbojonin Durga Puja committee",
    category: "south-kolkata",
    location: "Behala, South Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Jayrampur+sarbojonin+Durga+Puja+committee+Kolkata"
  },
  {
    id: "south-4",
    name: "Behala chowrasta players corner",
    category: "south-kolkata",
    location: "Behala, South Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Behala+chowrasta+players+corner+Kolkata"
  },
  {
    id: "south-5",
    name: "Unnayani Sangha",
    category: "south-kolkata",
    location: "South Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Unnayani+Sangha+Durga+Puja+Kolkata"
  },
  {
    id: "south-6",
    name: "Pally unnayan Samiti",
    category: "south-kolkata",
    location: "South Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Pally+unnayan+Samiti+Durga+Puja+Kolkata"
  },
  {
    id: "south-7",
    name: "Vivekananda park athletic club",
    category: "south-kolkata",
    location: "Keyatala, South Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Vivekananda+park+athletic+club+Kolkata"
  },
  {
    id: "south-8",
    name: "Adarsha Samiti club",
    category: "south-kolkata",
    location: "South Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Adarsha+Samiti+club+Durga+Puja+Kolkata"
  },
  {
    id: "south-9",
    name: "41 pally club",
    category: "south-kolkata",
    location: "Haridevpur, South Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=41+pally+club+Kolkata"
  },
  {
    id: "south-10",
    name: "Badamtala ashar sangha",
    category: "south-kolkata",
    location: "Kalighat, South Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Badamtala+ashar+sangha+Kolkata"
  },
  {
    id: "south-11",
    name: "66 pally",
    category: "south-kolkata",
    location: "Kalighat, South Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=66+pally+Kolkata"
  },
  {
    id: "south-12",
    name: "Chetla agrani",
    category: "south-kolkata",
    location: "Chetla, South Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Chetla+agrani+Kolkata"
  },
  {
    id: "south-13",
    name: "Alipore sarbojonin",
    category: "south-kolkata",
    location: "Alipore, South Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Alipore+sarbojonin+Durga+Puja+Kolkata"
  },
  {
    id: "south-14",
    name: "Suruchi Sangha",
    category: "south-kolkata",
    location: "New Alipore, South Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Suruchi+Sangha+Kolkata"
  },
  {
    id: "south-15",
    name: "Mudiali club",
    category: "south-kolkata",
    location: "Tollygunge, South Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Mudiali+club+Kolkata"
  },
  {
    id: "south-16",
    name: "Shib mandir sarbojonin",
    category: "south-kolkata",
    location: "Tollygunge, South Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Shib+mandir+sarbojonin+Kolkata"
  },
  {
    id: "south-17",
    name: "Deshapriyo park",
    category: "south-kolkata",
    location: "Kalighat, South Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Deshapriyo+park+Kolkata"
  },
  {
    id: "south-18",
    name: "Tridhara sammilani",
    category: "south-kolkata",
    location: "Ballygunge, South Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Tridhara+sammilani+Kolkata"
  },
  {
    id: "south-19",
    name: "Ballygunge cultural",
    category: "south-kolkata",
    location: "Ballygunge, South Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Ballygunge+cultural+association+Kolkata"
  },
  {
    id: "south-20",
    name: "Samaj sebi sangha",
    category: "south-kolkata",
    location: "Ballygunge, South Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Samaj+sebi+sangha+Kolkata"
  },
  {
    id: "south-21",
    name: "Hindustan Club",
    category: "south-kolkata",
    location: "Gariahat, South Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Hindustan+Club+Durga+Puja+Kolkata"
  },
  {
    id: "south-22",
    name: "Hindustan park",
    category: "south-kolkata",
    location: "Gariahat, South Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Hindustan+park+Durga+Puja+Kolkata"
  },
  {
    id: "south-23",
    name: "Singhi park",
    category: "south-kolkata",
    location: "Gariahat, South Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Singhi+park+Durga+Puja+Kolkata"
  },
  {
    id: "south-24",
    name: "Ekdalia evergreen",
    category: "south-kolkata",
    location: "Gariahat, South Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Ekdalia+evergreen+club+Kolkata"
  },
  {
    id: "south-25",
    name: "Alipore 78 pally",
    category: "south-kolkata",
    location: "Alipore, South Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Alipore+78+pally+Kolkata"
  },
  {
    id: "south-26",
    name: "Kalighat Milan sangha",
    category: "south-kolkata",
    location: "Kalighat, South Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kalighat+Milan+sangha+Kolkata"
  },
  {
    id: "south-27",
    name: "Abasar sarbojonin",
    category: "south-kolkata",
    location: "Bhawanipur, South Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Abasar+sarbojonin+Kolkata"
  },
  {
    id: "south-28",
    name: "Maddox square",
    category: "south-kolkata",
    location: "Ballygunge, South Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Maddox+square+Kolkata"
  },
  {
    id: "south-29",
    name: "Baghajatin Tarun sangha",
    category: "south-kolkata",
    location: "Baghajatin, South Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Baghajatin+Tarun+sangha+Kolkata"
  },
  {
    id: "south-30",
    name: "Vivekananda Milan sangha",
    category: "south-kolkata",
    location: "Baghajatin, South Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Vivekananda+Milan+sangha+Baghajatin+Kolkata"
  },
  {
    id: "south-31",
    name: "Baghajatin B & C block",
    category: "south-kolkata",
    location: "Baghajatin, South Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Baghajatin+B+and+C+block+Durga+Puja+Kolkata"
  },
  {
    id: "south-32",
    name: "Santoshpur lakepally",
    category: "south-kolkata",
    location: "Santoshpur, South Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Santoshpur+lakepally+Kolkata"
  },
  {
    id: "south-33",
    name: "Santoshpur Trikon park",
    category: "south-kolkata",
    location: "Santoshpur, South Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Santoshpur+Trikon+park+Kolkata"
  },
  {
    id: "south-34",
    name: "Shyama pally Shyama sangha",
    category: "south-kolkata",
    location: "Santoshpur, South Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Shyama+pally+Shyama+sangha+Kolkata"
  },
  {
    id: "south-35",
    name: "Pallymangal Samiti sarbojonin",
    category: "south-kolkata",
    location: "South Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Pallymangal+Samiti+sarbojonin+Kolkata"
  },
  {
    id: "south-36",
    name: "Jodhpur park",
    category: "south-kolkata",
    location: "Jodhpur Park, South Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Jodhpur+park+Durga+Puja+Kolkata"
  },
  {
    id: "south-37",
    name: "Selimpur pally",
    category: "south-kolkata",
    location: "Selimpur, South Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/south-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Selimpur+pally+Kolkata"
  },
  {
    id: "south-38",
    name: "Babubagan durgotsav",
    category: "south-kolkata",
    location: "Dhakuria, South Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/south-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Babubagan+durgotsav+Kolkata"
  },

  // ==================== NORTH & CENTRAL KOLKATA PANDALS (42 items) ====================
  {
    id: "north-1",
    name: "Sreebhumi Durga Puja pandal",
    category: "north-kolkata",
    location: "Lake Town, North Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sreebhumi+Sporting+Club+Kolkata"
  },
  {
    id: "north-2",
    name: "Lake town adhibasi brinda",
    category: "north-kolkata",
    location: "Lake Town, North Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lake+town+adhibasi+brinda+Kolkata"
  },
  {
    id: "north-3",
    name: "Netaji sporting club",
    category: "north-kolkata",
    location: "Lake Town, North Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Netaji+sporting+club+Lake+Town+Kolkata"
  },
  {
    id: "north-4",
    name: "Dumdum Park jubak brinda",
    category: "north-kolkata",
    location: "Dum Dum Park, North Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Dumdum+Park+jubak+brinda+Kolkata"
  },
  {
    id: "north-5",
    name: "Dumdum Park Tarun Sangha",
    category: "north-kolkata",
    location: "Dum Dum Park, North Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Dumdum+Park+Tarun+Sangha+Kolkata"
  },
  {
    id: "north-6",
    name: "Dumdum Park sarbojonin",
    category: "north-kolkata",
    location: "Dum Dum Park, North Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Dumdum+Park+sarbojonin+Kolkata"
  },
  {
    id: "north-7",
    name: "Dumdum Park bharat Chakra",
    category: "north-kolkata",
    location: "Dum Dum Park, North Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Dumdum+Park+bharat+Chakra+Kolkata"
  },
  {
    id: "north-8",
    name: "Masterda Smriti Sangha",
    category: "north-kolkata",
    location: "Dum Dum Park, North Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Masterda+Smriti+Sangha+Dum+Dum+Park+Kolkata"
  },
  {
    id: "north-9",
    name: "Kestopur prafulla kano poschim adivasi brinda",
    category: "north-kolkata",
    location: "Kestopur, North Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kestopur+prafulla+kano+poschim+adivasi+brinda+Kolkata"
  },
  {
    id: "north-10",
    name: "Dakshinpara durgotsav committee",
    category: "north-kolkata",
    location: "Lake Town, North Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Dakshinpara+durgotsav+committee+Kolkata"
  },
  {
    id: "north-11",
    name: "Dakshindari youth",
    category: "north-kolkata",
    location: "Dakshindari, North Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Dakshindari+youth+Durga+Puja+Kolkata"
  },
  {
    id: "north-12",
    name: "Telengabagan Sarbojonin",
    category: "north-kolkata",
    location: "Ultadanga, North Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Telengabagan+Sarbojonin+Kolkata"
  },
  {
    id: "north-13",
    name: "Ultadanga Bidhansangha",
    category: "north-kolkata",
    location: "Ultadanga, North Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Ultadanga+Bidhansangha+Kolkata"
  },
  {
    id: "north-14",
    name: "Kabiraj bagan sarbojonin",
    category: "north-kolkata",
    location: "Ultadanga, North Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kabiraj+bagan+sarbojonin+Kolkata"
  },
  {
    id: "north-15",
    name: "Lalabagan nabankur",
    category: "north-kolkata",
    location: "Maniktala, North Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lalabagan+nabankur+Kolkata"
  },
  {
    id: "north-16",
    name: "Chaltabagan",
    category: "north-kolkata",
    location: "Maniktala, North Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Chaltabagan+Durga+Puja+Kolkata"
  },
  {
    id: "north-17",
    name: "Azad hing bag sarbojonin",
    category: "north-kolkata",
    location: "Central Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Azad+hind+bag+sarbojonin+Kolkata"
  },
  {
    id: "north-18",
    name: "Kashi bose lane",
    category: "north-kolkata",
    location: "Hatibagan, North Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kashi+bose+lane+Kolkata"
  },
  {
    id: "north-19",
    name: "Hatibagan sarbojonin",
    category: "north-kolkata",
    location: "Hatibagan, North Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Hatibagan+sarbojonin+Kolkata"
  },
  {
    id: "north-20",
    name: "Nalin Sarkar street",
    category: "north-kolkata",
    location: "Hatibagan, North Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Nalin+Sarkar+street+Kolkata"
  },
  {
    id: "north-21",
    name: "Hatibagan nabinpally",
    category: "north-kolkata",
    location: "Hatibagan, North Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Hatibagan+nabinpally+Kolkata"
  },
  {
    id: "north-22",
    name: "Sikdar bagan",
    category: "north-kolkata",
    location: "Hatibagan, North Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sikdar+bagan+Kolkata"
  },
  {
    id: "north-23",
    name: "Jagat Mukherjee park",
    category: "north-kolkata",
    location: "Kumartuli, North Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Jagat+Mukherjee+park+Kolkata"
  },
  {
    id: "north-24",
    name: "Kumartuli park",
    category: "north-kolkata",
    location: "Kumartuli, North Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kumartuli+park+Kolkata"
  },
  {
    id: "north-25",
    name: "Ahiritola jubak brinda",
    category: "north-kolkata",
    location: "Ahiritola, North Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Ahiritola+jubak+brinda+Kolkata"
  },
  {
    id: "north-26",
    name: "Ahiritola sarbojonin",
    category: "north-kolkata",
    location: "Ahiritola, North Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Ahiritola+sarbojonin+Kolkata"
  },
  {
    id: "north-27",
    name: "Simla byayam Samiti",
    category: "north-kolkata",
    location: "North Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Simla+byayam+Samiti+Kolkata"
  },
  {
    id: "north-28",
    name: "Chorbagan sarbojonin",
    category: "north-kolkata",
    location: "Central Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Chorbagan+sarbojonin+Kolkata"
  },
  {
    id: "north-29",
    name: "Jorasanko 7 pally sarbojonin",
    category: "north-kolkata",
    location: "Jorasanko, North Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Jorasanko+7+pally+sarbojonin+Kolkata"
  },
  {
    id: "north-30",
    name: "Jorasanko sadharan durgotsav",
    category: "north-kolkata",
    location: "Jorasanko, North Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Jorasanko+sadharan+durgotsav+Kolkata"
  },
  {
    id: "north-31",
    name: "Bagbazar sarbojonin",
    category: "north-kolkata",
    location: "Bagbazar, North Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Bagbazar+sarbojonin+Kolkata"
  },
  {
    id: "north-32",
    name: "Bagbazar Durga Puja",
    category: "north-kolkata",
    location: "Bagbazar, North Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Bagbazar+Durga+Puja+Kolkata"
  },
  {
    id: "north-33",
    name: "Belgachia sarbojonin",
    category: "north-kolkata",
    location: "Belgachia, North Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Belgachia+sarbojonin+Kolkata"
  },
  {
    id: "north-34",
    name: "Tala prattay",
    category: "north-kolkata",
    location: "Tala, North Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Tala+prattay+Kolkata"
  },
  {
    id: "north-35",
    name: "Tala barowari",
    category: "north-kolkata",
    location: "Tala, North Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Tala+barowari+Kolkata"
  },
  {
    id: "north-36",
    name: "Muhammad ali park",
    category: "north-kolkata",
    location: "Central Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Muhammad+ali+park+Durga+Puja+Kolkata"
  },
  {
    id: "north-37",
    name: "College square sarbojonin",
    category: "north-kolkata",
    location: "Central Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=College+square+sarbojonin+Kolkata"
  },
  {
    id: "north-38",
    name: "Santosh mitra square (Sealdah)",
    category: "north-kolkata",
    location: "Central Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Santosh+mitra+square+Kolkata"
  },
  {
    id: "north-39",
    name: "Beliaghata 33 pally (phoolbagan)",
    category: "north-kolkata",
    location: "Beliaghata, East Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Beliaghata+33+pally+Kolkata"
  },
  {
    id: "north-40",
    name: "Sandhani club",
    category: "north-kolkata",
    location: "Beliaghata, East Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sandhani+club+Beliaghata+Kolkata"
  },
  {
    id: "north-41",
    name: "Salt Lake Ak block",
    category: "north-kolkata",
    location: "Salt Lake, East Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/north-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Salt+Lake+Ak+block+Durga+Puja+Kolkata"
  },
  {
    id: "north-42",
    name: "Kankurgachi mitali sangha (bengal chemical)",
    category: "north-kolkata",
    location: "Kankurgachi, East Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/north-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kankurgachi+mitali+sangha+Kolkata"
  },

  // ==================== BONEDI BARIS (Heritage Homes - 13 items) ====================
  {
    id: "bonedi-1",
    name: "Mallick bari (South)",
    category: "bonedi-bari",
    location: "Bhowanipore, South Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/bonedi-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Mallick+bari+Durga+Puja+Bhowanipore+Kolkata"
  },
  {
    id: "bonedi-2",
    name: "Saha bari",
    category: "bonedi-bari",
    location: "Central Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/bonedi-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Saha+bari+Durga+Puja+Kolkata"
  },
  {
    id: "bonedi-3",
    name: "Laha bari",
    category: "bonedi-bari",
    location: "Thanthania, North Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/bonedi-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Laha+bari+Durga+Puja+Kolkata"
  },
  {
    id: "bonedi-4",
    name: "Sovabazar Rajbari",
    category: "bonedi-bari",
    location: "Sovabazar, North Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/bonedi-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sovabazar+Rajbari+Durga+Puja+Kolkata"
  },
  {
    id: "bonedi-5",
    name: "Chhatu babu latu babu thakurbari",
    category: "bonedi-bari",
    location: "Beadon Street, North Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/bonedi-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Chhatu+babu+latu+babu+thakurbari+Kolkata"
  },
  {
    id: "bonedi-6",
    name: "Chorbagan mitra bari",
    category: "bonedi-bari",
    location: "Chorbagan, Central Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/bonedi-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Chorbagan+mitra+bari+Durga+Puja+Kolkata"
  },
  {
    id: "bonedi-7",
    name: "Thanthania dutta bari",
    category: "bonedi-bari",
    location: "Thanthania, North Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/bonedi-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Thanthania+dutta+bari+Durga+Puja+Kolkata"
  },
  {
    id: "bonedi-8",
    name: "Chorbagan sil's thakurbari",
    category: "bonedi-bari",
    location: "Chorbagan, Central Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/bonedi-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Chorbagan+sils+thakurbari+Durga+Puja+Kolkata"
  },
  {
    id: "bonedi-9",
    name: "Jorasanko shib Krishna daw bari",
    category: "bonedi-bari",
    location: "Jorasanko, North Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/bonedi-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Jorasanko+shib+Krishna+daw+bari+Durga+Puja+Kolkata"
  },
  {
    id: "bonedi-10",
    name: "Harakutir roy banerjee bari",
    category: "bonedi-bari",
    location: "Central Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/bonedi-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Harakutir+roy+banerjee+bari+Durga+Puja+Kolkata"
  },
  {
    id: "bonedi-11",
    name: "Pathuriaghata rajbari",
    category: "bonedi-bari",
    location: "Pathuriaghata, North Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/bonedi-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Pathuriaghata+rajbari+Durga+Puja+Kolkata"
  },
  {
    id: "bonedi-12",
    name: "Badan Chandra roy bari",
    category: "bonedi-bari",
    location: "Central Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/bonedi-2.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Badan+Chandra+roy+bari+Durga+Puja+Kolkata"
  },
  {
    id: "bonedi-13",
    name: "Motilal seal's bari",
    category: "bonedi-bari",
    location: "Colootola, Central Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/bonedi-1.png",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Motilal+seals+bari+Durga+Puja+Kolkata"
  }
];
