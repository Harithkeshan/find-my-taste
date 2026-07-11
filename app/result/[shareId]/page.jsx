"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import TasteCard from "../../../components/TasteCard";

export default function ResultScreen() {
  const { shareId } = useParams();
  const router = useRouter();
  const cardRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (shareId) {
      fetchProfileData();
    }
  }, [shareId]);

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      const savedProfile = localStorage.getItem(`taste_profile_${shareId}`);
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        console.log(`[Result] Loaded profile for shareId: ${shareId}`, parsedProfile);
        setProfile(parsedProfile);
      } else {
        console.warn(`[Result] No profile found in localStorage for shareId: ${shareId}`);
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: "#0a0a0a"
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `taste-profile-${shareId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to capture image:", error);
    }
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/share/${shareId}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRetake = () => {
    router.push("/");
  };

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (profile.error || !profile.sections) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-white/60 mb-8 max-w-md text-lg">We couldn't generate your profile properly. The AI might have timed out or returned an invalid format.</p>
        <button onClick={handleRetake} className="px-6 py-3 bg-white text-black font-bold rounded-xl uppercase tracking-wider text-sm transition-all hover:scale-105 active:scale-95">
          Retake Quiz
        </button>
      </div>
    );
  }

  // Animation delays for the profile sections
  const sectionDelay = (index) => ({ animationDelay: `${index * 150}ms` });

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden font-sans pb-0 selection:bg-pink-500/30">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          opacity: 0;
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes shimmerGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-shimmer {
          background-size: 200% 200%;
          animation: shimmerGradient 8s ease infinite;
        }
      `}} />

      {/* TOP HALF: PROFILE SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center mb-16 animate-fade-up" style={sectionDelay(0)}>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
            {profile.archetype}
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/60 max-w-2xl mx-auto leading-relaxed">
            {profile.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-6 mb-16">
          {profile.sections.map((section, idx) => (
            <div 
              key={idx} 
              className="bg-white/5 border border-white/10 rounded-3xl p-10 hover:bg-white/[0.07] transition-colors duration-300 animate-fade-up"
              style={sectionDelay(idx + 1)}
            >
              <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-5">{section.heading}</h3>
              <p className="text-lg md:text-xl leading-[1.8] text-white/85 whitespace-pre-line">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="animate-fade-up" style={sectionDelay(4)}>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span style={{ color: profile.colors[0] || '#ec4899' }}>✦</span> Top Recommendations
            </h3>
            <ol className="space-y-6">
              {profile.recommendations.map((rec, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <span className="text-xl font-black text-white/20 mt-1">{String(idx + 1).padStart(2, '0')}</span>
                  <div>
                    <h4 className="text-xl font-bold text-white/90">{rec.title}</h4>
                    <p className="text-white/50 mt-1 leading-relaxed">{rec.reason}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          
          <div className="flex items-center justify-center animate-fade-up" style={sectionDelay(5)}>
            <blockquote className="relative">
              <span className="absolute -top-10 -left-8 text-8xl text-white/10 font-serif">"</span>
              <p className="text-3xl md:text-4xl font-serif italic font-light leading-snug text-white/80">
                {profile.oneliner}
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* BOTTOM HALF: SHAREABLE CARD & BUTTONS */}
      <section className="bg-[#050505] py-24 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 justify-center">
          
          {/* THE CARD */}
          <div className="relative group perspective-1000 animate-fade-up" style={sectionDelay(6)}>
            <div className="transform transition-transform duration-500 md:group-hover:scale-[1.02] shadow-2xl rounded-3xl relative">
              <TasteCard ref={cardRef} profile={profile} />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-4 w-full max-w-[280px] animate-fade-up" style={sectionDelay(7)}>
            <button
              onClick={handleDownloadCard}
              className="py-4 px-6 rounded-2xl font-black uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 active:scale-95 bg-white text-black hover:bg-gray-200 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Download Card
            </button>
            <button
              onClick={handleCopyLink}
              className="py-4 px-6 rounded-2xl font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 active:scale-95 bg-white/10 text-white border border-white/20 hover:bg-white/20"
            >
              {copied ? "Link Copied!" : "Copy Share Link"}
            </button>
            <button
              onClick={handleRetake}
              className="py-4 px-6 rounded-2xl font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 active:scale-95 text-white/50 hover:text-white"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
