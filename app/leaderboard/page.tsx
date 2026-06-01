import Navbar from "@/frontend/components/Navbar";
import Image from "next/image";
import { Trophy, Medal, Award, Crown } from "lucide-react";
import dbConnect from "@/backend/mongodb";
import User from "@/backend/models/User";

interface LeaderboardUser {
  _id: string;
  name: string;
  image?: string;
  visitCount: number;
}

export const revalidate = 0; // Disable caching to ensure real-time dynamic leaderboard updates

async function getLeaderboardData() {
  try {
    await dbConnect();
    
    // Ensure some mock competitors exist if database is fresh
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

    const users = await User.find({})
      .sort({ visitCount: -1 })
      .limit(10)
      .select("name image visitCount")
      .lean();

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error("Database connection failed. Falling back to local offline mock leaderboard data:", error);
    return [
      {
        _id: "mock-1",
        name: "Anirban Bhattacharya",
        image: "/images/avatar-boy.png",
        visitCount: 7
      },
      {
        _id: "mock-2",
        name: "Priyanka Sen",
        image: "/images/avatar-girl.png",
        visitCount: 5
      },
      {
        _id: "mock-3",
        name: "Sourav Ganguly",
        image: "/images/avatar-boy.png",
        visitCount: 4
      },
      {
        _id: "mock-4",
        name: "Subhashree Roy",
        image: "/images/avatar-girl.png",
        visitCount: 3
      }
    ];
  }
}

export default async function LeaderboardPage() {
  const users = await getLeaderboardData();

  // Split into top 3 podium and others
  const top1 = users[0];
  const top2 = users[1];
  const top3 = users[2];
  const runnerUps = users.slice(3);

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-12 px-4 sm:px-6 max-w-4xl mx-auto min-h-screen relative overflow-hidden">
        {/* Background Ambient glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full blur-[128px] opacity-10 bg-accent" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-accent text-xs uppercase tracking-widest mb-4">
              <Trophy className="w-3.5 h-3.5 text-accent" style={{ color: "var(--accent)" }} />
              <span style={{ color: "var(--accent)" }}>Kolkata&apos;s Top Explorers</span>
            </div>
            <h1
              className="text-3xl sm:text-5xl mb-2"
              style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
            >
              Maha <span style={{ color: "var(--accent)" }}>Leaderboard</span>
            </h1>
            <p className="text-sm opacity-50 max-w-md mx-auto">
              Meet the grand pandal-hoppers of Durga Puja 2026. Keep exploring to climb up the ranks!
            </p>
          </div>

          {/* Top 3 Podium Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end max-w-2xl mx-auto mb-12 mt-4">
            
            {/* 2nd Place (Silver) */}
            {top2 ? (
              <div className="flex flex-col items-center">
                <div className="relative group flex flex-col items-center">
                  <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-slate-400 overflow-hidden shadow-lg glass bg-white/5">
                    <Image
                      src={top2.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Silver"}
                      alt={top2.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-400 text-black text-[10px] sm:text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-background">
                    2
                  </div>
                </div>
                <div className="text-center mt-3 max-w-[90px] sm:max-w-none">
                  <p className="text-xs sm:text-sm font-semibold truncate leading-tight">{top2.name}</p>
                  <p className="text-[10px] sm:text-xs text-slate-300 mt-0.5">{top2.visitCount} visited</p>
                </div>
                {/* Visual Podium Base */}
                <div className="w-full h-16 sm:h-24 glass border-t border-slate-400/30 rounded-t-xl mt-4 flex items-center justify-center flex-col shadow-[0_-5px_15px_rgba(255,255,255,0.02)]">
                  <Medal className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-1">Silver</span>
                </div>
              </div>
            ) : (
              <div />
            )}

            {/* 1st Place (Gold / Crown) */}
            {top1 ? (
              <div className="flex flex-col items-center">
                <div className="relative group flex flex-col items-center">
                  <div className="absolute -top-7 sm:-top-9 animate-bounce duration-1000">
                    <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="relative w-18 h-18 sm:w-24 sm:h-24 rounded-full border-4 border-yellow-400 overflow-hidden shadow-[0_0_30px_rgba(250,204,21,0.2)] glass bg-white/5">
                    <Image
                      src={top1.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Gold"}
                      alt={top1.name}
                      fill
                      className="object-cover animate-pulse"
                    />
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border border-background shadow-md">
                    1
                  </div>
                </div>
                <div className="text-center mt-3 max-w-[90px] sm:max-w-none">
                  <p className="text-sm sm:text-base font-bold truncate leading-tight text-yellow-400">{top1.name}</p>
                  <p className="text-[10px] sm:text-xs text-yellow-300 font-medium mt-0.5">{top1.visitCount} visited</p>
                </div>
                {/* Visual Podium Base */}
                <div className="w-full h-24 sm:h-32 glass border-t border-yellow-400/40 rounded-t-xl mt-4 flex items-center justify-center flex-col shadow-[0_-5px_25px_rgba(250,204,21,0.05)]">
                  <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400" />
                  <span className="text-[10px] font-bold text-yellow-400 tracking-wider uppercase mt-1">Champion</span>
                </div>
              </div>
            ) : (
              <div />
            )}

            {/* 3rd Place (Bronze) */}
            {top3 ? (
              <div className="flex flex-col items-center">
                <div className="relative group flex flex-col items-center">
                  <div className="relative w-12 h-12 sm:w-18 sm:h-18 rounded-full border-2 border-amber-600 overflow-hidden shadow-lg glass bg-white/5">
                    <Image
                      src={top3.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Bronze"}
                      alt={top3.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[10px] sm:text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-background">
                    3
                  </div>
                </div>
                <div className="text-center mt-3 max-w-[90px] sm:max-w-none">
                  <p className="text-xs sm:text-sm font-semibold truncate leading-tight">{top3.name}</p>
                  <p className="text-[10px] sm:text-xs text-amber-500 mt-0.5">{top3.visitCount} visited</p>
                </div>
                {/* Visual Podium Base */}
                <div className="w-full h-12 sm:h-20 glass border-t border-amber-600/30 rounded-t-xl mt-4 flex items-center justify-center flex-col shadow-[0_-5px_15px_rgba(217,119,6,0.02)]">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                  <span className="text-[10px] font-bold text-amber-600 tracking-wider uppercase mt-1">Bronze</span>
                </div>
              </div>
            ) : (
              <div />
            )}

          </div>

          {/* Runner-Ups Ranked List (4-10) */}
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-white/30 font-bold mb-4">Rankings 4 - 10</h3>
            
            {runnerUps.map((user: LeaderboardUser, index: number) => {
              const rank = index + 4;
              return (
                <div
                  key={user._id}
                  className="glass p-3 sm:p-4 rounded-2xl flex items-center justify-between transition-all duration-300 hover:border-accent/20 group"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Rank Badge */}
                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-semibold text-white/50 group-hover:text-accent group-hover:border-accent/30 transition-colors">
                      {rank}
                    </div>

                    {/* Avatar */}
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/5 border border-white/10">
                      <Image
                        src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Name */}
                    <div>
                      <p className="text-sm font-semibold truncate max-w-[150px] sm:max-w-xs">{user.name}</p>
                    </div>
                  </div>

                  {/* Visit Count */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/40">Visited</span>
                    <div className="px-3 py-1 rounded-xl bg-accent/10 border border-accent/20 text-xs font-bold" style={{ color: "var(--accent)" }}>
                      {user.visitCount} {user.visitCount === 1 ? "Pandal" : "Pandals"}
                    </div>
                  </div>
                </div>
              );
            })}

            {users.length === 0 && (
              <div className="glass rounded-2xl p-12 text-center">
                <p className="opacity-40 text-sm">No pujo explorers listed on the leaderboard yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
