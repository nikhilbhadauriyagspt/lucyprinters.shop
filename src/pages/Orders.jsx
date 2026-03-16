import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, X, CheckCircle2, Clock, MapPin, ArrowRight, Loader2, Truck, ChevronLeft, Zap, FileText, Search } from 'lucide-react';
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

  if (!user && orders.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-white pt-40 pb-20 font-sans px-6 flex flex-col items-center justify-center text-zinc-900">
        <SEO title="Track Order | DashPrinterShop" />
        <div className="max-w-md w-full text-center">
          <div className="h-24 w-24 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 flex items-center justify-center mx-auto mb-10 relative overflow-hidden group">
            <Package size={40} className="text-zinc-200 relative z-10" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 uppercase italic tracking-tighter mb-4">Track Order.</h1>
          <p className="text-zinc-400 text-lg font-medium mb-12">Enter your email address below to find your order status.</p>
          
          <form onSubmit={handleGuestSearch} className="space-y-6 bg-white p-8 md:p-10 rounded-[2.5rem] border border-zinc-100 shadow-2xl shadow-zinc-100">
            <div className="space-y-3 text-left">
               <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
               <div className="relative">
                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                 <input 
                   type="email" required placeholder="email@example.com" value={guestEmail}
                   onChange={(e) => setGuestEmail(e.target.value)}
                   className="w-full h-14 pl-14 pr-5 bg-zinc-50 border border-zinc-100 rounded-2xl focus:bg-white focus:border-[#0ea5e9] outline-none text-[15px] font-bold transition-all"
                 />
               </div>
            </div>
            <button className="w-full h-16 bg-zinc-900 text-white rounded-2xl font-bold text-[14px] uppercase tracking-widest hover:bg-[#0ea5e9] transition-all active:scale-95 shadow-xl">
              Track My Order
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-zinc-100">
            <Link to="/login" className="text-[#0ea5e9] font-bold text-sm hover:text-zinc-900 transition-all">Sign in for full order history</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 font-sans text-zinc-900 overflow-x-hidden">
      <SEO title="Order History | DashPrinterShop" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-zinc-100 pb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0ea5e9]">Your History</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 uppercase italic tracking-tighter leading-[0.9]">
              My <br />
              <span className="text-[#0ea5e9]">Orders.</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
             <div className="text-right">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">Total Orders</span>
                <span className="text-3xl font-bold text-[#0ea5e9] italic leading-none">{orders.length}</span>
             </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-48">
            <Loader2 className="animate-spin h-10 w-10 text-[#0ea5e9] mb-4" />
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-300">Searching Records...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-32 bg-zinc-50 rounded-[3rem] border border-zinc-100 p-16 group relative overflow-hidden">
            <Package size={48} className="text-zinc-200 mx-auto mb-8" />
            <h3 className="text-3xl font-bold text-zinc-900 uppercase italic tracking-tighter mb-4">No orders found.</h3>
            <p className="text-zinc-500 text-lg font-medium mb-10 max-w-sm mx-auto">You haven't placed any orders yet. Start shopping to see your history here.</p>
            <Link to="/shop" className="bg-zinc-900 text-white px-12 py-5 rounded-2xl text-[13px] font-bold uppercase tracking-widest hover:bg-[#0ea5e9] transition-all shadow-xl inline-flex items-center gap-4">
              Browse Printers <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                key={order.id} className="bg-white border border-zinc-100 rounded-[3rem] overflow-hidden group hover:border-[#0ea5e9]/30 transition-all duration-500 shadow-2xl shadow-zinc-100"
              >
                {/* Order Meta Header */}
                <div className="p-8 md:p-10 border-b border-zinc-50 flex flex-wrap items-center justify-between gap-8 bg-zinc-50">
                  <div className="flex flex-wrap items-center gap-10 md:gap-16">
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Order ID</p>
                      <h3 className="text-base font-bold text-zinc-900 uppercase tracking-tight">#{order.order_code || order.id}</h3>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Date Placed</p>
                      <p className="text-sm font-bold text-zinc-700">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-10 md:gap-16">
                    <div className={cn(
                      "px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-3 border shadow-sm",
                      order.status === 'completed' || order.status === 'delivered' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      order.status === 'pending' ? "bg-amber-50 text-amber-600 border-amber-100" :
                      "bg-blue-50 text-[#0ea5e9] border-blue-100"
                    )}>
                      <div className={cn("h-2 w-2 rounded-full", 
                        order.status === 'completed' || order.status === 'delivered' ? "bg-emerald-500 animate-pulse" :
                        order.status === 'pending' ? "bg-amber-500 animate-pulse" : "bg-[#0ea5e9] animate-pulse"
                      )} />
                      {order.status}
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Total Amount</p>
                      <p className="text-3xl font-bold text-zinc-900 tracking-tighter italic leading-none">${parseFloat(order.total_amount).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items & Shipping */}
                <div className="p-8 md:p-12 flex flex-col lg:flex-row gap-16">
                  <div className="flex-1 space-y-10">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-8 group/item">
                        <div className="h-24 w-24 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-center p-5 shrink-0 transition-all group-hover/item:border-[#0ea5e9]/30 group-hover/item:bg-white overflow-hidden">
                          <img src={item.images ? (typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]) : ''} className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover/item:scale-110" alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-bold text-zinc-900 uppercase tracking-tight truncate mb-2">{item.product_name}</h4>
                          <div className="flex items-center gap-4">
                             <p className="text-[12px] font-medium text-zinc-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                             <div className="h-1 w-1 rounded-full bg-zinc-200" />
                             <p className="text-[13px] font-bold text-zinc-900 uppercase tracking-widest">${parseFloat(item.price).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="lg:w-[400px] space-y-10 lg:border-l lg:border-zinc-100 lg:pl-16">
                    <div className="space-y-4">
                       <div className="flex items-center gap-2">
                          <MapPin size={18} className="text-[#0ea5e9]" />
                          <p className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Delivery Address</p>
                       </div>
                       <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 group-hover:bg-white transition-colors">
                          <p className="text-[15px] font-bold text-zinc-700 leading-relaxed uppercase tracking-tight">
                             {order.address}<br/>
                             {order.city}, {order.zipCode}<br/>
                          </p>
                       </div>
                    </div>
                    
                    <button onClick={() => setSelectedOrder(order)} className="w-full h-16 bg-zinc-900 text-white rounded-2xl flex items-center justify-center gap-4 text-[13px] font-bold uppercase tracking-widest hover:bg-[#0ea5e9] transition-all active:scale-95 shadow-xl group">
                      Track Status
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-[1000]" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: '-40%', x: '-50%' }} 
                animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }} 
                exit={{ opacity: 0, scale: 0.95, y: '-40%', x: '-50%' }} 
                className="fixed top-1/2 left-1/2 w-full max-w-xl bg-white z-[1001] shadow-2xl rounded-[3rem] p-10 md:p-14 font-sans border border-zinc-100"
              >
                <div className="flex items-center justify-between mb-12">
                  <div className="space-y-1">
                     <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0ea5e9]">Tracking Status</span>
                     </div>
                     <h2 className="text-3xl font-bold text-zinc-900 uppercase italic tracking-tighter">Your Package.</h2>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="h-12 w-12 flex items-center justify-center bg-zinc-50 rounded-full text-zinc-400 hover:text-zinc-900 transition-all active:scale-90 border border-zinc-100 shadow-sm"><X size={24} /></button>
                </div>
                
                <div className="space-y-12 relative px-4">
                  <div className="absolute left-[35px] top-4 bottom-4 w-[2px] bg-zinc-50" />
                  {statusMap.map((step, idx) => {
                    const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="relative flex gap-10">
                        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center z-10 transition-all duration-700 border-2", isCompleted ? 'bg-[#0ea5e9] text-white border-[#0ea5e9] shadow-lg shadow-[#0ea5e9]/20' : 'bg-white text-zinc-200 border-zinc-100')}>
                          <Icon size={18} strokeWidth={isCompleted ? 3 : 2} />
                        </div>
                        <div className="flex-1 pt-1">
                          <h4 className={cn("text-[15px] font-bold uppercase tracking-widest italic", isCompleted ? 'text-zinc-900' : 'text-zinc-300')}>{step.label}</h4>
                          <p className={cn("text-[13px] font-medium mt-1 leading-relaxed", isCompleted ? 'text-zinc-500' : 'text-zinc-300')}>{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-50">
                   <button onClick={() => setSelectedOrder(null)} className="w-full py-5 bg-zinc-50 text-zinc-900 rounded-2xl text-[12px] font-bold uppercase tracking-widest hover:bg-zinc-100 transition-all">Close Window</button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

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
