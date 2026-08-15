import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabase } from "@/backend/supabase";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    let email = session?.user?.email;

    if (!email) {
      email = "mock-tester@choloopujoo.com";
    }

    const { avatarUrl } = await request.json();
    if (!avatarUrl) {
      return NextResponse.json({ error: "Avatar URL is required" }, { status: 400 });
    }

    // Upsert user image in Supabase
    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!user) {
      await supabase.from("users").insert({
        email,
        name: session?.user?.name || "Test Pujo Explorer",
        image: avatarUrl,
        visited_pandals: [],
        visit_count: 0
      });
    } else {
      await supabase
        .from("users")
        .update({ image: avatarUrl })
        .eq("email", email);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Avatar updated successfully in Supabase!",
      image: avatarUrl 
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
