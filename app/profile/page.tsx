import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "@/frontend/components/Navbar";
import Link from "next/link";
import { MapPin, Trophy, Calendar, CheckCircle2, Bookmark, ArrowRight, Activity } from "lucide-react";
import { supabase } from "@/backend/supabase";
import { pandals } from "@/frontend/lib/mockData";
import AvatarSelector from "@/frontend/components/AvatarSelector";

export const revalidate = 0; // Ensure fresh profile rendering

async function getProfileData() {
  try {
    const session = await getServerSession(authOptions);

    let email = session?.user?.email;
    const name = session?.user?.name || "Test Pujo Explorer";
    const image = session?.user?.image || "/images/avatar-girl.png";

    if (!email) {
      email = "mock-tester@choloopujoo.com";
    }

    // Find or create the user in Supabase
    let { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!user || error) {
      // Create user record in Supabase
      const { data: newUser, error: createError } = await supabase
        .from("users")
        .insert({
          email,
          name,
          image,
          visited_pandals: [],
          visit_count: 0
        })
        .select()
        .single();

      if (createError || !newUser) {
        console.warn("Supabase user creation notice:", createError?.message);
        user = {
          email,
          name,
          image,
          visited_pandals: [],
          visit_count: 0,
          created_at: new Date().toISOString()
        };
      } else {
        user = newUser;
      }
    }

    const visitedPandals = user.visited_pandals || user.visitedPandals || [];
    const visitCount = visitedPandals.length;

    // Calculate dynamic global rank in Supabase
    const { count } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .gt("visit_count", visitCount);

    const rank = (count || 0) + 1;

    return {
      user: {
        ...user,
        visitedPandals,
        visitCount,
        createdAt: user.created_at || user.createdAt
      },
      rank
    };
  } catch (error) {
    console.error("Supabase profile fetch error. Falling back to local offline mock profile data:", error);
    return {
      user: {
        email: "mock-tester@choloopujoo.com",
        name: "Test Pujo Explorer",
        image: "/images/avatar-girl.png",
        visitedPandals: ["south-12", "south-14", "north-31", "bonedi-3"],
        visitCount: 4,
        createdAt: new Date().toISOString()
      },
      rank: 1
    };
  }
}

export default async function ProfilePage() {
  const { user, rank } = await getProfileData();

  // Cross-reference user's visited list with detailed pandal metadata
  const visitedIds = user.visitedPandals || [];
  const visitedList = pandals.filter((p) => visitedIds.includes(p.id));

  // Calculate category statistics
  const bonediCount = visitedList.filter((p) => p.category === "bonedi-bari").length;
  const northCount = visitedList.filter((p) => p.category === "north-kolkata").length;
  const southCount = visitedList.filter((p) => p.category === "south-kolkata").length;

  const totalBonedi = pandals.filter((p) => p.category === "bonedi-bari").length;
  const totalNorth = pandals.filter((p) => p.category === "north-kolkata").length;
  const totalSouth = pandals.filter((p) => p.category === "south-kolkata").length;

  const joinedDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  }) : "June 2026";

  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28 md:pt-32 pb-12 px-4 sm:px-6 max-w-4xl mx-auto min-h-screen relative overflow-hidden">
        {/* Decorative ambient background blur */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full blur-[128px] opacity-10 bg-accent" />
        </div>

        <div className="relative z-10 space-y-8">
          
          {/* Profile Header Card */}
          <div className="glass rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 border-accent/15">
            <AvatarSelector
              initialAvatarUrl={user.image}
              userName={user.name}
            />

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <h1
                className="text-2xl sm:text-4xl"
                style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
              >
                {user.name}
              </h1>
              <p className="text-sm opacity-50">{user.email}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs opacity-60">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Joined {joinedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Kolkata, India
                </span>
              </div>
            </div>

            {/* Overall Rank Badge */}
            <div className="glass p-5 rounded-2xl text-center border-accent/20 flex flex-col items-center justify-center w-36 shadow-lg shadow-black/30">
              <Trophy className="w-6 h-6 mb-1 text-yellow-400" />
              <p className="text-2xl font-black text-yellow-400">#{rank}</p>
              <p className="text-[10px] uppercase tracking-widest opacity-40 mt-1 font-bold">Global Rank</p>
            </div>
          </div>

          {/* Stats Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            
            {/* Stat 1: Visited Count */}
            <div className="glass p-5 rounded-2xl border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">{visitedIds.length}</p>
                <p className="text-xs opacity-50 mt-0.5">Pandals Visited</p>
              </div>
            </div>

            {/* Stat 2: Progress Ratio */}
            <div className="glass p-5 rounded-2xl border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
                  {Math.round((visitedIds.length / pandals.length) * 100)}%
                </p>
                <p className="text-xs opacity-50 mt-0.5">Total Completion</p>
              </div>
            </div>

            {/* Stat 3: Target Remaining */}
            <div className="glass p-5 rounded-2xl border-white/5 flex items-center gap-4 sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                <Bookmark className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-400">{pandals.length - visitedIds.length}</p>
                <p className="text-xs opacity-50 mt-0.5">Pandals Remaining</p>
              </div>
            </div>

          </div>


          {/* Zones Progress Breakdown */}
          <div className="glass rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-white/30 font-bold mb-4">Zones Exploration Progress</h3>
            
            <div className="space-y-4">
              {/* Category: Bonedi Bari */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Bonedi Bari (Heritage Households)</span>
                  <span className="opacity-50">{bonediCount} / {totalBonedi}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${(bonediCount / totalBonedi) * 100}%` }}
                  />
                </div>
              </div>

              {/* Category: North Kolkata */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">North Kolkata (Traditional & Grand)</span>
                  <span className="opacity-50">{northCount} / {totalNorth}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${(northCount / totalNorth) * 100}%` }}
                  />
                </div>
              </div>

              {/* Category: South Kolkata */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">South Kolkata (Modern & Iconic)</span>
                  <span className="opacity-50">{southCount} / {totalSouth}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full transition-all duration-500"
                    style={{ width: `${(southCount / totalSouth) * 100}%`, background: "var(--accent)" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Visited Pandals Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>
                My Completed Visits ({visitedList.length})
              </h2>
              {visitedList.length === 0 && (
                <Link
                  href="/"
                  className="text-xs flex items-center gap-1 hover:underline transition-all"
                  style={{ color: "var(--accent)" }}
                >
                  Explore Categories <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {visitedList.map((pandal) => (
                <div
                  key={pandal.id}
                  className="glass p-4 rounded-2xl flex items-center gap-4 transition-all hover:border-accent/15"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold truncate">{pandal.name}</h4>
                    <p className="text-xs opacity-50 truncate mt-0.5">{pandal.location}</p>
                  </div>
                  <button
                    onClick={undefined} // Handled statically inside SSR layout
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <a href={pandal.mapUrl} target="_blank" rel="noopener noreferrer">
                      Map
                    </a>
                  </button>
                </div>
              ))}
            </div>

            {visitedList.length === 0 && (
              <div className="glass rounded-3xl p-12 text-center space-y-3">
                <p className="opacity-40 text-sm">You haven&apos;t marked any pandals as visited yet.</p>
                <p className="text-xs opacity-30">Go to the exploration categories, mark pandals as visited, and watch your rank grow!</p>
                <div className="pt-2">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white transition-all duration-300 hover:brightness-110 active:scale-95"
                    style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-hover))" }}
                  >
                    Start Exploring <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
