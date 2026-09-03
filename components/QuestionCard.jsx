import React from "react";

export default function QuestionCard({ question, options = [], onSelectOption, selectedOptions = [], allowMultiple, onContinue }) {
  const isAnySelected = selectedOptions && selectedOptions.length > 0;

  return (
    <div className="w-full bg-[#121212]/90 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl animate-fade-in">
      {/* Question Header */}
      <h2 className="text-2xl md:text-3xl font-normal text-white mb-8 leading-relaxed tracking-wide">
        {question}
      </h2>

      {/* Answer Options Grid */}
      <div className="grid grid-cols-1 gap-4">
        {options.map((option, idx) => {
          const isSelected = selectedOptions.includes(option);
          // If not multiple, disable unselected ones once one is picked.
          // If multiple, never disable them.
          const isDisabled = !allowMultiple && isAnySelected && !isSelected;

          return (
            <button
              key={idx}
              onClick={() => !isDisabled && onSelectOption(option)}
              disabled={isDisabled}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold text-base md:text-lg flex items-center
                ${
                  isSelected
                    ? "bg-white text-black border-white scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    : "bg-white/5 border-white/10 text-white/90 hover:bg-white/10 hover:border-white/30"
                }
                ${isDisabled ? "opacity-50 scale-95 grayscale" : ""}
              `}
            >
              <span className={`inline-block mr-3 font-mono text-sm opacity-50 ${isSelected ? "text-black" : "text-white"}`}>
                {String.fromCharCode(65 + idx)}
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {allowMultiple && (
        <div className="mt-8 flex justify-end animate-fade-in-up">
          <button 
            onClick={onContinue}
            disabled={!isAnySelected}
            className={`py-3 px-8 rounded-xl font-bold transition-all duration-300 ${
              isAnySelected 
                ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.5)]" 
                : "bg-white/10 text-white/30 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
