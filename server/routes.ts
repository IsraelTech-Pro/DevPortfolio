import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema, insertContactMessageSchema } from "@shared/schema";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

function generateIntelligentResponse(message: string, userName: string = ''): string {
  const msg = message.toLowerCase();
  const greeting = userName ? `Hey ${userName}, ` : '';
  
  // Name detection and greeting
  if (msg.includes('my name is') || msg.includes("i'm ") || msg.includes('i am ') || 
      (msg.split(' ').length <= 3 && !msg.includes('what') && !msg.includes('how') && !msg.includes('tell'))) {
    const possibleName = extractName(message);
    if (possibleName) {
      return `Nice to meet you, ${possibleName}! I'm excited to tell you about Israel Opoku. He's based in Koforidua, Ghana, and he's an incredibly talented full-stack developer. What would you like to know about him first - his React projects, PHP work, or maybe his experience?`;
    }
  }
  
  // React projects with specific URLs
  if (msg.includes('react') || msg.includes('javascript') || msg.includes('js')) {
    return `${greeting}Israel's React skills are impressive! He's built some amazing projects. The Paulina Family Bakery is a beautiful React site you can check out at israeltech-pro.github.io/paulinafamilybakery. He also created a stunning Pixabay Gallery with Tailwind CSS - it's live at israeltech-pro.github.io/-react-tailwind-pixabay-gallery. Want to see any of these in action?`;
  }
  
  // PHP and full-stack projects
  if (msg.includes('php') || msg.includes('backend') || msg.includes('server') || msg.includes('full stack')) {
    return `${greeting}Israel's PHP skills are solid! He built the FidomStore ecommerce platform and another ecommerce site during his internship at FidomHub. His full-stack abilities really shine in projects like the Paulina Family Bakery where he combines React frontend with robust backend systems. You can find all his PHP projects on his GitHub at github.com/IsraelTech-Pro.`;
  }
  
  // Specific project requests
  if (msg.includes('project') || msg.includes('portfolio') || msg.includes('show me') || msg.includes('demo')) {
    return `${greeting}I'd love to show you Israel's work! Here are some highlights: The Paulina Family Bakery (React) at israeltech-pro.github.io/paulinafamilybakery, his Pixabay Gallery with Tailwind at israeltech-pro.github.io/-react-tailwind-pixabay-gallery, and an Expense Tracker at israeltech-pro.github.io/expense-tracker-react. Which one interests you most?`;
  }
  
  // Blazor and .NET projects
  if (msg.includes('blazor') || msg.includes('asp') || msg.includes('.net') || msg.includes('c#') || msg.includes('task manager')) {
    return `${greeting}Israel also works with Microsoft technologies! He built a Task Manager App using Blazor and .NET - it's a great example of his versatility beyond React and PHP. You can check out the code on his GitHub at github.com/IsraelTech-Pro/Task-Manager-App. Pretty cool how he handles both traditional web and modern .NET development!`;
  }
  
  // Skills and experience
  if (msg.includes('skill') || msg.includes('experience') || msg.includes('background') || msg.includes('education')) {
    return `${greeting}Israel's got a solid foundation! He's studying Computer Network Management at Koforidua Technical University (graduating 2025) and has real-world experience from internships at FidomHub and as a React developer. His skills span HTML, CSS, JavaScript, PHP, SQL, React.js, Laravel, Blazor, and more. Want to know about any specific technology?`;
  }
  
  // Contact information
  if (msg.includes('contact') || msg.includes('hire') || msg.includes('reach') || msg.includes('email')) {
    return `${greeting}You can reach Israel at israelopoku360@gmail.com for projects and collaborations. His portfolio is at israeltech.onrender.com, GitHub at github.com/IsraelTech-Pro, and LinkedIn at linkedin.com/in/israel-opoku-55ab5626b. He's always interested in new opportunities!`;
  }
  
  // More projects request
  if (msg.includes('more') || msg.includes('another') || msg.includes('other')) {
    return `${greeting}Absolutely! Israel also built a Pixabay Image Finder at israeltech-pro.github.io/Pixabay-image-finder and has several ecommerce projects in PHP. Each project showcases different skills - from API integration to responsive design. Which type of project interests you most?`;
  }
  
  // Links and URLs
  if (msg.includes('link') || msg.includes('url') || msg.includes('website') || msg.includes('live')) {
    return `${greeting}Here are Israel's key links: Portfolio: israeltech.onrender.com, GitHub: github.com/IsraelTech-Pro, and some live projects like the Paulina Family Bakery at israeltech-pro.github.io/paulinafamilybakery. Which one would you like to explore first?`;
  }
  
  // General greetings
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return `Hello! I'm Agent Blank, Israel Opoku's AI assistant. I can tell you anything about his skills, projects, or background. He's a talented full-stack developer from Ghana with some really impressive React and PHP projects. What's your name?`;
  }
  
  // Default helpful response
  return `${greeting}I'm here to tell you about Israel Opoku - he's a full-stack developer from Koforidua, Ghana, with amazing React and PHP skills. You can see his work at projects like the Paulina Family Bakery or his Pixabay Gallery. What would you like to know about him?`;
}

function extractName(message: string): string {
  const msg = message.toLowerCase();
  
  // Extract name from common patterns
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
      const userName = req.body.userName || "";
      const intelligentResponse = generateIntelligentResponse(userMessage, userName);
      
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
