import { motion } from 'framer-motion';
import { MapPin, Code, Camera, Youtube } from 'lucide-react';

const skills = [
  { name: 'React.js', level: 95, color: 'electric' },
  { name: 'PHP', level: 90, color: 'cyber-green' },
  { name: 'Blazor', level: 85, color: 'plasma-pink' },
  { name: 'ASP.NET', level: 88, color: 'hologram' },
];

export function ProfileCard() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="holographic rounded-3xl p-8 animate-float"
      >
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-electric to-neon-purple p-1 mb-4">
            <img 
              src="https://israeltech.onrender.com/img/profile.png" 
              alt="Israel Opoku - Developer" 
              className="w-full h-full rounded-full object-cover" 
            />
          </div>
          <h3 className="font-orbitron text-2xl font-bold text-white mb-2">ISRAEL OPOKU</h3>
          <p className="text-electric">Full-Stack Developer & AI Enthusiast</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <MapPin className="text-cyber-green mr-3 w-5 h-5" />
            <span>Ghana, Available Worldwide</span>
          </div>
          <div className="flex items-center">
            <Code className="text-electric mr-3 w-5 h-5" />
            <span>React • PHP • Blazor • ASP.NET</span>
          </div>
          <div className="flex items-center">
            <Camera className="text-plasma-pink mr-3 w-5 h-5" />
            <span>Photography Enthusiast</span>
          </div>
          <div className="flex items-center">
            <Youtube className="text-red-500 mr-3 w-5 h-5" />
            <span>Content Creator</span>
          </div>
        </div>
      </motion.div>
      
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="holographic rounded-2xl p-6"
        >
          <h4 className="font-orbitron text-xl font-bold text-electric mb-4">BIOGRAPHY</h4>
          <p className="leading-relaxed text-gray-300">
            A self-taught developer who transforms ideas into digital realities. Passionate about 
            creating immersive web experiences and intelligent AI systems. Currently mastering 
            React.js and responsive design while building the future of web development.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="holographic rounded-2xl p-6"
        >
          <h4 className="font-orbitron text-xl font-bold text-cyber-green mb-4">CORE SKILLS</h4>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div key={skill.name} className="skill-item">
                <div className="flex justify-between mb-2">
                  <span>{skill.name}</span>
                  <span className={`text-${skill.color}`}>{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div 
                    className={`bg-gradient-to-r from-${skill.color} to-electric h-2 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
