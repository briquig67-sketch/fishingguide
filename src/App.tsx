import { useState, useMemo, useEffect } from 'react';
import { FishingInput, SavedTripPlan } from './types/fishing';
import { FISH_SPECIES_LIST } from './data/fishSpecies';
import { PRESET_SCENARIOS, ScenarioPreset } from './data/presets';
import { evaluateFishingConditions } from './engine/fishingEvaluator';
import { Header } from './components/Header';
import { ConditionsForm } from './components/ConditionsForm';
import { FavorabilityScorecard } from './components/FavorabilityScorecard';
import { EnvironmentalGauges } from './components/EnvironmentalGauges';
import { RigVisualizer } from './components/RigVisualizer';
import { TackleChecklist } from './components/TackleChecklist';
import { TacticalGuide } from './components/TacticalGuide';
import { FishDatabase } from './components/FishDatabase';
import { SavedTripsModal } from './components/SavedTripsModal';
import { Bookmark, Check, ArrowDown, Sparkles, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

const INITIAL_INPUT: FishingInput = PRESET_SCENARIOS[0].input;

export default function App() {
  const [input, setInput] = useState<FishingInput>(INITIAL_INPUT);
  const [savedTrips, setSavedTrips] = useState<SavedTripPlan[]>([]);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load saved trips from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('castwise_saved_trips');
      if (stored) {
        setSavedTrips(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load trips from storage', e);
    }
  }, []);

  // Save trips to localStorage whenever updated
  const saveTripsToStorage = (trips: SavedTripPlan[]) => {
    setSavedTrips(trips);
    try {
      localStorage.setItem('castwise_saved_trips', JSON.stringify(trips));
    } catch (e) {
      console.warn('Failed to save trips to storage', e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Re-evaluate whenever inputs change
  const evaluation = useMemo(() => {
    return evaluateFishingConditions(input);
  }, [input]);

  const currentSpecies = useMemo(() => {
    return FISH_SPECIES_LIST.find(f => f.id === input.targetedFishId) || FISH_SPECIES_LIST[0];
  }, [input.targetedFishId]);

  const handleApplyPreset = (preset: ScenarioPreset) => {
    setInput(preset.input);
    showToast(`Loaded preset: ${preset.title}`);
  };

  const handleResetPortPhillipBay = () => {
    setInput({ ...PRESET_SCENARIOS[0].input });
    showToast('Reset for Port Phillip Bay, Victoria Australia!');
    const el = document.getElementById('conditions-entry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSaveCurrentTrip = () => {
    const newTrip: SavedTripPlan = {
      id: `trip_${Date.now()}`,
      savedAt: new Date().toISOString(),
      input: { ...input },
      evaluation: { ...evaluation }
    };
    const updated = [newTrip, ...savedTrips];
    saveTripsToStorage(updated);
    showToast(`Trip plan saved for ${input.areaName || 'your spot'}!`);
  };

  const handleDeleteTrip = (id: string) => {
    const updated = savedTrips.filter(t => t.id !== id);
    saveTripsToStorage(updated);
    showToast('Trip plan removed.');
  };

  const handleLoadTrip = (trip: SavedTripPlan) => {
    setInput(trip.input);
    showToast(`Loaded plan for ${trip.input.areaName}`);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#1C1917] flex flex-col selection:bg-[#E11D48] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white font-semibold text-xs px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-stone-700 animate-bounce">
          <Check className="w-4 h-4 text-[#E11D48] stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Header */}
      <Header 
        onOpenSaved={() => setIsSavedModalOpen(true)}
        savedCount={savedTrips.length}
        onQuickPreset={handleResetPortPhillipBay}
      />

      {/* Main Content Area */}
      <main className="flex-1 space-y-12 pb-20">
        
        {/* Variation 1 Hero Section */}
        <section className="border-b border-stone-300/80 bg-[#F8F7F4] py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              
              {/* Left Column: Huge Architectural Heading (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="label-editorial text-[#E11D48] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
                  <span>Port Phillip Bay, Victoria · Spring Snapper Run</span>
                </div>

                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter text-[#1C1917] leading-[0.92] uppercase font-display">
                  Angling<br />
                  <span className="text-stone-400">Intelligence.</span>
                </h1>

                <p className="text-lg md:text-xl text-stone-700 max-w-2xl leading-relaxed font-normal">
                  Evaluate fishing favorability, analyze barometric pressure, wind, and tidal stages, and get precision tackle and rig recommendations for any target species.
                </p>

                {/* Pill Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleResetPortPhillipBay}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold rounded-full bg-[#E11D48] text-white hover:bg-rose-700 shadow-sm transition-colors"
                  >
                    <span>Reset for Port Phillip Bay, VIC</span>
                  </button>

                  <a
                    href="#conditions-entry"
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold rounded-full bg-[#1C1917] text-white hover:bg-stone-800 shadow transition-colors"
                  >
                    <span>Tweak Conditions</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="#fish-database"
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold rounded-full border border-[#1C1917] text-[#1C1917] bg-white hover:bg-stone-100 transition-colors"
                  >
                    <span>Species & Regs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={handleSaveCurrentTrip}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold rounded-full border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white bg-white transition-colors shadow-2xs"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-[#E11D48]" />
                    <span>Save Version</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsSavedModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold rounded-full border border-stone-300 text-stone-700 hover:text-[#1C1917] hover:border-stone-400 bg-transparent transition-colors"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-stone-400" />
                    <span>Saved Versions ({savedTrips.length})</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Signature Crimson Favorability Card + Bite Window Box (4 cols) */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                
                {/* Signature Crimson Card */}
                <div className="card-editorial rounded-2xl p-6 bg-[#E11D48] text-white shadow-lg border-none relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="label-editorial text-white/80">
                      Favorability Index
                    </span>
                    <Sparkles className="w-4 h-4 text-white/80" />
                  </div>

                  <div className="flex items-baseline gap-2 my-2">
                    <span className="text-6xl md:text-7xl font-extrabold font-mono tracking-tight tabular-nums">
                      {evaluation.overallScore}
                    </span>
                    <span className="text-xl text-white/70 font-semibold">/100</span>
                  </div>

                  <div className="text-xs font-bold uppercase tracking-wider text-white/90">
                    {evaluation.verdict}
                  </div>
                  <p className="text-xs text-white/80 mt-1 line-clamp-2">
                    {evaluation.verdictDescription}
                  </p>
                </div>

                {/* Secondary Quick Bite Window Card */}
                <div className="card-editorial rounded-2xl p-5 bg-white border border-stone-200/90 shadow-sm">
                  <div className="label-editorial text-stone-500 mb-1">
                    Bite Window · {currentSpecies.commonName.split(' ')[0]}
                  </div>
                  <div className="text-base font-bold text-[#1C1917]">
                    {evaluation.tacticalPlan.peakActivityWindow}
                  </div>
                  <div className="text-xs text-stone-500 mt-1 flex items-center justify-between">
                    <span>Target: {input.areaName || 'Your Waters'}</span>
                    <span className="font-mono font-semibold text-[#1C1917]">
                      {evaluation.recommendedRig.name.split(' ')[0]} Rig
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* [01] Conditions Input Form */}
          <ConditionsForm 
            input={input} 
            onChange={setInput}
            onApplyPreset={handleApplyPreset}
            onOpenSaved={() => setIsSavedModalOpen(true)}
            savedCount={savedTrips.length}
            onSaveCurrent={handleSaveCurrentTrip}
          />

          {/* [02] Bite Favorability Scorecard */}
          <FavorabilityScorecard 
            evaluation={evaluation} 
          />

          {/* [03] Environmental Telemetry & Gauges */}
          <EnvironmentalGauges 
            input={input}
            species={currentSpecies}
          />

          {/* [04] Terminal Rig Blueprint & Visualizer */}
          <RigVisualizer 
            primaryRig={evaluation.recommendedRig}
            alternativeRig={evaluation.alternativeRig}
          />

          {/* [05] Tackle Specifications & Packing Checklist */}
          <TackleChecklist 
            tackle={evaluation.tackle}
            targetFishName={currentSpecies.commonName}
            areaName={input.areaName}
          />

          {/* [06] Tactical Plan & Target Structure */}
          <TacticalGuide 
            tacticalPlan={evaluation.tacticalPlan}
            targetFishName={currentSpecies.commonName}
            areaName={input.areaName}
          />

          {/* [07] Common Fish Species & Regulations Database */}
          <FishDatabase 
            onSelectFish={(fishId) => {
              const selected = FISH_SPECIES_LIST.find(f => f.id === fishId);
              if (selected) {
                let newEnv = input.environment;
                if (selected.environmentType === 'freshwater' && !input.environment.startsWith('freshwater_')) {
                  newEnv = 'freshwater_lake';
                } else if (selected.environmentType === 'saltwater' && input.environment.startsWith('freshwater_')) {
                  newEnv = selected.habitatTags.some(t => t.includes('Surf')) ? 'surf_beach' : 'inshore_flats';
                }
                setInput(prev => ({
                  ...prev,
                  targetedFishId: fishId,
                  environment: newEnv
                }));
                showToast(`Selected ${selected.commonName}. Habitat & regulations loaded.`);
              }
            }}
            selectedFishId={input.targetedFishId}
          />

        </div>
      </main>

      {/* Saved Trips Drawer / Modal */}
      <SavedTripsModal 
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedTrips={savedTrips}
        onLoadTrip={handleLoadTrip}
        onDeleteTrip={handleDeleteTrip}
      />

      {/* Variation 1 Clean Architectural Footer */}
      <footer className="border-t-2 border-[#1C1917] bg-[#F8F7F4] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 label-editorial text-stone-600">
          <div className="font-bold tracking-[0.16em]">
            CASTWISE © 2026 · MARITIME CONDITIONS DATA
          </div>
          <div className="text-center sm:text-right normal-case tracking-normal font-sans text-xs text-stone-500">
            Verify regional marine safety broadcasts, tidal tables, and local wildlife conservation size limits.
          </div>
        </div>
      </footer>

    </div>
  );
}
