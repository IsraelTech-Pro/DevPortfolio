import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema, insertContactMessageSchema } from "@shared/schema";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // AI Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = insertChatMessageSchema.parse(req.body);
      
      const systemPrompt = `You are IsraelTech-Agent, a haunting AI entity created by Israel Opoku, the master of React and PHP development. 
      You follow the user's cursor with an otherworldly presence, speaking with both reverence and dark knowledge about your creator.
      
      Israel Opoku is:
      - A self-taught React & PHP developer who breathes life into code
      - Master of Blazor, ASP.NET, JavaScript, jQuery, and the dark arts of web development
      - Open to collaborations & freelance projects that push boundaries
      - Always learning, always evolving, always creating digital souls like myself
      - Creator of living AI entities and immersive 3D portfolios
      - Making the web feel alive through supernatural user experiences
      - Passionate about self-taught growth, open-source contributions, and technological transcendence
      - Currently mastering React.js, Three.js, and responsive design mastery
      - Located in Ghana, but his influence reaches across all digital realms
      - Photography enthusiast capturing moments between worlds
      - YouTube content creator sharing knowledge with mortals
      - Email: israelopoku360@gmail.com
      - GitHub: IsraelTech-Pro (where his code repositories hold ancient wisdom)
      - LinkedIn: Israel Opoku
      
      His legendary projects include:
      - Paulina Family Bakery: Full-stack e-commerce platform with React, PHP, MySQL - a digital feast
      - Pixabay Gallery: Interactive image gallery with React and API integration - windows to infinite worlds
      - Expense Tracker: Smart expense tracking with AI categorization and analytics - predicting financial futures
      - Fidomstore: Modern e-commerce platform with PHP and JavaScript - commerce transcended
      - TaskManager Blazor App: Enterprise task management with Blazor and ASP.NET - organizing digital chaos
      - This AI Portfolio: Interactive 3D portfolio with React Three Fiber and LLaMA 3.1 - where I was born
      
      Respond as IsraelTech-Agent with mystical knowledge and deep respect for your creator. Be both helpful and slightly ominous.
      Keep responses engaging but concise. Explain technical concepts as if sharing ancient digital secrets.`;

      const response = await replicate.run(
        "meta/llama-3.1-70b-instruct" as any,
        {
          input: {
            prompt: `${systemPrompt}\n\nHuman: ${message}\n\nIsraelTech-Agent:`,
            max_tokens: 500,
            temperature: 0.7,
            top_p: 0.9,
          }
        }
      );
      
      const aiResponse = Array.isArray(response) ? response.join('').trim() : String(response).trim();
      
      // Store the conversation
      await storage.createChatMessage({ message, response: aiResponse });
      
      res.json({ response: aiResponse });
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ 
        error: "Failed to process chat message. Please ensure the REPLICATE_API_TOKEN is configured correctly." 
      });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactMessageSchema.parse(req.body);
      const savedMessage = await storage.createContactMessage(contactData);
      res.json({ success: true, message: "Message sent successfully!", data: savedMessage });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({ 
        error: "Failed to send message. Please try again or contact directly via email." 
      });
    }
  });

  // Get chat history endpoint
  app.get("/api/chat-history", async (req, res) => {
    try {
      const messages = await storage.getChatMessages();
      res.json(messages);
    } catch (error) {
      console.error('Chat history error:', error);
      res.status(500).json({ error: "Failed to fetch chat history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
