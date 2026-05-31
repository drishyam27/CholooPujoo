"use client";

import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  subtitle: string;
  slug: string;
  imageUrl: string;
  pandalCount: number;
}

export default function CategoryCard({
  title,
  subtitle,
  slug,
  imageUrl,
  pandalCount,
}: CategoryCardProps) {
  return (
    <Link href={`/category/${slug}`} className="block group" id={`category-${slug}`}>
      <div className="relative overflow-hidden rounded-2xl aspect-[4/5] sm:aspect-[3/4]">
        {/* Background Image */}
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Accent glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(to top, rgba(255,77,61,0.15), transparent 60%)",
          }}
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <p
            className="text-xs uppercase tracking-[0.2em] mb-2 opacity-70"
            style={{ color: "var(--accent)" }}
          >
            {subtitle}
          </p>
          <h3
            className="text-2xl sm:text-3xl mb-2 leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
          >
            {title}
          </h3>
          <div className="flex items-center gap-2 text-sm opacity-60">
            <span>{pandalCount} pandals</span>
            <span className="inline-block w-4 h-[1px] bg-white/40" />
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              Explore →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
