import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, Share2, PlusSquare, Compass } from 'lucide-react';

interface PWAInstallButtonProps {
  variant?: 'pill' | 'header';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'pill' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // If already installed and launched from home screen
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className={
          variant === 'header'
            ? "inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full bg-[#E11D48] text-white hover:bg-rose-700 shadow-sm transition-colors whitespace-nowrap"
            : "inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-full bg-[#1C1917] text-white hover:bg-stone-800 shadow transition-colors"
        }
        title="Install CastWise as a standalone app on your phone, tablet, or desktop"
      >
        <Download className="w-3.5 h-3.5 text-white" />
        <span>Install App</span>
      </button>

      {/* Guided Installation Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#F8F7F4] border-2 border-[#1C1917] p-6 shadow-2xl text-[#1C1917] relative animate-in fade-in zoom-in-95 duration-150">
            
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="absolute right-4 top-4 p-1 rounded-full text-stone-500 hover:text-[#1C1917] hover:bg-stone-200 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#1C1917] flex items-center justify-center text-white shrink-0">
                <Compass className="w-5 h-5 text-[#E11D48]" />
              </div>
              <div>
                <div className="label-editorial text-[#E11D48]">Offline Boating Ready</div>
                <h3 className="text-xl font-extrabold font-display">Install CastWise App</h3>
              </div>
            </div>

            <p className="text-xs text-stone-600 mb-5 leading-relaxed">
              Install CastWise on your home screen or desktop for 1-tap access at sea, full-screen view, and offline bay intelligence without mobile signal.
            </p>

            {isIOS ? (
              <div className="bg-white rounded-xl border border-stone-200 p-4 space-y-3 text-xs">
                <div className="font-bold text-stone-900 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#E11D48]" />
                  <span>iPhone & iPad Safari Instructions:</span>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-stone-700 pl-1">
                  <li>
                    Tap the <strong>Share</strong> button <Share2 className="w-3.5 h-3.5 inline mx-1 text-blue-600" /> in Safari's bottom toolbar.
                  </li>
                  <li>
                    Scroll down and select <strong>Add to Home Screen</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-stone-700" />.
                  </li>
                  <li>
                    Tap <strong>Add</strong> in the top-right corner. CastWise is now installed!
                  </li>
                </ol>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-stone-200 p-4 space-y-3 text-xs">
                <div className="font-bold text-stone-900 flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#E11D48]" />
                  <span>Android & Desktop Instructions:</span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  Click the <strong>Install</strong> icon in your browser URL bar or tap the three dots menu <span className="font-mono font-bold">⋮</span> and choose <strong>Install CastWise</strong> or <strong>Add to Home screen</strong>.
                </p>
                {isInstallable && (
                  <button
                    type="button"
                    onClick={async () => {
                      setShowGuide(false);
                      await install();
                    }}
                    className="w-full mt-2 py-2 px-4 rounded-full bg-[#E11D48] text-white font-bold hover:bg-rose-700 transition"
                  >
                    Trigger Prompt Now
                  </button>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="mt-5 w-full py-2.5 rounded-full bg-[#1C1917] text-white text-xs font-bold hover:bg-stone-800 transition"
            >
              Got It, Thanks!
            </button>

          </div>
        </div>
      )}
    </>
  );
};
