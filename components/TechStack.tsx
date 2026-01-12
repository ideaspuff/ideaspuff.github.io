import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Globe, 
  Layout, 
  Server, 
  CloudLightning,
  Code2,
  Flame,
  Zap
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TechStack: React.FC = () => {
  const { t } = useLanguage();
  
  const technologies = [
    { name: 'Next.js', icon: Globe, color: 'text-white' },
    { name: 'React', icon: Layout, color: 'text-cyan-400' },
    { name: 'TypeScript', icon: Code2, color: 'text-blue-400' },
    { name: 'PostgreSQL', icon: Database, color: 'text-blue-500' },
    { name: 'Supabase', icon: Zap, color: 'text-emerald-400' },
    { name: 'Firebase', icon: Flame, color: 'text-orange-500' },
    { name: 'Node.js', icon: Server, color: 'text-green-500' },
    { name: 'Azure', icon: CloudLightning, color: 'text-blue-300' },
  ];
  
  return (
    <section className="w-full py-20 border-y border-white/5 bg-navy-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-xl font-mono text-slate-400 uppercase tracking-widest">{t.stack.title}</h3>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col items-center gap-3 cursor-pointer"
            >
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/20 transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110">
                <tech.icon 
                  size={32} 
                  className={`text-slate-400 transition-colors duration-300 group-hover:${tech.color.replace('text-', '') === 'white' ? 'text-white' : tech.color}`} 
                  style={{ color: undefined }}
                />
              </div>
              <span className="text-sm font-medium text-slate-500 group-hover:text-slate-200 transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};