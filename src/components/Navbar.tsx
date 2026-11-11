import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { RESUME_DATA } from '../constants';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 w-full z-50 bg-[#05070a]/80 backdrop-blur-md border-b border-white/5"
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl p-[1px] bg-gradient-to-tr from-cyan-400 to-purple-600 shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="w-full h-full rounded-[11px] bg-[#05070a] flex items-center justify-center font-sora font-extrabold text-xs text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 border border-white/10">
              AA
            </div>
          </div>
          <span className="font-sora font-medium tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            Arslan Ali
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          {navItems.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              className="hover:text-cyan-400 transition-colors font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-5">
          <a 
            href={RESUME_DATA.resumePdf} 
            download="Arslan-Ali-Resume.pdf" 
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-[11px] uppercase font-bold tracking-widest"
          >
            <Download size={14} />
            Resume (PDF)
          </a>
          <a 
            href="#contact"
            className="px-5 py-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-black text-[11px] font-bold rounded-full hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all uppercase tracking-wider"
          >
            Hire me
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg bg-white/5 border border-white/10"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#05070a]/95 border-b border-white/10 backdrop-blur-2xl px-6 py-5 overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-cyan-400 py-1.5 text-sm font-medium transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
                <a
                  href={RESUME_DATA.resumePdf}
                  download="Arslan-Ali-Resume.pdf"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white"
                >
                  <Download size={14} />
                  Download Resume (PDF)
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center bg-gradient-to-r from-cyan-400 to-purple-500 text-black text-xs font-bold rounded-xl uppercase tracking-wider"
                >
                  Hire me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
