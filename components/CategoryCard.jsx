import React from "react";

/**
 * CATEGORY CARD COMPONENT (/components/CategoryCard.jsx)
 * 
 * Purpose:
 * - A UI component representing a selectable taste quiz category (e.g. food, movies, books, music).
 * - Receives a `category` object prop containing: `{ id, name, description, icon }`.
 * - Renders a visually pleasing, hover-interactive card that points to a specific quiz path.
 * 
 * Styling & Aesthetics:
 * - Minimalist Tailwind classes defining structure, gradients, and micro-transitions on hover.
 */
export default function CategoryCard({ category }) {
  const { id, name, description, icon } = category;

  // Specific glow color classes mapped to each category ID
  const glowStyles = {
    movies: "hover:shadow-[0_0_30px_rgba(244,63,94,0.25)] hover:border-rose-500/40",
    music: "hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] hover:border-purple-500/40",
    food: "hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:border-amber-500/40",
    books: "hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] hover:border-emerald-500/40",
    games: "hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] hover:border-cyan-500/40",
    travel: "hover:shadow-[0_0_30px_rgba(14,165,233,0.25)] hover:border-sky-500/40",
    fashion: "hover:shadow-[0_0_30px_rgba(236,72,153,0.25)] hover:border-pink-500/40",
    sports: "hover:shadow-[0_0_30px_rgba(132,204,22,0.25)] hover:border-lime-500/40",
  };

  const currentGlowClass = glowStyles[id] || "hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] hover:border-indigo-500/40";

  return (
    <div className={`group relative p-6 rounded-2xl border border-neutral-800 bg-[#121212] transition-all duration-300 hover:-translate-y-2 cursor-pointer ${currentGlowClass}`}>
      <div className="flex flex-col items-start space-y-4">
        {/* Large Category Icon */}
        <span className="text-5xl group-hover:scale-110 transition-transform duration-300" role="img" aria-label={name}>
          {icon}
        </span>
        {/* Category Info */}
        <div className="text-left w-full">
          <h3 className="text-lg md:text-xl font-bold text-white transition-colors duration-200">
            {name}
          </h3>
          <p className="text-xs md:text-sm text-neutral-400 mt-1 font-normal line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Decorative arrow showing clickability */}
      <span className="absolute right-6 bottom-6 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
        →
      </span>
    </div>
  );
}
