"use client";

import { useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/app/context/AppContext";
import { Bookmark, CheckCircle, Navigation, X } from "lucide-react";
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
  High: { color: "#f87171", bg: "rgba(248,113,113,0.15)", pulse: true }, // Changed from yellow to red as requested
  Extreme: { color: "#f87171", bg: "rgba(248,113,113,0.15)", pulse: true },
};

export default function PandalCard({
  id,
  name,
  location,
  crowdLevel: initialCrowdLevel,
  imageUrl,
}: PandalCardProps) {
  const { bookmarkedIds, toggleBookmark, completedIds, toggleCompleted } =
    useAppContext();

  const [currentCrowdLevel, setCurrentCrowdLevel] = useState<CrowdLevel>(initialCrowdLevel);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const isBookmarked = bookmarkedIds.includes(id);
  const isCompleted = completedIds.includes(id);
  const crowd = crowdConfig[currentCrowdLevel];

  const handleReportCrowd = () => {
    setCurrentCrowdLevel((prev) => (prev === "Medium" ? "High" : "Medium"));
  };

  return (
    <>
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
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
                style={{ background: crowd.bg, color: crowd.color }}
              >
                <span
                  className={`w-2 h-2 rounded-full ${crowd.pulse ? "animate-pulse" : ""}`}
                  style={{ background: crowd.color }}
                />
                {currentCrowdLevel} Crowd
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReportCrowd}
                  className="px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5 text-[11px] font-medium text-white/60 hover:text-accent hover:bg-accent/10 hover:border-accent/20 transition-all duration-200 cursor-pointer"
                  title="Toggle crowd status to simulate reporting"
                >
                  Report Crowd
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleBookmark(id)}
                    className={`p-2 rounded-xl transition-all duration-200 cursor-pointer ${
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
                    onClick={() => setIsMapOpen(true)}
                    className="p-2 rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-all duration-200 cursor-pointer"
                    title="View Map"
                    id={`directions-${id}`}
                  >
                    <Navigation className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => toggleCompleted(id)}
                    className={`p-2 rounded-xl transition-all duration-200 cursor-pointer ${
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
      </div>

      {/* Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-all duration-300">
          {/* Modal Container */}
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[rgba(255,77,61,0.2)] bg-[#1A0F0D] p-6 shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h4
                className="text-lg font-semibold text-white"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Pandal Route Map: {name}
              </h4>
              <button
                onClick={() => setIsMapOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Map Placeholder Body */}
            <div className="h-60 rounded-xl bg-white/5 border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-6 gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
              <p className="text-sm font-medium text-white/70">Interactive Map Loading...</p>
              <p className="text-xs text-white/40">Integrating Leaflet / Mapbox soon for real-time navigation</p>
            </div>

            {/* Footer / Info */}
            <div className="mt-4 flex items-center justify-between text-xs text-white/50">
              <span>Location: {location}</span>
              <button
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/search/${encodeURIComponent(name + " Kolkata")}`,
                    "_blank"
                  );
                }}
                className="text-accent hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                Open in Google Maps
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
