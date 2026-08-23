import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Smartphone, UserCheck, Search, ArrowUpRight } from 'lucide-react';

export const ProblemValue: React.FC = () => {
  const { t } = useLanguage();
  const pv = t.problemValue;

  const iconMap: Record<number, React.ElementType> = {
    0: Sparkles,
    1: Smartphone,
    2: UserCheck,
    3: Search
  };

  return (
    <section id="faydalar" className="py-16 md:py-20 bg-[#090A0A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141514] border border-[#F3F0E8]/[0.09] text-[10px] font-mono uppercase tracking-[0.16em] text-[#AAA69D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A]" />
            <span>{pv.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F3F0E8] tracking-tight leading-tight">
            {pv.heading}{' '}
            <span className="text-[#C6A76A]">
              {pv.headingHighlight}
            </span>
          </h2>
          <p className="text-[#AAA69D] text-sm sm:text-base">
            {pv.subtitle}
          </p>
        </div>

        {/* Compact 4-Column Desktop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {pv.items.map((card, index) => {
            const Icon = iconMap[index] || Sparkles;
            return (
              <div
                key={card.id}
                id={card.id}
                className="group p-5 sm:p-6 rounded-2xl bg-[#141514] hover:bg-[#181918] border border-[#F3F0E8]/[0.09] hover:border-[#F3F0E8]/[0.18] transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-[#181918] border border-[#F3F0E8]/[0.09] flex items-center justify-center mb-4 text-[#C6A76A]">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title / Problem */}
                  <h3 className="text-base font-bold text-[#F3F0E8] mb-2 group-hover:text-[#C6A76A] transition-colors">
                    {card.solution}
                  </h3>

                  {/* Description / Solution */}
                  <p className="text-xs sm:text-sm text-[#AAA69D] leading-relaxed">
                    {card.problem}
                  </p>
                </div>

                {/* Sub badge / Impact */}
                <div className="pt-4 mt-4 border-t border-[#F3F0E8]/[0.06] flex items-center justify-between text-xs text-[#AAA69D] font-medium">
                  <span className="group-hover:text-[#F3F0E8] transition-colors">{card.impact}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#74716A] group-hover:text-[#C6A76A] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};



