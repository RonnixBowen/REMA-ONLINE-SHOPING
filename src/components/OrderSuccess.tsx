import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react';

interface OrderSuccessProps {
  onClose: () => void;
}

export default function OrderSuccess({ onClose }: OrderSuccessProps) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
      />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white p-12 rounded-[40px] shadow-2xl text-center max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-20 h-20 bg-green-500 rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-lg shadow-green-500/20"
        >
          <CheckCircle2 className="w-10 h-10 text-white" />
        </motion.div>

        <h2 className="text-3xl font-bold mb-4 tracking-tight text-gray-900">Order Confirmed!</h2>
        <p className="text-gray-500 leading-relaxed mb-10">
          Your order has been placed successfully. We'll send you a confirmation email with details shortly.
        </p>

        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all group active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
            <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="mt-8 text-xs font-mono uppercase tracking-[0.2em] text-gray-400">
          Order ID: #SF-{Math.random().toString(36).substr(2, 9).toUpperCase()}
        </p>
      </motion.div>
    </div>
  );
}
