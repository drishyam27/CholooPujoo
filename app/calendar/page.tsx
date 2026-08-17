"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/frontend/context/AppContext";
import Navbar from "@/frontend/components/Navbar";
import { calendarDays } from "@/frontend/lib/calendarData";
import { Calendar as CalendarIcon, Sparkles, ArrowRight, Music, Clock } from "lucide-react";

export default function CalendarPage() {
  const { isLoggedIn } = useAppContext();
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
      <main className="pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6 max-w-6xl mx-auto min-h-screen relative overflow-hidden text-left">
        {/* Glowing atmospheric background lighting */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[140px] opacity-25"
            style={{ background: "var(--accent)" }}
          />
          <div
            className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-[140px] opacity-20"
            style={{ background: "#EAB308" }}
          />
        </div>

        <div className="relative z-10 space-y-8">
          {/* Header Banner */}
          <div className="text-center sm:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-accent text-xs font-semibold uppercase tracking-widest text-accent border border-accent/30 shadow-[0_0_20px_rgba(255,77,61,0.2)]">
              <CalendarIcon className="w-4 h-4 text-accent animate-pulse" />
              <span>শারদীয়া পঞ্জিকা ২০২৬ • Sharadiya Ponjika 2026</span>
            </div>

            <h1
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Sharadiya <span style={{ color: "var(--accent)" }}>Ponjika</span> 2026
            </h1>

            <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
              Explore the complete 12-day festival chronicle of Kolkata Durga Puja from Mahalaya to Vijaya Dashami. Select any date to view day-specific rituals, crowd predictions, DDI AI tips, and play authentic Pujo songs!
            </p>
          </div>

          {/* 12-Day Interactive Ponjika Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {calendarDays.map((day) => (
              <Link
                key={day.slug}
                href={`/calendar/${day.slug}`}
                className="group glass rounded-3xl overflow-hidden border border-white/10 hover:border-accent/50 bg-[#1F0F0D]/75 backdrop-blur-xl shadow-xl hover:shadow-[0_10px_40px_rgba(255,77,61,0.3)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Thumbnail Image */}
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden">
                    <Image
                      src={day.imageUrl}
                      alt={day.englishTitle}
                      fill
                      unoptimized
                      className={`object-cover ${day.imagePosition || "object-center"} group-hover:scale-105 transition-transform duration-700 ease-out`}
                      onError={(e) => {
                        // Fallback if custom image isn't uploaded yet
                        const target = e.target as HTMLImageElement;
                        target.src = day.fallbackImage;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F0F0D] via-[#1F0F0D]/40 to-transparent" />

                    {/* Bottom Floating Bengali Tithi */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                      <div>
                        <span
                          className="text-2xl font-bold text-amber-200 drop-shadow-md"
                          style={{ fontFamily: "var(--font-playfair), serif" }}
                        >
                          {day.bengaliTitle}
                        </span>
                        <div className="text-xs text-white/80 font-medium">{day.englishTitle}</div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      <span>{day.date} ({day.dayOfWeek})</span>
                    </div>

                    <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                      {day.subtitle}
                    </p>

                    {/* Ritual Snippet */}
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-accent">Key Highlight</div>
                      <div className="text-xs text-white/80 line-clamp-1">{day.rituals[0]}</div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="p-4 pt-0 flex items-center justify-between text-xs font-semibold text-accent group-hover:text-white transition-colors">
                  <span className="flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 animate-pulse text-accent" />
                    <span>View Day & Listen Songs</span>
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
