import { UserProfile, ChatMessage } from '../types';

const USERS_KEY = 'alien_chat_users';
const MESSAGES_KEY = 'alien_chat_messages';
const CURRENT_USER_KEY = 'alien_chat_current_user';

export const mockStorage = {
  getUsers: (): UserProfile[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveUser: (user: UserProfile) => {
    const users = mockStorage.getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  getCurrentUser: (): UserProfile | null => {
    const data = sessionStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  setCurrentUser: (user: UserProfile | null) => {
    if (user) {
      sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  getMessages: (chatId: string): ChatMessage[] => {
    const data = localStorage.getItem(`${MESSAGES_KEY}_${chatId}`);
    return data ? JSON.parse(data) : [];
  },

  saveMessage: (chatId: string, message: ChatMessage) => {
    const messages = mockStorage.getMessages(chatId);
    messages.push(message);
    localStorage.setItem(`${MESSAGES_KEY}_${chatId}`, JSON.stringify(messages));
    
    // Trigger a storage event for "simulated" real-time syncing across tabs
    // Note: window dispatchEvent is needed for the SAME tab to hear it too if desired,
    // though storage events normally only fire in other tabs.
    window.dispatchEvent(new Event('storage'));
  },

  logout: () => {
    sessionStorage.removeItem(CURRENT_USER_KEY);
  }
};
