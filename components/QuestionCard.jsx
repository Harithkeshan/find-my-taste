import React from "react";
import { Check } from "lucide-react";

export default function QuestionCard({
  question,
  options = [],
  onSelectOption,
  selectedOptions = [],
  allowMultiple,
  onContinue,
  theme
}) {
  const isAnySelected = selectedOptions && selectedOptions.length > 0;
  const accentColor = theme?.accent || "#171717";
  const accentLight = theme?.accentLight || "#f4f4f5";
  const orbGlow = theme?.orbPrimary || "rgba(0, 0, 0, 0.1)";

  return (
    <div className="w-full bg-white/95 border border-neutral-200/90 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300">

      {/* 1. Explicit Affordance Badge */}
      <div className="mb-5 flex items-center justify-between">
        {allowMultiple ? (
          <span 
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors"
            style={{ 
              backgroundColor: accentLight,
              color: accentColor,
              borderColor: `${accentColor}33`
            }}
          >
            <span 
              className="w-2 h-2 rounded-full animate-pulse" 
              style={{ backgroundColor: accentColor }}
            />
            Select all that apply
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            Choose 1 option
          </span>
        )}
      </div>

      {/* 2. Bold, Legible Question Header */}
      <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 mb-8 leading-snug tracking-tight text-left">
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
              type="button"
              onClick={() => !isDisabled && onSelectOption(option)}
              disabled={isDisabled}
              style={
                isSelected 
                  ? { 
                      borderColor: accentColor,
                      boxShadow: `0 8px 24px -6px ${orbGlow}`,
                      backgroundColor: "#ffffff"
                    } 
                  : undefined
              }
              className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 font-medium text-base sm:text-lg flex items-center justify-between group
                ${isSelected
                  ? "border-2 text-neutral-950 scale-[1.01]"
                  : "bg-white/70 border-neutral-200/80 text-neutral-700 hover:bg-white hover:border-neutral-300 hover:shadow-sm active:scale-[0.99]"
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
                    ? "text-white shadow-sm"
                    : "border-2 border-neutral-300 bg-neutral-50 group-hover:border-neutral-400"
                }`}
                style={isSelected ? { backgroundColor: accentColor } : undefined}
              >
                {isSelected && (
                  allowMultiple ? (
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
                  )
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. Action Button for Multiple Choice */}
      {allowMultiple && (
        <div className="mt-8 pt-6 border-t border-neutral-100 flex justify-end">
          <button
            type="button"
            onClick={onContinue}
            disabled={!isAnySelected}
            style={isAnySelected ? { backgroundColor: accentColor } : undefined}
            className={`w-full sm:w-auto py-3.5 px-8 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm tracking-wide ${
              isAnySelected
                ? "text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                : "bg-neutral-100 text-neutral-400 border border-neutral-200/70 cursor-not-allowed"
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
