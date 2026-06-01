import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/backend/mongodb";
import User from "@/backend/models/User";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    let email = session?.user?.email;

    // Fallback to mock user for local testing preview if no session is active
    if (!email) {
      email = "mock-tester@choloopujoo.com";
    }

    const { avatarUrl } = await request.json();
    if (!avatarUrl) {
      return NextResponse.json({ error: "Avatar URL is required" }, { status: 400 });
    }

    await dbConnect();
    
    // Find and update the user's image in MongoDB
    const user = await User.findOneAndUpdate(
      { email },
      { image: avatarUrl },
      { new: true, upsert: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Avatar updated successfully!",
      image: user.image 
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
