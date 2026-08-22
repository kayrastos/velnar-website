import React from 'react';
import { 
  Sparkles, 
  Smartphone, 
  Layers, 
  BadgeCheck, 
  HeadphonesIcon, 
  Cpu, 
  CheckCircle2 
} from 'lucide-react';

export const WhyUs: React.FC = () => {
  const differentiators = [
    {
      id: 'why-custom-design',
      title: 'İşletmenize özel tasarım yaklaşımı',
      desc: 'Rakiplerinizden sıyrılmanız için markanızın karakterini, renklerini ve hedef kitlesini yansıtan özgün arayüzler üretiyoruz.',
      icon: Sparkles
    },
    {
      id: 'why-mobile-speed',
      title: 'Mobil ve hız odaklı geliştirme',
      desc: 'Müşterilerinizin beklemediği, anında açılan ve telefonlarda pürüzsüz kayan hafif ve optimize bir kod tabanı kuruyoruz.',
      icon: Smartphone
    },
    {
      id: 'why-no-bloat',
      title: 'Gereksiz özelliklerle şişirilmemiş yapı',
      desc: 'Kullanılmayan eklentiler ve ağır sistemler yerine, sadece işletmenizin büyümesine doğrudan katkı sunan işlevlere odaklanıyoruz.',
      icon: Layers
    },
    {
      id: 'why-transparent-pricing',
      title: 'Net fiyatlandırma',
      desc: 'Süreç boyunca gizli maliyet veya sürpriz masraflar olmadan, neyi ne kadara aldığınızı en baştan net şekilde biliyorsunuz.',
      icon: BadgeCheck
    },
    {
      id: 'why-aftercare',
      title: 'Yayın sonrası destek seçeneği',
      desc: 'Siteniz canlıya geçtikten sonra yalnız değilsiniz. İçerik güncellemeleri, teknik bakım ve geliştirmeler için yanınızdayız.',
      icon: HeadphonesIcon
    },
    {
      id: 'why-ai-speed',
      title: 'Modern AI araçlarından yararlanan hızlı üretim süreci',
      desc: 'Yapay zekâyı tasarım ve geliştirme süreçlerimizi hızlandırmak için bir araç olarak kullanıyor, her detayı insan gözüyle titizlikle özelleştiriyoruz.',
      icon: Cpu
    }
  ];

  return (
    <section id="neden-biz" className="py-24 bg-[#090A0A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141514] border border-[#F3F0E8]/[0.09] text-[10px] font-mono uppercase tracking-[0.16em] text-[#AAA69D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A]" />
            <span>Farkımız & İlkelerimiz</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F3F0E8] tracking-tight leading-tight">
            Hazır şablon değil,{' '}
            <span className="text-[#C6A76A]">
              işletmenize göre tasarım.
            </span>
          </h2>
          <p className="text-[#AAA69D] text-sm sm:text-base leading-relaxed">
            Her işletmenin hikayesi ve müşterisi farklıdır. Kalıplara sıkışmadan, size özel bir dijital çözüm üretiyoruz.
          </p>
        </div>

        {/* 6 Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((diff) => {
            const Icon = diff.icon;
            return (
              <div
                key={diff.id}
                id={diff.id}
                className="p-7 rounded-2xl bg-[#141514] border border-[#F3F0E8]/[0.09] hover:border-[#C6A76A]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#181918] border border-[#F3F0E8]/[0.09] flex items-center justify-center mb-5 text-[#C6A76A]">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-[#F3F0E8] mb-2 leading-snug">
                    {diff.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#AAA69D] leading-relaxed">
                    {diff.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F3F0E8]/[0.06] flex items-center gap-2 text-[11px] text-[#AAA69D]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A76A]" />
                  <span>Kişiselleştirilmiş Çözüm</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

