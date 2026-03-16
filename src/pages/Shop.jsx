import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  Filter, 
  Heart,
  X,
  Loader2,
  Check,
  ShoppingCart,
  ChevronRight,
  ArrowRight,
  SlidersHorizontal,
  LayoutGrid,
  Zap,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});
  const { category: pathCategory, brand: pathBrand } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [total, setTotal] = useState(0);

  const category = searchParams.get('category') || pathCategory || '';
  const brand = searchParams.get('brand') || pathBrand || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          const filtered = d.data.filter(cat => 
            !cat.name.toLowerCase().includes('laptop') && 
            !cat.slug.toLowerCase().includes('laptop') &&
            !cat.name.toLowerCase().includes('chromebook')
          );
          setCategories(filtered);
        }
      });
    
    fetch(`${API_BASE_URL}/brands`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          setBrands(d.data);
        }
      });
  }, []);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
      return;
    }
    if (pathBrand) {
      navigate(`/shop?brand=${encodeURIComponent(pathBrand)}`, { replace: true });
      return;
    }

    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');
    
    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );
          setProducts(filteredProducts);
          setTotal(filteredProducts.length);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, pathCategory, pathBrand, navigate]);

  const availableBrands = brands.filter(b => {
    const brandName = b.name.toLowerCase().trim();
    const computerBrands = ['acer', 'asus', 'dell', 'lenovo'];
    if (computerBrands.includes(brandName)) return false;
    return products.some(p => 
      p.brand_id === b.id || 
      p.brand_name?.toLowerCase().trim() === brandName
    );
  });

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set('page', '1');
    navigate(`/shop?${newParams.toString()}`);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <div className="bg-white min-h-screen font-sans text-zinc-900">
      <SEO 
        title="Hardware Store | DashPrinterShop" 
        description="Browse our selection of professional printing solutions and industrial hardware."
      />
      
      {/* --- HERO HEADER --- */}
      <section className="bg-zinc-50 border-b border-zinc-100 pt-20 pb-16 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0ea5e9]">Shop Collection</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 leading-none italic tracking-tighter uppercase">
              Printers & <span className="text-[#0ea5e9]">Hardware</span>
            </h1>
            <p className="text-zinc-500 text-base md:text-xl font-medium leading-relaxed">
              Precision document solutions engineered for professional environments. Browse our verified catalog of high-performance printing terminals.
            </p>
          </div>
        </div>
      </section>

      {/* --- FILTER & SEARCH BAR --- */}
      <div className="bg-white border-b border-zinc-100 sticky top-[64px] z-40 px-6 md:px-10">
         <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 py-6">
            
            {/* Search Input */}
            <div className="w-full md:w-[400px] relative">
              <input 
                type="text" 
                placeholder="Search catalog..."
                value={search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-bold focus:outline-none focus:border-[#0ea5e9] focus:bg-white transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            </div>

            <div className="flex items-center justify-between w-full md:w-auto gap-8">
               <button 
                 onClick={() => setIsMobileFilterOpen(true)}
                 className="lg:hidden flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-900"
               >
                 <SlidersHorizontal size={18} className="text-[#0ea5e9]" /> Filters
               </button>
               
               <div className="hidden lg:flex items-center gap-6">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                     <Package size={14} className="text-[#0ea5e9]" /> Units: <span className="text-zinc-900 font-black">{products.length}</span>
                  </div>
               </div>

               <div className="flex items-center gap-4">
                  <select 
                    value={sort} 
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="h-12 px-6 bg-zinc-50 border border-zinc-200 rounded-2xl text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-[#0ea5e9] cursor-pointer transition-all"
                  >
                    <option value="newest">Latest Arrivals</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="name_asc">A - Z</option>
                  </select>
               </div>
            </div>
         </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* --- SIDEBAR: DESKTOP --- */}
            <aside className="hidden lg:block w-72 shrink-0 space-y-12">
              
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-1 bg-[#0ea5e9]" />
                  <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-900">Collections</h4>
                </div>
                <div className="flex flex-col gap-1.5">
                  <button 
                    onClick={() => updateFilter('category', '')}
                    className={cn(
                      "w-full text-left px-5 py-3.5 text-[13px] font-bold transition-all rounded-xl",
                      !category 
                        ? "bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/20" 
                        : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                    )}
                  >
                    All Categories
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => updateFilter('category', cat.slug)}
                      className={cn(
                        "w-full text-left px-5 py-3.5 text-[13px] font-bold transition-all rounded-xl",
                        category === cat.slug 
                          ? "bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/20" 
                          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-1 bg-[#0ea5e9]" />
                  <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-900">Manufacturers</h4>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {availableBrands.map(b => (
                    <button 
                      key={b.id} 
                      onClick={() => updateFilter('brand', brand === b.name ? '' : b.name)}
                      className={cn(
                        "w-full text-left px-5 py-3.5 text-[13px] font-bold transition-all rounded-xl",
                        brand === b.name 
                          ? "bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/20" 
                          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                      )}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              {(category || brand || search) && (
                <button 
                  onClick={() => navigate('/shop')}
                  className="w-full py-5 bg-zinc-900 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#0ea5e9] transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  <X size={16} /> Clear All
                </button>
              )}
            </aside>

            {/* --- PRODUCT GRID --- */}
            <div className="flex-1">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-48">
                  <Loader2 className="animate-spin h-10 w-10 text-[#0ea5e9] mb-4" />
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-300">Synchronizing Inventory...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 text-center bg-zinc-50 rounded-[3rem] border border-zinc-100 p-12">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                    <Package size={40} className="text-zinc-200" />
                  </div>
                  <h2 className="text-3xl font-bold text-zinc-900 uppercase italic tracking-tighter">No match found.</h2>
                  <p className="text-zinc-400 text-lg font-medium mt-3 mb-10 max-w-xs mx-auto">Try refining your search or filters to find what you're looking for.</p>
                  <button onClick={() => navigate('/shop')} className="bg-zinc-900 text-white px-12 py-5 rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-[#0ea5e9] transition-all shadow-xl">Reset Catalog</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {products.map((p) => (
                    <div 
                      key={p.id}
                      className="relative bg-white border border-zinc-100 p-5 transition-all duration-500 flex flex-col group hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2 hover:border-[#0ea5e9]/20 rounded-[2rem] h-[450px]"
                    >
                      {/* Favorite Button */}
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                        className={cn(
                          "absolute top-6 right-6 z-30 w-10 h-10 rounded-full bg-white border border-zinc-50 flex items-center justify-center transition-all duration-300 shadow-sm",
                          isInWishlist(p.id) ? "text-red-500 border-red-50" : "text-zinc-300 hover:text-red-500 hover:scale-110"
                        )}
                      >
                        <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                      </button>

                      {/* Image Panel */}
                      <div className="relative aspect-square w-full flex items-center justify-center mb-6 px-4 overflow-hidden bg-zinc-50 rounded-2xl group-hover:bg-white transition-colors">
                        <img 
                          src={getImagePath(p.images)} 
                          className="max-w-[70%] max-h-[70%] object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" 
                          alt={p.name} 
                        />
                      </div>

                      {/* Info Panel */}
                      <div className="space-y-4 px-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-black text-[#0ea5e9] uppercase tracking-widest">{p.brand_name || 'Premium'}</span>
                          <Link to={`/product/${p.slug}`} className="block">
                            <h3 className="font-bold text-zinc-800 text-[15px] leading-tight line-clamp-2 uppercase tracking-tight group-hover:text-[#0ea5e9] transition-colors h-[40px]">
                              {p.name}
                            </h3>
                          </Link>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-zinc-50">
                           <span className="text-[20px] font-black text-zinc-900">${p.price}</span>
                           <button 
                             onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                             disabled={addedItems[p.id]}
                             className={cn(
                               "h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-500 active:scale-90 shadow-sm border",
                               addedItems[p.id] 
                                 ? "bg-emerald-500 border-emerald-500 text-white" 
                                 : "bg-white border-zinc-100 text-[#0ea5e9] hover:bg-zinc-900 hover:text-white hover:border-zinc-900"
                             )}
                           >
                             {addedItems[p.id] ? <Check size={20} /> : <ShoppingCart size={20} />}
                           </button>
                        </div>
                      </div>

                      <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-[80%] z-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- MOBILE FILTER DRAWER --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[100] bg-zinc-900/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-[320px] bg-white z-[110] lg:hidden flex flex-col p-10"
            >
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-2xl font-bold text-zinc-900 uppercase italic tracking-tighter">Refine catalog.</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="h-10 w-10 flex items-center justify-center bg-zinc-50 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-12 custom-scrollbar pr-2">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Collections</h4>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => { updateFilter('category', ''); setIsMobileFilterOpen(false); }}
                      className={cn("w-full text-left px-5 py-4 text-[13px] font-bold transition-all rounded-xl", !category ? "bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/20" : "text-zinc-500 bg-zinc-50")}
                    >
                      All Systems
                    </button>
                    {categories.map(cat => (
                      <button 
                        key={cat.id} 
                        onClick={() => { updateFilter('category', cat.slug); setIsMobileFilterOpen(false); }}
                        className={cn("w-full text-left px-5 py-4 text-[13px] font-bold transition-all rounded-xl", category === cat.slug ? "bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/20" : "text-zinc-500 bg-zinc-50")}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Manufacturers</h4>
                  <div className="flex flex-col gap-2">
                    {availableBrands.map(b => (
                      <button 
                        key={b.id} 
                        onClick={() => { updateFilter('brand', b.name); setIsMobileFilterOpen(false); }}
                        className={cn("w-full text-left px-5 py-4 text-[13px] font-bold transition-all rounded-xl", brand === b.name ? "bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/20" : "text-zinc-500 bg-zinc-50")}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => { navigate('/shop'); setIsMobileFilterOpen(false); }}
                className="w-full py-5 bg-zinc-900 text-white text-[11px] font-black uppercase tracking-widest mt-10 rounded-2xl shadow-xl hover:bg-[#0ea5e9] transition-all"
              >
                Clear Selection
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
