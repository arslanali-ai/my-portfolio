import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import { RESUME_DATA } from '../constants';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/5 bg-black/60 backdrop-blur-md px-6 sm:px-10 text-[11px] text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6 uppercase tracking-widest font-mono text-[10px]">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            System Online • Karachi
          </span>
          <span>© {new Date().getFullYear()} {RESUME_DATA.name}</span>
        </div>
        
        <div className="flex items-center gap-6 uppercase tracking-wider font-mono text-[10px]">
          <a 
            href="https://github.com/arslanali-ai" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Github size={12} />
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/arslan-ali-ai-ml" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-purple-400 transition-colors flex items-center gap-1"
          >
            <Linkedin size={12} />
            LinkedIn
          </a>
          <a 
            href={`mailto:${RESUME_DATA.email}`}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Mail size={12} />
            Email
          </a>
          <a 
            href={RESUME_DATA.resumePdf} 
            download="Arslan-Ali-Resume.pdf" 
            className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-white/70"
          >
            <FileText size={12} />
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
