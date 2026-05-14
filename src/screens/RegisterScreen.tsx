import React, { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'motion/react';
import { ArrowLeft, User, Mail, Phone, Lock, Briefcase } from 'lucide-react';
import { UserRole } from '../types';

interface RegisterScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function RegisterScreen({ onBack, onSuccess }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: 'Employee' as UserRole
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password || !formData.phone) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      await setDoc(doc(db, 'users', user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        createdAt: serverTimestamp()
      });
      
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-natural-50 p-6 flex flex-col">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-natural-200 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-natural-700" />
        </button>
        <h1 className="text-2xl font-bold text-natural-700">Create Account</h1>
      </header>

      <div className="flex-1 max-w-md mx-auto w-full">
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-natural-500 uppercase tracking-wider ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-natural-400" />
              <input
                type="text"
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-4 bg-white border border-natural-200 rounded-2xl focus:ring-2 focus:ring-natural-primary/20 outline-none transition-all"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-natural-500 uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-natural-400" />
              <input
                type="email"
                placeholder="email@alien.com"
                className="w-full pl-12 pr-4 py-4 bg-white border border-natural-200 rounded-2xl focus:ring-2 focus:ring-natural-primary/20 outline-none transition-all"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-natural-500 uppercase tracking-wider ml-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-natural-400" />
              <input
                type="tel"
                placeholder="+1 234 567 890"
                className="w-full pl-12 pr-4 py-4 bg-white border border-natural-200 rounded-2xl focus:ring-2 focus:ring-natural-primary/20 outline-none transition-all"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-natural-500 uppercase tracking-wider ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-natural-400" />
              <input
                type="password"
                placeholder="********"
                className="w-full pl-12 pr-4 py-4 bg-white border border-natural-200 rounded-2xl focus:ring-2 focus:ring-natural-primary/20 outline-none transition-all"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-natural-500 uppercase tracking-wider ml-1">Company Role</label>
            <div className="flex gap-4">
              {(['Employee', 'Intern'] as UserRole[]).map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setFormData({ ...formData, role: r })}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all font-bold flex items-center justify-center gap-2 ${
                    formData.role === r 
                      ? 'border-natural-primary bg-natural-primary text-white' 
                      : 'border-natural-200 bg-white text-natural-500'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  {r}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm px-1 py-2 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-natural-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-natural-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 mt-6"
          >
            {loading ? 'Processing...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
