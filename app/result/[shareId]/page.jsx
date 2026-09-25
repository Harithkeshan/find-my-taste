"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Download, 
  Share2, 
  Check, 
  RotateCcw, 
  ChevronLeft, 
  Sparkles,
  Quote
} from "lucide-react";
import html2canvas from "html2canvas";
import TasteCard from "../../../components/TasteCard";
import { supabase } from "../../../lib/supabaseClient";
import { getCategoryById } from "../../../lib/categories";

export default function ResultScreen() {
  const { shareId } = useParams();
  const router = useRouter();
  const cardRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (shareId) {
      fetchProfileData();
    }
  }, [shareId]);

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      // 1. Try loading from localStorage first (fastest)
      if (typeof window !== "undefined") {
        const savedProfile = localStorage.getItem(`taste_profile_${shareId}`);
        if (savedProfile) {
          try {
            const parsedProfile = JSON.parse(savedProfile);
            setProfile(parsedProfile);
            setIsLoading(false);
            return;
          } catch (e) {
            console.warn("Failed to parse cached profile:", e);
          }
        }
      }

      // 2. Fallback to Supabase database
      const { data, error } = await supabase
        .from("profiles")
        .select("profile_data")
        .eq("share_id", shareId)
        .single();

      if (data && data.profile_data) {
        setProfile(data.profile_data);
      } else {
        console.warn(`[Result] No profile found for shareId: ${shareId}`, error);
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: "#0a0a0a",
        logging: false,
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const cleanName = profile?.archetype ? profile.archetype.replace(/\s+/g, '-').toLowerCase() : "profile";
      link.download = `taste-${cleanName}-${shareId?.slice(0, 6) || "card"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to capture image:", error);
      alert("Could not generate card image automatically. You can capture a screenshot of your card!");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      const shareUrl = `${window.location.origin}/share/${shareId}`;
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = shareUrl;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error("Clipboard copy error:", err);
      setCopied(false);
    }
  };

  const handleRetake = () => {
    router.push("/");
  };

  const currentCategory = getCategoryById(profile?.category);
  const theme = currentCategory.theme;

  // Reusable Background Mesh
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

  // Loading State
  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden text-neutral-900 select-none font-sans"
        style={{ backgroundColor: theme.bg }}
      >
        <BackgroundMesh />
        <div className="relative z-10 max-w-sm w-full bg-white/95 border border-neutral-200/90 rounded-3xl p-8 text-center shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <div className="relative mb-4 mx-auto w-12 h-12 flex items-center justify-center">
            <div 
              className="w-12 h-12 border-3 rounded-full animate-spin"
              style={{ 
                borderColor: `${theme.accent}26`, 
                borderTopColor: theme.accent 
              }}
            />
          </div>
          <p className="text-sm font-semibold text-neutral-700">Loading your taste profile...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (!profile || profile.error) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden text-neutral-900 select-none font-sans"
        style={{ backgroundColor: theme.bg }}
      >
        <BackgroundMesh />
        <div className="relative z-10 max-w-md w-full bg-white/95 border border-neutral-200/90 rounded-3xl p-8 sm:p-10 text-center shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <h1 className="text-2xl font-display font-extrabold text-neutral-900 mb-2">Profile Not Found</h1>
          <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
            We couldn&apos;t retrieve this taste profile. It may have expired or was generated in a different session.
          </p>
          <button 
            onClick={handleRetake} 
            className="w-full py-3.5 px-6 font-bold text-white rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: theme.accent }}
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  const sections = Array.isArray(profile.sections) ? profile.sections : [];
  const recommendations = Array.isArray(profile.recommendations) ? profile.recommendations : [];

  return (
    <main 
      className="min-h-screen flex flex-col justify-between text-neutral-900 transition-colors duration-700 ease-out relative overflow-x-hidden select-none font-sans"
      style={{ backgroundColor: theme.bg }}
    >
      <BackgroundMesh />

      {/* TOP HEADER */}
      <header className="max-w-6xl w-full mx-auto px-6 py-6 flex items-center justify-between z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-neutral-200/90 text-neutral-700 hover:text-neutral-900 text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 backdrop-blur-md"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>All Categories</span>
        </Link>

        <span className="font-display font-black text-xl tracking-tight text-neutral-900">
          Find My Taste
        </span>

        <button
          onClick={handleRetake}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-neutral-200/90 text-neutral-700 hover:text-neutral-900 text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 backdrop-blur-md"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Retake</span>
        </button>
      </header>

      {/* CONTENT WRAPPER */}
      <div className="max-w-4xl w-full mx-auto px-6 z-10 py-8 flex flex-col gap-12">

        {/* HERO ARCHETYPE CARD */}
        <div className="text-center pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-neutral-200/90 text-xs font-bold uppercase tracking-wider text-neutral-800 shadow-sm backdrop-blur-md mb-5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
            <span>{currentCategory.name} Archetype</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-4">
            {profile.archetype || "Your Taste Archetype"}
          </h1>

          <p className="text-base sm:text-xl text-neutral-600 font-normal max-w-2xl mx-auto leading-relaxed">
            {profile.tagline}
          </p>
        </div>

        {/* PROFILE INSIGHT SECTIONS */}
        <div className="flex flex-col gap-6">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-white/95 border border-neutral-200/90 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] backdrop-blur-xl hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 text-left"
            >
              <h3 
                className="text-xs font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2"
                style={{ color: theme.accent }}
              >
                <span>✦</span> {section.heading}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-neutral-800 whitespace-pre-line font-normal">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* 2-COLUMN RECOMMENDATIONS & ONELINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Recommendations */}
          <div className="bg-white/95 border border-neutral-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] backdrop-blur-xl text-left">
            <h3 
              className="text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2"
              style={{ color: theme.accent }}
            >
              <Sparkles className="w-3.5 h-3.5" /> Curated Recommendations
            </h3>
            <ol className="space-y-5">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <span 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: theme.accentLight, color: theme.accent }}
                  >
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-neutral-900 leading-snug">{rec.title}</h4>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-1 leading-relaxed">{rec.reason}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Oneliner Quote */}
          {profile.oneliner && (
            <div className="bg-white/95 border border-neutral-200/90 rounded-3xl p-8 sm:p-10 flex flex-col justify-center relative shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] backdrop-blur-xl text-left">
              <Quote 
                className="w-12 h-12 mb-4 opacity-15"
                style={{ color: theme.accent }}
              />
              <p className="text-xl sm:text-2xl italic font-light leading-relaxed text-neutral-800">
                &ldquo;{profile.oneliner}&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-medium text-neutral-400">
                <span>Personal Taste Synthesis</span>
                <span>AI Profile</span>
              </div>
            </div>
          )}
        </div>

        {/* TASTECARD SHOWCASE SECTION */}
        <section className="mt-8 pt-10 border-t border-neutral-200/60 flex flex-col items-center text-center">
          <div className="mb-8">
            <span 
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border mb-3 inline-block"
              style={{ backgroundColor: theme.accentLight, color: theme.accent, borderColor: `${theme.accent}33` }}
            >
              Collectable Archetype Card
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Share Your Aesthetic Profile
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Download your collectible trading card or share the direct link with friends.
            </p>
          </div>

          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-10">
            {/* The Visual Card */}
            <div className="transform transition-transform duration-500 hover:scale-[1.02] shadow-2xl rounded-3xl">
              <TasteCard ref={cardRef} profile={profile} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3.5 w-full max-w-xs">
              <button
                onClick={handleDownloadCard}
                disabled={isDownloading}
                style={{ backgroundColor: theme.accent }}
                className="w-full py-4 px-6 rounded-2xl font-bold text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-sm tracking-wide cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? "Generating Image..." : "Download Card (PNG)"}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full py-4 px-6 rounded-2xl font-bold bg-white text-neutral-800 border border-neutral-200/90 shadow-sm hover:bg-neutral-50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-sm tracking-wide cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-neutral-600" />
                    <span>Copy Share Link</span>
                  </>
                )}
              </button>

              <button
                onClick={handleRetake}
                className="w-full py-3.5 px-6 rounded-2xl font-medium text-neutral-600 hover:text-neutral-900 hover:bg-white/60 transition-all text-xs tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake / Explore Categories</span>
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* MINIMAL FOOTER */}
      <footer className="w-full py-6 px-6 z-10 text-center text-xs text-neutral-400 font-medium border-t border-neutral-200/40 mt-12">
        Find My Taste © {new Date().getFullYear()} · Aesthetic Discovery
      </footer>
    </main>
  );
}
