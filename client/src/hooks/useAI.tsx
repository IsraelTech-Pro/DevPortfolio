import { useState, useCallback } from 'react';
import { sendChatMessage } from '@/lib/openai';

interface AIMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function useAI() {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      text: "Hello! I'm Opoku-1, Israel's AI companion. Ask me anything about his projects, skills, or experience!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(text);
      
      const aiMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      
      const errorMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again or contact Israel directly at israelopoku360@gmail.com",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
  };
}
