import React from 'react';
import { Compass, Bookmark, Share2 } from 'lucide-react';

interface HeaderProps {
  onOpenSaved: () => void;
  savedCount: number;
  onQuickPreset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSaved, savedCount, onQuickPreset }) => {
  return (
    <header className="border-b-2 border-[#1C1917] bg-[#F8F7F4]/95 backdrop-blur sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Bold Architectural Brand Mark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#1C1917] flex items-center justify-center text-white">
            <Compass className="w-4 h-4" />
          </div>
          <a 
            href="#" 
            className="text-2xl font-extrabold tracking-tighter text-[#1C1917] uppercase font-display whitespace-nowrap shrink-0 hover:text-[#E11D48] transition-colors"
          >
            CastWise
          </a>
        </div>

        {/* Zone 2: Navigation Links in Label-Editorial Style */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.16em] text-stone-600 font-mono">
          <a href="#conditions-entry" className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0">
            Conditions
          </a>
          <a href="#favorability-verdict" className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0">
            Favorability
          </a>
          <a href="#rig-schematic" className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0">
            Blueprint
          </a>
          <a href="#tackle-guide" className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0">
            Tackle
          </a>
          <a href="#fish-database" className="hover:text-[#E11D48] transition-colors whitespace-nowrap shrink-0 text-[#E11D48]">
            Species & Regs
          </a>
        </nav>

        {/* Zone 3: Rounded-Full Pill Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <PWAInstallButton variant="header" />

          <button
            type="button"
            onClick={onQuickPreset}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-full border border-[#1C1917] text-[#1C1917] bg-white hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0"
            title="Reset to Port Phillip Bay, Victoria, Australia"
          >
            <Share2 className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>Port Phillip Bay, VIC</span>
          </button>

          <button
            type="button"
            onClick={onOpenSaved}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full bg-[#1C1917] text-white hover:bg-stone-800 shadow-sm transition-colors whitespace-nowrap shrink-0"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Trip Plans {savedCount > 0 ? `(${savedCount})` : ''}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
