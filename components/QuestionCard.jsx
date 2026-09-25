import React from "react";

export default function QuestionCard({ 
  question, 
  options = [], 
  onSelectOption, 
  selectedOptions = [], 
  allowMultiple, 
  onContinue 
}) {
  const isAnySelected = selectedOptions && selectedOptions.length > 0;

  return (
    <div className="w-full bg-[#111113]/95 border border-white/10 rounded-3xl p-6 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-300">
      
      {/* 1. Explicit Affordance Badge */}
      <div className="mb-4">
        {allowMultiple ? (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
            Select all that apply
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-white/50 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
            Choose 1 option
          </span>
        )}
      </div>

      {/* 2. Bold, Legible Question Header */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-snug tracking-tight">
        {question}
      </h2>

      {/* 3. Intuitive Options List */}
      <div className="flex flex-col gap-3.5">
        {options.map((option, idx) => {
          const isSelected = selectedOptions.includes(option);
          const isDisabled = !allowMultiple && isAnySelected && !isSelected;

          return (
            <button
              key={idx}
              onClick={() => !isDisabled && onSelectOption(option)}
              disabled={isDisabled}
              className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 font-medium text-base md:text-lg flex items-center justify-between group
                ${
                  isSelected
                    ? "bg-gradient-to-r from-purple-500/20 via-indigo-500/15 to-purple-500/20 border-purple-400 text-white shadow-[0_0_25px_rgba(168,85,247,0.2)] scale-[1.01]"
                    : "bg-white/[0.03] border-white/10 text-white/85 hover:bg-white/[0.07] hover:border-white/20 active:scale-[0.99]"
                }
                ${isDisabled ? "opacity-35 scale-[0.99] grayscale pointer-events-none" : "cursor-pointer"}
              `}
            >
              {/* Option Text */}
              <span className="pr-4 leading-normal select-none">{option}</span>

              {/* Intuitive Selector (Circle for Single, Squircle for Multi) */}
              <div 
                className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-all duration-200 ${
                  allowMultiple ? "rounded-lg" : "rounded-full"
                } ${
                  isSelected 
                    ? "bg-purple-500 border border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.6)]" 
                    : "border-2 border-white/20 group-hover:border-white/40 bg-white/5"
                }`}
              >
                {isSelected && (
                  allowMultiple ? (
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
                  )
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. Dynamic Action Button for Multiple Choice */}
      {allowMultiple && (
        <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
          <button 
            onClick={onContinue}
            disabled={!isAnySelected}
            className={`w-full sm:w-auto py-3.5 px-8 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm tracking-wide ${
              isAnySelected 
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer" 
                : "bg-white/5 text-white/30 border border-white/5 cursor-not-allowed"
            }`}
          >
            <span>
              {isAnySelected ? `Continue with ${selectedOptions.length} selected` : "Select options to continue"}
            </span>
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
}
