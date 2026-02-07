
import React from 'react';
import { 
  Globe, 
  Code, 
  Cpu, 
  Smartphone, 
  Database, 
  Layout, 
  Palette, 
  Video, 
  BarChart, 
  MessageSquare, 
  Layers,
  Sparkles,
  Search,
  Zap,
  ShieldCheck,
  TrendingUp,
  CpuIcon,
  MousePointer2,
  Terminal,
  Brush,
  Framer,
  Boxes,
  Clapperboard
} from 'lucide-react';
import { Service, TeamMember, ProjectType } from './types';

export const SHOWCASE_PROJECTS = [
  // Developments
  {
    type: "Development",
    name: "AI Chatbot For College",
    description: "An intelligent virtual assistant designed to streamline college inquiries and student support.",
    link: "https://sankara-connect-950441171205.us-west1.run.app"
  },
  {
    type: "Development",
    name: "Mozhi-translation Chatbot",
    description: "A specialized translation engine focusing on linguistic accuracy and real-time conversation.",
    link: "https://mozhi-ai-translation-chatbot-950441171205.us-west1.run.app"
  },
  {
    type: "Development",
    name: "EventReg Pro",
    description: "High-performance registration engine built for large-scale datathon events, handling massive concurrent traffic.",
    link: "https://registeration-tau.vercel.app/"
  },
  // Designs
  {
    type: "Design",
    name: "AI Cinematic Reel",
    description: "Advanced AI-generated video production merging neural style transfer with professional editing.",
    link: "#"
  },
  {
    type: "Design",
    name: "Aura Brand Identity",
    description: "Full visual system including logo, typography, and color palettes for modern tech startups.",
    link: "#"
  },
  {
    type: "Design",
    name: "Fintech Dashboard UI",
    description: "A comprehensive UI/UX overhaul for a banking application focusing on accessibility and dark mode.",
    link: "#"
  },
  {
    type: "Design",
    name: "Creative Content Series",
    description: "A set of high-impact social media assets and video thumbnails designed for viral engagement.",
    link: "#"
  }
];

export const SERVICES: Service[] = [
  // Development Suite (Indices 0-5)
  { id: '2', title: 'Website Development', description: 'Robust and scalable web solutions tailored to business needs.', icon: 'Globe' },
  { id: '4', title: 'Backend Development', description: 'High-performance server-side logic and database management.', icon: 'Database' },
  { id: '7', title: 'Software Development', description: 'Custom enterprise-grade software built for efficiency.', icon: 'Code' },
  { id: '6', title: 'Flutter Projects', description: 'Multi-platform development using Google\'s powerful SDK.', icon: 'Layers' },
  { id: '12', title: 'AI Chatbot Development', description: 'Intelligent automation powered by modern LLMs.', icon: 'MessageSquare' },
  { id: '3', title: 'Frontend Development', description: 'Crafting interactive and lightning-fast user interfaces.', icon: 'Layout' },
  
  // Design Studio (Indices 6+)
  { id: '13', title: 'AI Video Editing', description: 'Transforming raw footage into cinematic masterpieces using advanced AI enhancement and neural effects.', icon: 'Zap' },
  { id: '1', title: 'Website Design', description: 'Visual storytelling through modern, responsive web layouts.', icon: 'Palette' },
  { id: '8', title: 'UI/UX Design', description: 'User-centric design focused on accessibility and delight.', icon: 'Sparkles' },
  { id: '9', title: 'Logo Design', description: 'Iconic branding that captures your company\'s unique aura.', icon: 'Palette' },
  { id: '10', title: 'Video Editing', description: 'Professional post-production for engaging visual content.', icon: 'Video' },
  { id: '11', title: 'Data Visualization', description: 'Transforming complex datasets into clear, actionable insights.', icon: 'BarChart' },
  { id: '5', title: 'App Interface Design', description: 'Modern, intuitive interfaces for mobile platforms.', icon: 'Smartphone' },
];

export const PROCESS_STEPS = [
  {
    title: 'Discovery',
    description: 'We analyze your requirements and define the technical blueprint for success.'
  },
  {
    title: 'Architecture',
    description: 'Our engineers design scalable backends and fluid frontend experiences.'
  },
  {
    title: 'Engineering',
    description: 'Clean code meets cutting-edge tech to bring your project to life.'
  },
  {
    title: 'Deployment',
    description: 'We launch with precision, ensuring performance and stability on day one.'
  }
];

export const FAQS = [
  {
    question: "What is the typical turnaround time for a project?",
    answer: "Project timelines vary by complexity. A standard business website usually takes 2-4 weeks, while complex custom software or AI integrations may range from 2 to 4 months."
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes, we provide flexible support packages ensuring your platforms stay secure, updated, and optimized as your business grows."
  },
  {
    question: "Can you help with legacy system migration?",
    answer: "Absolutely. Our engineering team specializes in modernizing legacy architectures and migrating data to high-performance cloud environments like Supabase or AWS."
  },
  {
    question: "Is AI integration right for my small business?",
    answer: "AI can benefit businesses of all sizes. From automated customer support chatbots to data-driven insights, we tailor AI solutions that provide direct ROI."
  }
];

export const TEAM: TeamMember[] = [
  { 
    name: 'Niranjan', 
    phone: '+91 9025255617', 
    email: 'niranjanindu1704@gmail.com',
    role: 'Full-Stack Developer' 
  },
  { 
    name: 'Makizh', 
    phone: '+91 9786943535', 
    email: 'makizhprema27@gmail.com',
    role: 'Full-Stack Developer' 
  },
  { 
    name: 'Hariharan', 
    phone: '+91 93452 56633', 
    email: 'hari.official.2452006@gmail.com',
    role: 'Full-Stack Developer and video editor and web designer' 
  },
  { 
    name: 'Priyanka', 
    phone: '+91 99946 85359', 
    email: 'priyankasundaramoorthi@gmail.com',
    role: 'UI/UX Designer and Video Editor' 
  },
  { 
    name: 'Dhanya', 
    phone: '+91 91509 60105', 
    email: 'dhanyadass025@gmail.com',
    role: 'Full-Stack Developer and Web designer' 
  },
  { 
    name: 'Praveen Raja', 
    phone: '+91 90928 88502', 
    email: 'praveenraja354@gmail.com',
    role: 'UI/UX Designer and video script writer' 
  },
  { 
    name: 'Vengateshwaran', 
    phone: '+91 93420 85829', 
    email: 'vengateshnavaneethaperumal@gmail.com',
    role: 'Frontend developer and designer' 
  },
];

export const PROJECT_TYPES: ProjectType[] = [
  'Website',
  'Application',
  'AI Chatbot',
  'Logo',
  'Poster',
  'UI/UX (for website or app)',
  'Software',
  'Video Editing',
  'Data Visualization',
  'AI Video'
];

export const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Palette': return <Palette className="w-5 h-5" />;
    case 'Globe': return <Globe className="w-5 h-5" />;
    case 'Layout': return <Layout className="w-5 h-5" />;
    case 'Database': return <Database className="w-5 h-5" />;
    case 'Smartphone': return <Smartphone className="w-5 h-5" />;
    case 'Layers': return <Layers className="w-5 h-5" />;
    case 'Code': return <Code className="w-5 h-5" />;
    case 'Sparkles': return <Sparkles className="w-5 h-5" />;
    case 'Video': return <Video className="w-5 h-5" />;
    case 'BarChart': return <BarChart className="w-5 h-5" />;
    case 'MessageSquare': return <MessageSquare className="w-5 h-5" />;
    case 'Zap': return <Zap className="w-5 h-5" />;
    default: return <Cpu className="w-5 h-5" />;
  }
};
