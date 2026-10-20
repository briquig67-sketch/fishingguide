import React from 'react';
import { 
  FishingInput, 
  PressureUnit, 
  SpeedUnit, 
  TempUnit, 
  WindDirection, 
  TideMovement,
  WaterEnvironment,
  WaterClarity
} from '../types/fishing';
import { FISH_SPECIES_LIST } from '../data/fishSpecies';
import { PRESET_SCENARIOS, ScenarioPreset } from '../data/presets';
import { 
  MapPin, 
  Gauge, 
  Wind, 
  Waves, 
  Thermometer, 
  Fish, 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus,
  Sparkles
} from 'lucide-react';

interface ConditionsFormProps {
  input: FishingInput;
  onChange: (updated: FishingInput) => void;
  onApplyPreset: (preset: ScenarioPreset) => void;
}

const WIND_DIRECTIONS: WindDirection[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

const ENVIRONMENTS: { id: WaterEnvironment; label: string; iconLabel: string }[] = [
  { id: 'surf_beach', label: 'Surf & Ocean Beach', iconLabel: 'Surf' },
  { id: 'inshore_flats', label: 'Inshore Flats & Grass', iconLabel: 'Flats' },
  { id: 'estuary_inlet', label: 'Estuary, Pass & Inlet', iconLabel: 'Inlet' },
  { id: 'rocky_point', label: 'Rocky Point & Jetty', iconLabel: 'Rocks' },
  { id: 'coastal_bay', label: 'Coastal Bay & Harbor', iconLabel: 'Bay' },
  { id: 'offshore_reef', label: 'Offshore Reef & Blue', iconLabel: 'Offshore' },
  { id: 'freshwater_lake', label: 'Freshwater Lake / Reservoir', iconLabel: 'Lake' },
  { id: 'freshwater_river', label: 'Freshwater River / Creek', iconLabel: 'River' }
];

const PPB_FISH_IDS = [
  'snapper_pink',
  'king_george_whiting',
  'southern_calamari',
  'sand_flathead',
  'gummy_shark',
  'australian_salmon',
  'black_bream_vic',
  'southern_garfish',
  'yellowtail_kingfish',
  'silver_trevally',
  'yellow_eye_mullet'
];

interface PPBHotspot {
  label: string;
  fullName: string;
  fishId: string;
  environment: WaterEnvironment;
  barometer: number;
  windSpeed: number;
  windDir: WindDirection;
  tempWater: number;
}

const PPB_HOTSPOTS: PPBHotspot[] = [
  { label: 'Carrum 18m Mud (Snapper)', fullName: 'Port Phillip Bay (Carrum to Mornington 18m Mud)', fishId: 'snapper_pink', environment: 'coastal_bay', barometer: 1013, windSpeed: 14, windDir: 'SW', tempWater: 16.5 },
  { label: 'Mornington Pier & Reef', fullName: 'Port Phillip Bay (Mornington Pier & Schnapper Point)', fishId: 'snapper_pink', environment: 'rocky_point', barometer: 1014, windSpeed: 12, windDir: 'SW', tempWater: 16.5 },
  { label: 'St Leonards / Queenscliff (Whiting)', fullName: 'Port Phillip Bay (St Leonards Weed & Sand Channels)', fishId: 'king_george_whiting', environment: 'coastal_bay', barometer: 1019, windSpeed: 8, windDir: 'S', tempWater: 17 },
  { label: 'Portsea / Sorrento (Calamari)', fullName: 'Port Phillip Bay (Portsea & Sorrento Kelp Flats)', fishId: 'southern_calamari', environment: 'coastal_bay', barometer: 1018, windSpeed: 6, windDir: 'SE', tempWater: 16.5 },
  { label: 'South Channel (Gummy Shark)', fullName: 'Port Phillip Bay (South Channel & Mud Islands)', fishId: 'gummy_shark', environment: 'coastal_bay', barometer: 1014, windSpeed: 12, windDir: 'S', tempWater: 17 },
  { label: 'Black Rock / Beaumaris (Flathead)', fullName: 'Port Phillip Bay (Black Rock & Beaumaris Sand Flats)', fishId: 'sand_flathead', environment: 'coastal_bay', barometer: 1015, windSpeed: 10, windDir: 'SW', tempWater: 17.5 },
  { label: 'The Rip / Port Phillip Heads (Salmon)', fullName: 'Port Phillip Bay (The Rip & Point Nepean)', fishId: 'australian_salmon', environment: 'coastal_bay', barometer: 1011, windSpeed: 16, windDir: 'SW', tempWater: 15.5 },
  { label: 'Patterson River / Lakes (Bream)', fullName: 'Port Phillip Bay (Patterson River & Canals)', fishId: 'black_bream_vic', environment: 'estuary_inlet', barometer: 1017, windSpeed: 7, windDir: 'S', tempWater: 18 }
];

export const ConditionsForm: React.FC<ConditionsFormProps> = ({ input, onChange, onApplyPreset }) => {
  const isFreshwater = input.environment === 'freshwater_lake' || input.environment === 'freshwater_river';

  const handleUpdate = <K extends keyof FishingInput>(key: K, value: FishingInput[K]) => {
    onChange({
      ...input,
      [key]: value
    });
  };

  const handleUnitToggleBaro = (newUnit: PressureUnit) => {
    if (newUnit === input.barometerUnit) return;
    let converted = input.barometerValue;
    if (newUnit === 'inHg') {
      converted = Number((input.barometerValue * 0.02953).toFixed(2));
    } else {
      converted = Math.round(input.barometerValue * 33.8639);
    }
    onChange({
      ...input,
      barometerUnit: newUnit,
      barometerValue: converted
    });
  };

  const handleUnitToggleTemp = (newUnit: TempUnit) => {
    if (newUnit === input.tempUnit) return;
    let air = input.airTemperature;
    let water = input.waterTemperature;
    if (newUnit === 'F') {
      air = Math.round(air * 1.8 + 32);
      water = Math.round(water * 1.8 + 32);
    } else {
      air = Math.round((air - 32) * (5 / 9));
      water = Math.round((water - 32) * (5 / 9));
    }
    onChange({
      ...input,
      tempUnit: newUnit,
      airTemperature: air,
      waterTemperature: water
    });
  };

  const handleUnitToggleWind = (newUnit: SpeedUnit) => {
    if (newUnit === input.windSpeedUnit) return;
    let speed = input.windSpeed;
    let knots = speed;
    if (input.windSpeedUnit === 'mph') knots = speed * 0.868976;
    if (input.windSpeedUnit === 'kmh') knots = speed * 0.539957;

    let converted = Math.round(knots);
    if (newUnit === 'mph') converted = Math.round(knots * 1.15078);
    if (newUnit === 'kmh') converted = Math.round(knots * 1.852);

    onChange({
      ...input,
      windSpeedUnit: newUnit,
      windSpeed: converted
    });
  };

  return (
    <section id="conditions-entry" className="space-y-6">
      
      {/* Preset Quick Loader Strip */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="label-editorial text-[#E11D48] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Port Phillip Bay & Victorian Field Scenarios</span>
          </div>
          <span className="text-xs text-stone-500">1-click authentic environmental data · Victoria, Australia</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {PRESET_SCENARIOS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset)}
              className="text-left p-3 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-white hover:border-[#1C1917] transition-all group shadow-2xs"
            >
              <div className="text-xs font-bold text-[#1C1917] group-hover:text-[#E11D48] truncate">
                {preset.title}
              </div>
              <div className="text-[11px] text-stone-500 truncate mt-0.5 font-medium">
                {preset.badge}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Input Grid */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 md:p-8 space-y-8 shadow-sm">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="label-editorial text-[#1C1917]">
            [01] Conditions Entry & Parameters
          </div>
          <span className="text-xs text-stone-400 font-mono">Port Phillip Bay · Victoria AU</span>
        </div>

        {/* ROW 1: Area & Target Fish */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-stone-200">
          
          {/* Fishing Area Name */}
          <div className="md:col-span-4 space-y-2">
            <label className="label-editorial text-stone-600 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>Fishing Area / Waterway</span>
            </label>
            <input
              type="text"
              value={input.areaName}
              onChange={(e) => handleUpdate('areaName', e.target.value)}
              placeholder="e.g. Port Phillip Bay (Mornington 18m Mud), Carrum Bight, St Leonards"
              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-[#1C1917] placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917]"
            />

            {/* Quick Port Phillip Bay Hotspots */}
            <div className="pt-2">
              <div className="text-[10px] uppercase tracking-wider font-bold text-stone-500 font-mono mb-1.5 flex items-center justify-between">
                <span>Port Phillip Bay Hotspots:</span>
                <span className="text-[#E11D48] font-bold">Quick Set</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                {PPB_HOTSPOTS.map((spot) => (
                  <button
                    key={spot.label}
                    type="button"
                    onClick={() => {
                      onChange({
                        ...input,
                        areaName: spot.fullName,
                        targetedFishId: spot.fishId,
                        environment: spot.environment,
                        barometerValue: spot.barometer,
                        windSpeed: spot.windSpeed,
                        windDirection: spot.windDir,
                        waterTemperature: spot.tempWater
                      });
                    }}
                    className="px-2.5 py-1 text-[11px] font-semibold rounded-full border border-stone-200 bg-stone-50 hover:bg-[#1C1917] hover:text-white hover:border-[#1C1917] text-stone-700 transition-all text-left"
                  >
                    {spot.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Environment Type */}
          <div className="md:col-span-4 space-y-2">
            <label className="label-editorial text-stone-600 block">
              Environment Type
            </label>
            <select
              value={input.environment}
              onChange={(e) => handleUpdate('environment', e.target.value as WaterEnvironment)}
              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-[#1C1917] focus:bg-white focus:outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917]"
            >
              {ENVIRONMENTS.map((env) => (
                <option key={env.id} value={env.id}>
                  {env.label}
                </option>
              ))}
            </select>
          </div>

          {/* Targeted Fish Species */}
          <div className="md:col-span-4 space-y-2">
            <label className="label-editorial text-stone-600 flex items-center gap-1.5">
              <Fish className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>Targeted Fish Species</span>
            </label>
            <select
              value={input.targetedFishId}
              onChange={(e) => handleUpdate('targetedFishId', e.target.value)}
              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-[#1C1917] focus:bg-white focus:outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917]"
            >
              <optgroup label="Port Phillip Bay & Victorian Marine Species">
                {FISH_SPECIES_LIST.filter(f => PPB_FISH_IDS.includes(f.id)).map((fish) => (
                  <option key={fish.id} value={fish.id}>
                    {fish.commonName}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Other Australian Marine & Saltwater Species">
                {FISH_SPECIES_LIST.filter(f => f.environmentType === 'saltwater' && !PPB_FISH_IDS.includes(f.id)).map((fish) => (
                  <option key={fish.id} value={fish.id}>
                    {fish.commonName}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Australian Native Freshwater & Estuary Species">
                {FISH_SPECIES_LIST.filter(f => f.environmentType === 'freshwater').map((fish) => (
                  <option key={fish.id} value={fish.id}>
                    {fish.commonName}
                  </option>
                ))}
              </optgroup>
              <option value="custom">Custom Australian Species...</option>
            </select>

            {input.targetedFishId === 'custom' && (
              <input
                type="text"
                value={input.customFishName || ''}
                onChange={(e) => handleUpdate('customFishName', e.target.value)}
                placeholder="Enter custom species name..."
                className="w-full mt-2 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
              />
            )}
          </div>
        </div>

        {/* ROW 2: Barometer & Pressure Tendency */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-stone-200">
          
          {/* Barometer Reading */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="label-editorial text-stone-600 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>Barometer Reading</span>
              </label>
              
              {/* Unit Toggle */}
              <div className="inline-flex rounded-full p-0.5 bg-stone-100 border border-stone-200">
                <button
                  type="button"
                  onClick={() => handleUnitToggleBaro('hPa')}
                  className={`px-3 py-0.5 text-xs font-bold rounded-full transition-colors ${
                    input.barometerUnit === 'hPa' ? 'bg-[#1C1917] text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  hPa
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitToggleBaro('inHg')}
                  className={`px-3 py-0.5 text-xs font-bold rounded-full transition-colors ${
                    input.barometerUnit === 'inHg' ? 'bg-[#1C1917] text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  inHg
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="number"
                step={input.barometerUnit === 'inHg' ? '0.01' : '1'}
                value={input.barometerValue}
                onChange={(e) => handleUpdate('barometerValue', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-base font-bold text-[#1C1917] tabular-nums focus:bg-white focus:outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917]"
              />
              <span className="absolute right-4 top-3 text-xs text-stone-500 font-mono font-medium">
                {input.barometerUnit}
              </span>
            </div>
            <p className="text-[11px] text-stone-500">
              Mean sea-level reference: 1013.25 hPa / 29.92 inHg
            </p>
          </div>

          {/* Barometer Tendency (Rising, Falling, Stable) */}
          <div className="md:col-span-7 space-y-2">
            <label className="label-editorial text-stone-600 block">
              Pressure Tendency (6-Hour Trend)
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleUpdate('barometerTendency', 'falling')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full border text-xs font-bold transition-all ${
                  input.barometerTendency === 'falling'
                    ? 'bg-[#E11D48] border-[#E11D48] text-white shadow-sm'
                    : 'bg-white border-stone-300 text-stone-700 hover:border-[#1C1917]'
                }`}
              >
                <ArrowDownRight className="w-3.5 h-3.5" />
                <span>Falling (Pre-Front)</span>
              </button>

              <button
                type="button"
                onClick={() => handleUpdate('barometerTendency', 'stable')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full border text-xs font-bold transition-all ${
                  input.barometerTendency === 'stable'
                    ? 'bg-[#1C1917] border-[#1C1917] text-white shadow-sm'
                    : 'bg-white border-stone-300 text-stone-700 hover:border-[#1C1917]'
                }`}
              >
                <Minus className="w-3.5 h-3.5" />
                <span>Stable (Normal)</span>
              </button>

              <button
                type="button"
                onClick={() => handleUpdate('barometerTendency', 'rising')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full border text-xs font-bold transition-all ${
                  input.barometerTendency === 'rising'
                    ? 'bg-sky-600 border-sky-600 text-white shadow-sm'
                    : 'bg-white border-stone-300 text-stone-700 hover:border-[#1C1917]'
                }`}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>Rising (Post-Front)</span>
              </button>
            </div>
            <p className="text-[11px] text-stone-500">
              {input.barometerTendency === 'falling' && 'Falling pressure triggers rapid feeding surge prior to weather disturbance.'}
              {input.barometerTendency === 'stable' && 'Stable pressure establishes predictable tidal and light feeding habits.'}
              {input.barometerTendency === 'rising' && 'Rising pressure compresses fish swim bladders; mandates slow finesse presentations.'}
            </p>
          </div>
        </div>

        {/* ROW 3: Wind Speed, Direction & Shore Vector */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-stone-200">
          
          {/* Wind Speed */}
          <div className="md:col-span-4 space-y-2">
            <div className="flex items-center justify-between">
              <label className="label-editorial text-stone-600 flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>Wind Speed</span>
              </label>
              
              {/* Unit Toggle */}
              <div className="inline-flex rounded-full p-0.5 bg-stone-100 border border-stone-200">
                <button
                  type="button"
                  onClick={() => handleUnitToggleWind('knots')}
                  className={`px-2.5 py-0.5 text-xs font-bold rounded-full transition-colors ${
                    input.windSpeedUnit === 'knots' ? 'bg-[#1C1917] text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  kts
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitToggleWind('mph')}
                  className={`px-2.5 py-0.5 text-xs font-bold rounded-full transition-colors ${
                    input.windSpeedUnit === 'mph' ? 'bg-[#1C1917] text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  mph
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitToggleWind('kmh')}
                  className={`px-2.5 py-0.5 text-xs font-bold rounded-full transition-colors ${
                    input.windSpeedUnit === 'kmh' ? 'bg-[#1C1917] text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  km/h
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="number"
                min="0"
                max="70"
                value={input.windSpeed}
                onChange={(e) => handleUpdate('windSpeed', Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-base font-bold text-[#1C1917] tabular-nums focus:bg-white focus:outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917]"
              />
              <span className="absolute right-4 top-3 text-xs text-stone-500 font-mono font-medium">
                {input.windSpeedUnit}
              </span>
            </div>
            <p className="text-[11px] text-stone-500">
              {input.windSpeed <= 4 ? 'Light air / Glass calm' : input.windSpeed <= 15 ? 'Moderate chop (Prime surface cover)' : 'Strong wind / Heavy drift current'}
            </p>
          </div>

          {/* Wind Direction (8-point rose) */}
          <div className="md:col-span-4 space-y-2">
            <label className="label-editorial text-stone-600 block">
              Wind Blowing From
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {WIND_DIRECTIONS.map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => handleUpdate('windDirection', dir)}
                  className={`py-2 px-1 text-xs font-bold rounded-lg border transition-all ${
                    input.windDirection === dir
                      ? 'bg-[#1C1917] border-[#1C1917] text-white'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                  }`}
                >
                  {dir}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-500 font-medium">
              Vector: Originating from {input.windDirection}
            </p>
          </div>

          {/* Shoreline Orientation */}
          <div className="md:col-span-4 space-y-2">
            <label className="label-editorial text-stone-600 block">
              Shoreline Relation
            </label>
            <select
              value={input.windShoreRelation}
              onChange={(e) => handleUpdate('windShoreRelation', e.target.value as any)}
              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-[#1C1917] focus:bg-white focus:outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917]"
            >
              <option value="onshore">Onshore (Blowing onto shore / piling bait)</option>
              <option value="offshore">Offshore (Blowing out / flattening surf)</option>
              <option value="cross_shore">Cross-shore (Sweeping current along beach)</option>
              <option value="protected">Protected Cove / Leeward Basin</option>
            </select>
            <p className="text-[11px] text-stone-500">
              {input.windShoreRelation === 'onshore' ? 'Onshore concentrates baitfish in surf trough.' : 'Offshore enables long casts and clean surf.'}
            </p>
          </div>
        </div>

        {/* ROW 4: Tidal Movement & Moon Phase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-stone-200">
          
          <div className="md:col-span-6 space-y-2">
            <label className="label-editorial text-stone-600 flex items-center gap-1.5">
              <Waves className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>{isFreshwater ? 'Water Current Flow' : 'Tidal Movement & Stage'}</span>
            </label>

            {isFreshwater ? (
              <div className="grid grid-cols-3 gap-2">
                {(['moderate', 'swift', 'slack'] as const).map((flow) => (
                  <button
                    key={flow}
                    type="button"
                    onClick={() => handleUpdate('freshwaterFlowRate', flow)}
                    className={`py-2.5 px-3 rounded-full border text-xs font-bold capitalize transition-all ${
                      input.freshwaterFlowRate === flow
                        ? 'bg-[#1C1917] border-[#1C1917] text-white shadow-sm'
                        : 'bg-white border-stone-300 text-stone-700 hover:border-[#1C1917]'
                    }`}
                  >
                    {flow} Flow
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdate('tideMovement', 'rising')}
                  className={`py-2.5 px-2 text-center rounded-full border text-xs font-bold transition-all ${
                    input.tideMovement === 'rising'
                      ? 'bg-[#1C1917] border-[#1C1917] text-white shadow-sm'
                      : 'bg-white border-stone-300 text-stone-700 hover:border-[#1C1917]'
                  }`}
                >
                  Rising (Flood)
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdate('tideMovement', 'falling')}
                  className={`py-2.5 px-2 text-center rounded-full border text-xs font-bold transition-all ${
                    input.tideMovement === 'falling'
                      ? 'bg-[#1C1917] border-[#1C1917] text-white shadow-sm'
                      : 'bg-white border-stone-300 text-stone-700 hover:border-[#1C1917]'
                  }`}
                >
                  Falling (Ebb)
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdate('tideMovement', 'high_slack')}
                  className={`py-2.5 px-2 text-center rounded-full border text-xs font-bold transition-all ${
                    input.tideMovement === 'high_slack'
                      ? 'bg-[#1C1917] border-[#1C1917] text-white shadow-sm'
                      : 'bg-white border-stone-300 text-stone-700 hover:border-[#1C1917]'
                  }`}
                >
                  High Slack
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdate('tideMovement', 'low_slack')}
                  className={`py-2.5 px-2 text-center rounded-full border text-xs font-bold transition-all ${
                    input.tideMovement === 'low_slack'
                      ? 'bg-[#1C1917] border-[#1C1917] text-white shadow-sm'
                      : 'bg-white border-stone-300 text-stone-700 hover:border-[#1C1917]'
                  }`}
                >
                  Low Slack
                </button>
              </div>
            )}
            <p className="text-[11px] text-stone-500">
              {input.tideMovement === 'rising' && 'Rising: Floods flats and shallows with fresh food. Active patrol window.'}
              {input.tideMovement === 'falling' && 'Falling: Drains bait out of marsh cuts into main channel ambush points.'}
              {input.tideMovement === 'high_slack' && 'Full Slack: Current stalls; fish scatter widely across deep flats.'}
              {input.tideMovement === 'low_slack' && 'Low Slack: Stagnant minimum depth; fish concentrate in holes.'}
            </p>
          </div>

          {/* Tidal Coefficient / Moon Cycle */}
          <div className="md:col-span-6 space-y-2">
            <label className="label-editorial text-stone-600 block">
              Tidal Coefficient / Moon Cycle
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleUpdate('tidePhase', 'spring')}
                className={`py-2.5 px-3 rounded-full border text-xs font-bold transition-all ${
                  input.tidePhase === 'spring'
                    ? 'bg-[#1C1917] border-[#1C1917] text-white shadow-sm'
                    : 'bg-white border-stone-300 text-stone-700 hover:border-[#1C1917]'
                }`}
              >
                Spring Tide
              </button>
              <button
                type="button"
                onClick={() => handleUpdate('tidePhase', 'normal')}
                className={`py-2.5 px-3 rounded-full border text-xs font-bold transition-all ${
                  input.tidePhase === 'normal'
                    ? 'bg-[#1C1917] border-[#1C1917] text-white shadow-sm'
                    : 'bg-white border-stone-300 text-stone-700 hover:border-[#1C1917]'
                }`}
              >
                Normal Flow
              </button>
              <button
                type="button"
                onClick={() => handleUpdate('tidePhase', 'neap')}
                className={`py-2.5 px-3 rounded-full border text-xs font-bold transition-all ${
                  input.tidePhase === 'neap'
                    ? 'bg-[#1C1917] border-[#1C1917] text-white shadow-sm'
                    : 'bg-white border-stone-300 text-stone-700 hover:border-[#1C1917]'
                }`}
              >
                Neap Tide
              </button>
            </div>
            <p className="text-[11px] text-stone-500">
              Spring tides (New/Full Moon) create heavy water volume; neap tides have gentle drift.
            </p>
          </div>
        </div>

        {/* ROW 5: Air & Water Temperature + Clarity */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Air Temperature */}
          <div className="md:col-span-4 space-y-2">
            <div className="flex items-center justify-between">
              <label className="label-editorial text-stone-600 flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>Air Temperature</span>
              </label>
              
              {/* Unit Toggle */}
              <div className="inline-flex rounded-full p-0.5 bg-stone-100 border border-stone-200">
                <button
                  type="button"
                  onClick={() => handleUnitToggleTemp('C')}
                  className={`px-3 py-0.5 text-xs font-bold rounded-full transition-colors ${
                    input.tempUnit === 'C' ? 'bg-[#1C1917] text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  °C
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitToggleTemp('F')}
                  className={`px-3 py-0.5 text-xs font-bold rounded-full transition-colors ${
                    input.tempUnit === 'F' ? 'bg-[#1C1917] text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  °F
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="number"
                value={input.airTemperature}
                onChange={(e) => handleUpdate('airTemperature', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-base font-bold text-[#1C1917] tabular-nums focus:bg-white focus:outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917]"
              />
              <span className="absolute right-4 top-3 text-xs text-stone-500 font-mono font-medium">
                °{input.tempUnit}
              </span>
            </div>
          </div>

          {/* Water Temperature */}
          <div className="md:col-span-4 space-y-2">
            <label className="label-editorial text-stone-600 flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>Water Temperature</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={input.waterTemperature}
                onChange={(e) => handleUpdate('waterTemperature', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-base font-bold text-[#1C1917] tabular-nums focus:bg-white focus:outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917]"
              />
              <span className="absolute right-4 top-3 text-xs text-stone-500 font-mono font-medium">
                °{input.tempUnit}
              </span>
            </div>
            <p className="text-[11px] text-stone-500">
              Regulates metabolic rate and feeding desire.
            </p>
          </div>

          {/* Water Clarity */}
          <div className="md:col-span-4 space-y-2">
            <label className="label-editorial text-stone-600 block">
              Water Clarity / Color
            </label>
            <select
              value={input.waterClarity}
              onChange={(e) => handleUpdate('waterClarity', e.target.value as WaterClarity)}
              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-[#1C1917] focus:bg-white focus:outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917]"
            >
              <option value="crystal_clear">Crystal Clear (Stealth fluorocarbon needed)</option>
              <option value="stained">Stained / Brackish (Optimal strike contrast)</option>
              <option value="murky_dirty">Murky / Muddy (Acoustic popping / scent needed)</option>
            </select>
            <p className="text-[11px] text-stone-500">
              Dictates lure color, leader stealth, and acoustic vibration needs.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
