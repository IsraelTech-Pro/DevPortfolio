import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

function FloatingElement({ delay = 0, position = 'center', children }: { 
  delay?: number; 
  position?: 'left' | 'center' | 'right'; 
  children: React.ReactNode 
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      gsap.fromTo(elementRef.current, 
        { 
          y: 100, 
          opacity: 0, 
          rotationX: -45, 
          scale: 0.5 
        },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0, 
          scale: 1, 
          duration: 1.5, 
          delay,
          ease: "back.out(1.7)" 
        }
      );

      // Continuous floating animation
      gsap.to(elementRef.current, {
        y: "+=20",
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      // Continuous rotation
      gsap.to(elementRef.current, {
        rotationY: "+=360",
        duration: 10 + Math.random() * 5,
        repeat: -1,
        ease: "none"
      });
    }
  }, [delay]);

  const positionClasses = {
    left: 'left-1/4',
    center: 'left-1/2 transform -translate-x-1/2',
    right: 'right-1/4'
  };

  return (
    <div 
      ref={elementRef}
      className={`absolute ${positionClasses[position]} top-1/2 transform -translate-y-1/2`}
      style={{ perspective: '1000px' }}
    >
      {children}
    </div>
  );
}

function CSS3DDevices() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Laptop */}
      <FloatingElement delay={0.5} position="left">
        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          <div className="w-32 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-electric/30 relative">
            <div className="w-28 h-16 bg-black rounded m-2 border border-electric/20">
              <div className="text-electric text-xs p-2 font-mono">
                {'> israel@dev:~$ npm run create-magic'}
              </div>
            </div>
          </div>
          <div className="w-32 h-2 bg-gray-700 rounded-b-lg border-x border-b border-electric/20"></div>
        </div>
      </FloatingElement>

      {/* Mobile Phone */}
      <FloatingElement delay={1} position="right">
        <div className="w-16 h-28 bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-neon-purple/30 relative">
          <div className="w-12 h-20 bg-black rounded-xl m-2 border border-neon-purple/20">
            <div className="text-neon-purple text-xs p-1 text-center">
              React App
            </div>
          </div>
          <div className="w-8 h-1 bg-neon-purple/30 rounded-full mx-auto mt-1"></div>
        </div>
      </FloatingElement>

      {/* Code Blocks */}
      {[...Array(6)].map((_, i) => (
        <FloatingElement key={i} delay={1.5 + i * 0.3} position={i % 2 === 0 ? 'left' : 'right'}>
          <div 
            className="w-12 h-12 bg-gradient-to-br from-electric/20 to-cyber-green/20 border border-electric/30 rounded-lg flex items-center justify-center"
            style={{ 
              transform: `translate3d(${(i % 2 === 0 ? -1 : 1) * (100 + i * 50)}px, ${Math.sin(i) * 100}px, ${i * 20}px)` 
            }}
          >
            <span className="text-electric text-xs font-mono">
              {['JS', 'TS', 'PHP', 'React', 'Node', '3D'][i]}
            </span>
          </div>
        </FloatingElement>
      ))}
    </div>
  );
}

function ParticleField() {
  useEffect(() => {
    const container = document.querySelector('.particle-container');
    if (!container) return;

    // Create floating particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-electric rounded-full opacity-60';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.animationDuration = `${3 + Math.random() * 4}s`;
      
      gsap.to(particle, {
        y: `-=${Math.random() * 200 + 100}`,
        x: `+=${(Math.random() - 0.5) * 100}`,
        opacity: 0,
        duration: 3 + Math.random() * 4,
        repeat: -1,
        ease: "power2.out"
      });

      container.appendChild(particle);
    }
  }, []);

  return <div className="particle-container absolute inset-0 pointer-events-none"></div>;
}

function CentralOrb() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (orbRef.current) {
      gsap.fromTo(orbRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 2, ease: "elastic.out(1, 0.5)" }
      );

      // Continuous rotation and pulsing
      gsap.to(orbRef.current, {
        rotation: "+=360",
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      gsap.to(orbRef.current, {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div 
        ref={orbRef}
        className="relative w-32 h-32 rounded-full bg-gradient-to-br from-electric via-cyber-green to-neon-purple animate-glow"
        style={{ 
          background: 'radial-gradient(circle, #00F5FF 0%, #00FF88 50%, #8B00FF 100%)',
          boxShadow: '0 0 50px #00F5FF, inset 0 0 50px rgba(255,255,255,0.1)'
        }}
      >
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
        
        {/* Orbital rings */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-electric/30 rounded-full animate-spin"
            style={{
              width: `${140 + i * 20}px`,
              height: `${140 + i * 20}px`,
              top: `${-10 - i * 10}px`,
              left: `${-10 - i * 10}px`,
              animationDuration: `${10 + i * 5}s`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export function Hero3D() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;
        
        gsap.to(heroRef.current, {
          duration: 2,
          rotationX: -yPos * 0.5,
          rotationY: xPos * 0.5,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div 
        ref={heroRef}
        className="absolute inset-0"
        style={{ 
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Particle Field */}
        <ParticleField />
        
        {/* 3D Devices and Code */}
        <CSS3DDevices />
        
        {/* Central Orb */}
        <CentralOrb />
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern bg-electric/10"></div>
        </div>
      </div>
      
      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-deep-space/50 to-deep-space/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-slate/30 to-deep-space/70 pointer-events-none" />
      
      {/* Scanline Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-electric to-transparent animate-pulse opacity-30" 
             style={{ top: '30%', animationDuration: '3s' }} />
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent animate-pulse opacity-20" 
             style={{ top: '60%', animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyber-green to-transparent animate-pulse opacity-15" 
             style={{ top: '80%', animationDuration: '5s', animationDelay: '2s' }} />
      </div>
      
      {/* Matrix-style falling code */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-electric text-xs font-mono animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            {['const', 'function', 'return', 'export', 'import', 'useState', 'useEffect'][Math.floor(Math.random() * 7)]}
          </div>
        ))}
      </div>
    </div>
  );
}
