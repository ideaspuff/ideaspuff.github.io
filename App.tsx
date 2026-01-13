import React from 'react';
import { Analytics } from "@vercel/analytics/react"
import { NeuralCanvas } from './components/ui/NeuralCanvas';
import { Hero } from './components/Hero';
import { Expertise } from './components/Expertise';
import { TechnicalEcosystem } from './components/TechnicalEcosystem';
import { TechStack } from './components/TechStack';
import { Contact } from './components/Contact';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)] group"
    >
      <Globe size={16} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
      <div className="relative w-6 h-5 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={language}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 font-mono font-bold text-sm text-slate-200 group-hover:text-cyan-300"
          >
            {language === 'en' ? 'ES' : 'EN'}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.button>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="relative z-10 w-full py-8 text-center text-slate-500 text-sm border-t border-white/5 backdrop-blur-sm mb-0">
      <p>© {new Date().getFullYear()} Manuel Castellanos. {t.footer.rights}</p>
      <p className="mt-1 text-xs">{t.footer.role}</p>
    </footer>
  );
};

const AppContent: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-navy-900 font-sans selection:bg-cyan-400/30 selection:text-cyan-100">

      {/* Background: Synaptic Network */}
      <NeuralCanvas />

      {/* Language Toggle Fixed */}
      <LanguageToggle />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center">
        <Hero />
        <Expertise />
        <TechnicalEcosystem />
        <TechStack />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
      <Analytics />
    </LanguageProvider>
  );
};

export default App;