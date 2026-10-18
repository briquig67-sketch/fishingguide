import React, { useState } from 'react';
import { RigDefinition } from '../types/fishing';
import { Anchor, Sparkles, HelpCircle, Layers, Check, ChevronRight } from 'lucide-react';
import tackleImage from '../assets/images/tackle_rigs_deck_1792283287433.jpg';

interface RigVisualizerProps {
  primaryRig: RigDefinition;
  alternativeRig: RigDefinition;
}

export const RigVisualizer: React.FC<RigVisualizerProps> = ({ primaryRig, alternativeRig }) => {
  const [activeRigType, setActiveRigType] = useState<'primary' | 'alternative'>('primary');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const activeRig = activeRigType === 'primary' ? primaryRig : alternativeRig;
  const activeNode = activeRig.schematicNodes.find(n => n.id === selectedNodeId) || activeRig.schematicNodes[0];

  return (
    <section id="rig-schematic" className="space-y-6">
      
      {/* Section Header with Rig Selector Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <div className="label-editorial text-[#1C1917] flex items-center gap-1.5 mb-1">
            <Anchor className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>[04] Terminal Rig Blueprint Schematic</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#1C1917] font-display">
            {activeRig.name}
          </h3>
        </div>

        {/* Primary vs Alternative Rig Segmented Switch */}
        <div className="inline-flex rounded-full p-1 bg-stone-100 border border-stone-200 shrink-0">
          <button
            type="button"
            onClick={() => {
              setActiveRigType('primary');
              setSelectedNodeId(null);
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
              activeRigType === 'primary'
                ? 'bg-[#1C1917] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>Primary Setup</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveRigType('alternative');
              setSelectedNodeId(null);
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
              activeRigType === 'alternative'
                ? 'bg-[#1C1917] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Backup Rig</span>
          </button>
        </div>
      </div>

      {/* Rig Summary & Tactical Rationale */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Interactive SVG Schematic (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-stone-200/90 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-bold text-[#1C1917]">Terminal Line Architecture</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-stone-500 font-mono text-[11px]">
              <HelpCircle className="w-3.5 h-3.5 text-[#E11D48]" /> Click nodes to inspect specifications
            </span>
          </div>

          {/* SVG Canvas */}
          <div className="relative w-full h-64 md:h-72 bg-[#F8F7F4] rounded-xl border border-stone-200 overflow-hidden flex items-center justify-center p-2">
            
            {/* Grid background */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-light" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#1C1917" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-light)" />
            </svg>

            {/* Connecting Rig Lines */}
            <svg className="w-full h-full relative z-10" viewBox="0 0 500 250">
              {/* Main Line path */}
              <line 
                x1="20" y1="110" 
                x2="150" y2="110" 
                stroke="#1C1917" 
                strokeWidth="2.5" 
                strokeDasharray="4 2" 
              />
              <text x="30" y="98" fill="#1C1917" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">Main Line (Braid)</text>

              {/* Sinker branch line if bottom rig */}
              {activeRig.id !== 'freeline_live_bait' && (
                <>
                  <line x1="150" y1="110" x2="150" y2="195" stroke="#78716c" strokeWidth="2" strokeDasharray="2 2" />
                  <circle cx="150" cy="200" r="14" fill="#e7e5e4" stroke="#1C1917" strokeWidth="2" />
                  <text x="150" y="204" textAnchor="middle" fill="#1C1917" fontSize="9" fontWeight="bold">LEAD</text>
                </>
              )}

              {/* Swivel element */}
              <rect x="230" y="105" width="24" height="10" rx="3" fill="#1C1917" stroke="#1C1917" strokeWidth="1" />
              <line x1="150" y1="110" x2="230" y2="110" stroke="#1C1917" strokeWidth="2" />

              {/* Leader Line */}
              <line x1="254" y1="110" x2="410" y2="110" stroke="#0284c7" strokeWidth="2" />
              <text x="290" y="98" fill="#0284c7" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">Fluorocarbon Leader</text>

              {/* Hook & Bait */}
              <path 
                d="M 410 110 L 440 110 C 460 110 465 130 450 145 C 440 152 430 145 432 135" 
                fill="none" 
                stroke="#E11D48" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
              />
              <circle cx="432" cy="135" r="3.5" fill="#E11D48" />
              
              {/* Bait representation */}
              <ellipse cx="445" cy="125" rx="16" ry="6" fill="#E11D48" fillOpacity="0.15" stroke="#E11D48" strokeWidth="1.5" />
              <text x="445" y="128" textAnchor="middle" fill="#E11D48" fontSize="8" fontWeight="bold">BAIT</text>

              {/* Interactive Node Hotspots */}
              {activeRig.schematicNodes.map((node) => {
                const isSelected = selectedNodeId === node.id || (!selectedNodeId && node.id === activeRig.schematicNodes[0].id);
                const cx = (node.x / 100) * 460 + 20;
                const cy = (node.y / 100) * 190 + 30;

                return (
                  <g 
                    key={node.id} 
                    className="cursor-pointer group"
                    onClick={() => setSelectedNodeId(node.id)}
                  >
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={isSelected ? 10 : 7} 
                      className={`transition-all duration-200 ${
                        isSelected 
                          ? 'fill-[#E11D48] stroke-white stroke-2 shadow-md' 
                          : 'fill-white stroke-[#1C1917] stroke-2 group-hover:fill-[#E11D48]'
                      }`} 
                    />
                    <text 
                      x={cx} 
                      y={cy - 12} 
                      textAnchor="middle" 
                      fill={isSelected ? '#E11D48' : '#1C1917'} 
                      fontSize="9" 
                      fontWeight="bold"
                      fontFamily="JetBrains Mono"
                      className="pointer-events-none select-none"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Node detail drawer */}
          {activeNode && (
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
                  <span className="text-xs font-bold text-[#1C1917] uppercase tracking-wider font-mono">
                    {activeNode.label}
                  </span>
                  <span className="text-xs text-[#E11D48] font-mono font-bold">
                    [{activeNode.description}]
                  </span>
                </div>
                <span className="text-[11px] text-stone-500 font-mono">
                  Component Spec
                </span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                {activeNode.specification}
              </p>
            </div>
          )}
        </div>

        {/* Right: Rig Mechanics & Knots (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Why Ideal Card */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-5 space-y-3 shadow-2xs">
            <h4 className="label-editorial text-[#E11D48]">
              Why This Rig Fits Today
            </h4>
            <p className="text-xs text-stone-700 leading-relaxed">
              {activeRig.whyIdeal}
            </p>
            <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
              <div className="flex items-start gap-2 text-stone-800">
                <Check className="w-3.5 h-3.5 text-[#E11D48] shrink-0 mt-0.5" />
                <span><strong>Line:</strong> {activeRig.mainLineRecommendation}</span>
              </div>
              <div className="flex items-start gap-2 text-stone-800">
                <Check className="w-3.5 h-3.5 text-[#E11D48] shrink-0 mt-0.5" />
                <span><strong>Leader:</strong> {activeRig.leaderRecommendation}</span>
              </div>
              <div className="flex items-start gap-2 text-stone-800">
                <Check className="w-3.5 h-3.5 text-[#E11D48] shrink-0 mt-0.5" />
                <span><strong>Hook:</strong> {activeRig.hookRecommendation}</span>
              </div>
              <div className="flex items-start gap-2 text-stone-800">
                <Check className="w-3.5 h-3.5 text-[#E11D48] shrink-0 mt-0.5" />
                <span><strong>Sinker:</strong> {activeRig.sinkerRecommendation}</span>
              </div>
            </div>
          </div>

          {/* Recommended Knots */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-5 space-y-3 shadow-2xs">
            <h4 className="label-editorial text-stone-600">
              Essential Knots
            </h4>
            <div className="space-y-2">
              {activeRig.knots.map((knot, i) => (
                <div key={i} className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                  <div className="text-xs font-bold text-[#1C1917] flex items-center justify-between">
                    <span>{knot.name}</span>
                    <ChevronRight className="w-3 h-3 text-[#E11D48]" />
                  </div>
                  <p className="text-[11px] text-stone-600 mt-1 leading-normal">
                    {knot.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tackle Photo */}
          <div className="rounded-2xl border border-stone-200 overflow-hidden relative group">
            <img 
              src={tackleImage} 
              alt="Marine tackle components on boat deck" 
              className="w-full h-32 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-3">
              <span className="text-[11px] text-white font-medium">
                Terminal tackle array: circle hooks, pyramid lead & fluorocarbon
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
