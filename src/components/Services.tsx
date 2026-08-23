import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Palette, 
  Code2, 
  Target, 
  Search, 
  MessageSquareShare, 
  Bot, 
  Check, 
  ArrowRight 
} from 'lucide-react';

interface ServicesProps {
  onDemoClick: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onDemoClick }) => {
  const { t } = useLanguage();
  const srvData = t.services;

  const iconList = [
    Palette, 
    Code2, 
    Target, 
    Search, 
    MessageSquareShare, 
    Bot
  ];

  return (
    <section id="hizmetler" className="py-24 bg-[#0E0F0F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141514] border border-[#F3F0E8]/[0.09] text-[10px] font-mono uppercase tracking-[0.16em] text-[#AAA69D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A]" />
            <span>{srvData.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F3F0E8] tracking-tight leading-tight">
            {srvData.heading}{' '}
            <span className="text-[#C6A76A]">
              {srvData.headingHighlight}
            </span>
          </h2>
          <p className="text-[#AAA69D] text-sm sm:text-base leading-relaxed">
            {srvData.subtitle}
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {srvData.items.map((item, index) => {
            const Icon = iconList[index] || Palette;
            return (
              <div
                key={item.id}
                id={item.id}
                className="group p-7 rounded-2xl bg-[#141514] border border-[#F3F0E8]/[0.09] hover:border-[#C6A76A]/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#181918] border border-[#F3F0E8]/[0.09] flex items-center justify-center mb-6 text-[#C6A76A]">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-[#F3F0E8] mb-2 group-hover:text-[#C6A76A] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#AAA69D] leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-[#F3F0E8]/[0.06] pt-4">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-[#AAA69D] flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C6A76A] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 mt-5 border-t border-[#F3F0E8]/[0.06]">
                  <button
                    onClick={onDemoClick}
                    className="w-full text-left text-xs font-semibold text-[#AAA69D] group-hover:text-[#F3F0E8] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{srvData.requestDemoText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#C6A76A]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

