import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingCart, Package, ChevronRight } from 'lucide-react';
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[450px] bg-white z-[1001] flex flex-col font-jakarta border-l border-gray-100 shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 block">Your Selection</span>
                <h2 className="text-2xl font-black text-black uppercase tracking-tight">Cart <span className="text-blue-600">Review</span></h2>
              </div>
              <button 
                onClick={closeCartDrawer}
                className="h-10 w-10 flex items-center justify-center bg-white rounded-full text-gray-400 hover:text-black border border-gray-100 transition-all shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item.id} 
                      className="group flex gap-4 p-4 bg-white border border-gray-100 rounded-sm transition-all hover:border-blue-600/20"
                    >
                      <div className="h-24 w-24 bg-gray-50 rounded-sm flex items-center justify-center flex-shrink-0 p-4 border border-gray-50 overflow-hidden relative">
                        <img 
                          src={getImagePath(item.images)} 
                          alt={item.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.brand_name || 'Premium'}</span>
                            <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                          </div>
                          <Link to={`/product/${item.slug}`} onClick={closeCartDrawer}>
                            <h3 className="text-[13px] font-bold text-black uppercase tracking-tight leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                          </Link>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="h-8 bg-gray-50 flex items-center rounded-sm border border-gray-100 overflow-hidden">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-full w-8 flex items-center justify-center text-gray-500 hover:bg-white hover:text-blue-600 transition-all border-r border-gray-100"><Minus size={12} /></button>
                            <span className="text-[12px] font-bold w-8 text-center text-black">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-full w-8 flex items-center justify-center text-gray-500 hover:bg-white hover:text-blue-600 transition-all border-l border-gray-100"><Plus size={12} /></button>
                          </div>
                          <span className="text-[15px] font-black text-blue-600">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-10 space-y-6">
                  <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                    <ShoppingCart size={32} className="text-gray-200" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-black uppercase tracking-tight">Your cart is empty</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Find your perfect printer in our shop</p>
                  </div>
                  <Link 
                    to="/shop"
                    onClick={closeCartDrawer}
                    className="w-full h-12 bg-black text-white rounded-sm flex items-center justify-center text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-gray-50 border-t border-gray-100 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Subtotal Amount</span>
                     <span className="text-3xl font-black text-black leading-none">${total.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                     <div className="flex items-center gap-2 text-blue-600 mb-1">
                        <Package size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{cartCount} Items</span>
                     </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link 
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-blue-600 text-white rounded-sm flex items-center justify-center gap-3 text-[12px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95 group"
                  >
                    Checkout <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/cart" 
                    onClick={closeCartDrawer}
                    className="w-full h-12 border border-gray-200 bg-white text-gray-500 rounded-sm hover:text-black hover:border-black flex items-center justify-center text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    View Shopping Cart
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
