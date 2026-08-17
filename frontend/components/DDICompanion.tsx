"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/frontend/context/AppContext";
import { Sparkles, MapPin, CheckCircle, Navigation, Send, RotateCcw, Bot } from "lucide-react";
import Image from "next/image";

interface DDICompanionProps {
  visitedIds: string[];
}

interface RecommendationData {
  id: string;
  name: string;
  location: string;
  crowdLevel: string;
  imageUrl: string;
  mapUrl?: string;
  travelTime: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  recommendation?: RecommendationData | null;
}

const DEFAULT_WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Dugga-Dugga! ✨ Welcome to **Dugga Dugga Intelligence (DDI)** — your real-time Kolkata Durga Puja AI companion. Tell me where you are currently located, what your plans are, or ask me about any of the 93 pandals across Kolkata! Let DDI guide your **Thakur Darshan** journey safely today!"
};

export default function DDICompanion({ visitedIds }: DDICompanionProps) {
  const { toggleCompleted, completedIds, userEmail } = useAppContext();

  useEffect(() => {
    console.log(`[DDI Chatbot] Initialized with ${visitedIds?.length || 0} completed visits.`);
  }, [visitedIds]);

  const [messages, setMessages] = useState<Message[]>([DEFAULT_WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [showMap, setShowMap] = useState(false);
  const [activeRecommendation, setActiveRecommendation] = useState<RecommendationData | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from Supabase / localStorage on mount
  useEffect(() => {
    async function loadHistory() {
      if (userEmail) {
        try {
          const res = await fetch("/api/chat/history");
          const data = await res.json();
          if (data.history && Array.isArray(data.history) && data.history.length > 0) {
            setMessages(data.history);
            return;
          }
        } catch (e) {
          console.warn("[DDI Chat] Failed to load chat history:", e);
        }
      }
    }
    loadHistory();
  }, [userEmail]);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessageText = input.trim();
    const newMessages: Message[] = [...messages, { role: "user", content: userMessageText }];
    
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          completedIds,
        }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply,
            recommendation: data.recommendation || null,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Oops! DDI lost connection to the server for a second. Please try asking again!",
          },
        ]);
      }
    } catch (err) {
      console.error("[DDI Companion Error]:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "DDI couldn't connect to the network. Please check your internet connection!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = async () => {
    if (confirm("Reset conversation with DDI Assistant?")) {
      setMessages([DEFAULT_WELCOME_MESSAGE]);
      try {
        await fetch("/api/chat/history", { method: "DELETE" });
      } catch (err) {
        console.warn("Failed to clear chat history:", err);
      }
    }
  };

  const handleOpenMap = (rec: RecommendationData) => {
    setActiveRecommendation(rec);
    setShowMap(true);
  };

  return (
    <div className="space-y-4">
      {/* Map Modal */}
      {showMap && activeRecommendation && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass rounded-3xl p-6 max-w-lg w-full border border-accent/30 space-y-4 relative bg-[#1F0F0D]/95">
            <button
              onClick={() => setShowMap(false)}
              className="absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              Close ✕
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass-accent flex items-center justify-center text-accent border border-accent/30">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">{activeRecommendation.name}</h3>
                <p className="text-xs opacity-60">{activeRecommendation.location}</p>
              </div>
            </div>

            <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-white/10">
              <iframe
                title={`Map of ${activeRecommendation.name}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={
                  activeRecommendation.mapUrl ||
                  `https://maps.google.com/maps?q=${encodeURIComponent(
                    `${activeRecommendation.name}, ${activeRecommendation.location}, Kolkata`
                  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`
                }
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-accent font-semibold">Travel Time: ~{activeRecommendation.travelTime}</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${activeRecommendation.name}, ${activeRecommendation.location}, Kolkata`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-accent text-white font-bold hover:brightness-110 transition-all flex items-center gap-1.5"
              >
                <span>Open Google Maps</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Header Container with Custom DDI Logo */}
      <div className="glass rounded-2xl p-4 border border-accent/20 bg-accent/5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          {/* Sleek DDI Logo Emblem */}
          <div className="w-10 h-10 rounded-xl glass-accent flex items-center justify-center p-1 border border-accent/40 shadow-[0_0_15px_rgba(255,77,61,0.3)]">
            <Image
              src="/images/ddi-logo.png"
              alt="Dugga Dugga Intelligence (DDI) Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
              <span>DDI Assistant</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
                Dugga Dugga Intelligence
              </span>
            </h3>
            <p className="text-xs opacity-60 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-accent animate-pulse" />
              <span>Realtime Kolkata Spatial Guide</span>
            </p>
          </div>
        </div>

        {messages.length > 1 && (
          <button
            onClick={handleResetChat}
            className="px-3 py-1.5 rounded-xl glass hover:bg-white/10 text-xs text-white/70 hover:text-white border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Reset Chat"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        )}
      </div>

      {/* Chat Thread Container */}
      <div className="glass rounded-2xl p-4 border-white/5 bg-[#1F0F0D]/40 min-h-[220px] max-h-[400px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {messages.map((msg, idx) => {
          const isUser = msg.role === "user";
          return (
            <div key={idx} className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}>
              
              <span className="text-[9px] uppercase tracking-widest opacity-50 font-bold px-1.5 flex items-center gap-1">
                {isUser ? (
                  "You"
                ) : (
                  <>
                    <Bot className="w-3 h-3 text-accent" />
                    <span>DDI Assistant</span>
                  </>
                )}
              </span>

              <div 
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg ${
                  isUser 
                    ? "rounded-tr-none bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/25 text-white/90 text-right ml-8" 
                    : "rounded-tl-none bg-white/5 border border-white/10 text-white/95 mr-8"
                }`}
              >
                <div 
                  className="space-y-3 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: msg.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-accent font-semibold" style="color: var(--accent);">$1</strong>')
                      .replace(/(?:^|\n)[*|-]\s+(.*?)(?=\n|$)/g, '<div class="flex items-start gap-2 my-1 pl-2"><span class="text-accent mt-0.5">•</span><span>$1</span></div>')
                      .replace(/\n\n/g, '<div class="h-2"></div>')
                      .replace(/\n/g, '<br />')
                  }}
                />

                {!isUser && msg.recommendation && (
                  <div className="glass rounded-xl overflow-hidden border-white/10 bg-white/5 mt-4 flex flex-col sm:flex-row shadow-lg text-left max-w-sm">
                    <div className="relative w-full sm:w-24 h-28 sm:h-auto flex-shrink-0">
                      <Image
                        src={msg.recommendation.imageUrl}
                        alt={msg.recommendation.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 96px"
                        className="object-cover"
                      />
                      {completedIds.includes(msg.recommendation.id) && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-green-400">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <div className="p-3.5 flex-1 flex flex-col justify-between gap-1.5">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">{msg.recommendation.name}</h4>
                        <p className="text-[10px] opacity-50 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-2.5 h-2.5" />
                          {msg.recommendation.location} • {msg.recommendation.travelTime}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2 mt-1">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                          msg.recommendation.crowdLevel === "High" 
                            ? "bg-red-500/10 text-red-400 border-red-500/20" 
                            : msg.recommendation.crowdLevel === "Medium"
                              ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                              : "bg-green-500/10 text-green-400 border-green-500/20"
                        }`}>
                          {msg.recommendation.crowdLevel} Crowd
                        </span>
                        
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenMap(msg.recommendation!)}
                            className="p-1 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                            title="Quick View Map"
                          >
                            <Navigation className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => toggleCompleted(msg.recommendation!.id)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                              completedIds.includes(msg.recommendation.id)
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            <CheckCircle className="w-2.5 h-2.5" />
                            {completedIds.includes(msg.recommendation.id) ? "Visited!" : "Visit"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          );
        })}

        {loading && (
          <div className="flex flex-col items-start space-y-1">
            <span className="text-[9px] uppercase tracking-widest opacity-50 font-bold px-1.5 flex items-center gap-1">
              <Bot className="w-3 h-3 text-accent" />
              <span>DDI Assistant</span>
            </span>
            <div className="rounded-2xl rounded-tl-none px-4 py-3 bg-white/5 border border-white/10 mr-8 flex items-center gap-2.5 shadow-inner">
              <span className="w-2.5 h-2.5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" style={{ borderTopColor: "var(--accent)" }} />
              <span className="text-xs opacity-50 italic animate-pulse">DDI is analyzing Kolkata pandal routes...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          placeholder='Ask DDI e.g., "I am at Sreebhumi, what are the best pandals and rolls nearby?"'
          className="flex-1 pl-4 pr-10 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 text-xs sm:text-sm transition-all duration-300 shadow-inner"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:brightness-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-hover))" }}
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
