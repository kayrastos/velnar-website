import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CONFIG, getMailtoUrl } from '../config';
import { Mail, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { lang } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip once after 10 seconds
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
      // Automatically hide after 5 seconds
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      return () => clearTimeout(hideTimer);
    }, 10000);

    return () => clearTimeout(showTimer);
  }, []);

  const mailSubject = lang === 'en'
    ? "Project Inquiry — VELNAR Studio"
    : "Proje Talebi — VELNAR Studio";

  const tooltipText = lang === 'en'
    ? `Contact us directly: ${CONFIG.EMAIL}`
    : `Bize doğrudan ulaşın: ${CONFIG.EMAIL}`;

  return (
    <div 
      id="floating-contact-widget" 
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5 pointer-events-none pb-[env(safe-area-inset-bottom,0)] pr-[env(safe-area-inset-right,0)] max-w-[calc(100vw-2rem)]"
    >
      {/* Small subtle popover tooltip (auto timed) */}
      {showTooltip && (
        <div className="pointer-events-auto hidden sm:flex items-center gap-2 bg-[#141514] text-[#F3F0E8] text-xs py-2 px-3 rounded-xl border border-[#F3F0E8]/[0.15] shadow-2xl backdrop-blur-md animate-fadeIn">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A]" />
          <span>{tooltipText}</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#AAA69D] hover:text-[#F3F0E8] ml-0.5 p-0.5"
            aria-label={lang === 'en' ? 'Close' : 'Kapat'}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Boutique Studio Floating Mail Action Button */}
      <a
        href={getMailtoUrl(mailSubject)}
        id="floating-contact-btn"
        className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#141514] hover:bg-[#1D1E1C] text-[#C6A76A] flex items-center justify-center border border-[#F3F0E8]/[0.15] hover:border-[#C6A76A]/40 shadow-2xl transition-all duration-200 cursor-pointer group hover:scale-105 active:scale-95"
        aria-label={lang === 'en' ? `Email us at ${CONFIG.EMAIL}` : `${CONFIG.EMAIL} adresine e-posta gönderin`}
        title={lang === 'en' ? `Email: ${CONFIG.EMAIL}` : `E-posta: ${CONFIG.EMAIL}`}
      >
        <Mail className="w-5 h-5 sm:w-5 sm:h-5 text-[#C6A76A] transition-transform group-hover:scale-110" />
      </a>
    </div>
  );
};


