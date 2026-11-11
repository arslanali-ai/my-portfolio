import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESUME_DATA } from '../constants';
import { 
  ExternalLink, 
  Github, 
  X, 
  Layers, 
  FileText, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Maximize2, 
  Sparkles,
  Terminal,
  Code2
} from 'lucide-react';

interface Technology {
  name: string;
  category: string;
  description: string;
}

interface ProjectDoc {
  overview: string;
  problemStatement: string;
  methodology: string[];
  keyFeatures: string[];
  outcomes: string[];
}

interface ProjectItem {
  id?: string;
  title: string;
  category?: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  demo: string;
  featured?: boolean;
  technologies?: Technology[];
  documentation?: ProjectDoc;
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalTab, setModalTab] = useState<'docs' | 'tech' | 'architecture'>('docs');

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-28 px-6 relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Sparkles size={12} className="animate-pulse" />
              Verified Architecture
            </span>
            <h2 className="text-4xl md:text-5xl font-sora font-extrabold text-white">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-slate-400 font-mono text-xs md:text-sm leading-relaxed">
              Click any project card to view full documentation, systems architecture, and comprehensive technology stacks.
            </p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(RESUME_DATA.projects as ProjectItem[]).map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{ y: -8 }}
              onClick={() => {
                setSelectedProject(project);
                setModalTab('docs');
              }}
              className="glass-card group flex flex-col overflow-hidden border border-white/5 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300 cursor-pointer relative"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(project);
                  setModalTab('docs');
                }
              }}
            >
              {/* Image banner with overlay */}
              <div className="relative h-60 overflow-hidden bg-black/40">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-[0.8] group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-black/40 to-transparent opacity-85" />
                
                {/* Category & Expand Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-medium bg-black/70 backdrop-blur-md text-cyan-300 border border-cyan-400/30 shadow-lg">
                    {project.category || "Data Engineering"}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 group-hover:text-cyan-400 group-hover:border-cyan-400/50 group-hover:scale-110 transition-all shadow-lg">
                    <Maximize2 size={13} />
                  </div>
                </div>

                {/* Bottom hint overlay on hover */}
                <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 font-semibold">
                  <span>View Documentation</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  {/* Tags */}
                  <div className="flex gap-1.5 mb-4 flex-wrap">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-slate-300 border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-sora font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="pt-5 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-cyan-400/80 group-hover:text-cyan-300 flex items-center gap-1">
                    <FileText size={13} />
                    Explore Stack & Docs
                  </span>

                  <div className="flex items-center gap-3">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="View GitHub Repository"
                      className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <Github size={15} />
                    </a>
                    {project.demo && project.demo !== '#' && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="View Live Link"
                        className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors"
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Project Documentation & Tech Stack Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-obsidian border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header Bar */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02] backdrop-blur-md">
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-600 p-[1px] flex-shrink-0">
                    <div className="w-full h-full rounded-[11px] bg-black flex items-center justify-center text-cyan-300">
                      <Terminal size={18} />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                      {selectedProject.category || "Project Architecture"}
                    </span>
                    <h3 className="text-lg md:text-xl font-sora font-bold text-white truncate">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                  >
                    <Github size={14} />
                    GitHub
                  </a>
                  {selectedProject.demo && selectedProject.demo !== '#' && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono text-cyan-300 transition-colors"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close project modal"
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Visual Banner */}
              <div className="relative h-48 md:h-64 overflow-hidden flex-shrink-0 bg-black">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover brightness-[0.7]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-black/30 to-transparent" />
                
                <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {selectedProject.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-400/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-xl md:text-2xl font-sora font-bold text-white drop-shadow-md">
                      {selectedProject.title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs inside Modal */}
              <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/5 bg-white/[0.01]">
                <button
                  onClick={() => setModalTab('docs')}
                  className={`flex items-center gap-2 py-3 px-4 border-b-2 text-xs font-mono transition-all ${
                    modalTab === 'docs'
                      ? 'border-cyan-400 text-cyan-400 font-bold'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText size={14} />
                  Documentation & Workflow
                </button>
                <button
                  onClick={() => setModalTab('tech')}
                  className={`flex items-center gap-2 py-3 px-4 border-b-2 text-xs font-mono transition-all ${
                    modalTab === 'tech'
                      ? 'border-cyan-400 text-cyan-400 font-bold'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers size={14} />
                  Technologies Used ({selectedProject.technologies?.length || selectedProject.tags.length})
                </button>
                <button
                  onClick={() => setModalTab('architecture')}
                  className={`flex items-center gap-2 py-3 px-4 border-b-2 text-xs font-mono transition-all ${
                    modalTab === 'architecture'
                      ? 'border-cyan-400 text-cyan-400 font-bold'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Cpu size={14} />
                  Key Outcomes & Specs
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8 scroll-smooth">
                {/* TAB 1: Detailed Documentation */}
                {modalTab === 'docs' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {/* Overview Card */}
                    <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider font-bold">
                        <Sparkles size={14} />
                        Executive Overview
                      </div>
                      <p className="text-slate-200 text-sm md:text-base leading-relaxed font-light">
                        {selectedProject.documentation?.overview || selectedProject.description}
                      </p>
                    </div>

                    {/* Problem Statement */}
                    {selectedProject.documentation?.problemStatement && (
                      <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-3">
                        <div className="flex items-center gap-2 text-purple-400 text-xs font-mono uppercase tracking-wider font-bold">
                          <Terminal size={14} />
                          Problem Statement & Core Challenge
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed font-light">
                          {selectedProject.documentation.problemStatement}
                        </p>
                      </div>
                    )}

                    {/* Methodology & Architecture Pipeline */}
                    {selectedProject.documentation?.methodology && (
                      <div className="space-y-4">
                        <h5 className="text-sm font-sora font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <Code2 size={16} className="text-cyan-400" />
                          Engineering Methodology & Architecture Flow
                        </h5>
                        <div className="space-y-3">
                          {selectedProject.documentation.methodology.map((step, idx) => (
                            <div 
                              key={idx}
                              className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-colors flex items-start gap-4"
                            >
                              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                                0{idx + 1}
                              </div>
                              <p className="text-slate-300 text-sm leading-relaxed font-light">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key Engineering Features */}
                    {selectedProject.documentation?.keyFeatures && (
                      <div className="space-y-4">
                        <h5 className="text-sm font-sora font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-emerald-400" />
                          Key Architectural Features
                        </h5>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {selectedProject.documentation.keyFeatures.map((feat, idx) => (
                            <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                              <span className="text-slate-300 text-xs leading-relaxed">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* TAB 2: Technologies Used */}
                {modalTab === 'tech' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                      <h5 className="text-sm font-sora font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Layers size={16} className="text-cyan-400" />
                        Comprehensive Technology Stack
                      </h5>
                      <span className="text-xs font-mono text-slate-500">
                        {selectedProject.technologies?.length || selectedProject.tags.length} Core Technologies Integrated
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {selectedProject.technologies && selectedProject.technologies.length > 0 ? (
                        selectedProject.technologies.map((tech, idx) => (
                          <div 
                            key={idx}
                            className="p-5 rounded-2xl glass-card border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                                  {tech.category}
                                </span>
                              </div>
                              <h6 className="text-white font-sora font-bold text-base mb-2">
                                {tech.name}
                              </h6>
                              <p className="text-slate-400 text-xs leading-relaxed font-light">
                                {tech.description}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        selectedProject.tags.map((tag, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                            <span className="text-white font-mono text-sm font-bold">{tag}</span>
                            <span className="text-xs font-mono text-cyan-400">Integrated Component</span>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: Outcomes & Specs */}
                {modalTab === 'architecture' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-4">
                      <h5 className="text-sm font-sora font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-400" />
                        Measurable Outcomes & Project Impact
                      </h5>
                      <div className="space-y-3">
                        {selectedProject.documentation?.outcomes.map((outcome, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              ✓
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed font-light">
                              {outcome}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Access Card */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h6 className="text-white font-sora font-bold text-base mb-1">Explore Codebase on GitHub</h6>
                        <p className="text-slate-400 text-xs font-mono">Inspect repository source code, Jupyter notebooks, and schema definitions.</p>
                      </div>
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex-shrink-0"
                      >
                        <Github size={15} />
                        View Repository
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Modal Bottom Footer */}
              <div className="p-6 border-t border-white/10 bg-black/40 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <span>Author: Arslan Ali</span>
                  <span>•</span>
                  <span>Karachi, Pakistan</span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white transition-colors"
                  >
                    <Github size={14} />
                    GitHub Repo
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    Close View
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
