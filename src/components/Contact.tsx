import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, FileText, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { cn, RESUME_DATA } from '../constants';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const contactLinks = [
    { 
      type: "Email",
      icon: Mail, 
      label: RESUME_DATA.email, 
      href: `mailto:${RESUME_DATA.email}`,
      color: "hover:text-red-400",
      bg: "hover:bg-red-500/10",
      border: "hover:border-red-500/30"
    },
    { 
      type: "Phone / WhatsApp",
      icon: Phone, 
      label: RESUME_DATA.phone, 
      href: `tel:${RESUME_DATA.phone}`,
      color: "hover:text-emerald-400",
      bg: "hover:bg-emerald-500/10",
      border: "hover:border-emerald-500/30"
    },
    { 
      type: "Location",
      icon: MapPin, 
      label: RESUME_DATA.location, 
      href: "https://maps.google.com/?q=Karachi,+Pakistan",
      color: "hover:text-purple-400",
      bg: "hover:bg-purple-500/10",
      border: "hover:border-purple-500/30"
    },
    { 
      type: "GitHub",
      icon: Github, 
      label: "github.com/arslanali-ai", 
      href: "https://github.com/arslanali-ai",
      color: "hover:text-white",
      bg: "hover:bg-white/10",
      border: "hover:border-white/30"
    },
    { 
      type: "LinkedIn",
      icon: Linkedin, 
      label: "linkedin.com/in/arslan-ali-ai-ml", 
      href: "https://www.linkedin.com/in/arslan-ali-ai-ml",
      color: "hover:text-blue-400",
      bg: "hover:bg-blue-500/10",
      border: "hover:border-blue-500/30"
    },
    { 
      type: "Official Resume",
      icon: FileText, 
      label: "Download Arslan-Ali_Resume.pdf", 
      href: RESUME_DATA.resumePdf,
      color: "hover:text-cyan-400",
      bg: "hover:bg-cyan-500/10",
      border: "hover:border-cyan-500/30",
      download: "Arslan-Ali-Resume.pdf"
    }
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
    const query = (form.elements.namedItem('query') as HTMLTextAreaElement)?.value;

    setSubmitted(true);
    window.location.href = `mailto:${RESUME_DATA.email}?subject=Portfolio Contact from ${encodeURIComponent(name || 'Visitor')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${query}`)}`;
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-sora font-extrabold text-white mb-6">
              Let's build something <span className="text-gradient">legendary.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg mb-10 leading-relaxed font-light">
              Interested in AI architectures, Machine Learning, automated ETL pipelines, or looking to collaborate on real-world data solutions? Connect with me directly.
            </p>

            <div className="grid sm:grid-cols-2 gap-3.5">
              {contactLinks.map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  target={item.download ? undefined : "_blank"}
                  rel="noreferrer"
                  download={item.download}
                  className="flex items-center gap-4 p-3.5 rounded-2xl glass-card border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 transition-all duration-300 border border-white/10 shadow-lg group-hover:scale-105 flex-shrink-0",
                    item.color,
                    item.bg,
                    item.border
                  )}>
                    <item.icon size={18} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{item.type}</span>
                    <span className="text-slate-200 group-hover:text-white transition-colors font-medium text-xs truncate">{item.label}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card p-8 neon-glow-purple border border-white/10 rounded-3xl"
          >
            <h3 className="text-xl font-sora font-bold text-white mb-2">Send a Message</h3>
            <p className="text-xs font-mono text-slate-400 mb-6">Direct dispatch to {RESUME_DATA.email}</p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 text-white text-sm focus:outline-none focus:border-cyan-400 transition-all"
                  placeholder="e.g. Alex Hunter"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Your Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 text-white text-sm focus:outline-none focus:border-cyan-400 transition-all"
                  placeholder="you@domain.com"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Message</label>
                <textarea 
                  rows={4}
                  name="query"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 text-white text-sm focus:outline-none focus:border-cyan-400 transition-all resize-none"
                  placeholder="Tell me about your project, team, or opportunities..."
                />
              </div>
              
              <button 
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 text-obsidian font-bold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 size={18} className="text-emerald-950" />
                    Opening Mail Client...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Transmit Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
