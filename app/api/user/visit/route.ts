import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabase } from "@/backend/supabase";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    let email = session?.user?.email;
    const name = session?.user?.name || "Test Pujo Explorer";
    const image = session?.user?.image || "/images/avatar-girl.png";

    if (!email) {
      email = "mock-tester@choloopujoo.com";
    }

    const { pandalId } = await request.json();
    if (!pandalId) {
      return NextResponse.json({ error: "Pandal ID is required" }, { status: 400 });
    }

    // Find user in Supabase
    let { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!user) {
      const { data: newUser } = await supabase
        .from("users")
        .insert({
          email,
          name,
          image,
          visited_pandals: [pandalId],
          visit_count: 1
        })
        .select()
        .single();

      user = newUser || {
        email,
        name,
        image,
        visited_pandals: [pandalId],
        visit_count: 1
      };

      return NextResponse.json({
        success: true,
        message: "Pandal marked as visited in Supabase!",
        visitedPandals: user.visited_pandals,
        visitCount: user.visit_count
      });
    }

    let visitedList: string[] = user.visited_pandals || user.visitedPandals || [];
    
    // Toggle or Add
    if (visitedList.includes(pandalId)) {
      visitedList = visitedList.filter((id) => id !== pandalId);
    } else {
      visitedList = [...visitedList, pandalId];
    }

    const visitCount = visitedList.length;

    // Update record in Supabase
    await supabase
      .from("users")
      .update({
        visited_pandals: visitedList,
        visit_count: visitCount
      })
      .eq("email", email);

    return NextResponse.json({
      success: true,
      message: "Pandal visit checklist updated in Supabase!",
      visitedPandals: visitedList,
      visitCount
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
