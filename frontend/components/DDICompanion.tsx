"use client";

import React, { useState, useEffect } from "react";
import { useAppContext } from "@/frontend/context/AppContext";
import { pandals } from "@/frontend/lib/mockData";
import { Sparkles, MapPin, CheckCircle, Navigation, Flame } from "lucide-react";
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
  distance: number;
  travelTime: string;
}

export default function DDICompanion({ visitedIds }: DDICompanionProps) {
  const { toggleCompleted, completedIds } = useAppContext();
  
  const [currentPandalId, setCurrentPandalId] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendationData | null>(null);
  const [recText, setRecText] = useState("");
  const [showMap, setShowMap] = useState(false);

  // Auto-select their last checked-off visited pandal on mount / visited list updates
  useEffect(() => {
    if (visitedIds && visitedIds.length > 0 && !currentPandalId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPandalId(visitedIds[visitedIds.length - 1]);
    } else if (!currentPandalId && pandals.length > 0) {
      // Default to first pandal in the list
      setCurrentPandalId(pandals[0].id);
    }
  }, [visitedIds, currentPandalId]);

  const handleConsultDDI = async () => {
    if (!currentPandalId) return;
    
    setLoading(true);
    setRecommendation(null);
    setRecText("");
    
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPandalId,
          visitedIds: completedIds
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (data.completedAll) {
          setRecText(data.message);
        } else {
          setRecommendation(data.recommendation);
          setRecText(data.text);
        }
      } else {
        setRecText("Oops! Dugga-Dugga could not consult the heavens right now. Please try again!");
      }
    } catch (err) {
      console.error("DDI recommendation query failed:", err);
      setRecText("Could not connect to DDI network. Please check your connection!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-3xl p-6 sm:p-8 border-accent/20 bg-[#1F0F0D]/65 shadow-[0_8px_32px_rgba(255,77,61,0.08)] relative overflow-hidden">
      {/* Background ambient glow inside container */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[96px] opacity-10 bg-accent pointer-events-none" />

      <div className="relative z-10 space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shadow-[0_0_15px_rgba(255,77,61,0.15)]">
            <Sparkles className="w-5 h-5" style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <h3 
              className="text-lg sm:text-xl font-bold flex items-center gap-2"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Dugga Dugga Intelligence <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded bg-accent/20 text-accent font-black border border-accent/30">DDI</span>
            </h3>
            <p className="text-xs opacity-50">High-fidelity spelling-tolerant path companion for puja explorers</p>
          </div>
        </div>

        {/* Input Selector Row */}
        <div className="space-y-3">
          <label className="block text-xs uppercase tracking-wider opacity-40 font-bold">
            Where are you currently located?
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={currentPandalId}
              onChange={(e) => {
                setCurrentPandalId(e.target.value);
                setRecommendation(null);
                setRecText("");
              }}
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 text-sm transition-colors cursor-pointer max-w-full"
            >
              {pandals.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#1F0F0D] text-white">
                  {p.name} ({p.category === "bonedi-bari" ? "Bonedi" : p.category === "north-kolkata" ? "North" : "South"})
                </option>
              ))}
            </select>

            <button
              onClick={handleConsultDDI}
              disabled={loading || !currentPandalId}
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all duration-300 hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,77,61,0.1)] border border-accent/30"
              style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-hover))" }}
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Consulting DDI...
                </>
              ) : (
                <>
                  <Flame className="w-3.5 h-3.5 animate-pulse" />
                  Consult DDI
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading Overlay State */}
        {loading && (
          <div className="glass rounded-2xl p-8 border-white/5 flex flex-col items-center justify-center text-center space-y-3 py-12">
            <span className="w-10 h-10 border-3 border-accent/30 border-t-accent rounded-full animate-spin" style={{ borderTopColor: "var(--accent)" }} />
            <p className="text-sm font-semibold tracking-wider text-accent animate-pulse">Dugga-Dugga...</p>
            <p className="text-xs opacity-40 max-w-xs">AI is calculating distances, crowd levels, and routing coordinates across Kolkata...</p>
          </div>
        )}

        {/* Suggestion Outcome */}
        {recText && !loading && (
          <div className="glass rounded-2xl p-5 border-accent/15 bg-accent/5 space-y-4">
            <div className="flex gap-3">
              <span className="text-xl leading-none">👵</span>
              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent">Dugga-Dugga Blessing</span>
                <p 
                  className="text-sm sm:text-base leading-relaxed text-white/90 font-medium"
                  dangerouslySetInnerHTML={{ 
                    __html: recText.replace(/\*\*(.*?)\*\*/g, '<strong class="text-accent" style="color: var(--accent);">$1</strong>') 
                  }}
                />
              </div>
            </div>

            {/* Recommended Pandal Card Embed */}
            {recommendation && (
              <div className="glass rounded-xl overflow-hidden border-white/10 bg-white/5 mt-2 flex flex-col sm:flex-row shadow-lg">
                <div className="relative w-full sm:w-28 h-32 sm:h-auto flex-shrink-0">
                  <Image
                    src={recommendation.imageUrl}
                    alt={recommendation.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 112px"
                    className="object-cover"
                  />
                  {completedIds.includes(recommendation.id) && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-green-400">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">{recommendation.name}</h4>
                    <p className="text-xs opacity-50 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {recommendation.location} • {recommendation.travelTime}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between gap-3 mt-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                      {recommendation.crowdLevel} Crowd
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setShowMap(true)}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                        title="Quick View Map"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleCompleted(recommendation.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          completedIds.includes(recommendation.id)
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <CheckCircle className="w-3 h-3" />
                        {completedIds.includes(recommendation.id) ? "Visited!" : "Visit"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Embed Map Modal */}
      {showMap && recommendation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-all duration-300">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[rgba(255,77,61,0.2)] bg-[#1A0F0D] p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Route Map: {recommendation.name}
              </h4>
              <button
                onClick={() => setShowMap(false)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-60 rounded-xl overflow-hidden border border-[rgba(255,77,61,0.2)] bg-black/40 relative shadow-inner">
              <iframe
                title={`DDI Map of ${recommendation.name}`}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(recommendation.name + ", Kolkata")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-white/50">
              <span>Location: {recommendation.location}</span>
              <button
                onClick={() => {
                  window.open(
                    recommendation.mapUrl || `https://www.google.com/maps/search/${encodeURIComponent(recommendation.name + " Kolkata")}`,
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

// Inline Close Modal SVG Icon representation
const X = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
