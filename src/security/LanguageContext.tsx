import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { en, type Language } from './en';
import { tr } from './tr';

export const dictionaries = { en, tr };
const LanguageContext = createContext({ lang: 'en' as Language, t: en });
export function LanguageProvider({ children, initialLang }: { children: ReactNode; initialLang?: Language }) {
  const [lang, setLang] = useState<Language>(() => initialLang ?? (typeof window !== 'undefined' && /^\/tr(?:\/|$)/.test(window.location.pathname) ? 'tr' : 'en'));
  useEffect(() => {
    const sync = () => setLang(/^\/tr(?:\/|$)/.test(window.location.pathname) ? 'tr' : 'en');
    window.addEventListener('popstate', sync);
    document.documentElement.lang = lang;
    return () => window.removeEventListener('popstate', sync);
  }, [lang]);
  return <LanguageContext.Provider value={{ lang, t: dictionaries[lang] }}>{children}</LanguageContext.Provider>;
}
export const useLanguage = () => useContext(LanguageContext);
