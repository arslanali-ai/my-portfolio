import { motion } from 'framer-motion';
import { Download, ArrowRight, Sparkles } from 'lucide-react';
import { RESUME_DATA } from '../constants';

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-32 pb-16 px-6 sm:px-10 overflow-hidden">
      {/* Background Particles/Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Avatar Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mb-8"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl relative z-20 group">
          <img 
            src={RESUME_DATA.profileImage} 
            alt={RESUME_DATA.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[9px] text-cyan-300 font-mono uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              Available for hire
            </span>
          </div>
        </div>
        {/* Glow effect behind image */}
        <div className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-2xl z-10 animate-pulse" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center z-10 max-w-4xl"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/70 text-[10px] font-bold uppercase tracking-widest mb-6"
        >
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          Neural Portfolio • Karachi, PK
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-sora font-extrabold tracking-tighter mb-6 leading-tight">
          <motion.span
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{ backgroundSize: '200% auto' }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400"
          >
            {RESUME_DATA.name}
          </motion.span>
        </h1>
        
        {/* Capability Tags */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {[
            { text: "AI & Data Science", color: "text-cyan-400" },
            { text: "Machine Learning", color: "text-purple-400" },
            { text: "Python & SQL", color: "text-blue-400" },
            { text: "Agentic AI", color: "text-emerald-400" }
          ].map((role, i) => (
            <motion.span
              key={role.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: [0, -4, 0],
              }}
              transition={{ 
                delay: 0.4 + (i * 0.1),
                y: {
                  repeat: Infinity,
                  duration: 2.5 + (i * 0.2),
                  ease: "easeInOut"
                }
              }}
              className={`text-xs sm:text-sm md:text-base font-medium px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 ${role.color}`}
            >
              {role.text}
            </motion.span>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto text-white/70 text-sm md:text-base leading-relaxed mb-10 font-light"
        >
          {RESUME_DATA.about}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={RESUME_DATA.resumePdf}
            download="Arslan-Ali-Resume.pdf"
            className="w-full sm:w-auto group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(6,182,212,0.3)] border border-white/20"
          >
            <motion.div 
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              style={{ backgroundSize: '200% auto' }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-blue-600 group-hover:from-cyan-500 group-hover:via-purple-500 group-hover:to-blue-500 -z-10 transition-colors"
            />
            
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors backdrop-blur-sm">
              <Download size={16} className="text-white group-hover:translate-y-0.5 transition-transform" />
            </div>
            <span className="tracking-widest text-xs uppercase font-bold text-white">DOWNLOAD RESUME</span>
          </a>

          <a
            href="#projects"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 text-white text-xs font-mono uppercase tracking-wider transition-all duration-300 hover:scale-105"
          >
            <span>Explore Projects</span>
            <ArrowRight size={15} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
