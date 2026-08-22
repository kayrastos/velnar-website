import React, { useState, useEffect } from 'react';
import { CONFIG, getWhatsAppUrl } from '../config';
import { VelnarLogo } from './VelnarLogo';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';

interface NavbarProps {
  onDemoClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDemoClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Demolar', href: '#demolar' },
    { label: 'Faydalar', href: '#faydalar' },
    { label: 'Süreç', href: '#surec' },
    { label: 'Paketler', href: '#paketler' },
    { label: 'SSS', href: '#sss' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090A0A]/90 backdrop-blur-xl border-b border-[#F3F0E8]/[0.09] shadow-[0_4px_30px_rgba(0,0,0,0.6)] py-3'
          : 'bg-transparent border-b border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
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
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#AAA69D]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#F3F0E8] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#C6A76A] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-whatsapp-quick"
              className="p-2 rounded-xl text-[#AAA69D] hover:text-[#F3F0E8] bg-[#141514] hover:bg-[#181918] border border-[#F3F0E8]/[0.09] hover:border-[#F3F0E8]/[0.15] transition-all text-xs flex items-center gap-1.5"
              title="WhatsApp'tan Yazın"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="hidden lg:inline text-xs font-medium text-[#AAA69D] hover:text-[#F3F0E8]">WhatsApp</span>
            </a>

            <button
              onClick={onDemoClick}
              id="nav-cta-btn"
              className="inline-flex items-center justify-center gap-2 px-4.5 py-2 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer"
            >
              <span>Ücretsiz Demo İste</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#111211]" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            className="md:hidden p-2 rounded-xl text-[#AAA69D] hover:text-[#F3F0E8] hover:bg-[#141514] border border-transparent hover:border-[#F3F0E8]/[0.09] transition-colors cursor-pointer"
            aria-label="Menüyü Aç/Kapat"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden bg-[#0E0F0F]/98 backdrop-blur-2xl border-b border-[#F3F0E8]/[0.09] px-5 pt-4 pb-6 mt-3 shadow-2xl transition-all"
        >
          <div className="flex flex-col space-y-3 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[#AAA69D] hover:text-[#F3F0E8] py-2 border-b border-[#F3F0E8]/[0.05] flex items-center justify-between"
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
                className="w-full py-2.5 px-4 rounded-xl bg-[#F3F0E8] hover:bg-[#C6A76A] text-[#111211] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Ücretsiz Demo İste</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                id="mobile-whatsapp-btn"
                className="w-full py-2.5 px-4 rounded-xl bg-[#141514] border border-[#F3F0E8]/[0.15] hover:bg-[#1D1E1C] text-[#F3F0E8] font-medium text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp'tan Görüşelim</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

