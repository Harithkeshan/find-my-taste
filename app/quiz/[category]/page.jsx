"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import QuestionCard from "../../../components/QuestionCard";
import { questions as allQuestions } from "../../../lib/questions";
import { getCategoryById } from "../../../lib/categories";

export default function QuizScreen() {
  const { category } = useParams();
  const router = useRouter();

  const [answers, setAnswers] = useState([]);
  const [isGeneratingProfile, setIsGeneratingProfile] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [motivationalHook, setMotivationalHook] = useState(null);

  const currentCategory = getCategoryById(category);
  const theme = currentCategory.theme;

  const TOTAL_QUESTIONS = 9;
  const round = Math.min(3, Math.floor(answers.length / 3) + 1);
  const questionInRound = answers.length >= TOTAL_QUESTIONS ? 3 : (answers.length % 3) + 1;
  const overallProgress = answers.length;

  const categoryQuestions = allQuestions[category] || allQuestions["movies"];
  const currentQuestion = answers.length < TOTAL_QUESTIONS ? categoryQuestions[answers.length] : null;

  const generateTasteProfile = async (finalAnswers) => {
    setIsGeneratingProfile(true);
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, answers: finalAnswers }),
      });
      const data = await response.json();

      if (!response.ok || data.error || !data.sections) {
        console.error("[Quiz] API returned an error or invalid profile:", data);
        setIsGeneratingProfile(false);
        alert("Failed to generate your profile. Please try again.");
        return;
      }

      const shareId = data.shareId || crypto.randomUUID();

      if (data.dbError) {
        console.warn("[Quiz] Supabase DB insert warning:", data.dbError);
      }

      // Store in localStorage as local fallback cache
      localStorage.setItem(`taste_profile_${shareId}`, JSON.stringify(data));

      router.push(`/result/${shareId}`);
    } catch (error) {
      console.error("Failed to generate taste profile:", error);
      setIsGeneratingProfile(false);
    }
  };

  const advanceQuestion = async (chosenOptions) => {
    const answerText = chosenOptions.join(", ");
    const newAnswers = [...answers, { question: currentQuestion?.question, selectedOption: answerText }];
    setAnswers(newAnswers);
    setSelectedOptions([]);

    const isEndOfRound = newAnswers.length === 3 || newAnswers.length === 6 || newAnswers.length === 9;

    if (newAnswers.length >= 9) {
      // Final question: instantly start profile generation
      await generateTasteProfile(newAnswers);
      return;
    }

    if (isEndOfRound) {
      if (newAnswers.length === 3) setMotivationalHook("We're already seeing a pattern... keep going 🔥");
      else if (newAnswers.length === 6) setMotivationalHook("You're not like most people who take this quiz... almost there ⚡");

      await new Promise(r => setTimeout(r, 1200));
      setMotivationalHook(null);
    }
  };

  const handleOptionSelect = async (option) => {
    if (!currentQuestion) return;

    if (currentQuestion.allowMultiple) {
      setSelectedOptions(prev =>
        prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
      );
    } else {
      setSelectedOptions([option]);
      await new Promise(r => setTimeout(r, 260));
      await advanceQuestion([option]);
    }
  };

  const handleContinueMultiple = async () => {
    if (selectedOptions.length === 0) return;
    await advanceQuestion(selectedOptions);
  };

  // Reusable Background Mesh & Grid
  const BackgroundMesh = () => (
    <>
      {/* Layer 1: Left Aurora Orb */}
      <div 
        className="absolute -top-[12%] -left-[10%] w-[58vw] h-[58vw] max-w-[750px] max-h-[750px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ease-out animate-float-slow"
        style={{ backgroundColor: theme.orbPrimary }}
      />

      {/* Layer 2: Right Aurora Orb */}
      <div 
        className="absolute -top-[10%] -right-[10%] w-[52vw] h-[52vw] max-w-[700px] max-h-[700px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ease-out animate-float-reverse"
        style={{ backgroundColor: theme.orbSecondary }}
      />

      {/* Layer 3: Central-Bottom Grounding Glow */}
      <div 
        className="absolute -bottom-[15%] left-[15%] w-[70vw] h-[45vw] max-w-[900px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 ease-out"
        style={{ backgroundColor: theme.orbBottom }}
      />

      {/* Layer 4: Architectural Coordinate Dot Matrix */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.16) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
    </>
  );

  // -----------------------------------------------------
  // RENDER: Motivational Hook (Snappy Interstitial)
  // -----------------------------------------------------
  if (motivationalHook) {
    return (
      <main 
        className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden select-none font-sans text-neutral-900"
        style={{ backgroundColor: theme.bg }}
      >
        <BackgroundMesh />
        <div className="relative z-10 max-w-lg w-full bg-white/95 border border-neutral-200/90 rounded-3xl p-8 sm:p-12 text-center shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] backdrop-blur-xl animate-fade-in">
          <span 
            className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border"
            style={{ 
              backgroundColor: theme.accentLight, 
              color: theme.accent, 
              borderColor: `${theme.accent}33` 
            }}
          >
            Round {round} Completed
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-neutral-900 leading-snug tracking-tight">
            {motivationalHook}
          </h1>
        </div>
      </main>
    );
  }

  // -----------------------------------------------------
  // RENDER: Final Generation Loading Screen
  // -----------------------------------------------------
  if (isGeneratingProfile) {
    return (
      <main 
        className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden select-none font-sans text-neutral-900"
        style={{ backgroundColor: theme.bg }}
      >
        <BackgroundMesh />
        <div className="relative z-10 max-w-lg w-full bg-white/95 border border-neutral-200/90 rounded-3xl p-8 sm:p-12 text-center shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <div className="relative mb-6 mx-auto w-16 h-16 flex items-center justify-center">
            <div 
              className="w-16 h-16 border-4 rounded-full animate-spin"
              style={{ 
                borderColor: `${theme.accent}26`, 
                borderTopColor: theme.accent 
              }}
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-neutral-900 tracking-tight mb-2">
            Synthesizing your taste profile...
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base font-normal">
            Analyzing your 9 unique data points with AI
          </p>
        </div>
      </main>
    );
  }

  // -----------------------------------------------------
  // RENDER: Main Quiz Interface
  // -----------------------------------------------------
  return (
    <main 
      className="min-h-screen flex flex-col justify-between text-neutral-900 transition-colors duration-700 ease-out relative overflow-hidden select-none font-sans"
      style={{ backgroundColor: theme.bg }}
    >
      <BackgroundMesh />

      {/* TOP BAR / PROGRESS HEADER */}
      <header className="max-w-4xl w-full mx-auto px-6 py-6 z-20">
        <div className="flex items-center justify-between mb-4">
          {/* Back to Home */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-neutral-200/90 text-neutral-700 hover:text-neutral-900 text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 backdrop-blur-md"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Categories</span>
          </Link>

          {/* Active Category Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-neutral-200/90 shadow-sm backdrop-blur-md">
            <span 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: theme.accent }}
            />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
              {currentCategory.name}
            </span>
          </div>

          {/* Progress Indicators */}
          <div className="text-right">
            <span className="text-xs font-bold text-neutral-900">
              {answers.length < TOTAL_QUESTIONS ? answers.length + 1 : TOTAL_QUESTIONS}
            </span>
            <span className="text-xs font-semibold text-neutral-400"> / {TOTAL_QUESTIONS}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-neutral-200/70 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${((overallProgress + 1) / TOTAL_QUESTIONS) * 100}%`,
              backgroundColor: theme.accent
            }}
          />
        </div>
      </header>

      {/* MAIN QUESTION VIEWPORT */}
      <section className="max-w-2xl w-full mx-auto px-6 flex-1 flex flex-col justify-center items-center z-10 py-6">
        {currentQuestion && (
          <div className="w-full animate-fade-in">
            <QuestionCard
              question={currentQuestion.question}
              options={currentQuestion.options}
              onSelectOption={handleOptionSelect}
              selectedOptions={selectedOptions}
              allowMultiple={currentQuestion.allowMultiple}
              onContinue={handleContinueMultiple}
              theme={theme}
            />
          </div>
        )}
      </section>

      {/* MINIMAL FOOTER */}
      <footer className="w-full py-5 px-6 z-10 text-center text-xs text-neutral-400 font-medium">
        Find My Taste © {new Date().getFullYear()} · Aesthetic Discovery
      </footer>
    </main>
  );
}
