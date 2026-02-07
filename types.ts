
export interface User {
  name: string;
  email: string;
  phone: string;
  userType: 'Student' | 'Professional';
}

export interface ProjectData {
  title: string;
  description: string;
  type: ProjectType;
  deliveryDate?: string;
}

export type ProjectType = 
  | 'Website'
  | 'Application'
  | 'AI Chatbot'
  | 'Logo'
  | 'Poster'
  | 'UI/UX (for website or app)'
  | 'Software'
  | 'Video Editing'
  | 'Data Visualization'
  | 'AI Video';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  name: string;
  phone: string;
  email: string;
  role: string;
  image?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
