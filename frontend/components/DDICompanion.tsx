"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/frontend/context/AppContext";
import { pandals } from "@/frontend/lib/mockData";
import { filterPandalsFuzzy } from "@/frontend/lib/searchHelper";
import { Sparkles, MapPin, CheckCircle, Navigation, Flame, Search, X } from "lucide-react";
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
  
  const [currentPandalId, setCurrentPandalId] = useState(() => {
    if (visitedIds && visitedIds.length > 0) {
      return visitedIds[visitedIds.length - 1];
    }
    return pandals.length > 0 ? pandals[0].id : "";
  });
  const [pandalSearchQuery, setPandalSearchQuery] = useState(() => {
    if (visitedIds && visitedIds.length > 0) {
      const lastPandalId = visitedIds[visitedIds.length - 1];
      return pandals.find((p) => p.id === lastPandalId)?.name || "";
    }
    return pandals.length > 0 ? pandals[0].name : "";
  });
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendationData | null>(null);
  const [recText, setRecText] = useState("");
  const [showMap, setShowMap] = useState(false);

  // Close search suggestions dropdown on clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // Smart suggestions matching query across all 93 loaded pandals for premium starting point search
  const searchSuggestions = pandalSearchQuery.trim()
    ? filterPandalsFuzzy(pandals, pandalSearchQuery).slice(0, 5)
    : [];

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

        {/* Input Selector Row with High-fidelity Search Autocompletion */}
        <div className="space-y-3">
          <label className="block text-xs uppercase tracking-wider opacity-40 font-bold">
            Where are you currently located?
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            
            {/* Spelling-tolerant dynamic autocompletion select input */}
            <div className="relative flex-1" ref={searchDropdownRef}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/40" />
                <input
                  type="text"
                  value={pandalSearchQuery}
                  onChange={(e) => {
                    setPandalSearchQuery(e.target.value);
                    setShowSearchSuggestions(true);
                  }}
                  onFocus={() => setShowSearchSuggestions(true)}
                  placeholder='Search starting pandal (e.g., "Sovabazar", "Sreebhumi")...'
                  className="w-full pl-11 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 text-sm transition-colors shadow-inner"
                />
                {pandalSearchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setPandalSearchQuery("");
                      setCurrentPandalId("");
                      setShowSearchSuggestions(false);
                      setRecommendation(null);
                      setRecText("");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center text-white/45 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Autocomplete suggestion dropdown with dynamic high-fidelity overlays */}
              {showSearchSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 glass rounded-2xl border border-accent/25 bg-[#1F0F0D]/95 backdrop-blur-xl max-h-56 overflow-y-auto z-40 shadow-[0_10px_40px_rgba(0,0,0,0.6)] text-left transition-all duration-200">
                  <div className="px-4 py-2 text-[9px] font-bold text-accent/80 border-b border-white/5 tracking-widest uppercase bg-accent/5">
                    Select Your Location
                  </div>
                  {searchSuggestions.map((p) => {
                    const categoryLabels: Record<string, string> = {
                      "bonedi-bari": "Bonedi",
                      "north-kolkata": "North",
                      "south-kolkata": "South",
                    };
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setCurrentPandalId(p.id);
                          setPandalSearchQuery(p.name);
                          setShowSearchSuggestions(false);
                          setRecommendation(null);
                          setRecText("");
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors flex items-center justify-between gap-3 border-b border-white/5 last:border-0"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-white">{p.name}</span>
                          <span className="text-[10px] opacity-40">{p.location}</span>
                        </div>
                        <span className="text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded border border-white/10 text-white/50 bg-white/5 font-semibold">
                          {categoryLabels[p.category]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={handleConsultDDI}
              disabled={loading || !currentPandalId}
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all duration-300 hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,77,61,0.1)] border border-accent/30 flex-shrink-0"
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
                <XIcon className="w-4 h-4" />
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

// Inline Close Modal SVG Icon representation to avoid duplicate name collision
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
