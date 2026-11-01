import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Send, ArrowUpRight, MessageCircle, Linkedin, Github, Youtube } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Magnetic, SectionLabel } from './fx/effects';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  // The giant word zooms and un-tracks into place as the section arrives
  const scale = useTransform(scrollYProgress, [0, 0.85], [0.55, 1]);
  const spacing = useTransform(scrollYProgress, [0, 0.85], ['0.4em', '-0.04em']);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  // Fit the headline to the viewport whatever its length (HABLEMOS vs LET'S TALK)
  const fitVw = Math.min(15, 86 / (t.contact.big.length * 0.66));

  const channels = [
    { href: `mailto:${t.contact.emailBtn}`, label: t.contact.emailBtn, Icon: Mail, kind: 'Email', external: false },
    { href: 'https://wa.me/5215569111742', label: '+52 55 6911 1742', Icon: MessageCircle, kind: 'WhatsApp', external: true },
    { href: `https://t.me/${t.contact.telegramBtn.replace('@', '')}`, label: t.contact.telegramBtn, Icon: Send, kind: 'Telegram', external: true },
  ];

  return (
    <section ref={ref} id="contact" className="relative w-full px-6 md:px-12 pt-40 md:pt-56 pb-16 overflow-hidden">
      {/* Rotating ring behind the headline */}
      <motion.div
        style={{ rotate: ringRotate }}
        className="pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] md:w-[70vw] md:h-[70vw] rounded-full border border-dashed border-cyan-400/15"
      />

      <div className="relative max-w-[1500px] mx-auto">
        <SectionLabel index="04" label={t.sections.contact} className="mb-10 justify-center" />

        <motion.h2
          style={{ scale, letterSpacing: spacing, opacity, fontSize: `${fitVw}vw` }}
          className="text-center font-sans font-extrabold uppercase leading-[0.85] text-white origin-bottom whitespace-nowrap"
        >
          {t.contact.big.split(' ').map((w, i) => (
            <span key={i} className={i % 2 ? 'text-cyan-400' : ''}>
              {w}{' '}
            </span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="mt-12 text-center text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto font-light"
        >
          {t.contact.description}
        </motion.p>

        <div className="mt-16 md:mt-24 grid md:grid-cols-3 border-t border-white/10">
          {channels.map(({ href, label, Icon, kind, external }, i) => (
            <motion.a
              key={kind}
              href={href}
              target={external ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex items-center justify-between gap-4 py-8 md:py-12 md:px-8 border-b md:border-b-0 md:border-r last:border-r-0 border-white/10 overflow-hidden"
            >
              <span className="absolute inset-0 bg-cyan-400 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="relative z-10 flex items-center gap-4 min-w-0">
                <Icon className="shrink-0 text-cyan-400 group-hover:text-navy-950 transition-colors" size={26} />
                <span className="min-w-0">
                  <span className="block font-tech text-xs tracking-[0.3em] uppercase text-slate-500 group-hover:text-navy-900 transition-colors">{kind}</span>
                  <span className="block truncate text-lg md:text-xl font-semibold text-white group-hover:text-navy-950 transition-colors">{label}</span>
                </span>
              </span>
              <ArrowUpRight className="relative z-10 shrink-0 text-white group-hover:text-navy-950 group-hover:rotate-45 transition-all duration-500" size={28} />
            </motion.a>
          ))}
        </div>

        <footer className="mt-24 flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-slate-500">
          <div className="text-center md:text-left">
            <p>© {new Date().getFullYear()} Manuel Castellanos. {t.footer.rights}</p>
            <p className="mt-1 text-xs text-slate-600">{t.footer.role} · {t.footer.extra}</p>
          </div>
          <div className="flex gap-3">
            {[
              { href: 'https://linkedin.com/in/manuelceomx', Icon: Linkedin, label: 'LinkedIn' },
              { href: 'https://github.com/ideaspuff', Icon: Github, label: 'GitHub' },
              { href: 'https://youtube.com/c/manuelceo', Icon: Youtube, label: 'YouTube' },
            ].map(({ href, Icon, label }) => (
              <Magnetic key={label} strength={0.5}>
                <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid place-items-center w-11 h-11 rounded-full border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-colors">
                  <Icon size={18} />
                </a>
              </Magnetic>
            ))}
          </div>
          <a href="#top" className="font-tech text-xs tracking-[0.3em] uppercase hover:text-cyan-400 transition-colors">↑ Top</a>
        </footer>
      </div>
    </section>
  );
};
