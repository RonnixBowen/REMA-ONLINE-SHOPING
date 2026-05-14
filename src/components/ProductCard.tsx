import React from 'react';
import { motion } from 'motion/react';
import { Plus, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="group bg-white p-5 rounded-[32px] border border-natural-300 hover:shadow-xl hover:shadow-natural-500/5 transition-all flex flex-col"
    >
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-natural-100 mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm text-natural-primary">
            {product.category}
          </span>
        </div>
        
        <div className="absolute inset-0 bg-natural-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => onAddToCart(product)}
            className="bg-white text-natural-primary px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform active:scale-95 shadow-lg"
          >
            Add to Bag
          </button>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-natural-700">
          {product.name}
        </h3>
        <p className="text-[10px] text-natural-500 uppercase tracking-wider">
          {product.category === 'Tech' ? 'Digital Essential' : 'Organic Lifestyle'}
        </p>
        <div className="pt-2 flex justify-between items-center">
          <span className="font-serif italic text-lg text-natural-primary">${product.price}.00</span>
          <button
            onClick={() => onAddToCart(product)}
            className="p-2 bg-natural-50 rounded-full border border-natural-300 text-natural-500 hover:bg-natural-primary hover:text-white transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
