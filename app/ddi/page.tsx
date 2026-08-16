"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/frontend/context/AppContext";
import Navbar from "@/frontend/components/Navbar";
import DDICompanion from "@/frontend/components/DDICompanion";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DDIPage() {
  const { isLoggedIn, completedIds } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28 md:pt-32 pb-12 px-4 sm:px-6 max-w-4xl mx-auto min-h-screen relative overflow-hidden">
        {/* Glowing atmospheric background blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full blur-[128px] opacity-15 bg-accent" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full blur-[128px] opacity-10 bg-accent" />
        </div>

        <div className="relative z-10 space-y-6">
          {/* Back Navigation & Breadcrumb */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-accent hover:underline transition-all duration-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
            <div className="text-xs opacity-50 flex items-center gap-1">
              <span>Home</span>
              <span>/</span>
              <span className="text-accent" style={{ color: "var(--accent)" }}>DDI Assistant</span>
            </div>
          </div>

          {/* Section Header */}
          <div className="text-center sm:text-left space-y-2">
            <h1
              className="text-3xl sm:text-4xl font-bold flex flex-col sm:flex-row sm:items-center gap-2"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              <span>Dugga Dugga</span>
              <span className="text-accent flex items-center gap-2 justify-center sm:justify-start" style={{ color: "var(--accent)" }}>
                Intelligence (DDI) <Sparkles className="w-5 h-5 animate-pulse text-accent" style={{ color: "var(--accent)" }} />
              </span>
            </h1>
            <p className="text-sm opacity-60 max-w-2xl">
              Your real-time AI spatial companion powered by DDI Thakuma. Ask for optimal pandal routes, crowd forecasts, local street food recommendations, and neighborhood transit tips!
            </p>
          </div>

          {/* DDI Assistant Interactive Card */}
          <div className="glass rounded-3xl p-4 sm:p-6 shadow-2xl border-accent/20">
            <DDICompanion visitedIds={completedIds} />
          </div>
        </div>
      </main>
    </>
  );
}
