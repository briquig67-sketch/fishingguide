import React from 'react';
import { FishingInput, FishSpecies } from '../types/fishing';
import { Gauge, Waves, Wind, Thermometer, Compass } from 'lucide-react';

interface EnvironmentalGaugesProps {
  input: FishingInput;
  species: FishSpecies;
}

export const EnvironmentalGauges: React.FC<EnvironmentalGaugesProps> = ({ input, species }) => {
  const pressureHpa = input.barometerUnit === 'inHg' 
    ? Math.round(input.barometerValue * 33.8639) 
    : input.barometerValue;

  const clampedPressure = Math.max(980, Math.min(1040, pressureHpa));
  const baroAngle = ((clampedPressure - 980) / (1040 - 980)) * 180 - 90;

  const dirAngles: Record<string, number> = {
    N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315
  };
  const windAngle = dirAngles[input.windDirection] || 0;

  const waterTempC = input.tempUnit === 'F'
    ? Math.round((input.waterTemperature - 32) * (5 / 9))
    : input.waterTemperature;

  const { optimalTempMinC, optimalTempMaxC, lethalColdC, lethalWarmC } = species;
  const tempRangeSpan = lethalWarmC - lethalColdC;
  const currentTempPercent = Math.max(0, Math.min(100, ((waterTempC - lethalColdC) / tempRangeSpan) * 100));
  const optimalMinPercent = Math.max(0, Math.min(100, ((optimalTempMinC - lethalColdC) / tempRangeSpan) * 100));
  const optimalMaxPercent = Math.max(0, Math.min(100, ((optimalTempMaxC - lethalColdC) / tempRangeSpan) * 100));

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-stone-200">
        <div className="label-editorial text-[#1C1917] flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#E11D48]" />
          <span>[03] Environmental Telemetry & Atmospheric Gauges</span>
        </div>
        <span className="text-xs text-stone-400 font-mono">Analog Instruments</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* DIAL 1: Analog Barometer Gauge */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1C1917] flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-[#E11D48]" />
              <span>Atmospheric Pressure</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#1C1917] tabular-nums">
              {input.barometerValue} {input.barometerUnit}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center pt-2">
            <svg viewBox="0 0 160 90" className="w-40 overflow-visible">
              <path
                d="M 20 80 A 60 60 0 0 1 140 80"
                fill="none"
                stroke="#e7e5e4"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M 55 35 A 60 60 0 0 1 120 40"
                fill="none"
                stroke="#E11D48"
                strokeWidth="10"
                strokeOpacity="0.25"
              />
              <g transform={`rotate(${baroAngle} 80 80)`}>
                <line x1="80" y1="80" x2="80" y2="28" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="80" cy="80" r="5" fill="#E11D48" />
              </g>
              <text x="20" y="90" fontSize="8" fill="#a8a29e" fontFamily="JetBrains Mono">980</text>
              <text x="80" y="70" fontSize="9" fill="#1C1917" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="bold">1013</text>
              <text x="140" y="90" fontSize="8" fill="#a8a29e" textAnchor="end" fontFamily="JetBrains Mono">1040</text>
            </svg>

            <div className="text-center mt-2">
              <div className="text-xs font-bold text-[#1C1917] capitalize">
                {input.barometerTendency} Tendency
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                {input.barometerTendency === 'falling' ? 'Pre-frontal drop: aggressive bite' : input.barometerTendency === 'rising' ? 'Post-frontal rise: lockjaw cover' : 'Stable: regular rhythm'}
              </div>
            </div>
          </div>
        </div>

        {/* DIAL 2: Sinusoidal Tidal Wave Curve */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1C1917] flex items-center gap-1.5">
              <Waves className="w-4 h-4 text-[#E11D48]" />
              <span>Tidal Stage Curve</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#1C1917] capitalize">
              {input.tideMovement.replace('_', ' ')}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center pt-2">
            <svg viewBox="0 0 160 80" className="w-full h-24">
              <path
                d="M 10 40 Q 45 10, 80 40 T 150 40"
                fill="none"
                stroke="#1C1917"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 10 40 Q 45 10, 80 40 T 150 40 L 150 75 L 10 75 Z"
                fill="#1C1917"
                fillOpacity="0.04"
              />

              {input.tideMovement === 'rising' && (
                <>
                  <circle cx="45" cy="22" r="5" fill="#E11D48" stroke="#fff" strokeWidth="1.5" />
                  <text x="45" y="14" textAnchor="middle" fill="#E11D48" fontSize="8" fontWeight="bold">FLOOD</text>
                </>
              )}
              {input.tideMovement === 'high_slack' && (
                <>
                  <circle cx="80" cy="40" r="5" fill="#E11D48" stroke="#fff" strokeWidth="1.5" />
                  <text x="80" y="30" textAnchor="middle" fill="#E11D48" fontSize="8" fontWeight="bold">HIGH SLACK</text>
                </>
              )}
              {input.tideMovement === 'falling' && (
                <>
                  <circle cx="115" cy="58" r="5" fill="#E11D48" stroke="#fff" strokeWidth="1.5" />
                  <text x="115" y="72" textAnchor="middle" fill="#E11D48" fontSize="8" fontWeight="bold">EBB</text>
                </>
              )}
              {input.tideMovement === 'low_slack' && (
                <>
                  <circle cx="145" cy="40" r="5" fill="#E11D48" stroke="#fff" strokeWidth="1.5" />
                  <text x="140" y="30" textAnchor="middle" fill="#E11D48" fontSize="8" fontWeight="bold">LOW SLACK</text>
                </>
              )}
            </svg>

            <div className="text-center mt-1">
              <div className="text-xs font-bold text-[#1C1917] capitalize">
                {input.tidePhase} Tide Cycle
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                {input.tideMovement === 'rising' ? 'Water flooding onto flats' : input.tideMovement === 'falling' ? 'Water draining to gutters' : 'Current velocity stalled'}
              </div>
            </div>
          </div>
        </div>

        {/* DIAL 3: Wind Compass Rose */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1C1917] flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-[#E11D48]" />
              <span>Wind Vector</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#1C1917] tabular-nums">
              {input.windSpeed} {input.windSpeedUnit} · {input.windDirection}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center pt-2">
            <svg viewBox="0 0 100 100" className="w-24 h-24">
              <circle cx="50" cy="50" r="42" fill="#fafaf9" stroke="#d6d3d1" strokeWidth="1.5" />
              <line x1="50" y1="12" x2="50" y2="88" stroke="#e7e5e4" strokeWidth="1" />
              <line x1="12" y1="50" x2="88" y2="50" stroke="#e7e5e4" strokeWidth="1" />
              
              <text x="50" y="22" textAnchor="middle" fontSize="8" fill="#1C1917" fontWeight="bold">N</text>
              <text x="82" y="53" textAnchor="middle" fontSize="8" fill="#a8a29e">E</text>
              <text x="50" y="84" textAnchor="middle" fontSize="8" fill="#a8a29e">S</text>
              <text x="18" y="53" textAnchor="middle" fontSize="8" fill="#a8a29e">W</text>

              <g transform={`rotate(${windAngle} 50 50)`}>
                <line x1="50" y1="78" x2="50" y2="24" stroke="#E11D48" strokeWidth="2.5" />
                <polygon points="50,18 45,28 55,28" fill="#E11D48" />
              </g>
            </svg>

            <div className="text-center mt-2">
              <div className="text-xs font-bold text-[#1C1917] capitalize">
                {input.windShoreRelation.replace('_', ' ')}
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                {input.windShoreRelation === 'onshore' ? 'Bait pushed into breakers' : 'Surf flattened, easy casting'}
              </div>
            </div>
          </div>
        </div>

        {/* DIAL 4: Thermal Comfort Scale */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1C1917] flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-[#E11D48]" />
              <span>Thermal Zone</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#E11D48] tabular-nums">
              {input.waterTemperature}°{input.tempUnit}
            </span>
          </div>

          <div className="space-y-3 pt-2">
            <div className="text-xs text-stone-700">
              Optimal Band for {species.commonName.split(' ')[0]}:
              <strong className="text-[#1C1917] block mt-0.5 font-bold">
                {optimalTempMinC}°C - {optimalTempMaxC}°C ({Math.round(optimalTempMinC * 1.8 + 32)}°F - {Math.round(optimalTempMaxC * 1.8 + 32)}°F)
              </strong>
            </div>

            <div className="relative w-full h-3 bg-stone-100 rounded-full border border-stone-200 overflow-hidden">
              <div 
                className="absolute top-0 bottom-0 bg-[#E11D48]/30 border-x border-[#E11D48]"
                style={{ 
                  left: `${optimalMinPercent}%`, 
                  width: `${optimalMaxPercent - optimalMinPercent}%` 
                }}
              />
              <div 
                className="absolute top-0 bottom-0 w-2.5 bg-[#1C1917] -ml-1 rounded-full shadow"
                style={{ left: `${currentTempPercent}%` }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-stone-500 font-mono font-medium">
              <span>{lethalColdC}°C</span>
              <span className="text-[#E11D48] font-bold">Optimal</span>
              <span>{lethalWarmC}°C</span>
            </div>

            <div className="text-[11px] text-stone-600 pt-1">
              {waterTempC >= optimalTempMinC && waterTempC <= optimalTempMaxC
                ? 'Fish metabolic rate is at its peak feeding window.'
                : waterTempC < optimalTempMinC
                  ? 'Chilly water: slower digestion, slow down retrieve.'
                  : 'Warm water: hunt low-light dawn/dusk tides.'}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
