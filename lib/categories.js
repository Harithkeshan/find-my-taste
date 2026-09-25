export const CATEGORIES = [
  { 
    id: "movies", 
    name: "Movies", 
    tagline: "Cinematic styles & auteur visions",
    image: "/categories/movies.jpg",
    theme: { 
      bg: "#fef3c7", // Sunny Golden Yellow
      accent: "#d97706", 
      accentHover: "#b45309",
      accentLight: "#fef9c3",
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
      accentHover: "#6d28d9",
      accentLight: "#f5f3ff",
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
      accentHover: "#c2410c",
      accentLight: "#fff7ed",
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
      accentHover: "#047857",
      accentLight: "#f0fdf4",
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
      accentHover: "#0369a1",
      accentLight: "#f0f9ff",
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
      bg: "#ccfbf1", // Ocean Aqua / Teal
      accent: "#0891b2", 
      accentHover: "#0e7490",
      accentLight: "#f0fdfa",
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
      accentHover: "#be123c",
      accentLight: "#fff1f2",
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
      accentHover: "#b91c1c",
      accentLight: "#fef2f2",
      orbPrimary: "rgba(239, 68, 68, 0.46)",
      orbSecondary: "rgba(220, 38, 38, 0.35)",
      orbBottom: "rgba(252, 165, 165, 0.45)"
    }
  }
];

export function getCategoryById(id) {
  if (!id) return CATEGORIES[0];
  const found = CATEGORIES.find(c => c.id.toLowerCase() === id.toLowerCase());
  return found || CATEGORIES[0];
}
