export type CrowdLevel = "Medium" | "High" | "Extreme";

export interface Pandal {
  id: string;
  name: string;
  category: "bonedi-bari" | "north-kolkata" | "south-kolkata";
  location: string;
  crowdLevel: CrowdLevel;
  imageUrl: string;
}

export const pandals: Pandal[] = [
  {
    id: "1",
    name: "Sovabazar Rajbari",
    category: "bonedi-bari",
    location: "North Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/bonedi-1.png",
  },
  {
    id: "2",
    name: "Bagbazar Sarbojanin",
    category: "north-kolkata",
    location: "North Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/north-1.png",
  },
  {
    id: "3",
    name: "Deshapriya Park",
    category: "south-kolkata",
    location: "South Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/south-1.png",
  },
  {
    id: "4",
    name: "Maddox Square",
    category: "south-kolkata",
    location: "South Kolkata",
    crowdLevel: "Extreme",
    imageUrl: "/images/south-2.png",
  },
  {
    id: "5",
    name: "Kumartuli Park",
    category: "north-kolkata",
    location: "North Kolkata",
    crowdLevel: "High",
    imageUrl: "/images/north-2.png",
  },
  {
    id: "6",
    name: "Hatkhola Gosain Bari",
    category: "bonedi-bari",
    location: "North Kolkata",
    crowdLevel: "Medium",
    imageUrl: "/images/bonedi-2.png",
  },
];
