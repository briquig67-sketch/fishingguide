import React from 'react';
import { FishingEvaluationResult } from '../types/fishing';
import { Target, Clock, Zap, MapPin, Compass, Lightbulb } from 'lucide-react';
import estuaryImage from '../assets/images/angler_estuary_water_1792283288835.jpg';

interface TacticalGuideProps {
  tacticalPlan: FishingEvaluationResult['tacticalPlan'];
  targetFishName: string;
  areaName: string;
}

export const TacticalGuide: React.FC<TacticalGuideProps> = ({ tacticalPlan, targetFishName, areaName }) => {
  return (
    <section id="tactical-plan" className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-stone-200">
        <div className="label-editorial text-[#1C1917] flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-[#E11D48]" />
          <span>[06] Tactical Fishing Plan & Structure Targeting</span>
        </div>
        <span className="text-xs text-stone-400 font-mono">Field Tactics</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Structure & Cadence (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Structure to Target */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 space-y-3 shadow-sm">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#1C1917] flex items-center gap-2 font-display">
              <MapPin className="w-4 h-4 text-[#E11D48]" />
              <span>Where to Cast at {areaName || 'Your Grounds'}</span>
            </h4>
            <div className="space-y-2.5">
              {tacticalPlan.structureToTarget.map((struct, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#1C1917] text-white flex items-center justify-center font-mono font-bold shrink-0 mt-0.5 text-[11px]">
                    {i + 1}
                  </span>
                  <span className="text-[#1C1917] leading-relaxed font-medium">{struct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Retrieve Cadence & Depth Zone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-white border border-stone-200/90 rounded-2xl p-5 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                <Zap className="w-4 h-4 text-[#E11D48]" />
                <span>Retrieve Cadence</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {tacticalPlan.retrieveTechnique}
              </p>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-2xl p-5 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                <Compass className="w-4 h-4 text-[#E11D48]" />
                <span>Target Depth Zone</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {tacticalPlan.depthZone}
              </p>
            </div>

          </div>

          {/* Master Angler Pro Tip */}
          <div className="bg-rose-50/70 border border-[#E11D48]/30 rounded-2xl p-5 flex items-start gap-3.5">
            <Lightbulb className="w-5 h-5 text-[#E11D48] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="label-editorial text-[#E11D48]">
                Master Angler Pro Advice
              </h5>
              <p className="text-xs text-[#1C1917] leading-relaxed font-medium">
                {tacticalPlan.keyProTip}
              </p>
            </div>
          </div>

        </div>

        {/* Right: Peak Activity Window & Field Photo (5 cols) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          
          {/* Peak Window Box */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 space-y-3 shadow-sm">
            <div className="label-editorial text-[#E11D48] flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Prime Bite Window Timing</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1C1917] text-white text-sm font-bold font-display">
              {tacticalPlan.peakActivityWindow}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Arrive 30 minutes before this window to set up drift lines or locate current rips before predator blitzes begin.
            </p>
          </div>

          {/* Field Photo Card */}
          <div className="rounded-2xl border border-stone-200 overflow-hidden relative group h-64 shadow-sm">
            <img 
              src={estuaryImage} 
              alt="Angler casting into moving tidal waters at twilight" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-5">
              <span className="text-sm font-bold text-white font-display">
                Ambush Strategy for {targetFishName}
              </span>
              <span className="text-[11px] text-stone-300 mt-0.5">
                Cast upstream of current seams and let bait sweep naturally into ambush points.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
