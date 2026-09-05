import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { LanguageProvider } from './security/LanguageContext';
import App from './App';
import './index.css';

const root = document.getElementById('root')!;
const page = <StrictMode><LanguageProvider><App /></LanguageProvider></StrictMode>;
const expectedLanguage = /^\/tr(?:\/|$)/.test(window.location.pathname) ? 'tr' : 'en';
const expectedPage = /^\/(?:en\/?|tr\/?)?$/.test(window.location.pathname) ? 'marketing' : 'retired';
if (root.hasChildNodes() && root.dataset.language === expectedLanguage && root.dataset.page === expectedPage) hydrateRoot(root, page);
else createRoot(root).render(page);
