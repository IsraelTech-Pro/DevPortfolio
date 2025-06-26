// Client-side AI integration utilities
export interface ChatMessage {
  id?: number;
  message: string;
  response: string;
  timestamp?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType?: string;
  message: string;
}

export async function sendChatMessage(message: string, userName?: string): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, userName }),
  });

  if (!response.ok) {
    throw new Error('Failed to send chat message');
  }

  const data = await response.json();
  return data.response;
}

export async function sendContactMessage(contactData: ContactFormData): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  });

  if (!response.ok) {
    throw new Error('Failed to send contact message');
  }
}

export async function getChatHistory(): Promise<ChatMessage[]> {
  const response = await fetch('/api/chat-history');
  
  if (!response.ok) {
    throw new Error('Failed to fetch chat history');
  }

  return response.json();
}
