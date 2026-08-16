"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/frontend/context/AppContext";
import { Eye, EyeOff, Flame, Sparkles, MapPin, Trophy, Bot, ArrowRight } from "lucide-react";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const { login, loginGuest, isLoggedIn } = useAppContext();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    loginGuest();
    router.push("/");
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    login();
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8 sm:py-12 bg-[#1F0F0D]">
      
      {/* Background Durga Puja Atmospheric Photo Layer */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Image
          src="/images/north-1.png"
          alt="Durga Puja Pandal Background"
          fill
          priority
          className="object-cover mix-blend-luminosity filter blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F0F0D]/90 via-[#1F0F0D]/80 to-[#1F0F0D]" />
      </div>

      {/* Ambient festival glowing light spots */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[140px] opacity-30"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-[140px] opacity-25"
          style={{ background: "#EAB308" }}
        />
        <div className="absolute top-10 right-1/3 w-64 h-64 rounded-full blur-[120px] opacity-20 bg-accent" />
      </div>

      {/* Main Responsive Grid Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        
        {/* Left Column: Visual Durga Puja Hero Poster Card (Visible on lg screens) */}
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-between glass rounded-3xl p-8 border border-accent/30 bg-[#1F0F0D]/75 backdrop-blur-2xl shadow-[0_20px_60px_rgba(255,77,61,0.2)] relative overflow-hidden group min-h-[580px]">
          
          {/* Background Card Artwork (Bonedi Bari Heritage Pandal) */}
          <div className="absolute inset-0 z-0 opacity-40 group-hover:scale-105 transition-transform duration-700 ease-out">
            <Image
              src="/images/bonedi-1.png"
              alt="Durga Puja Artwork"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F0F0D] via-[#1F0F0D]/70 to-[#1F0F0D]/40" />
          </div>

          {/* Top Poster Content */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-accent text-xs font-semibold uppercase tracking-widest text-accent border border-accent/40 shadow-[0_0_20px_rgba(255,77,61,0.25)]">
                <Flame className="w-3.5 h-3.5 text-accent animate-pulse" />
                <span>Sharodutsav 2026 Edition</span>
              </div>

              {/* Glowing Trinayana Emblem */}
              <div className="w-12 h-12 rounded-2xl glass-accent flex items-center justify-center p-1.5 border border-accent/40 shadow-[0_0_20px_rgba(255,77,61,0.3)]">
                <Image
                  src="/durga-eyes.jpg"
                  alt="Durga Eyes Emblem"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <h1
                className="text-5xl font-bold tracking-tight text-white leading-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Choloo<span style={{ color: "var(--accent)" }}>Pujoo</span>
              </h1>

              {/* Iconic Mahalaya Bengali Verse */}
              <p
                className="text-2xl sm:text-3xl font-bold leading-relaxed text-amber-200 tracking-wide drop-shadow-[0_4px_20px_rgba(255,77,61,0.6)]"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                &ldquo;আশ্বিনের শারদ প্রাতে বেজে উঠেছে আলোক মঞ্জীর, মা এসেছে ঘরে&rdquo;
              </p>
            </div>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-md pt-2">
              Explore 93 celebrated pandals across South Kolkata, North Kolkata & heritage Bonedi Bari with real-time crowd alerts and DDI Thakuma AI navigation.
            </p>
          </div>

          {/* Bottom Feature Badges Grid */}
          <div className="relative z-10 grid grid-cols-3 gap-2.5 pt-6 border-t border-white/10 mt-6">
            <div className="glass rounded-xl p-2.5 bg-white/5 border border-white/10 text-center hover:border-accent/30 transition-colors">
              <MapPin className="w-4 h-4 text-accent mx-auto mb-1" />
              <div className="text-[11px] font-bold text-white">93 Pandals</div>
              <div className="text-[9px] text-white/50">Full Map</div>
            </div>

            <div className="glass rounded-xl p-2.5 bg-white/5 border border-white/10 text-center hover:border-accent/30 transition-colors">
              <Bot className="w-4 h-4 text-accent mx-auto mb-1" />
              <div className="text-[11px] font-bold text-white">Thakuma AI</div>
              <div className="text-[9px] text-white/50">Live Companion</div>
            </div>

            <div className="glass rounded-xl p-2.5 bg-white/5 border border-white/10 text-center hover:border-accent/30 transition-colors">
              <Trophy className="w-4 h-4 text-accent mx-auto mb-1" />
              <div className="text-[11px] font-bold text-white">Leaderboard</div>
              <div className="text-[9px] text-white/50">Rankings</div>
            </div>
          </div>
        </div>

        {/* Right Column: Glass Login Card */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto flex items-center">
          <div className="glass rounded-3xl p-6 sm:p-8 md:p-10 border border-accent/20 bg-[#1F0F0D]/85 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.7)] text-left relative overflow-hidden w-full">
            
            {/* Top Glowing Ornament Accent */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent/20 blur-2xl pointer-events-none" />

            {/* Card Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 glass-accent overflow-hidden p-2 shadow-[0_0_20px_rgba(255,77,61,0.25)] border-accent/40">
                <Image
                  src="/durga-eyes.jpg"
                  alt="CholooPujoo Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              
              <h2
                className="text-2xl sm:text-3xl font-bold mb-1 tracking-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {isSignUp ? "Join " : "Welcome to "}
                <span style={{ color: "var(--accent)" }}>CholooPujoo</span>
              </h2>

              {/* Bengali Slogan badge for Mobile & Tablet viewports */}
              <p className="lg:hidden text-xs font-semibold text-amber-200/90 mt-1 mb-2 italic">
                &ldquo;আশ্বিনের শারদ প্রাতে বেজে উঠেছে আলোক মঞ্জীর, মা এসেছে ঘরে&rdquo;
              </p>

              <p className="text-xs text-white/60">
                {isSignUp 
                  ? "Create your account to save itineraries & track pandal visits" 
                  : "Your ultimate gateway to Kolkata Durga Puja 2026"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase tracking-wider text-white/60 mb-1.5 font-medium"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required={isSignUp}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-200 text-sm"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-wider text-white/60 mb-1.5 font-medium"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-200 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs uppercase tracking-wider text-white/60 mb-1.5 font-medium"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 pr-11 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-200 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-hover active:scale-[0.99] transition-all duration-200 shadow-[0_0_20px_rgba(255,77,61,0.35)] flex items-center justify-center gap-2 cursor-pointer border border-accent/40"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isSignUp ? "Create Account" : "Step into the Festivities"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="px-3 bg-[#1F0F0D] text-white/40 rounded-full font-medium">OR</span>
              </div>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer shadow-sm"
              id="google-login-btn"
            >
              {isGoogleLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* Toggle Sign Up / Sign In */}
            <div className="mt-6 text-center text-xs text-white/50">
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-accent font-semibold hover:underline cursor-pointer ml-0.5"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </div>

            <p className="text-[10px] text-center text-white/35 mt-4">
              Any credentials will work — this is a live demo <Sparkles className="inline w-3 h-3 text-accent" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
