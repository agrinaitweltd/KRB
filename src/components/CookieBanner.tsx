import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

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

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isVisible]);

  const saveConsent = (value: string) => {
    persistConsent(value);
    setIsVisible(false);
  };

  const handleAccept = () => {
    saveConsent('accepted');
  };

  const handleReject = () => {
    saveConsent('rejected');
  };

  const handleManage = () => {
    saveConsent('managed');
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-x-2 bottom-2 z-[120] flex justify-center md:inset-x-auto md:right-4 md:bottom-4"
            role="dialog"
            aria-live="polite"
            aria-label="Cookie consent"
            aria-modal="false"
          >
            <div className="w-full max-w-md bg-krb-purple text-white shadow-2xl rounded-2xl px-4 py-3 md:px-5 md:py-4 relative border border-white/10">
              <button
                type="button"
                onClick={handleManage}
                className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors min-h-9 min-w-9"
                aria-label="Close cookie banner"
              >
                <X size={14} />
              </button>

              <div className="pr-5">
                <h4 className="text-base md:text-lg font-bold mb-1.5">Cookie preferences</h4>
                <p className="text-xs md:text-sm leading-relaxed text-white/90 mb-3">
                  We use essential cookies to run this website and optional cookies to improve performance. You can accept, reject, or review settings at any time.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button 
                  type="button"
                  onClick={handleAccept}
                  className="bg-white text-krb-purple px-3 py-2.5 rounded-lg font-semibold text-xs md:text-sm hover:bg-slate-100 transition-colors min-h-11"
                >
                  Accept
                </button>
                <button 
                  type="button"
                  onClick={handleManage}
                  className="bg-white text-krb-purple px-3 py-2.5 rounded-lg font-semibold text-xs md:text-sm hover:bg-slate-100 transition-colors min-h-11"
                >
                  Settings
                </button>
                <button 
                  type="button"
                  onClick={handleReject}
                  className="bg-white text-krb-purple px-3 py-2.5 rounded-lg font-semibold text-xs md:text-sm hover:bg-slate-100 transition-colors min-h-11"
                >
                  Reject
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieBanner;
