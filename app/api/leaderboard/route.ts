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
      console.warn("Supabase leaderboard query notice:", error.message);
    }

    if (!users || users.length === 0) {
      return NextResponse.json([]);
    }

    const formatted = users.map((u) => ({
      _id: u.id,
      name: u.name || "Pujo Explorer",
      image: u.image || "/images/avatar-girl.png",
      visitCount: u.visit_count || (u.visited_pandals ? u.visited_pandals.length : 0)
    }));

    return NextResponse.json(formatted);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
