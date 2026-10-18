import React, { useState, useMemo } from 'react';
import { FishSpecies } from '../types/fishing';
import { FISH_SPECIES_LIST } from '../data/fishSpecies';
import { 
  Search, 
  Fish, 
  Thermometer, 
  MapPin, 
  ShieldAlert, 
  Check, 
  SlidersHorizontal, 
  ArrowUpRight, 
  Info, 
  Ruler 
} from 'lucide-react';

interface FishDatabaseProps {
  onSelectFish: (fishId: string) => void;
  selectedFishId?: string;
}

export const FishDatabase: React.FC<FishDatabaseProps> = ({ onSelectFish, selectedFishId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [envFilter, setEnvFilter] = useState<'all' | 'saltwater' | 'freshwater'>('all');
  const [selectedFishDetail, setSelectedFishDetail] = useState<FishSpecies | null>(null);

  const filteredSpecies = useMemo(() => {
    return FISH_SPECIES_LIST.filter(fish => {
      if (envFilter !== 'all' && fish.environmentType !== envFilter) {
        return false;
      }

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchCommon = fish.commonName.toLowerCase().includes(q);
      const matchScientific = fish.scientificName.toLowerCase().includes(q);
      const matchHabitat = fish.typicalHabitat.toLowerCase().includes(q);
      const matchRegion = fish.region.toLowerCase().includes(q);
      const matchBaits = fish.naturalBaits.some(b => b.toLowerCase().includes(q));
      const matchLures = fish.artificialLures.some(l => l.toLowerCase().includes(q));
      const matchTags = fish.habitatTags.some(t => t.toLowerCase().includes(q));
      const matchRegs = fish.regulations.sizeLimit.toLowerCase().includes(q) ||
        fish.regulations.season.toLowerCase().includes(q);

      return matchCommon || matchScientific || matchHabitat || matchRegion || matchBaits || matchLures || matchTags || matchRegs;
    });
  }, [searchQuery, envFilter]);

  return (
    <section id="fish-database" className="space-y-6 pt-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="label-editorial text-[#E11D48] flex items-center gap-1.5 mb-1">
            <Fish className="w-3.5 h-3.5" />
            <span>[07] Common Species Encyclopedia & Regulations Directory</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1C1917] font-display">
            Fish Species & Regulations Database
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl font-normal">
            Search typical habitats, metabolic temperature ranges, proven baits and lures, and harvest regulations (size limits, bag limits, seasons).
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
          <Info className="w-4 h-4 text-[#E11D48] shrink-0" />
          <span>{filteredSpecies.length} of {FISH_SPECIES_LIST.length} Species Catalogued</span>
        </div>
      </div>

      {/* Search Bar & Filter Controls */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Input (8 cols) */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by fish name, habitat ('surf', 'oyster', 'weeds'), bait, or region..."
              className="w-full pl-11 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-[#1C1917] placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-xs text-stone-500 hover:text-stone-900 font-mono font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Environment Segmented Filter (4 cols) */}
          <div className="md:col-span-4 flex items-center gap-1 p-1 bg-stone-100 border border-stone-200 rounded-full">
            <button
              type="button"
              onClick={() => setEnvFilter('all')}
              className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-full transition-colors ${
                envFilter === 'all'
                  ? 'bg-[#1C1917] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Types
            </button>
            <button
              type="button"
              onClick={() => setEnvFilter('saltwater')}
              className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-full transition-colors ${
                envFilter === 'saltwater'
                  ? 'bg-[#1C1917] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Saltwater
            </button>
            <button
              type="button"
              onClick={() => setEnvFilter('freshwater')}
              className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-full transition-colors ${
                envFilter === 'freshwater'
                  ? 'bg-[#1C1917] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Freshwater
            </button>
          </div>

        </div>

        {/* Quick Search Tag Suggestions */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 pt-1">
          <span className="label-editorial text-[#E11D48] mr-1">
            Quick Topics:
          </span>
          {['Port Phillip Bay', 'Victoria VFA', 'Snapper', 'Whiting', 'Calamari', 'Flathead', 'Gummy Shark', 'Surf Beach', 'Circle Hook Mandate'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSearchQuery(tag === 'Port Phillip Bay' ? 'Port Phillip' : tag)}
              className="px-3 py-1 rounded-full bg-stone-50 border border-stone-200 hover:border-[#1C1917] hover:bg-[#1C1917] hover:text-white text-[#1C1917] text-xs font-semibold transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Species Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSpecies.map((fish) => {
          const isSelected = selectedFishId === fish.id;

          return (
            <div
              key={fish.id}
              className={`bg-white border rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all shadow-sm ${
                isSelected 
                  ? 'border-[#E11D48] ring-2 ring-[#E11D48]/30' 
                  : 'border-stone-200/90 hover:border-stone-400'
              }`}
            >
              <div className="space-y-3">
                
                {/* Title Line */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-[#1C1917] leading-snug font-display">
                      {fish.commonName}
                    </h3>
                    <p className="text-xs text-stone-500 italic">
                      {fish.scientificName}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border capitalize shrink-0 ${
                    fish.environmentType === 'saltwater'
                      ? 'bg-sky-50 border-sky-200 text-sky-800'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  }`}>
                    {fish.environmentType}
                  </span>
                </div>

                {/* Region & Average Size */}
                <div className="text-xs text-stone-600 space-y-1 pt-1 border-t border-stone-100">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E11D48] shrink-0 mt-0.5" />
                    <span className="text-[#1C1917] font-medium line-clamp-1">{fish.region}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-500 font-mono">
                    <Ruler className="w-3.5 h-3.5 text-[#E11D48] shrink-0" />
                    <span>{fish.averageSize}</span>
                  </div>
                </div>

                {/* Habitat */}
                <div className="space-y-1">
                  <span className="label-editorial text-stone-400">
                    Typical Habitat
                  </span>
                  <p className="text-xs text-stone-700 leading-relaxed line-clamp-2 font-medium">
                    {fish.typicalHabitat}
                  </p>
                </div>

                {/* Optimal Temperature Range */}
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                    <Thermometer className="w-3.5 h-3.5 text-[#E11D48]" />
                    <span>Preferred Temp:</span>
                  </div>
                  <span className="font-mono font-bold text-[#1C1917]">
                    {fish.optimalTempMinC}°C – {fish.optimalTempMaxC}°C ({Math.round(fish.optimalTempMinC * 1.8 + 32)}°F – {Math.round(fish.optimalTempMaxC * 1.8 + 32)}°F)
                  </span>
                </div>

                {/* Baits & Lures */}
                <div className="space-y-1.5 pt-1">
                  <span className="label-editorial text-stone-400">
                    Proven Baits & Lures
                  </span>
                  <div className="text-xs text-stone-700 space-y-1">
                    <div className="line-clamp-1">
                      <strong className="text-[#1C1917]">Natural:</strong> {fish.naturalBaits.slice(0, 3).join(', ')}
                    </div>
                    <div className="line-clamp-1">
                      <strong className="text-[#1C1917]">Lures:</strong> {fish.artificialLures.slice(0, 2).join(', ')}
                    </div>
                  </div>
                </div>

                {/* Regulations Box */}
                <div className="p-3.5 rounded-xl bg-rose-50/50 border border-[#E11D48]/20 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#E11D48] uppercase tracking-wider font-mono">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Regulations & Management</span>
                  </div>
                  
                  <div className="space-y-1 text-xs">
                    <div>
                      <strong className="text-[#1C1917]">Size: </strong>
                      <span className="text-stone-700 font-medium">{fish.regulations.sizeLimit}</span>
                    </div>
                    <div>
                      <strong className="text-[#1C1917]">Bag: </strong>
                      <span className="text-stone-700">{fish.regulations.bagLimit}</span>
                    </div>
                    <div>
                      <strong className="text-[#1C1917]">Season: </strong>
                      <span className="text-stone-700">{fish.regulations.season}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelectFish(fish.id);
                    const el = document.getElementById('conditions-entry');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex-1 py-2.5 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    isSelected
                      ? 'bg-[#E11D48] text-white shadow-sm'
                      : 'bg-[#1C1917] hover:bg-stone-800 text-white'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isSelected ? 'Active Target' : 'Select For Analysis'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFishDetail(fish)}
                  className="p-2.5 rounded-full bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-[#1C1917] border border-stone-200 transition-colors"
                  title="View full regulations and biological dossier"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Full Species Dossier Modal */}
      {selectedFishDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div 
            className="bg-white border-2 border-[#1C1917] rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    selectedFishDetail.environmentType === 'saltwater'
                      ? 'bg-sky-50 border-sky-200 text-sky-800'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  }`}>
                    {selectedFishDetail.environmentType}
                  </span>
                  <span className="label-editorial text-stone-400">· Official Profile</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#1C1917] mt-1 font-display">
                  {selectedFishDetail.commonName}
                </h3>
                <p className="text-xs text-stone-500 italic">
                  {selectedFishDetail.scientificName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedFishDetail(null)}
                className="w-8 h-8 rounded-full border border-stone-300 text-stone-500 hover:text-[#1C1917] hover:border-[#1C1917] flex items-center justify-center transition-colors font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-700 leading-relaxed">
              
              {/* Description */}
              <div className="space-y-1">
                <span className="label-editorial text-[#E11D48]">
                  Species Overview & Behavior
                </span>
                <p className="text-sm text-[#1C1917] font-medium leading-relaxed">
                  {selectedFishDetail.description}
                </p>
              </div>

              {/* Habitats & Regions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="space-y-1">
                  <span className="label-editorial text-stone-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E11D48]" />
                    <span>Geographic Distribution</span>
                  </span>
                  <p className="text-[#1C1917] font-semibold">{selectedFishDetail.region}</p>
                </div>

                <div className="space-y-1">
                  <span className="label-editorial text-stone-500 flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-[#E11D48]" />
                    <span>Size & Growth Rates</span>
                  </span>
                  <p className="text-[#1C1917] font-semibold">{selectedFishDetail.averageSize}</p>
                </div>

                <div className="md:col-span-2 space-y-1 pt-3 border-t border-stone-200">
                  <span className="label-editorial text-stone-500">
                    Typical Underwater Habitat & Structure
                  </span>
                  <p className="text-[#1C1917] font-medium">{selectedFishDetail.typicalHabitat}</p>
                </div>
              </div>

              {/* Feeding Habits */}
              <div className="space-y-2">
                <span className="label-editorial text-[#E11D48]">
                  Feeding Habits & Predatory Triggers
                </span>
                <p className="text-[#1C1917] bg-stone-50 p-4 rounded-xl border border-stone-200 font-medium">
                  {selectedFishDetail.feedingHabits}
                </p>
              </div>

              {/* Proven Baits & Lures */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <span className="label-editorial text-[#E11D48] flex items-center gap-1.5">
                    <Fish className="w-3.5 h-3.5" />
                    <span>Best Natural / Live Baits</span>
                  </span>
                  <ul className="space-y-1.5">
                    {selectedFishDetail.naturalBaits.map((bait, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3 h-3 text-[#E11D48] shrink-0 mt-0.5" />
                        <span className="text-[#1C1917] font-medium">{bait}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <span className="label-editorial text-[#E11D48] flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Best Artificial Lures</span>
                  </span>
                  <ul className="space-y-1.5">
                    {selectedFishDetail.artificialLures.map((lure, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3 h-3 text-[#E11D48] shrink-0 mt-0.5" />
                        <span className="text-[#1C1917] font-medium">{lure}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Regulations Section */}
              <div className="p-6 rounded-2xl bg-rose-50/70 border border-[#E11D48]/30 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E11D48] font-mono">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Legal Harvest Regulations & Conservation Rules</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-[#E11D48]/20">
                    <span className="label-editorial text-stone-500 block mb-0.5">Size Limits</span>
                    <span className="text-[#1C1917] font-bold">{selectedFishDetail.regulations.sizeLimit}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#E11D48]/20">
                    <span className="label-editorial text-stone-500 block mb-0.5">Daily Bag Limit</span>
                    <span className="text-[#1C1917] font-bold">{selectedFishDetail.regulations.bagLimit}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#E11D48]/20">
                    <span className="label-editorial text-stone-500 block mb-0.5">Season Dates</span>
                    <span className="text-[#1C1917] font-bold">{selectedFishDetail.regulations.season}</span>
                  </div>
                </div>

                {selectedFishDetail.regulations.gearRestrictions && (
                  <div className="text-xs pt-1">
                    <strong className="text-[#E11D48]">Mandated Gear: </strong>
                    <span className="text-[#1C1917] font-medium">{selectedFishDetail.regulations.gearRestrictions}</span>
                  </div>
                )}

                <div className="text-xs pt-1">
                  <strong className="text-[#E11D48]">Regulatory Advisory: </strong>
                  <span className="text-stone-700">{selectedFishDetail.regulations.regulatoryNotes}</span>
                </div>
              </div>

              <div className="text-[11px] text-stone-400 italic">
                * Note: Angling regulations are subject to frequent in-season adjustments by regional fisheries commissions (e.g., NOAA Fisheries, ASMFC, State DNR / FWC). Always verify local emergency rules and boundary limits prior to harvesting.
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedFishDetail(null)}
                className="px-5 py-2 text-xs font-bold rounded-full border border-stone-300 text-stone-600 hover:text-[#1C1917] bg-white transition-colors"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectFish(selectedFishDetail.id);
                  setSelectedFishDetail(null);
                  const el = document.getElementById('conditions-entry');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2 text-xs font-bold rounded-full bg-[#1C1917] text-white hover:bg-stone-800 transition-colors flex items-center gap-1.5 shadow"
              >
                <Check className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>Select {selectedFishDetail.commonName.split(' ')[0]} For Analysis</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
