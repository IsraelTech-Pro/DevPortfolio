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
    <div className="relative w-full h-full">
      {/* Glowing rings */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute inset-0 rounded-full border animate-pulse ${
              isListening ? 'border-red-400' : 'border-electric/40'
            }`}
            style={{
              animationDelay: `${i * 0.2}s`,
              transform: `scale(${1 + i * 0.1})`
            }}
          />
        ))}
      </div>
      
      {/* Main orb */}
      <div
        ref={orbRef}
        className={`w-full h-full rounded-full bg-gradient-to-br transition-all duration-300 ${
          isListening 
            ? 'from-red-400 via-red-500 to-red-600 shadow-red-500/50' 
            : 'from-electric via-cyan-400 to-blue-500 shadow-electric/50'
        } shadow-2xl`}
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
            AGENT BLANK
          </span>
        </div>
      )}
    </div>
  );
}

export function AgentBlank() {
  const [isActive, setIsActive] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [hasIntroduced, setHasIntroduced] = useState(false);
  const [microphoneAccess, setMicrophoneAccess] = useState(false);
  const [userName, setUserName] = useState('');
  const { messages, sendMessage, isLoading } = useAI();
  const { isListening, transcript, startListening, stopListening, isSupported } = useVoiceRecognition();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Request microphone access and introduce Agent Blank on load
  useEffect(() => {
    const initializeAgentBlank = async () => {
      try {
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicrophoneAccess(true);
        
        // Stop the stream after permission is granted
        stream.getTracks().forEach(track => track.stop());
        
        // Introduce Agent Blank with voice after a delay
        if (!hasIntroduced && speechEnabled) {
          setTimeout(() => {
            const introMessage = "Hello, I'm Agent Blank — Israel Opoku's AI assistant. I can tell you anything about him, his skills, or his work. What's your name?";
            speakAsAgentBlank(introMessage);
            setHasIntroduced(true);
          }, 2000);
        }
      } catch (error) {
        console.log('Microphone access denied or unavailable');
        setMicrophoneAccess(false);
        
        // Still introduce without microphone
        if (!hasIntroduced && speechEnabled) {
          setTimeout(() => {
            const introMessage = "Hello, I'm Agent Blank — Israel Opoku's AI assistant. I can tell you anything about him, his skills, or his work. What's your name?";
            speakAsAgentBlank(introMessage);
            setHasIntroduced(true);
          }, 2000);
        }
      }
    };

    // Initialize after voices are loaded
    const timer = setTimeout(() => {
      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.addEventListener('voiceschanged', initializeAgentBlank, { once: true });
      } else {
        initializeAgentBlank();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [hasIntroduced, speechEnabled]);

  // Handle voice input and auto-send
  useEffect(() => {
    if (transcript && !isListening && isActive) {
      sendMessage(transcript, userName);
    }
  }, [transcript, isListening, isActive, userName]);

  // Auto-send typed input after pause in typing
  useEffect(() => {
    if (!inputMessage.trim()) return;
    
    const timer = setTimeout(() => {
      if (inputMessage.trim()) {
        // Extract name if user is introducing themselves
        const possibleName = extractNameFromMessage(inputMessage);
        if (possibleName && !userName) {
          setUserName(possibleName);
        }
        
        sendMessage(inputMessage, userName || possibleName || '');
        setInputMessage('');
      }
    }, 1500); // Send after 1.5 seconds of no typing
    
    return () => clearTimeout(timer);
  }, [inputMessage]);

  // Agent Blank voice function - only female voices allowed
  const speakAsAgentBlank = (text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Only use female voices for Agent Blank
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('woman') ||
      voice.name.toLowerCase().includes('samantha') ||
      voice.name.toLowerCase().includes('karen') ||
      voice.name.toLowerCase().includes('moira') ||
      voice.name.toLowerCase().includes('victoria') ||
      voice.name.toLowerCase().includes('susan') ||
      voice.name.toLowerCase().includes('zira') ||
      voice.name.toLowerCase().includes('hazel') ||
      voice.name.toLowerCase().includes('fiona') ||
      voice.name.toLowerCase().includes('alice')
    ) || voices.find(voice => !voice.name.toLowerCase().includes('male'));
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    speechSynthesis.speak(utterance);
  };

  // Auto-speak AI responses
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && !lastMessage.isUser && speechEnabled) {
      setTimeout(() => {
        speakAsAgentBlank(lastMessage.text);
      }, 300);
    }
  }, [messages, speechEnabled]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Auto-send is handled by useEffect, no manual sending needed
    }
  };

  // Name extraction function
  const extractNameFromMessage = (message: string): string => {
    const msg = message.toLowerCase();
    
    if (msg.includes('my name is ')) {
      return message.split(/my name is /i)[1]?.split(/[,.!?]/)[0]?.trim() || '';
    }
    if (msg.includes("i'm ")) {
      return message.split(/i'm /i)[1]?.split(/[,.!?]/)[0]?.trim() || '';
    }
    if (msg.includes('i am ')) {
      return message.split(/i am /i)[1]?.split(/[,.!?]/)[0]?.trim() || '';
    }
    
    // If it's a short message without question words, assume it might be just a name
    const words = message.trim().split(' ');
    if (words.length <= 2 && !msg.includes('what') && !msg.includes('how') && !msg.includes('tell')) {
      return message.trim();
    }
    
    return '';
  };

  const toggleAgent = () => {
    setIsActive(!isActive);
    if (!isActive && microphoneAccess && isSupported) {
      // Auto-start listening when agent is activated
      setTimeout(() => {
        startListening();
      }, 500);
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
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="agent-interface fixed bottom-32 right-8 w-96 h-96 bg-black/90 backdrop-blur-xl rounded-2xl border border-electric/30 shadow-2xl shadow-electric/20 z-40"
          >
            <div className="h-full flex flex-col p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electric to-cyan-400 flex items-center justify-center">
                    <div className="w-3 h-3 bg-black rounded-full animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-white font-orbitron font-bold text-sm">AGENT BLANK</h3>
                    <p className="text-electric text-xs">
                      {microphoneAccess ? 'Voice & Text Ready' : 'Text Ready'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setSpeechEnabled(!speechEnabled)}
                    variant="ghost"
                    size="sm"
                    className="text-electric hover:bg-electric/20 rounded-xl"
                  >
                    {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                  <Button
                    onClick={toggleAgent}
                    variant="ghost"
                    size="sm"
                    className="text-electric hover:bg-electric/20 rounded-xl"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Chat Messages */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 scrollbar-thin scrollbar-thumb-electric/30 scrollbar-track-transparent"
              >
                {messages.length === 0 ? (
                  <div className="text-center text-gray-400 text-sm mt-8">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-electric to-cyan-400 flex items-center justify-center animate-pulse">
                      <MessageCircle className="w-6 h-6 text-black" />
                    </div>
                    <p>I'm Agent Blank, your AI guide.</p>
                    <p className="text-xs mt-1">Ask me about Israel's projects, skills, or portfolio.</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-xl text-sm ${
                          message.isUser
                            ? 'bg-electric text-black font-medium'
                            : 'bg-gray-800 text-white border border-electric/20'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 border border-electric/20 p-3 rounded-xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-electric rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                        <div className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                      </div>
                    </div>
                  </div>
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

                {/* Voice Control */}
                {isSupported && microphoneAccess && (
                  <div className="flex justify-center">
                    <Button
                      onClick={isListening ? stopListening : startListening}
                      variant="outline"
                      size="sm"
                      className={`border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black rounded-xl ${
                        isListening ? 'bg-cyber-green/20 animate-pulse' : ''
                      }`}
                    >
                      <Mic className="w-3 h-3 mr-1" />
                      {isListening ? 'Listening...' : 'Start Voice'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome Modal - First Time */}
      <AnimatePresence>
        {!isActive && !hasIntroduced && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-electric/30 max-w-md mx-4 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-electric to-cyan-400 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-2xl font-orbitron font-bold text-white mb-3">
                Meet Agent Blank
              </h2>
              <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                I'm your AI guide through Israel Opoku's portfolio. I'll automatically request microphone access 
                for voice interaction and guide you through his projects, skills, and achievements with natural conversation.
              </p>
              <Button 
                onClick={toggleAgent}
                className="neon-button w-full rounded-xl font-semibold text-black"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Activate Agent Blank
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}