import { useEffect, useState } from 'react';
import { mockStorage } from '../lib/mockStorage';
import { ArrowLeft, User, Mail, Phone, Briefcase, LogOut, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export default function ProfileScreen({ onBack, onLogout }: ProfileScreenProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    const user = mockStorage.getCurrentUser();
    if (user) {
      setProfile(user);
      setNewPhone(user.phone || '');
    }
    setLoading(false);
  }, []);

  const handleUpdate = async () => {
    if (!profile) return;
    try {
      const users = mockStorage.getUsers();
      const updatedUsers = users.map(u => 
        u.uid === profile.uid ? { ...u, phone: newPhone } : u
      );
      localStorage.setItem('alien_chat_users', JSON.stringify(updatedUsers));
      
      const updatedProfile = { ...profile, phone: newPhone };
      setProfile(updatedProfile);
      mockStorage.setCurrentUser(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogoutClick = () => {
    mockStorage.logout();
    onLogout();
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-natural-50">
      <header className="p-6 flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-natural-100 rounded-full">
          <ArrowLeft className="w-6 h-6 text-natural-700" />
        </button>
        <h1 className="text-xl font-bold text-natural-700">My Profile</h1>
      </header>

      <main className="p-6 max-w-sm mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-[40px] bg-natural-primary text-white flex items-center justify-center text-4xl font-bold shadow-2xl mb-4">
            {profile?.fullName.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold text-natural-700">{profile?.fullName}</h2>
          <span className="px-3 py-1 bg-natural-100 text-natural-primary text-xs font-bold uppercase tracking-widest rounded-full mt-2">
            {profile?.role}
          </span>
        </div>

        <div className="bg-white rounded-[32px] p-6 shadow-xl border border-natural-200 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-natural-50 flex items-center justify-center text-natural-400">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-natural-400 font-bold uppercase tracking-widest">Email Address</p>
              <p className="text-natural-700 font-medium">{profile?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-natural-50 flex items-center justify-center text-natural-400">
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-natural-400 font-bold uppercase tracking-widest">Phone Number</p>
              {isEditing ? (
                <input 
                  autoFocus
                  className="w-full bg-natural-50 px-2 py-1 rounded-md text-natural-700 outline-none focus:ring-1 focus:ring-natural-primary"
                  value={newPhone}
                  onChange={e => setNewPhone(e.target.value)}
                />
              ) : (
                <p className="text-natural-700 font-medium">{profile?.phone}</p>
              )}
            </div>
            <button 
              onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}
              className="p-2 text-natural-primary hover:bg-natural-50 rounded-lg transition-colors"
            >
              {isEditing ? <Check className="w-5 h-5" /> : <span className="text-xs font-bold">Edit</span>}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-natural-50 flex items-center justify-center text-natural-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-natural-400 font-bold uppercase tracking-widest">Employment Status</p>
              <p className="text-natural-700 font-medium">Active {profile?.role}</p>
            </div>
          </div>

          <button 
            onClick={handleLogoutClick}
            className="w-full py-4 mt-4 flex items-center justify-center gap-2 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-colors border border-red-100"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </main>
    </div>
  );
}
