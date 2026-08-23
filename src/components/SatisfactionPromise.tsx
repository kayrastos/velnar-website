import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, CheckCircle2, ArrowRight, Eye, Split, FileCheck } from 'lucide-react';

interface SatisfactionPromiseProps {
  onDemoClick: () => void;
}

export const SatisfactionPromise: React.FC<SatisfactionPromiseProps> = ({ onDemoClick }) => {
  const { t } = useLanguage();
  const promise = t.pricing.satisfactionPromise;

  const pillarIcons = [Eye, Split, FileCheck];

  return (
    <section id="guvence" className="py-16 md:py-20 bg-[#090A0A] relative overflow-hidden border-t border-[#F3F0E8]/[0.06]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[300px] bg-[#141514] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Trust Container */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#141514] border border-[#C6A76A]/30 p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden">
          
          {/* Subtle gold decorative gradient line on top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C6A76A]/60 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Heading, Primary Promise Copy & Disclaimers */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181918] border border-[#C6A76A]/40 text-[10px] font-mono uppercase tracking-[0.16em] text-[#C6A76A]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{promise.badge}</span>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F3F0E8] tracking-tight leading-tight">
                {promise.heading}
              </h2>

              {/* Primary Paragraphs */}
              <div className="space-y-3 text-sm sm:text-base text-[#AAA69D] leading-relaxed">
                <p className="font-normal text-[#F3F0E8]/90">
                  {promise.p1}
                </p>
                <p className="font-normal">
                  {promise.p2}
                </p>
              </div>

              {/* Strict Disclaimer Note */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#0E0F0F] border border-[#F3F0E8]/[0.08] text-[11px] sm:text-xs text-[#74716A] leading-relaxed flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A] shrink-0 mt-1.5" />
                <span>{promise.note}</span>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={onDemoClick}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t.nav.ctaButton}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Right Column: 3 Structured Trust Pillars */}
            <div className="lg:col-span-5 space-y-3 sm:space-y-4">
              {promise.highlights.map((item, idx) => {
                const IconComponent = pillarIcons[idx] || CheckCircle2;
                return (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-xl bg-[#181918] border border-[#F3F0E8]/[0.08] hover:border-[#C6A76A]/40 transition-all flex items-start gap-3.5"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#0E0F0F] border border-[#C6A76A]/30 flex items-center justify-center shrink-0 text-[#C6A76A]">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xs sm:text-sm font-bold text-[#F3F0E8]">
                        {item.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#AAA69D] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
