import React from 'react';
import { Sparkles, Smartphone, UserCheck, Search, ArrowUpRight } from 'lucide-react';

export const ProblemValue: React.FC = () => {
  const cards = [
    {
      id: 'val-first-impression',
      icon: Sparkles,
      title: 'Profesyonel İlk İzlenim',
      description: 'Müşterileriniz sizi ilk olarak internette değerlendirir. Markanıza güven kazandıran seçkin bir dijital vitrin sunuyoruz.',
      highlight: 'Güven veren tasarım'
    },
    {
      id: 'val-mobile-first',
      icon: Smartphone,
      title: 'Mobil Öncelikli',
      description: 'Ziyaretçilerinizin çoğu telefondan gelir. Tüm ekranlarda hızlı, akıcı ve hatasız bir kullanıcı deneyimi sağlıyoruz.',
      highlight: 'Kusursuz mobil deneyim'
    },
    {
      id: 'val-conversion',
      icon: UserCheck,
      title: 'Müşteriye Dönüşüm',
      description: 'WhatsApp, arama butonları ve net yönlendirmelerle ziyaretçileri doğrudan müşteriye dönüştürüyoruz.',
      highlight: 'Hızlı iletişim akışları'
    },
    {
      id: 'val-seo',
      icon: Search,
      title: 'Google İçin Sağlam Temel',
      description: 'Hız, temiz kod ve semantik yapıyla arama motorlarında doğru konumlanmanız için teknik temeli kuruyoruz.',
      highlight: 'Doğru teknik SEO'
    }
  ];

  return (
    <section id="faydalar" className="py-16 md:py-20 bg-[#090A0A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141514] border border-[#F3F0E8]/[0.09] text-[10px] font-mono uppercase tracking-[0.16em] text-[#AAA69D]">
            Temel Değer
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F3F0E8] tracking-tight leading-tight">
            Web siteniz işletmeniz için{' '}
            <span className="text-[#C6A76A]">
              müşteri üretmeli.
            </span>
          </h2>
          <p className="text-[#AAA69D] text-sm sm:text-base">
            Modern, hızlı ve sonuç odaklı bir web sitesinin işletmenize kazandıracakları.
          </p>
        </div>

        {/* Compact 4-Column Desktop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
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

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#F3F0E8] mb-2 group-hover:text-[#C6A76A] transition-colors">
                    {card.title}
                  </h3>

                  {/* Description - max 2 short sentences */}
                  <p className="text-xs sm:text-sm text-[#AAA69D] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Sub badge */}
                <div className="pt-4 mt-4 border-t border-[#F3F0E8]/[0.06] flex items-center justify-between text-xs text-[#AAA69D] font-medium">
                  <span className="group-hover:text-[#F3F0E8] transition-colors">{card.highlight}</span>
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

