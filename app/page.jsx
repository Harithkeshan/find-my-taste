"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CategoryCard from "../components/CategoryCard";

/**
 * LANDING PAGE (/app/page.jsx)
 * 
 * Design Concept:
 * - Spotify Wrapped energy: Bold typography, neon accent glows, dark theme (#0a0a0a background), and high contrast.
 * - Dynamic moving gradient header.
 * - Dynamic tagline cycler that cross-fades every 2 seconds.
 * - Glowing 8-category responsive grid linking to the dynamic quiz routes.
 */
const taglines = [
  "What's your movie taste?",
  "What's your music taste?",
  "What's your food taste?"
];

export default function LandingPage() {

  const [taglineIndex, setTaglineIndex] = useState(0);
  const [taglineOpacity, setTaglineOpacity] = useState(1);

  // Dynamic Tagline Cycler
  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setTaglineOpacity(0);
      
      // Update text and fade back in after 400ms transition completes
      setTimeout(() => {
        setTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
        setTaglineOpacity(1);
      }, 400);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    { id: "movies", name: "Movies", description: "Uncover your cinematic style", icon: "🎬" },
    { id: "music", name: "Music", description: "Tune into your auditory profile", icon: "🎵" },
    { id: "food", name: "Food", description: "Discover your culinary persona", icon: "🍜" },
    { id: "books", name: "Books", description: "Reveal your reading preference", icon: "📚" },
    { id: "games", name: "Games", description: "Find your digital playstyle", icon: "🎮" },
    { id: "travel", name: "Travel", description: "Map your wanderlust vibe", icon: "✈️" },
    { id: "fashion", name: "Fashion", description: "Define your style statement", icon: "👗" },
    { id: "sports", name: "Sports", description: "Unlock your athletic mindset", icon: "⚽" }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Decorative gradient overlay blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#7f00ff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00f0ff]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto px-6 py-12 md:py-20 flex-grow flex flex-col justify-center space-y-12 md:space-y-16 z-10">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-6">
          <div className="inline-block px-3 py-1 rounded-full border border-neutral-800 bg-[#121212]/50 text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-2">
            AI-Powered Personality Analysis
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter select-none">
            Find My{" "}
            <span className="bg-gradient-to-r from-[#ff007f] via-[#7f00ff] to-[#00f0ff] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
              Taste
            </span>
          </h1>

          <p className="text-xl md:text-3xl font-extrabold text-neutral-300 max-w-3xl mx-auto leading-tight">
            Answer a few questions. Discover exactly who you are.
          </p>

          {/* Animated Fading Tagline */}
          <div className="h-8 flex items-center justify-center">
            <span 
              style={{ opacity: taglineOpacity }}
              className="text-indigo-400 font-semibold text-lg md:text-xl tracking-wide transition-opacity duration-300 ease-in-out"
            >
              {taglines[taglineIndex]}
            </span>
          </div>
        </section>

        {/* CATEGORY GRID */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
            <h2 className="text-xs uppercase tracking-widest text-neutral-500 font-bold">
              Select your category
            </h2>
            <span className="text-xs text-neutral-600">8 Curated Archetypes</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link href={`/quiz/${category.id}`} key={category.id} className="block outline-none">
                <CategoryCard category={category} />
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-neutral-900 bg-[#050505] py-8 z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-black tracking-tight">Find My Taste</span>
            <span className="text-neutral-700">|</span>
            <span className="text-xs text-neutral-500 font-medium">Identify Your Aesthetic Vibe</span>
          </div>
          <div className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Find My Taste. Made with Gemini API.
          </div>
        </div>
      </footer>
    </div>
  );
}
