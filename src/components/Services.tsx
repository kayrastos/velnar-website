import React from 'react';
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
  const services = [
    {
      id: 'srv-web-tasarim',
      title: 'Web Tasarım',
      description: 'Markanıza özel modern kullanıcı arayüzleri.',
      icon: Palette,
      highlights: ['Kullanıcı dostu UX/UI', 'Özgün tipografi & renkler', 'Yüksek marka algısı']
    },
    {
      id: 'srv-web-gelistirme',
      title: 'Web Geliştirme',
      description: 'Hızlı, responsive ve sürdürülebilir web siteleri.',
      icon: Code2,
      highlights: ['Ultra hızlı yükleme', 'Mobil & tablet kusursuzluğu', 'Temiz ve modern kodlama']
    },
    {
      id: 'srv-landing-page',
      title: 'Landing Page',
      description: 'Reklam ve kampanyalar için dönüşüm odaklı sayfalar.',
      icon: Target,
      highlights: ['Doğrudan satış odaklı', 'A/B testine uygun yapı', 'Net harekete geçirici mesajlar']
    },
    {
      id: 'srv-seo-temelleri',
      title: 'SEO Temelleri',
      description: 'Teknik yapı, metadata ve arama motoru görünürlüğü için sağlam başlangıç.',
      icon: Search,
      highlights: ['Semantik HTML etiketleri', 'Open Graph & meta veriler', 'Google Search Console uyumu']
    },
    {
      id: 'srv-whatsapp-lead',
      title: 'WhatsApp & Lead Akışı',
      description: 'Ziyaretçileri mümkün olduğunca hızlı iletişime yönlendiren akışlar.',
      icon: MessageSquareShare,
      highlights: ['Tek tıkla WhatsApp hattı', 'Hazır mesaj şablonları', 'Kayba yer bırakmayan iletişim']
    },
    {
      id: 'srv-ai-cozumleri',
      title: 'AI Çözümleri',
      description: 'İhtiyaca göre chatbot, otomasyon ve yapay zekâ destekli özellikler.',
      icon: Bot,
      highlights: ['7/24 Müşteri yanıt botu', 'Otomatik lead toplama', 'İşletmeye özel akıllı yönlendirme']
    }
  ];

  return (
    <section id="hizmetler" className="py-24 bg-[#0E0F0F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141514] border border-[#F3F0E8]/[0.09] text-[10px] font-mono uppercase tracking-[0.16em] text-[#AAA69D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A]" />
            <span>Hizmet Yelpazesi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F3F0E8] tracking-tight leading-tight">
            İhtiyacınız olan dijital temel,{' '}
            <span className="text-[#C6A76A]">
              tek yerde.
            </span>
          </h2>
          <p className="text-[#AAA69D] text-sm sm:text-base leading-relaxed">
            Karmaşık süreçleri ve gereksiz maliyetleri ortadan kaldırarak işletmenizi dijitale en doğru şekilde taşıyoruz.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item) => {
            const Icon = item.icon;
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
                    <span>Bu hizmet için demo isteyin</span>
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

