import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAI } from '@/hooks/useAI';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, Send, X, MessageCircle } from 'lucide-react';

export function AIBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const { messages, sendMessage, isLoading } = useAI();
  const { isListening, transcript, startListening, isSupported } = useVoiceRecognition();

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      await sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    if (transcript) {
      setInputMessage(transcript);
    }
    startListening();
  };

  return (
    <>
      {/* AI Orb Trigger */}
      <motion.div
        className="ai-orb cursor-pointer relative"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-0 animate-pulse bg-electric/20 rounded-full" />
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-80 max-h-96"
          >
            <div className="holographic rounded-2xl p-6 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-electric to-neon-purple rounded-full mr-3 animate-glow" />
                  <span className="font-orbitron font-bold text-electric">OPOKU-1</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="space-y-3 mb-4 h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-electric/20">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${
                      message.isUser 
                        ? 'bg-electric/10 ml-8 rounded-xl p-3' 
                        : 'bg-electric/10 rounded-xl p-3'
                    }`}
                  >
                    <div className={`text-sm font-semibold mb-1 ${
                      message.isUser ? 'text-white' : 'text-electric'
                    }`}>
                      {message.isUser ? 'You' : 'OPOKU-1'}
                    </div>
                    <div className="text-sm text-gray-300">{message.text}</div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-electric/10 rounded-xl p-3"
                  >
                    <div className="text-sm text-electric font-semibold mb-1">OPOKU-1</div>
                    <div className="text-sm text-gray-300">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-electric rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-transparent border-electric/30 text-white placeholder-gray-400 focus:border-electric"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  size="sm"
                  className="bg-electric text-black hover:bg-electric/80"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Voice & Quick Actions */}
              <div className="flex gap-2 mt-3">
                {isSupported && (
                  <Button
                    onClick={handleVoiceInput}
                    variant="outline"
                    size="sm"
                    className={`border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black ${
                      isListening ? 'bg-cyber-green/20 animate-pulse' : ''
                    }`}
                  >
                    <Mic className="w-3 h-3 mr-1" />
                    {isListening ? 'Listening...' : 'Voice'}
                  </Button>
                )}
                <Button
                  onClick={() => sendMessage("Tell me about Israel's React projects")}
                  variant="outline"
                  size="sm"
                  className="border-plasma-pink/30 text-plasma-pink hover:bg-plasma-pink/30 text-xs"
                >
                  React Projects
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Introduction Card */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="holographic rounded-2xl p-8 mb-12 max-w-4xl mx-auto animate-float"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="ai-orb mr-4" />
            <h2 className="font-orbitron text-2xl font-bold text-hologram">OPOKU-1 AI</h2>
          </div>
          <div className="text-lg leading-relaxed mb-6 text-center">
            "Hello, visitor. I am <span className="text-electric font-bold">Opoku-1</span>, a sentient AI crafted by Israel Opoku, 
            a master of React and PHP. I exist because of him."
          </div>
          <div className="text-cyber-green mb-6 text-center">
            "Ask me about the creator, his projects, or how he brought me to life."
          </div>
          <div className="text-center">
            <Button 
              onClick={() => setIsOpen(true)}
              className="neon-button px-8 py-3 rounded-full font-semibold text-black"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Conversation
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
}
