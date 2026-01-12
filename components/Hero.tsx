import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Terminal, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Access phrases from context
  const phrases = t.hero.phrases;

  useEffect(() => {
    // Reset typing state when language changes (phrases array changes)
    setText('');
    setIsDeleting(false);
    setLoopNum(0);
  }, [phrases]);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 80);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000); // Pause at end
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, phrases, typingSpeed]);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 pt-20 pb-12">
      
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(13,214,232,0.15)] backdrop-blur-md text-sm font-medium tracking-wide">
          <Terminal size={14} />
          <span>{t.hero.badge}</span>
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-2 text-white">
          Manuel <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 animate-pulse-slow">Castellanos</span>
        </h1>
      </motion.div>

      {/* Typewriter Subheadline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="h-24 md:h-20 flex items-start justify-center mb-16"
      >
        <p className="text-lg md:text-2xl text-center max-w-4xl leading-relaxed text-slate-300">
          {text}
          <span className="inline-block w-[3px] h-[1.2em] bg-cyan-400 ml-1 align-middle animate-pulse"></span>
        </p>
      </motion.div>

      {/* Tech Chips */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16"
      >
        {t.hero.chips.map((tech, idx) => (
          <span key={idx} className="px-5 py-2 rounded-full text-sm md:text-base bg-white/5 border border-white/10 text-slate-300 font-mono tracking-wide hover:border-cyan-500/40 hover:bg-white/10 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(13,214,232,0.15)] transition-all duration-300 cursor-default">
            {tech}
          </span>
        ))}
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex flex-col md:flex-row items-center gap-6"
      >
        <a 
          href="mailto:manuelceomx@gmail.com"
          className="group relative px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden bg-cyan-500 text-navy-900 shadow-[0_0_20px_rgba(13,214,232,0.4)] hover:shadow-[0_0_30px_rgba(13,214,232,0.6)] hover:scale-105"
        >
          <span className="relative z-10 flex items-center gap-2">
            {t.hero.ctaPrimary} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </a>

        <div className="flex items-center gap-4">
          <a href="#" className="p-3 rounded-full transition-all hover:scale-110 bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(13,214,232,0.2)]">
            <Linkedin size={24} />
          </a>
          <a href="#" className="p-3 rounded-full transition-all hover:scale-110 bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(13,214,232,0.2)]">
            <Github size={24} />
          </a>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};