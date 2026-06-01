"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "@/frontend/context/AppContext";
import Navbar from "@/frontend/components/Navbar";
import PandalCard from "@/frontend/components/PandalCard";
import { pandals } from "@/frontend/lib/mockData";
import { ArrowLeft, Search, X, Sparkles } from "lucide-react";
import Link from "next/link";

const categoryMeta: Record<string, { title: string; subtitle: string; example: string }> = {
  "bonedi-bari": {
    title: "Bonedi Bari",
    subtitle: "Heritage Household Pujos",
    example: "Sovabazar Rajbari",
  },
  "north-kolkata": {
    title: "North Kolkata",
    subtitle: "Traditional & Grand Pujos",
    example: "Sreebhumi",
  },
  "south-kolkata": {
    title: "South Kolkata",
    subtitle: "Modern & Iconic Pujos",
    example: "Suruchi Sangha",
  },
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { isLoggedIn } = useAppContext();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Sync search query from URL query params on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const search = searchParams.get("search");
    if (search) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchQuery(search);
    }
  }, []);

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const meta = categoryMeta[slug];

  // Smart suggestions matching query across all 93 loaded pandals for premium cross-discovery
  const suggestions = searchQuery.trim()
    ? pandals
        .filter((p) => {
          const q = searchQuery.toLowerCase().trim();
          return p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
        })
        .slice(0, 5)
    : [];

  // Filtered pandals for the current category matching query
  const filteredPandals = pandals
    .filter((p) => p.category === slug)
    .filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    });

  if (!meta) {
    return (
      <>
        <Navbar />
        <main className="pt-24 px-4 max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-accent text-sm font-medium transition-all hover:brightness-110"
            style={{ color: "var(--accent)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-12 px-4 sm:px-6 max-w-4xl mx-auto min-h-screen relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full blur-[128px] opacity-10 bg-accent" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm opacity-50 hover:opacity-80 transition-opacity mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Explore
            </Link>
            <h1
              className="text-3xl sm:text-4xl mb-1"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
              }}
            >
              {meta.title}
            </h1>
            <p className="text-sm opacity-50">{meta.subtitle}</p>
          </div>

          {/* Search Box & Suggestions Dropdown */}
          <div className="relative mb-8 z-30" ref={dropdownRef}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder={`Search pandals (e.g., "${meta.example}")...`}
                className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300 text-sm shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setShowSuggestions(false);
                    // Remove search query parameter from URL
                    const url = new URL(window.location.href);
                    url.searchParams.delete("search");
                    router.replace(url.pathname);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center text-white/55"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Auto-suggest dropdown with high-fidelity styles */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 glass rounded-2xl border border-accent/20 bg-[#1F0F0D]/95 backdrop-blur-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-200">
                <div className="px-4 py-2.5 text-[10px] font-semibold text-accent/80 border-b border-white/5 tracking-widest uppercase flex items-center gap-1.5 bg-accent/5">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                  Smart Recommendations
                </div>
                {suggestions.map((p) => {
                  const isCurrentCategory = p.category === slug;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        if (isCurrentCategory) {
                          setSearchQuery(p.name);
                          setShowSuggestions(false);
                        } else {
                          router.push(`/category/${p.category}?search=${encodeURIComponent(p.name)}`);
                          setShowSuggestions(false);
                        }
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors flex items-center justify-between gap-3 border-b border-white/5 last:border-0"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">{p.name}</span>
                        <span className="text-xs opacity-40">{p.location}</span>
                      </div>
                      <span className={`text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full font-semibold border ${
                        isCurrentCategory 
                          ? "bg-accent/10 text-accent border-accent/20" 
                          : "bg-white/5 text-white/55 border-white/10"
                      }`}>
                        {isCurrentCategory ? "Current Zone" : categoryMeta[p.category]?.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pandal List */}
          <div className="space-y-4 relative z-10">
            {filteredPandals.map((pandal) => (
              <PandalCard
                key={pandal.id}
                id={pandal.id}
                name={pandal.name}
                location={pandal.location}
                crowdLevel={pandal.crowdLevel}
                imageUrl={pandal.imageUrl}
                mapUrl={pandal.mapUrl}
              />
            ))}
          </div>

          {/* Empty Search State */}
          {filteredPandals.length === 0 && (
            <div className="glass rounded-3xl p-12 text-center border-accent/15 space-y-4 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-accent">
                <Search className="w-8 h-8 opacity-40" />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold" style={{ fontFamily: "var(--font-playfair), serif" }}>No Pandals Found</p>
                <p className="text-sm opacity-50 max-w-sm mx-auto">
                  We couldn&apos;t find any pandals matching &quot;{searchQuery}&quot; in this category. Try searching for something else!
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  const url = new URL(window.location.href);
                  url.searchParams.delete("search");
                  router.replace(url.pathname);
                }}
                className="px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl bg-accent text-white transition-all hover:brightness-110 hover:shadow-[0_0_15px_rgba(255,77,61,0.25)] active:scale-[0.98]"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

