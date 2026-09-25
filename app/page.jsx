"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Film, 
  Headphones, 
  UtensilsCrossed, 
  BookOpen, 
  Gamepad2, 
  Compass, 
  Sparkles, 
  Trophy, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight 
} from "lucide-react";

const CATEGORIES = [
  { 
    id: "movies", 
    name: "Cinema & Movies", 
    tagline: "Uncover your cinematic aesthetic", 
    description: "From moody indie auteur films to psychological thrillers and blockbusters.",
    icon: Film,
    theme: { 
      bg: "#fdf6f0", 
      accent: "#c2410c", 
      pillBg: "bg-orange-100", 
      pillText: "text-orange-800",
      buttonBg: "bg-orange-600 hover:bg-orange-700",
      glow: "rgba(194, 65, 12, 0.15)"
    }
  },
  { 
    id: "music", 
    name: "Sound & Music", 
    tagline: "Tune into your auditory profile", 
    description: "Explore the sonic textures, rhythms, and poetic themes that move you.",
    icon: Headphones,
    theme: { 
      bg: "#f7f5ff", 
      accent: "#7c3aed", 
      pillBg: "bg-purple-100", 
      pillText: "text-purple-800",
      buttonBg: "bg-purple-600 hover:bg-purple-700",
      glow: "rgba(124, 58, 237, 0.15)"
    }
  },
  { 
    id: "food", 
    name: "Culinary & Dining", 
    tagline: "Discover your culinary persona", 
    description: "Flavor profiles, dining atmospheres, comfort textures, and taste instincts.",
    icon: UtensilsCrossed,
    theme: { 
      bg: "#fff8ee", 
      accent: "#d97706", 
      pillBg: "bg-amber-100", 
      pillText: "text-amber-800",
      buttonBg: "bg-amber-600 hover:bg-amber-700",
      glow: "rgba(217, 119, 6, 0.15)"
    }
  },
  { 
    id: "books", 
    name: "Literature & Books", 
    tagline: "Reveal your reading perspective", 
    description: "World-building, complex characters, philosophical depth, and poetic prose.",
    icon: BookOpen,
    theme: { 
      bg: "#f2f8f4", 
      accent: "#059669", 
      pillBg: "bg-emerald-100", 
      pillText: "text-emerald-800",
      buttonBg: "bg-emerald-600 hover:bg-emerald-700",
      glow: "rgba(5, 150, 105, 0.15)"
    }
  },
  { 
    id: "games", 
    name: "Gaming & Playstyles", 
    tagline: "Find your digital mindset", 
    description: "Strategic loops, rich interactive storytelling, competition, and cozy sims.",
    icon: Gamepad2,
    theme: { 
      bg: "#f0f8ff", 
      accent: "#0284c7", 
      pillBg: "bg-sky-100", 
      pillText: "text-sky-800",
      buttonBg: "bg-sky-600 hover:bg-sky-700",
      glow: "rgba(2, 132, 199, 0.15)"
    }
  },
  { 
    id: "travel", 
    name: "Travel & Wanderlust", 
    tagline: "Map your exploration vibe", 
    description: "Spontaneous wandering, secluded coasts, historic villages, and local culture.",
    icon: Compass,
    theme: { 
      bg: "#edf9fa", 
      accent: "#0891b2", 
      pillBg: "bg-cyan-100", 
      pillText: "text-cyan-800",
      buttonBg: "bg-cyan-600 hover:bg-cyan-700",
      glow: "rgba(8, 145, 178, 0.15)"
    }
  },
  { 
    id: "fashion", 
    name: "Style & Fashion", 
    tagline: "Define your aesthetic statement", 
    description: "Silhouettes, vintage staples, tailored neutrals, and expressive confidence.",
    icon: Sparkles,
    theme: { 
      bg: "#fff2f5", 
      accent: "#e11d48", 
      pillBg: "bg-rose-100", 
      pillText: "text-rose-800",
      buttonBg: "bg-rose-600 hover:bg-rose-700",
      glow: "rgba(225, 29, 72, 0.15)"
    }
  },
  { 
    id: "sports", 
    name: "Athletics & Sport", 
    tagline: "Unlock your athletic mindset", 
    description: "High-octane competition, tactical endurance, outdoor adventure, and flow state.",
    icon: Trophy,
    theme: { 
      bg: "#f5faee", 
      accent: "#65a30d", 
      pillBg: "bg-lime-100", 
      pillText: "text-lime-800",
      buttonBg: "bg-lime-600 hover:bg-lime-700",
      glow: "rgba(101, 163, 13, 0.15)"
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

  // Keyboard navigation for desktop accessibility
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
      className="min-h-screen flex flex-col justify-between text-neutral-900 transition-colors duration-700 ease-out relative overflow-hidden select-none"
      style={{ backgroundColor: activeCategory.theme.bg }}
    >
      {/* Ambient Cloud Gradients */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[160px] pointer-events-none transition-colors duration-700" 
        style={{ backgroundColor: activeCategory.theme.glow }}
      />
      <div 
        className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[160px] pointer-events-none transition-colors duration-700" 
        style={{ backgroundColor: activeCategory.theme.glow }}
      />

      {/* TOP NAVIGATION BAR */}
      <header className="max-w-7xl w-full mx-auto px-6 py-6 md:py-8 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <span className="font-display font-black text-2xl tracking-tight text-neutral-900">
            Find My Taste
          </span>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-neutral-900/5 text-neutral-600 border border-neutral-900/10">
            Index
          </span>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <span className="text-neutral-900 cursor-pointer">Categories</span>
          <a href="#how-it-works" className="hover:text-neutral-900 transition-colors">How It Works</a>
          <a href="#about" className="hover:text-neutral-900 transition-colors">About</a>
        </nav>

        {/* Right CTA Button */}
        <div>
          <Link
            href={`/quiz/${activeCategory.id}`}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-neutral-950 text-white text-sm font-medium hover:bg-neutral-800 transition-all duration-200 shadow-sm active:scale-95"
          >
            Start Quiz
          </Link>
        </div>
      </header>

      {/* MAIN HERO CONTENT */}
      <main className="max-w-6xl w-full mx-auto px-6 pt-4 pb-12 flex-grow flex flex-col items-center justify-center text-center z-10">
        
        {/* Subtle Pill Tag */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="text-xs font-semibold tracking-widest uppercase text-neutral-500">
            ( A BETTER WAY TO DISCOVER YOURSELF )
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-neutral-900 tracking-tight leading-[1.08] max-w-4xl mx-auto mb-6">
          Feel clearer in your taste. <br className="hidden sm:block" />
          Confident in your mind.
        </h1>

        {/* Supporting Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-neutral-600 font-normal max-w-2xl mx-auto leading-relaxed mb-10">
          Personalized aesthetic guidance to help you articulate your unique preferences, understand your instincts, and curate your world.
        </p>

        {/* Hero Pill Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <Link
            href={`/quiz/${activeCategory.id}`}
            className="px-7 py-3 rounded-full bg-neutral-950 text-white text-sm font-medium hover:bg-neutral-800 transition-all duration-200 shadow-md active:scale-95 flex items-center gap-2"
          >
            Explore {activeCategory.name.split(" ")[0]}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#how-it-works"
            className="px-7 py-3 rounded-full bg-white/70 backdrop-blur-md border border-neutral-300 text-neutral-800 text-sm font-medium hover:bg-white transition-all duration-200 shadow-sm active:scale-95"
          >
            How It Works
          </a>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* HORIZONTAL LINEAR SLIDER (Flat, perfectly legible)          */}
        {/* ----------------------------------------------------------- */}
        <section className="w-full relative py-4 flex flex-col items-center">
          
          {/* CARDS DISPLAY CONTAINER */}
          <div className="relative w-full h-[360px] sm:h-[390px] flex items-center justify-center overflow-visible">
            {CATEGORIES.map((cat, idx) => {
              // Calculate distance from center
              let diff = idx - activeIndex;
              // Wrap around for seamless infinite loop feel
              if (diff > CATEGORIES.length / 2) diff -= CATEGORIES.length;
              if (diff < -CATEGORIES.length / 2) diff += CATEGORIES.length;

              const isCenter = diff === 0;
              const isVisible = Math.abs(diff) <= 2; // Show center and 2 neighbors on each side

              if (!isVisible) return null;

              // Straight Horizontal Math:
              // Zero tilt, zero arch dip — pure horizontal offset with depth scaling
              const xOffset = diff * 265;
              const scale = isCenter ? 1.05 : 0.92;
              const opacity = isCenter ? 1 : Math.max(0.45, 0.85 - Math.abs(diff) * 0.22);
              const zIndex = 20 - Math.abs(diff);

              const Icon = cat.icon;

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
                    className={`w-[230px] sm:w-[260px] h-[300px] sm:h-[330px] rounded-3xl p-6 sm:p-7 flex flex-col justify-between text-left transition-all duration-300 border
                      ${
                        isCenter
                          ? "bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.14)] border-neutral-200/90 ring-1 ring-neutral-900/10"
                          : "bg-white/85 backdrop-blur-md shadow-[0_15px_35px_-10px_rgba(0,0,0,0.06)] border-neutral-200/50 hover:bg-white"
                      }
                    `}
                  >
                    {/* Card Top: Vector Icon */}
                    <div className="flex items-center justify-between">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300"
                        style={{ 
                          backgroundColor: isCenter ? cat.theme.bg : "#f5f5f7",
                          color: isCenter ? cat.theme.accent : "#737373"
                        }}
                      >
                        <Icon className="w-6 h-6" strokeWidth={1.8} />
                      </div>

                      {isCenter && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-900 text-white">
                          Active
                        </span>
                      )}
                    </div>

                    {/* Card Middle: Content */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                        Category {idx + 1}
                      </span>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-neutral-900 leading-tight">
                        {cat.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>
                    </div>

                    {/* Card Bottom: Action CTA */}
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

          {/* ----------------------------------------------------------- */}
          {/* HORIZONTAL ANALOG RULER TICK MARKS                          */}
          {/* ----------------------------------------------------------- */}
          <div className="w-full max-w-md mx-auto flex items-center justify-center gap-1.5 py-3 pointer-events-none select-none opacity-45">
            {Array.from({ length: 31 }).map((_, i) => (
              <div 
                key={i} 
                className={`rounded-full transition-all duration-300 ${
                  i === 15 
                    ? "h-4 w-[2px] bg-neutral-900" 
                    : i % 5 === 0 
                      ? "h-3 w-[1.5px] bg-neutral-700" 
                      : "h-1.5 w-[1px] bg-neutral-400"
                }`}
              />
            ))}
          </div>

          {/* DIAL CONTROLS (Arrows & Indicator dots) */}
          <div className="flex items-center gap-6 mt-4 z-20">
            <button
              onClick={handlePrev}
              aria-label="Previous category"
              className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-md border border-neutral-300/80 text-neutral-700 flex items-center justify-center hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Category Indicator Pills */}
            <div className="flex items-center gap-1.5">
              {CATEGORIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to category ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex 
                      ? "w-8 bg-neutral-900" 
                      : "w-2 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next category"
              className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-md border border-neutral-300/80 text-neutral-700 flex items-center justify-center hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-neutral-200/60 py-6 px-6 z-10 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-medium">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-neutral-800 text-sm">Find My Taste</span>
            <span>•</span>
            <span>The Personal Aesthetic Index</span>
          </div>
          <div>
            © {new Date().getFullYear()} Find My Taste. Clean editorial design.
          </div>
        </div>
      </footer>
    </div>
  );
}
