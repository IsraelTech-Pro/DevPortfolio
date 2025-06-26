# Israel's AI Portfolio - Replit Documentation

## Overview

This project is an interactive AI-powered portfolio website for Israel Opoku, a full-stack developer specializing in React and PHP. The application features a modern cyberpunk-themed design with 3D animations, an AI chatbot, and a comprehensive project showcase. It demonstrates Israel's skills in both frontend and backend development while providing an engaging user experience through AI integration.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom cyberpunk theme variables
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **3D Graphics**: React Three Fiber for 3D animations and effects
- **Animations**: Framer Motion for smooth transitions and interactions
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **AI Integration**: OpenAI GPT-4o API for chatbot functionality
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Vite for development server and build tooling

### Database Schema
The application uses three main tables:
- `users`: User authentication and management
- `chat_messages`: AI conversation history storage
- `contact_messages`: Contact form submissions

## Key Components

### AI Chatbot (Opoku-1)
- Custom AI assistant trained to represent Israel's professional profile
- Real-time chat interface with voice recognition support
- Conversation history persistence
- Personality-driven responses showcasing Israel's work and skills

### 3D Interactive Elements
- Floating particles animation system
- 3D hero section with React Three Fiber
- Cyberpunk-themed visual effects and animations
- Responsive 3D elements that adapt to screen size

### Project Showcase
- Interactive project cards with hover effects
- Technology stack visualization
- Links to GitHub repositories and live demos
- Detailed project descriptions and features

### Contact System
- Form validation with Zod schemas
- Email integration for contact submissions
- Toast notifications for user feedback
- Project type categorization

## Data Flow

1. **User Interaction**: Users interact with the portfolio through various components
2. **AI Processing**: Chat messages are sent to OpenAI API via backend routes
3. **Database Operations**: Conversations and contact forms are stored in PostgreSQL
4. **Real-time Updates**: React Query manages cache invalidation and updates
5. **Visual Feedback**: Toast notifications and animations provide user feedback

## External Dependencies

### AI Services
- **OpenAI API**: GPT-4o model for intelligent chatbot responses
- **Environment Variables**: `OPENAI_API_KEY` for API authentication

### Database
- **Neon Database**: Serverless PostgreSQL hosting
- **Environment Variables**: `DATABASE_URL` for database connection

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **Framer Motion**: Animation library for React
- **React Three Fiber**: 3D graphics rendering

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and development experience
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
1. Frontend built with Vite to `dist/public`
2. Backend bundled with ESBuild to `dist/index.js`
3. Database schema deployed with Drizzle migrations

### Environment Configuration
- **Development**: Uses `tsx` for TypeScript execution
- **Production**: Compiled JavaScript execution
- **Database**: Automatic provisioning on Replit with PostgreSQL module

### Replit Configuration
- **Modules**: Node.js 20, Web, PostgreSQL 16
- **Port**: 5000 (mapped to external port 80)
- **Deployment**: Autoscale deployment target
- **Workflows**: Automated development and production workflows

## Changelog

```
Changelog:
- June 26, 2025: Initial setup with cinematic 3D AI portfolio
- June 26, 2025: Implemented IsraelTech-Agent with instant response system
- June 26, 2025: Added voice recognition and text-to-speech with female voice
- June 26, 2025: Integrated intelligent fallback responses with authentic expertise data
- June 26, 2025: Removed Send button for seamless auto-response interaction
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```