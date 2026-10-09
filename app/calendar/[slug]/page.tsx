"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "@/frontend/context/AppContext";
import { calendarDays, CalendarDay, SongTrack } from "@/frontend/lib/calendarData";
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
  X,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Radio
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
  const [customTrack, setCustomTrack] = useState<SongTrack | null>(null);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(true); // Show video card by default on desktop/mobile
  const [searchQuery, setSearchQuery] = useState("");
  const [customUrlInput, setCustomUrlInput] = useState("");

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const [waitingGesture, setWaitingGesture] = useState(false);

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
  
  // Current active song: either custom or from curated day playlist
  const activeTrack = useMemo(() => {
    if (isMahalaya) return null;
    if (customTrack) return customTrack;
    if (playlist.length > 0) return playlist[currentTrackIndex] || playlist[0];
    return null;
  }, [isMahalaya, customTrack, playlist, currentTrackIndex]);

  const currentAudioSrc = isMahalaya ? `/audio/mahalaya.mp3` : "";

  const songTitle = isMahalaya
    ? "Birendra Krishna Bhadra — Mahishasuramardini"
    : activeTrack
    ? activeTrack.title
    : `${day?.englishTitle} — Pujo Beats`;

  const songArtist = isMahalaya
    ? "Akashvani Kolkata Broadcast"
    : activeTrack
    ? activeTrack.artist
    : "Traditional Dhak & Festival Ensemble";

  // Track switching handlers
  const handleNextTrack = useCallback(() => {
    if (playlist.length > 1) {
      setCustomTrack(null);
      setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
      setAudioProgress(0);
      setIsPlaying(false);
    }
  }, [playlist.length]);

  const handlePrevTrack = useCallback(() => {
    if (playlist.length > 1) {
      setCustomTrack(null);
      setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
      setAudioProgress(0);
      setIsPlaying(false);
    }
  }, [playlist.length]);

  const selectTrack = (index: number) => {
    setCustomTrack(null);
    setCurrentTrackIndex(index);
    setAudioProgress(0);
    setIsPlaying(false);
    setIsPlaylistOpen(false);
  };

  // Play custom requested YouTube song
  const handlePlayCustomSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;

    // Extract YouTube ID from URL or raw ID
    let ytId = customUrlInput.trim();
    if (ytId.includes("youtube.com/watch?v=")) {
      ytId = ytId.split("v=")[1]?.split("&")[0] || ytId;
    } else if (ytId.includes("youtu.be/")) {
      ytId = ytId.split("youtu.be/")[1]?.split("?")[0] || ytId;
    } else if (ytId.includes("music.youtube.com/watch?v=")) {
      ytId = ytId.split("v=")[1]?.split("&")[0] || ytId;
    }

    if (ytId) {
      const newCustom: SongTrack = {
        id: `custom-${Date.now()}`,
        title: "User Selected Song",
        artist: "YouTube Music Stream",
        duration: "Playing Now",
        youtubeId: ytId,
        theme: "Requested by You"
      };
      setCustomTrack(newCustom);
      setCustomUrlInput("");
      setIsPlaylistOpen(false);
      setAudioProgress(0);
    }
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

  // --- YOUTUBE MUSIC EMBEDDED PLAYER FOR PROTHOMA TO DASHAMI ---
  useEffect(() => {
    if (isMahalaya) return;

    // Load YouTube IFrame API script once
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

      if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === "function") {
        if (activeTrack?.youtubeId) {
          ytPlayerRef.current.loadVideoById(activeTrack.youtubeId);
        }
        return;
      }

      ytPlayerRef.current = new window.YT.Player("yt-festival-player", {
        height: "100%",
        width: "100%",
        videoId: activeTrack?.youtubeId || "kYJ_tJ-Jb6o",
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          origin: typeof window !== "undefined" ? window.location.origin : ""
        },
        events: {
          onReady: (event: any) => {
            if (!isSubscribed) return;
            event.target.playVideo();
            setIsPlaying(true);
            setAudioError(false);
            setWaitingGesture(false);
          },
          onStateChange: (event: any) => {
            if (!isSubscribed) return;
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              setAudioError(false);
              setWaitingGesture(false);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            } else if (event.data === window.YT.PlayerState.ENDED) {
              handleNextTrack();
            }
          },
          onError: () => {
            if (!isSubscribed) return;
            setWaitingGesture(true);
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
  }, [day?.slug, isMahalaya, activeTrack?.youtubeId, handleNextTrack]);

  // Load new YouTube video when activeTrack changes
  useEffect(() => {
    if (isMahalaya) return;
    if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === "function" && activeTrack?.youtubeId) {
      ytPlayerRef.current.loadVideoById(activeTrack.youtubeId);
      setIsPlaying(true);
      setAudioProgress(0);
      setWaitingGesture(false);
    }
  }, [activeTrack?.youtubeId, isMahalaya]);

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
    setWaitingGesture(false);
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

  // Filter songs in playlist based on search query
  const filteredPlaylist = useMemo(() => {
    if (!searchQuery.trim()) return playlist;
    const q = searchQuery.toLowerCase();
    return playlist.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        t.theme.toLowerCase().includes(q)
    );
  }, [playlist, searchQuery]);

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
      
      {/* MAHALAYA: Original Untouched HTML5 Audio Element */}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/70 pointer-events-none" />
      </div>

      {/* Top Bar: Floating Back Button, Ponjika Badge & YouTube Music Quick Link */}
      <div className="relative z-20 pt-2 sm:pt-4 flex items-center justify-between gap-2">
        {/* Floating Back Button */}
        <Link
          href="/calendar"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full glass bg-black/60 hover:bg-black/80 text-white/90 hover:text-white border border-white/20 backdrop-blur-md transition-all duration-200 text-xs font-semibold shadow-lg group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Ponjika</span>
        </Link>

        {/* Top Right Badges */}
        <div className="flex items-center gap-2">
          {!isMahalaya && activeTrack?.youtubeId && (
            <a
              href={`https://music.youtube.com/watch?v=${activeTrack.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass bg-red-600/30 hover:bg-red-600/50 text-red-200 border border-red-500/30 backdrop-blur-md text-[11px] font-semibold transition-all shadow-md group"
              title="Open currently playing track directly in YouTube Music"
            >
              <Radio className="w-3 h-3 text-red-400 group-hover:animate-spin" />
              <span>YouTube Music</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>
          )}

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass bg-black/60 text-white/80 border border-white/15 backdrop-blur-md text-[11px] sm:text-xs font-medium">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent animate-pulse" />
            <span>{day.date}</span>
          </div>
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

      {/* PROTHOMA TO DASHAMI: Visible YouTube Music Video Card (Docked Floating Player) */}
      {!isMahalaya && (
        <div
          className={`fixed transition-all duration-300 z-40 ${
            showVideo
              ? "bottom-24 right-3 sm:right-6 w-[280px] sm:w-[350px] aspect-video rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.95)] border-2 border-accent/40 bg-black/95 backdrop-blur-xl"
              : "bottom-24 right-3 sm:right-6 w-auto h-auto rounded-full bg-black/80 border border-white/20 p-2 shadow-lg"
          }`}
        >
          {showVideo ? (
            <>
              {/* Header inside video card */}
              <div className="absolute top-2 left-2 right-2 z-20 flex items-center justify-between pointer-events-auto">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/80 text-[10px] text-white/90 font-medium backdrop-blur-md border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <span className="truncate max-w-[170px]">{activeTrack?.title || "YouTube Music"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setShowVideo(false)}
                    className="p-1 rounded-full bg-black/80 hover:bg-black text-white/80 hover:text-white transition-colors cursor-pointer"
                    title="Collapse Video"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* The YouTube Player Embed */}
              <div id="yt-festival-player" className="w-full h-full" />
            </>
          ) : (
            <button
              onClick={() => setShowVideo(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/90 font-semibold cursor-pointer hover:text-white transition-colors"
              title="Show Video Player"
            >
              <Video className="w-4 h-4 text-accent" />
              <span>Show Video</span>
              <ChevronUp className="w-3.5 h-3.5 text-white/60" />
            </button>
          )}
        </div>
      )}

      {/* Bottom Area: Controls, Jukebox Pill & Autoplay Banner */}
      <div className="relative z-20 w-full flex flex-col items-center gap-2 pt-2">
        
        {/* Waiting For Interaction Banner (if cold autoplay blocked) */}
        {!isMahalaya && waitingGesture && (
          <button
            onClick={togglePlay}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent hover:bg-accent-hover text-white text-xs font-bold shadow-[0_0_20px_rgba(255,77,61,0.8)] border border-white/30 animate-pulse transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Tap to Play &quot;{songTitle}&quot; on YouTube Music</span>
          </button>
        )}

        {/* Floating Audio & Jukebox Control Bar */}
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
                {isMahalaya
                  ? "Mahalaya Broadcast"
                  : customTrack
                  ? "Requested Song (YouTube Music)"
                  : `${day.englishTitle} Songs (${currentTrackIndex + 1}/${playlist.length || 1})`}
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
            {/* Video Toggle Button */}
            {!isMahalaya && (
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

            {/* Jukebox Playlist Drawer Toggle Button */}
            {!isMahalaya && (
              <button
                onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
                className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer ${
                  isPlaylistOpen
                    ? "bg-accent text-white border-accent shadow-[0_0_15px_rgba(255,77,61,0.6)]"
                    : "bg-white/5 hover:bg-white/15 text-white/80 border-white/10"
                }`}
                title="Search & Pick Your Required Song"
              >
                <ListMusic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}

            {/* Prev Song Button */}
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

            {/* Next Song Button */}
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
      </div>

      {/* JUKEBOX & SONG FINDER MODAL: Easily Search & Play Any Required Song */}
      {!isMahalaya && isPlaylistOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-2 sm:p-4 animate-fade-in">
          <div className="w-full max-w-xl glass rounded-3xl p-4 sm:p-6 border border-accent/30 bg-[#1F0F0D]/95 shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[88vh] flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-accent">
                  <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                  <span>YouTube Music Jukebox</span>
                </div>
                <h3
                  className="text-lg sm:text-xl font-bold text-white leading-snug"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {day.bengaliTitle} — প্রয়োজনীয় গান শুনুন
                </h3>
              </div>
              <button
                onClick={() => setIsPlaylistOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Live Search Bar for Songs */}
            <div className="mt-3 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="গান বা গায়কের নাম খুঁজুন (যেমন: অরিজিৎ, শ্রেয়া, ঢাকের তালে)..."
                className="w-full pl-9 pr-9 py-2 bg-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-white/40 border border-white/10 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Custom Song Request Input */}
            <form onSubmit={handlePlayCustomSong} className="mt-2 flex items-center gap-2">
              <input
                type="text"
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                placeholder="যেকোনো YouTube ভিডিও লিংক / ID পেস্ট করে বাজান..."
                className="flex-1 px-3 py-1.5 bg-black/40 rounded-xl text-xs text-white placeholder-white/35 border border-white/10 focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                disabled={!customUrlInput.trim()}
                className="px-3 py-1.5 rounded-xl bg-accent hover:bg-accent-hover disabled:opacity-40 text-white text-xs font-semibold cursor-pointer transition-all flex items-center gap-1"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Play</span>
              </button>
            </form>

            {/* Song Items List */}
            <div className="overflow-y-auto space-y-2 py-3 pr-1 custom-scrollbar flex-1 my-2 max-h-[48vh]">
              {filteredPlaylist.length === 0 ? (
                <div className="text-center py-8 text-white/50 text-xs">
                  কোনো গান মেলেনি। আপনার পছন্দের YouTube লিংক ওপরের বক্সে পেস্ট করে সরাসরি চালাতে পারেন!
                </div>
              ) : (
                filteredPlaylist.map((track) => {
                  const isCurrent = activeTrack?.youtubeId === track.youtubeId;
                  const playlistIdx = playlist.findIndex((p) => p.id === track.id);

                  return (
                    <div
                      key={track.id}
                      onClick={() => selectTrack(playlistIdx >= 0 ? playlistIdx : 0)}
                      className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-all ${
                        isCurrent
                          ? "bg-accent/25 border border-accent/50 shadow-[0_0_15px_rgba(255,77,61,0.3)]"
                          : "bg-white/5 hover:bg-white/10 border border-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {/* Status visualizer */}
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
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
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
                        {/* Direct YouTube Music Link */}
                        <a
                          href={`https://music.youtube.com/watch?v=${track.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-full bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"
                          title="Open in YouTube Music app"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <span className="text-[10px] text-white/50 font-mono hidden sm:inline">{track.duration}</span>
                        
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
                })
              )}
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
              <span>{playlist.length} টি আসল বাংলা পুজো গান • YouTube Music</span>
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
