import React, { useState, useEffect } from 'react';
import { getWhatsAppUrl } from '../config';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
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

  return (
    <div id="floating-whatsapp-widget" className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 pointer-events-none">
      {/* Small subtle popover tooltip (auto timed) */}
      {showTooltip && (
        <div className="pointer-events-auto hidden sm:flex items-center gap-2 bg-[#141514] text-[#F3F0E8] text-xs py-2 px-3 rounded-xl border border-[#F3F0E8]/[0.15] shadow-2xl backdrop-blur-md animate-fadeIn">
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
          <span>Sorularınız için WhatsApp'tan yazabilirsiniz</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#AAA69D] hover:text-[#F3F0E8] ml-0.5 p-0.5"
            aria-label="Kapat"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Boutique Studio Floating Button */}
      <a
        href={getWhatsAppUrl("Merhaba, web sitenizden ulaşıyorum. İşletmem için bilgi almak istiyorum.")}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="pointer-events-auto w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#141514] hover:bg-[#1D1E1C] text-[#25D366] flex items-center justify-center border border-[#F3F0E8]/[0.15] hover:border-[#F3F0E8]/[0.3] shadow-2xl transition-all duration-200 cursor-pointer group hover:scale-105 active:scale-95"
        aria-label="WhatsApp ile Sohbet Başlat"
        title="WhatsApp ile İletişime Geç"
      >
        <MessageCircle className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-[#25D366] transition-transform group-hover:scale-110" />
      </a>
    </div>
  );
};

