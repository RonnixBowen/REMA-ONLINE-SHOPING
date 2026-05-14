import { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { collection, query, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Search, User, MessageSquare, LogOut, Briefcase } from 'lucide-react';
import { UserProfile } from '../types';

interface DashboardScreenProps {
  onSelectUser: (user: UserProfile) => void;
  onViewProfile: () => void;
}

export default function DashboardScreen({ onSelectUser, onViewProfile }: DashboardScreenProps) {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

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

    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersList: UserProfile[] = [];
      snapshot.forEach((doc) => {
        if (doc.id !== auth.currentUser?.uid) {
          usersList.push({ uid: doc.id, ...doc.data() } as UserProfile);
        }
      });
      setUsers(usersList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredUsers = users.filter(u => 
    u.fullName.toLowerCase().includes(search.toLowerCase()) || 
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-natural-50 flex flex-col">
      <header className="bg-natural-primary text-white p-6 pb-12 rounded-b-[40px] shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Alien Dashboard</h1>
          <div className="flex items-center gap-3">
            <button 
              onClick={onViewProfile}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <User className="w-6 h-6" />
            </button>
            <button 
              onClick={() => auth.signOut()}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            placeholder="Search employees or interns..."
            className="w-full pl-12 pr-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl focus:outline-none focus:bg-white/20 text-white placeholder:text-white/50 transition-all font-medium"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </header>

      <main className="flex-1 px-6 -mt-6">
        <div className="bg-white rounded-[32px] p-6 shadow-xl border border-natural-200 min-h-[400px]">
          <h2 className="text-sm font-bold text-natural-400 uppercase tracking-[0.2em] mb-4">Available Contacts</h2>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-natural-200 border-t-natural-primary rounded-full animate-spin"></div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-natural-200 mx-auto mb-4" />
              <p className="text-natural-400 font-medium">No contacts found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map(user => (
                <motion.button
                  key={user.uid}
                  whileHover={{ x: 4 }}
                  onClick={() => onSelectUser(user)}
                  className="w-full flex items-center gap-4 p-4 rounded-3xl hover:bg-natural-50 border border-transparent hover:border-natural-200 transition-all text-left group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-natural-100 flex items-center justify-center text-natural-primary font-bold text-xl group-hover:bg-natural-200 transition-colors">
                    {user.fullName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-natural-700">{user.fullName}</h3>
                    <div className="flex items-center gap-2 mt-0.5 text-xs font-medium text-natural-400 uppercase tracking-tight">
                      <Briefcase className="w-3 h-3" />
                      {user.role}
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-natural-50 text-natural-300 group-hover:text-natural-primary group-hover:bg-natural-100 transition-all">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
