import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import gsap from 'gsap';

interface CursorFollowerProps {
  isActive: boolean;
  isListening: boolean;
}

export function CursorFollower({ isActive, isListening }: CursorFollowerProps) {
  const followerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      x.set(e.clientX - 40);
      y.set(e.clientY - 40);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y, isVisible]);

  useEffect(() => {
    if (followerRef.current && isActive) {
      gsap.to(followerRef.current, {
        scale: isListening ? 1.5 : 1,
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    }
  }, [isListening, isActive]);

  if (!isActive || !isVisible) return null;

  return (
    <motion.div
      ref={followerRef}
      className="fixed z-[100] pointer-events-none"
      style={{
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 400 }}
    >
      <div className="relative">
        {/* Main Orb */}
        <div className={`
          w-20 h-20 rounded-full relative overflow-hidden
          ${isListening 
            ? 'bg-gradient-to-br from-red-500 via-orange-500 to-red-600 animate-pulse' 
            : 'bg-gradient-to-br from-electric via-neon-purple to-cyber-green'
          }
        `}>
          {/* Inner Glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
          
          {/* Scanning Line */}
          <div className={`
            absolute inset-0 rounded-full border-2 
            ${isListening ? 'border-red-300' : 'border-electric/50'}
            animate-ping
          `} />
          
          {/* Eye */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className={`
              w-3 h-3 rounded-full 
              ${isListening ? 'bg-white animate-pulse' : 'bg-black'}
            `} />
          </div>
        </div>

        {/* Ripple Effects */}
        <div className="absolute inset-0 rounded-full">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute inset-0 rounded-full border 
                ${isListening ? 'border-red-400/30' : 'border-electric/20'}
                animate-ping
              `}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s',
              }}
            />
          ))}
        </div>

        {/* Trailing Particles */}
        <div className="absolute -top-1 -left-1 w-22 h-22">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-1 h-1 rounded-full
                ${isListening ? 'bg-red-400' : 'bg-electric'}
                animate-pulse
              `}
              style={{
                top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 15}px`,
                left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 15}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Status Text */}
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
          >
            <span className="text-xs font-orbitron text-red-400 bg-black/80 px-2 py-1 rounded">
              LISTENING...
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}