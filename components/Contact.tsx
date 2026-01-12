import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, ArrowUpRight } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { useLanguage } from '../context/LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full max-w-5xl px-4 py-32 mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard className="text-center py-20 px-6 md:px-20 border-cyan-500/20 bg-gradient-to-b from-navy-800/50 to-navy-900/80">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t.contact.title} <span className="text-cyan-400">{t.contact.titleHighlight}</span>
            </h2>
            <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto">
              {t.contact.description}
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6">
              {/* Email Button */}
              <a 
                href={`mailto:${t.contact.emailBtn}`}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white text-navy-900 rounded-xl font-bold text-lg hover:bg-cyan-50 transition-colors duration-300"
              >
                <Mail className="w-5 h-5 text-navy-900" />
                <span>{t.contact.emailBtn}</span>
                <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>

              {/* Telegram Button */}
              <a 
                href={`https://t.me/${t.contact.telegramBtn.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-blue-600/20 border border-blue-500/50 text-blue-100 rounded-xl font-bold text-lg hover:bg-blue-600/30 hover:border-blue-400 transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                <span>{t.contact.telegramBtn}</span>
                <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
            </div>
          </motion.div>
        </GlassCard>
      </motion.div>
    </section>
  );
};