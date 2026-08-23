import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getWhatsAppUrl } from '../config';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { t, lang } = useLanguage();
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

  const whatsappMessage = lang === 'en'
    ? "Hello, I visited your website and would like to learn more about your services."
    : "Merhaba, web sitenizden ulaşıyorum. İşletmem için bilgi almak istiyorum.";

  const tooltipText = lang === 'en'
    ? "Feel free to message us on WhatsApp for quick inquiries"
    : "Sorularınız için WhatsApp'tan yazabilirsiniz";

  return (
    <div 
      id="floating-whatsapp-widget" 
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5 pointer-events-none pb-[env(safe-area-inset-bottom,0)] pr-[env(safe-area-inset-right,0)] max-w-[calc(100vw-2rem)]"
    >
      {/* Small subtle popover tooltip (auto timed) */}
      {showTooltip && (
        <div className="pointer-events-auto hidden sm:flex items-center gap-2 bg-[#141514] text-[#F3F0E8] text-xs py-2 px-3 rounded-xl border border-[#F3F0E8]/[0.15] shadow-2xl backdrop-blur-md animate-fadeIn">
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
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

      {/* Boutique Studio Floating Button */}
      <a
        href={getWhatsAppUrl(whatsappMessage, lang)}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#141514] hover:bg-[#1D1E1C] text-[#25D366] flex items-center justify-center border border-[#F3F0E8]/[0.15] hover:border-[#F3F0E8]/[0.3] shadow-2xl transition-all duration-200 cursor-pointer group hover:scale-105 active:scale-95"
        aria-label={lang === 'en' ? 'Chat on WhatsApp' : 'WhatsApp ile Sohbet Başlat'}
        title={lang === 'en' ? 'Contact via WhatsApp' : 'WhatsApp ile İletişime Geç'}
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#25D366] transition-transform group-hover:scale-110" />
      </a>
    </div>
  );
};


