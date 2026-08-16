"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/frontend/context/AppContext";
import { Flame, Map, LogOut, Menu, X, Trophy, User, MessageSquare, Calendar } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { logout } = useAppContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Explore", icon: Flame },
    { href: "/calendar", label: "Ponjika", icon: Calendar },
    { href: "/itinerary", label: "My Itinerary", icon: Map },
    { href: "/ddi", label: "DDI Chat", icon: MessageSquare },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
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
              className="text-lg sm:text-xl tracking-tight font-bold"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Choloo<span style={{ color: "var(--accent)" }}>Pujoo</span>
            </span>
          </Link>

          {/* Desktop Navigation Links (Visible on lg >= 1024px to prevent tablet wrapping) */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-accent/20 text-accent border border-accent/30 shadow-[0_0_15px_rgba(255,77,61,0.2)]"
                      : "text-foreground/75 hover:text-foreground hover:bg-white/5 border border-transparent"
                  }`}
                  style={isActive ? { color: "var(--accent)" } : {}}
                >
                  <link.icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-foreground/75 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200 ml-1 cursor-pointer"
              id="logout-button"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile & Tablet Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 hover:border-accent/30 text-white/80 hover:text-white transition-colors cursor-pointer"
            id="mobile-menu-toggle"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile & Tablet Drawer Menu */}
        {mobileOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 bg-[#1F0F0D]/95 backdrop-blur-2xl px-2 space-y-1 animate-in fade-in slide-in-from-top-2 rounded-b-2xl shadow-2xl">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-accent/20 text-accent border border-accent/30 shadow-[0_0_15px_rgba(255,77,61,0.2)] font-semibold"
                      : "text-foreground/80 hover:text-foreground hover:bg-white/5 border border-transparent"
                  }`}
                  style={isActive ? { color: "var(--accent)" } : {}}
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <button
              onClick={() => {
                logout();
                setMobileOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400/90 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full text-left mt-2 border border-red-500/20"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}