import React from 'react';
import { SearchCheck, Palette, SlidersHorizontal, Rocket, ShieldCheck, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onDemoClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onDemoClick }) => {
  const steps = [
    {
      num: '01',
      title: 'İşletmenizi İnceliyoruz',
      description: 'Sektörünüzü, hizmetlerinizi ve hedeflerinizi kısaca değerlendiriyoruz.',
      icon: SearchCheck,
    },
    {
      num: '02',
      title: 'Ücretsiz Demo Hazırlıyoruz',
      description: 'İşletmenize özel örnek ana sayfa tasarımını hazırlayıp size sunuyoruz.',
      icon: Palette,
      highlight: true
    },
    {
      num: '03',
      title: 'Birlikte Netleştiriyoruz',
      description: 'Görüşleriniz doğrultusunda içerik, renk ve detayları mükemmelleştiriyoruz.',
      icon: SlidersHorizontal,
    },
    {
      num: '04',
      title: 'Yayına Alıyoruz',
      description: 'Hız, SEO ve formlar manuel olarak kontrol edilir; siteniz onayınızla yayına açılır.',
      icon: Rocket,
    }
  ];

  return (
    <section id="surec" className="py-16 md:py-20 bg-[#0E0F0F] border-y border-[#F3F0E8]/[0.06] relative overflow-hidden">
      
      {/* Subtle depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[200px] bg-[#141514] blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141514] border border-[#F3F0E8]/[0.09] text-[10px] font-mono uppercase tracking-[0.16em] text-[#AAA69D]">
            Şeffaf Süreç
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F3F0E8] tracking-tight leading-tight">
            Web sitenizi yaptırmadan önce{' '}
            <span className="text-[#C6A76A]">
              nasıl görüneceğini görün.
            </span>
          </h2>
          <p className="text-[#AAA69D] text-sm sm:text-base">
            Sürpriz yok, risk yok. Önce somut demoyu görün, kararı sonra verin.
          </p>
        </div>

        {/* Desktop Horizontal 4-Step Timeline / Mobile Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative mb-10">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                id={`step-${step.num}`}
                className={`relative p-5 sm:p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between group shadow-lg ${
                  step.highlight 
                    ? 'border border-[#C6A76A]/40 bg-[#181918]' 
                    : 'bg-[#141514] border border-[#F3F0E8]/[0.09] hover:border-[#F3F0E8]/[0.18]'
                }`}
              >
                {/* Connecting arrow indicator for desktop between steps */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#74716A]">
                    <div className="w-6 h-6 rounded-full bg-[#0E0F0F] border border-[#F3F0E8]/[0.1] flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-[#AAA69D]" />
                    </div>
                  </div>
                )}

                <div>
                  {/* Step Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-[#74716A] group-hover:text-[#C6A76A] transition-colors">
                      {step.num}
                    </span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      step.highlight 
                        ? 'bg-[#141514] text-[#C6A76A] border border-[#C6A76A]/40' 
                        : 'bg-[#181918] border border-[#F3F0E8]/[0.09] text-[#AAA69D] group-hover:text-[#C6A76A]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#F3F0E8] mb-2 group-hover:text-[#C6A76A] transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#AAA69D] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {step.highlight && (
                  <div className="pt-3 mt-3 border-t border-[#C6A76A]/20 text-[11px] font-mono text-[#C6A76A] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A]" />
                    <span>Sıfır Risk & Ücretsiz</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Zero-Risk & Boutique Control Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#141514] border border-[#F3F0E8]/[0.15] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#181918] border border-[#F3F0E8]/[0.09] flex items-center justify-center text-[#C6A76A] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#F3F0E8]">
                Demo tamamen ücretsizdir. Satın alma zorunluluğu yoktur.
              </div>
              <div className="text-xs text-[#AAA69D]">
                Her proje işletmenin ihtiyaçlarına göre özelleştirilir ve yayın öncesinde manuel olarak kontrol edilir.
              </div>
            </div>
          </div>

          <button
            onClick={onDemoClick}
            id="how-it-works-cta-btn"
            className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] text-xs font-semibold flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer shrink-0"
          >
            Hemen Demo İste
          </button>
        </div>

      </div>
    </section>
  );
};

