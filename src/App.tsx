import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import { Product, CartItem, Category } from './types';
import { PRODUCTS } from './data/products';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('shopflow_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('shopflow_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const completeOrder = () => {
    setIsCheckoutOpen(false);
    setIsOrderSuccess(true);
    setCartItems([]);
  };

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-natural-50 text-natural-700 font-sans selection:bg-natural-primary selection:text-white pb-20 md:pb-0">
      <Header
        onToggleCart={() => setIsCartOpen(!isCartOpen)}
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <main className="pt-20">
        {/* organic Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 z-0">
             <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-natural-300))_to_#F9F8F6] opacity-40"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-7xl h-[60vh] rounded-[40px] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-natural-primary/60 to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1544450547-550e64b88981?auto=format&fit=crop&q=80&w=2000" 
              className="w-full h-full object-cover"
              alt="Hero background"
            />
            
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 text-white max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs uppercase tracking-[0.3em] font-bold mb-4 opacity-90"
              >
                Sustainable Essentials
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-serif italic mb-8 leading-[1.1] tracking-tight"
              >
                Morning Rituals <br /> Collection
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <button 
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-max px-10 py-4 bg-white text-natural-primary rounded-full text-xs uppercase tracking-widest font-bold hover:shadow-2xl transition-all hover:-translate-y-1 active:scale-95"
                >
                  Shop New Arrivals
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories / Grid Header */}
        <section id="products" className="py-24 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-natural-500">The Catalog</span>
              <h2 className="text-4xl font-serif italic text-natural-primary">Curated Selections</h2>
            </div>
            
            <div className="flex items-center gap-6 text-sm uppercase tracking-widest font-bold opacity-70">
              {(['All', 'Tech', 'Fashion', 'Home'] as Category[]).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`transition-all relative py-2 ${
                    activeCategory === cat 
                      ? 'text-natural-primary' 
                      : 'text-natural-500 hover:text-natural-700'
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-natural-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Benefits Section as Order Summary style blocks */}
        <section className="py-24 bg-natural-100 border-y border-natural-300">
          <div className="max-w-7xl mx-auto px-6">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <div className="space-y-4">
                 <h3 className="text-xl font-serif italic mb-6">Our Commitment</h3>
                 <p className="text-sm text-natural-500 leading-relaxed">We source only the finest sustainable materials, ensuring every piece you welcome into your home is crafted with respect for the earth.</p>
               </div>
               <div className="col-span-2 grid grid-cols-2 gap-8">
                {[
                  { icon: Truck, title: 'Botanical Delivery', desc: 'Arriving in 1-3 business days' },
                  { icon: ShieldCheck, title: 'Verified Quality', desc: 'Secure artisanal sourcing' },
                  { icon: RefreshCw, title: 'Earth-First Policy', desc: 'Low impact return system' },
                  { icon: Sparkles, title: 'Hand-Finished', desc: 'Small batch production' },
                ].map((b, i) => (
                  <div key={i} className="p-6 rounded-[32px] bg-white border border-natural-300 flex items-start gap-4">
                    <div className="w-10 h-10 bg-natural-50 rounded-2xl flex items-center justify-center text-natural-primary">
                      <b.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider">{b.title}</h4>
                      <p className="text-[10px] text-natural-500 mt-1">{b.desc}</p>
                    </div>
                  </div>
                ))}
               </div>
             </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-natural-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-2xl font-serif italic text-natural-primary">ShopFlow</div>
          <div className="flex gap-12 text-xs uppercase tracking-[0.2em] font-bold text-natural-500">
            <a href="#" className="hover:text-natural-primary transition-colors">Botanicals</a>
            <a href="#" className="hover:text-natural-primary transition-colors">Homeware</a>
            <a href="#" className="hover:text-natural-primary transition-colors">Textiles</a>
          </div>
          <p className="text-[10px] text-natural-500 uppercase tracking-widest font-medium">© 2024 Seed & Soil Collective.</p>
        </div>
      </footer>

      <MobileNav 
        onToggleCart={() => setIsCartOpen(!isCartOpen)}
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <AnimatePresence>
        {isCheckoutOpen && (
          <Checkout
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            items={cartItems}
            onComplete={completeOrder}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOrderSuccess && (
          <OrderSuccess onClose={() => setIsOrderSuccess(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

