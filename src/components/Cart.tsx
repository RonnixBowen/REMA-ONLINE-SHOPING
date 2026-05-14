import { motion } from 'motion/react';
import { ShoppingCart, Plus, Minus, X, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div
          id="cart-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
        />
      )}

      {/* Cart Drawer */}
      <motion.div
        id="cart-drawer"
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-natural-50 shadow-2xl z-[60] flex flex-col border-l border-natural-300"
      >
        <div className="p-8 border-b border-natural-300 flex items-center justify-between bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-serif italic text-natural-primary">My Bag</h2>
            <span className="bg-natural-primary text-white text-[10px] px-2 py-1 rounded-full font-bold">
              {items.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-natural-200 rounded-full transition-colors text-natural-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-natural-500 space-y-4">
              <div className="w-20 h-20 bg-natural-200 rounded-full flex items-center justify-center opacity-40">
                <ShoppingCart className="w-10 h-10" />
              </div>
              <p className="font-serif italic text-lg">Your bag is empty</p>
              <button
                onClick={onClose}
                className="text-[10px] font-bold uppercase tracking-[0.2em] underline underline-offset-8"
              >
                Discover Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-3xl bg-white border border-natural-300 flex gap-4"
              >
                <div className="w-20 h-24 rounded-2xl overflow-hidden bg-natural-100 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-semibold text-natural-700 truncate">{item.name}</h3>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-natural-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-natural-500 mt-0.5">Organic Essential</p>
                  
                  <div className="mt-auto flex justify-between items-end">
                    <span className="font-serif italic text-natural-primary">${item.price}.00</span>
                    <div className="flex items-center bg-natural-50 border border-natural-300 rounded-full px-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 text-natural-500 hover:text-natural-700 disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-[10px] font-bold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 text-natural-500 hover:text-natural-700"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 bg-white border-t border-natural-300 space-y-6">
            <div className="flex justify-between items-end text-natural-700">
              <span className="text-sm text-natural-500 font-medium">Subtotal</span>
              <span className="text-2xl font-serif italic">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-natural-primary text-white py-5 rounded-3xl text-sm font-bold uppercase tracking-widest hover:bg-[#484833] transition-all shadow-xl shadow-natural-primary/20 active:scale-[0.98]"
            >
              Checkout Now
            </button>
            <p className="text-center text-[10px] text-natural-500 italic">Free priority shipping included</p>
          </div>
        )}
      </motion.div>
    </>
  );
}
