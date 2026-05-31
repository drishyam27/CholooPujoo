"use client";

import Image from "next/image";
import { useAppContext } from "@/app/context/AppContext";
import { Bookmark, CheckCircle, Navigation } from "lucide-react";
import type { CrowdLevel } from "@/lib/mockData";

interface PandalCardProps {
  id: string;
  name: string;
  location: string;
  crowdLevel: CrowdLevel;
  imageUrl: string;
}

const crowdConfig: Record<CrowdLevel, { color: string; bg: string; pulse: boolean }> = {
  Medium: { color: "#4ade80", bg: "rgba(74,222,128,0.15)", pulse: false },
  High: { color: "#facc15", bg: "rgba(250,204,21,0.15)", pulse: false },
  Extreme: { color: "#f87171", bg: "rgba(248,113,113,0.15)", pulse: true },
};

export default function PandalCard({
  id,
  name,
  location,
  crowdLevel,
  imageUrl,
}: PandalCardProps) {
  const { bookmarkedIds, toggleBookmark, completedIds, toggleCompleted } =
    useAppContext();

  const isBookmarked = bookmarkedIds.includes(id);
  const isCompleted = completedIds.includes(id);
  const crowd = crowdConfig[crowdLevel];

  return (
    <div
      className="glass rounded-2xl overflow-hidden group transition-all duration-300 hover:border-accent/30"
      id={`pandal-${id}`}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-40 h-48 sm:h-auto flex-shrink-0">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, 160px"
            className="object-cover"
          />
          {isCompleted && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between gap-3">
          <div>
            <h3
              className="text-lg font-semibold mb-1 leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {name}
            </h3>
            <p className="text-sm opacity-50">{location}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3">
            {/* Crowd indicator */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: crowd.bg, color: crowd.color }}
            >
              <span
                className={`w-2 h-2 rounded-full ${crowd.pulse ? "animate-pulse" : ""}`}
                style={{ background: crowd.color }}
              />
              {crowdLevel} Crowd
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => toggleBookmark(id)}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isBookmarked
                    ? "bg-accent/20 text-accent"
                    : "hover:bg-white/10 text-white/50 hover:text-white"
                }`}
                style={isBookmarked ? { color: "var(--accent)" } : {}}
                title={isBookmarked ? "Remove bookmark" : "Bookmark"}
                id={`bookmark-${id}`}
              >
                <Bookmark
                  className="w-4 h-4"
                  fill={isBookmarked ? "currentColor" : "none"}
                />
              </button>

              <button
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/${encodeURIComponent(name + " Kolkata")}`,
                    "_blank"
                  )
                }
                className="p-2 rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-all duration-200"
                title="Get Directions"
                id={`directions-${id}`}
              >
                <Navigation className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleCompleted(id)}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isCompleted
                    ? "bg-green-500/20 text-green-400"
                    : "hover:bg-white/10 text-white/50 hover:text-white"
                }`}
                title={isCompleted ? "Mark as not visited" : "Mark as visited"}
                id={`complete-${id}`}
              >
                <CheckCircle
                  className="w-4 h-4"
                  fill={isCompleted ? "currentColor" : "none"}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
