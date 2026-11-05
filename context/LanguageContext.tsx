import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { content, seo, SITE_URL, Language, ViewMode } from '../constants';

/** ?lang=es|en wins (so each language has its own crawlable URL); otherwise the browser language. */
const initialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'es';
  const param = new URLSearchParams(window.location.search).get('lang');
  if (param === 'es' || param === 'en') return param;
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
};

const setMeta = (selector: string, attr: string, value: string) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

/** Keep <html lang>, title, description, canonical and Open Graph in sync with the visible language. */
const syncHead = (language: Language) => {
  const m = seo[language];
  const hasParam = new URLSearchParams(window.location.search).has('lang');
  const url = hasParam ? `${SITE_URL}/?lang=${language}` : `${SITE_URL}/`;
  document.documentElement.lang = language;
  document.title = m.title;
  setMeta('meta[name="description"]', 'content', m.description);
  setMeta('meta[property="og:title"]', 'content', m.title);
  setMeta('meta[property="og:description"]', 'content', m.description);
  setMeta('meta[property="og:locale"]', 'content', m.locale);
  setMeta('meta[property="og:url"]', 'content', url);
  setMeta('meta[name="twitter:title"]', 'content', m.title);
  setMeta('meta[name="twitter:description"]', 'content', m.description);
  setMeta('link[rel="canonical"]', 'href', url);
};

interface LanguageContextType {
  language: Language;
  viewMode: ViewMode;
  toggleLanguage: () => void;
  toggleViewMode: () => void;
  t: typeof content.en.tech;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [viewMode, setViewMode] = useState<ViewMode>('business');

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'en' ? 'es' : 'en';
      // Make the chosen language shareable / bookmarkable
      const params = new URLSearchParams(window.location.search);
      params.set('lang', next);
      window.history.replaceState(null, '', `${window.location.pathname}?${params}${window.location.hash}`);
      return next;
    });
  };

  useEffect(() => syncHead(language), [language]);

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'business' ? 'tech' : 'business'));
  };

  const t = content[language][viewMode];

  return (
    <LanguageContext.Provider value={{ language, viewMode, toggleLanguage, toggleViewMode, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
