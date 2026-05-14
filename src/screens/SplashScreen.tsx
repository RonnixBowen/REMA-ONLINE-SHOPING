import { motion } from 'motion/react';
import { Bot } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="min-h-screen bg-natural-primary flex flex-col items-center justify-center text-white">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-white/20 rounded-[32px] flex items-center justify-center mb-6 backdrop-blur-md">
          <Bot className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Alien Chat</h1>
        <p className="text-white/60 mt-2 font-medium">Connecting Interstellar Talent</p>
      </motion.div>
      
      <div className="absolute bottom-12">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
