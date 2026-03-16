import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Heart, 
  ChevronDown, 
  X,
  LogOut,
  ChevronRight,
  Loader2,
  LayoutGrid,
  Menu, 
  Printer, 
  ShieldCheck, 
  ArrowRight,
  ShoppingCart,
  Zap,
  PackageCheck,
  Phone,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, cart, openCartDrawer } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const categoryMenuRef = useRef(null);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

  // Suggestions Logic
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const pRes = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=8`);
          const pData = await pRes.json();
          if (pData.status === 'success') {
            setSuggestions({ products: pData.data || [], categories: [] });
          } else {
            setSuggestions({ products: [], categories: [] });
          }
        } catch (err) { 
          console.error('Search Error:', err); 
          setSuggestions({ products: [], categories: [] });
        } finally { 
          setIsSearching(false); 
        }
      } else {
        setSuggestions({ products: [], categories: [] });
        setIsSearching(false);
      }
    };
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') {
          setCategories(data.data.filter(cat => !cat.name.toLowerCase().includes('laptop')));
        }
      });
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUser(parsedUser && parsedUser.role !== 'admin' ? parsedUser : null);
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] font-sans">
        {/* --- SINGLE MODERN CRYSTAL LIGHT HEADER --- */}
        <div className="bg-white/80 backdrop-blur-2xl border-b border-zinc-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
          <div className="max-w-[1920px] mx-auto h-20 md:h-24 px-4 md:px-10 flex items-center justify-between gap-6 md:gap-10">
            
            {/* 1. Logo Section */}
            <div className="flex items-center gap-8 shrink-0">
              <Link to="/" className="transition-transform hover:scale-105 duration-300">
                <img src="/logo/MYPRINTERMANNN.png" alt="DashPrinterShop" className="h-8 md:h-12 w-auto object-contain " />
              </Link>
              
              {/* Desktop Main Nav */}
              <nav className="hidden xl:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} to={link.path} 
                    className={cn(
                      "px-4 py-2 text-[13px] font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-full transition-all",
                      location.pathname === link.path && "text-[#0ea5e9] bg-[#0ea5e9]/5"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* 2. Search Section (Integrated Departments & Search) */}
            <div className="hidden lg:flex flex-1 max-w-3xl items-center gap-0 group" ref={searchRef}>
              {/* Departments Dropdown Integrated */}
              <div className="relative h-[48px]" onMouseEnter={() => setActiveDropdown('categories')} onMouseLeave={() => setActiveDropdown(null)}>
                <button 
                  className={cn(
                    "h-full px-6 flex items-center gap-2 bg-zinc-100/50 hover:bg-zinc-100 text-zinc-600 text-[12px] font-bold uppercase tracking-wider rounded-l-2xl border-y border-l border-zinc-200 transition-all whitespace-nowrap",
                    activeDropdown === 'categories' && "bg-white text-[#0ea5e9] border-[#0ea5e9]/20"
                  )}
                >
                  <LayoutGrid size={16} />
                  Departments
                  <ChevronDown size={14} className={cn("transition-transform duration-300", activeDropdown === 'categories' && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'categories' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="absolute top-[calc(100%+12px)] left-0 w-[850px] bg-white text-zinc-900 shadow-[0_30px_100px_rgba(0,0,0,0.1)] rounded-3xl border border-zinc-100 p-10 grid grid-cols-3 gap-10 z-[120]"
                    >
                      {categories.slice(0, 6).map(cat => (
                        <div key={cat.id} className="space-y-5">
                          <Link 
                            to={`/shop?category=${cat.slug}`} 
                            onClick={() => setActiveDropdown(null)} 
                            className="text-[14px] font-black uppercase text-[#0ea5e9] hover:text-zinc-900 transition-colors block border-b border-zinc-50 pb-3"
                          >
                            {cat.name}
                          </Link>
                          <div className="flex flex-col gap-3">
                            {cat.children?.map(sub => (
                              <Link 
                                key={sub.id} 
                                to={`/shop?category=${sub.slug}`} 
                                onClick={() => setActiveDropdown(null)} 
                                className="text-[14px] font-medium text-zinc-400 hover:text-[#0ea5e9] flex items-center gap-2 transition-colors"
                              >
                                <ChevronRight size={10} /> {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <form 
                onSubmit={handleSearch} 
                className="flex-1 flex h-[48px] bg-zinc-100/50 hover:bg-zinc-100 focus-within:bg-white rounded-r-2xl relative border border-zinc-200 focus-within:border-[#0ea5e9]/30 transition-all shadow-inner"
              >
                <input 
                  type="text" 
                  placeholder="Search for printers and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                  className="flex-1 px-6 text-[14px] font-medium text-zinc-900 bg-transparent focus:outline-none placeholder:text-zinc-400"
                />

                <button type="submit" className="pr-5 flex items-center text-zinc-300 hover:text-[#0ea5e9] transition-colors">
                  <Search size={18} />
                </button>

                {/* Suggestions Overlay */}
                <AnimatePresence>
                  {searchQuery.trim().length > 0 && (isSearching || (suggestions.products && suggestions.products.length >= 0)) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: 10 }} 
                      className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.1)] rounded-3xl border border-zinc-100 overflow-hidden z-[200]"
                    >
                      <div className="p-4">
                        {isSearching ? (
                          <div className="p-14 text-center">
                            <Loader2 size={24} className="animate-spin mx-auto text-[#0ea5e9] mb-3" />
                            <p className="text-[11px] font-bold uppercase text-zinc-400 tracking-[0.2em]">Searching Inventory</p>
                          </div>
                        ) : suggestions.products && suggestions.products.length > 0 ? (
                          <div className="max-h-[500px] overflow-y-auto custom-scrollbar space-y-2">
                            {suggestions.products.map(p => {
                              const firstImage = p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : '';
                              const imageSrc = firstImage && !firstImage.startsWith('/') && !firstImage.startsWith('http') ? `/${firstImage}` : firstImage;
                              return (
                                <Link 
                                  key={p.id} 
                                  to={`/product/${p.slug}`} 
                                  onClick={() => setSearchQuery('')} 
                                  className="flex items-center gap-5 p-4 hover:bg-zinc-50 group rounded-2xl transition-all"
                                >
                                  <div className="h-16 w-16 bg-white p-2 flex items-center justify-center border border-zinc-100 group-hover:bg-white rounded-xl transition-all">
                                    <img src={imageSrc} className="max-h-full max-w-full object-contain" alt="" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[14px] font-bold text-zinc-900 truncate group-hover:text-[#0ea5e9] transition-colors">{p.name}</p>
                                    <p className="text-[13px] font-black text-[#0ea5e9]">${p.price}</p>
                                  </div>
                                  <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-[#0ea5e9] group-hover:text-white transition-all">
                                    <ArrowRight size={16} />
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="p-14 text-center text-zinc-300">
                            <Search size={40} className="mx-auto mb-4 opacity-20" />
                            <p className="text-[13px] font-bold uppercase tracking-widest text-zinc-400">No results found</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* 3. Actions Section */}
            <div className="flex items-center gap-2 md:gap-4">
              
              {/* User Account */}
              <Link 
                to={user ? "/profile" : "/login"} 
                className="hidden md:flex h-12 w-12 items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-2xl transition-all border border-zinc-100"
                title="Account"
              >
                <User size={20} />
              </Link>

              {/* Wishlist */}
              <Link 
                to="/wishlist" 
                className="hidden md:flex h-12 w-12 items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-2xl transition-all relative border border-zinc-100"
                title="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && <span className="absolute top-3 right-3 h-2 w-2 bg-[#0ea5e9] rounded-full shadow-[0_0_10px_#0ea5e9]" />}
              </Link>

              {/* Cart Button (Accent) */}
              <button 
                onClick={openCartDrawer}
                className="flex items-center gap-3 bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-5 md:px-7 h-12 rounded-2xl transition-all group shadow-[0_2px_5px_rgba(14,165,233,0.2)]"
              >
                <div className="relative">
                  <ShoppingCart size={20} strokeWidth={2.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-3 -right-4 bg-zinc-900 text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[15px] font-black tracking-tight hidden sm:block">${cartTotal}</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="lg:hidden h-12 w-12 flex items-center justify-center text-zinc-500 bg-zinc-100 rounded-2xl hover:bg-zinc-200 transition-all border border-zinc-200"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic Spacer */}
      <div className="h-16 md:h-20"></div>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 h-full w-[320px] bg-white z-[210] flex flex-col shadow-2xl border-r-4 border-[#003b95]">
              <div className="p-6 bg-[#003b95] flex justify-between items-center text-white">
                <span className="text-xl font-black italic">MENU</span>
                <button onClick={() => setIsSidebarOpen(false)} className="h-10 w-10 flex items-center justify-center bg-white/10 rounded-md"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Navigation</p>
                  {navLinks.map(link => (
                    <Link key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg text-[12px] font-black uppercase text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all border border-gray-100">
                      {link.name} <ChevronRight size={16} />
                    </Link>
                  ))}
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">User Tools</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/profile" onClick={() => setIsSidebarOpen(false)} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-100"><User size={20} className="mb-2 text-blue-600" /><span className="text-[10px] font-black uppercase">Account</span></Link>
                    <Link to="/wishlist" onClick={() => setIsSidebarOpen(false)} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-100"><Heart size={20} className="mb-2 text-red-500" /><span className="text-[10px] font-black uppercase">Wishlist</span></Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
