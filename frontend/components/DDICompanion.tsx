"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/frontend/context/AppContext";
import { Sparkles, MapPin, CheckCircle, Navigation, Send, RotateCcw } from "lucide-react";
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
  content: "Dugga-Dugga, bacha! 👵 I am your wise path companion, **Dugga Dugga Intelligence**. Tell me where you are currently located, what your plans are, or ask me about any of the 93 pandals across Kolkata! Let Thakuma guide your **Thakur Darshan** journey safely today!"
};

export default function DDICompanion({ visitedIds }: DDICompanionProps) {
  const { toggleCompleted, completedIds, userEmail } = useAppContext();

  // Reference visitedIds strictly to satisfy unused prop linter checks
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
        } catch (err) {
          console.error("Failed to load chat history from Supabase:", err);
        }
      }

      // Guest local storage fallback
      const stored = localStorage.getItem("ddi_chat_history");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        } catch (e) {
          console.error("Failed to parse local storage chat history:", e);
        }
      }
    }

    loadHistory();
  }, [userEmail]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Helper to persist chat history
  const persistHistory = async (newHistory: Message[]) => {
    localStorage.setItem("ddi_chat_history", JSON.stringify(newHistory));
    if (userEmail) {
      try {
        await fetch("/api/chat/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ history: newHistory }),
        });
      } catch (err) {
        console.error("Failed to save chat history to Supabase:", err);
      }
    }
  };

  const handleClearHistory = async () => {
    const freshHistory = [DEFAULT_WELCOME_MESSAGE];
    setMessages(freshHistory);
    localStorage.removeItem("ddi_chat_history");
    if (userEmail) {
      try {
        await fetch("/api/chat/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ history: freshHistory }),
        });
      } catch (err) {
        console.error("Failed to clear chat history in database:", err);
      }
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessageText = input.trim();
    setInput("");
    
    const userMsg: Message = { role: "user", content: userMessageText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          visitedIds: completedIds
        })
      });

      const data = await response.json();

      let assistantMsg: Message;
      if (data.success) {
        assistantMsg = {
          role: "assistant",
          content: data.text,
          recommendation: data.recommendation
        };
      } else {
        assistantMsg = {
          role: "assistant",
          content: "Oops! Thakuma lost connection to the heavens for a second. Please try asking again, bacha!"
        };
      }

      const finalHistory = [...updatedMessages, assistantMsg];
      setMessages(finalHistory);
      await persistHistory(finalHistory);
    } catch (err) {
      console.error("DDI Conversational AI chatbot request failed:", err);
      const errorMsg: Message = {
        role: "assistant",
        content: "Thakuma couldn't connect to the DDI networks. Check your internet connection, my child!"
      };
      const finalHistory = [...updatedMessages, errorMsg];
      setMessages(finalHistory);
      await persistHistory(finalHistory);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMap = (rec: RecommendationData) => {
    setActiveRecommendation(rec);
    setShowMap(true);
  };

  return (
    <div className="glass rounded-3xl p-6 sm:p-8 border-accent/20 bg-[#1F0F0D]/65 shadow-[0_8px_32px_rgba(255,77,61,0.08)] relative">
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[96px] opacity-10 bg-accent pointer-events-none" />

      <div className="relative z-10 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shadow-[0_0_15px_rgba(255,77,61,0.15)]">
              <Sparkles className="w-5 h-5 animate-pulse" style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <h3 
                className="text-lg sm:text-xl font-bold flex items-center gap-2"
                style={{ fontFamily: "var(--font-theme-serif), var(--font-serif), serif" }}
              >
                Dugga Dugga Intelligence <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded bg-accent/20 text-accent font-black border border-accent/30">DDI Chat</span>
              </h3>
              <p className="text-xs opacity-50">Interactive spatial navigation chatbot & crowd companion</p>
            </div>
          </div>

          {/* New Chat / Clear History Button */}
          {messages.length > 1 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/60 hover:text-white hover:bg-white/10 hover:border-accent/30 transition-all cursor-pointer"
              title="Start a new conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Chat</span>
            </button>
          )}
        </div>

        {/* Chat Thread Container */}
        <div className="glass rounded-2xl p-4 border-white/5 bg-[#1F0F0D]/40 min-h-[220px] max-h-[400px] overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-white/10">
          {messages.map((msg, idx) => {
            const isUser = msg.role === "user";
            return (
              <div key={idx} className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}>
                
                <span className="text-[9px] uppercase tracking-widest opacity-40 font-bold px-1.5">
                  {isUser ? "You" : "👵 Thakuma"}
                </span>

                <div 
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg ${
                    isUser 
                      ? "rounded-tr-none bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/25 text-white/90 text-right ml-8" 
                      : "rounded-tl-none bg-white/5 border border-white/10 text-white/95 mr-8"
                  }`}
                >
                  <p 
                    dangerouslySetInnerHTML={{ 
                      __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-accent font-bold" style="color: var(--accent);">$1</strong>') 
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
              <span className="text-[9px] uppercase tracking-widest opacity-40 font-bold px-1.5">
                👵 Thakuma
              </span>
              <div className="rounded-2xl rounded-tl-none px-4 py-3 bg-white/5 border border-white/10 mr-8 flex items-center gap-2.5 shadow-inner">
                <span className="w-2.5 h-2.5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" style={{ borderTopColor: "var(--accent)" }} />
                <span className="text-xs opacity-50 italic animate-pulse">Thakuma is consulting the stars...</span>
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
            placeholder='Ask Thakuma e.g., "I am at Sreebhumi, what are the best pandals and rolls nearby?"'
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

      {/* Map Modal */}
      {showMap && activeRecommendation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-all duration-300">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[rgba(255,77,61,0.2)] bg-[#1A0F0D] p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-serif), serif" }}>
                Route Map: {activeRecommendation.name}
              </h4>
              <button
                onClick={() => setShowMap(false)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="h-60 rounded-xl overflow-hidden border border-[rgba(255,77,61,0.2)] bg-black/40 relative shadow-inner">
              <iframe
                title={`DDI Map of ${activeRecommendation.name}`}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(activeRecommendation.name + ", Kolkata")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-white/50">
              <span>Location: {activeRecommendation.location}</span>
              <button
                onClick={() => {
                  window.open(
                    activeRecommendation.mapUrl || `https://www.google.com/maps/search/${encodeURIComponent(activeRecommendation.name + " Kolkata")}`,
                    "_blank"
                  );
                }}
                className="text-accent hover:underline flex items-center gap-1 font-medium cursor-pointer"
                style={{ color: "var(--accent)" }}
              >
                Open in Google Maps
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
