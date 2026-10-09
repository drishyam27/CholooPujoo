"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Activity,
  SkipBack,
  SkipForward,
  ListMusic,
  Video,
  X
} from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

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

  // Track & Playlist state
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytPlayerRef = useRef<any>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  // Determine active song source and info
  const isMahalaya = day?.slug === "mahalaya";
  const playlist = day?.playlist || [];
  const currentTrack = !isMahalaya && playlist.length > 0 ? playlist[currentTrackIndex] : null;

  const currentAudioSrc = isMahalaya ? `/audio/mahalaya.mp3` : "";

  const songTitle = isMahalaya
    ? "Birendra Krishna Bhadra — Mahishasuramardini"
    : currentTrack
    ? currentTrack.title
    : `${day?.englishTitle} — Pujo Beats`;

  const songArtist = isMahalaya
    ? "Akashvani Kolkata Broadcast"
    : currentTrack
    ? currentTrack.artist
    : "Traditional Dhak & Festival Ensemble";

  // Track switching handlers
  const handleNextTrack = useCallback(() => {
    if (playlist.length > 1) {
      setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
      setAudioProgress(0);
      setIsPlaying(false);
    }
  }, [playlist.length]);

  const handlePrevTrack = useCallback(() => {
    if (playlist.length > 1) {
      setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
      setAudioProgress(0);
      setIsPlaying(false);
    }
  }, [playlist.length]);

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setAudioProgress(0);
    setIsPlaying(false);
    setIsPlaylistOpen(false);
  };

  // --- MAHALAYA HTML5 AUDIO PLAYBACK ---
  useEffect(() => {
    if (!isMahalaya) return;
    const audio = audioRef.current;
    if (!audio) return;

    let hasStarted = false;

    const startPlayback = () => {
      if (hasStarted || !audio) return;
      audio
        .play()
        .then(() => {
          hasStarted = true;
          setIsPlaying(true);
          setAudioError(false);
          window.removeEventListener("click", startPlayback);
          window.removeEventListener("touchstart", startPlayback);
          window.removeEventListener("keydown", startPlayback);
        })
        .catch((err) => {
          console.log("[Mahalaya Audio] Awaiting interaction:", err?.name);
        });
    };

    startPlayback();

    const handleCanPlay = () => {
      if (!hasStarted) startPlayback();
    };
    audio.addEventListener("canplay", handleCanPlay, { once: true });

    window.addEventListener("click", startPlayback, { once: true });
    window.addEventListener("touchstart", startPlayback, { once: true });
    window.addEventListener("keydown", startPlayback, { once: true });

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      window.removeEventListener("click", startPlayback);
      window.removeEventListener("touchstart", startPlayback);
      window.removeEventListener("keydown", startPlayback);
    };
  }, [isMahalaya, isLoggedIn]);

  // --- YOUTUBE PLAYER FOR PROTHOMA THROUGH DASHAMI ---
  useEffect(() => {
    if (isMahalaya) return;

    // Load YouTube IFrame API script once if not present
    if (typeof window !== "undefined" && !window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    let isSubscribed = true;

    const createPlayer = () => {
      if (!isSubscribed || !window.YT || !window.YT.Player) return;
      const targetElement = document.getElementById("yt-festival-player");
      if (!targetElement) return;

      // If player already created, load the current track
      if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === "function") {
        if (currentTrack?.youtubeId) {
          ytPlayerRef.current.loadVideoById(currentTrack.youtubeId);
          setIsPlaying(true);
        }
        return;
      }

      ytPlayerRef.current = new window.YT.Player("yt-festival-player", {
        height: "100%",
        width: "100%",
        videoId: currentTrack?.youtubeId || "kYJ_tJ-Jb6o",
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            if (!isSubscribed) return;
            event.target.playVideo();
            setIsPlaying(true);
            setAudioError(false);
          },
          onStateChange: (event: any) => {
            if (!isSubscribed) return;
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              setAudioError(false);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            } else if (event.data === window.YT.PlayerState.ENDED) {
              handleNextTrack();
            }
          },
          onError: () => {
            if (!isSubscribed) return;
            setAudioError(true);
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        if (isSubscribed) createPlayer();
      };
    }

    return () => {
      isSubscribed = false;
    };
  }, [day?.slug, isMahalaya, currentTrack?.youtubeId, handleNextTrack]);

  // Switch YouTube song when currentTrackIndex changes
  useEffect(() => {
    if (isMahalaya) return;
    if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === "function" && currentTrack?.youtubeId) {
      ytPlayerRef.current.loadVideoById(currentTrack.youtubeId);
      setIsPlaying(true);
      setAudioProgress(0);
    }
  }, [currentTrackIndex, currentTrack?.youtubeId, isMahalaya]);

  // Synchronize playback time & waveform progress for YouTube
  useEffect(() => {
    if (isMahalaya || !isPlaying) return;

    const interval = setInterval(() => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === "function") {
        const curr = ytPlayerRef.current.getCurrentTime() || 0;
        const dur = ytPlayerRef.current.getDuration() || 0;
        setAudioProgress(curr);
        if (dur > 0) setAudioDuration(dur);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [isPlaying, isMahalaya]);

  // User playback controls
  const togglePlay = () => {
    if (isMahalaya) {
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
          .catch(() => {
            setAudioError(true);
            setIsPlaying(false);
          });
      }
    } else {
      if (!ytPlayerRef.current) return;
      if (isPlaying) {
        if (typeof ytPlayerRef.current.pauseVideo === "function") {
          ytPlayerRef.current.pauseVideo();
        }
        setIsPlaying(false);
      } else {
        if (typeof ytPlayerRef.current.playVideo === "function") {
          ytPlayerRef.current.playVideo();
        }
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (isMahalaya) {
      if (!audioRef.current) return;
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } else {
      if (!ytPlayerRef.current) return;
      if (isMuted) {
        if (typeof ytPlayerRef.current.unMute === "function") {
          ytPlayerRef.current.unMute();
        }
        setIsMuted(false);
      } else {
        if (typeof ytPlayerRef.current.mute === "function") {
          ytPlayerRef.current.mute();
        }
        setIsMuted(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (isMahalaya && audioRef.current) {
      setAudioProgress(audioRef.current.currentTime);
      setAudioDuration(audioRef.current.duration || 0);
    }
  };

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!waveformRef.current || !audioDuration) return;
    const rect = waveformRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = clickRatio * audioDuration;

    if (isMahalaya && audioRef.current) {
      audioRef.current.currentTime = newTime;
    } else if (!isMahalaya && ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === "function") {
      ytPlayerRef.current.seekTo(newTime, true);
    }
    setAudioProgress(newTime);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
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

  const progressPercent = audioDuration ? (audioProgress / audioDuration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-[100] w-screen h-[100dvh] min-h-[100dvh] bg-[#1F0F0D] overflow-hidden flex flex-col justify-between select-none p-3 sm:p-6 pb-4 sm:pb-8">
      
      {/* MAHALAYA: Untouched Original HTML5 Audio Element */}
      {isMahalaya && (
        <audio
          ref={audioRef}
          src={currentAudioSrc}
          autoPlay
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onError={() => {
            setAudioError(true);
            setIsPlaying(false);
          }}
        />
      )}

      {/* PROTHOMA TO DASHAMI: Authentic Bengali YouTube Audio/Video Player */}
      {!isMahalaya && (
        <div
          className={`${
            showVideo
              ? "fixed bottom-24 right-4 sm:right-8 z-40 w-72 sm:w-96 aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-accent/40 bg-black/95 backdrop-blur-xl transition-all"
              : "fixed -left-[9999px] -top-[9999px] w-1 h-1 opacity-0 pointer-events-none"
          }`}
        >
          {showVideo && (
            <div className="absolute top-2 right-2 z-10">
              <button
                onClick={() => setShowVideo(false)}
                className="p-1 rounded-full bg-black/80 text-white/80 hover:text-white hover:bg-black transition-colors cursor-pointer"
                title="Hide Video"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          <div id="yt-festival-player" className="w-full h-full" />
        </div>
      )}

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

      {/* Bottom: Equalizer Floating Audio Player Pill */}
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
            <div className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-accent flex items-center justify-between gap-2">
              <span className="truncate">
                {isMahalaya ? "Mahalaya Broadcast" : `${day.englishTitle} Bengali Songs (${currentTrackIndex + 1}/${playlist.length || 1})`}
              </span>
              {isPlaying && (
                <span className="inline-flex items-center gap-1 text-[9px] text-amber-300 font-bold bg-accent/30 px-1.5 py-0.5 rounded-full border border-accent/40 animate-pulse flex-shrink-0">
                  <Activity className="w-2.5 h-2.5 animate-bounce text-amber-300" />
                  <span>PLAYING</span>
                </span>
              )}
            </div>

            <div className="truncate">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate leading-tight">{songTitle}</h4>
              <p className="text-[10px] sm:text-[11px] text-white/60 truncate leading-tight">{songArtist}</p>
            </div>
            
            {/* Waveform Soundwave Beat Slider Track */}
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-[9px] sm:text-[10px] text-white/70 font-mono flex-shrink-0">
                {formatTime(audioProgress)}
              </span>

              {/* Interactive Waveform Bars */}
              <div
                ref={waveformRef}
                onClick={handleWaveformClick}
                className="flex-1 flex items-center justify-between gap-[2px] h-6 sm:h-7 cursor-pointer group py-1 px-1 rounded-md hover:bg-white/5 transition-colors"
                title="Click anywhere to jump in song"
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

          {/* Controls: Video Toggle, Playlist, Prev, Play/Pause, Next & Mute */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Watch Video Toggle for Bengali Tracks */}
            {!isMahalaya && currentTrack?.youtubeId && (
              <button
                onClick={() => setShowVideo(!showVideo)}
                className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer ${
                  showVideo
                    ? "bg-amber-400 text-black border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                    : "bg-white/5 hover:bg-white/15 text-white/80 border-white/10"
                }`}
                title={showVideo ? "Hide Video Window" : "Watch Official Video"}
              >
                <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}

            {/* Playlist Drawer Toggle Button */}
            {!isMahalaya && playlist.length > 0 && (
              <button
                onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
                className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer ${
                  isPlaylistOpen
                    ? "bg-accent text-white border-accent shadow-[0_0_15px_rgba(255,77,61,0.6)]"
                    : "bg-white/5 hover:bg-white/15 text-white/80 border-white/10"
                }`}
                title="Open Festival Playlist"
              >
                <ListMusic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}

            {/* Prev Song Button (for playlist days) */}
            {!isMahalaya && playlist.length > 1 && (
              <button
                onClick={handlePrevTrack}
                className="p-1 sm:p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                title="Previous Song"
              >
                <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}

            {/* Main Play/Pause Button */}
            <button
              onClick={togglePlay}
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-accent text-white hover:bg-accent-hover active:scale-95 transition-all duration-300 flex items-center justify-center shadow-lg cursor-pointer border border-accent/50 ${
                isPlaying ? "shadow-[0_0_25px_rgba(255,77,61,0.8)] ring-2 ring-accent/60 animate-pulse" : ""
              }`}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />}
            </button>

            {/* Next Song Button (for playlist days) */}
            {!isMahalaya && playlist.length > 1 && (
              <button
                onClick={handleNextTrack}
                className="p-1 sm:p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                title="Next Song"
              >
                <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}

            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>
          </div>
        </div>

        {/* Notice if audio blocked or error */}
        {audioError && isMahalaya && (
          <p className="text-[9px] sm:text-[10px] text-amber-300/90 italic bg-black/70 px-3 py-1 rounded-full border border-amber-500/20 backdrop-blur-md max-w-xs text-center truncate">
            🎵 MP3 file ready: <code className="text-accent font-bold">/public/audio/mahalaya.mp3</code>
          </p>
        )}
      </div>

      {/* Playlist Drawer Modal for Prothoma to Dashami */}
      {!isMahalaya && playlist.length > 0 && isPlaylistOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-end sm:items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="w-full max-w-lg glass rounded-3xl p-5 sm:p-6 border border-accent/30 bg-[#1F0F0D]/95 shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[80vh] flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-accent">
                  <Sparkles className="w-3 h-3 text-accent" />
                  <span>{day.englishTitle} Jukebox</span>
                </div>
                <h3
                  className="text-lg sm:text-xl font-bold text-white leading-snug"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {day.bengaliTitle} — সেরা বাংলা পুজো গান
                </h3>
              </div>
              <button
                onClick={() => setIsPlaylistOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Song Items List */}
            <div className="overflow-y-auto space-y-2 py-3 pr-1 custom-scrollbar flex-1 my-2">
              {playlist.map((track, idx) => {
                const isCurrent = idx === currentTrackIndex;
                return (
                  <div
                    key={track.id}
                    onClick={() => selectTrack(idx)}
                    className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                      isCurrent
                        ? "bg-accent/20 border border-accent/40 shadow-[0_0_15px_rgba(255,77,61,0.25)]"
                        : "bg-white/5 hover:bg-white/10 border border-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* Track number or Playing visualizer */}
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold border ${
                          isCurrent
                            ? "bg-accent text-white border-accent shadow-sm"
                            : "bg-white/5 text-white/50 border-white/10"
                        }`}
                      >
                        {isCurrent && isPlaying ? (
                          <Activity className="w-3.5 h-3.5 animate-bounce" />
                        ) : (
                          idx + 1
                        )}
                      </div>

                      <div className="min-w-0 flex-1 text-left">
                        <h5 className={`text-xs sm:text-sm font-bold truncate ${isCurrent ? "text-amber-200" : "text-white"}`}>
                          {track.title}
                        </h5>
                        <p className="text-[10px] sm:text-[11px] text-white/60 truncate">
                          {track.artist}
                        </p>
                        <span className="text-[9px] text-accent/80 font-medium">
                          {track.theme}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className="text-[10px] text-white/50 font-mono">{track.duration}</span>
                      <button
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          isCurrent
                            ? "bg-accent text-white"
                            : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                        }`}
                      >
                        {isCurrent && isPlaying ? (
                          <Pause className="w-3 h-3" />
                        ) : (
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
              <span>{playlist.length} টি খাঁটি বাংলা পুজো গান</span>
              <button
                onClick={() => setIsPlaylistOpen(false)}
                className="px-3 py-1 rounded-full bg-accent/20 text-accent font-semibold hover:bg-accent/30 transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
