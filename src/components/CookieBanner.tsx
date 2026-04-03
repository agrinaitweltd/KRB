import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cookie-consent-v2';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

const readConsent = (): string | null => {
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored) {
      return stored;
    }
  } catch {
    // localStorage may be blocked in some browser/privacy modes.
  }

  if (typeof document === 'undefined') {
    return null;
  }

  const fromCookie = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${COOKIE_CONSENT_KEY}=`));

  return fromCookie ? decodeURIComponent(fromCookie.split('=')[1] || '') : null;
};

const persistConsent = (value: string) => {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    // Ignore storage errors and use cookie fallback.
  }

  if (typeof document !== 'undefined') {
    document.cookie = `${COOKIE_CONSENT_KEY}=${encodeURIComponent(value)}; max-age=${COOKIE_MAX_AGE_SECONDS}; path=/; samesite=lax`;
  }
};

type Preferences = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'essential' | 'analytics' | 'marketing'>('essential');
  const [preferences, setPreferences] = useState<Preferences>({ essential: true, analytics: false, marketing: false });

  useEffect(() => {
    // Small delay to ensure the banner animates in after page load
    const timer = setTimeout(() => {
      const consent = readConsent();
      if (consent) {
        // support both legacy string values and stored JSON prefs
        try {
          if (consent.startsWith('{')) {
            const parsed = JSON.parse(consent) as Preferences;
            setPreferences((prev) => ({ ...prev, ...parsed }));
          } else if (consent === 'accepted') {
            setPreferences({ essential: true, analytics: true, marketing: true });
          } else if (consent === 'rejected') {
            setPreferences({ essential: true, analytics: false, marketing: false });
          }
        } catch {
          // ignore parse errors
        }
      } else {
        setIsVisible(true);
      }
      setHasChecked(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasChecked) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        saveConsent('rejected');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isVisible, hasChecked]);

  const saveConsent = (value: string) => {
    persistConsent(value);
    setIsVisible(false);
  };

  const handleAccept = () => {
    const prefs: Preferences = { essential: true, analytics: true, marketing: true };
    setPreferences(prefs);
    persistConsent(JSON.stringify(prefs));
    setIsVisible(false);
  };

  const handleReject = () => {
    const prefs: Preferences = { essential: true, analytics: false, marketing: false };
    setPreferences(prefs);
    persistConsent(JSON.stringify(prefs));
    setIsVisible(false);
  };

  const handleManage = () => {
    // Open the detailed settings panel instead of immediately saving
    setIsManageOpen(true);
    setIsVisible(true);
  };

  const handleSaveSettings = () => {
    persistConsent(JSON.stringify(preferences));
    setIsManageOpen(false);
    setIsVisible(false);
  };

  const handleCancelSettings = () => {
    setIsManageOpen(false);
  };

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            key="cookie-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm md:hidden"
            onClick={handleReject}
            aria-hidden="true"
          />
          <motion.div
            key="cookie-dialog"
            initial={{ y: 80, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-3 z-[9999] md:inset-x-auto md:right-5 md:bottom-5 md:max-w-md"
            role="dialog"
            aria-live="polite"
            aria-label="Cookie consent"
            aria-modal="false"
          >
            <div className="bg-krb-purple text-white shadow-2xl rounded-2xl p-5 md:p-6 relative border border-white/10">
              <button
                type="button"
                onClick={handleReject}
                className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10"
                aria-label="Close cookie banner"
              >
                <X size={16} />
              </button>

              <div className="flex items-start gap-3 pr-6 mb-4">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield size={18} className="text-white/80" />
                </div>
                <div>
                  <h4 className="text-base font-bold mb-1">Cookie preferences</h4>
                  <p className="text-[13px] leading-relaxed text-white/80">
                    We use essential cookies to run this website and optional cookies to improve performance. You can accept, reject, or review settings at any time.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button 
                  type="button"
                  onClick={handleAccept}
                  className="bg-white text-krb-purple px-3 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 active:scale-95 transition-all"
                >
                  Accept
                </button>
                <button 
                  type="button"
                  onClick={handleManage}
                  className="bg-white/15 text-white px-3 py-3 rounded-xl font-bold text-sm hover:bg-white/25 active:scale-95 transition-all"
                >
                  Settings
                </button>
                <button 
                  type="button"
                  onClick={handleReject}
                  className="bg-white/15 text-white px-3 py-3 rounded-xl font-bold text-sm hover:bg-white/25 active:scale-95 transition-all"
                >
                  Reject
                </button>
              </div>

              {/* Manage Panel */}
              <AnimatePresence>
                {isManageOpen && (
                  <motion.div
                    key="cookie-manage"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.25 }}
                    className="mt-4 bg-white text-slate-800 rounded-2xl p-4"
                    role="region"
                    aria-label="Cookie settings"
                  >
                    <div className="flex gap-2 mb-3">
                      <button className={`flex-1 px-3 py-2 rounded-lg ${activeTab === 'essential' ? 'bg-krb-purple text-white' : 'bg-slate-50'}`} onClick={() => setActiveTab('essential')}>Essential</button>
                      <button className={`flex-1 px-3 py-2 rounded-lg ${activeTab === 'analytics' ? 'bg-krb-purple text-white' : 'bg-slate-50'}`} onClick={() => setActiveTab('analytics')}>Analytics</button>
                      <button className={`flex-1 px-3 py-2 rounded-lg ${activeTab === 'marketing' ? 'bg-krb-purple text-white' : 'bg-slate-50'}`} onClick={() => setActiveTab('marketing')}>Marketing</button>
                    </div>

                    <div className="mb-4">
                      {activeTab === 'essential' && (
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-bold">Essential cookies</h5>
                            <p className="text-sm text-slate-500">Required for site operation. Always active.</p>
                          </div>
                          <div className="opacity-50">On</div>
                        </div>
                      )}

                      {activeTab === 'analytics' && (
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-bold">Analytics cookies</h5>
                            <p className="text-sm text-slate-500">Help us understand usage to improve the site.</p>
                          </div>
                          <label className="inline-flex items-center gap-2">
                            <input type="checkbox" checked={preferences.analytics} onChange={(e) => setPreferences((p) => ({ ...p, analytics: e.target.checked }))} />
                          </label>
                        </div>
                      )}

                      {activeTab === 'marketing' && (
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-bold">Marketing cookies</h5>
                            <p className="text-sm text-slate-500">Used for personalised ads and marketing.</p>
                          </div>
                          <label className="inline-flex items-center gap-2">
                            <input type="checkbox" checked={preferences.marketing} onChange={(e) => setPreferences((p) => ({ ...p, marketing: e.target.checked }))} />
                          </label>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button onClick={handleSaveSettings} className="flex-1 bg-krb-purple text-white px-4 py-3 rounded-xl font-bold">Save settings</button>
                      <button onClick={handleCancelSettings} className="flex-1 bg-slate-50 px-4 py-3 rounded-xl font-bold">Cancel</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CookieBanner;
