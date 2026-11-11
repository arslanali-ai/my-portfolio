import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot } from 'lucide-react';
import { askResumeAgent } from '../services/gemini';
import { cn, RESUME_DATA } from '../constants';

const SUGGESTIONS = [
  "What are your top skills?",
  "Tell me about Technify internship",
  "Show me your ETL project",
  "How can I contact you?"
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'bot', 
      content: "Hi! I'm Arslan Ali's AI assistant. Ask me anything about my machine learning projects, skills in Python & SQL, or background!" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || input).trim();
    if (!textToSend || isTyping) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role === 'bot' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const botResponse = await askResumeAgent(textToSend, history);
    setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 sm:bottom-24 right-0 w-[calc(100vw-3rem)] sm:w-[390px] h-[520px] sm:h-[580px] bg-[#05070a]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 p-[1.5px] overflow-hidden flex-shrink-0">
                  <img 
                    src={RESUME_DATA.profileImage} 
                    alt={RESUME_DATA.name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    {RESUME_DATA.name}
                    <span className="text-[10px] text-cyan-300 font-mono font-normal">(AI)</span>
                  </div>
                  <div className="text-[10px] text-cyan-400 font-mono tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    Online • Neural Assistant
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Close chatbot"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth"
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3",
                    msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  {msg.role === 'bot' ? (
                    <img 
                      src={RESUME_DATA.profileImage} 
                      alt="Arslan Ali" 
                      className="w-7 h-7 rounded-full object-cover border border-cyan-400/50 flex-shrink-0 mt-0.5" 
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold bg-slate-800 text-slate-300 border border-white/10 mt-0.5">
                      ME
                    </div>
                  )}
                  <div className={cn(
                    "p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line",
                    msg.role === 'user' 
                      ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white rounded-tr-none max-w-[82%]" 
                      : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-none max-w-[85%]"
                  )}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono p-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span>Thinking...</span>
                </div>
              )}

              {/* Quick suggestion chips (shown when conversation is fresh) */}
              {messages.length <= 2 && !isTyping && (
                <div className="pt-2 space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                    Suggested Questions:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTIONS.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleSend(item)}
                        className="text-left text-[11px] font-mono px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 hover:text-white transition-all hover:scale-[1.02]"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="p-4 border-t border-white/10 bg-black/40">
              <div className="relative flex items-center">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about projects, skills, Technify..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors pr-12 placeholder:text-slate-500"
                />
                <button 
                  onClick={() => handleSend()} 
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 w-8 h-8 bg-cyan-500 disabled:opacity-40 disabled:hover:bg-cyan-500 rounded-lg flex items-center justify-center hover:bg-cyan-400 transition-colors"
                  aria-label="Send message"
                >
                  <Send size={13} className="text-black" />
                </button>
              </div>
              <p className="text-center text-[9px] text-slate-500 mt-2 font-mono uppercase tracking-widest">
                Stop reading my resume — just talk to it
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chatbot Toggle Trigger */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close AI Chatbot" : "Open AI Chatbot"}
        className="w-14 h-14 sm:w-16 sm:h-16 relative rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.35)] overflow-hidden z-[101] border border-white/20 group cursor-pointer"
      >
        <motion.div 
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ backgroundSize: '200% auto' }}
          className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 opacity-90 group-hover:opacity-100 transition-opacity"
        />
        <div className="relative z-10 text-white drop-shadow-lg">
          {isOpen ? <X size={24} /> : <Bot size={26} />}
        </div>
        
        {!isOpen && (
          <span className="absolute inset-0 rounded-2xl bg-cyan-400/20 animate-ping pointer-events-none" />
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
