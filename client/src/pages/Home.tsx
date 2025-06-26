import { motion } from 'framer-motion';
import { Hero3D } from '@/components/Hero3D';
import { AgentBlank } from '@/components/AgentBlank';
import { ProfileCard } from '@/components/ProfileCard';
import { ProjectShowroom } from '@/components/ProjectShowroom';
import { Contact } from '@/components/Contact';
import { FloatingParticles } from '@/components/FloatingParticles';
import { Button } from '@/components/ui/button';
import { Rocket, Download, Github, Linkedin, Mail, Youtube } from 'lucide-react';

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white relative">
      <FloatingParticles />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 holographic">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-orbitron text-xl font-bold text-electric">ISRAEL.EXE</div>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('hero')}
                className="hover:text-electric transition-colors duration-300"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="hover:text-electric transition-colors duration-300"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="hover:text-electric transition-colors duration-300"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="hover:text-electric transition-colors duration-300"
              >
                Contact
              </button>
            </div>
            <AgentBlank />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative">
        <Hero3D />
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-orbitron text-6xl md:text-8xl font-black mb-6 glitch-text"
            data-text="ISRAEL OPOKU"
          >
            ISRAEL OPOKU
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-2xl md:text-3xl mb-8 text-electric typing-text"
          >
            Next-Generation Developer
          </motion.div>
          
          <AgentBlank />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <Button 
              onClick={() => scrollToSection('projects')}
              className="neon-button px-8 py-3 rounded-full font-semibold text-black"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Explore Portfolio
            </Button>
            <Button
              variant="outline"
              className="border-2 border-electric text-electric px-8 py-3 rounded-full font-semibold hover:bg-electric hover:text-black transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-4 text-electric">DIGITAL IDENTITY</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-electric to-neon-purple mx-auto" />
          </motion.div>
          
          <ProfileCard />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <ProjectShowroom />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-electric/20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="font-orbitron text-2xl font-bold text-electric mb-4">ISRAEL.EXE</div>
            <p className="text-gray-400 mb-6">Making the web feel alive • Next-generation developer</p>
            <div className="flex justify-center space-x-6 mb-6">
              <a 
                href="https://github.com/IsraelTech-Pro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-electric transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com/in/israel-opoku" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-electric transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="mailto:israelopoku360@gmail.com"
                className="text-gray-400 hover:text-electric transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-electric transition-colors"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 Israel Opoku. Crafted with React + AI • Open to collaboration
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
