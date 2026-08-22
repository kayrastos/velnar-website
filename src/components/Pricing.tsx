import React from 'react';
import { CONFIG } from '../config';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface PricingProps {
  onSelectPackage: (packageName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPackage }) => {
  const { STARTER, BUSINESS, AI_BUSINESS } = CONFIG.PRICING;

  return (
    <section id="paketler" className="py-16 md:py-20 bg-[#090A0A] relative overflow-hidden">
      
      {/* Background depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[450px] h-[350px] bg-[#141514] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141514] border border-[#F3F0E8]/[0.09] text-[10px] font-mono uppercase tracking-[0.16em] text-[#AAA69D]">
            Şeffaf Paketler
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F3F0E8] tracking-tight leading-tight">
            Net kapsam. Şeffaf fiyatlandırma. Sürpriz maliyet yok.
          </h2>
          <p className="text-[#AAA69D] text-sm sm:text-base max-w-xl mx-auto">
            Fiyatlar standart işletme siteleri için başlangıç seviyesidir. Özel talepler ve ek entegrasyonlar ayrıca projelendirilir.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch w-full max-w-full">
          
          {/* STARTER CARD */}
          <div
            id="pricing-card-starter"
            className="w-full min-w-0 rounded-2xl bg-[#141514] border border-[#F3F0E8]/[0.09] p-4.5 sm:p-6 lg:p-7 flex flex-col justify-between hover:border-[#F3F0E8]/[0.18] transition-all shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-3 gap-2">
                <span className="text-xs font-bold text-[#AAA69D] tracking-wider font-mono truncate">
                  {STARTER.name}
                </span>
                <span className="text-[11px] text-[#74716A] font-medium shrink-0">Temel Başlangıç</span>
              </div>

              <div className="mb-3">
                <div className="text-3xl sm:text-4xl font-black text-[#F3F0E8] tracking-tight">
                  {STARTER.price}
                </div>
                <div className="text-xs text-[#AAA69D] mt-0.5 font-medium">
                  {STARTER.period}
                </div>
              </div>

              <p className="text-xs text-[#AAA69D] mb-5 leading-relaxed">
                {STARTER.description}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-[#F3F0E8]/[0.06]">
                <div className="text-xs font-bold text-[#F3F0E8] uppercase tracking-wider">
                  Dahil Olanlar:
                </div>
                <ul className="space-y-2">
                  {STARTER.features.map((feat, i) => (
                    <li key={i} className="text-xs text-[#AAA69D] flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#C6A76A] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#F3F0E8]/[0.06]">
              <button
                onClick={() => onSelectPackage(STARTER.name)}
                id="btn-starter-demo"
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#181918] hover:bg-[#1D1E1C] text-[#F3F0E8] hover:text-white text-xs font-medium tracking-wide flex items-center justify-center gap-2 border border-[#F3F0E8]/[0.15] transition-all duration-200 cursor-pointer"
              >
                <span>{STARTER.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#AAA69D]" />
              </button>
            </div>
          </div>

          {/* BUSINESS CARD (Visually Dominant / Most Preferred) */}
          <div
            id="pricing-card-business"
            className="w-full min-w-0 relative rounded-2xl bg-[#181918] border border-[#C6A76A]/50 p-4.5 sm:p-6 lg:p-7 flex flex-col justify-between shadow-2xl lg:-translate-y-2 transition-all mt-4 lg:mt-0"
          >
            {/* Top Dominant Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#C6A76A] text-[#111211] text-[10px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1 font-mono max-w-[calc(100%-2rem)]">
              <Sparkles className="w-3 h-3 shrink-0" />
              <span className="truncate">{BUSINESS.badge}</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3 pt-1 gap-2">
                <span className="text-xs font-bold text-[#C6A76A] tracking-wider font-mono truncate">
                  {BUSINESS.name}
                </span>
                <span className="text-[11px] text-[#AAA69D] font-medium shrink-0">Büyüyen İşletmeler</span>
              </div>

              <div className="mb-3">
                <div className="text-3xl sm:text-4xl font-black text-[#F3F0E8] tracking-tight">
                  {BUSINESS.price}
                </div>
                <div className="text-xs text-[#AAA69D] mt-0.5 font-medium">
                  {BUSINESS.period}
                </div>
              </div>

              <p className="text-xs text-[#AAA69D] mb-5 leading-relaxed">
                {BUSINESS.description}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-[#F3F0E8]/[0.06]">
                <div className="text-xs font-bold text-[#F3F0E8] uppercase tracking-wider">
                  Dahil Olanlar:
                </div>
                <ul className="space-y-2">
                  {BUSINESS.features.map((feat, i) => (
                    <li key={i} className="text-xs text-[#F3F0E8] flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#C6A76A] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#F3F0E8]/[0.06]">
              <button
                onClick={() => onSelectPackage(BUSINESS.name)}
                id="btn-business-demo"
                className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <span>{BUSINESS.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#111211]" />
              </button>
            </div>
          </div>

          {/* AI BUSINESS CARD */}
          <div
            id="pricing-card-aibusiness"
            className="w-full min-w-0 rounded-2xl bg-[#141514] border border-[#F3F0E8]/[0.09] p-4.5 sm:p-6 lg:p-7 flex flex-col justify-between hover:border-[#F3F0E8]/[0.18] transition-all shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-3 gap-2">
                <span className="text-xs font-bold text-[#AAA69D] tracking-wider font-mono truncate">
                  {AI_BUSINESS.name}
                </span>
                <span className="text-[11px] text-[#74716A] font-medium shrink-0">Gelişmiş AI</span>
              </div>

              <div className="mb-3">
                <div className="text-3xl sm:text-4xl font-black text-[#F3F0E8] tracking-tight">
                  {AI_BUSINESS.price}
                </div>
                <div className="text-xs text-[#AAA69D] mt-0.5 font-medium">
                  {AI_BUSINESS.period}
                </div>
              </div>

              <p className="text-xs text-[#AAA69D] mb-5 leading-relaxed">
                {AI_BUSINESS.description}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-[#F3F0E8]/[0.06]">
                <div className="text-xs font-bold text-[#F3F0E8] uppercase tracking-wider">
                  Dahil Olanlar:
                </div>
                <ul className="space-y-2">
                  {AI_BUSINESS.features.map((feat, i) => (
                    <li key={i} className="text-xs text-[#AAA69D] flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#C6A76A] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#F3F0E8]/[0.06]">
              <button
                onClick={() => onSelectPackage(AI_BUSINESS.name)}
                id="btn-aibusiness-demo"
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#181918] hover:bg-[#1D1E1C] text-[#F3F0E8] hover:text-white text-xs font-medium tracking-wide flex items-center justify-center gap-2 border border-[#F3F0E8]/[0.15] transition-all duration-200 cursor-pointer"
              >
                <span>{AI_BUSINESS.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#AAA69D]" />
              </button>
            </div>
          </div>

        </div>

        {/* Subtle Payment Transparency & Boutique Terms */}
        <div className="mt-8 pt-6 border-t border-[#F3F0E8]/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#AAA69D] max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A]" />
            <span className="text-[#F3F0E8]">Ödeme: Proje başlangıcında %50, site tesliminde kalan %50.</span>
          </div>
          <div className="text-[#74716A] text-[11px] text-center sm:text-right">
            Teslim süresi projenin kapsamına göre belirlenir ve çalışma başlamadan önce netleştirilir.
          </div>
        </div>

      </div>
    </section>
  );
};

