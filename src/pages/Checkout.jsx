import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, ArrowRight, Lock, MapPin, Mail, Box, CheckCircle2, Loader2, ShoppingCart, Zap, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Checkout() {
  const { cart, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; 
  const finalTotal = total + shipping;

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'cod'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        address: `${formData.address} (From: ${window.location.hostname})`,
        user_id: user?.id,
        total: finalTotal,
        items: cart,
        payment_details: paymentDetails
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id);
        setStep(3);
        clearCart();
      } else {
        alert('Error placing order: ' + data.message);
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      if (formData.paymentMethod === 'cod') {
        await handleOrderSuccess();
      }
    }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 font-jakarta bg-white">
        <SEO title="Empty Checkout | LucyPrinters" />
        <div className="h-24 w-24 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center mb-8">
             <ShoppingCart size={40} className="text-gray-200" />
        </div>
        <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-4">Your cart is <span className="text-blue-600">empty</span></h2>
        <p className="text-gray-500 font-medium mb-10 text-center max-w-sm">Please add some printers to your cart before checking out.</p>
        <Link to="/shop" className="h-14 px-12 bg-black text-white flex items-center gap-4 text-[12px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-xl group">
          Browse Shop <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 font-jakarta bg-white text-center">
        <SEO title="Order Confirmed | LucyPrinters" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative mb-8">
          <div className="h-24 w-24 bg-green-50 text-green-600 flex items-center justify-center shadow-xl border border-green-100 rounded-full mx-auto">
            <CheckCircle2 size={40} strokeWidth={3} />
          </div>
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter mb-4">Order <span className="text-blue-600">Confirmed</span></h1>
        <p className="text-gray-500 font-bold text-xs mb-10 uppercase tracking-widest">Your printer is being prepared for shipment.</p>
        
        <div className="bg-gray-50 p-10 border border-gray-100 mb-10 max-w-sm w-full rounded-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Order Reference</p>
          <p className="text-2xl font-black text-black uppercase tracking-tight">#{orderId || 'PROCESS'}</p>
        </div>

        <Link to="/" className="h-14 px-12 bg-black text-white text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-2xl">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16 pb-24 font-jakarta text-gray-900 overflow-x-hidden">
      <SEO title="Secure Checkout | LucyPrinters" />
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 border-b border-gray-100 pb-12">
          <div className="flex flex-col items-start space-y-6">
            <Link to="/cart" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-all group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Return to Cart
            </Link>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Secure <span className="text-blue-600">Checkout</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className={cn("px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all duration-500 border", step >= 1 ? "bg-blue-600 text-white border-blue-600" : "bg-gray-50 text-gray-300 border-gray-100")}>
               01 Logistics
            </div>
            <div className="h-px w-6 bg-gray-200" />
            <div className={cn("px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all duration-500 border", step >= 2 ? "bg-blue-600 text-white border-blue-600" : "bg-gray-50 text-gray-300 border-gray-100")}>
               02 Settlement
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-12">
                  {/* Section 1: Email */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-1 bg-blue-600 rounded-full" />
                      <h3 className="text-[12px] font-black uppercase tracking-widest text-black flex items-center gap-3">
                         <Mail size={16} className="text-blue-600" /> Contact Details
                      </h3>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address <span className="text-blue-600">*</span></label>
                       <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="e.g. john@business.com" className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-sm focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all" />
                    </div>
                  </div>

                  {/* Section 2: Address */}
                  <div className="space-y-8 pt-12 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-1 bg-blue-600 rounded-full" />
                      <h3 className="text-[12px] font-black uppercase tracking-widest text-black flex items-center gap-3">
                         <MapPin size={16} className="text-blue-600" /> Shipping Address
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">First name <span className="text-blue-600">*</span></label>
                         <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-sm focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Last name <span className="text-blue-600">*</span></label>
                         <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-sm focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Street Address <span className="text-blue-600">*</span></label>
                       <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="Full Home or Office Address" className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-sm focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City <span className="text-blue-600">*</span></label>
                         <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-sm focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Zip Code <span className="text-blue-600">*</span></label>
                         <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="Zip Code" className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-sm focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number <span className="text-blue-600">*</span></label>
                       <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="e.g. (555) 000-0000" className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-sm focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-12">
                  <div className="space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-1 bg-blue-600 rounded-full" />
                      <h3 className="text-[12px] font-black uppercase tracking-widest text-black flex items-center gap-3">
                         <CreditCard size={16} className="text-blue-600" /> Payment Method
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* COD */}
                      <div 
                        onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                        className={cn(
                          "p-8 border rounded-sm cursor-pointer transition-all duration-500 flex flex-col justify-between h-48 relative overflow-hidden",
                          formData.paymentMethod === 'cod' ? "border-blue-600 bg-blue-50/10 shadow-lg shadow-blue-600/5" : "border-gray-100 bg-white hover:border-gray-300"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className={cn("h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all", formData.paymentMethod === 'cod' ? "border-blue-600" : "border-gray-200")}>
                            {formData.paymentMethod === 'cod' && <div className="h-3 w-3 rounded-full bg-blue-600" />}
                          </div>
                          <Truck size={32} className={cn("transition-colors", formData.paymentMethod === 'cod' ? "text-blue-600" : "text-gray-200")} />
                        </div>
                        <div className="space-y-1">
                           <h4 className="text-lg font-black text-black uppercase">Pay on Delivery</h4>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pay when you get your printer</p>
                        </div>
                      </div>

                      {/* PayPal */}
                      <div 
                        onClick={() => setFormData({...formData, paymentMethod: 'paypal'})}
                        className={cn(
                          "p-8 border rounded-sm cursor-pointer transition-all duration-500 flex flex-col justify-between h-48 relative overflow-hidden",
                          formData.paymentMethod === 'paypal' ? "border-blue-600 bg-blue-50/10 shadow-lg shadow-blue-600/5" : "border-gray-100 bg-white hover:border-gray-300"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className={cn("h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all", formData.paymentMethod === 'paypal' ? "border-blue-600" : "border-gray-200")}>
                            {formData.paymentMethod === 'paypal' && <div className="h-3 w-3 rounded-full bg-blue-600" />}
                          </div>
                          <div className={cn("italic font-black text-xl tracking-tighter transition-colors", formData.paymentMethod === 'paypal' ? "text-blue-600" : "text-gray-200")}>PayPal</div>
                        </div>
                        <div className="space-y-1">
                           <h4 className="text-lg font-black text-black uppercase">Secure Online Pay</h4>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Safe and instant digital payment</p>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {formData.paymentMethod === 'paypal' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-8 pt-8">
                          <div className="p-10 bg-gray-50 border border-gray-100 rounded-sm text-center space-y-4">
                            <ShieldCheck className="mx-auto text-blue-600" size={40} />
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-black">Secure Checkout Active</p>
                            <div className="max-w-xs mx-auto">
                              <PayPalButtons 
                                style={{ layout: "vertical", shape: "rect", label: "pay" }}
                                createOrder={(data, actions) => {
                                  return actions.order.create({
                                    purchase_units: [{ amount: { value: finalTotal.toString() }, description: `LucyPrinters - Order Checkout` }],
                                  });
                                }}
                                onApprove={async (data, actions) => {
                                  try {
                                    const details = await actions.order.capture();
                                    await handleOrderSuccess(details);
                                  } catch (err) { alert("Payment failed. Please try again."); }
                                }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-12 flex flex-col items-center gap-6 border-t border-gray-100 mt-12">
              {(formData.paymentMethod === 'cod' || step === 1) && (
                <button 
                  type="submit" disabled={loading}
                  className="h-14 px-16 bg-black text-white hover:bg-blue-600 flex items-center justify-center gap-4 text-[12px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 group w-full md:w-auto rounded-sm"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : (
                    <>
                      {step === 1 ? 'Go to Payment' : 'Complete Purchase'}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              )}
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="text-[10px] font-black text-gray-400 hover:text-black uppercase tracking-widest transition-all flex items-center gap-2">
                   <ChevronLeft size={14} className="text-blue-600" /> Return to Shipping Details
                </button>
              )}
            </div>
          </div>

          {/* --- SUMMARY SIDEBAR --- */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-100 p-8 rounded-sm sticky top-[220px] space-y-10 shadow-2xl shadow-gray-100">
              <div className="space-y-6">
                 <h3 className="text-[12px] font-black uppercase tracking-widest text-black border-b-2 border-blue-600 pb-2 inline-block">Manifest</h3>
                 <div className="space-y-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 group/item">
                        <div className="h-16 w-16 bg-gray-50 flex items-center justify-center p-3 shrink-0 border border-gray-50 overflow-hidden">
                          <img src={getImagePath(item.images)} className="max-w-full max-h-full object-contain mix-blend-multiply" alt="" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <h4 className="text-[13px] font-bold text-black uppercase tracking-tight truncate mb-1">{item.name}</h4>
                          <p className="text-[11px] font-bold text-gray-400 uppercase">Qty: {item.quantity} â€¢ ${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-8">
                <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-black">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-sm">Free</span>
                </div>
                <div className="flex flex-col pt-6 border-t border-gray-100 mt-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">Final Total</span>
                  <span className="text-4xl font-black text-black leading-none">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-4 opacity-30 grayscale border-t border-gray-50 pt-6">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
