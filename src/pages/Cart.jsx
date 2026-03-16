import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ChevronLeft, ShieldCheck, ShoppingCart, Box, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-sans bg-white">
        <SEO title="Empty Cart | DashPrinterShop" />
        <div className="h-24 w-24 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 flex items-center justify-center mb-10 relative overflow-hidden group">
          <ShoppingCart size={40} className="text-zinc-200" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 uppercase italic tracking-tighter mb-4 text-center">Your Cart is Empty.</h2>
        <p className="text-zinc-400 text-lg font-medium mb-12 text-center max-w-sm">Looks like you haven't added any printers to your cart yet.</p>
        <Link to="/shop" className="h-16 px-12 bg-zinc-900 text-white rounded-2xl flex items-center gap-4 text-[13px] font-bold uppercase tracking-widest hover:bg-[#0ea5e9] transition-all shadow-xl group">
          Start Shopping <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 font-sans text-zinc-900 overflow-x-hidden">
      <SEO title="My Cart | DashPrinterShop" description="Review your selected printers before checkout." />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-zinc-100 pb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0ea5e9]">Your Selection</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 uppercase italic tracking-tighter leading-[0.9]">
              Review <br />
              <span className="text-[#0ea5e9]">Selection.</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
             <div className="text-right">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">Items in Cart</span>
                <span className="text-3xl font-bold text-[#0ea5e9] italic leading-none">{cartCount}</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- CART ITEMS --- */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-zinc-100 rounded-[2.5rem] flex flex-col sm:flex-row items-center overflow-hidden group hover:border-[#0ea5e9]/30 hover:shadow-2xl hover:shadow-[#0ea5e9]/5 transition-all duration-500 relative p-3"
                >
                  <div className="h-48 w-full sm:w-48 bg-zinc-50 rounded-2xl flex items-center justify-center p-8 shrink-0 transition-colors group-hover:bg-white overflow-hidden border border-zinc-50">
                    <img 
                      src={getImagePath(item.images)} 
                      alt={item.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 min-w-0 p-8 flex flex-col justify-between h-full w-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-[#0ea5e9] uppercase tracking-widest">{item.brand_name || 'Premium Brand'}</span>
                        <Link to={`/product/${item.slug}`}>
                           <h3 className="text-lg font-bold text-zinc-800 uppercase tracking-tight leading-tight line-clamp-2 group-hover:text-[#0ea5e9] transition-colors">{item.name}</h3>
                        </Link>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="h-10 w-10 bg-zinc-50 text-zinc-300 rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all active:scale-90 border border-zinc-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-zinc-50">
                      <div className="h-12 bg-zinc-50 px-2 flex items-center rounded-xl border border-zinc-100">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 rounded-lg flex items-center justify-center bg-white border border-zinc-100 text-zinc-600 hover:text-[#0ea5e9] transition-all"><Minus size={14} /></button>
                        <span className="text-sm font-bold w-10 text-center text-zinc-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 rounded-lg flex items-center justify-center bg-white border border-zinc-100 text-zinc-600 hover:text-[#0ea5e9] transition-all"><Plus size={14} /></button>
                      </div>
                      <div className="text-right">
                         <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">Price</span>
                         <span className="text-2xl font-bold text-zinc-900 italic tracking-tighter leading-none">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-widest text-[#0ea5e9] hover:text-zinc-900 transition-all pt-8 group">
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
          </div>

          {/* --- SUMMARY SIDEBAR --- */}
          <div className="lg:col-span-4">
            <div className="bg-zinc-900 rounded-[2.5rem] p-10 sticky top-32 space-y-12 relative overflow-hidden shadow-2xl shadow-zinc-200">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#0ea5e9]/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-3">
                   <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Order Summary</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">Subtotal</span>
                    <span className="text-sm font-bold text-white">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">Shipping</span>
                    <span className="text-[11px] font-black text-[#0ea5e9] uppercase tracking-widest italic border border-[#0ea5e9]/20 bg-[#0ea5e9]/5 px-3 py-1 rounded-full">Free</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-zinc-800 space-y-10 relative z-10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Total Amount</span>
                  <span className="text-5xl font-bold text-white italic tracking-tighter leading-none">${total.toLocaleString()}</span>
                </div>

                <div className="space-y-4">
                  <Link 
                    to="/checkout"
                    className="w-full h-16 bg-[#0ea5e9] text-white rounded-2xl flex items-center justify-center gap-4 text-[13px] font-bold uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-all shadow-xl active:scale-95 group"
                  >
                    Go to Checkout
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <div className="flex items-center justify-center gap-3 py-4 bg-zinc-800/50 rounded-xl border border-zinc-800 transition-colors">
                    <ShieldCheck size={18} className="text-[#0ea5e9]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Secure Payment</span>
                  </div>
                </div>
              </div>

              {/* PayPal Branding */}
              <div className="pt-4 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all relative z-10">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5 brightness-0 invert" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
