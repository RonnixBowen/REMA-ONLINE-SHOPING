import React, { useEffect, useState, useRef } from 'react';
import { auth, db } from '../lib/firebase';
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Send, Phone, User } from 'lucide-react';
import { UserProfile, ChatMessage } from '../types';

interface ChatRoomProps {
  recipient: UserProfile;
  onBack: () => void;
}

export default function ChatRoom({ recipient, onBack }: ChatRoomProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Generate a consistent chatId for two users
  const chatId = [auth.currentUser?.uid, recipient.uid].sort().join('_');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCurrentUser({ uid: auth.currentUser.uid, ...docSnap.data() } as UserProfile);
        }
      }
    };
    fetchCurrentUser();

    const q = query(
      collection(db, `chats/${chatId}/messages`),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: ChatMessage[] = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as ChatMessage);
      });
      setMessages(msgs);
      setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 100);
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !currentUser) return;

    try {
      await addDoc(collection(db, `chats/${chatId}/messages`), {
        senderId: currentUser.uid,
        senderName: currentUser.fullName,
        text: text.trim(),
        timestamp: serverTimestamp()
      });
      setText('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-natural-50">
      <header className="bg-white p-4 shadow-sm flex items-center gap-3 border-b border-natural-200 z-10">
        <button onClick={onBack} className="p-2 hover:bg-natural-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-natural-700" />
        </button>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-2xl bg-natural-primary/10 flex items-center justify-center text-natural-primary font-bold">
            {recipient.fullName.charAt(0)}
          </div>
          <div>
            <h2 className="font-bold text-natural-700 leading-none">{recipient.fullName}</h2>
            <p className="text-[10px] text-natural-400 uppercase tracking-widest mt-1 font-bold">{recipient.role}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-natural-100 rounded-full text-natural-400">
          <Phone className="w-5 h-5" />
        </button>
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isMe = msg.senderId === auth.currentUser?.uid;
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex flex-col max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}>
                  {!isMe && (
                    <span className="text-[10px] font-bold text-natural-400 ml-2 mb-1 uppercase tracking-tighter">
                      {msg.senderName}
                    </span>
                  )}
                  <div className={`p-4 rounded-3xl shadow-sm text-sm ${
                    isMe 
                      ? 'bg-natural-primary text-white rounded-tr-none' 
                      : 'bg-white text-natural-800 rounded-tl-none border border-natural-200'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] mt-1 px-2 text-natural-400 font-medium">
                    {msg.timestamp?.toDate() ? new Date(msg.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-white border-t border-natural-200 safe-area-inset-bottom">
        <form onSubmit={handleSendMessage} className="flex gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-natural-50 px-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-natural-primary/10 transition-all text-[16px]"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="p-4 bg-natural-primary text-white rounded-2xl shadow-lg shadow-natural-primary/20 disabled:opacity-50 active:scale-95 transition-all text-sm font-bold uppercase tracking-widest"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
