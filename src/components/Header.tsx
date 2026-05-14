import { motion } from 'motion/react';
import { ShoppingCart, LayoutGrid, Search, User, Menu, X } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  onToggleCart: () => void;
  cartCount: number;
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export default function Header({ onToggleCart, cartCount, activeCategory, onSelectCategory }: HeaderProps) {
  const categories: Category[] = ['All', 'Tech', 'Fashion', 'Home', 'Lifestyle'];

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white/50 backdrop-blur-md border-b border-natural-300 z-40 transition-all">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          <a href="/" className="text-2xl font-serif italic text-natural-primary tracking-tight">
            ShopFlow
          </a>

          <nav className="hidden lg:flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-natural-primary text-white' 
                    : 'text-natural-500 hover:bg-natural-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 hidden md:flex max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-natural-500" />
            <input
              type="text"
              placeholder="Search our collection..."
              className="w-full pl-10 pr-4 py-2 bg-natural-200/50 border-none rounded-full text-xs focus:bg-white focus:ring-1 focus:ring-natural-300 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-natural-200 rounded-full transition-colors order-2 sm:order-1">
            <User className="w-5 h-5 text-natural-500" />
          </button>
          <button
            onClick={onToggleCart}
            className="group relative p-3 bg-natural-primary text-white rounded-full hover:bg-[#484833] transition-all shadow-md active:scale-95 hidden md:flex order-1 sm:order-2"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-natural-700 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
