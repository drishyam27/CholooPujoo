"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppContext } from "@/app/context/AppContext";
import Navbar from "@/components/Navbar";
import PandalCard from "@/components/PandalCard";
import { pandals } from "@/lib/mockData";
import { Bookmark, CheckCircle, Share2 } from "lucide-react";

export default function ItineraryPage() {
  const { isLoggedIn, bookmarkedIds, completedIds } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const bookmarkedPandals = pandals.filter((p) =>
    bookmarkedIds.includes(p.id)
  );
  const completedPandals = pandals.filter((p) =>
    completedIds.includes(p.id)
  );

  const handleShare = () => {
    const bookmarkNames = bookmarkedPandals.map((p) => p.name).join(", ");
    const completedNames = completedPandals.map((p) => p.name).join(", ");
    let text = "🪔 My CholooPujoo Itinerary\n\n";
    if (bookmarkNames) text += `📌 Want to Go: ${bookmarkNames}\n`;
    if (completedNames) text += `✅ Visited: ${completedNames}\n`;
    if (!bookmarkNames && !completedNames) text += "No pandals added yet!";

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-12 px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1
              className="text-3xl sm:text-4xl mb-1"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
              }}
            >
              My Itinerary
            </h1>
            <p className="text-sm opacity-50">
              Your personal festival planner
            </p>
          </div>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, #25D366, #128C7E)",
              color: "#fff",
            }}
            id="share-whatsapp"
          >
            <Share2 className="w-4 h-4" />
            Share on WhatsApp
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="glass rounded-2xl p-5 text-center">
            <Bookmark
              className="w-6 h-6 mx-auto mb-2"
              style={{ color: "var(--accent)" }}
            />
            <p
              className="text-3xl font-bold"
              style={{ color: "var(--accent)" }}
            >
              {bookmarkedPandals.length}
            </p>
            <p className="text-xs opacity-40 mt-1">Want to Go</p>
          </div>
          <div className="glass rounded-2xl p-5 text-center">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-400" />
            <p className="text-3xl font-bold text-green-400">
              {completedPandals.length}
            </p>
            <p className="text-xs opacity-40 mt-1">Visited</p>
          </div>
        </div>

        {/* Want to Go Section */}
        <section className="mb-10" id="want-to-go">
          <h2
            className="text-xl font-semibold mb-4 flex items-center gap-2"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            <Bookmark className="w-5 h-5" style={{ color: "var(--accent)" }} />
            Want to Go
          </h2>
          {bookmarkedPandals.length > 0 ? (
            <div className="space-y-4">
              {bookmarkedPandals.map((pandal) => (
                <PandalCard
                  key={pandal.id}
                  id={pandal.id}
                  name={pandal.name}
                  location={pandal.location}
                  crowdLevel={pandal.crowdLevel}
                  imageUrl={pandal.imageUrl}
                />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-8 text-center">
              <p className="opacity-40 text-sm">
                No pandals bookmarked yet. Explore categories and save your
                favourites!
              </p>
            </div>
          )}
        </section>

        {/* Completed Section */}
        <section id="completed">
          <h2
            className="text-xl font-semibold mb-4 flex items-center gap-2"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            <CheckCircle className="w-5 h-5 text-green-400" />
            Visited
          </h2>
          {completedPandals.length > 0 ? (
            <div className="space-y-4">
              {completedPandals.map((pandal) => (
                <PandalCard
                  key={pandal.id}
                  id={pandal.id}
                  name={pandal.name}
                  location={pandal.location}
                  crowdLevel={pandal.crowdLevel}
                  imageUrl={pandal.imageUrl}
                />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-8 text-center">
              <p className="opacity-40 text-sm">
                You haven&apos;t visited any pandals yet. Mark them as completed
                once you do!
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
