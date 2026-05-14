import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Wallet, Truck, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onComplete: () => void;
}

export default function Checkout({ isOpen, onClose, items, onComplete }: CheckoutProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-natural-50 w-full max-w-4xl h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-natural-300"
      >
        <div className="flex-1 p-12 space-y-10 overflow-y-auto">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-natural-500">Secure</span>
              <h2 className="text-3xl font-serif italic text-natural-primary">Finalize Order</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-natural-200 rounded-full text-natural-500"><X className="w-6 h-6" /></button>
          </div>

          <div className="space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-natural-500">
                <Truck className="w-4 h-4" />
                <span>Shipping Destination</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="First Name" className="p-4 bg-white border border-natural-300 rounded-2xl text-sm focus:ring-1 focus:ring-natural-primary focus:outline-none" />
                <input placeholder="Last Name" className="p-4 bg-white border border-natural-300 rounded-2xl text-sm focus:ring-1 focus:ring-natural-primary focus:outline-none" />
                <input placeholder="Email Address" className="p-4 bg-white border border-natural-300 rounded-2xl text-sm col-span-2" />
                <textarea placeholder="Shipping Address" className="p-4 bg-white border border-natural-300 rounded-2xl text-sm col-span-2 min-h-[100px]" />
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-natural-500">
                <CreditCard className="w-4 h-4" />
                <span>Payment Selection</span>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 p-5 border border-natural-primary bg-white rounded-[32px] flex items-center justify-center gap-3 shadow-md group">
                  <CreditCard className="w-5 h-5 text-natural-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest text-natural-primary">Card</span>
                </button>
                <button className="flex-1 p-5 border border-natural-300 rounded-[32px] flex items-center justify-center gap-3 hover:bg-white transition-all opacity-50 group">
                  <Wallet className="w-5 h-5 text-natural-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-natural-500">Wallet</span>
                </button>
              </div>
              <div className="space-y-4">
                <input placeholder="Card Number" className="p-4 bg-white border border-natural-300 rounded-2xl w-full text-sm" />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Expiry (MM/YY)" className="p-4 bg-white border border-natural-300 rounded-2xl text-sm" />
                  <input placeholder="Security Code" className="p-4 bg-white border border-natural-300 rounded-2xl text-sm" />
                </div>
              </div>
            </section>
          </div>

          <button
            onClick={onComplete}
            className="w-full bg-natural-primary text-white py-5 rounded-3xl text-sm font-bold uppercase tracking-widest hover:bg-[#484833] transition-all shadow-xl shadow-natural-primary/20"
          >
            Authorize Payment — ${total.toFixed(2)}
          </button>
        </div>

        <div className="w-full md:w-[320px] bg-white p-12 border-l border-natural-300 flex flex-col">
          <h3 className="font-serif italic text-xl mb-8">Summary</h3>
          <div className="flex-1 overflow-y-auto space-y-6 pr-2">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-natural-100 p-1 flex-shrink-0">
                  <img src={item.image} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-natural-700 truncate">{item.name}</p>
                  <p className="text-[10px] text-natural-500 font-bold mt-0.5">Quantity {item.quantity}</p>
                </div>
                <p className="text-sm font-serif italic text-natural-primary">${(item.price * item.quantity).toFixed(0)}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-10 border-t border-natural-300 space-y-3">
            <div className="flex justify-between text-xs font-medium text-natural-500">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs font-medium text-natural-500">
              <span>Shipping</span>
              <span className="text-natural-primary font-bold tracking-tighter">— Complimentary</span>
            </div>
            <div className="flex justify-between text-2xl font-serif italic text-natural-primary mt-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
