"use client";

import { useAppContext } from "@/frontend/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/frontend/components/Navbar";
import CategoryCard from "@/frontend/components/CategoryCard";
import { pandals } from "@/frontend/lib/mockData";
import { filterPandalsFuzzy } from "@/frontend/lib/searchHelper";
import { Flame, Search, X, Sparkles } from "lucide-react";

export default function HomePage() {
  const { isLoggedIn } = useAppContext();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  // Smart suggestions matching query across all 93 loaded pandals globally using fuzzy matching
  const suggestions = searchQuery.trim()
    ? filterPandalsFuzzy(pandals, searchQuery).slice(0, 5)
    : [];

  const handleSuggestionClick = (pandal: typeof pandals[0]) => {
    router.push(`/category/${pandal.category}?search=${encodeURIComponent(pandal.name)}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Find the first matching pandal using fuzzy spelling tolerance
    const match = filterPandalsFuzzy(pandals, searchQuery)[0];

    if (match) {
      router.push(`/category/${match.category}?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      // If no matches at all, fallback to South Kolkata zone to display the premium empty search page
      router.push(`/category/south-kolkata?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    {
      title: "Bonedi Bari",
      subtitle: "Heritage Households",
      slug: "bonedi-bari",
      imageUrl: "/images/bonedi-1.png",
    },
    {
      title: "North Kolkata",
      subtitle: "Traditional & Grand",
      slug: "north-kolkata",
      imageUrl: "/images/north-1.png",
    },
    {
      title: "South Kolkata",
      subtitle: "Modern & Iconic",
      slug: "south-kolkata",
      imageUrl: "/images/south-1.png",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-12 px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-accent text-xs uppercase tracking-widest mb-6">
            <Flame className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
            <span style={{ color: "var(--accent)" }}>Puja Season 2026</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl mb-4 leading-tight"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
            }}
          >
            Discover the Spirit of{" "}
            <span
              style={{
                color: "var(--accent)",
                textShadow: "0 0 60px rgba(255,77,61,0.3)",
              }}
            >
              Durga Puja
            </span>
          </h1>
          
          {/* Bengali Festive Slogan */}
          <p
            className="text-2xl sm:text-3xl md:text-4xl mb-6 font-semibold tracking-wide"
            style={{
              fontFamily: "var(--font-playfair), serif",
              color: "rgba(255, 255, 255, 0.95)",
              textShadow: "0 0 20px rgba(255, 77, 61, 0.4)",
            }}
          >
            বলো দুগ্গা মাই কি জয়!
          </p>

          <p className="text-base sm:text-lg opacity-50 max-w-xl mx-auto mb-8">
            Navigate Kolkata&apos;s most celebrated pandals. From heritage households to
            modern marvels — your festival companion awaits.
          </p>

          {/* Centered Premium Search Bar */}
          <div className="max-w-xl mx-auto relative z-30" ref={dropdownRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder='Search all 93 pandals (e.g., "Sreebhumi", "Suruchi Sangha", "Laha Bari")...'
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300 text-sm shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setShowSuggestions(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center text-white/55"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Autocomplete dropdown with premium styling matching brand theme */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 glass rounded-2xl border border-accent/20 bg-[#1F0F0D]/95 backdrop-blur-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)] text-left transition-all duration-200">
                <div className="px-4 py-2.5 text-[10px] font-semibold text-accent/80 border-b border-white/5 tracking-widest uppercase flex items-center gap-1.5 bg-accent/5">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                  Global Pandal Recommendations
                </div>
                {suggestions.map((p) => {
                  const categoryLabels: Record<string, string> = {
                    "bonedi-bari": "Bonedi Bari",
                    "north-kolkata": "North Kolkata",
                    "south-kolkata": "South Kolkata",
                  };
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSuggestionClick(p)}
                      className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors flex items-center justify-between gap-3 border-b border-white/5 last:border-0"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">{p.name}</span>
                        <span className="text-xs opacity-40">{p.location}</span>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full font-semibold border bg-white/5 text-white/55 border-white/10">
                        {categoryLabels[p.category]}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Category Grid */}
        <section id="categories">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.slug}
                title={cat.title}
                subtitle={cat.subtitle}
                slug={cat.slug}
                imageUrl={cat.imageUrl}
                pandalCount={
                  pandals.filter((p) => p.category === cat.slug).length
                }
              />
            ))}
          </div>
        </section>

        {/* DDI Chatbot Call to Action Banner */}
        <section className="mt-12 sm:mt-16 glass rounded-3xl p-6 sm:p-8 border-accent/20 bg-[#1F0F0D]/65 shadow-[0_8px_32px_rgba(255,77,61,0.06)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Ambient lighting glows */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[64px] opacity-20 bg-accent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-[64px] opacity-10 bg-accent pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10 flex-col sm:flex-row text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0 text-accent text-3xl shadow-[0_0_20px_rgba(255,77,61,0.15)] animate-pulse">
              👵
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2 justify-center sm:justify-start" style={{ fontFamily: "var(--font-theme-serif), var(--font-serif), serif" }}>
                Dugga Dugga Intelligence <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded bg-accent/20 text-accent font-black border border-accent/30">AI Chat</span>
              </h3>
              <p className="text-sm opacity-60 mt-1 max-w-xl">
                Dugga Dugga Intelligence (DDI) is online! Let your wise path assistant guide your **Thakur Darshan** journey, check live crowd levels, and calculate curfew constraints in real-time.
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push("/chatbot")}
            className="px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 hover:brightness-110 active:scale-95 cursor-pointer relative z-10 whitespace-nowrap shadow-[0_0_15px_rgba(255,77,61,0.2)] flex items-center gap-2"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-hover))", color: "#fff" }}
          >
            <span>Ask DDI AI</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </section>

        {/* Stats Strip */}
        <section className="mt-12 sm:mt-16 glass rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                {pandals.length}
              </p>
              <p className="text-xs sm:text-sm opacity-40 mt-1">Pandals Listed</p>
            </div>
            <div>
              <p
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                3
              </p>
              <p className="text-xs sm:text-sm opacity-40 mt-1">Zones to Explore</p>
            </div>
            <div>
              <p
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                Live
              </p>
              <p className="text-xs sm:text-sm opacity-40 mt-1">Crowd Updates</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

