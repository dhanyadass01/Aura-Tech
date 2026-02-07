
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  Send,
  Loader2,
  Bot,
  ArrowUpRight,
  Users,
  ClipboardCheck,
  Clock,
  UserCheck,
  Sparkles,
  Zap,
  MailCheck,
  AlertCircle,
  FileSpreadsheet,
  Database,
  Terminal,
  Copy,
  ChevronDown,
  Activity,
  Shield,
  Layers,
  Heart,
  Lightbulb,
  Calendar,
  Tag,
  ExternalLink,
  MessageSquareText,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  ZapIcon,
  Instagram,
  Github,
  Linkedin,
  Info,
  BookOpen,
  CircleCheckBig,
  Timer,
  Workflow,
  Check,
  Palette,
  Brush,
  Code2,
  ChevronUp
} from 'lucide-react';
import { User, ProjectData, ProjectType, ChatMessage } from './types';
import { SERVICES, TEAM, PROJECT_TYPES, SHOWCASE_PROJECTS, PROCESS_STEPS, FAQS, getIcon } from './constants';
import { spreadsheetService } from './spreadsheetService';
import { supabaseService } from './supabase';

const AuraLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="auraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="auraGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <path 
      d="M50 15 L85 85 L65 85 L50 55 L35 85 L15 85 Z" 
      fill="url(#auraGradient)" 
      filter="url(#auraGlow)"
    />
    <ellipse 
      cx="50" cy="55" rx="40" ry="15" 
      fill="none" 
      stroke="#818cf8" 
      strokeWidth="2" 
      strokeDasharray="5,3" 
      transform="rotate(-15 50 55)"
      opacity="0.6"
    />
    <path d="M10 50 L30 50 M15 55 L25 55 M12 60 L28 60" stroke="#4f46e5" strokeWidth="1" opacity="0.8" />
  </svg>
);

const App: React.FC = () => {
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Section Dropdown States
  const [devProjectsExpanded, setDevProjectsExpanded] = useState(false);
  const [designExpertiseExpanded, setDesignExpertiseExpanded] = useState(false);
  const [devExpertiseExpanded, setDevExpertiseExpanded] = useState(false);

  // Booking Flow State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    fullName: '',
    email: '',
    phone: '',
    userType: 'Professional' as 'Student' | 'Professional',
    projectTitle: '',
    projectType: PROJECT_TYPES[0],
    description: ''
  });

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingData.userType === 'Student') {
      const email = bookingData.email.toLowerCase();
      const genericDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
      const isGeneric = genericDomains.some(domain => email.endsWith(`@${domain}`));
      if (isGeneric) {
        if (!confirm("To verify student status and apply the 50% discount, an Official College Email ID is preferred. Proceed with this personal email?")) {
          return;
        }
      }
    }

    setIsSubmitting(true);
    try {
      await spreadsheetService.saveRecord({
        clientName: bookingData.fullName,
        clientEmail: bookingData.email,
        clientPhone: bookingData.phone,
        userType: bookingData.userType,
        projectTitle: bookingData.projectTitle,
        projectType: bookingData.projectType,
        description: bookingData.description
      });

      const userData: User = {
        name: bookingData.fullName,
        email: bookingData.email,
        phone: bookingData.phone,
        userType: bookingData.userType
      };

      const projectData: ProjectData = {
        title: bookingData.projectTitle,
        type: bookingData.projectType as ProjectType,
        description: bookingData.description
      };

      await supabaseService.saveProject(userData, projectData);
      setBookingStep('success');
    } catch (error: any) {
      console.error("Booking Error:", error);
      alert("Submission failed. Please check your connection or contact auratech008@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const devProjects = SHOWCASE_PROJECTS.filter(p => p.type === 'Development');
  
  const devServices = SERVICES.filter(s => ['Globe', 'Database', 'Code', 'Layers', 'MessageSquare', 'Layout'].includes(s.icon));
  const designServices = SERVICES.filter(s => ['Zap', 'Palette', 'Sparkles', 'Video', 'BarChart', 'Smartphone'].includes(s.icon));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <AuraLogo className="w-8 h-8 drop-shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
              <span className="text-xl font-bold tracking-tighter text-white uppercase">AURA <span className="text-indigo-500">TECH</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => setShowAboutModal(true)} className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">About Us</button>
              <button onClick={() => setShowContactModal(true)} className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Contact Us</button>
            </div>
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={() => setIsMenuOpen(false)}></div>
          <div className="relative h-full w-3/4 max-sm bg-slate-900 border-r border-white/10 p-10 flex flex-col space-y-8">
            <div className="flex items-center gap-2 mb-4">
              <AuraLogo className="w-10 h-10" />
              <span className="text-xl font-bold tracking-tighter text-white uppercase">AURA <span className="text-indigo-500">TECH</span></span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 text-slate-400"><X size={24} /></button>
            <button onClick={() => { setIsMenuOpen(false); setShowAboutModal(true); }} className="text-left text-xl font-black uppercase tracking-widest text-slate-200">About Us</button>
            <button onClick={() => { setIsMenuOpen(false); setShowContactModal(true); }} className="text-left text-xl font-black uppercase tracking-widest text-slate-200">Contact Us</button>
          </div>
        </div>
      )}

      <main>
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-36 overflow-hidden hero-gradient">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="mb-6 flex justify-center">
               <div className="px-4 py-2 bg-indigo-600/10 border border-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 flex items-center gap-2">
                  <GraduationCap size={14} /> Special Discount for Students
               </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 tracking-tighter text-white leading-[1]">
              DESIGN. BUILD. <br />
              <span className="text-gradient">ACCELERATE.</span>
            </h1>
            <p className="text-sm md:text-lg text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              AURA TECH delivers high-quality, budget-friendly projects for students and business professionals. We focus on creating user-friendly solutions that go beyond expectations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => {
                   const section = document.getElementById('services');
                   section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-indigo-600/30 text-xs uppercase tracking-widest active:scale-95"
              >
                Explore Expertise <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Transformed Expertise Section with Collapsible Side-by-Side Dropdowns */}
        <section id="services" className="py-24 bg-slate-900/20 border-t border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:items-center text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter leading-none">Our Expertise</h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-2xl">High-end development and design services for modern enterprises.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Design Studio Dropdown */}
              <div className="space-y-6">
                <button 
                  onClick={() => setDesignExpertiseExpanded(!designExpertiseExpanded)}
                  className={`w-full flex items-center justify-between p-6 rounded-[2rem] border transition-all ${designExpertiseExpanded ? 'bg-purple-600/10 border-purple-500/50' : 'bg-white/5 border-white/10 hover:border-purple-500/30'}`}
                >
                  <div className="flex items-center gap-4">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${designExpertiseExpanded ? 'bg-purple-600 text-white' : 'bg-purple-500/10 text-purple-400'}`}>
                        <Palette size={24} />
                     </div>
                     <div className="text-left">
                        <h4 className="text-xl font-black text-white uppercase tracking-tight">Design Studio</h4>
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{designServices.length} CREATIVE DISCIPLINES</p>
                     </div>
                  </div>
                  {designExpertiseExpanded ? <ChevronUp className="text-purple-400" /> : <ChevronDown className="text-slate-500" />}
                </button>
                
                {designExpertiseExpanded && (
                  <div className="grid grid-cols-1 gap-4 animate-in slide-in-from-top-4 fade-in duration-300">
                    {designServices.map((service) => (
                      <div key={service.id} className="glass p-8 rounded-3xl border border-white/5 hover:border-purple-500/50 transition-all group relative overflow-hidden">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all">
                          {getIcon(service.icon)}
                        </div>
                        <h4 className="text-md font-black mb-3 text-white uppercase tracking-tight">{service.title}</h4>
                        <p className="text-slate-400 text-[11px] leading-relaxed opacity-80">{service.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Development Suite Dropdown */}
              <div className="space-y-6">
                <button 
                  onClick={() => setDevExpertiseExpanded(!devExpertiseExpanded)}
                  className={`w-full flex items-center justify-between p-6 rounded-[2rem] border transition-all ${devExpertiseExpanded ? 'bg-indigo-600/10 border-indigo-500/50' : 'bg-white/5 border-white/10 hover:border-indigo-500/30'}`}
                >
                  <div className="flex items-center gap-4">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${devExpertiseExpanded ? 'bg-indigo-600 text-white' : 'bg-indigo-500/10 text-indigo-400'}`}>
                        <Terminal size={24} />
                     </div>
                     <div className="text-left">
                        <h4 className="text-xl font-black text-white uppercase tracking-tight">Development Suite</h4>
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{devServices.length} CORE TECHNOLOGIES</p>
                     </div>
                  </div>
                  {devExpertiseExpanded ? <ChevronUp className="text-indigo-400" /> : <ChevronDown className="text-slate-500" />}
                </button>
                
                {devExpertiseExpanded && (
                  <div className="grid grid-cols-1 gap-4 animate-in slide-in-from-top-4 fade-in duration-300">
                    {devServices.map((service) => (
                      <div key={service.id} className="glass p-8 rounded-3xl border border-white/5 hover:border-indigo-500/50 transition-all group relative overflow-hidden">
                        <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          {getIcon(service.icon)}
                        </div>
                        <h4 className="text-md font-black mb-3 text-white uppercase tracking-tight">{service.title}</h4>
                        <p className="text-slate-400 text-[11px] leading-relaxed opacity-80">{service.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Collapsible Projects Section */}
        <section id="projects" className="py-24 bg-slate-950 border-t border-white/5">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                 <div className="inline-block px-4 py-1.5 bg-indigo-600/10 border border-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-6">
                    Showcase
                 </div>
                 <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter leading-none">Our Projects</h2>
                 <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-2xl mx-auto">Explore our portfolio of engineering solutions.</p>
              </div>

              <div className="max-w-3xl mx-auto items-start">
                 <div className="space-y-4">
                    <button 
                      onClick={() => setDevProjectsExpanded(!devProjectsExpanded)}
                      className={`w-full flex items-center justify-between p-6 rounded-[2rem] border transition-all ${devProjectsExpanded ? 'bg-indigo-600/10 border-indigo-500/50' : 'bg-white/5 border-white/10 hover:border-indigo-500/30'}`}
                    >
                      <div className="flex items-center gap-4">
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${devProjectsExpanded ? 'bg-indigo-600 text-white' : 'bg-indigo-500/10 text-indigo-400'}`}>
                            <Terminal size={24} />
                         </div>
                         <div className="text-left">
                            <h4 className="text-xl font-black text-white uppercase tracking-tight">Developments</h4>
                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{devProjects.length} LIVE DEPLOYS</p>
                         </div>
                      </div>
                      {devProjectsExpanded ? <ChevronUp className="text-indigo-400" /> : <ChevronDown className="text-slate-500" />}
                    </button>
                    
                    {devProjectsExpanded && (
                      <div className="grid grid-cols-1 gap-4 animate-in slide-in-from-top-4 fade-in duration-300">
                        {devProjects.map((proj, idx) => (
                          <a key={idx} href={proj.link} target="_blank" rel="noopener noreferrer" className="glass p-6 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all group relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity"><ArrowUpRight className="text-indigo-400" size={18} /></div>
                            <h4 className="text-md font-black text-white uppercase mb-2 tracking-tight group-hover:text-indigo-400 transition-colors">{proj.name}</h4>
                            <p className="text-slate-400 text-[11px] leading-relaxed mb-4">{proj.description}</p>
                            <div className="pt-4 border-t border-white/5 flex items-center text-indigo-400 text-[9px] font-black uppercase tracking-widest gap-2">Explore Deployment <ExternalLink size={10} /></div>
                          </a>
                        ))}
                      </div>
                    )}
                 </div>
              </div>
           </div>
        </section>

        <section id="advantage" className="py-24 bg-slate-950 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:items-center text-center mb-16">
              <div className="inline-block px-4 py-1.5 bg-indigo-600/10 border border-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-6">
                Why Choose Us
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter leading-none">The Aura Advantage</h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-2xl">Our commitment to excellence is reflected in every stage of our operation.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/30 transition-all group text-center relative overflow-hidden">
                <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-indigo-500 group-hover:scale-110 transition-transform">
                  <ClipboardCheck size={36} />
                </div>
                <h3 className="text-xl font-black mb-4 text-white uppercase tracking-tight">Registration Process</h3>
                <p className="text-slate-400 text-xs leading-relaxed">A streamlined, transparent booking and onboarding system.</p>
              </div>
              <div className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/30 transition-all group text-center relative overflow-hidden">
                <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-indigo-500 group-hover:scale-110 transition-transform">
                  <Timer size={36} />
                </div>
                <h3 className="text-xl font-black mb-4 text-white uppercase tracking-tight">On-Time Delivery</h3>
                <p className="text-slate-400 text-xs leading-relaxed">Our milestone tracking guarantees your project launches on time.</p>
              </div>
              <div className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/30 transition-all group text-center relative overflow-hidden">
                <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-indigo-500 group-hover:scale-110 transition-transform">
                  <Workflow size={36} />
                </div>
                <h3 className="text-xl font-black mb-4 text-white uppercase tracking-tight">Our Team Work</h3>
                <p className="text-slate-400 text-xs leading-relaxed">Cross-functional teams merge creative design with robust engineering.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-24 bg-slate-950 scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter leading-none">Common Inquiries</h2>
            </div>
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="glass rounded-3xl border border-white/5 overflow-hidden transition-all">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between group"
                  >
                    <span className="text-sm font-black text-white uppercase tracking-tight group-hover:text-indigo-400 transition-colors">{faq.question}</span>
                    <ChevronDown size={20} className={`text-slate-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-xs text-slate-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="pb-24 flex justify-center">
          <button 
             onClick={() => {
                setShowBookingModal(true);
                setBookingStep('form');
             }}
             className="px-14 py-7 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-4 group shadow-2xl shadow-indigo-600/30 text-sm uppercase tracking-[0.2em] active:scale-95"
          >
             Book Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      {/* Booking Flow Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl" onClick={() => setShowBookingModal(false)}></div>
          <div className="relative bg-slate-900 border border-white/10 w-full max-w-3xl rounded-[3rem] p-8 sm:p-12 shadow-2xl animate-in zoom-in-95 duration-300">
            <button onClick={() => setShowBookingModal(false)} className="absolute top-6 right-6 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-slate-400"><X size={24} /></button>
            {bookingStep === 'form' && (
              <div className="space-y-6 max-h-[85vh] overflow-y-auto custom-scrollbar pr-2">
                <div className="text-center mb-4">
                  <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-500">
                    <ClipboardCheck size={28} />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-1">Register Project</h3>
                  <p className="text-slate-500 text-[10px] font-medium uppercase tracking-widest">Provide your details to get started</p>
                </div>
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                      <input required type="text" value={bookingData.fullName} onChange={(e) => setBookingData({...bookingData, fullName: e.target.value})} className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Contact No</label>
                      <input required type="tel" value={bookingData.phone} onChange={(e) => setBookingData({...bookingData, phone: e.target.value})} className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 block">I am a...</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <button type="button" onClick={() => setBookingData({...bookingData, userType: 'Student'})} className={`flex items-center gap-4 p-5 rounded-2xl border transition-all text-left ${bookingData.userType === 'Student' ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.2)]' : 'bg-slate-950/30 border-white/5 hover:border-white/10'}`}>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bookingData.userType === 'Student' ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-400'}`}><GraduationCap size={20} /></div>
                          <div className="flex-1"><p className={`text-xs font-black uppercase tracking-tight ${bookingData.userType === 'Student' ? 'text-white' : 'text-slate-400'}`}>Student</p></div>
                          {bookingData.userType === 'Student' && <div className="text-indigo-400"><Check size={18} /></div>}
                       </button>
                       <button type="button" onClick={() => setBookingData({...bookingData, userType: 'Professional'})} className={`flex items-center gap-4 p-5 rounded-2xl border transition-all text-left ${bookingData.userType === 'Professional' ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.2)]' : 'bg-slate-950/30 border-white/5 hover:border-white/10'}`}>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bookingData.userType === 'Professional' ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-400'}`}><Briefcase size={20} /></div>
                          <div className="flex-1"><p className={`text-xs font-black uppercase tracking-tight ${bookingData.userType === 'Professional' ? 'text-white' : 'text-slate-400'}`}>Expert / Business</p></div>
                          {bookingData.userType === 'Professional' && <div className="text-indigo-400"><Check size={18} /></div>}
                       </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{bookingData.userType === 'Student' ? 'Official College Email ID' : 'Email Address'}</label>
                    <input required type="email" value={bookingData.email} onChange={(e) => setBookingData({...bookingData, email: e.target.value})} className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all" />
                    {bookingData.userType === 'Student' && (
                      <p className="text-[9px] text-indigo-400 font-medium uppercase tracking-widest ml-2 mt-1 italic">Enter your college Email ID for Student Verification.</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Project Title</label>
                      <input required type="text" value={bookingData.projectTitle} onChange={(e) => setBookingData({...bookingData, projectTitle: e.target.value})} className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Project Type</label>
                      <select value={bookingData.projectType} onChange={(e) => setBookingData({...bookingData, projectType: e.target.value as ProjectType})} className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none">
                        {PROJECT_TYPES.map(type => <option key={type} value={type} className="bg-slate-900">{type}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Project Description</label>
                    <textarea required rows={4} value={bookingData.description} onChange={(e) => setBookingData({...bookingData, description: e.target.value})} className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all resize-none" />
                  </div>
                  <button disabled={isSubmitting} type="submit" className="w-full mt-4 py-6 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-500 transition-all uppercase tracking-widest text-sm shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70">
                    {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : 'Submit Project Application'}
                  </button>
                </form>
              </div>
            )}
            {bookingStep === 'success' && (
              <div className="text-center py-12 space-y-8 animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-500 mb-6">
                  <CircleCheckBig size={48} className="animate-bounce" />
                </div>
                <div>
                  <h3 className="text-4xl font-black text-white uppercase tracking-tighter italic mb-3">Submitted Successfully</h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed max-sm mx-auto">Your project details have been recorded. Our team will review your application and get in touch shortly.</p>
                </div>
                <div className="pt-6">
                  <button onClick={() => setShowBookingModal(false)} className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs active:scale-95">Close Window</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* About Us Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={() => setShowAboutModal(false)}></div>
          <div className="relative bg-slate-900 border border-white/10 w-full max-w-3xl rounded-[2.5rem] p-8 sm:p-12 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <BookOpen className="text-indigo-500 w-8 h-8" />
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">About Us</h3>
              </div>
              <button onClick={() => setShowAboutModal(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-slate-400"><X size={24} /></button>
            </div>
            <div className="space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar pr-4 text-slate-300">
              <p className="text-lg font-medium leading-relaxed text-white">AURA TECH delivers high-quality, and budget-friendly solutions for both students and business professionals.</p>
              <div className="space-y-4">
                <h4 className="text-xl font-black text-indigo-400 uppercase tracking-tight flex items-center gap-2"><GraduationCap className="w-5 h-5" /> Students</h4>
                <p className="text-sm leading-relaxed">Complete project guidance from idea to final delivery.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-black text-indigo-400 uppercase tracking-tight flex items-center gap-2"><Briefcase className="w-5 h-5" /> Businesses</h4>
                <p className="text-sm leading-relaxed">Scalable, secure, and performance-driven digital solutions.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Us Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={() => setShowContactModal(false)}></div>
          <div className="relative bg-slate-900 border border-white/10 w-full max-w-xl rounded-[2.5rem] p-8 sm:p-12 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden text-center">
            <button onClick={() => setShowContactModal(false)} className="absolute top-6 right-6 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-slate-400"><X size={24} /></button>
            <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-indigo-500">
              <MessageSquareText size={40} />
            </div>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-4">Connect with Aura</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">Have a project in mind or need technical assistance? Our team is ready to help you accelerate your vision.</p>
            
            <div className="space-y-4">
              <div 
                className="block p-6 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 transition-all"
              >
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Official Email</p>
                      <p className="text-lg font-bold text-white tracking-tight">auratech008@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => copyToClipboard('auratech008@gmail.com')}
                className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-3"
              >
                {isCopied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                {isCopied ? 'Copied to Clipboard' : 'Copy Email Address'}
              </button>
            </div>
            
            <p className="mt-8 text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em]">Our response team typically replies within 24 hours.</p>
          </div>
        </div>
      )}
      
      <footer className="bg-slate-950 border-t border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <AuraLogo className="w-16 h-16" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Instagram Channel</p>
            <a href="https://www.instagram.com/__aura_tech_?igsh=enZ0aXU4aWtsaGJw" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all shadow-xl active:scale-90"><Instagram size={24} /></a>
          </div>
          <div className="text-center text-slate-600 text-[9px] tracking-[0.3em] font-black uppercase">© 2026 AURA TECH COLLECTIVE. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
