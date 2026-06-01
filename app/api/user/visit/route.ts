import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/backend/mongodb";
import User from "@/backend/models/User";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    let email = session?.user?.email;
    const name = session?.user?.name || "Test Pujo Explorer";
    const image = session?.user?.image || "/images/avatar-girl.png";

    // Auto-fallback to a mock user in local development preview if no session exists
    if (!email) {
      email = "mock-tester@choloopujoo.com";
      console.log("No active NextAuth session found. Using mock explorer fallback for testing.");
    }

    const { pandalId } = await request.json();
    if (!pandalId) {
      return NextResponse.json({ error: "Pandal ID is required" }, { status: 400 });
    }

    await dbConnect();
    
    // Find or create the user (using upsert logic for development robustness)
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name,
        image,
        visitedPandals: [],
        visitCount: 0
      });
    }

    // Initialize visitedPandals array if missing
    if (!user.visitedPandals) {
      user.visitedPandals = [];
    }

    // Add to visited list if not already present
    if (!user.visitedPandals.includes(pandalId)) {
      user.visitedPandals.push(pandalId);
      user.visitCount = user.visitedPandals.length;
      await user.save();
      
      return NextResponse.json({ 
        success: true, 
        message: "Pandal marked as visited in MongoDB!",
        visitedPandals: user.visitedPandals,
        visitCount: user.visitCount
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Pandal was already visited.",
      visitedPandals: user.visitedPandals,
      visitCount: user.visitCount
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
