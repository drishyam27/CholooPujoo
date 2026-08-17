"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/frontend/context/AppContext";
import { Flame, Map, LogOut, Menu, X, Trophy, User, MessageSquare, Calendar, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { logout } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Explore Pandals", subtitle: "93 Mega Pandals & Live Maps", icon: Flame },
    { href: "/calendar", label: "Sharadiya Ponjika 2026", subtitle: "12-Day Festival Calendar & Music", icon: Calendar },
    { href: "/itinerary", label: "My Itinerary", subtitle: "Custom Pandal Hop Route", icon: Map },
    { href: "/ddi", label: "DDI Chat", subtitle: "Dugga Dugga Intelligence AI", icon: MessageSquare },
    { href: "/leaderboard", label: "Leaderboard", subtitle: "Top Hoppers & Realtime Ranks", icon: Trophy },
    { href: "/profile", label: "Profile", subtitle: "Personal Badges & Avatar", icon: User },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1F0F0D]/90 backdrop-blur-xl border-b border-accent/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" id="main-navbar">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
              <div className="flex items-center justify-center rounded-xl glass-accent p-1.5 shadow-[0_0_15px_rgba(255,77,61,0.15)] group-hover:shadow-[0_0_20px_rgba(255,77,61,0.3)] transition-all duration-300 border-accent/30">
                <Image
                  src="/durga-eyes.jpg"
                  alt="CholooPujoo Logo"
                  width={80}
                  height={32}
                  className="h-6 sm:h-7 w-auto object-contain rounded-md transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span
                className="text-lg sm:text-2xl tracking-tight font-bold text-white"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Choloo<span style={{ color: "var(--accent)" }}>Pujoo</span>
              </span>
            </Link>

            {/* Unified Menu Button (Desktop & Mobile) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass bg-accent/10 hover:bg-accent/20 text-white border border-accent/40 shadow-[0_0_20px_rgba(255,77,61,0.25)] hover:shadow-[0_0_25px_rgba(255,77,61,0.4)] transition-all duration-300 text-xs sm:text-sm font-semibold cursor-pointer active:scale-95"
              aria-label="Toggle Menu Bar"
              id="unified-menu-button"
            >
              {menuOpen ? (
                <>
                  <X className="w-4 h-4 text-accent" />
                  <span>Close</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-accent" />
                  <span>Menu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Unified Navigation Drawer / Modal (Desktop & Mobile) */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-2xl flex flex-col justify-between pt-20 sm:pt-24 pb-8 px-4 sm:px-6 overflow-y-auto animate-fade-in">
          <div className="max-w-2xl w-full mx-auto space-y-6 my-auto">
            {/* Header info */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-[10px] sm:text-xs font-bold uppercase tracking-widest text-accent border border-accent/30">
                <Sparkles className="w-3 h-3 text-accent animate-pulse" />
                <span>Festival Navigation Bar</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-white"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Sharodutsav <span className="text-accent">Menu</span>
              </h2>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-start gap-3.5 p-4 rounded-2xl transition-all duration-200 glass border ${
                      isActive
                        ? "bg-accent/20 border-accent text-white shadow-[0_0_25px_rgba(255,77,61,0.3)] font-semibold"
                        : "bg-white/5 border-white/10 hover:border-accent/40 text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                        isActive
                          ? "bg-accent text-white border-accent shadow-md"
                          : "bg-accent/15 text-accent border-accent/30"
                      }`}
                    >
                      <link.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5 text-left">
                      <div className="text-sm font-bold text-white">{link.label}</div>
                      <div className="text-xs text-white/60">{link.subtitle}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Logout Action */}
            <div className="pt-2">
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl glass bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 border border-red-500/30 transition-all duration-200 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout Session</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}