"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "@/frontend/context/AppContext";
import { calendarDays, CalendarDay } from "@/frontend/lib/calendarData";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  Sparkles,
  ChevronLeft,
  ChevronRight
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
          console.warn("[Ponjika Audio] Audio file playback:", err);
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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;
      setAudioProgress(newTime);
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
      <div className="fixed inset-0 z-[100] bg-[#1F0F0D] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Day Not Found</h2>
        <Link href="/calendar" className="px-4 py-2 rounded-xl bg-accent text-white font-semibold">
          Back to Sharadiya Ponjika
        </Link>
      </div>
    );
  }

  const songTitle = day.slug === "mahalaya" 
    ? "Birendra Krishna Bhadra — Mahishasuramardini" 
    : `${day.englishTitle} — Pujo Beats`;

  return (
    <div className="fixed inset-0 z-[100] w-screen h-screen bg-[#1F0F0D] overflow-hidden flex flex-col justify-between select-none">
      
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={`/public/audio/${day.slug}.mp3`}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onError={() => setAudioError(true)}
      />

      {/* 100% Full-Bleed Background Image (No margins, no navbar) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={day.imageUrl}
          alt={day.englishTitle}
          fill
          priority
          unoptimized
          className="object-cover animate-fade-in duration-700"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = day.fallbackImage;
          }}
        />
        {/* Dark Vignette Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/70" />
      </div>

      {/* Top Bar: Discreet Floating Glass Navigation */}
      <div className="relative z-20 p-4 sm:p-8 flex items-center justify-between">
        {/* Floating Back Button */}
        <Link
          href="/calendar"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass bg-black/40 hover:bg-black/60 text-white/90 hover:text-white border border-white/20 backdrop-blur-md transition-all duration-200 text-xs font-semibold shadow-lg group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Ponjika</span>
        </Link>

        {/* Top Right Date & Day Badge */}
        <div className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full glass bg-black/40 text-white/80 border border-white/15 backdrop-blur-md text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
          <span>{day.date} • {day.dayOfWeek}</span>
        </div>
      </div>

      {/* Center: Giant Aesthetic Calligraphy Title (Saloon.wtf style) */}
      <div className="relative z-20 text-center px-4 space-y-3 sm:space-y-4 max-w-4xl mx-auto -mt-10 sm:-mt-16">
        <h1
          className="text-6xl sm:text-8xl md:text-9xl font-extrabold text-amber-200 tracking-tight leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
          style={{
            fontFamily: "var(--font-playfair), serif",
            textShadow: "0 0 40px rgba(255, 77, 61, 0.4), 0 10px 40px rgba(0, 0, 0, 0.9)",
          }}
        >
          {day.bengaliTitle}
        </h1>

        <p
          className="text-xl sm:text-3xl text-white/90 font-medium tracking-wide drop-shadow-lg"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {day.englishTitle}
        </p>

        <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto leading-relaxed drop-shadow">
          {day.subtitle}
        </p>
      </div>

      {/* Bottom: Floating Glassmorphic Audio Player Pill (Saloon.wtf style) */}
      <div className="relative z-20 p-4 sm:p-8 flex flex-col items-center gap-3">
        
        {/* Floating Audio Bar */}
        <div className="w-full max-w-xl glass-accent rounded-full border border-white/20 bg-[#1F0F0D]/80 backdrop-blur-2xl p-3 px-5 sm:px-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-between gap-4">
          
          {/* Vinyl Disc Icon */}
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-accent/20 border border-accent/40 text-accent ${isPlaying ? "animate-spin" : ""}`}>
            <Music className="w-5 h-5" />
          </div>

          {/* Song Info & Progress Slider */}
          <div className="flex-1 min-w-0 space-y-1 text-left">
            <div className="text-[10px] uppercase font-bold tracking-widest text-accent flex items-center gap-1.5">
              <span>Mahalaya Audio</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white truncate">{songTitle}</h4>
            
            {/* Progress Slider */}
            <div className="flex items-center gap-2 text-[10px] text-white/60">
              <span>{formatTime(audioProgress)}</span>
              <input
                type="range"
                min={0}
                max={audioDuration || 100}
                value={audioProgress}
                onChange={handleSeek}
                className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <span>{formatTime(audioDuration)}</span>
            </div>
          </div>

          {/* Play/Pause Button */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={togglePlay}
              className="w-11 h-11 rounded-full bg-accent text-white hover:bg-accent-hover active:scale-95 transition-all duration-200 flex items-center justify-center shadow-lg cursor-pointer border border-accent/40"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-2.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Sub-label Audio Hint */}
        {audioError && (
          <p className="text-[10px] text-amber-300/80 italic bg-black/60 px-3 py-1 rounded-full border border-amber-500/20 backdrop-blur-md">
            🎵 MP3 file notice: upload <code className="text-accent font-bold">/public/audio/mahalaya.mp3</code> to enable playback!
          </p>
        )}
      </div>

    </div>
  );
}
