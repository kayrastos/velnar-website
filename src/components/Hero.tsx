import React, { useState } from 'react';
import { CONFIG, getWhatsAppUrl } from '../config';
import { 
  ArrowRight, 
  MessageCircle, 
  Smartphone, 
  Search, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Globe,
  ChevronRight
} from 'lucide-react';

interface HeroProps {
  onDemoClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDemoClick }) => {
  const [activeTab, setActiveTab] = useState<'desktop' | 'mobile'>('desktop');
  const [activeIndustry, setActiveIndustry] = useState<number>(0);

  const previewSites = [
    {
      title: "Vip Motors • Otomotiv",
      tagline: "Lüks & Premium Araç Portföyü",
      tag: "Oto Galeri",
      pillBg: "bg-[#181918] text-[#AAA69D] border-[#F3F0E8]/[0.09]",
      cta: "WhatsApp ile İletişime Geç",
      metric: "99/100 Hız Skoru",
      features: ["Filtreli Araç Kataloğu", "Hızlı Kredi Başvurusu", "Konum & Yol Tarifi"]
    },
    {
      title: "Aura Klinik • Estetik & Güzellik",
      tagline: "Doğal Dokunuşlar, Uzman Bakım",
      tag: "Sağlık & Güzellik",
      pillBg: "bg-[#181918] text-[#AAA69D] border-[#F3F0E8]/[0.09]",
      cta: "Online Randevu Talep Et",
      metric: "Mobil Öncelikli UX",
      features: ["Hizmet & Tedavi Menüsü", "Öncesi / Sonrası Galerisi", "Doğrudan WhatsApp Hattı"]
    },
    {
      title: "Nove Bistro • Modern Mutfak",
      tagline: "Seçkin Lezzetler & Özel Atmosfer",
      tag: "Restoran & Kafe",
      pillBg: "bg-[#181918] text-[#AAA69D] border-[#F3F0E8]/[0.09]",
      cta: "Masa Rezervasyonu Yap",
      metric: "Dönüşüm Odaklı",
      features: ["Dijital QR Menü", "Anlık Rezervasyon", "Özel Etkinlikler"]
    }
  ];

  const currentPreview = previewSites[activeIndustry];

  return (
    <section id="hero" className="relative pt-24 pb-14 md:pt-28 md:pb-16 overflow-hidden bg-[#090A0A]">
      {/* Background Subtle Depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[300px] bg-[#141514] rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Grid pattern overlay with soft radial mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#F3F0E803_1px,transparent_1px),linear-gradient(to_bottom,#F3F0E803_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left w-full min-w-0">
            
            {/* Studio Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141514] border border-[#F3F0E8]/[0.09]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#AAA69D]">
                {CONFIG.TAGLINE}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#F3F0E8] leading-[1.14] break-words">
              İşletmenizi internette{' '}
              <span className="text-[#C6A76A]">
                daha güçlü gösteren
              </span>{' '}
              web siteleri.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#AAA69D] max-w-2xl leading-[1.65] font-normal">
              Hızlı, mobil uyumlu ve ziyaretçileri müşteriye dönüştürmeye odaklı web siteleri tasarlıyoruz. İşletmenize özel ücretsiz bir ana sayfa demosu hazırlayalım; beğenirseniz birlikte yayına alalım.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={onDemoClick}
                id="hero-primary-cta"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] hover:text-[#111211] font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer shadow-sm group"
              >
                <span>Ücretsiz Demomu Hazırla</span>
                <ArrowRight className="w-4 h-4 text-[#111211] group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={getWhatsAppUrl("Merhaba, web sitenizden ulaşıyorum. İşletmem için ücretsiz ana sayfa demosu hakkında görüşmek istiyorum.")}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-secondary-whatsapp-cta"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#141514] hover:bg-[#1D1E1C] text-[#F3F0E8] hover:text-white font-medium text-xs sm:text-sm border border-[#F3F0E8]/[0.15] transition-all duration-200 shadow-sm group"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
                <span>WhatsApp'tan Görüşelim</span>
              </a>
            </div>

            {/* Value / Trust Items Underneath */}
            <div className="pt-4 border-t border-[#F3F0E8]/[0.06] flex flex-wrap items-center gap-5 sm:gap-7 text-xs text-[#AAA69D]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#141514] border border-[#F3F0E8]/[0.09] flex items-center justify-center text-[#C6A76A]">
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-[#AAA69D]">Mobil uyumlu</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#141514] border border-[#F3F0E8]/[0.09] flex items-center justify-center text-[#C6A76A]">
                  <Search className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-[#AAA69D]">SEO temelli</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#141514] border border-[#F3F0E8]/[0.09] flex items-center justify-center text-[#C6A76A]">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-[#AAA69D]">Satış odaklı</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Browser/Device Mockup Representation */}
          <div className="lg:col-span-5 relative w-full min-w-0 max-w-full">
            
            {/* Top Mockup Controls (Industry switcher) */}
            <div className="flex items-center justify-between mb-2.5 px-0.5 gap-1.5 flex-nowrap w-full max-w-full overflow-hidden">
              <div className="flex items-center gap-1 bg-[#141514] p-1 rounded-xl border border-[#F3F0E8]/[0.09] text-xs overflow-x-auto max-w-[calc(100%-80px)] shrink">
                {previewSites.map((item, idx) => (
                  <button
                    key={item.tag}
                    onClick={() => setActiveIndustry(idx)}
                    className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all font-medium text-[10px] sm:text-[11px] whitespace-nowrap cursor-pointer shrink-0 ${
                      activeIndustry === idx
                        ? 'bg-[#F3F0E8] text-[#111211] font-semibold'
                        : 'text-[#AAA69D] hover:text-[#F3F0E8] hover:bg-[#181918]'
                    }`}
                  >
                    {item.tag}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 bg-[#141514] p-1 rounded-xl border border-[#F3F0E8]/[0.09] shrink-0">
                <button
                  onClick={() => setActiveTab('desktop')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'desktop' ? 'bg-[#181918] text-[#F3F0E8]' : 'text-[#74716A] hover:text-[#AAA69D]'
                  }`}
                  title="Masaüstü Görünümü"
                >
                  <Globe className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveTab('mobile')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'mobile' ? 'bg-[#181918] text-[#F3F0E8]' : 'text-[#74716A] hover:text-[#AAA69D]'
                  }`}
                  title="Mobil Görünüm"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* The Main Device Mockup Frame */}
            <div className={`relative mx-auto transition-all duration-300 rounded-2xl bg-[#141514] border border-[#F3F0E8]/[0.09] shadow-2xl overflow-hidden w-full max-w-full ${
              activeTab === 'mobile' ? 'max-w-[310px]' : 'w-full'
            }`}>
              
              {/* Browser Window Header */}
              <div className="bg-[#0E0F0F] px-4 py-2.5 border-b border-[#F3F0E8]/[0.09] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
                </div>
                <div className="bg-[#141514] px-3 py-0.5 rounded-md border border-[#F3F0E8]/[0.08] text-[10px] text-[#AAA69D] font-mono flex items-center gap-1.5 truncate max-w-[190px]">
                  <ShieldCheck className="w-3 h-3 text-[#C6A76A] shrink-0" />
                  <span className="truncate">ornek-isletme.com</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                  <span className="text-[10px] text-[#AAA69D] font-mono hidden sm:inline">Canlı Demo</span>
                </div>
              </div>

              {/* Simulated Website Canvas */}
              <div className="p-4 sm:p-5 bg-[#090A0A] min-h-[370px] flex flex-col justify-between text-left relative">
                
                {/* Simulated Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F3F0E8]/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#141514] border border-[#F3F0E8]/[0.15] flex items-center justify-center text-[10px] font-bold text-[#F3F0E8]">
                      <div className="w-2 h-2 rounded-xs bg-[#C6A76A]" />
                    </div>
                    <span className="font-bold text-xs text-[#F3F0E8] tracking-tight">{currentPreview.title}</span>
                  </div>
                  <div className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-[#141514] text-[#AAA69D] border border-[#F3F0E8]/[0.09] flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 text-[#C6A76A]" />
                    <span>{currentPreview.metric}</span>
                  </div>
                </div>

                {/* Simulated Hero Body */}
                <div className="py-3.5 space-y-2.5">
                  <span className={`inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${currentPreview.pillBg}`}>
                    {currentPreview.tag} Konsepti
                  </span>

                  <h3 className="text-base sm:text-lg font-bold text-[#F3F0E8] leading-tight">
                    {currentPreview.tagline}
                  </h3>

                  <p className="text-xs text-[#AAA69D] leading-relaxed">
                    İşletmenizin kurumsal kimliğini yansıtan, telefon ve WhatsApp üzerinden anında talep toplayan modern arayüz.
                  </p>

                  {/* Feature Pills */}
                  <div className="pt-1.5 space-y-1.5">
                    {currentPreview.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-[#AAA69D]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A76A] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Bottom Lead CTA Bar */}
                <div className="pt-3 border-t border-[#F3F0E8]/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#141514] border border-[#F3F0E8]/[0.09] flex items-center justify-center">
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-[#F3F0E8]">7/24 İletişim Hattı</div>
                      <div className="text-[9px] text-[#AAA69D]">Anında WhatsApp Yönlendirmesi</div>
                    </div>
                  </div>

                  <button
                    onClick={onDemoClick}
                    className="px-3 py-1.5 rounded-lg bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{currentPreview.cta}</span>
                    <ChevronRight className="w-3 h-3 text-[#111211]" />
                  </button>
                </div>

              </div>
            </div>

            {/* Floating Guarantee Badge */}
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-[#181918]/98 border border-[#F3F0E8]/[0.15] rounded-xl p-3 shadow-2xl backdrop-blur-md hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#141514] border border-[#F3F0E8]/[0.09] text-[#C6A76A] flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4 text-[#C6A76A]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#F3F0E8]">Ücretsiz Önizleme</div>
                <div className="text-[10px] text-[#AAA69D]">Beğenirseniz yayına alalım</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
