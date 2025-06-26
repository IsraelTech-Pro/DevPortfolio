import { motion } from 'framer-motion';
import { Github, ExternalLink, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    id: 1,
    title: 'PAULINA FAMILY BAKERY',
    description: 'Full-stack e-commerce platform for a local bakery featuring online ordering, inventory management, and customer reviews.',
    image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    technologies: ['React', 'PHP', 'MySQL'],
    colors: ['electric', 'cyber-green', 'plasma-pink'],
    github: '#',
    demo: '#'
  },
  {
    id: 2,
    title: 'PIXABAY GALLERY',
    description: 'Interactive image gallery app with advanced search, filtering, and infinite scroll. Integrates with Pixabay API for millions of high-quality images.',
    image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    technologies: ['React', 'API Integration', 'Tailwind'],
    colors: ['electric', 'hologram', 'neon-purple'],
    github: '#',
    demo: '#'
  },
  {
    id: 3,
    title: 'EXPENSE TRACKER',
    description: 'Smart expense tracking application with AI-powered categorization, budget alerts, and detailed analytics dashboard.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    technologies: ['React', 'Chart.js', 'Node.js'],
    colors: ['electric', 'plasma-pink', 'cyber-green'],
    github: '#',
    demo: '#'
  },
  {
    id: 4,
    title: 'FIDOMSTORE',
    description: 'Modern e-commerce platform with real-time inventory, secure payments, and advanced product filtering system.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    technologies: ['PHP', 'JavaScript', 'Bootstrap'],
    colors: ['cyber-green', 'electric', 'hologram'],
    github: '#',
    demo: '#'
  },
  {
    id: 5,
    title: 'TASKMANAGER BLAZOR',
    description: 'Enterprise-grade task management system built with Blazor, featuring real-time collaboration and advanced project analytics.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    technologies: ['Blazor', 'ASP.NET', 'SignalR'],
    colors: ['neon-purple', 'hologram', 'electric'],
    github: '#',
    demo: '#'
  },
  {
    id: 6,
    title: 'AI PORTFOLIO ASSISTANT',
    description: "This very portfolio! An AI-powered interactive experience with voice recognition, 3D environments, and personalized conversations.",
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    technologies: ['React', 'Three.js', 'OpenAI'],
    colors: ['electric', 'cyber-green', 'plasma-pink'],
    github: '#',
    demo: 'current'
  }
];

export function ProjectShowroom() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-4 text-electric">PROJECT SHOWROOM</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-electric to-neon-purple mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my digital creations in an immersive 3D environment. Each project is showcased 
            inside realistic device mockups with interactive demonstrations.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="project-card rounded-2xl p-6 device-mockup"
            >
              <div className="mb-6">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover rounded-xl" 
                />
              </div>
              <h3 className={`font-orbitron text-xl font-bold text-${project.colors[0]} mb-3`}>
                {project.title}
              </h3>
              <p className="text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={tech}
                    className={`px-3 py-1 bg-${project.colors[techIndex]}/20 text-${project.colors[techIndex]} rounded-full text-sm`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <Button
                  asChild
                  className={`flex-1 bg-${project.colors[0]} text-black hover:bg-${project.colors[0]}/80`}
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className={`flex-1 border-${project.colors[0]} text-${project.colors[0]} hover:bg-${project.colors[0]} hover:text-black`}
                >
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {project.demo === 'current' ? "You're Here!" : 'Live Demo'}
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* AI Project Explainer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="holographic rounded-3xl p-8 text-center"
        >
          <div className="ai-orb mx-auto mb-6" />
          <h3 className="font-orbitron text-2xl font-bold text-electric mb-4">ASK OPOKU-1 ABOUT ANY PROJECT</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            My AI companion can explain the technical details, challenges overcome, and implementation 
            specifics of any project. Just ask!
          </p>
          <Button className="neon-button px-8 py-3 rounded-full font-semibold text-black">
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat with AI About Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
