import { NextResponse } from "next/server";
import dbConnect from "@/backend/mongodb";
import User from "@/backend/models/User";

export async function GET() {
  try {
    await dbConnect();
    
    // Auto-populate some beautiful mock competitors if the database has no users yet (for visualization)
    const count = await User.countDocuments();
    if (count === 0) {
      await User.insertMany([
        {
          name: "Anirban Bhattacharya",
          email: "anirban@pujo.com",
          image: "/images/avatar-boy.png",
          visitedPandals: ["south-1", "south-2", "south-10", "south-12", "north-1", "north-31", "bonedi-4"],
          visitCount: 7
        },
        {
          name: "Priyanka Sen",
          email: "priyanka@pujo.com",
          image: "/images/avatar-girl.png",
          visitedPandals: ["south-10", "south-12", "south-14", "north-1", "north-24"],
          visitCount: 5
        },
        {
          name: "Sourav Ganguly",
          email: "sourav@pujo.com",
          image: "/images/avatar-boy.png",
          visitedPandals: ["south-24", "south-28", "north-31", "north-32"],
          visitCount: 4
        },
        {
          name: "Subhashree Roy",
          email: "subhashree@pujo.com",
          image: "/images/avatar-girl.png",
          visitedPandals: ["bonedi-1", "bonedi-3", "bonedi-4"],
          visitCount: 3
        }
      ]);
    }

    const topUsers = await User.find({})
      .sort({ visitCount: -1 })
      .limit(10)
      .select("name image visitCount")
      .lean();

    return NextResponse.json(topUsers);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
