"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import QuestionCard from "../../../components/QuestionCard";
import { questions as allQuestions } from "../../../lib/questions";
import { supabase } from "../../../lib/supabaseClient";

export default function QuizScreen() {
  const { category } = useParams();
  const router = useRouter();

  const [answers, setAnswers] = useState([]); 
  const [isGeneratingProfile, setIsGeneratingProfile] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [motivationalHook, setMotivationalHook] = useState(null);

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

    if (isEndOfRound) {
      if (newAnswers.length === 3) setMotivationalHook("We're already seeing a pattern... keep going 🔥");
      else if (newAnswers.length === 6) setMotivationalHook("You're not like most people who take this quiz... almost there ⚡");
      else if (newAnswers.length === 9) setMotivationalHook("Last set — your profile is being built as you answer 🎯");
      
      let backgroundTask;
      if (newAnswers.length >= 9) {
        backgroundTask = generateTasteProfile(newAnswers);
      }

      // Show hook for 2.5s
      await new Promise(r => setTimeout(r, 2500));
      setMotivationalHook(null);
      if (backgroundTask) {
        await backgroundTask;
      }
    }
  };

  const handleOptionSelect = async (option) => {
    if (!currentQuestion) return;

    if (currentQuestion.allowMultiple) {
      // Toggle selection for multiple choice
      setSelectedOptions(prev => 
        prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
      );
    } else {
      // Single selection flow
      setSelectedOptions([option]);
      // Pause to let user see their selection light up
      await new Promise(r => setTimeout(r, 500)); 
      await advanceQuestion([option]);
    }
  };

  const handleContinueMultiple = async () => {
    if (selectedOptions.length === 0) return;
    await advanceQuestion(selectedOptions);
  };

  // -----------------------------------------------------
  // RENDER: Motivational Hook (Full Screen)
  // -----------------------------------------------------
  if (motivationalHook) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white p-6 transition-opacity duration-500">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient leading-tight">
          {motivationalHook}
        </h1>
      </main>
    );
  }

  // -----------------------------------------------------
  // RENDER: Final Generation Loading Screen (Full Screen)
  // -----------------------------------------------------
  if (isGeneratingProfile) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-6 transition-opacity duration-500">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-8 shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
        <h2 className="text-2xl md:text-4xl font-extrabold animate-pulse text-center tracking-tight">
          Building your taste profile...
        </h2>
        <p className="mt-4 text-white/50 text-center text-lg font-medium">Analyzing {TOTAL_QUESTIONS} data points</p>
      </main>
    );
  }

  // -----------------------------------------------------
  // RENDER: Main Quiz Interface
  // -----------------------------------------------------
  return (
    <main className="min-h-screen flex flex-col items-center bg-[#0a0a0a] text-white p-4 md:p-8 transition-opacity duration-500">
      <div className="max-w-3xl w-full flex-1 flex flex-col">
        {/* Header / Progress UI */}
        <header className="w-full flex flex-col gap-4 mb-10 mt-4 md:mt-8">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">{category}</p>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Round {round} <span className="text-white/40">of 3</span></h1>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-white/90">{questionInRound}</span>
              <span className="text-base font-bold text-white/40"> / 3</span>
            </div>
          </div>
          
          {/* Animated Progress bar */}
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]"
              style={{ width: `${(overallProgress / TOTAL_QUESTIONS) * 100}%` }}
            ></div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-center w-full relative">
          {currentQuestion ? (
            <div className="w-full transition-opacity duration-500">
              <QuestionCard
                question={currentQuestion.question}
                options={currentQuestion.options}
                onSelectOption={handleOptionSelect}
                selectedOptions={selectedOptions}
                allowMultiple={currentQuestion.allowMultiple}
                onContinue={handleContinueMultiple}
              />
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
