import React, { useState } from 'react';
import { TackleSpecification } from '../types/fishing';
import { 
  CheckSquare, 
  Square, 
  Printer, 
  Package, 
  Sliders, 
  ShieldCheck, 
  Check, 
  Fish, 
  Sparkles 
} from 'lucide-react';

interface TackleChecklistProps {
  tackle: TackleSpecification;
  targetFishName: string;
  areaName: string;
}

export const TackleChecklist: React.FC<TackleChecklistProps> = ({ tackle, targetFishName, areaName }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const checklistItems = [
    { id: 'rod', label: `Rod: ${tackle.rod.length} ${tackle.rod.power} (${tackle.rod.action})` },
    { id: 'reel', label: `Reel: ${tackle.reel.size} ${tackle.reel.type} (${tackle.reel.dragSetting} drag)` },
    { id: 'mainline', label: `Main Line: ${tackle.mainLine.strengthLb} lb (${tackle.mainLine.strengthKg} kg) ${tackle.mainLine.type}` },
    { id: 'leader', label: `Leader: ${tackle.leader.strengthLb} lb ${tackle.leader.type} (${tackle.leader.lengthInches}" / ${tackle.leader.lengthCm}cm)` },
    { id: 'hook', label: `Hooks: ${tackle.hook.style} Size ${tackle.hook.size}` },
    { id: 'sinker', label: `Sinkers: ${tackle.sinker.weightOz} oz (${tackle.sinker.weightGrams}g) ${tackle.sinker.style}` },
    ...tackle.terminalAccessories.map((acc, idx) => ({ id: `acc_${idx}`, label: acc })),
    ...tackle.liveBaits.slice(0, 3).map((bait, idx) => ({ id: `bait_${idx}`, label: `Bait: ${bait}` }))
  ];

  const completedCount = checklistItems.filter(item => checkedItems[item.id]).length;

  return (
    <section id="tackle-guide" className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <div className="label-editorial text-[#1C1917] flex items-center gap-1.5 mb-1">
            <Package className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>[05] Tackle Specifications & Equipment Matching</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#1C1917] font-display">
            Tailored Gear For {targetFishName}
          </h3>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-full border border-[#1C1917] text-[#1C1917] bg-white hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0 shadow-2xs"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Export Rig Sheet</span>
        </button>
      </div>

      {/* Main Tackle Specification Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Card 1: Rod & Reel Setup */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C1917]">
              <Sliders className="w-4 h-4 text-[#E11D48]" />
              <span>Rod & Reel Combo</span>
            </div>
            <span className="text-[11px] text-[#E11D48] font-mono font-bold">Matched Blank</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="label-editorial text-stone-400 block mb-0.5">Rod Specification</span>
              <span className="text-sm font-bold text-[#1C1917] font-display">
                {tackle.rod.length} · {tackle.rod.power} Power
              </span>
              <span className="text-stone-600 block mt-0.5">
                Action: {tackle.rod.action} — {tackle.rod.description}
              </span>
            </div>

            <div className="pt-2 border-t border-stone-100">
              <span className="label-editorial text-stone-400 block mb-0.5">Reel Specification</span>
              <span className="text-sm font-bold text-[#1C1917] font-display">
                {tackle.reel.size} {tackle.reel.type}
              </span>
              <span className="text-stone-600 block mt-0.5">
                Gear Ratio: {tackle.reel.gearRatio} · Drag set to: {tackle.reel.dragSetting}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Mainline & Leader Line */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C1917]">
              <ShieldCheck className="w-4 h-4 text-[#E11D48]" />
              <span>Line & Leader Pairing</span>
            </div>
            <span className="text-[11px] text-[#E11D48] font-mono font-bold">Abrasion Defense</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="label-editorial text-stone-400 block mb-0.5">Main Line</span>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-[#1C1917] font-display">
                  {tackle.mainLine.strengthLb} lb Test
                </span>
                <span className="text-stone-500">({tackle.mainLine.strengthKg} kg · {tackle.mainLine.type})</span>
              </div>
              <span className="text-stone-600 block mt-0.5">
                {tackle.mainLine.reasoning}
              </span>
            </div>

            <div className="pt-2 border-t border-stone-100">
              <span className="label-editorial text-stone-400 block mb-0.5">Shock / Bite Leader</span>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-[#1C1917] font-display">
                  {tackle.leader.strengthLb} lb {tackle.leader.type}
                </span>
                <span className="text-stone-500">({tackle.leader.lengthInches}" / {tackle.leader.lengthCm}cm)</span>
              </div>
              <span className="text-stone-600 block mt-0.5">
                {tackle.leader.reasoning}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Terminal Hook & Sinker */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C1917]">
              <Package className="w-4 h-4 text-[#E11D48]" />
              <span>Hook & Sinker Weight</span>
            </div>
            <span className="text-[11px] text-[#E11D48] font-mono font-bold">Terminal Load</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="label-editorial text-stone-400 block mb-0.5">Hook Design</span>
              <span className="text-sm font-bold text-[#1C1917] font-display">
                {tackle.hook.style} (Size {tackle.hook.size})
              </span>
              <span className="text-stone-600 block mt-0.5">
                {tackle.hook.reasoning}
              </span>
            </div>

            <div className="pt-2 border-t border-stone-100">
              <span className="label-editorial text-stone-400 block mb-0.5">Sinker / Weight</span>
              <span className="text-sm font-bold text-[#1C1917] font-display">
                {tackle.sinker.weightOz} oz ({tackle.sinker.weightGrams}g) {tackle.sinker.style}
              </span>
              <span className="text-stone-600 block mt-0.5">
                {tackle.sinker.reasoning}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Recommended Natural Baits & Lures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Natural / Live Baits */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 space-y-3 shadow-sm">
          <div className="label-editorial text-[#E11D48] flex items-center gap-1.5">
            <Fish className="w-4 h-4" />
            <span>Recommended Live & Cut Baits</span>
          </div>
          <div className="space-y-2">
            {tackle.liveBaits.map((bait, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                <Check className="w-3.5 h-3.5 text-[#E11D48] shrink-0 mt-0.5" />
                <span className="text-[#1C1917] font-bold">{bait}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Artificial Lures */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 space-y-3 shadow-sm">
          <div className="label-editorial text-[#E11D48] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Recommended Artificial Lures & Soft Plastics</span>
          </div>
          <div className="space-y-2">
            {tackle.artificialLures.map((lure, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                <Check className="w-3.5 h-3.5 text-[#E11D48] shrink-0 mt-0.5" />
                <span className="text-[#1C1917] font-bold">{lure}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Angler Packing Checklist */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-bold text-[#1C1917] font-display flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-[#E11D48]" />
              <span>Tackle Bag Pre-Trip Packing Checklist</span>
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Check off gear as you load your tackle box for {areaName || 'the water'}
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#1C1917] px-3 py-1 rounded-full bg-stone-100 border border-stone-200 tabular-nums">
            {completedCount} / {checklistItems.length} Packed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
          {checklistItems.map((item) => {
            const isDone = !!checkedItems[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleCheck(item.id)}
                className={`flex items-start gap-3 p-3 text-left rounded-xl border transition-all text-xs ${
                  isDone 
                    ? 'bg-rose-50/50 border-[#E11D48]/40 text-stone-500 line-through' 
                    : 'bg-stone-50 border-stone-200 text-[#1C1917] hover:border-[#1C1917]'
                }`}
              >
                {isDone ? (
                  <CheckSquare className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                )}
                <span className={isDone ? 'line-through text-stone-400' : 'text-[#1C1917] font-medium'}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
