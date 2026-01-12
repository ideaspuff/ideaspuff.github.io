import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Bot, Cloud, Code2, Sparkles, Server, Zap } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { useLanguage } from '../context/LanguageContext';

export const Expertise: React.FC = () => {
  const { t } = useLanguage();
  
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <section className="w-full max-w-7xl px-4 py-24 mx-auto perspective-1000">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-20 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          {t.expertise.title} <span className="text-cyan-400">{t.expertise.titleHighlight}</span>
        </h2>
        <p className="max-w-2xl mx-auto text-slate-400 text-lg">
          {t.expertise.description}
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Card 1: IA & Conversational */}
        <motion.div variants={item} className="h-full">
          <GlassCard className="h-full group p-8" enableTilt={true}>
            <div className="flex flex-col h-full">
              <div className="mb-8 p-4 rounded-2xl w-fit border bg-cyan-500/10 border-cyan-500/20 group-hover:border-cyan-400/50 transition-colors shadow-[0_0_15px_rgba(13,214,232,0.1)]">
                <Bot size={32} className="text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors">
                {t.expertise.cards.ai.title}
              </h3>
              <ul className="space-y-4 mb-8 flex-grow">
                {t.expertise.cards.ai.items.map((txt, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <Sparkles size={18} className="mt-0.5 shrink-0 text-cyan-500" />
                    <span className="leading-tight">{txt}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/10 mt-auto">
                <p className="text-xs text-cyan-300 font-mono tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                  {t.expertise.cards.ai.focus}
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Card 2: Cloud Architecture */}
        <motion.div variants={item} className="h-full">
          <GlassCard className="h-full group p-8" enableTilt={true}>
            <div className="flex flex-col h-full">
              <div className="mb-8 p-4 rounded-2xl w-fit border bg-blue-500/10 border-blue-500/20 group-hover:border-blue-400/50 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <Cloud size={32} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors">
                {t.expertise.cards.cloud.title}
              </h3>
              <ul className="space-y-4 mb-8 flex-grow">
                 {t.expertise.cards.cloud.items.map((txt, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <Server size={18} className="mt-0.5 shrink-0 text-blue-500" />
                    <span className="leading-tight">{txt}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/10 mt-auto">
                <p className="text-xs text-blue-300 font-mono tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                   {t.expertise.cards.cloud.focus}
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Card 3: Full Stack Enterprise */}
        <motion.div variants={item} className="h-full">
          <GlassCard className="h-full group p-8" enableTilt={true}>
            <div className="flex flex-col h-full">
               <div className="mb-8 p-4 rounded-2xl w-fit border bg-purple-500/10 border-purple-500/20 group-hover:border-purple-400/50 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                <Code2 size={32} className="text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-purple-400 transition-colors">
                 {t.expertise.cards.dev.title}
              </h3>
              <ul className="space-y-4 mb-8 flex-grow">
                 {t.expertise.cards.dev.items.map((txt, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <Zap size={18} className="mt-0.5 shrink-0 text-purple-500" />
                    <span className="leading-tight">{txt}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/10 mt-auto">
                <p className="text-xs text-purple-300 font-mono tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                   {t.expertise.cards.dev.focus}
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

      </motion.div>
    </section>
  );
};