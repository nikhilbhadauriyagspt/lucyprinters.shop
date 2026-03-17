import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, X, CheckCircle2, Clock, MapPin, ArrowRight, Loader2, Truck, ChevronLeft, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const statusMap = [
    { key: 'pending', label: 'Order Received', icon: Clock, desc: 'We have received your order.' },
    { key: 'processing', label: 'Processing', icon: Package, desc: 'Your printer is being prepared.' },
    { key: 'shipped', label: 'Shipped', icon: Truck, desc: 'Your order is on the way.' },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin, desc: 'Your printer will arrive today.' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Successfully delivered to you.' }
  ];

  const getStatusIndex = (status) => statusMap.findIndex(s => s.key === status);

  const fetchOrders = async (email = null) => {
    setLoading(true);
    try {
      const identifier = user ? `user_id=${user.id}` : `email=${email}`;
      const response = await fetch(`${API_BASE_URL}/orders?${identifier}`);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
    else setLoading(false);
  }, []);

  const handleGuestSearch = (e) => {
    e.preventDefault();
    if (guestEmail) fetchOrders(guestEmail);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (!user && orders.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-white pt-40 pb-20 font-jakarta px-6 flex flex-col items-center justify-center text-gray-900">
        <SEO title="Track Order | LucyPrinters" />
        <div className="max-w-[450px] w-full text-center">
          <div className="h-20 w-20 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center mx-auto mb-8">
            <Package size={32} className="text-gray-300" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight mb-4">Track Your <span className="text-blue-600">Order</span></h1>
          <p className="text-gray-500 font-medium mb-10">Enter your email address below to find your order status.</p>
          
          <form onSubmit={handleGuestSearch} className="space-y-5 bg-white p-8 md:p-10 border border-gray-100 shadow-2xl shadow-gray-100 rounded-sm">
            <div className="space-y-2 text-left">
               <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
               <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                 <input 
                   type="email" required placeholder="e.g. john@business.com" value={guestEmail}
                   onChange={(e) => setGuestEmail(e.target.value)}
                   className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-sm focus:bg-white focus:border-blue-600 outline-none text-[14px] font-medium transition-all"
                 />
               </div>
            </div>
            <button className="w-full h-12 bg-black text-white rounded-sm font-black text-[12px] uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg">
              Search Order
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100">
            <Link to="/login" className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline transition-all">Sign in for full history</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-jakarta text-gray-900 overflow-x-hidden">
      <SEO title="Order History | LucyPrinters" />
      
      {/* --- HERO HEADER --- */}
      <section className="pt-16 pb-12 px-4 md:px-10 bg-gray-50 border-b border-gray-100 text-center space-y-4">
        <span className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] block">Customer Portal</span>
        <h1 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight">
          My <span className="text-blue-600">Orders</span>
        </h1>
        <p className="text-gray-500 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
          Manage your printer purchases and follow their journey from our warehouse to your doorstep.
        </p>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 md:px-10 py-20">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-48">
            <Loader2 className="animate-spin h-10 w-10 text-blue-600 mb-4" />
            <p className="text-[11px] font-black uppercase text-gray-300">Syncing History...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-sm border border-gray-100">
            <Package size={48} className="text-gray-200 mx-auto mb-6" />
            <h3 className="text-xl font-black uppercase mb-4">No orders found</h3>
            <p className="text-gray-500 text-sm mb-8">Start shopping to see your history here.</p>
            <Link to="/shop" className="bg-black text-white px-10 py-4 rounded-sm text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl inline-flex items-center gap-3">
              Browse Shop <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                key={order.id} className="bg-white border border-gray-100 rounded-sm overflow-hidden group hover:border-blue-600/20 transition-all duration-500 shadow-2xl shadow-gray-100"
              >
                {/* Meta Header */}
                <div className="p-6 md:p-8 border-b border-gray-50 flex flex-wrap items-center justify-between gap-6 bg-gray-50/50">
                  <div className="flex flex-wrap items-center gap-8 md:gap-12">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order Ref</p>
                      <h3 className="text-sm font-black text-black">#{order.order_code || order.id}</h3>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Date</p>
                      <p className="text-sm font-bold text-gray-700">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total</p>
                      <p className="text-lg font-black text-blue-600 leading-none">${parseFloat(order.total_amount).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className={cn(
                    "px-4 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border",
                    order.status === 'delivered' ? "bg-green-50 text-green-600 border-green-100" :
                    "bg-blue-50 text-blue-600 border-blue-100"
                  )}>
                    {order.status}
                  </div>
                </div>

                {/* Items & Track */}
                <div className="p-6 md:p-10 flex flex-col lg:flex-row gap-12">
                  <div className="flex-1 space-y-6">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-6 group/item">
                        <div className="h-16 w-16 bg-gray-50 rounded-sm border border-gray-50 flex items-center justify-center p-3 shrink-0 group-hover/item:bg-white transition-all overflow-hidden">
                          <img src={getImagePath(item.images)} className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover/item:scale-110" alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[13px] font-bold text-black uppercase tracking-tight truncate mb-1">{item.product_name}</h4>
                          <p className="text-[11px] font-bold text-gray-400 uppercase">Qty: {item.quantity} â€¢ ${parseFloat(item.price).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="lg:w-[300px] shrink-0 space-y-6">
                    <button onClick={() => setSelectedOrder(order)} className="w-full h-12 bg-black text-white rounded-sm flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg group">
                      Live Tracking
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* --- TRACKING MODAL --- */}
        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000]" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: '-40%', x: '-50%' }} 
                animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }} 
                exit={{ opacity: 0, scale: 0.95, y: '-40%', x: '-50%' }} 
                className="fixed top-1/2 left-1/2 w-full max-w-lg bg-white z-[1001] shadow-2xl rounded-sm p-8 md:p-12 font-jakarta border border-gray-100"
              >
                <div className="flex items-center justify-between mb-10">
                  <div className="space-y-1">
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Track Item</span>
                     <h2 className="text-2xl font-black text-black uppercase tracking-tight">Current Status</h2>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="h-10 w-10 flex items-center justify-center bg-gray-50 rounded-full text-gray-400 hover:text-black transition-all border border-gray-100 shadow-sm"><X size={20} /></button>
                </div>
                
                <div className="space-y-10 relative px-2">
                  <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gray-100" />
                  {statusMap.map((step, idx) => {
                    const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="relative flex gap-8">
                        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center z-10 transition-all duration-700 border", isCompleted ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20' : 'bg-white text-gray-200 border-gray-100')}>
                          <Icon size={14} strokeWidth={3} />
                        </div>
                        <div className="flex-1 pt-0.5">
                          <h4 className={cn("text-[13px] font-black uppercase tracking-tight", isCompleted ? 'text-black' : 'text-gray-300')}>{step.label}</h4>
                          <p className={cn("text-[11px] font-medium mt-1 leading-relaxed", isCompleted ? 'text-gray-500' : 'text-gray-200')}>{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button onClick={() => setSelectedOrder(null)} className="w-full mt-10 py-4 bg-gray-50 text-gray-400 hover:text-black font-black uppercase text-[10px] tracking-widest rounded-sm transition-all border border-gray-100">Close Tracking</button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="mt-20 pt-10 border-t border-gray-100 flex justify-center">
          <Link to="/shop" className="group inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-all">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
