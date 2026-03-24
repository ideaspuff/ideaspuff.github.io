import React, { createContext, useState, useContext, ReactNode } from 'react';
import { content, Language, ViewMode } from '../constants';

interface LanguageContextType {
  language: Language;
  viewMode: ViewMode;
  toggleLanguage: () => void;
  toggleViewMode: () => void;
  t: typeof content.en.tech;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');
  const [viewMode, setViewMode] = useState<ViewMode>('business');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
  };

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
