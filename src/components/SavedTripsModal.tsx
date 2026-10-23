import React from 'react';
import { SavedTripPlan } from '../types/fishing';
import { X, Trash2, ArrowRight, Bookmark, Calendar, MapPin, Fish } from 'lucide-react';

interface SavedTripsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedTrips: SavedTripPlan[];
  onLoadTrip: (trip: SavedTripPlan) => void;
  onDeleteTrip: (id: string) => void;
}

export const SavedTripsModal: React.FC<SavedTripsModalProps> = ({
  isOpen,
  onClose,
  savedTrips,
  onLoadTrip,
  onDeleteTrip
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white border-2 border-[#1C1917] rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-[#E11D48]" />
            <div>
              <h3 className="text-xl font-extrabold text-[#1C1917] font-display">
                Saved Versions & Trip Plans ({savedTrips.length})
              </h3>
              <p className="text-xs text-stone-500">Stored in browser memory · Click "Load Version" to restore anytime</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-stone-300 text-stone-500 hover:text-[#1C1917] hover:border-[#1C1917] flex items-center justify-center transition-colors font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {savedTrips.length === 0 ? (
            <div className="text-center py-12 text-stone-500 space-y-2">
              <Bookmark className="w-10 h-10 mx-auto text-stone-300 stroke-1" />
              <div className="text-sm font-bold text-[#1C1917]">No Saved Versions Yet</div>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Set up your fishing location and conditions, then click "Save Version" in the top bar or hero section. Your setups will be saved here so you can switch between them instantly.
              </p>
            </div>
          ) : (
            savedTrips.map((trip) => {
              const { input, evaluation } = trip;
              return (
                <div
                  key={trip.id}
                  className="p-4 rounded-2xl border border-stone-200 bg-stone-50/70 hover:border-[#1C1917] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1C1917] flex items-center gap-1 truncate font-display">
                        <MapPin className="w-3.5 h-3.5 text-[#E11D48] shrink-0" />
                        {input.areaName || 'Unnamed Spot'}
                      </span>
                      <span className="text-xs text-stone-400">·</span>
                      <span className="text-xs text-stone-600 flex items-center gap-1 font-medium truncate">
                        <Fish className="w-3.5 h-3.5 shrink-0 text-stone-400" />
                        {evaluation.recommendedRig.name}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500 font-mono">
                      <span>{input.barometerValue} {input.barometerUnit} ({input.barometerTendency})</span>
                      <span>·</span>
                      <span>{input.windSpeed} kts {input.windDirection}</span>
                      <span>·</span>
                      <span className="capitalize">{input.tideMovement.replace('_', ' ')}</span>
                      <span>·</span>
                      <span className="text-stone-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(trip.savedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-[#1C1917] pt-1">
                      Score: <span className="text-[#E11D48] font-mono font-extrabold">{evaluation.overallScore}/100</span> — {evaluation.verdict}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onLoadTrip(trip);
                        onClose();
                      }}
                      className="px-4 py-2 rounded-full bg-[#1C1917] hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs whitespace-nowrap"
                    >
                      <span>Load Version</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteTrip(trip.id)}
                      className="p-2 rounded-full text-stone-400 hover:text-[#E11D48] hover:bg-white border border-transparent hover:border-stone-200 transition-colors"
                      title="Delete saved plan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-stone-600 hover:text-[#1C1917] rounded-full border border-stone-300 bg-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
