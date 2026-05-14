import { useState } from 'react';
import { motion } from 'motion/react';
import { Home, Search, ShoppingCart, User, Grid } from 'lucide-react';
import { Category } from '../types';

interface MobileNavProps {
  onToggleCart: () => void;
  cartCount: number;
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export default function MobileNav({ onToggleCart, cartCount, activeCategory, onSelectCategory }: MobileNavProps) {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', icon: Home, label: 'Home', action: () => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { id: 'shop', icon: Grid, label: 'Shop', action: () => { setActiveTab('shop'); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); } },
    { id: 'cart', icon: ShoppingCart, label: 'Cart', action: () => { setActiveTab('cart'); onToggleCart(); }, badge: cartCount },
    { id: 'account', icon: User, label: 'Account', action: () => { setActiveTab('account'); } },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-t border-natural-200 md:hidden z-50 px-6 safe-area-inset-bottom">
      <div className="flex items-center justify-between h-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={tab.action}
              className="flex flex-col items-center justify-center gap-1 relative min-w-[64px] transition-all"
            >
              <div className={`p-1.5 rounded-2xl transition-all ${
                isActive 
                  ? 'text-natural-primary bg-natural-100' 
                  : 'text-natural-400'
              }`}>
                <tab.icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-tighter ${
                isActive ? 'text-natural-primary' : 'text-natural-400'
              }`}>
                {tab.label}
              </span>
              
              {tab.badge !== undefined && tab.badge > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-3 w-4 h-4 bg-natural-primary text-white text-[8px] font-bold flex items-center justify-center rounded-full ring-2 ring-white"
                >
                  {tab.badge}
                </motion.span>
              )}
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 w-1 h-1 bg-natural-primary rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
