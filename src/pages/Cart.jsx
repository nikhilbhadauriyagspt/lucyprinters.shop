import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ChevronLeft, ShieldCheck, ShoppingCart, Package } from 'lucide-react';
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
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-jakarta bg-white text-gray-900">
        <SEO title="Empty Cart | LucyPrinters" />
        <div className="h-24 w-24 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center mb-8">
          <ShoppingCart size={40} className="text-gray-200" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-center">Your cart is <span className="text-blue-600">empty</span></h2>
        <p className="text-gray-500 font-medium mb-10 text-center max-w-sm">Looks like you haven't added any printers yet.</p>
        <Link to="/shop" className="h-14 px-12 bg-black text-white rounded-sm flex items-center gap-4 text-[12px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95 group">
          Start Shopping <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-jakarta text-gray-900 overflow-x-hidden pb-24">
      <SEO title="My Cart | LucyPrinters" description="Review your selected printers before checkout." />
      
      {/* --- HERO HEADER --- */}
      <section className="pt-16 pb-12 px-4 md:px-10 bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto text-center space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] block"
          >
            Review Selection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight"
          >
            Shopping <span className="text-blue-600">Cart</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Review your items and adjust quantities before proceeding to secure checkout.
          </motion.p>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 md:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* --- CART ITEMS --- */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-gray-100 rounded-sm flex flex-col sm:flex-row items-center overflow-hidden group hover:border-blue-600/20 transition-all duration-500 relative p-4"
                >
                  <div className="h-40 w-full sm:w-40 bg-gray-50 rounded-sm flex items-center justify-center p-6 shrink-0 transition-colors group-hover:bg-white overflow-hidden border border-gray-50">
                    <img 
                      src={getImagePath(item.images)} 
                      alt={item.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 min-w-0 p-6 flex flex-col justify-between h-full w-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{item.brand_name || 'Premium'}</span>
                        <Link to={`/product/${item.slug}`}>
                           <h3 className="text-lg font-bold text-black uppercase tracking-tight leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                        </Link>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                      <div className="h-10 bg-gray-50 px-1 flex items-center rounded-sm border border-gray-100">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-all"><Minus size={14} /></button>
                        <span className="text-[12px] font-bold w-10 text-center text-black">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-all"><Plus size={14} /></button>
                      </div>
                      <div className="text-right">
                         <span className="text-xl font-black text-black leading-none">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-all pt-8 group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
          </div>

          {/* --- SUMMARY SIDEBAR --- */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-100 p-10 rounded-sm sticky top-[220px] space-y-10 shadow-2xl shadow-gray-100">
              <div className="space-y-6">
                <h3 className="text-[12px] font-black uppercase tracking-widest text-black border-b-2 border-blue-600 pb-2 inline-block">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Subtotal</span>
                    <span className="text-sm font-black text-black">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Shipping</span>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-sm">Free</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 space-y-8">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Amount</span>
                  <span className="text-4xl font-black text-black leading-none">${total.toLocaleString()}</span>
                </div>

                <div className="space-y-4">
                  <Link 
                    to="/checkout"
                    className="w-full h-14 bg-black text-white rounded-sm flex items-center justify-center gap-3 text-[12px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95 group"
                  >
                    Go to Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <div className="flex items-center justify-center gap-3 py-4 bg-gray-50 rounded-sm border border-gray-100">
                    <ShieldCheck size={18} className="text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Secure Transaction</span>
                  </div>
                </div>
              </div>

              {/* Payments */}
              <div className="flex items-center justify-center gap-6 opacity-30">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
