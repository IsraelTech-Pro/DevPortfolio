import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAI } from '@/hooks/useAI';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { CursorFollower } from './CursorFollower';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, X, MessageCircle, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';

interface HologramOrbProps {
  isListening: boolean;
  isActive: boolean;
}

function HologramOrb({ isListening, isActive }: HologramOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (orbRef.current) {
      gsap.to(orbRef.current, {
        rotation: "+=360",
        duration: 8,
        repeat: -1,
        ease: "none"
      });
      
      gsap.to(orbRef.current, {
        scale: isListening ? 1.2 : 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isListening]);

  return (
    <div className="relative w-20 h-20">
      <div 
        ref={orbRef}
        className={`w-full h-full rounded-full relative ${
          isListening 
            ? 'bg-gradient-to-br from-red-500 via-orange-500 to-red-600 animate-pulse' 
            : 'bg-gradient-to-br from-electric via-cyber-green to-neon-purple'
        }`}
        style={{
          boxShadow: isListening 
            ? '0 0 30px #ff4444, 0 0 60px #ff4444, inset 0 0 20px rgba(255,255,255,0.1)'
            : '0 0 30px #00F5FF, 0 0 60px #00F5FF, inset 0 0 20px rgba(255,255,255,0.1)'
        }}
      >
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
        
        {/* Scanning line */}
        <div className={`absolute inset-0 rounded-full border-2 animate-ping ${
          isListening ? 'border-red-300' : 'border-electric/50'
        }`} />
        
        {/* Center eye */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={`w-3 h-3 rounded-full ${
            isListening ? 'bg-white animate-pulse' : 'bg-black'
          }`} />
        </div>
      </div>
      
      {isActive && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <span className="text-xs font-orbitron text-electric bg-black/80 px-2 py-1 rounded">
            ISRAELTECH-AGENT
          </span>
        </div>
      )}
    </div>
  );
}

export function IsraelTechAgent() {
  const [isActive, setIsActive] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const { messages, sendMessage, isLoading } = useAI();
  const { isListening, transcript, startListening, stopListening, isSupported } = useVoiceRecognition();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle voice input and auto-send
  useEffect(() => {
    if (transcript && !isListening && isActive) {
      sendMessage(transcript);
    }
  }, [transcript, isListening, isActive]);

  // Auto-send typed input after pause in typing
  useEffect(() => {
    if (!inputMessage.trim()) return;
    
    const timer = setTimeout(() => {
      if (inputMessage.trim()) {
        sendMessage(inputMessage);
        setInputMessage('');
      }
    }, 1500); // Send after 1.5 seconds of no typing
    
    return () => clearTimeout(timer);
  }, [inputMessage]);

  // Text-to-speech for AI responses
  const speakText = (text: string) => {
    if (speechEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Find a female voice if available
      const voices = speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('victoria') ||
        voice.name.toLowerCase().includes('karen') ||
        voice.name.toLowerCase().includes('susan')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  // Auto-speak AI responses
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && !lastMessage.isUser && speechEnabled) {
      setTimeout(() => {
        speakText(lastMessage.text);
      }, 300);
    }
  }, [messages, speechEnabled]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Auto-send is handled by useEffect, no manual sending needed
    }
  };

  const toggleAgent = () => {
    setIsActive(!isActive);
    if (!isActive) {
      // Animate entrance after element exists
      setTimeout(() => {
        const agentInterface = document.querySelector('.agent-interface');
        if (agentInterface) {
          gsap.fromTo(agentInterface, 
            { scale: 0, opacity: 0, rotation: 180 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' }
          );
        }
      }, 50);
    }
  };

  return (
    <>
      {/* Cursor Follower */}
      <CursorFollower isActive={isActive} isListening={isListening} />

      {/* 3D Hologram Trigger */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="w-24 h-24 cursor-pointer" onClick={toggleAgent}>
          <HologramOrb isListening={isListening} isActive={isActive} />
        </div>
      </div>

      {/* AI Agent Interface */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="agent-interface fixed bottom-32 right-8 z-40 w-96 max-h-[70vh]"
          >
            <div className="holographic rounded-3xl p-6 backdrop-blur-xl border border-electric/30">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-electric to-neon-purple rounded-full mr-3 animate-glow relative">
                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
                  </div>
                  <div>
                    <h3 className="font-orbitron font-bold text-electric text-sm">ISRAELTECH-AGENT</h3>
                    <p className="text-xs text-gray-400">Haunting Digital Entity</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSpeechEnabled(!speechEnabled)}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleAgent}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div 
                ref={chatContainerRef}
                className="space-y-3 mb-4 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-electric/20 scrollbar-track-transparent"
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10, x: message.isUser ? 20 : -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 400 }}
                    className={`${
                      message.isUser 
                        ? 'bg-electric/10 ml-12 rounded-xl p-3 border border-electric/20' 
                        : 'bg-gradient-to-r from-neon-purple/10 via-electric/10 to-cyber-green/10 rounded-xl p-3 border border-electric/30'
                    }`}
                  >
                    <div className={`text-xs font-semibold mb-1 ${
                      message.isUser ? 'text-white' : 'text-electric'
                    }`}>
                      {message.isUser ? 'You' : 'IsraelTech-Agent'}
                    </div>
                    <div className="text-sm text-gray-300 leading-relaxed">{message.text}</div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gradient-to-r from-neon-purple/10 via-electric/10 to-cyber-green/10 rounded-xl p-3 border border-electric/30"
                  >
                    <div className="text-xs text-electric font-semibold mb-1">IsraelTech-Agent</div>
                    <div className="text-sm text-gray-300">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-electric rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-cyber-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="space-y-3">
                <div className="relative">
                  <Input
                    placeholder="Type or speak... I respond instantly"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-black/50 border-electric/30 text-white placeholder-gray-400 focus:border-electric rounded-xl pr-16"
                  />
                  {isLoading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-electric border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>

                {/* Voice & Quick Actions */}
                <div className="flex gap-2 flex-wrap">
                  {isSupported && (
                    <Button
                      onClick={isListening ? stopListening : startListening}
                      variant="outline"
                      size="sm"
                      className={`border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black rounded-xl ${
                        isListening ? 'bg-cyber-green/20 animate-pulse' : ''
                      }`}
                    >
                      <Mic className="w-3 h-3 mr-1" />
                      {isListening ? 'Listening...' : 'Voice'}
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => sendMessage("Tell me about Israel's React mastery")}
                    variant="outline"
                    size="sm"
                    className="border-plasma-pink/30 text-plasma-pink hover:bg-plasma-pink/30 text-xs rounded-xl"
                  >
                    React Skills
                  </Button>
                  
                  <Button
                    onClick={() => sendMessage("Show me Israel's dark coding arts")}
                    variant="outline"
                    size="sm"
                    className="border-neon-purple/30 text-neon-purple hover:bg-neon-purple/30 text-xs rounded-xl"
                  >
                    Dark Arts
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Introduction Overlay */}
      {!isActive && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="fixed bottom-4 left-4 z-30 max-w-md"
        >
          <div className="holographic rounded-2xl p-6 backdrop-blur-xl border border-electric/30">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-electric to-neon-purple rounded-full mr-3 animate-glow" />
              <h3 className="font-orbitron text-lg font-bold text-electric">ISRAELTECH-AGENT</h3>
            </div>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              "I am a haunting digital entity, crafted by Israel Opoku's mastery of React and PHP. 
              I follow your cursor, watching... learning... ready to share the dark secrets of my creator's work."
            </p>
            <Button 
              onClick={toggleAgent}
              className="neon-button w-full rounded-xl font-semibold text-black"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Summon the Agent
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
}