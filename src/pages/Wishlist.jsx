import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ChevronLeft, ArrowRight, ShoppingCart, Eye, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';
import { useState } from 'react';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-jakarta bg-white text-gray-900">
        <SEO title="Empty Wishlist | LucyPrinters" />
        <div className="h-24 w-24 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center mb-8">
          <Heart size={40} className="text-gray-200" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-center">Your wishlist is <span className="text-blue-600">empty</span></h2>
        <p className="text-gray-500 font-medium mb-10 text-center max-w-sm">Save your favorite printers here to easily find them later.</p>
        <Link to="/shop" className="h-14 px-12 bg-black text-white rounded-sm flex items-center gap-4 text-[12px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95 group">
          Start Shopping <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-jakarta text-gray-900 overflow-x-hidden">
      <SEO title="My Wishlist | LucyPrinters" description="Review your saved printers." />
      
      {/* --- HERO HEADER --- */}
      <section className="pt-16 pb-12 px-4 md:px-10 bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto text-center space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] block"
          >
            Personal Collection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight"
          >
            My <span className="text-blue-600">Wishlist</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Review your carefully selected printers. Ready to upgrade your office setup?
          </motion.p>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 md:px-10 py-20">
        
        {/* --- GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          <AnimatePresence mode="popLayout">
            {wishlist.map((p, idx) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: (idx % 5) * 0.05 }}
                className="group relative flex flex-col h-full bg-white transition-all duration-500 border border-gray-100 rounded-sm"
              >
                {/* Image Area with Hover Eye */}
                <div className="relative aspect-square w-full bg-[#f9fafb] flex items-center justify-center p-6 overflow-hidden transition-all duration-500 border-b border-gray-50">
                  <img 
                    src={getImagePath(p.images)} 
                    alt={p.name} 
                    className="max-h-[85%] max-w-[85%] object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Remove Button (Permanent in Wishlist) */}
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                    className="absolute top-3 right-3 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm z-20 border border-red-100 bg-white text-red-500 hover:bg-red-500 hover:text-white"
                    title="Remove from Wishlist"
                  >
                    <X size={18} />
                  </button>
                  
                  {/* Hover Overlay Eye */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <Link 
                      to={`/product/${p.slug}`}
                      className="h-12 w-12 bg-white text-black hover:bg-blue-600 hover:text-white flex items-center justify-center rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75"
                    >
                      <Eye size={22} />
                    </Link>
                  </div>
                </div>

                {/* Info Area - Left Aligned */}
                <div className="p-4 flex flex-col flex-1 text-left relative">
                  <div className="mb-auto">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">{p.brand_name || 'Premium'}</span>
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="text-[13px] font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                        {p.name}
                      </h3>
                    </Link>
                  </div>
                  <p className="text-[16px] font-black text-blue-600 mt-3">${p.price}</p>

                  {/* Sliding Hover Actions */}
                  <div className="absolute top-full left-[-1px] right-[-1px] bg-white border-x border-b border-gray-100 shadow-xl opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 transition-all duration-500 z-30 p-4 rounded-b-sm">
                    <button 
                      onClick={() => handleAddToCart(p)}
                      disabled={addedItems[p.id]}
                      className={cn(
                        "w-full h-10 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                        addedItems[p.id] ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-black"
                      )}
                    >
                      {addedItems[p.id] ? <Check size={14} /> : <ShoppingCart size={14} />}
                      {addedItems[p.id] ? "Added" : "Add To Cart"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- FOOTER ACTION --- */}
        <div className="mt-24 pt-10 border-t border-gray-100 flex justify-center">
          <Link to="/shop" className="group inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-all">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Return to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
