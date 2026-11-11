import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

export default function App() {
  return (
    <div className="relative min-h-screen neural-dots">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </motion.main>
      <Footer />
      <Chatbot />
    </div>
  );
}
