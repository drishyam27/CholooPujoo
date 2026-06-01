import React from "react";

export default function ProfileLoading() {
  return (
    <main className="pt-20 pb-12 px-4 sm:px-6 max-w-4xl mx-auto min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[128px] opacity-15 bg-accent" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-md px-4">
        {/* Glowing Ornate Alpana Mandala Motif */}
        <div className="relative">
          {/* Outer glowing halo */}
          <div className="absolute inset-0 w-28 h-28 bg-accent/20 rounded-full blur-xl animate-pulse -translate-x-2 -translate-y-2" />
          
          <svg
            className="w-24 h-24 text-accent animate-spin relative z-10"
            style={{ animationDuration: "10s", filter: "drop-shadow(0 0 20px rgba(255, 77, 61, 0.55))", color: "var(--accent)" }}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer dotted ring */}
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.4" />
            
            {/* 12 Traditional Alpana Petal Flourishes */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = i * 30;
              return (
                <path
                  key={i}
                  d="M50 50 C54 28 46 28 50 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  transform={`rotate(${angle} 50 50)`}
                  strokeLinecap="round"
                  opacity="0.85"
                />
              );
            })}
            
            {/* Mid circles */}
            <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
            
            {/* 8 Outer accent dots */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const x = 50 + 33 * Math.cos(angle);
              const y = 50 + 33 * Math.sin(angle);
              return <circle key={i} cx={x} cy={y} r="2.5" fill="currentColor" opacity="0.9" />;
            })}
            
            {/* Inner accent ring & flower */}
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = i * 60;
              return (
                <path
                  key={i}
                  d="M50 50 C52 42 48 42 50 36"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  transform={`rotate(${angle} 50 50)`}
                  strokeLinecap="round"
                />
              );
            })}
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
        </div>

        {/* Dynamic, warm traditional navigation blessing loader text */}
        <div className="space-y-2">
          <h2 
            className="text-xl sm:text-2xl font-bold tracking-wide animate-pulse"
            style={{ fontFamily: "var(--font-serif), serif", color: "var(--accent)" }}
          >
            Dugga-Dugga!
          </h2>
          <p className="text-sm opacity-60 font-medium">
            Preparing your Pujo Profile Dashboard...
          </p>
          <p className="text-xs opacity-35 max-w-xs mx-auto italic">
            Computing visited stats, global rank, and matching spelling-tolerant path coordinates...
          </p>
        </div>

        {/* Ambient background glass overlay strip */}
        <div className="glass px-6 py-2.5 rounded-full border-white/5 bg-white/5 text-[10px] tracking-widest uppercase font-bold text-accent/80 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" style={{ backgroundColor: "var(--accent)" }} />
          Loading Thakur Darshan Stats
        </div>
      </div>
    </main>
  );
}
