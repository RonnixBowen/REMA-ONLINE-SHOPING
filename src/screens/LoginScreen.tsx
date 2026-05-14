import React, { useState } from 'react';
import { mockStorage } from '../lib/mockStorage';
import AlienLogo from '../components/AlienLogo';
import { Mail, Lock } from 'lucide-react';

interface LoginScreenProps {
  onRegister: () => void;
  onSuccess: () => void;
}

export default function LoginScreen({ onRegister, onSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const users = mockStorage.getUsers();
      const user = users.find(u => u.email === email);
      const savedPw = localStorage.getItem(`pw_${email}`);

      if (user && savedPw === password) {
        mockStorage.setCurrentUser(user);
        onSuccess();
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-natural-50 flex flex-col p-6 items-center">
      <div className="w-full max-w-sm flex-1 flex flex-col justify-center">
        <div className="flex flex-col items-center mb-12">
          <div className="w-20 h-20 bg-natural-primary rounded-[24px] flex items-center justify-center mb-4 shadow-xl">
            <AlienLogo size={50} color="white" />
          </div>
          <h1 className="text-3xl font-bold text-natural-700">Welcome Back</h1>
          <p className="text-natural-500 mt-1">Login to Alien Chat</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-natural-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-4 bg-white border border-natural-200 rounded-2xl focus:ring-2 focus:ring-natural-primary/20 outline-none transition-all"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-natural-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 bg-white border border-natural-200 rounded-2xl focus:ring-2 focus:ring-natural-primary/20 outline-none transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium px-1">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-natural-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-natural-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 mt-4"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center text-natural-500">
          Don't have an account?{' '}
          <button 
            onClick={onRegister}
            className="text-natural-primary font-bold hover:underline"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
