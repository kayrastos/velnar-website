import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config';

export const FAQ: React.FC = () => {
  const { t, lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqData = t.faq;

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const whatsappMessage = lang === 'en'
    ? "Hello, I visited your website and have a question regarding your services."
    : "Merhaba, web sitenizdeki SSS bölümünü okudum, bir konuda danışmak istiyorum.";

  return (
    <section id="sss" className="py-14 md:py-16 bg-[#090A0A] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2.5 mb-10 md:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141514] border border-[#F3F0E8]/[0.09] text-[10px] font-mono uppercase tracking-[0.16em] text-[#AAA69D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A]" />
            <span>{faqData.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F3F0E8] tracking-tight leading-tight">
            {faqData.heading}{' '}
            <span className="text-[#C6A76A]">{faqData.headingHighlight}</span>
          </h2>
          <p className="text-[#AAA69D] text-xs sm:text-sm">
            {faqData.subtitle}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqData.items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                id={`faq-item-${index}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-[#181918] border-[#C6A76A]/40 shadow-lg' 
                    : 'bg-[#141514] border-[#F3F0E8]/[0.09] hover:border-[#F3F0E8]/[0.18]'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full min-h-[44px] p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs sm:text-sm font-bold text-[#F3F0E8] leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-[#C6A76A] text-[#111211] rotate-180' : 'bg-[#181918] text-[#AAA69D] border border-[#F3F0E8]/[0.09]'
                  }`}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 pt-0 text-xs sm:text-sm text-[#AAA69D] leading-relaxed border-t border-[#F3F0E8]/[0.06] animate-fadeIn font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="mt-8 p-4 rounded-2xl bg-[#141514] border border-[#F3F0E8]/[0.09] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-left space-y-0.5">
            <div className="text-xs font-bold text-[#F3F0E8]">{faqData.stillHaveQuestion}</div>
            <div className="text-[11px] text-[#AAA69D]">{faqData.askWhatsApp}</div>
          </div>
          <a
            href={getWhatsAppUrl(whatsappMessage, lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#181918] hover:bg-[#1D1E1C] text-[#F3F0E8] hover:text-white border border-[#F3F0E8]/[0.15] text-xs font-medium flex items-center justify-center gap-1.5 transition-all shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};



