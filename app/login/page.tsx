"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context/AppContext";
import { Flame, Eye, EyeOff } from "lucide-react";

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
  const { login, isLoggedIn } = useAppContext();
  
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
    // Simulate auth delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    login();
    router.push("/");
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    // Simulate auth delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    login();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[128px] opacity-20"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-[128px] opacity-10"
          style={{ background: "var(--accent)" }}
        />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="glass rounded-3xl p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 glass-accent overflow-hidden p-2 shadow-[0_0_15px_rgba(255,77,61,0.15)] border-accent/30">
              <Image
                src="/durga-eyes.jpg"
                alt="CholooPujoo Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <h1
              className="text-3xl mb-1"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
              }}
            >
              {isSignUp ? "Join " : "Welcome to "}
              <span style={{ color: "var(--accent)" }}>CholooPujoo</span>
            </h1>
            <p className="text-sm opacity-50">
              {isSignUp 
                ? "Create an account to save your itinerary" 
                : "Your gateway to the Durga Puja experience"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs uppercase tracking-wider opacity-50 mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required={isSignUp}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-all duration-200 text-sm"
                  style={{ "--tw-ring-color": "rgba(255,77,61,0.25)" } as React.CSSProperties}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-xs uppercase tracking-wider opacity-50 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-all duration-200 text-sm"
                style={{ "--tw-ring-color": "rgba(255,77,61,0.25)" } as React.CSSProperties}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs uppercase tracking-wider opacity-50 mb-2"
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
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-all duration-200 text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
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
              disabled={isLoading || isGoogleLoading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-hover))",
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isSignUp ? "Creating account..." : "Entering the festivities..."}
                </span>
              ) : (
                isSignUp ? "Join the Festivities" : "Step into the Festivities"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="px-4 text-xs opacity-40 uppercase tracking-wider">Or</span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading || isGoogleLoading}
            className="w-full py-3 px-4 rounded-xl font-medium text-sm text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            Continue with Google
          </button>

          {/* Toggle Sign Up / Sign In */}
          <div className="mt-8 text-center">
            <p className="text-sm opacity-60">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-semibold text-white hover:underline decoration-accent underline-offset-4 transition-all"
                style={{ color: "var(--accent)" }}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs opacity-30 mt-6">
            Any credentials will work — this is a demo ✨
          </p>
        </div>
      </div>
    </div>
  );
}

