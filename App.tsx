import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Briefcase, Code2 } from 'lucide-react';
import { ParticleField } from './components/ui/ParticleField';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { Expertise } from './components/Expertise';
import { TechnicalEcosystem } from './components/TechnicalEcosystem';
import { TechStack } from './components/TechStack';
import { Contact } from './components/Contact';
import { Preloader } from './components/fx/Preloader';
import { Cursor, Grain, ScrollProgress, useSmoothScroll } from './components/fx/effects';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { IntroProvider, useIntro } from './context/IntroContext';

const TopBar = () => {
  const { language, viewMode, toggleLanguage, toggleViewMode, t } = useLanguage();
  const { introDone } = useIntro();
  const isBusiness = viewMode === 'business';

  const modeLabel = isBusiness
    ? language === 'es' ? 'Modo Negocios' : 'Business Mode'
    : language === 'es' ? 'Modo Tech' : 'Tech Mode';

  const links = [
    { href: '#expertise', label: t.sections.expertise },
    { href: '#ecosystem', label: t.sections.ecosystem },
    { href: '#contact', label: t.sections.contact },
  ];

  const pill =
    'flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/60 hover:bg-white/10 transition-colors';

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={introDone ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-5 md:px-12 py-5 flex items-center justify-between"
    >
      <a href="#top" className="font-sans font-extrabold text-xl tracking-tight text-white" aria-label="Inicio">
        MC<span className="text-cyan-400">.</span>
      </a>

      <nav className="hidden lg:flex items-center gap-8 font-tech text-xs tracking-[0.25em] uppercase text-slate-400">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="relative group hover:text-white transition-colors">
            {l.label}
            <span className="absolute -bottom-1 left-0 h-px w-full bg-cyan-400 origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 transition-transform duration-500" />
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2 md:gap-3">
        <button onClick={toggleViewMode} className={pill}>
          <AnimatePresence mode="wait">
            <motion.span
              key={viewMode}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isBusiness ? <Briefcase size={15} className="text-cyan-400" /> : <Code2 size={15} className="text-cyan-400" />}
            </motion.span>
          </AnimatePresence>
          <span className="font-mono font-bold text-xs text-slate-200 whitespace-nowrap">{modeLabel}</span>
        </button>
        <button onClick={toggleLanguage} className={pill}>
          <Globe size={15} className="text-slate-400" />
          <span className="font-mono font-bold text-xs text-slate-200">{language === 'en' ? 'ES' : 'EN'}</span>
        </button>
      </div>
    </motion.header>
  );
};

const AppContent: React.FC = () => {
  useSmoothScroll();
  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-navy-950 font-sans text-white selection:bg-cyan-400 selection:text-navy-950">
      <ParticleField />
      <Preloader />
      <ScrollProgress />
      <TopBar />
      <Cursor />
      <Grain />

      <main className="relative z-10">
        <Hero />
        <Manifesto />
        <Expertise />
        <TechnicalEcosystem />
        <TechStack />
        <Contact />
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <IntroProvider>
      <AppContent />
      <Analytics />
    </IntroProvider>
  </LanguageProvider>
);

export default App;
