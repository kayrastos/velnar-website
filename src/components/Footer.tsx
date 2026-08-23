import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CONFIG, getWhatsAppUrl } from '../config';
import { VelnarLogo } from './VelnarLogo';
import { Mail, Instagram, MessageCircle, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (type: 'kvkk' | 'gizlilik') => void;
  onDemoClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onDemoClick }) => {
  const { t, lang } = useLanguage();
  const footerData = t.footer;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: t.nav.work, href: '#demolar' },
    { label: t.nav.services, href: '#faydalar' },
    { label: t.nav.process, href: '#surec' },
    { label: t.nav.pricing, href: '#paketler' },
    { label: t.nav.faq, href: '#sss' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer id="footer" className="bg-[#090A0A] border-t border-[#F3F0E8]/[0.06] pt-14 pb-10 text-[#AAA69D] text-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#F3F0E8]/[0.06]">
          
          {/* Col 1: Brand & Description (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <VelnarLogo />

            <p className="text-[#F3F0E8]/80 text-xs font-mono tracking-wide">
              {footerData.tagline}
            </p>

            <p className="text-[#AAA69D] text-xs sm:text-sm max-w-sm leading-relaxed">
              {footerData.remoteNotice}
            </p>

            <div className="flex items-center gap-2 text-xs text-[#74716A]">
              <MapPin className="w-3.5 h-3.5 text-[#74716A]" />
              <span>{lang === 'en' ? 'Istanbul · Available for Global Projects' : CONFIG.LOCATION}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <div className="text-xs font-semibold text-[#F3F0E8] uppercase tracking-wider">
              {footerData.quickLinksTitle}
            </div>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-[#AAA69D] hover:text-[#F3F0E8] transition-colors py-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onDemoClick}
                  className="text-[#F3F0E8] hover:text-[#C6A76A] font-medium transition-colors cursor-pointer py-1 inline-block"
                >
                  {t.nav.ctaButton}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Channels (4 cols) */}
          <div className="lg:col-span-4 space-y-3 text-left">
            <div className="text-xs font-semibold text-[#F3F0E8] uppercase tracking-wider">
              {footerData.contactTitle}
            </div>
            
            <div className="space-y-2.5">
              <a
                href={`mailto:${CONFIG.EMAIL}`}
                className="flex items-center gap-2.5 text-[#AAA69D] hover:text-[#F3F0E8] transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#141514] border border-[#F3F0E8]/[0.09] flex items-center justify-center text-[#C6A76A] group-hover:border-[#C6A76A]/40">
                  <Mail className="w-3.5 h-3.5 text-[#C6A76A]" />
                </div>
                <span className="font-medium text-[#F3F0E8] group-hover:text-[#C6A76A] transition-colors">{CONFIG.EMAIL}</span>
              </a>

              {/* WhatsApp: Subtle Coming Soon state until real business number is active */}
              <div className="flex items-center gap-2.5 text-[#74716A] select-none">
                <div className="w-7 h-7 rounded-lg bg-[#141514] border border-[#F3F0E8]/[0.06] flex items-center justify-center text-[#74716A]">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span>WhatsApp</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#181918] border border-[#F3F0E8]/[0.08] text-[#AAA69D]">
                    {lang === 'en' ? 'Coming soon' : 'Yakında'}
                  </span>
                </div>
              </div>

              {CONFIG.INSTAGRAM_URL && (
                <a
                  href={CONFIG.INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[#AAA69D] hover:text-[#F3F0E8] transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#141514] border border-[#F3F0E8]/[0.09] flex items-center justify-center text-[#AAA69D] group-hover:text-[#F3F0E8] group-hover:border-[#F3F0E8]/[0.2]">
                    <Instagram className="w-3.5 h-3.5" />
                  </div>
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#74716A]">
          <div className="text-center sm:text-left">
            © {currentYear} {CONFIG.BRAND_NAME}. {footerData.copyright}
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => onOpenLegal('gizlilik')}
              className="py-1 px-1.5 hover:text-[#F3F0E8] transition-colors cursor-pointer text-xs"
            >
              {footerData.privacyText}
            </button>
            <button
              onClick={() => onOpenLegal('kvkk')}
              className="py-1 px-1.5 hover:text-[#F3F0E8] transition-colors cursor-pointer text-xs"
            >
              {footerData.kvkkText}
            </button>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-lg bg-[#141514] hover:bg-[#181918] border border-[#F3F0E8]/[0.09] text-[#AAA69D] hover:text-[#F3F0E8] flex items-center justify-center transition-colors cursor-pointer"
              title={lang === 'en' ? 'Back to top' : 'Yukarı Çık'}
              aria-label={lang === 'en' ? 'Back to top' : 'Yukarı Çık'}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};



