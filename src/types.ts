export type UserRole = 'Employee' | 'Intern';

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: any;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: any;
}

export type AppScreen = 'splash' | 'login' | 'register' | 'dashboard' | 'chat' | 'profile';
