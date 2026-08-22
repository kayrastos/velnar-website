import React from 'react';
import { getWhatsAppUrl } from '../config';
import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';

interface FinalCTAProps {
  onDemoClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onDemoClick }) => {
  return (
    <section id="final-cta" className="py-16 md:py-20 bg-[#0E0F0F] border-y border-[#F3F0E8]/[0.06] relative overflow-hidden">
      
      {/* Subtle depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#141514] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141514] border border-[#F3F0E8]/[0.09] text-[10px] font-mono uppercase tracking-[0.16em] text-[#AAA69D]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A]" />
          <span>Sıfır Riskli Başlangıç</span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F3F0E8] tracking-tight leading-tight max-w-2xl mx-auto">
          İşletmenizin internette nasıl görüneceğini{' '}
          <span className="text-[#C6A76A]">
            birlikte görelim.
          </span>
        </h2>

        {/* Supporting description */}
        <p className="text-[#AAA69D] text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          Hiçbir ücret veya taahhüt olmadan, işletmenize özel tasarlanmış örnek ana sayfayı hazırlayalım.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            onClick={onDemoClick}
            id="final-cta-demo-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] hover:text-[#111211] font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer shadow-sm group"
          >
            <span>Ücretsiz Demo İste</span>
            <ArrowRight className="w-4 h-4 text-[#111211] group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={getWhatsAppUrl("Merhaba, işletmem için web sitesi projesi hakkında WhatsApp üzerinden görüşmek istiyorum.")}
            target="_blank"
            rel="noopener noreferrer"
            id="final-cta-whatsapp-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#141514] hover:bg-[#1D1E1C] text-[#F3F0E8] hover:text-white font-medium text-xs sm:text-sm border border-[#F3F0E8]/[0.15] transition-all duration-200 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Guarantee Badge */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-[#AAA69D]">
          <ShieldCheck className="w-4 h-4 text-[#C6A76A]" />
          <span>Demo ücretsizdir. Satın alma zorunluluğu yoktur.</span>
        </div>

      </div>
    </section>
  );
};

