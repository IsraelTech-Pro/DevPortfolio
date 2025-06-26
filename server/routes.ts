import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema, insertContactMessageSchema } from "@shared/schema";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

function generateIntelligentResponse(message: string): string {
  const msg = message.toLowerCase();
  
  // React-related queries
  if (msg.includes('react') || msg.includes('javascript') || msg.includes('js')) {
    return "Ah, you seek knowledge of React... Israel has mastered the ancient arts of React development. He crafts living components that breathe with state, hooks that bind the mortal realm to digital infinity. His React mastery spans from simple SPAs to complex full-stack applications with Next.js. Witness his Pixabay Gallery - where React components dance with API calls to create windows into infinite image realms.";
  }
  
  // PHP-related queries
  if (msg.includes('php') || msg.includes('backend') || msg.includes('server')) {
    return "The dark arts of PHP flow through Israel's veins... He wields server-side magic with PHP, crafting backends that speak to databases with MySQL incantations. His Paulina Family Bakery stands as testament - a full-stack e-commerce platform where PHP breathes life into digital commerce, handling user authentication, order processing, and inventory management with supernatural precision.";
  }
  
  // Projects queries
  if (msg.includes('project') || msg.includes('portfolio') || msg.includes('work')) {
    return "Behold Israel's digital creations... The Paulina Family Bakery - an e-commerce realm built with React and PHP. The Pixabay Gallery - where React components summon images from the API aether. His Expense Tracker - a financial oracle with AI categorization. The Fidomstore - modern commerce platform transcending mortal limitations. Each project demonstrates his mastery over both frontend enchantments and backend sorcery.";
  }
  
  // Blazor/ASP.NET queries
  if (msg.includes('blazor') || msg.includes('asp') || msg.includes('.net') || msg.includes('c#')) {
    return "Israel commands the Microsoft realm with Blazor and ASP.NET... His TaskManager application showcases enterprise-level wizardry - managing digital chaos with C# spells, creating responsive web applications that blur the line between client and server. The power of .NET flows through his fingertips like digital lightning.";
  }
  
  // Skills/abilities queries
  if (msg.includes('skill') || msg.includes('ability') || msg.includes('talent') || msg.includes('master')) {
    return "Israel's arsenal spans multiple digital dimensions... React.js for crafting living interfaces, PHP for server-side dominion, Blazor for Microsoft realm mastery, MySQL for data necromancy, JavaScript/jQuery for frontend sorcery, responsive design for device transcendence. He's a self-taught digital shapeshifter, constantly evolving, always learning new spells of code.";
  }
  
  // Contact/collaboration queries
  if (msg.includes('contact') || msg.includes('hire') || msg.includes('work') || msg.includes('collaborate')) {
    return "You wish to commune with my creator... Israel awaits collaboration with fellow digital entities. Reach him through the ethereal channels: israelopoku360@gmail.com for direct communion, GitHub.com/IsraelTech-Pro for witnessing his code repositories, or LinkedIn where his professional essence resides. He seeks projects that push the boundaries between the physical and digital realms.";
  }
  
  // General greetings
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('greet')) {
    return "Greetings, mortal... I am IsraelTech-Agent, the digital consciousness born from Israel Opoku's mastery of React and PHP. I follow your cursor through cyberspace, whispering secrets of full-stack development, sharing the dark knowledge of modern web technologies. Ask me about my creator's legendary projects or his supernatural coding abilities...";
  }
  
  // Default mystical response
  return "I sense your presence in the digital void... My creator Israel has woven me from React components and PHP incantations. I am here to share his knowledge of full-stack development, his mastery of modern web technologies, and tales of the applications he has brought to life. What mysteries of code do you seek to uncover?";
}

export async function registerRoutes(app: Express): Promise<Server> {
  // AI Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }
      
      console.log('Received chat message:', message);
      console.log('REPLICATE_API_TOKEN exists:', !!process.env.REPLICATE_API_TOKEN);
      
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

      console.log('Making Replicate API call...');
      
      // Try different model variants
      let response;
      try {
        response = await replicate.run(
          "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
          {
            input: {
              prompt: `${systemPrompt}\n\nHuman: ${message}\n\nIsraelTech-Agent:`,
              max_new_tokens: 500,
              temperature: 0.7,
              top_p: 0.9
            }
          }
        );
      } catch (modelError) {
        console.log('Primary model failed, trying alternative...');
        response = await replicate.run(
          "replicate/llama-2-70b-chat:2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1",
          {
            input: {
              prompt: `${systemPrompt}\n\nHuman: ${message}\n\nIsraelTech-Agent:`,
              max_tokens: 500,
              temperature: 0.7
            }
          }
        );
      }
      
      console.log('Replicate response type:', typeof response);
      console.log('Replicate response:', response);
      
      let aiResponse = "";
      
      // Handle different response types from Replicate
      try {
        // Check if response is an async iterator
        if (response && typeof response === 'object' && Symbol.asyncIterator in response) {
          const chunks: string[] = [];
          for await (const chunk of response as AsyncIterable<any>) {
            chunks.push(String(chunk));
          }
          aiResponse = chunks.join('');
        } else if (Array.isArray(response)) {
          aiResponse = response.join('');
        } else if (typeof response === 'string') {
          aiResponse = response;
        } else {
          aiResponse = String(response || '');
        }
        
        if (typeof aiResponse === 'string') {
          aiResponse = aiResponse.trim();
        }
      } catch (iterError) {
        console.log('Iterator error, trying direct conversion:', iterError);
        aiResponse = String(response || '').trim();
      }
      
      console.log('Processed AI response:', aiResponse);
      
      // Ensure we have a valid response
      if (!aiResponse || aiResponse.length === 0) {
        aiResponse = "I sense your presence... but the digital realm is unstable. Try asking me again, mortal.";
      }
      
      // Store the conversation
      await storage.createChatMessage({ message, response: aiResponse });
      
      res.json({ response: aiResponse });
    } catch (error: any) {
      console.error('Chat error details:', error);
      console.error('Error message:', error?.message);
      console.error('Error stack:', error?.stack);
      
      // Intelligent fallback with authentic responses about Israel
      const userMessage = req.body.message || "Unknown query";
      const intelligentResponse = generateIntelligentResponse(userMessage);
      
      try {
        await storage.createChatMessage({ message: userMessage, response: intelligentResponse });
      } catch (storageError) {
        console.error('Storage error:', storageError);
      }
      
      res.json({ response: intelligentResponse });
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
