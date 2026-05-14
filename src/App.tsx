import { useState, useEffect } from 'react';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { AnimatePresence, motion } from 'motion/react';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import ChatRoom from './screens/ChatRoom';
import ProfileScreen from './screens/ProfileScreen';
import { AppScreen, UserProfile } from './types';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('splash');
  const [user, setUser] = useState<any>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<UserProfile | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (isInitialLoading) {
        // Show splash for at least 2 seconds
        setTimeout(() => {
          setIsInitialLoading(false);
          setScreen(u ? 'dashboard' : 'login');
        }, 2000);
      } else {
        setScreen(u ? 'dashboard' : 'login');
      }
    });
    return () => unsubscribe();
  }, [isInitialLoading]);

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return (
          <LoginScreen 
            onRegister={() => setScreen('register')} 
            onSuccess={() => setScreen('dashboard')} 
          />
        );
      case 'register':
        return (
          <RegisterScreen 
            onBack={() => setScreen('login')} 
            onSuccess={() => setScreen('dashboard')} 
          />
        );
      case 'dashboard':
        return (
          <DashboardScreen 
            onSelectUser={(recipient) => {
              setSelectedRecipient(recipient);
              setScreen('chat');
            }} 
            onViewProfile={() => setScreen('profile')}
          />
        );
      case 'chat':
        return selectedRecipient ? (
          <ChatRoom 
            recipient={selectedRecipient} 
            onBack={() => setScreen('dashboard')} 
          />
        ) : null;
      case 'profile':
        return <ProfileScreen onBack={() => setScreen('dashboard')} />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="max-w-[500px] mx-auto min-h-screen bg-natural-50 shadow-2xl relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


