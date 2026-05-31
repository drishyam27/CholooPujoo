"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/frontend/context/AppContext";
import { Flame, Map, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { logout } = useAppContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Explore", icon: Flame },
    { href: "/itinerary", label: "My Itinerary", icon: Map },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass" id="main-navbar">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center rounded-xl glass-accent p-1.5 shadow-[0_0_15px_rgba(255,77,61,0.15)] group-hover:shadow-[0_0_20px_rgba(255,77,61,0.3)] transition-all duration-300 border-accent/30">
              <Image
                src="/durga-eyes.jpg"
                alt="CholooPujoo Logo"
                width={80}
                height={32}
                className="h-7 w-auto object-contain rounded-md transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span
              className="text-xl tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
            >
              Choloo<span style={{ color: "var(--accent)" }}>Pujoo</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                      ? "bg-accent/20 text-accent"
                      : "text-foreground/70 hover:text-foreground hover:bg-white/5"
                    }`}
                  style={isActive ? { color: "var(--accent)" } : {}}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-foreground/70 hover:text-red-400 hover:bg-white/5 transition-all duration-200 ml-2"
              id="logout-button"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-white/10 animate-in fade-in slide-in-from-top-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                      ? "bg-accent/20"
                      : "text-foreground/70 hover:text-foreground hover:bg-white/5"
                    }`}
                  style={isActive ? { color: "var(--accent)" } : {}}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={() => {
                logout();
                setMobileOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground/70 hover:text-red-400 hover:bg-white/5 transition-all duration-200 w-full"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}