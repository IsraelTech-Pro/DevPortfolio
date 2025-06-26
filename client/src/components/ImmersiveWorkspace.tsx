import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Terminal, Coffee, Monitor, Keyboard, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// CSS 3D Floating Code Editor
function FloatingCodeEditor() {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      gsap.to(editorRef.current, {
        rotationY: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(editorRef.current, {
        y: '-20px',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });
    }
  }, []);

  return (
    <motion.div
      ref={editorRef}
      className="absolute top-20 left-20 w-80 h-48 bg-gray-900/90 backdrop-blur-xl rounded-lg border border-electric/30 shadow-2xl shadow-electric/20"
      style={{
        transformStyle: 'preserve-3d',
        transform: 'rotateX(15deg) rotateY(-15deg)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <div className="p-4 h-full overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-400 text-xs ml-2">portfolio.tsx</span>
        </div>
        <div className="font-mono text-xs text-electric">
          <div className="text-purple-400">const</div>
          <div className="text-yellow-400 ml-2">portfolio = {'{'}</div>
          <div className="text-cyan-400 ml-4">developer: "Israel Opoku",</div>
          <div className="text-cyan-400 ml-4">skills: ["React", "PHP"],</div>
          <div className="text-cyan-400 ml-4">projects: projects.map(project =&gt;</div>
          <div className="text-green-400 ml-6">&lt;Project key=&#123;id&#125; /&gt;</div>
          <div className="text-cyan-400 ml-4">)</div>
          <div className="text-yellow-400 ml-2">{'}'}</div>
        </div>
      </div>
    </motion.div>
  );
}

// CSS 3D Terminal Window
function FloatingTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [output, setOutput] = useState(['$ npm run dev', '> Building portfolio...']);

  useEffect(() => {
    if (terminalRef.current) {
      gsap.to(terminalRef.current, {
        rotationX: 5,
        rotationY: -5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });
    }

    // Simulate terminal output
    const interval = setInterval(() => {
      setOutput(prev => {
        const newOutput = [...prev];
        const commands = [
          '✓ Portfolio compiled successfully',
          '✓ Assets optimized',
          '✓ Server running on :5000',
          '$ git status',
          'On branch main',
          'Your branch is up to date',
        ];
        newOutput.push(commands[Math.floor(Math.random() * commands.length)]);
        return newOutput.slice(-6); // Keep last 6 lines
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={terminalRef}
      className="absolute top-32 right-20 w-96 h-56 bg-black/95 backdrop-blur-xl rounded-lg border border-green-500/30 shadow-2xl shadow-green-500/20"
      style={{
        transformStyle: 'preserve-3d',
        transform: 'rotateX(-10deg) rotateY(10deg)',
      }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 1 }}
    >
      <div className="p-4 h-full">
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-sm font-mono">terminal</span>
        </div>
        <div className="font-mono text-xs text-green-400 space-y-1 overflow-hidden">
          {output.map((line, index) => (
            <motion.div
              key={`${line}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="whitespace-nowrap"
            >
              {line}
            </motion.div>
          ))}
          <div className="flex">
            <span>$ </span>
            <motion.span
              className="w-2 h-4 bg-green-400 ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 3D Coffee Mug with Steam
function CoffeeMugWithSteam() {
  const steamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (steamRef.current) {
      const particles = steamRef.current.children;
      Array.from(particles).forEach((particle, i) => {
        gsap.to(particle, {
          y: -100,
          x: `+=${Math.sin(i) * 20}`,
          opacity: 0,
          duration: 3,
          delay: i * 0.3,
          repeat: -1,
          ease: 'power1.out',
        });
      });
    }
  }, []);

  return (
    <motion.div
      className="absolute bottom-40 left-32 w-24 h-32"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      {/* Coffee Mug */}
      <div className="relative">
        <div className="w-16 h-20 bg-gray-800 rounded-b-lg border-2 border-gray-600 relative">
          {/* Handle */}
          <div className="absolute -right-3 top-4 w-6 h-8 border-2 border-gray-600 rounded-r-lg bg-transparent"></div>
          {/* Coffee */}
          <div className="absolute top-2 left-2 right-2 h-3 bg-amber-900 rounded-sm"></div>
        </div>
        
        {/* Steam */}
        <div ref={steamRef} className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{ left: i * 3 - 10 }}
            />
          ))}
        </div>
      </div>
      <Coffee className="absolute bottom-0 right-0 w-6 h-6 text-amber-600" />
    </motion.div>
  );
}

// 3D Glowing Keyboard
function GlowingKeyboard() {
  const [activeKeys, setActiveKeys] = useState<number[]>([]);
  const keyboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate typing
    const interval = setInterval(() => {
      const randomKeys = Array.from({ length: 3 }, () => Math.floor(Math.random() * 20));
      setActiveKeys(randomKeys);
      setTimeout(() => setActiveKeys([]), 200);
    }, 2000);

    if (keyboardRef.current) {
      gsap.to(keyboardRef.current, {
        rotationX: 2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={keyboardRef}
      className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80 h-24 bg-gray-900 rounded-lg border border-gray-700 shadow-2xl"
      style={{
        transformStyle: 'preserve-3d',
        transform: 'rotateX(30deg)',
      }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <div className="p-3 grid grid-cols-10 gap-1">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded border transition-all duration-200 ${
              activeKeys.includes(i)
                ? 'bg-electric border-electric shadow-lg shadow-electric/50'
                : 'bg-gray-800 border-gray-600'
            }`}
          />
        ))}
      </div>
      <Keyboard className="absolute -bottom-2 -right-2 w-6 h-6 text-gray-600" />
    </motion.div>
  );
}

// Dual Monitor Setup
function DualMonitorSetup() {
  const monitorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (monitorsRef.current) {
      gsap.to(monitorsRef.current, {
        rotationY: 3,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });
    }
  }, []);

  return (
    <motion.div
      ref={monitorsRef}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-8"
      style={{
        transformStyle: 'preserve-3d',
        transform: 'rotateX(-5deg) rotateY(-10deg)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 1.2 }}
    >
      {/* Left Monitor */}
      <div className="w-64 h-40 bg-gray-900 rounded-lg border-4 border-gray-700 shadow-2xl">
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded p-4 overflow-hidden">
          <div className="text-electric text-sm font-mono mb-2">Paulina Family Bakery</div>
          <div className="space-y-1">
            <div className="w-full h-2 bg-electric/30 rounded"></div>
            <div className="w-3/4 h-2 bg-pink-500/30 rounded"></div>
            <div className="w-1/2 h-2 bg-green-500/30 rounded"></div>
          </div>
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">React + PHP</div>
        </div>
      </div>

      {/* Right Monitor */}
      <div className="w-64 h-40 bg-gray-900 rounded-lg border-4 border-gray-700 shadow-2xl">
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded p-4 overflow-hidden">
          <div className="text-plasma-pink text-sm font-mono mb-2">Pixabay Gallery</div>
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-full h-6 bg-gradient-to-br from-electric/40 to-plasma-pink/40 rounded"></div>
            ))}
          </div>
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">React + API</div>
        </div>
      </div>
    </motion.div>
  );
}

// Cursor Trail Effect
function CursorTrail() {
  const trailRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 10 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 10 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={trailRef}
      className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-screen"
      style={{
        left: springX,
        top: springY,
        x: '-50%',
        y: '-50%',
      }}
    >
      <div className="w-full h-full bg-electric rounded-full opacity-60 animate-pulse shadow-lg shadow-electric/50" />
    </motion.div>
  );
}

// Developer Tools Floating Toolbar
const tools = [
  { name: 'VS Code', icon: Code, color: '#007ACC', desc: 'Code Editor' },
  { name: 'GitHub', icon: Github, color: '#181717', desc: 'Version Control' },
  { name: 'Terminal', icon: Terminal, color: '#4EAA25', desc: 'Command Line' },
  { name: 'Monitor', icon: Monitor, color: '#FF6B35', desc: 'Live Preview' },
];

function FloatingToolbar() {
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  
  const toggleTool = (toolName: string) => {
    setActiveTools(prev => 
      prev.includes(toolName) 
        ? prev.filter(t => t !== toolName)
        : [...prev, toolName]
    );
  };

  return (
    <motion.div 
      className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-4 border border-electric/30 shadow-2xl shadow-electric/10">
        <div className="space-y-4">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            const isActive = activeTools.includes(tool.name);
            const isHovered = hoveredTool === tool.name;
            
            return (
              <motion.div
                key={tool.name}
                className="relative"
                onHoverStart={() => setHoveredTool(tool.name)}
                onHoverEnd={() => setHoveredTool(null)}
              >
                <motion.button
                  onClick={() => toggleTool(tool.name)}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-electric text-black scale-110 shadow-lg shadow-electric/50'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <Icon size={20} />
                </motion.button>
                
                {/* Tooltip */}
                {isHovered && (
                  <motion.div
                    className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap border border-electric/30"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="font-semibold">{tool.name}</div>
                    <div className="text-gray-400 text-xs">{tool.desc}</div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// Digital Matrix Particles
function MatrixParticles() {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!particlesRef.current) return;

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute text-electric/20 font-mono text-xs pointer-events-none';
      particle.textContent = characters[Math.floor(Math.random() * characters.length)];
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = '0%';
      
      particlesRef.current?.appendChild(particle);

      gsap.to(particle, {
        y: window.innerHeight + 100,
        duration: Math.random() * 10 + 5,
        ease: 'none',
        onComplete: () => particle.remove(),
      });
    };

    const interval = setInterval(createParticle, 200);
    return () => clearInterval(interval);
  }, []);

  return <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
}

// Agent Blank Hologram Integration
function AgentBlankHologramArea() {
  return (
    <motion.div 
      className="fixed bottom-8 right-8 w-32 h-32 z-30"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5, duration: 1.2 }}
    >
      <div className="relative w-full h-full">
        {/* Enhanced hologram base */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-electric/30 to-cyan-400/30 backdrop-blur-xl border-2 border-electric/50 shadow-2xl shadow-electric/30" />
        
        {/* Animated scanning lines */}
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-electric/60"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Pulsing energy rings */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-electric/40"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
        
        {/* Center avatar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-electric rounded-full flex items-center justify-center shadow-lg shadow-electric/50">
            <span className="text-black font-bold text-lg">AB</span>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/80 text-electric text-xs px-2 py-1 rounded border border-electric/30">
            ACTIVE
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Main Immersive Workspace Component
export function ImmersiveWorkspace() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Setup parallax and interactive lighting
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const deltaX = (clientX - centerX) / centerX;
      const deltaY = (clientY - centerY) / centerY;

      // Parallax effect on 3D elements
      gsap.to('.workspace-3d', {
        rotationY: deltaX * 5,
        rotationX: -deltaY * 3,
        duration: 0.5,
        ease: 'power2.out',
      });

      // Dynamic lighting
      const lightGradient = `radial-gradient(circle at ${clientX}px ${clientY}px, rgba(0,255,255,0.1) 0%, transparent 50%)`;
      if (containerRef.current) {
        containerRef.current.style.background = lightGradient;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Matrix-style digital particles */}
      <MatrixParticles />
      
      {/* Main 3D workspace area */}
      <div className="workspace-3d w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
        <FloatingCodeEditor />
        <FloatingTerminal />
        <CoffeeMugWithSteam />
        <GlowingKeyboard />
        <DualMonitorSetup />
      </div>
      
      {/* Interactive UI overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="pointer-events-auto">
          <FloatingToolbar />
        </div>
        <AgentBlankHologramArea />
        <CursorTrail />
      </div>
      
      {/* Ambient lighting effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      {/* Futuristic scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.02) 2px, rgba(0, 255, 255, 0.02) 4px)',
        }}
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Interactive glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-electric/5 to-transparent pointer-events-none opacity-50" />
    </div>
  );
}