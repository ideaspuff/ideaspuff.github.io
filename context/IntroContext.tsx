import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IntroContextType {
  introDone: boolean;
  finishIntro: () => void;
}

const IntroContext = createContext<IntroContextType>({ introDone: true, finishIntro: () => {} });

export const IntroProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [introDone, setIntroDone] = useState(false);
  return (
    <IntroContext.Provider value={{ introDone, finishIntro: () => setIntroDone(true) }}>
      {children}
    </IntroContext.Provider>
  );
};

export const useIntro = () => useContext(IntroContext);

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
