import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getWhatsAppUrl } from '../config';
import { VelnarLogo } from './VelnarLogo';
import { Menu, X, ArrowRight, MessageCircle, Globe } from 'lucide-react';

interface NavbarProps {
  onDemoClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDemoClick }) => {
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is active to prevent background scroll
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: t.nav.work, href: '#demolar' },
    { label: t.nav.services, href: '#hizmetler' },
    { label: t.nav.whyUs, href: '#neden-biz' },
    { label: t.nav.process, href: '#surec' },
    { label: t.nav.pricing, href: '#paketler' },
    { label: t.nav.faq, href: '#sss' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 w-full max-w-full z-50 transition-all duration-300 box-border ${
        isScrolled
          ? 'bg-[#090A0A]/90 backdrop-blur-xl border-b border-[#F3F0E8]/[0.09] shadow-[0_4px_30px_rgba(0,0,0,0.6)] py-3'
          : 'bg-transparent border-b border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between w-full">
          {/* VELNAR Brand Lockup */}
          <a
            href="#"
            id="nav-brand-logo"
            className="group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <VelnarLogo />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-xs font-medium text-[#AAA69D]">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                id={`nav-link-${idx}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#F3F0E8] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#C6A76A] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action CTAs & Language Switcher */}
          <div className="hidden sm:flex items-center gap-2.5 lg:gap-3">
            
            {/* Language Switcher Pill */}
            <div 
              id="lang-switcher-desktop"
              className="flex items-center p-1 rounded-xl bg-[#141514] border border-[#F3F0E8]/[0.10] text-[11px] font-mono"
              role="group"
              aria-label={t.nav.switchLang}
            >
              <button
                onClick={() => setLang('tr')}
                id="btn-lang-tr"
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                  lang === 'tr'
                    ? 'bg-[#C6A76A] text-[#111211] shadow-sm'
                    : 'text-[#AAA69D] hover:text-[#F3F0E8]'
                }`}
                aria-pressed={lang === 'tr'}
              >
                TR
              </button>
              <button
                onClick={() => setLang('en')}
                id="btn-lang-en"
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                  lang === 'en'
                    ? 'bg-[#C6A76A] text-[#111211] shadow-sm'
                    : 'text-[#AAA69D] hover:text-[#F3F0E8]'
                }`}
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
            </div>

            {/* Quick WhatsApp */}
            <a
              href={getWhatsAppUrl(undefined, lang)}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-whatsapp-quick"
              className="p-2 rounded-xl text-[#AAA69D] hover:text-[#F3F0E8] bg-[#141514] hover:bg-[#181918] border border-[#F3F0E8]/[0.09] hover:border-[#F3F0E8]/[0.15] transition-all text-xs flex items-center gap-1.5"
              title="WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="hidden xl:inline text-xs font-medium text-[#AAA69D]">WhatsApp</span>
            </a>

            {/* Primary CTA */}
            <button
              onClick={onDemoClick}
              id="nav-cta-btn"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer"
            >
              <span>{t.nav.ctaButton}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#111211]" />
            </button>
          </div>

          {/* Mobile View: Lang pill + Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            
            {/* Quick Mobile Lang Switcher */}
            <div 
              className="flex items-center p-0.5 rounded-lg bg-[#141514] border border-[#F3F0E8]/[0.10] text-[10px] font-mono"
            >
              <button
                onClick={() => setLang('tr')}
                className={`px-2 py-0.5 rounded-md transition-all font-bold ${
                  lang === 'tr' ? 'bg-[#C6A76A] text-[#111211]' : 'text-[#AAA69D]'
                }`}
              >
                TR
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded-md transition-all font-bold ${
                  lang === 'en' ? 'bg-[#C6A76A] text-[#111211]' : 'text-[#AAA69D]'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl text-[#AAA69D] hover:text-[#F3F0E8] hover:bg-[#141514] active:bg-[#181918] border border-transparent hover:border-[#F3F0E8]/[0.09] transition-colors cursor-pointer flex items-center justify-center"
              aria-label={mobileMenuOpen ? t.nav.ariaClose : t.nav.ariaMenu}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#F3F0E8]" /> : <Menu className="w-5 h-5 text-[#F3F0E8]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden bg-[#0E0F0F]/98 backdrop-blur-2xl border-b border-[#F3F0E8]/[0.09] px-4 sm:px-5 pt-4 pb-6 mt-3 shadow-2xl transition-all max-h-[calc(100vh-80px)] overflow-y-auto w-full max-w-full box-border"
        >
          {/* Mobile Language Switcher inside Drawer */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#141514] border border-[#F3F0E8]/[0.08] mb-4">
            <div className="flex items-center gap-2 text-xs text-[#AAA69D]">
              <Globe className="w-3.5 h-3.5 text-[#C6A76A]" />
              <span>{t.nav.switchLang}</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-xs">
              <button
                onClick={() => setLang('tr')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  lang === 'tr' ? 'bg-[#C6A76A] text-[#111211]' : 'text-[#AAA69D] bg-[#181918]'
                }`}
              >
                Türkçe (TR)
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  lang === 'en' ? 'bg-[#C6A76A] text-[#111211]' : 'text-[#AAA69D] bg-[#181918]'
                }`}
              >
                English (EN)
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2 text-sm font-medium">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[#AAA69D] hover:text-[#F3F0E8] py-2.5 min-h-[44px] border-b border-[#F3F0E8]/[0.05] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#74716A] font-mono">→</span>
              </a>
            ))}

            <div className="pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onDemoClick();
                }}
                id="mobile-demo-btn"
                className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <span>{t.nav.ctaButton}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={getWhatsAppUrl(undefined, lang)}
                target="_blank"
                rel="noopener noreferrer"
                id="mobile-whatsapp-btn"
                className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-[#141514] border border-[#F3F0E8]/[0.15] hover:bg-[#1D1E1C] text-[#F3F0E8] font-medium text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};


