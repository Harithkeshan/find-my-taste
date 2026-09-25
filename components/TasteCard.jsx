import React, { forwardRef } from "react";

const TasteCard = forwardRef(({ profile }, ref) => {
  if (!profile) return null;

  const { archetype, tagline, traits, emoji, category, oneliner, colors } = profile;

  const primaryColor = colors && colors.length > 0 ? colors[0] : "#ec4899";
  const secondaryColor = colors && colors.length > 1 ? colors[1] : "#8b5cf6";
  const tertiaryColor = colors && colors.length > 2 ? colors[2] : primaryColor;

  return (
    <div 
      ref={ref}
      className="w-[360px] sm:w-[380px] bg-[#0a0a0a] rounded-3xl relative overflow-hidden flex flex-col justify-between p-7 taste-card-glow text-left select-none"
      style={{
        height: '640px',
        border: `1.5px solid ${primaryColor}`,
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes borderPulse {
          0%, 100% { box-shadow: 0 0 18px 2px ${primaryColor}55, 0 30px 60px -20px ${primaryColor}40, 0 0 40px -10px ${secondaryColor}40; }
          50% { box-shadow: 0 0 36px 6px ${primaryColor}99, 0 30px 60px -20px ${primaryColor}60, 0 0 60px -10px ${secondaryColor}60; }
        }
        .taste-card-glow {
          animation: borderPulse 2s ease-in-out infinite;
        }
      `}} />

      {/* Explosive Gradient Background — top-right to black at bottom-left */}
      <div 
        className="absolute -top-[20%] -right-[20%] w-[160%] h-[160%] rounded-full blur-[90px] opacity-75 mix-blend-screen pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${primaryColor} 0%, ${secondaryColor} 35%, transparent 65%)`
        }}
      ></div>

      {/* Center secondary glow */}
      <div 
        className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full blur-[80px] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${secondaryColor}33 0%, transparent 70%)`
        }}
      ></div>

      {/* Dark vignette at bottom-left to fade to black */}
      <div 
        className="absolute bottom-0 left-0 w-full h-2/3 pointer-events-none"
        style={{
          background: `linear-gradient(to top right, #0a0a0a 0%, transparent 80%)`
        }}
      ></div>
      
      {/* Tiled Watermark */}
      <div className="absolute inset-0 opacity-[0.03] text-8xl flex flex-wrap gap-4 items-center justify-center overflow-hidden pointer-events-none select-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i}>{emoji || "✨"}</span>
        ))}
      </div>

      {/* Card Content - Top */}
      <div className="relative z-10 flex justify-between items-center">
        <span className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">FIND MY TASTE</span>
        <div 
          className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest bg-white/10 backdrop-blur-md border border-white/20 text-white uppercase flex items-center gap-1.5"
          style={{ boxShadow: `0 0 20px ${primaryColor}50` }}
        >
          {emoji} {category || "PROFILE"}
        </div>
      </div>

      {/* Card Content - Middle (archetype + tagline) */}
      <div className="relative z-10 flex flex-col justify-center flex-1 my-4 space-y-3">
        <h2 
          className="font-display font-extrabold leading-[1.15] tracking-tight text-white drop-shadow-2xl text-3xl sm:text-4xl"
        >
          {archetype}
        </h2>
        <p className="text-sm font-normal text-white/70 leading-relaxed drop-shadow-md line-clamp-3">
          {tagline}
        </p>
      </div>

      {/* Card Content - Bottom */}
      <div className="relative z-10 mt-auto space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {(traits || []).map((trait, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-xl border border-white/10"
              style={{ color: colors ? colors[idx % colors.length] : '#fff' }}
            >
              {trait}
            </span>
          ))}
        </div>
        
        {oneliner && (
          <p className="text-xs italic text-white/60 leading-relaxed line-clamp-3 font-normal">
            &quot;{oneliner}&quot;
          </p>
        )}

        <div className="text-[10px] font-bold tracking-widest text-white/30 text-right uppercase pt-1">
          findmytaste.app
        </div>
      </div>
      
      {/* Inner border highlight at top */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, transparent 40%)' }}></div>
    </div>
  );
});

TasteCard.displayName = "TasteCard";

export default TasteCard;
