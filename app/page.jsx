"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight 
} from "lucide-react";

const CATEGORIES = [
  { 
    id: "movies", 
    name: "Movies", 
    tagline: "Cinematic styles & auteur visions",
    image: "/categories/movies.jpg",
    theme: { 
      bg: "#fef3c7", // Sunny Golden Yellow
      accent: "#d97706", 
      orbPrimary: "rgba(245, 158, 11, 0.42)",
      orbSecondary: "rgba(234, 88, 12, 0.30)",
      orbBottom: "rgba(253, 224, 71, 0.45)"
    }
  },
  { 
    id: "music", 
    name: "Music", 
    tagline: "Sonic textures & auditory moods",
    image: "/categories/music.jpg",
    theme: { 
      bg: "#f3e8ff", // Vibrant Violet / Lavender
      accent: "#7c3aed", 
      orbPrimary: "rgba(168, 85, 247, 0.45)",
      orbSecondary: "rgba(129, 140, 248, 0.35)",
      orbBottom: "rgba(216, 180, 254, 0.45)"
    }
  },
  { 
    id: "food", 
    name: "Food", 
    tagline: "Culinary instincts & dining rituals",
    image: "/categories/food.jpg",
    theme: { 
      bg: "#ffedd5", // Warm Radiant Coral / Tangerine
      accent: "#ea580c", 
      orbPrimary: "rgba(249, 115, 22, 0.45)",
      orbSecondary: "rgba(244, 63, 94, 0.32)",
      orbBottom: "rgba(254, 215, 170, 0.45)"
    }
  },
  { 
    id: "books", 
    name: "Books", 
    tagline: "Literary depths & narrative voice",
    image: "/categories/books.jpg",
    theme: { 
      bg: "#dcfce7", // Botanical Emerald / Mint Green
      accent: "#059669", 
      orbPrimary: "rgba(16, 185, 129, 0.45)",
      orbSecondary: "rgba(5, 150, 105, 0.32)",
      orbBottom: "rgba(134, 239, 172, 0.45)"
    }
  },
  { 
    id: "games", 
    name: "Games", 
    tagline: "Digital loops & interactive playstyles",
    image: "/categories/games.jpg",
    theme: { 
      bg: "#e0f2fe", // Electric Sky Blue
      accent: "#0284c7", 
      orbPrimary: "rgba(14, 165, 233, 0.48)",
      orbSecondary: "rgba(59, 130, 246, 0.35)",
      orbBottom: "rgba(125, 211, 252, 0.45)"
    }
  },
  { 
    id: "travel", 
    name: "Travel", 
    tagline: "Cultural immersion & landscapes",
    image: "/categories/travel.jpg",
    theme: { 
      bg: "#ccfbf1", // Ocean Aqua / Turquoise
      accent: "#0891b2", 
      orbPrimary: "rgba(20, 184, 166, 0.45)",
      orbSecondary: "rgba(6, 182, 212, 0.35)",
      orbBottom: "rgba(94, 234, 212, 0.45)"
    }
  },
  { 
    id: "fashion", 
    name: "Fashion", 
    tagline: "Silhouettes & personal aesthetic",
    image: "/categories/fashion.jpg",
    theme: { 
      bg: "#ffe4e6", // Haute Couture Rose Pink
      accent: "#e11d48", 
      orbPrimary: "rgba(244, 63, 94, 0.45)",
      orbSecondary: "rgba(236, 72, 153, 0.35)",
      orbBottom: "rgba(251, 113, 133, 0.45)"
    }
  },
  { 
    id: "sports", 
    name: "Sports", 
    tagline: "Endurance, strategy & athletic mindset",
    image: "/categories/sports.jpg",
    theme: { 
      bg: "#fee2e2", // Dynamic Crimson / Scarlet Red
      accent: "#dc2626", 
      orbPrimary: "rgba(239, 68, 68, 0.46)",
      orbSecondary: "rgba(220, 38, 38, 0.35)",
      orbBottom: "rgba(252, 165, 165, 0.45)"
    }
  }
];

export default function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCategory = CATEGORIES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? CATEGORIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === CATEGORIES.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col justify-between text-neutral-900 transition-colors duration-700 ease-out relative overflow-hidden select-none font-sans"
      style={{ backgroundColor: activeCategory.theme.bg }}
    >
      {/* ------------------------------------------------------------- */}
      {/* LIVING AURORA MESH (Option 1) + ARCHITECTURAL DOT MATRIX (Option 2) */}
      {/* ------------------------------------------------------------- */}
      {/* Layer 1: Left Aurora Orb (Primary Category Aura, Breathing) */}
      <div 
        className="absolute -top-[12%] -left-[10%] w-[58vw] h-[58vw] max-w-[750px] max-h-[750px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ease-out animate-float-slow"
        style={{ backgroundColor: activeCategory.theme.orbPrimary }}
      />

      {/* Layer 2: Right Aurora Orb (Secondary Category Aura, Breathing) */}
      <div 
        className="absolute -top-[10%] -right-[10%] w-[52vw] h-[52vw] max-w-[700px] max-h-[700px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ease-out animate-float-reverse"
        style={{ backgroundColor: activeCategory.theme.orbSecondary }}
      />

      {/* Layer 3: Central-Bottom Grounding Glow */}
      <div 
        className="absolute -bottom-[15%] left-[15%] w-[70vw] h-[45vw] max-w-[900px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 ease-out"
        style={{ backgroundColor: activeCategory.theme.orbBottom }}
      />

      {/* Layer 4: Architectural Coordinate Micro-Dot Grid (Crisp & Visible) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.16) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* MINIMAL TOP BAR */}
      <header className="max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between z-20">
        <span className="font-display font-black text-2xl tracking-tight text-neutral-900">
          Find My Taste
        </span>
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
          Aesthetic Index
        </div>
      </header>

      {/* MAIN VIEWPORT (Clean, compact, no clutter) */}
      <main className="max-w-6xl w-full mx-auto px-6 flex-grow flex flex-col items-center justify-center text-center z-10 py-4">
        
        {/* Simple, Punchy Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-3">
            What&apos;s your taste?
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 font-normal max-w-xl mx-auto">
            Choose a category to discover your unique aesthetic archetype.
          </p>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* STRAIGHT HORIZONTAL CAROUSEL (Fully visible above the fold) */}
        {/* ----------------------------------------------------------- */}
        <section className="w-full relative flex flex-col items-center">
          
          {/* CARDS DISPLAY TRACK */}
          <div className="relative w-full h-[360px] sm:h-[380px] flex items-center justify-center overflow-visible">
            {CATEGORIES.map((cat, idx) => {
              let diff = idx - activeIndex;
              if (diff > CATEGORIES.length / 2) diff -= CATEGORIES.length;
              if (diff < -CATEGORIES.length / 2) diff += CATEGORIES.length;

              const isCenter = diff === 0;
              const isVisible = Math.abs(diff) <= 2;

              if (!isVisible) return null;

              const xOffset = diff * 280;
              const scale = isCenter ? 1.05 : 0.92;
              const opacity = isCenter ? 1 : Math.max(0.4, 0.85 - Math.abs(diff) * 0.25);
              const zIndex = 20 - Math.abs(diff);

              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveIndex(idx)}
                  className="absolute cursor-pointer transition-all duration-500 ease-out will-change-transform"
                  style={{
                    transform: `translate3d(${xOffset}px, 0px, 0px) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                >
                  <div 
                    className={`w-[240px] sm:w-[260px] h-[330px] sm:h-[350px] rounded-3xl p-5 sm:p-6 flex flex-col justify-between text-left transition-all duration-300 border
                      ${
                        isCenter
                          ? "bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] border-neutral-200/90 ring-1 ring-neutral-900/5"
                          : "bg-white/80 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border-neutral-200/50 hover:bg-white"
                      }
                    `}
                  >
                    {/* Top: Category Number & Active Indicator */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-400">
                        0{idx + 1}
                      </span>

                      {isCenter && (
                        <span className="w-2 h-2 rounded-full bg-neutral-900" />
                      )}
                    </div>

                    {/* 3D Toy Plastic Icon Centerpiece */}
                    <div className="my-auto py-1 flex items-center justify-center">
                      <div className={`relative transition-transform duration-500 ease-out ${isCenter ? "scale-105 -translate-y-1" : "scale-95 opacity-85"}`}>
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          width={160}
                          height={160}
                          className="w-32 h-32 sm:w-36 sm:h-36 object-contain mix-blend-multiply pointer-events-none select-none transition-transform duration-300"
                          priority={isCenter}
                        />
                      </div>
                    </div>

                    {/* Middle: Name & Tagline */}
                    <div>
                      <h3 className="font-display font-bold text-2xl text-neutral-900 leading-tight mb-1">
                        {cat.name}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-neutral-500 leading-relaxed line-clamp-2">
                        {cat.tagline}
                      </p>
                    </div>

                    {/* Bottom: Action Button */}
                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                      {isCenter ? (
                        <Link
                          href={`/quiz/${cat.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full flex items-center justify-between py-1 group/btn"
                        >
                          <span className="text-xs font-bold text-neutral-900 group-hover/btn:underline">
                            Start Quiz
                          </span>
                          <div className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-sm group-hover/btn:scale-105 transition-transform">
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </Link>
                      ) : (
                        <div className="w-full flex items-center justify-between py-1 text-neutral-400">
                          <span className="text-xs font-medium">Select</span>
                          <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center">
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Minimal Controls */}
          <div className="flex items-center gap-6 mt-6 z-20">
            <button
              onClick={handlePrev}
              aria-label="Previous category"
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200 text-neutral-700 flex items-center justify-center hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Clean Progress Pills */}
            <div className="flex items-center gap-1.5">
              {CATEGORIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to category ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex 
                      ? "w-7 bg-neutral-900" 
                      : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next category"
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200 text-neutral-700 flex items-center justify-center hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </section>

      </main>

      {/* MINIMAL FOOTER */}
      <footer className="w-full py-5 px-6 z-10 text-center text-xs text-neutral-400 font-medium">
        Find My Taste © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
