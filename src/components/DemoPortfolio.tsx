import React from 'react';
import { DemoItem } from '../types';
import { 
  Eye, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle
} from 'lucide-react';

interface DemoPortfolioProps {
  onSelectDemo: (demo: DemoItem) => void;
  onDemoClick: () => void;
}

export const DemoPortfolio: React.FC<DemoPortfolioProps> = ({ onSelectDemo, onDemoClick }) => {
  const demos: DemoItem[] = [
    {
      id: 'demo-otomotiv',
      category: 'Otomotiv',
      title: 'Premium Oto Galeri',
      description: 'Lüks araç vitrini, akıllı filtreleme ve anlık WhatsApp ekspertiz hattı.',
      demoUrl: '', // Ready for future live URL
      features: [
        'Akıllı filtreli araç portföyü',
        'Tek tıkla WhatsApp ekspertiz hattı',
        'Kredi & takas hesaplama yönlendirmesi'
      ],
      mockupTheme: {
        accent: '#C6A76A',
        bg: 'bg-[#090A0A]',
        badge: 'bg-[#181918] text-[#AAA69D] border-[#F3F0E8]/[0.09]'
      },
      mockContent: {
        headline: 'Seçkin Otomobil Portföyü & Güvenilir Satış',
        subheadline: 'Ekspertiz garantili ve teslime hazır lüks araç koleksiyonu.',
        cta: 'WhatsApp ile Bilgi Al',
        highlights: ['50+ Hazır Araç', 'Ekspertiz Garantisi', 'Hızlı Kredi Onayı']
      }
    },
    {
      id: 'demo-guzellik',
      category: 'Güzellik & Wellness',
      title: 'Estetik & Güzellik Merkezi',
      description: 'Hizmetleri öne çıkaran, güven oluşturan ve randevu akışını hızlandıran tasarım.',
      demoUrl: '', // Ready for future live URL
      features: [
        'Ayrıntılı seans & tedavi menüsü',
        'Öncesi / Sonrası sonuç galerisi',
        'Doğrudan online randevu akışı'
      ],
      mockupTheme: {
        accent: '#C6A76A',
        bg: 'bg-[#090A0A]',
        badge: 'bg-[#181918] text-[#AAA69D] border-[#F3F0E8]/[0.09]'
      },
      mockContent: {
        headline: 'Güzelliğinizi Profesyonel Dokunuşlarla Taçlandırın',
        subheadline: 'Kişiye özel cilt bakımı, medikal estetik ve lazer seansları.',
        cta: 'Randevu Talebi Oluştur',
        highlights: ['Uzman Kadro', 'FDA Onaylı Teknoloji', 'Ücretsiz Ön Görüşme']
      }
    },
    {
      id: 'demo-restoran',
      category: 'Restoran',
      title: 'Modern Restoran & Bistro',
      description: 'Mobil öncelikli QR menü, anlık masa rezervasyonu ve özel atmosfer sunumu.',
      demoUrl: '', // Ready for future live URL
      features: [
        'Mobil uyumlu görsel dijital QR menü',
        'Anlık WhatsApp & telefon rezervasyonu',
        'Çalışma saatleri ve canlı yol tarifi'
      ],
      mockupTheme: {
        accent: '#C6A76A',
        bg: 'bg-[#090A0A]',
        badge: 'bg-[#181918] text-[#AAA69D] border-[#F3F0E8]/[0.09]'
      },
      mockContent: {
        headline: 'Geleneksel Lezzetler, Çağdaş Sunum',
        subheadline: 'Özenle seçilmiş taze malzemeler ve seçkin şef menüleri.',
        cta: 'Masa Rezervasyonu Yap',
        highlights: ['Zengin Gurme Menü', 'Özel Akşam Masası', 'Merkezi Konum']
      }
    }
  ];

  const handleLiveDemoClick = (demo: DemoItem) => {
    if (demo.demoUrl && demo.demoUrl.trim() !== '') {
      window.open(demo.demoUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Open the interactive preview modal
      onSelectDemo(demo);
    }
  };

  return (
    <section id="demolar" className="py-16 md:py-20 bg-[#0E0F0F] border-y border-[#F3F0E8]/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Strong Demo Principle */}
        <div className="max-w-3xl mx-auto text-center space-y-3.5 mb-12 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141514] border border-[#F3F0E8]/[0.09] text-[10px] font-mono uppercase tracking-[0.16em] text-[#AAA69D]">
            Örnek Çalışmalar
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F3F0E8] tracking-tight leading-tight">
            Görmeden karar vermeyin.
          </h2>
          <p className="text-[#AAA69D] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Satış konuşmasından önce işletmeniz için hazırlanmış bir ana sayfa konsepti görün. Önce sonucu değerlendirin, sonra karar verin.
          </p>
        </div>

        {/* 3 Visual Website Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {demos.map((demo) => (
            <div
              key={demo.id}
              id={`portfolio-${demo.id}`}
              className="rounded-2xl bg-[#141514] border border-[#F3F0E8]/[0.09] hover:border-[#F3F0E8]/[0.18] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl group hover:-translate-y-1"
            >
              
              {/* Realistic Website / Browser Showcase Window */}
              <div className="p-3.5 pb-0 bg-[#090A0A]">
                
                {/* Browser Chrome Header */}
                <div className="rounded-t-xl bg-[#0E0F0F] border border-b-0 border-[#F3F0E8]/[0.09] px-3.5 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
                    <div className="hidden sm:flex items-center gap-1 ml-2 px-2 py-0.5 bg-[#141514] rounded text-[10px] text-[#AAA69D] font-mono">
                      <span>https://</span>
                      <span className="text-[#F3F0E8]">{demo.id.replace('demo-', '')}.velnar.studio</span>
                    </div>
                  </div>
                  
                  {/* KONSEPT DEMO Label */}
                  <div className="px-2 py-0.5 rounded bg-[#181918] border border-[#F3F0E8]/[0.09] text-[9px] font-mono uppercase tracking-wider text-[#AAA69D]">
                    KONSEPT DEMO
                  </div>
                </div>

                {/* Simulated Realistic Website Body */}
                <div className="bg-[#090A0A] border border-[#F3F0E8]/[0.09] border-t-0 p-4 text-left flex flex-col justify-between min-h-[220px] relative overflow-hidden transition-colors">
                  
                  {/* Simulated Nav */}
                  <div className="flex items-center justify-between border-b border-[#F3F0E8]/[0.06] pb-2.5">
                    <span className="text-xs font-bold tracking-tight text-[#F3F0E8] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#C6A76A]" />
                      {demo.title}
                    </span>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-md border ${demo.mockupTheme.badge}`}>
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
                    <span className="text-[#74716A] text-[10px] font-mono">%100 Mobil Uyumlu</span>
                  </div>

                </div>

              </div>

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
                  <button
                    onClick={() => handleLiveDemoClick(demo)}
                    id={`btn-live-demo-${demo.id}`}
                    className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Canlı Demoyu Gör</span>
                  </button>

                  <button
                    onClick={onDemoClick}
                    id={`btn-request-demo-${demo.id}`}
                    className="py-2.5 px-3.5 rounded-xl bg-[#141514] hover:bg-[#1D1E1C] text-[#F3F0E8] hover:text-white text-xs font-medium flex items-center justify-center gap-1 border border-[#F3F0E8]/[0.15] transition-all duration-200 cursor-pointer"
                    title="İşletmeniz için ücretsiz demo isteyin"
                  >
                    <span>Demo İste</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Transparent Boutique Note */}
        <div className="mt-8 text-center text-xs text-[#74716A] max-w-2xl mx-auto leading-relaxed">
          * Yukarıdaki çalışmalar konsept demolarıdır. Her proje işletmenin ihtiyaçlarına göre özelleştirilir ve yayın öncesinde manuel olarak kontrol edilir.
        </div>

      </div>
    </section>
  );
};

