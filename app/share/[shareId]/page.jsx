"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowRight, ChevronLeft } from "lucide-react";
import TasteCard from "../../../components/TasteCard";
import { supabase } from "../../../lib/supabaseClient";
import { getCategoryById } from "../../../lib/categories";

export default function PublicSharePage() {
  const { shareId } = useParams();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (shareId) {
      fetchPublicProfile();
    }
  }, [shareId]);

  const fetchPublicProfile = async () => {
    setIsLoading(true);
    try {
      // 1. Try local storage cache
      if (typeof window !== "undefined") {
        const local = localStorage.getItem(`taste_profile_${shareId}`);
        if (local) {
          try {
            setProfile(JSON.parse(local));
            setIsLoading(false);
            return;
          } catch (e) {}
        }
      }

      // 2. Fetch from Supabase
      const { data, error } = await supabase
        .from("profiles")
        .select("profile_data")
        .eq("share_id", shareId)
        .single();

      if (error || !data) {
        console.error("Failed to load public profile from Supabase:", error);
      } else {
        setProfile(data.profile_data);
      }
    } catch (error) {
      console.error("Failed to load public profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentCategory = getCategoryById(profile?.category);
  const theme = currentCategory.theme;

  const BackgroundMesh = () => (
    <>
      <div 
        className="absolute -top-[12%] -left-[10%] w-[58vw] h-[58vw] max-w-[750px] max-h-[750px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ease-out animate-float-slow"
        style={{ backgroundColor: theme.orbPrimary }}
      />
      <div 
        className="absolute -top-[10%] -right-[10%] w-[52vw] h-[52vw] max-w-[700px] max-h-[700px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ease-out animate-float-reverse"
        style={{ backgroundColor: theme.orbSecondary }}
      />
      <div 
        className="absolute -bottom-[15%] left-[15%] w-[70vw] h-[45vw] max-w-[900px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 ease-out"
        style={{ backgroundColor: theme.orbBottom }}
      />
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.16) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
    </>
  );

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden text-neutral-900 select-none font-sans"
        style={{ backgroundColor: theme.bg }}
      >
        <BackgroundMesh />
        <div className="relative z-10 max-w-sm w-full bg-white/95 border border-neutral-200/90 rounded-3xl p-8 text-center shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <div className="relative mb-4 mx-auto w-12 h-12 flex items-center justify-center">
            <div 
              className="w-12 h-12 border-3 rounded-full animate-spin"
              style={{ borderColor: `${theme.accent}26`, borderTopColor: theme.accent }}
            />
          </div>
          <p className="text-sm font-semibold text-neutral-700">Loading shared taste profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden text-neutral-900 select-none font-sans"
        style={{ backgroundColor: theme.bg }}
      >
        <BackgroundMesh />
        <div className="relative z-10 max-w-md w-full bg-white/95 border border-neutral-200/90 rounded-3xl p-8 sm:p-10 text-center shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <h1 className="text-2xl font-display font-extrabold text-neutral-900 mb-2">Profile Not Found</h1>
          <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
            This shared taste profile could not be found or has expired.
          </p>
          <Link 
            href="/"
            className="inline-block w-full py-3.5 px-6 font-bold text-white rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 text-center"
            style={{ backgroundColor: theme.accent }}
          >
            Discover Your Own Taste
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main 
      className="min-h-screen py-12 px-6 flex flex-col items-center justify-between text-neutral-900 transition-colors duration-700 ease-out relative overflow-x-hidden select-none font-sans"
      style={{ backgroundColor: theme.bg }}
    >
      <BackgroundMesh />

      {/* Top Header */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between z-20 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-neutral-200/90 text-neutral-700 hover:text-neutral-900 text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 backdrop-blur-md"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Find My Taste</span>
        </Link>

        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
          Shared Profile
        </span>
      </header>

      {/* Center Showcase */}
      <div className="z-10 flex flex-col items-center text-center max-w-xl mx-auto my-auto space-y-8">
        <div>
          <span 
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border"
            style={{ backgroundColor: theme.accentLight, color: theme.accent, borderColor: `${theme.accent}33` }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {currentCategory.name} Aesthetic Archetype
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
            Check Out My Taste Profile!
          </h1>
          <p className="text-neutral-600 mt-2 text-base">
            Generated with AI by analyzing 9 nuanced aesthetic choices.
          </p>
        </div>

        {/* The Collectible Card */}
        <div className="transform transition-transform duration-500 hover:scale-[1.02] shadow-2xl rounded-3xl">
          <TasteCard profile={profile} />
        </div>

        {/* Call to action */}
        <div className="pt-4 flex flex-col items-center gap-3">
          <Link
            href="/"
            className="py-4 px-8 rounded-2xl font-bold text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 text-sm tracking-wide"
            style={{ backgroundColor: theme.accent }}
          >
            <span>Discover Your Taste Archetype</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-neutral-400 font-medium">Free, fast, and personalized for 8 categories</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 px-6 z-10 text-center text-xs text-neutral-400 font-medium mt-12">
        Find My Taste © {new Date().getFullYear()} · Aesthetic Discovery
      </footer>
    </main>
  );
}
