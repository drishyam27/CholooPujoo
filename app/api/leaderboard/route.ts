import { NextResponse } from "next/server";
import { supabase } from "@/backend/supabase";

export async function GET() {
  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("id, name, image, visit_count, visited_pandals")
      .order("visit_count", { ascending: false })
      .limit(10);

    if (error) {
      console.warn("Supabase leaderboard query error:", error.message);
    }

    if (!users || users.length === 0) {
      const mockCompetitors = [
        {
          name: "Anirban Bhattacharya",
          email: "anirban@pujo.com",
          image: "/images/avatar-boy-1-beard.png",
          visited_pandals: ["south-1", "south-2", "south-10", "south-12", "north-1", "north-31", "bonedi-4"],
          visit_count: 7
        },
        {
          name: "Priyanka Sen",
          email: "priyanka@pujo.com",
          image: "/images/avatar-girl.png",
          visited_pandals: ["south-10", "south-12", "south-14", "north-1", "north-24"],
          visit_count: 5
        },
        {
          name: "Sourav Ganguly",
          email: "sourav@pujo.com",
          image: "/images/avatar-boy-3-beard.png",
          visited_pandals: ["south-24", "south-28", "north-31", "north-32"],
          visit_count: 4
        },
        {
          name: "Subhashree Roy",
          email: "subhashree@pujo.com",
          image: "/images/avatar-girl-2.png",
          visited_pandals: ["bonedi-1", "bonedi-3", "bonedi-4"],
          visit_count: 3
        }
      ];

      await supabase.from("users").insert(mockCompetitors);

      return NextResponse.json(
        mockCompetitors.map((u) => ({
          name: u.name,
          image: u.image,
          visitCount: u.visit_count
        }))
      );
    }

    const formatted = users.map((u) => ({
      _id: u.id,
      name: u.name || "Explorer",
      image: u.image || "/images/avatar-girl.png",
      visitCount: u.visit_count || (u.visited_pandals ? u.visited_pandals.length : 0)
    }));

    return NextResponse.json(formatted);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
