"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppContext } from "@/frontend/context/AppContext";
import Navbar from "@/frontend/components/Navbar";
import PandalCard from "@/frontend/components/PandalCard";
import { pandals } from "@/frontend/lib/mockData";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const categoryMeta: Record<string, { title: string; subtitle: string }> = {
  "bonedi-bari": {
    title: "Bonedi Bari",
    subtitle: "Heritage Household Pujos",
  },
  "north-kolkata": {
    title: "North Kolkata",
    subtitle: "Traditional & Grand Pujos",
  },
  "south-kolkata": {
    title: "South Kolkata",
    subtitle: "Modern & Iconic Pujos",
  },
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { isLoggedIn } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const meta = categoryMeta[slug];
  const filteredPandals = pandals.filter((p) => p.category === slug);

  if (!meta) {
    return (
      <>
        <Navbar />
        <main className="pt-24 px-4 max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-accent text-sm font-medium transition-all hover:brightness-110"
            style={{ color: "var(--accent)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-12 px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm opacity-50 hover:opacity-80 transition-opacity mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>
          <h1
            className="text-3xl sm:text-4xl mb-1"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
            }}
          >
            {meta.title}
          </h1>
          <p className="text-sm opacity-50">{meta.subtitle}</p>
        </div>

        {/* Pandal List */}
        <div className="space-y-4">
          {filteredPandals.map((pandal) => (
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

        {filteredPandals.length === 0 && (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-lg opacity-40">
              No pandals listed in this category yet.
            </p>
          </div>
        )}
      </main>
    </>
  );
}
