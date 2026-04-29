import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';

const COOKIE_CONSENT_KEY = 'cookie-consent-v2';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export const OPEN_COOKIE_SETTINGS_EVENT = 'krb-open-cookie-settings';

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

const DEFAULT_PREFERENCES: Preferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

const parseStoredConsent = (consent: string | null): Preferences | null => {
  if (!consent) {
    return null;
  }

  if (consent === 'accepted') {
    return { essential: true, analytics: true, marketing: true };
  }

  if (consent === 'rejected') {
    return { ...DEFAULT_PREFERENCES };
  }

  try {
    const parsed = JSON.parse(consent) as Partial<Preferences>;
    return {
      essential: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
};

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const onOpenSettings = () => {
      setIsVisible(true);
      setIsManageOpen(true);
    };

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);

    const timer = setTimeout(() => {
      const storedPreferences = parseStoredConsent(readConsent());
      if (storedPreferences) {
        setPreferences(storedPreferences);
      } else {
        setIsVisible(true);
      }
      setHasChecked(true);
    }, 600);

    return () => {
      clearTimeout(timer);
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
    };
  }, []);

  useEffect(() => {
    if (!hasChecked) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        if (readConsent()) {
          setIsVisible(false);
          setIsManageOpen(false);
          return;
        }
        handleReject();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isVisible, hasChecked]);

  const closeBanner = () => {
    setIsManageOpen(false);
    setIsVisible(false);
  };

  const savePreferences = (next: Preferences) => {
    setPreferences(next);
    persistConsent(JSON.stringify(next));
    closeBanner();
  };

  const handleAccept = () => {
    savePreferences({ essential: true, analytics: true, marketing: true });
  };

  const handleReject = () => {
    savePreferences({ ...DEFAULT_PREFERENCES });
  };

  const handleManage = () => {
    setIsManageOpen(true);
  };

  const handleSaveSettings = () => {
    savePreferences(preferences);
  };

  const handleCancelSettings = () => {
    const storedPreferences = parseStoredConsent(readConsent());
    setPreferences(storedPreferences ?? DEFAULT_PREFERENCES);
    setIsManageOpen(false);
  };

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          key="cookie-dialog"
          initial={{ y: 36, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="fixed inset-x-2 bottom-2 z-[9999] sm:inset-x-4 sm:bottom-4 md:inset-x-6"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          aria-modal="false"
        >
          <div className="mx-auto w-full max-w-[1120px] rounded-[24px] border border-slate-300/90 bg-[#e5e5e5] text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.22)] px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-6">
              <div className="max-w-3xl">
                <h4 className="text-[1.65rem] sm:text-[1.9rem] leading-tight font-bold mb-2 tracking-[-0.01em]">We value your privacy</h4>
                <p className="text-sm sm:text-[0.95rem] leading-[1.45] text-slate-800 max-w-4xl">
                  To enhance your browsing experience and provide personalized content, we use cookies. By clicking "Accept," you agree to our use of cookies as outlined in our privacy statement. You can manage your preferences at any time.
                </p>
                <button
                  type="button"
                  onClick={handleManage}
                  className="mt-2.5 text-[0.98rem] leading-tight font-semibold text-[#2d55ae] underline underline-offset-4 hover:text-[#213f84] transition-colors"
                >
                  Privacy, Cookies &amp; GDPR
                </button>
              </div>

              <div className="w-full md:w-[278px] shrink-0 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleAccept}
                  className="w-full rounded-full bg-krb-purple px-5 py-3 text-white text-base leading-none font-semibold hover:brightness-110 transition"
                >
                  Accept All Cookies
                </button>
                <button
                  type="button"
                  onClick={handleReject}
                  className="w-full rounded-full bg-krb-purple px-5 py-3 text-white text-base leading-none font-semibold hover:brightness-110 transition"
                >
                  Reject All Cookies
                </button>
                <button
                  type="button"
                  onClick={handleManage}
                  className="w-full rounded-full border border-slate-600 bg-transparent px-5 py-3 text-slate-900 text-base leading-none font-semibold hover:bg-slate-200 transition"
                >
                  Cookie Settings
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isManageOpen && (
                <motion.section
                  key="cookie-manage"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="mt-6 rounded-2xl border border-slate-300 bg-white p-4 sm:p-5"
                  aria-label="Cookie settings"
                >
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 p-3">
                      <h5 className="font-semibold text-slate-900">Essential</h5>
                      <p className="mt-1 text-sm text-slate-600">Always active to run core site features.</p>
                      <div className="mt-3 inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">Always On</div>
                    </div>

                    <label className="rounded-xl border border-slate-200 p-3 cursor-pointer">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h5 className="font-semibold text-slate-900">Analytics</h5>
                          <p className="mt-1 text-sm text-slate-600">Helps us understand site usage and improve experience.</p>
                        </div>
                        <input
                          type="checkbox"
                          className="mt-1 h-5 w-5"
                          checked={preferences.analytics}
                          onChange={(event) =>
                            setPreferences((current) => ({ ...current, analytics: event.target.checked }))
                          }
                        />
                      </div>
                    </label>

                    <label className="rounded-xl border border-slate-200 p-3 cursor-pointer">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h5 className="font-semibold text-slate-900">Marketing</h5>
                          <p className="mt-1 text-sm text-slate-600">Used for relevant ads and campaign performance.</p>
                        </div>
                        <input
                          type="checkbox"
                          className="mt-1 h-5 w-5"
                          checked={preferences.marketing}
                          onChange={(event) =>
                            setPreferences((current) => ({ ...current, marketing: event.target.checked }))
                          }
                        />
                      </div>
                    </label>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleSaveSettings}
                      className="rounded-full bg-krb-purple px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 transition"
                    >
                      Save Preferences
                    </button>
                    <button
                      type="button"
                      onClick={handleAccept}
                      className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
                    >
                      Accept All
                    </button>
                    <button
                      type="button"
                      onClick={handleReject}
                      className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
                    >
                      Reject All
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelSettings}
                      className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CookieBanner;
