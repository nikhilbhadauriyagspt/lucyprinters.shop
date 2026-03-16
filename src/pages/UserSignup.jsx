import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function UserSignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 font-sans px-6 py-10 relative overflow-hidden text-zinc-900">
      <SEO title="Create Account | DashPrinterShop" />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0ea5e9]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0ea5e9]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0ea5e9]">Join Us Today</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 leading-none uppercase italic tracking-tighter mb-4">
            Create <br/><span className="text-[#0ea5e9]">Account.</span>
          </h1>
          <p className="text-zinc-400 font-medium text-lg">Enter your details to get started.</p>
        </div>

        {/* --- FORM PANEL --- */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-zinc-200/50 border border-zinc-100">
          
          <form onSubmit={handleSignup} className="space-y-6 relative z-10">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100 text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#0ea5e9] transition-colors" size={18} />
                  <input 
                    required type="text" placeholder="John Doe" value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full h-14 pl-14 pr-6 bg-zinc-50 border border-zinc-200 rounded-2xl focus:bg-white focus:border-[#0ea5e9] outline-none text-[15px] font-bold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#0ea5e9] transition-colors" size={18} />
                  <input 
                    required type="email" placeholder="email@example.com" value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full h-14 pl-14 pr-6 bg-zinc-50 border border-zinc-200 rounded-2xl focus:bg-white focus:border-[#0ea5e9] outline-none text-[15px] font-bold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest ml-1">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#0ea5e9] transition-colors" size={18} />
                  <input 
                    required type="tel" placeholder="(000) 000-0000" value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full h-14 pl-14 pr-6 bg-zinc-50 border border-zinc-200 rounded-2xl focus:bg-white focus:border-[#0ea5e9] outline-none text-[15px] font-bold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#0ea5e9] transition-colors" size={18} />
                  <input 
                    required type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full h-14 pl-14 pr-14 bg-zinc-50 border border-zinc-200 rounded-2xl focus:bg-white focus:border-[#0ea5e9] outline-none text-[15px] font-bold transition-all"
                  />
                  <button 
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-900 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full h-16 bg-zinc-900 text-white rounded-2xl font-bold text-[14px] uppercase tracking-widest hover:bg-[#0ea5e9] transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95 shadow-xl shadow-zinc-200 group mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-zinc-50 text-center">
            <p className="text-sm font-medium text-zinc-400">
              Already have an account?
              <Link to="/login" className="text-[#0ea5e9] font-bold hover:text-zinc-900 ml-2 transition-colors">Log In</Link>
            </p>
          </div>
          

        </div>
      </div>
    </div>
  );
}
