import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'user', identifier: email, password })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setError(data.message || 'Login failed. Please check your details.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 font-sans px-6 py-20 relative overflow-hidden text-zinc-900">
      <SEO title="Login | DashPrinterShop" />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0ea5e9]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0ea5e9]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-10">
         
         
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 leading-none uppercase italic tracking-tighter mb-4">
            Welcome <br/><span className="text-[#0ea5e9]">Back.</span>
          </h1>
          <p className="text-zinc-400 font-medium text-lg">Sign in to your account to continue.</p>
        </div>

        {/* --- FORM PANEL --- */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-zinc-200/50 border border-zinc-100">
          
          <form onSubmit={handleLogin} className="space-y-8 relative z-10">
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

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#0ea5e9] transition-colors" size={18} />
                  <input 
                    required type="email" placeholder="email@example.com" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 pl-14 pr-6 bg-zinc-50 border border-zinc-200 rounded-2xl focus:bg-white focus:border-[#0ea5e9] outline-none text-[15px] font-bold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Password</label>
                  <Link to="#" className="text-[11px] font-bold text-[#0ea5e9] hover:underline italic">Forgot Password?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#0ea5e9] transition-colors" size={18} />
                  <input 
                    required type={showPassword ? "text" : "password"} placeholder="••••••••" value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              className="w-full h-16 bg-zinc-900 text-white rounded-2xl font-bold text-[14px] uppercase tracking-widest hover:bg-[#0ea5e9] transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95 shadow-xl shadow-zinc-200 group"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-zinc-50 text-center">
            <p className="text-sm font-medium text-zinc-400">
              Don't have an account?
              <Link to="/signup" className="text-[#0ea5e9] font-bold hover:text-zinc-900 ml-2 transition-colors">Sign Up</Link>
            </p>
          </div>
          

        </div>
      </div>
    </div>
  );
}
