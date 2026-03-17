import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, MapPin, CheckCircle2, Loader2, ArrowRight, ChevronDown, Phone, MessageSquare, Clock } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'General Question', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-jakarta text-gray-900 overflow-x-hidden">
      <SEO 
        title="Contact Us | LucyPrinters" 
        description="Get in touch with LucyPrinters for help with your printer or order. Our friendly team is here to help."
      />
      
      {/* --- HERO HEADER --- */}
      <section className="pt-16 pb-12 px-4 md:px-10 bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto text-center space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] block"
          >
            Support Center
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight"
          >
            Get In <span className="text-blue-600">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Have a question about our printers or an existing order? Our technical team is ready to assist you.
          </motion.p>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="py-20 px-4 md:px-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* --- CONTACT INFO SIDEBAR --- */}
            <div className="lg:col-span-4 space-y-10">
              <div className="space-y-6">
                <h3 className="text-xl font-black text-black uppercase tracking-tight border-b-2 border-blue-600 pb-2 inline-block">Direct Contact</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-5 p-6 bg-gray-50 rounded-sm border border-gray-100 group transition-all hover:border-blue-600/20">
                    <div className="h-12 w-12 bg-white flex items-center justify-center text-blue-600 border border-gray-100 rounded-full shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Email Us</p>
                      <p className="text-[15px] font-bold text-black">info@lucyprinters.shop</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 p-6 bg-gray-50 rounded-sm border border-gray-100 group transition-all hover:border-blue-600/20">
                    <div className="h-12 w-12 bg-white flex items-center justify-center text-blue-600 border border-gray-100 rounded-full shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Location</p>
                      <p className="text-[15px] font-bold text-black leading-snug">2453 Hennepin Ave, <br/> Minneapolis, MN 55405, USA</p>
                    </div>
                  </div>

                 
                </div>
              </div>
            </div>

            {/* --- CONTACT FORM --- */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-sm shadow-2xl shadow-gray-100">
                {status === 'success' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="h-20 w-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                      <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-black uppercase mb-4">Message Sent</h2>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">We've received your request. A technical advisor will contact you within 24 hours.</p>
                    <button onClick={() => setStatus(null)} className="px-10 py-4 bg-black text-white rounded-sm font-black uppercase text-xs hover:bg-blue-600 transition-all">Send Another</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                        <input 
                          required type="text" placeholder="e.g. John Doe" value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-sm focus:bg-white focus:border-blue-600 outline-none text-[14px] font-medium transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                        <input 
                          required type="email" placeholder="e.g. john@business.com" value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-sm focus:bg-white focus:border-blue-600 outline-none text-[14px] font-medium transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
                        <input 
                          type="tel" placeholder="Optional" value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-sm focus:bg-white focus:border-blue-600 outline-none text-[14px] font-medium transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Subject</label>
                        <div className="relative">
                          <select 
                            value={formData.subject}
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                            className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-sm focus:bg-white focus:border-blue-600 outline-none text-[14px] font-medium transition-all appearance-none cursor-pointer pr-12"
                          >
                            <option>General Question</option>
                            <option>Printer Help</option>
                            <option>Order Status</option>
                            <option>Technical Support</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none" size={18} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Message Details</label>
                      <textarea 
                        required rows="5" placeholder="How can our technical team assist you?" value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full p-5 bg-gray-50 border border-gray-200 rounded-sm focus:bg-white focus:border-blue-600 outline-none text-[14px] font-medium transition-all resize-none"
                      ></textarea>
                    </div>

                    <button 
                      disabled={loading}
                      className="w-full md:w-auto h-14 px-12 bg-black text-white flex items-center justify-center gap-3 rounded-sm text-[12px] font-black uppercase tracking-widest transition-all hover:bg-blue-600 disabled:opacity-50 active:scale-95 shadow-xl"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>Send Message <ArrowRight size={18} /></>
                      )}
                    </button>
                    {status === 'error' && <p className="text-red-500 text-xs font-bold mt-4">Failed to send message. Please try again.</p>}
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
