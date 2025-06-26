import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { sendContactMessage } from '@/lib/openai';
import { Send, Mail, Github, Linkedin, Mic, Clock, CheckCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  projectType: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      projectType: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactForm) => {
    setIsLoading(true);
    try {
      await sendContactMessage(data);
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out! I'll get back to you within 24 hours.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try emailing directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-4 text-electric">CALL THE CREATOR</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-electric to-neon-purple mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to bring your next project to life? Let's connect and create something extraordinary together.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="holographic rounded-3xl p-8"
          >
            <h3 className="font-orbitron text-2xl font-bold text-electric mb-6">SEND TRANSMISSION</h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="relative">
                <Input
                  {...form.register('name')}
                  placeholder="Your Name"
                  className="w-full bg-transparent border-2 border-electric/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-electric"
                />
                {form.formState.errors.name && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>
              
              <div className="relative">
                <Input
                  {...form.register('email')}
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-transparent border-2 border-electric/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-electric"
                />
                {form.formState.errors.email && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>
              
              <div className="relative">
                <Input
                  {...form.register('projectType')}
                  placeholder="Project Type (Optional)"
                  className="w-full bg-transparent border-2 border-electric/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-electric"
                />
              </div>
              
              <div className="relative">
                <Textarea
                  {...form.register('message')}
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full bg-transparent border-2 border-electric/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-electric resize-none"
                />
                {form.formState.errors.message && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full neon-button py-4 rounded-xl font-semibold text-black text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2" />
                    Sending...
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Launch Message
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-8 pt-8 border-t border-electric/20">
              <h4 className="font-orbitron text-lg font-bold text-cyber-green mb-4">VOICE COMMUNICATION</h4>
              <Button
                variant="outline"
                className="w-full border-2 border-cyber-green text-cyber-green py-3 rounded-xl font-semibold hover:bg-cyber-green hover:text-black"
              >
                <Mic className="w-4 h-4 mr-2" />
                Speak to AGENT BLANK AI
              </Button>
            </div>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="holographic rounded-2xl p-6">
              <h4 className="font-orbitron text-xl font-bold text-electric mb-4">DIRECT CHANNELS</h4>
              <div className="space-y-4">
                <a 
                  href="mailto:israelopoku360@gmail.com" 
                  className="flex items-center group hover:text-electric transition-colors"
                >
                  <div className="w-12 h-12 bg-electric/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-electric/40 transition-colors">
                    <Mail className="text-electric w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-gray-400">israelopoku360@gmail.com</div>
                  </div>
                </a>
                
                <a 
                  href="https://github.com/IsraelTech-Pro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center group hover:text-white transition-colors"
                >
                  <div className="w-12 h-12 bg-gray-600/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-gray-600/40 transition-colors">
                    <Github className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">GitHub</div>
                    <div className="text-gray-400">IsraelTech-Pro</div>
                  </div>
                </a>
                
                <a 
                  href="https://linkedin.com/in/israel-opoku" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center group hover:text-blue-400 transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-600/40 transition-colors">
                    <Linkedin className="text-blue-400 w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">LinkedIn</div>
                    <div className="text-gray-400">Israel Opoku</div>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="holographic rounded-2xl p-6">
              <h4 className="font-orbitron text-xl font-bold text-cyber-green mb-4">COLLABORATION</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="text-cyber-green mr-3 w-5 h-5" />
                  <span>Freelance Projects</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-cyber-green mr-3 w-5 h-5" />
                  <span>Open Source Contributions</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-cyber-green mr-3 w-5 h-5" />
                  <span>Mentorship & Learning</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-cyber-green mr-3 w-5 h-5" />
                  <span>Full-time Opportunities</span>
                </div>
              </div>
            </div>
            
            <div className="holographic rounded-2xl p-6">
              <h4 className="font-orbitron text-xl font-bold text-plasma-pink mb-4">RESPONSE TIME</h4>
              <div className="text-center">
                <div className="text-3xl font-bold text-plasma-pink mb-2">{'< 24hrs'}</div>
                <div className="text-gray-300 flex items-center justify-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Average response time
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
