import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ChevronLeft, ArrowRight, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount } = useCart();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-5 px-6 font-sans bg-white text-zinc-900">
        <SEO title="Empty Wishlist | DashPrinterShop" />
        <div className="h-24 w-24 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 flex items-center justify-center mb-10 relative overflow-hidden group">
          <Heart size={40} className="text-zinc-200" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold uppercase italic tracking-tighter mb-4 text-center">No Saved Items.</h2>
        <p className="text-zinc-400 text-lg font-medium mb-12 text-center max-w-sm">You haven't saved any printers to your wishlist yet.</p>
        <Link to="/shop" className="h-16 px-12 bg-zinc-900 text-white rounded-2xl flex items-center gap-4 text-[13px] font-bold uppercase tracking-widest hover:bg-[#0ea5e9] transition-all shadow-xl group">
          Browse Shop <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 font-sans text-zinc-900 overflow-x-hidden">
      <SEO title="My Wishlist | DashPrinterShop" description="Review your saved printers." />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-zinc-100 pb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0ea5e9]">Your Wishlist</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 uppercase italic tracking-tighter leading-[0.9]">
              Saved <br />
              <span className="text-[#0ea5e9]">Selection.</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
             <div className="text-right">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">Saved Items</span>
                <span className="text-3xl font-bold text-[#0ea5e9] italic leading-none">{wishlistCount}</span>
             </div>
          </div>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          <AnimatePresence mode="popLayout">
            {wishlist.map((p) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white border border-zinc-100 p-5 transition-all duration-500 flex flex-col group hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2 hover:border-[#0ea5e9]/20 rounded-[2.5rem] h-[450px]"
              >
                {/* Remove Button */}
                <button 
                  onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                  className="absolute top-6 right-6 z-30 h-10 w-10 bg-white border border-zinc-100 rounded-xl flex items-center justify-center transition-all hover:bg-red-50 hover:text-red-500 hover:border-red-100 active:scale-90 text-zinc-300 shadow-sm"
                >
                  <Trash2 size={18} />
                </button>

                {/* Image Panel */}
                <div className="relative aspect-square w-full flex items-center justify-center mb-6 px-4 overflow-hidden bg-zinc-50 rounded-2xl group-hover:bg-white transition-colors">
                  <img src={getImagePath(p.images)} alt={p.name} className="max-w-[70%] max-h-[70%] object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" />
                </div>

                {/* Metadata Panel */}
                <div className="space-y-4 px-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-[#0ea5e9] uppercase tracking-widest">{p.brand_name || 'Premium Brand'}</span>
                    <Link to={`/product/${p.slug}`} className="block">
                      <h3 className="font-bold text-zinc-800 text-[15px] leading-tight line-clamp-2 uppercase tracking-tight group-hover:text-[#0ea5e9] transition-colors h-[40px]">
                        {p.name}
                      </h3>
                    </Link>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-[20px] font-black text-zinc-900 italic tracking-tighter">${p.price.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Area */}
                <div className="mt-auto pt-4 relative z-30">
                  <button 
                    onClick={() => addToCart(p)}
                    className="w-full h-12 bg-zinc-900 text-white rounded-xl text-[12px] font-bold uppercase tracking-widest hover:bg-[#0ea5e9] transition-all active:scale-95 shadow-lg shadow-zinc-200"
                  >
                    Add to Cart
                  </button>
                </div>

                <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-[80%] z-0" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- FOOTER ACTION --- */}
        <div className="mt-20 pt-10 border-t border-zinc-100">
          <Link to="/shop" className="group inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-widest text-[#0ea5e9] hover:text-zinc-900 transition-all">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
