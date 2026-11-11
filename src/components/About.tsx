import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESUME_DATA } from '../constants';
import { 
  Briefcase, 
  Rocket, 
  Download, 
  ExternalLink, 
  Award, 
  GraduationCap, 
  MapPin, 
  Languages
} from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'certifications' | 'education'>('experience');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageCardVariants = {
    hidden: { opacity: 0, scale: 0.9, x: -40 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className="py-28 px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Anchor for experience link */}
      <div id="experience" className="absolute -top-24 pointer-events-none" />
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
          Neural Profile
        </span>
        <h2 className="text-4xl md:text-5xl font-sora font-extrabold text-white">
          Architecting Intelligence, <span className="text-gradient">Decoding Data.</span>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Interactive Image Card & Profile Quick Info */}
        <motion.div
          variants={imageCardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative glass-card p-2 rounded-3xl overflow-hidden group shadow-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-500">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img 
                src={RESUME_DATA.profileImage} 
                alt={RESUME_DATA.name}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-black/20 to-transparent opacity-80" />
              
              {/* Badge overlay on image */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active • Karachi, PK
              </div>

              {/* Bottom card overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 glass-card border-white/10 backdrop-blur-xl bg-black/60 rounded-xl">
                <h3 className="font-sora font-bold text-white text-xl tracking-tight mb-1">
                  {RESUME_DATA.name}
                </h3>
                <p className="text-xs text-cyan-300 font-mono mb-3">
                  AI & Data Science Enthusiast
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <MapPin size={12} className="text-purple-400 flex-shrink-0" />
                  <span>Karachi, Pakistan</span>
                  <span className="text-white/20">•</span>
                  <GraduationCap size={12} className="text-cyan-400 flex-shrink-0" />
                  <span>BS Information Tech</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Resume Download Action */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 flex flex-col sm:flex-row gap-3"
          >
            <a
              href={RESUME_DATA.resumePdf}
              download="Arslan-Ali-Resume.pdf"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-obsidian font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Download size={16} />
              Download Resume (PDF)
            </a>
            <a
              href={RESUME_DATA.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono uppercase tracking-wider rounded-xl hover:border-cyan-400/50 transition-all"
            >
              <ExternalLink size={14} />
              Preview PDF
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Bio, Scroll-triggered Interactive Tabs for Experience & Credentials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="lg:col-span-7 flex flex-col"
        >
          {/* Bio paragraph with scroll reveal */}
          <motion.div variants={itemFadeUp} className="mb-8">
            <h3 className="text-xl md:text-2xl font-sora font-semibold text-white mb-4">
              Turning raw data into <span className="text-gradient">automated decision systems</span>.
            </h3>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light">
              {RESUME_DATA.about}
            </p>
          </motion.div>

          {/* Tab Selection */}
          <motion.div variants={itemFadeUp} className="flex gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl mb-6 flex-wrap">
            <button
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === 'experience'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Briefcase size={14} />
              Work Experience
            </button>
            <button
              onClick={() => setActiveTab('certifications')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === 'certifications'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award size={14} />
              Certifications ({RESUME_DATA.certifications.length})
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <GraduationCap size={14} />
              Education & Languages
            </button>
          </motion.div>

          {/* Tab Content with AnimatePresence */}
          <AnimatePresence mode="wait">
            {activeTab === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {RESUME_DATA.experience.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    whileHover={{ y: -3 }}
                    className="p-6 rounded-2xl glass-card border border-white/5 hover:border-cyan-500/30 transition-all group"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                          {idx === 0 ? <Rocket size={20} /> : <Briefcase size={20} />}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg group-hover:text-cyan-300 transition-colors">
                            {exp.role}
                          </h4>
                          <p className="text-xs text-purple-400 font-mono font-semibold">
                            {exp.company} <span className="text-slate-500">• {exp.type}</span>
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-cyan-400 border border-cyan-500/20">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mt-3 pl-1">
                      {exp.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'certifications' && (
              <motion.div
                key="certifications"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid sm:grid-cols-2 gap-3"
              >
                {RESUME_DATA.certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl glass-card border border-white/5 hover:border-purple-500/30 flex items-start gap-3 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0 mt-0.5">
                      <Award size={16} />
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-white text-xs font-semibold leading-snug line-clamp-2">
                        {cert.title}
                      </h5>
                      <span className="text-[11px] font-mono text-cyan-400">
                        {cert.issuer}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {/* Education Card */}
                <div className="p-6 rounded-2xl glass-card border border-white/5 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                      <GraduationCap size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-white font-bold text-lg">
                          {RESUME_DATA.education.degree}
                        </h4>
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-purple-400 border border-purple-500/20">
                          {RESUME_DATA.education.period}
                        </span>
                      </div>
                      <p className="text-cyan-400 font-mono text-sm mt-1">
                        {RESUME_DATA.education.institution}
                      </p>
                      <p className="text-slate-400 text-xs font-mono mt-0.5">
                        {RESUME_DATA.education.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Languages Card */}
                <div className="p-6 rounded-2xl glass-card border border-white/5">
                  <div className="flex items-center gap-2 mb-4 text-white font-bold text-sm uppercase tracking-wider">
                    <Languages size={16} className="text-cyan-400" />
                    Language Proficiencies
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {RESUME_DATA.languages.map((lang, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                        <div className="text-white font-semibold text-sm">{lang.language}</div>
                        <div className="text-[11px] font-mono text-cyan-400">{lang.proficiency}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
