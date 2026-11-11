import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESUME_DATA } from '../constants';
import { Code2, Database, Cpu, Wrench, Layers, Sparkles, Globe } from 'lucide-react';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Languages', 'Frontend', 'Libraries', 'Databases', 'Specialization', 'Dev Tools'];

  const filteredSkills = selectedCategory === 'All'
    ? RESUME_DATA.skills
    : selectedCategory === 'Languages'
    ? RESUME_DATA.skills.filter(s => s.category === 'Languages' || s.name === 'JavaScript')
    : selectedCategory === 'Libraries'
    ? RESUME_DATA.skills.filter(s => s.category === 'Libraries' || s.name === 'React')
    : RESUME_DATA.skills.filter(s => s.category === selectedCategory);

  // Staggered container variant for scroll reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages': return <Code2 size={14} className="text-cyan-400" />;
      case 'Frontend': return <Globe size={14} className="text-pink-400" />;
      case 'Libraries': return <Layers size={14} className="text-purple-400" />;
      case 'Databases': return <Database size={14} className="text-blue-400" />;
      case 'Specialization': return <Cpu size={14} className="text-emerald-400" />;
      case 'Dev Tools': return <Wrench size={14} className="text-amber-400" />;
      default: return <Sparkles size={14} className="text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-28 px-6 bg-white/[0.015] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyan-500/10 via-purple-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles size={12} className="text-purple-400 animate-spin" />
            Neural Stacks & Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-sora font-extrabold text-white mb-4">
            Technical <span className="text-gradient">Capabilities</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-sm md:text-base font-light">
            Engineered through continuous hands-on data modeling, automated ETL design, and machine learning pipelines.
          </p>

          {/* Interactive Category Filter Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center justify-center gap-2 mt-8 flex-wrap"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-obsidian font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-105'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Skills Grid with Framer Motion Staggered Scroll-Triggered Reveal */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                className="glass-card p-6 border border-white/5 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                      {getCategoryIcon(skill.category)}
                      {skill.category}
                    </span>
                    <span className="text-cyan-400 font-mono text-xs font-bold">
                      {skill.level}%
                    </span>
                  </div>

                  <h3 className="text-lg font-sora font-bold text-white group-hover:text-cyan-300 transition-colors mb-4">
                    {skill.name}
                  </h3>
                </div>

                {/* Animated Skill Level Bar */}
                <div className="space-y-1.5">
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden p-[1px]">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ 
                        duration: 1.2, 
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.15 + (idx * 0.04)
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Proficiency</span>
                    <span>High Competency</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Highlight Architecture Badges with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 p-8 glass-card border border-white/10 rounded-3xl bg-gradient-to-r from-cyan-500/[0.03] via-purple-500/[0.03] to-transparent"
        >
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
              <div className="text-xl md:text-2xl font-extrabold font-sora text-cyan-400 mb-1">Python & SQL</div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Core Foundations</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-pink-500/30 transition-all">
              <div className="text-xl md:text-2xl font-extrabold font-sora text-pink-400 mb-1">React & Web</div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Frontend & UI</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all">
              <div className="text-xl md:text-2xl font-extrabold font-sora text-purple-400 mb-1">Pandas & Scikit</div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Data Modeling & EDA</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all">
              <div className="text-xl md:text-2xl font-extrabold font-sora text-blue-400 mb-1">PostgreSQL & ETL</div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Pipelines & Databases</p>
            </div>
            <div className="col-span-2 lg:col-span-1 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all">
              <div className="text-xl md:text-2xl font-extrabold font-sora text-emerald-400 mb-1">Agentic AI & RAG</div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Intelligent Systems</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
