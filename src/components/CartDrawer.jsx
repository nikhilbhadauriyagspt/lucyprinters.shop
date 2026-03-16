import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingCart, Box, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/100x100?text=Product";
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-[1000]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[480px] bg-white z-[1001] flex flex-col font-sans border-l border-zinc-100 shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0ea5e9]">My Shopping Cart</span>
                </div>
                <h2 className="text-2xl font-bold text-zinc-900 uppercase italic tracking-tighter">Your <span className="text-[#0ea5e9]">Items.</span></h2>
              </div>
              <button 
                onClick={closeCartDrawer}
                className="h-12 w-12 flex items-center justify-center bg-white rounded-full text-zinc-400 hover:text-zinc-900 shadow-sm border border-zinc-100 transition-all active:scale-90"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={item.id} 
                      className="group flex gap-5 p-5 bg-white border border-zinc-100 rounded-3xl hover:border-[#0ea5e9]/30 hover:shadow-xl hover:shadow-[#0ea5e9]/5 transition-all duration-500"
                    >
                      <div className="h-24 w-24 bg-zinc-50 rounded-2xl flex items-center justify-center flex-shrink-0 p-4 border border-zinc-50 group-hover:bg-white transition-colors overflow-hidden">
                        <img 
                          src={getImagePath(item.images)} 
                          alt={item.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-black text-[#0ea5e9] uppercase tracking-widest">{item.brand_name || 'Premium Brand'}</span>
                            <button onClick={() => removeFromCart(item.id)} className="text-zinc-300 hover:text-red-500 transition-colors p-1"><Trash2 size={16} /></button>
                          </div>
                          <Link to={`/product/${item.slug}`} onClick={closeCartDrawer}>
                            <h3 className="text-[14px] font-bold text-zinc-800 uppercase tracking-tight leading-tight line-clamp-2 group-hover:text-[#0ea5e9] transition-colors">{item.name}</h3>
                          </Link>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="h-10 bg-zinc-50 flex items-center rounded-xl border border-zinc-100 overflow-hidden">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-10 w-10 flex items-center justify-center text-zinc-500 hover:bg-white hover:text-[#0ea5e9] transition-all"><Minus size={14} /></button>
                            <span className="text-[13px] font-bold w-8 text-center text-zinc-900">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-10 w-10 flex items-center justify-center text-zinc-500 hover:bg-white hover:text-[#0ea5e9] transition-all"><Plus size={14} /></button>
                          </div>
                          <span className="text-lg font-bold text-zinc-900 italic tracking-tighter">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-10 space-y-8">
                  <div className="h-24 w-24 bg-zinc-50 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group border border-zinc-100">
                    <ShoppingCart size={32} className="text-zinc-200" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-zinc-900 uppercase italic tracking-tighter">Cart is Empty.</h3>
                    <p className="text-sm font-medium text-zinc-400 max-w-[200px] mx-auto">Looks like you haven't added any printers yet.</p>
                  </div>
                  <Link 
                    to="/shop"
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-zinc-900 text-white rounded-2xl flex items-center justify-center text-[13px] font-bold uppercase tracking-widest hover:bg-[#0ea5e9] transition-all shadow-xl"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-zinc-50 border-t border-zinc-100 space-y-6">
                <div className="flex items-end justify-between px-2">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">Total Amount</span>
                     <span className="text-4xl font-bold text-zinc-900 italic tracking-tighter leading-none">${total.toLocaleString()}</span>
                  </div>
                  <div className="text-right flex flex-col items-end">
                     <div className="flex items-center gap-2 mb-1">
                        <Package size={14} className="text-[#0ea5e9]" />
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Items</span>
                     </div>
                     <span className="text-2xl font-bold text-[#0ea5e9] leading-none italic">{cartCount}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link 
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-16 bg-zinc-900 text-white rounded-2xl flex items-center justify-center gap-4 text-[13px] font-bold uppercase tracking-widest hover:bg-[#0ea5e9] transition-all shadow-2xl shadow-[#0ea5e9]/10 group"
                  >
                    Go to Checkout
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/cart" 
                    onClick={closeCartDrawer}
                    className="w-full h-12 border border-zinc-200 bg-white text-zinc-500 rounded-xl hover:text-zinc-900 hover:border-zinc-400 flex items-center justify-center text-[11px] font-bold uppercase tracking-widest transition-all italic"
                  >
                    View Full Cart
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
