import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { 
  Search, 
  User, 
  Heart, 
  ChevronDown, 
  X,
  ChevronRight,
  Loader2,
  Menu, 
  Printer, 
  ShoppingCart,
  Mail,
  PackageCheck,
  ArrowRight,
  LayoutGrid
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
  const [selectedSearchCategory, setSelectedSearchCategory] = useState('All Categories');
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

  const printerCategoriesForSearch = [
    "Inkjet Printers",
    "Laser Printers",
    "All-in-One Printers",
    "Thermal Printers",
    "Dot Matrix Printers",
    "LED Printers",
    "Large Format Printers",
    "Photo Printers",
    "Supertank Printers",
    "Printer Accessories"
  ];

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const catParam = selectedSearchCategory !== 'All Categories' ? `&category=${selectedSearchCategory}` : '';
          const pRes = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}${catParam}&limit=8`);
          const pData = await pRes.json();
          if (pData.status === 'success') {
            setSuggestions({ products: pData.data || [], categories: [] });
          }
        } catch (err) { 
          console.error('Search Error:', err); 
        } finally { 
          setIsSearching(false); 
        }
      } else {
        setSuggestions({ products: [], categories: [] });
      }
    };
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedSearchCategory]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      const catParam = selectedSearchCategory !== 'All Categories' ? `&category=${selectedSearchCategory}` : '';
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}${catParam}`);
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
      <header className="fixed top-0 left-0 w-full z-[100] font-jakarta shadow-sm">
        {/* 1. TOP BAR (Light Grey) */}
        <div className="bg-[#f5f5f5] text-[#666] py-2 border-b border-gray-200">
          <div className="w-full px-4 flex justify-between items-center text-[11px] font-semibold tracking-wide uppercase">
            {/* Left: Info Email */}
            <div className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer">
              <Mail size={12} className="text-blue-600" />
              <span>info@lucyprinters.shop</span>
            </div>

            {/* Center: Welcome Message */}
            <div className="hidden md:block ml-40 text-gray-400">
              Welcome to Printer Store
            </div>

            {/* Right: Auth & Track */}
            <div className="flex items-center gap-6">
              <Link to="/orders" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
                <PackageCheck size={12} className="text-blue-600" />
                <span>Track Your Order</span>
              </Link>
              <Link to="/login" className="hover:text-blue-600 transition-colors">Register / Sign In</Link>
            </div>
          </div>
        </div>

        {/* 2. MAIN HEADER (White) */}
        <div className="bg-white border-b border-gray-100">
          <div className="w-full h-20 px-4 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="shrink-0 transition-transform hover:scale-105 ml-15  duration-300">
              <img src="/logo/MYPRINTERMANNN.png" alt="LucyPrinters" className="h-8 md:h-12 w-auto object-contain" />
            </Link>


            {/* Center Navigation */}
            <nav className="hidden lg:flex items-center ml-50 gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} to={link.path} 
                  className={cn(
                    "text-[13px] font-bold uppercase tracking-widest transition-all",
                    location.pathname === link.path ? "text-blue-600" : "text-black hover:text-blue-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right: User Utilities (Account, Wishlist, Cart) */}
            <div className="flex items-center mr-15 gap-8">
              {/* Account */}
              <Link to={user ? "/profile" : "/login"} className="flex items-center gap-3 group">
                <div className="h-10 w-10 bg-gray-50 flex items-center justify-center rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <User size={20} />
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-[10px] font-bold text-gray-400 uppercase ">Account</span>
                  <span className="text-[13px] font-bold group-hover:text-blue-600 transition-colors">{user ? "Profile" : "Sign In"}</span>
                </div>
              </Link>

              {/* Wishlist */}
              <Link to="/wishlist" className="flex items-center gap-3 group">
                <div className="relative h-10 w-10 bg-gray-50 flex items-center justify-center rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Heart size={20} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-white">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col items-start ">
                  <span className="text-[10px] font-bold text-gray-400 uppercase ">Saved</span>
                  <span className="text-[13px] font-bold group-hover:text-blue-600 transition-colors">Wishlist</span>
                </div>
              </Link>
              
              {/* Cart */}
              <button onClick={openCartDrawer} className="flex items-center gap-3 group">
                <div className="relative h-10 w-10 bg-gray-50 flex items-center justify-center rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-white">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-[10px] font-bold text-gray-400 uppercase ">Total</span>
                  <span className="text-[13px] font-bold group-hover:text-blue-600 transition-colors">${cartTotal}</span>
                </div>
              </button>

              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-black hover:text-blue-600">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* 3. SEARCH + CATEGORY BAR (Blue) */}
        <div className="bg-blue-500">
          <div className="w-full px-4 flex items-center h-14">
            {/* Categories Button - Conditional */}
            <div className="relative h-full shrink-0">
              {location.pathname === '/' ? (
                <button className="h-full w-[280px] bg-blue-700 text-white flex items-center justify-center gap-3 text-[12px] font-black uppercase tracking-widest hover:bg-black transition-all">
                  <Menu size={18} />
                  CATEGORIES
                </button>
              ) : (
                <Link 
                  to="/shop" 
                  className="h-full w-[280px] bg-blue-700 text-white flex items-center justify-center gap-3 text-[12px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all border-r border-blue-500/20"
                >
                  <LayoutGrid size={18} />
                  Explore Collection
                </Link>
              )}
            </div>

            {/* Large Search Bar - Centered */}
            <div className="flex-1 flex ml-60 px-4">
              <form onSubmit={handleSearch} className="w-full max-w-4xl flex h-11 bg-white rounded-sm relative shadow-inner" ref={searchRef}>
                {/* Search Category Dropdown */}
                <div className="relative group border-r border-gray-100 h-full hidden md:block shrink-0">
                  <select 
                    value={selectedSearchCategory}
                    onChange={(e) => setSelectedSearchCategory(e.target.value)}
                    className="h-full px-6 bg-white text-[11px] font-bold text-gray-500 uppercase tracking-widest outline-none cursor-pointer hover:bg-gray-100 transition-all appearance-none pr-10"
                  >
                    <option>All Categories</option>
                    {printerCategoriesForSearch.map(catName => (
                      <option key={catName} value={catName.toLowerCase().replace(/ /g, '-')}>{catName}</option>
                    ))}
                  </select>
                  <ChevronDown size={10} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                </div>

                <input 
                  type="text" 
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                  className="flex-1 px-6 text-[14px] font-medium text-black outline-none placeholder:text-gray-300"
                />

                <button type="submit" className="px-8 bg-blue-700 text-white hover:bg-blue-800 transition-all flex items-center gap-2 text-[12px] font-black uppercase tracking-widest">
                  <Search size={18} />
                </button>

                {/* Suggestions Overlay - Larger and Centered */}
                <AnimatePresence>
                  {searchQuery.trim().length > 0 && (isSearching || (suggestions.products && suggestions.products.length > 0)) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: 10 }} 
                      className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)] rounded-sm border border-gray-200 overflow-hidden z-[250]"
                    >
                      <div className="p-3">
                        {isSearching ? (
                          <div className="p-12 text-center">
                            <Loader2 size={30} className="animate-spin mx-auto text-blue-600 mb-3" />
                            <p className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Searching Premium Inventory...</p>
                          </div>
                        ) : suggestions.products && suggestions.products.length > 0 ? (
                          <div className="max-h-[550px] overflow-y-auto custom-scrollbar space-y-1">
                            {suggestions.products.map(p => {
                              const rawImg = p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : '';
                              const imageSrc = rawImg && !rawImg.startsWith('http') && !rawImg.startsWith('/') ? `/${rawImg}` : rawImg;
                              
                              return (
                                <Link 
                                  key={p.id} 
                                  to={`/product/${p.slug}`} 
                                  onClick={() => setSearchQuery('')} 
                                  className="flex items-center gap-6 p-4 hover:bg-gray-50 transition-all group rounded-sm border border-transparent hover:border-gray-100"
                                >
                                  <div className="h-20 w-20 bg-white border border-gray-100 p-2 flex items-center justify-center rounded-sm shrink-0 shadow-sm group-hover:shadow-md transition-all">
                                    <img src={imageSrc} className="max-h-full max-w-full object-contain" alt="" />
                                  </div>
                                  <div className="flex-1 min-w-0 text-left">
                                    <p className="text-[15px] font-bold text-black truncate group-hover:text-blue-600 transition-colors">{p.name}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                      <p className="text-[14px] font-black text-blue-600">${p.price}</p>
                                      {p.old_price && <p className="text-[12px] text-gray-400 line-through">${p.old_price}</p>}
                                    </div>
                                  </div>
                                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <ArrowRight size={18} />
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="p-12 text-center">
                            <Search size={40} className="mx-auto text-gray-200 mb-4" />
                            <p className="text-gray-400 font-bold text-[12px] uppercase tracking-widest">No matching products found</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic Spacer */}
      <div className="h-[188px]"></div>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 h-full w-[320px] bg-white z-[210] flex flex-col shadow-2xl">
              <div className="p-6 bg-blue-600 flex justify-between items-center text-white">
                <span className="text-xl font-bold italic uppercase tracking-tighter">Menu</span>
                <button onClick={() => setIsSidebarOpen(false)} className="h-10 w-10 flex items-center justify-center bg-white/10 rounded-md"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                <div className="space-y-4">
                  {navLinks.map(link => (
                    <Link key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg text-[12px] font-bold uppercase text-black hover:bg-blue-50 hover:text-blue-600 transition-all">
                      {link.name} <ChevronRight size={16} />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
