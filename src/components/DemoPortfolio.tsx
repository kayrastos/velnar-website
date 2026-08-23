import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DemoItem } from '../types';
import { 
  Eye, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle,
  ExternalLink
} from 'lucide-react';

interface DemoPortfolioProps {
  onSelectDemo: (demo: DemoItem) => void;
  onDemoClick: () => void;
}

export const DemoPortfolio: React.FC<DemoPortfolioProps> = ({ onSelectDemo, onDemoClick }) => {
  const { t, lang } = useLanguage();
  const portfolioData = t.portfolio;

  const getCleanDomain = (url?: string) => {
    if (!url) return 'velnar.studio';
    return url.replace('https://', '').replace('http://', '').replace(/\/$/, '');
  };

  return (
    <section id="demolar" className="py-16 md:py-20 bg-[#0E0F0F] border-y border-[#F3F0E8]/[0.06] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3.5 mb-12 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141514] border border-[#F3F0E8]/[0.09] text-[10px] font-mono uppercase tracking-[0.16em] text-[#AAA69D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A]" />
            <span>{portfolioData.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F3F0E8] tracking-tight leading-tight">
            {portfolioData.heading}
            <span className="text-[#C6A76A]">{portfolioData.headingHighlight}</span>
          </h2>

          <p className="text-[#AAA69D] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {portfolioData.subtitle}
          </p>
        </div>

        {/* 3 Visual Website Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {portfolioData.items.map((demo) => (
            <div
              key={demo.id}
              id={`portfolio-${demo.id}`}
              className="rounded-2xl bg-[#141514] border border-[#F3F0E8]/[0.09] hover:border-[#F3F0E8]/[0.18] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl group hover:-translate-y-1"
            >
              
              {/* Realistic Website / Browser Showcase Window (Clickable to open live demo) */}
              <a
                href={demo.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 pb-0 bg-[#090A0A] block cursor-pointer group/preview"
                title={`${demo.title} ${portfolioData.viewLiveCta}`}
              >
                {/* Browser Chrome Header */}
                <div className="rounded-t-xl bg-[#0E0F0F] border border-b-0 border-[#F3F0E8]/[0.09] px-3.5 py-2 flex items-center justify-between group-hover/preview:border-[#C6A76A]/40 transition-colors">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
                    <div className="flex items-center gap-1 ml-1.5 sm:ml-2 px-2 py-0.5 bg-[#141514] rounded text-[10px] text-[#AAA69D] font-mono truncate max-w-[120px] sm:max-w-none">
                      <span className="hidden xs:inline">https://</span>
                      <span className="text-[#F3F0E8] font-medium truncate">{getCleanDomain(demo.demoUrl)}</span>
                    </div>
                  </div>
                  
                  {/* CANLI DEMO Label */}
                  <div className="px-2 py-0.5 rounded bg-[#181918] border border-[#C6A76A]/30 text-[9px] font-mono uppercase tracking-wider text-[#C6A76A] flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A] animate-pulse" />
                    <span>{portfolioData.liveBadge}</span>
                  </div>
                </div>

                {/* Simulated Realistic Website Body */}
                <div className="bg-[#090A0A] border border-[#F3F0E8]/[0.09] border-t-0 p-4 text-left flex flex-col justify-between min-h-[220px] relative overflow-hidden transition-colors group-hover/preview:border-[#C6A76A]/40">
                  
                  {/* Simulated Nav */}
                  <div className="flex items-center justify-between border-b border-[#F3F0E8]/[0.06] pb-2.5">
                    <span className="text-xs font-bold tracking-tight text-[#F3F0E8] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#C6A76A]" />
                      {demo.title}
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-md border bg-[#181918] text-[#AAA69D] border-[#F3F0E8]/[0.09]">
                      {demo.category}
                    </span>
                  </div>

                  {/* Simulated Hero Content */}
                  <div className="py-2.5 space-y-1.5">
                    <h4 className="text-sm font-bold text-[#F3F0E8] leading-snug">
                      {demo.mockContent.headline}
                    </h4>
                    <p className="text-xs text-[#AAA69D] line-clamp-2 leading-relaxed">
                      {demo.mockContent.subheadline}
                    </p>
                  </div>

                  {/* Highlights Mini Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {demo.mockContent.highlights.map((h, i) => (
                      <span key={i} className="text-[10px] bg-[#141514] text-[#AAA69D] border border-[#F3F0E8]/[0.06] px-2 py-0.5 rounded-md">
                        • {h}
                      </span>
                    ))}
                  </div>

                  {/* Simulated Website CTA Bar */}
                  <div className="pt-2.5 mt-2 flex items-center justify-between border-t border-[#F3F0E8]/[0.06] text-[11px]">
                    <span className="text-[#25D366] font-medium flex items-center gap-1.5 text-xs">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{demo.mockContent.cta}</span>
                    </span>
                    <span className="text-[#74716A] text-[10px] font-mono">{lang === 'en' ? '100% Mobile Ready' : '%100 Mobil Uyumlu'}</span>
                  </div>

                </div>

              </a>

              {/* Bottom Card Content & Actions */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#C6A76A]">
                      {demo.category}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#F3F0E8] mb-1.5 transition-colors">
                    {demo.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#AAA69D] leading-relaxed">
                    {demo.description}
                  </p>

                  <ul className="mt-3.5 space-y-2 border-t border-[#F3F0E8]/[0.06] pt-3.5">
                    {demo.features.map((f, i) => (
                      <li key={i} className="text-xs text-[#AAA69D] flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A76A] shrink-0 mt-0.5" />
                        <span className="text-[#AAA69D]">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary Actions: Canlı Demoyu Gör + Ücretsiz Demo İste */}
                <div className="pt-4 border-t border-[#F3F0E8]/[0.06] flex items-center gap-2.5">
                  <a
                    href={demo.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`btn-live-demo-${demo.id}`}
                    className="flex-1 min-h-[44px] py-2.5 px-3.5 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{portfolioData.viewLiveCta}</span>
                  </a>

                  <button
                    onClick={onDemoClick}
                    id={`btn-request-demo-${demo.id}`}
                    className="min-h-[44px] py-2.5 px-3.5 rounded-xl bg-[#141514] hover:bg-[#1D1E1C] text-[#F3F0E8] hover:text-white text-xs font-medium flex items-center justify-center gap-1 border border-[#F3F0E8]/[0.15] transition-all duration-200 cursor-pointer"
                  >
                    <span>{lang === 'en' ? 'Get Concept' : 'Demo İste'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Transparent Boutique Note */}
        <div className="mt-8 text-center text-xs text-[#74716A] max-w-2xl mx-auto leading-relaxed">
          {portfolioData.trustNote}
        </div>

      </div>
    </section>
  );
};


