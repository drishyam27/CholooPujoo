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
  Activity
} from "lucide-react";

// Pre-calculated aesthetic audio waveform beat heights (36 frequency bars)
const waveformBeatHeights = [
  35, 60, 45, 80, 100, 65, 40, 90, 75, 50, 85, 95, 60, 40, 70, 85, 100, 65,
  45, 90, 80, 55, 75, 90, 100, 60, 40, 70, 85, 50, 65, 90, 75, 45, 60, 40
];

export default function CalendarDayPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { isLoggedIn } = useAppContext();

  // Find the day data based on slug
  const dayIndex = calendarDays.findIndex((d) => d.slug === slug);
  const day: CalendarDay | undefined = calendarDays[dayIndex];

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);

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

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !waveformRef.current || !audioDuration) return;
    const rect = waveformRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = clickRatio * audioDuration;
    audioRef.current.currentTime = newTime;
    setAudioProgress(newTime);
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

  const progressPercent = audioDuration ? (audioProgress / audioDuration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-[100] w-screen h-[100dvh] min-h-[100dvh] bg-[#1F0F0D] overflow-hidden flex flex-col justify-between select-none p-3 sm:p-6 pb-4 sm:pb-8">
      
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={`/audio/${day.slug}.mp3`}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onError={() => setAudioError(true)}
      />

      {/* 100% Full-Bleed Background Image Edge-to-Edge */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={day.imageUrl}
          alt={day.englishTitle}
          fill
          priority
          unoptimized
          className={`object-cover ${day.imagePosition || "object-center"} animate-fade-in duration-700 pointer-events-none`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = day.fallbackImage;
          }}
        />

        {/* Dark Vignette Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/65 pointer-events-none" />
      </div>

      {/* Top Bar: Floating Glass Back Button & Date Badge */}
      <div className="relative z-20 pt-2 sm:pt-4 flex items-center justify-between gap-2">
        {/* Floating Back Button */}
        <Link
          href="/calendar"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full glass bg-black/60 hover:bg-black/80 text-white/90 hover:text-white border border-white/20 backdrop-blur-md transition-all duration-200 text-xs font-semibold shadow-lg group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Ponjika</span>
        </Link>

        {/* Top Right Date & Day Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass bg-black/60 text-white/80 border border-white/15 backdrop-blur-md text-[11px] sm:text-xs font-medium">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent animate-pulse" />
          <span>{day.date}</span>
        </div>
      </div>

      {/* Center: Giant Aesthetic Calligraphy Title */}
      <div className="relative z-20 text-center px-3 space-y-1.5 sm:space-y-3 max-w-4xl mx-auto my-auto py-2">
        <h1
          className="text-4xl sm:text-7xl md:text-8xl font-extrabold text-amber-200 tracking-tight leading-tight drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]"
          style={{
            fontFamily: "var(--font-playfair), serif",
            textShadow: "0 0 40px rgba(255, 77, 61, 0.45), 0 10px 40px rgba(0, 0, 0, 0.95)",
          }}
        >
          {day.bengaliTitle}
        </h1>

        <p
          className="text-base sm:text-2xl md:text-3xl text-white/95 font-medium tracking-wide drop-shadow-lg"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {day.englishTitle}
        </p>

        <p className="text-xs sm:text-sm text-white/75 max-w-lg mx-auto leading-relaxed drop-shadow px-2">
          {day.subtitle}
        </p>
      </div>

      {/* Bottom: Beat-Style Equalizer Floating Audio Player Pill */}
      <div className="relative z-20 w-full flex flex-col items-center gap-2 pt-2">
        
        {/* Floating Audio Bar */}
        <div className="w-full max-w-xl glass-accent rounded-2xl sm:rounded-full border border-white/25 bg-[#1F0F0D]/90 backdrop-blur-2xl p-2.5 sm:p-3 px-3.5 sm:px-6 shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex items-center justify-between gap-2.5 sm:gap-4 transition-all duration-300">
          
          {/* Animated Equalizer Beat Visualizer Icon */}
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-accent/20 border border-accent/40 text-accent relative overflow-hidden shadow-inner">
            {isPlaying ? (
              <div className="flex items-end justify-center gap-0.5 h-4 sm:h-5 w-5">
                <span className="w-1 bg-accent rounded-full animate-pulse" style={{ height: "65%", animationDuration: "0.5s" }} />
                <span className="w-1 bg-amber-400 rounded-full animate-pulse" style={{ height: "100%", animationDuration: "0.7s" }} />
                <span className="w-1 bg-accent rounded-full animate-pulse" style={{ height: "40%", animationDuration: "0.4s" }} />
                <span className="w-1 bg-amber-400 rounded-full animate-pulse" style={{ height: "85%", animationDuration: "0.6s" }} />
              </div>
            ) : (
              <Music className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </div>

          {/* Song Info & Interactive Waveform Beat Progress Track */}
          <div className="flex-1 min-w-0 space-y-1 text-left">
            <div className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-accent flex items-center justify-between">
              <span>Mahalaya Audio</span>
              {isPlaying && (
                <span className="inline-flex items-center gap-1 text-[9px] text-amber-300 font-bold bg-accent/30 px-1.5 py-0.5 rounded-full border border-accent/40 animate-pulse">
                  <Activity className="w-2.5 h-2.5 animate-bounce text-amber-300" />
                  <span>BEATS PLAYING</span>
                </span>
              )}
            </div>

            <h4 className="text-xs sm:text-sm font-bold text-white truncate leading-tight">{songTitle}</h4>
            
            {/* Waveform Soundwave Beat Slider Track */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] sm:text-[10px] text-white/70 font-mono flex-shrink-0">
                {formatTime(audioProgress)}
              </span>

              {/* Interactive Waveform Bars */}
              <div
                ref={waveformRef}
                onClick={handleWaveformClick}
                className="flex-1 flex items-center justify-between gap-[2px] h-6 sm:h-7 cursor-pointer group py-1 px-1 rounded-md hover:bg-white/5 transition-colors"
                title="Click anywhere to jump on beat track"
              >
                {waveformBeatHeights.map((barHeight, idx) => {
                  const barPercent = (idx / waveformBeatHeights.length) * 100;
                  const isPlayed = barPercent <= progressPercent;

                  return (
                    <div
                      key={idx}
                      className={`w-[2.5px] sm:w-[3px] rounded-full transition-all duration-200 ${
                        isPlayed
                          ? "bg-gradient-to-t from-accent to-amber-400 shadow-[0_0_6px_rgba(255,77,61,0.9)]"
                          : "bg-white/20 group-hover:bg-white/35"
                      } ${isPlaying && isPlayed ? "animate-pulse" : ""}`}
                      style={{
                        height: `${barHeight}%`,
                        animationDuration: `${0.4 + (idx % 4) * 0.15}s`,
                      }}
                    />
                  );
                })}
              </div>

              <span className="text-[9px] sm:text-[10px] text-white/70 font-mono flex-shrink-0">
                {formatTime(audioDuration)}
              </span>
            </div>
          </div>

          {/* Play/Pause & Mute Button with Glowing Beat Pulse */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={togglePlay}
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-accent text-white hover:bg-accent-hover active:scale-95 transition-all duration-300 flex items-center justify-center shadow-lg cursor-pointer border border-accent/50 ${
                isPlaying ? "shadow-[0_0_25px_rgba(255,77,61,0.8)] ring-2 ring-accent/60 animate-pulse" : ""
              }`}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-2 sm:p-2.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>
          </div>
        </div>

        {/* Sub-label Audio Error Notice if audio blocked */}
        {audioError && (
          <p className="text-[9px] sm:text-[10px] text-amber-300/90 italic bg-black/70 px-3 py-1 rounded-full border border-amber-500/20 backdrop-blur-md max-w-xs text-center truncate">
            🎵 MP3 file ready: place <code className="text-accent font-bold">/public/audio/mahalaya.mp3</code> to play!
          </p>
        )}
      </div>

    </div>
  );
}
