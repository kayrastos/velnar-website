import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Check, Sparkles, ArrowRight, ShieldCheck, Tag, Info, Lock } from 'lucide-react';

interface PricingProps {
  onSelectPackage: (packageName: string) => void;
  onStartPayment?: (packageId: 'starter' | 'business' | 'ai-business') => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPackage, onStartPayment }) => {
  const { t, lang, isLaunchCampaign } = useLanguage();
  const pricingData = t.pricing;

  return (
    <section id="paketler" className="py-16 md:py-20 bg-[#090A0A] relative overflow-hidden">
      
      {/* Background depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[450px] h-[350px] bg-[#141514] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 md:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141514] border border-[#F3F0E8]/[0.09] text-[10px] font-mono uppercase tracking-[0.16em] text-[#AAA69D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A]" />
            <span>{pricingData.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F3F0E8] tracking-tight leading-tight">
            {pricingData.heading}
            <span className="text-[#C6A76A]">{pricingData.headingHighlight}</span>
          </h2>

          <p className="text-[#AAA69D] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {pricingData.subtitle}
          </p>

          {/* Restrained Campaign Banner */}
          {isLaunchCampaign && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181918] border border-[#C6A76A]/40 text-xs text-[#C6A76A] shadow-sm font-mono mt-2">
              <Tag className="w-3.5 h-3.5 shrink-0" />
              <span className="font-bold">{pricingData.launchBadgeText}</span>
              <span className="text-[#AAA69D] font-sans text-[11px] hidden sm:inline">· {pricingData.launchSubtext}</span>
            </div>
          )}
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch w-full max-w-full">
          {pricingData.plans.map((plan) => {
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                id={`pricing-card-${plan.id}`}
                className={`w-full min-w-0 relative rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col justify-between transition-all shadow-xl ${
                  isPopular
                    ? 'bg-[#181918] border border-[#C6A76A]/60 shadow-2xl lg:-translate-y-2 mt-4 lg:mt-0'
                    : 'bg-[#141514] border border-[#F3F0E8]/[0.09] hover:border-[#F3F0E8]/[0.18]'
                }`}
              >
                {/* Top Dominant Badge for Most Popular */}
                {isPopular && plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#C6A76A] text-[#111211] text-[10px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1 font-mono max-w-[calc(100%-2rem)]">
                    <Sparkles className="w-3 h-3 shrink-0" />
                    <span className="truncate">{plan.badge}</span>
                  </div>
                )}

                <div>
                  {/* Plan Top Header */}
                  <div className="flex items-center justify-between mb-3 gap-2 pt-1">
                    <span className={`text-xs font-bold tracking-wider font-mono truncate ${isPopular ? 'text-[#C6A76A]' : 'text-[#AAA69D]'}`}>
                      {plan.name}
                    </span>
                    {!isPopular && plan.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#181918] text-[#C6A76A] border border-[#C6A76A]/30 font-mono font-medium shrink-0">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* Pricing Display with Strikethrough & Launch Price */}
                  <div className="mb-3.5">
                    {isLaunchCampaign ? (
                      <div>
                        <div className="flex items-baseline gap-2.5 flex-wrap">
                          <span className="text-3xl sm:text-4xl font-black text-[#F3F0E8] tracking-tight">
                            {plan.launchPrice}
                          </span>
                          <span className="text-sm sm:text-base font-semibold text-[#74716A] line-through decoration-[#C6A76A]/60 font-mono">
                            {plan.standardPrice}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#AAA69D] mt-1 font-medium">
                          <span>{plan.period}</span>
                          <span className="text-[10px] text-[#C6A76A] font-mono px-1.5 py-0.5 rounded bg-[#C6A76A]/10 border border-[#C6A76A]/20">
                            -20%
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-3xl sm:text-4xl font-black text-[#F3F0E8] tracking-tight">
                          {plan.standardPrice}
                        </div>
                        <div className="text-xs text-[#AAA69D] mt-0.5 font-medium">
                          {plan.period}
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-[#AAA69D] mb-5 leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-4 border-t border-[#F3F0E8]/[0.06]">
                    <div className="text-[11px] font-bold text-[#F3F0E8] uppercase tracking-wider">
                      {isPopular 
                        ? (pricingData.popularScopeHeading || 'Kapsam & Özellikler') 
                        : (pricingData.includedHeading || 'Dahil Olanlar')}
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="text-xs text-[#AAA69D] flex items-start gap-2">
                          <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isPopular ? 'text-[#C6A76A]' : 'text-[#C6A76A]'}`} />
                          <span className={isPopular ? 'text-[#F3F0E8]/90' : 'text-[#AAA69D]'}>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.disclaimer && (
                      <div className="pt-2 text-[10.5px] text-[#74716A] leading-normal italic">
                        {plan.disclaimer}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-6 mt-6 border-t border-[#F3F0E8]/[0.06] space-y-2">
                  <button
                    onClick={() => onSelectPackage(plan.name)}
                    id={`btn-${plan.id}-select`}
                    className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                      isPopular
                        ? 'bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] shadow-md'
                        : 'bg-[#181918] hover:bg-[#1D1E1C] text-[#F3F0E8] hover:text-white border border-[#F3F0E8]/[0.15]'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isPopular ? 'text-[#111211]' : 'text-[#AAA69D]'}`} />
                  </button>

                  {onStartPayment && (
                    <button
                      onClick={() => onStartPayment(plan.id as any)}
                      id={`btn-${plan.id}-pay`}
                      className="w-full min-h-[38px] py-2 px-3 rounded-xl text-[11px] font-medium text-[#AAA69D] hover:text-[#F3F0E8] bg-[#141514] hover:bg-[#181918] border border-[#F3F0E8]/[0.08] hover:border-[#C6A76A]/40 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Lock className="w-3 h-3 text-[#C6A76A]" />
                      <span>{lang === 'en' ? 'Start with 50% Initial Payment' : 'Projeyi Başlat (%50 Ödeme)'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Scope Note if present */}
        {pricingData.customScopeNote && (
          <div className="mt-4 text-center">
            <p className="text-[11px] text-[#74716A] inline-flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#C6A76A]" />
              <span>{pricingData.customScopeNote}</span>
            </p>
          </div>
        )}

        {/* Trust & Payment Plan Row (Section 5 requirement) */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-[#141514] border border-[#F3F0E8]/[0.09] max-w-4xl mx-auto shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* 3 Pillars */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
              {pricingData.paymentPlan.items.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#181918] border border-[#C6A76A]/30 text-[#C6A76A] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C6A76A]" />
                    <span>{item}</span>
                  </span>
                  {idx < pricingData.paymentPlan.items.length - 1 && (
                    <span className="text-[#74716A] hidden sm:inline">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Supporting Payment Copy */}
            <p className="text-xs text-[#AAA69D] leading-relaxed md:max-w-md md:text-right">
              {pricingData.paymentPlan.copy}
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};


