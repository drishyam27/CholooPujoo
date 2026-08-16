"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "@/frontend/context/AppContext";
import Navbar from "@/frontend/components/Navbar";
import { calendarDays, CalendarDay } from "@/frontend/lib/calendarData";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  MapPin,
  Bot,
  ChevronLeft,
  ChevronRight,
  Music,
  CheckCircle
} from "lucide-react";

export default function CalendarDayPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { isLoggedIn } = useAppContext();

  // Find the day data based on slug
  const dayIndex = calendarDays.findIndex((d) => d.slug === slug);
  const day: CalendarDay | undefined = calendarDays[dayIndex];

  const prevDay = dayIndex > 0 ? calendarDays[dayIndex - 1] : null;
  const nextDay = dayIndex < calendarDays.length - 1 ? calendarDays[dayIndex + 1] : null;

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  // Audio play handler
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setAudioError(false);
        })
        .catch((err) => {
          console.warn("[Ponjika Audio] Audio file not found or playback blocked:", err);
          setAudioError(true);
          setIsPlaying(false);
        });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setAudioProgress(audioRef.current.currentTime);
      setAudioDuration(audioRef.current.duration || 0);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!isLoggedIn) return null;

  if (!day) {
    return (
      <>
        <Navbar />
        <main className="pt-32 px-4 text-center min-h-screen flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Day Not Found</h2>
          <Link href="/calendar" className="px-4 py-2 rounded-xl bg-accent text-white font-semibold">
            Back to Sharadiya Ponjika
          </Link>
        </main>
      </>
    );
  }

  // Determine specific song title based on day
  const getSongTitle = () => {
    if (day.slug === "mahalaya") return "Birendra Krishna Bhadra — Mahishasuramardini";
    if (day.slug === "ashtami") return "Chandrabindoo — Bandhobi Ashtami Tomar Parai";
    if (day.slug === "dashami") return "Bijoya Dashami Farewell — Aasche Bochor Aabar Hobe";
    return `${day.bengaliTitle} Pujo Hits & Agamani Beats`;
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6 max-w-4xl mx-auto min-h-screen relative overflow-hidden text-left">
        
        {/* Hidden HTML5 Audio Element */}
        <audio
          ref={audioRef}
          src={`/public/audio/${day.slug}.mp3`}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onError={() => setAudioError(true)}
        />

        {/* Ambient atmospheric glowing blobs */}
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

        <div className="relative z-10 space-y-6">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between">
            <Link
              href="/calendar"
              className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Ponjika</span>
            </Link>
            
            <div className="text-xs text-white/50 flex items-center gap-1.5">
              <span>Ponjika</span>
              <span>/</span>
              <span className="text-accent font-semibold">{day.englishTitle}</span>
            </div>
          </div>

          {/* Main Visual Day Poster Card */}
          <div className="glass rounded-3xl overflow-hidden border border-accent/25 bg-[#1F0F0D]/80 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative group">
            
            {/* Full-bleed Hero Photo */}
            <div className="relative w-full h-72 sm:h-96">
              <Image
                src={day.imageUrl}
                alt={day.englishTitle}
                fill
                priority
                unoptimized
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = day.fallbackImage;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F0F0D] via-[#1F0F0D]/60 to-transparent" />

              {/* Hero Title & Bengali Verse Overlay */}
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-semibold text-white/90 border border-white/15 backdrop-blur-md">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  <span>{day.date} • {day.dayOfWeek}</span>
                </div>

                <h1
                  className="text-4xl sm:text-5xl font-bold text-amber-200 drop-shadow-md leading-tight"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {day.bengaliTitle} <span className="text-2xl sm:text-3xl text-white font-normal">({day.englishTitle})</span>
                </h1>

                <p className="text-xs sm:text-sm text-white/80 max-w-xl">
                  {day.subtitle}
                </p>
              </div>
            </div>

            {/* Custom Interactive Music Player Card */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Music Player Container */}
              <div className="glass rounded-2xl p-4 sm:p-5 border border-accent/30 bg-white/5 flex flex-col sm:flex-row items-center gap-4 shadow-xl relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl glass-accent flex items-center justify-center text-accent flex-shrink-0 border-accent/40 shadow-[0_0_15px_rgba(255,77,61,0.25)]">
                  <Music className={`w-6 h-6 ${isPlaying ? "animate-bounce" : ""}`} />
                </div>

                <div className="flex-1 w-full text-center sm:text-left space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-accent flex items-center justify-center sm:justify-start gap-1.5">
                    <Sparkles className="w-3 h-3 text-accent" />
                    <span>Festive Audio • Pujo Beats</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white truncate">{getSongTitle()}</h4>
                  
                  {audioError ? (
                    <p className="text-[11px] text-amber-300/80 italic">
                      🎵 MP3 file ready: place <code className="bg-black/30 px-1 py-0.5 rounded">public/audio/{day.slug}.mp3</code> to enable playback!
                    </p>
                  ) : (
                    <div className="flex items-center gap-2 text-[11px] text-white/50">
                      <span>{formatTime(audioProgress)}</span>
                      <div className="flex-1 bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-accent h-full transition-all duration-200"
                          style={{
                            width: `${audioDuration ? (audioProgress / audioDuration) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <span>{formatTime(audioDuration)}</span>
                    </div>
                  )}
                </div>

                {/* Play Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-3.5 rounded-xl bg-accent text-white hover:bg-accent-hover active:scale-95 transition-all duration-200 shadow-md cursor-pointer border border-accent/40"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-3 rounded-xl glass hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer border border-white/10"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Day Description */}
              <p className="text-sm text-white/80 leading-relaxed border-b border-white/10 pb-4">
                {day.description}
              </p>

              {/* Grid: Key Rituals & Thakuma AI Strategy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Key Rituals */}
                <div className="space-y-3">
                  <h3
                    className="text-lg font-bold text-white flex items-center gap-2"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span>Key Daily Rituals & Pujo Timing</span>
                  </h3>
                  <div className="space-y-2">
                    {day.rituals.map((ritual, idx) => (
                      <div
                        key={idx}
                        className="glass rounded-xl p-3 bg-white/5 border border-white/10 text-xs text-white/90 flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{ritual}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Thakuma AI Strategy */}
                <div className="space-y-3">
                  <h3
                    className="text-lg font-bold text-white flex items-center gap-2"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    <Bot className="w-5 h-5 text-accent" />
                    <span>DDI Thakuma AI Strategy</span>
                  </h3>
                  <div className="glass rounded-2xl p-4 bg-accent/10 border border-accent/30 space-y-2">
                    <div className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
                      <span>Grandma&apos;s Advice for {day.englishTitle}</span>
                    </div>
                    <p className="text-xs text-white/90 italic leading-relaxed">
                      &ldquo;{day.thakumaTip}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommended Pandals for this Day */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <h3
                  className="text-lg font-bold text-white flex items-center gap-2"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  <MapPin className="w-5 h-5 text-accent" />
                  <span>Top Recommended Pandals for {day.englishTitle}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {day.recommendedPandals.map((pandalName, idx) => (
                    <div
                      key={idx}
                      className="glass rounded-xl p-3 bg-white/5 border border-white/10 text-xs font-semibold text-white text-center hover:border-accent/40 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      <span>{pandalName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Prev / Next Day Navigation Footer */}
            <div className="p-4 sm:p-6 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
              {prevDay ? (
                <Link
                  href={`/calendar/${prevDay.slug}`}
                  className="flex items-center gap-2 text-white/70 hover:text-accent transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous: {prevDay.englishTitle}</span>
                </Link>
              ) : (
                <div />
              )}

              {nextDay ? (
                <Link
                  href={`/calendar/${nextDay.slug}`}
                  className="flex items-center gap-2 text-white/70 hover:text-accent transition-colors ml-auto"
                >
                  <span>Next: {nextDay.englishTitle}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
