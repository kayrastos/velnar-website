import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Language, LocaleDictionary } from '../locales/types';
import { LOCALES } from '../locales';
import { CONFIG } from '../config';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: LocaleDictionary;
  isLaunchCampaign: boolean;
  discountPercent: number;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function detectInitialLanguage(): Language {
  // 1. Check URL path or hash first
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (pathname === '/en' || pathname.startsWith('/en/') || hash.startsWith('#/en') || hash.startsWith('#en')) {
      return 'en';
    }
    if (pathname === '/tr' || pathname.startsWith('/tr/') || hash.startsWith('#/tr') || hash.startsWith('#tr')) {
      return 'tr';
    }

    // 2. Check localStorage
    try {
      const stored = localStorage.getItem('velnar_lang');
      if (stored === 'tr' || stored === 'en') {
        return stored;
      }
    } catch {
      // Ignore storage access errors
    }

    // 3. Fallback to browser language
    try {
      const browserLang = navigator.language || (navigator as any).userLanguage || '';
      if (browserLang.toLowerCase().startsWith('tr')) {
        return 'tr';
      }
    } catch {
      // Ignore navigator access errors
    }
  }

  // Default to 'en' for non-Turkish environments
  return 'en';
}

function updateHeadMeta(dictionary: LocaleDictionary, currentLang: Language) {
  if (typeof document === 'undefined') return;

  // Title
  document.title = dictionary.seo.title;
  document.documentElement.lang = currentLang;

  // Helper to create or update meta tag
  const setMeta = (name: string, content: string, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard Meta
  setMeta('description', dictionary.seo.description);
  setMeta('keywords', dictionary.seo.keywords);

  // Open Graph
  setMeta('og:title', dictionary.seo.ogTitle, true);
  setMeta('og:description', dictionary.seo.ogDescription, true);
  setMeta('og:locale', currentLang === 'tr' ? 'tr_TR' : 'en_US', true);
  setMeta('og:type', 'website', true);
  setMeta('og:site_name', CONFIG.BRAND_NAME, true);

  // Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', dictionary.seo.canonical);

  // Hreflang alternates
  const setHreflang = (hreflang: string, href: string) => {
    let link = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  };

  setHreflang('tr', 'https://velnar.studio/tr');
  setHreflang('en', 'https://velnar.studio/en');
  setHreflang('x-default', 'https://velnar.studio/en');
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => detectInitialLanguage());

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('velnar_lang', newLang);
    } catch {
      // Ignore localStorage error
    }

    if (typeof window !== 'undefined') {
      const currentHash = window.location.hash;
      const targetPath = `/${newLang}${currentHash}`;
      if (window.location.pathname !== `/${newLang}`) {
        window.history.pushState({ lang: newLang }, '', targetPath);
      }
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'tr' ? 'en' : 'tr');
  }, [lang, setLang]);

  // Sync URL on initial mount and when popstate occurs
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      const detected = detectInitialLanguage();
      setLangState(detected);
    };

    window.addEventListener('popstate', handlePopState);

    // If current path is root '/' or mismatches detected language, softly replace URL without reloads
    const pathname = window.location.pathname;
    if (pathname === '/' || (!pathname.startsWith('/tr') && !pathname.startsWith('/en'))) {
      const hash = window.location.hash;
      window.history.replaceState({ lang }, '', `/${lang}${hash}`);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [lang]);

  // Update SEO Head whenever language or dictionary changes
  useEffect(() => {
    const currentDict = LOCALES[lang] || LOCALES.tr;
    updateHeadMeta(currentDict, lang);
  }, [lang]);

  const dictionary = LOCALES[lang] || LOCALES.tr;

  const value: LanguageContextValue = {
    lang,
    setLang,
    toggleLang,
    t: dictionary,
    isLaunchCampaign: CONFIG.LAUNCH_CAMPAIGN_ENABLED,
    discountPercent: CONFIG.LAUNCH_DISCOUNT_PERCENT
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
