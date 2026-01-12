import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Smartphone, 
  Globe, 
  ShieldCheck, 
  Layers, 
  Lock, 
  Workflow,
  Brain
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { useLanguage } from '../context/LanguageContext';

export const TechnicalEcosystem: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full max-w-7xl px-4 py-24 mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          {t.ecosystem.title} <span className="text-cyan-400">{t.ecosystem.titleHighlight}</span>
        </h2>
        <p className="max-w-2xl text-slate-400 text-lg">
          {t.ecosystem.description}
        </p>
      </motion.div>

      {/* Bento Grid Layout - Increased minimum height to 290px for larger cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(290px,auto)]">
        
        {/* Card 1: Database Architecture (Tall Vertical) */}
        <motion.div 
          className="md:col-span-1 md:row-span-2 h-full"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="h-full p-8 flex flex-col justify-between group overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
            <div>
              <div className="mb-6 inline-flex p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:scale-110 transition-transform duration-300">
                <Database size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t.ecosystem.cards.database.title}</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                {t.ecosystem.cards.database.description}
              </p>
              <ul className="space-y-3">
                {t.ecosystem.cards.database.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-300 border-l-2 border-orange-500/30 pl-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Visual Decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-500" />
          </GlassCard>
        </motion.div>

        {/* Card 2: High-Scale Web (Wide Horizontal) */}
        <motion.div 
          className="md:col-span-2 md:row-span-1 h-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="h-full p-8 relative group overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="max-w-lg">
                <div className="mb-4 inline-flex items-center gap-2 text-cyan-400">
                   <Globe size={20} />
                   <span className="text-sm font-mono uppercase tracking-wider">{t.ecosystem.cards.web.badge}</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {t.ecosystem.cards.web.title}
                </h3>
                <p className="text-slate-400">
                  {t.ecosystem.cards.web.description}
                </p>
              </div>
              
              {/* Animated Icon Representation */}
              <div className="hidden md:flex items-center justify-center w-32 h-32 rounded-full bg-cyan-900/30 border border-cyan-500/20 shadow-[0_0_30px_rgba(13,214,232,0.1)] group-hover:shadow-[0_0_50px_rgba(13,214,232,0.2)] transition-all">
                <Layers size={48} className="text-cyan-400" />
              </div>
            </div>
            
            {/* Background Grid Decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(13,214,232,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(13,214,232,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:linear-gradient(to_right,transparent,black_40%,transparent)]" />
          </GlassCard>
        </motion.div>

        {/* Card 3: Mobile & Cross-Platform (Square) */}
        <motion.div 
          className="md:col-span-1 md:row-span-1 h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="h-full p-8 flex flex-col group hover:bg-white/[0.08]">
            <div className="mb-auto">
              <div className="mb-4 inline-flex p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Smartphone size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t.ecosystem.cards.mobile.title}</h3>
              <p className="text-slate-400 text-sm mb-4">
                {t.ecosystem.cards.mobile.description}
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              {t.ecosystem.cards.mobile.tags.map(tag => (
                <span key={tag} className="px-2 py-1 text-xs rounded border border-purple-500/30 text-purple-300 bg-purple-500/10">{tag}</span>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Card 4: Security & Compliance (Square) */}
        <motion.div 
          className="md:col-span-1 md:row-span-1 h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
           <GlassCard className="h-full p-8 flex flex-col group hover:bg-white/[0.08]">
            <div className="mb-auto">
              <div className="mb-4 inline-flex p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t.ecosystem.cards.security.title}</h3>
              <p className="text-slate-400 text-sm mb-4">
                {t.ecosystem.cards.security.description}
              </p>
            </div>
             <div className="flex gap-2 mt-4">
              <Lock size={16} className="text-emerald-500" />
              <span className="text-xs text-emerald-300 font-mono">{t.ecosystem.cards.security.tag}</span>
            </div>
          </GlassCard>
        </motion.div>

        {/* Card 5: DevOps & CI/CD (Square) */}
        <motion.div 
          className="md:col-span-1 md:row-span-1 h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard className="h-full p-8 flex flex-col group hover:bg-white/[0.08]">
            <div className="mb-auto">
              <div className="mb-4 inline-flex p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                <Workflow size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t.ecosystem.cards.devops.title}</h3>
              <p className="text-slate-400 text-sm mb-4">
                {t.ecosystem.cards.devops.description}
              </p>
            </div>
             <div className="flex gap-2 mt-4 flex-wrap">
              {t.ecosystem.cards.devops.tags.map(tag => (
                <span key={tag} className="px-2 py-1 text-xs rounded border border-pink-500/30 text-pink-300 bg-pink-500/10">{tag}</span>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Card 6: AI Engineering (Square) */}
        <motion.div 
          className="md:col-span-1 md:row-span-1 h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard className="h-full p-8 flex flex-col group hover:bg-white/[0.08]">
            <div className="mb-auto">
              <div className="mb-4 inline-flex p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Brain size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t.ecosystem.cards.aiEng.title}</h3>
              <p className="text-slate-400 text-sm mb-4">
                {t.ecosystem.cards.aiEng.description}
              </p>
            </div>
             <div className="flex gap-2 mt-4 flex-wrap">
              {t.ecosystem.cards.aiEng.tags.map(tag => (
                <span key={tag} className="px-2 py-1 text-xs rounded border border-indigo-500/30 text-indigo-300 bg-indigo-500/10">{tag}</span>
              ))}
            </div>
          </GlassCard>
        </motion.div>
        
      </div>
    </section>
  );
};