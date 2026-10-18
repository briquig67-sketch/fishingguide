import React from 'react';
import { FishingEvaluationResult } from '../types/fishing';
import { 
  Gauge, 
  Waves, 
  Wind, 
  Thermometer, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingDown, 
  Sparkles 
} from 'lucide-react';

interface FavorabilityScorecardProps {
  evaluation: FishingEvaluationResult;
}

export const FavorabilityScorecard: React.FC<FavorabilityScorecardProps> = ({ evaluation }) => {
  const { overallScore, verdict, verdictDescription, factors } = evaluation;

  // Verdict style mapping in Variation 1 aesthetic
  const verdictConfig = {
    'PRIME / PEAK BITE': {
      bg: 'bg-[#E11D48] text-white border-transparent',
      badgeBg: 'text-white bg-black/20 border border-white/20',
      icon: Sparkles,
      scoreColor: 'text-white',
      barColor: 'bg-white',
      cardSubtext: 'text-white/80'
    },
    'FAVOURABLE CONDITIONS': {
      bg: 'bg-[#1C1917] text-white border-transparent',
      badgeBg: 'text-[#E11D48] bg-white/10 border border-[#E11D48]/30',
      icon: CheckCircle2,
      scoreColor: 'text-white',
      barColor: 'bg-[#E11D48]',
      cardSubtext: 'text-stone-300'
    },
    'MODERATE / FAIR': {
      bg: 'bg-stone-800 text-white border-transparent',
      badgeBg: 'text-amber-300 bg-amber-500/20 border border-amber-400/30',
      icon: AlertTriangle,
      scoreColor: 'text-white',
      barColor: 'bg-amber-400',
      cardSubtext: 'text-stone-300'
    },
    'TOUGH / SLOW BITE': {
      bg: 'bg-stone-900 text-white border-stone-700',
      badgeBg: 'text-rose-300 bg-rose-500/20 border border-rose-400/30',
      icon: TrendingDown,
      scoreColor: 'text-white',
      barColor: 'bg-rose-500',
      cardSubtext: 'text-stone-300'
    }
  }[verdict];

  const VerdictIcon = verdictConfig.icon;

  const getFactorIcon = (name: string) => {
    if (name.includes('Barometric')) return Gauge;
    if (name.includes('Tidal') || name.includes('Current')) return Waves;
    if (name.includes('Wind')) return Wind;
    return Thermometer;
  };

  const getFactorRatingStyle = (rating: string) => {
    switch (rating) {
      case 'Prime': return 'text-[#E11D48]';
      case 'Favourable': return 'text-[#1C1917]';
      case 'Moderate': return 'text-amber-600';
      default: return 'text-rose-600';
    }
  };

  return (
    <section id="favorability-verdict" className="space-y-6">
      
      {/* Primary Score & Verdict Hero Card */}
      <div className={`rounded-2xl border p-6 md:p-8 ${verdictConfig.bg} shadow-md relative overflow-hidden transition-all`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Left: Verdict & Headline */}
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${verdictConfig.badgeBg}`}>
                <VerdictIcon className="w-3.5 h-3.5" />
                <span>{verdict}</span>
              </span>
              <span className="label-editorial text-white/70">
                [02] Evaluated Angler Index
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-display">
              Fishing Condition Evaluation
            </h2>

            <p className={`text-sm md:text-base leading-relaxed ${verdictConfig.cardSubtext}`}>
              {verdictDescription}
            </p>
          </div>

          {/* Right: Big Numeric Bite Index Dial */}
          <div className="flex items-center gap-5 bg-black/25 backdrop-blur-xs border border-white/15 rounded-2xl p-5 shrink-0 w-full lg:w-auto">
            <div className="text-center">
              <div className="label-editorial text-white/80 mb-1">
                Bite Activity Score
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl md:text-6xl font-extrabold font-mono tabular-nums tracking-tight text-white">
                  {overallScore}
                </span>
                <span className="text-lg text-white/70 font-bold">/100</span>
              </div>
              <div className="w-36 h-2 bg-white/20 rounded-full mt-2.5 overflow-hidden">
                <div 
                  className={`h-full ${verdictConfig.barColor} transition-all duration-700 ease-out`}
                  style={{ width: `${overallScore}%` }}
                />
              </div>
            </div>

            <div className="border-l border-white/20 pl-4 text-xs space-y-1.5 text-white/80 hidden sm:block">
              <div><strong className="text-white">85 - 100:</strong> Prime Blitz</div>
              <div><strong className="text-white">70 - 84:</strong> Favourable</div>
              <div><strong className="text-white">55 - 69:</strong> Moderate</div>
              <div><strong className="text-white">&lt; 55:</strong> Tough Bite</div>
            </div>
          </div>

        </div>
      </div>

      {/* 4-Factor Environmental Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(factors).map(([key, factor]) => {
          const FactorIcon = getFactorIcon(factor.name);
          const ratingColor = getFactorRatingStyle(factor.ratingText);

          return (
            <div 
              key={key} 
              className="bg-white border border-stone-200/90 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-stone-400 transition-colors shadow-2xs"
            >
              <div className="space-y-3">
                
                {/* Header line */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1C1917]">
                    <FactorIcon className="w-4 h-4 text-[#E11D48]" />
                    <span>{factor.name}</span>
                  </div>
                  <span className={`text-xs font-bold font-mono uppercase ${ratingColor}`}>
                    {factor.ratingText} ({factor.score})
                  </span>
                </div>

                {/* Score bar */}
                <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      factor.score >= 85 ? 'bg-[#E11D48]' :
                      factor.score >= 70 ? 'bg-[#1C1917]' :
                      factor.score >= 55 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${factor.score}%` }}
                  />
                </div>

                {/* Headline */}
                <div className="text-sm font-bold text-[#1C1917] leading-snug font-display">
                  {factor.headline}
                </div>

                {/* Detail */}
                <p className="text-xs text-stone-600 leading-relaxed">
                  {factor.detail}
                </p>
              </div>

              {/* Biological insight box */}
              <div className="pt-3 border-t border-stone-100">
                <div className="label-editorial text-stone-400 mb-1">
                  Biological Impact
                </div>
                <p className="text-xs text-stone-700 italic leading-relaxed">
                  "{factor.biologicalInsight}"
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
