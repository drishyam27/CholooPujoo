import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabase } from "@/backend/supabase";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ history: [] });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("chat_history")
      .eq("email", email)
      .single();

    if (error) {
      console.warn("Chat history fetch notice:", error.message);
      return NextResponse.json({ history: [] });
    }

    return NextResponse.json({ history: user?.chat_history || [] });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ success: true, saved: false });
    }

    const { history } = await request.json();

    if (!Array.isArray(history)) {
      return NextResponse.json({ error: "Invalid history format" }, { status: 400 });
    }

    // Keep last 40 messages to prevent database row bloat
    const trimmedHistory = history.slice(-40);

    const { error } = await supabase
      .from("users")
      .update({ chat_history: trimmedHistory })
      .eq("email", email);

    if (error) {
      console.warn("Chat history save notice:", error.message);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
