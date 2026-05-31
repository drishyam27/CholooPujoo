"use client";

import { useAppContext } from "@/app/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import CategoryCard from "@/components/CategoryCard";
import { pandals } from "@/lib/mockData";
import { Flame } from "lucide-react";

export default function HomePage() {
  const { isLoggedIn } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const categories = [
    {
      title: "Bonedi Bari",
      subtitle: "Heritage Households",
      slug: "bonedi-bari",
      imageUrl: "/images/bonedi-1.png",
    },
    {
      title: "North Kolkata",
      subtitle: "Traditional & Grand",
      slug: "north-kolkata",
      imageUrl: "/images/north-1.png",
    },
    {
      title: "South Kolkata",
      subtitle: "Modern & Iconic",
      slug: "south-kolkata",
      imageUrl: "/images/south-1.png",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-12 px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-accent text-xs uppercase tracking-widest mb-6">
            <Flame className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
            <span style={{ color: "var(--accent)" }}>Puja Season 2025</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl mb-4 leading-tight"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
            }}
          >
            Discover the Spirit of{" "}
            <span
              style={{
                color: "var(--accent)",
                textShadow: "0 0 60px rgba(255,77,61,0.3)",
              }}
            >
              Durga Puja
            </span>
          </h1>
          <p className="text-base sm:text-lg opacity-50 max-w-xl mx-auto">
            Navigate Kolkata&apos;s most celebrated pandals. From heritage households to
            modern marvels — your festival companion awaits.
          </p>
        </section>

        {/* Category Grid */}
        <section id="categories">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.slug}
                title={cat.title}
                subtitle={cat.subtitle}
                slug={cat.slug}
                imageUrl={cat.imageUrl}
                pandalCount={
                  pandals.filter((p) => p.category === cat.slug).length
                }
              />
            ))}
          </div>
        </section>

        {/* Stats Strip */}
        <section className="mt-12 sm:mt-16 glass rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                {pandals.length}
              </p>
              <p className="text-xs sm:text-sm opacity-40 mt-1">Pandals Listed</p>
            </div>
            <div>
              <p
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                3
              </p>
              <p className="text-xs sm:text-sm opacity-40 mt-1">Zones to Explore</p>
            </div>
            <div>
              <p
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                Live
              </p>
              <p className="text-xs sm:text-sm opacity-40 mt-1">Crowd Updates</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
