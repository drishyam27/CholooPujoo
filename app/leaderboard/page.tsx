"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/frontend/components/Navbar";
import Image from "next/image";
import { Trophy, Medal, Award, Crown, Radio, Flame } from "lucide-react";
import { supabase } from "@/backend/supabase";
import Link from "next/link";

interface LeaderboardUser {
  _id: string;
  name: string;
  image?: string;
  visitCount: number;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  // Fetch real users sorted by visitCount from Supabase
  const fetchLeaderboard = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, name, image, visit_count, visited_pandals")
        .order("visit_count", { ascending: false })
        .limit(10);

      if (error) {
        console.warn("Supabase realtime leaderboard fetch notice:", error.message);
      }

      if (data) {
        const formatted: LeaderboardUser[] = data.map((u) => ({
          _id: u.id,
          name: u.name || "Pujo Explorer",
          image: u.image || "/images/avatar-girl.png",
          visitCount: u.visit_count || (u.visited_pandals ? u.visited_pandals.length : 0),
        }));
        setUsers(formatted);
      }
    } catch (err) {
      console.error("Failed to load real leaderboard:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();

    // Subscribe to real-time WebSockets on the Supabase `users` table
    const channel = supabase
      .channel("realtime-leaderboard-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        () => {
          console.log("[Realtime WebSocket] User visit payload received, refreshing Maha Leaderboard...");
          fetchLeaderboard();
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setIsLive(true);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchLeaderboard]);

  const top1 = users[0];
  const top2 = users[1];
  const top3 = users[2];
  const runnerUps = users.slice(3);

  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28 md:pt-32 pb-12 px-4 sm:px-6 max-w-4xl mx-auto min-h-screen relative overflow-hidden">
        {/* Background Ambient glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full blur-[128px] opacity-10 bg-accent" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-accent text-xs uppercase tracking-widest mb-4">
              <Trophy className="w-3.5 h-3.5 text-accent" style={{ color: "var(--accent)" }} />
              <span style={{ color: "var(--accent)" }}>Kolkata&apos;s Real-Time Explorers</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping ml-1" />
            </div>

            <h1
              className="text-3xl sm:text-5xl mb-2"
              style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
            >
              Maha <span style={{ color: "var(--accent)" }}>Leaderboard</span>
            </h1>

            <p className="text-sm opacity-50 max-w-md mx-auto mb-3">
              Meet the real pandal-hoppers of Durga Puja 2026. Ranks update live in real-time as users visit pandals!
            </p>

            {/* Realtime Stream Active Badge */}
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 opacity-70">
              <Radio className={`w-3 h-3 ${isLive ? "text-green-400 animate-pulse" : "text-amber-400"}`} />
              <span>{isLive ? "Live Stream Connected" : "Updating Live Scores..."}</span>
            </div>
          </div>

          {loading ? (
            <div className="glass rounded-3xl p-12 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs opacity-50">Loading real user ranks from Supabase...</p>
            </div>
          ) : users.length === 0 ? (
            /* Empty State when no real user visits exist yet */
            <div className="glass rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto border-accent/20">
              <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto text-accent text-2xl shadow-[0_0_20px_rgba(255,77,61,0.2)]">
                🏆
              </div>
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Be the #1 Champion!
              </h3>
              <p className="text-sm opacity-60">
                No explorers have visited any pandals yet today. Check off your first pandal to claim the Champion Crown!
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-white transition-all hover:brightness-110 active:scale-95"
                style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-hover))" }}
              >
                <span>Explore Pandals</span>
                <Flame className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              {/* Top 3 Podium Grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end max-w-2xl mx-auto mb-12 mt-4">
                {/* 2nd Place (Silver) */}
                {top2 ? (
                  <div className="flex flex-col items-center">
                    <div className="relative group flex flex-col items-center">
                      <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-slate-400 overflow-hidden shadow-lg glass bg-white/5">
                        <Image
                          src={top2.image || "/images/avatar-girl.png"}
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
                          src={top1.image || "/images/avatar-boy-1-beard.png"}
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
                          src={top3.image || "/images/avatar-girl-2.png"}
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
              {runnerUps.length > 0 && (
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
                          <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-semibold text-white/50 group-hover:text-accent group-hover:border-accent/30 transition-colors">
                            {rank}
                          </div>

                          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/5 border border-white/10">
                            <Image
                              src={user.image || "/images/avatar-girl.png"}
                              alt={user.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div>
                            <p className="text-sm font-semibold truncate max-w-[150px] sm:max-w-xs">{user.name}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/40">Visited</span>
                          <div className="px-3 py-1 rounded-xl bg-accent/10 border border-accent/20 text-xs font-bold" style={{ color: "var(--accent)" }}>
                            {user.visitCount} {user.visitCount === 1 ? "Pandal" : "Pandals"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
