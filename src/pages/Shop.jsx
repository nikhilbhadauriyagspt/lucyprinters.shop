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
  Package,
  Eye
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
    <div className="bg-white min-h-screen font-jakarta text-gray-900">
      <SEO 
        title="Hardware Store | LucyPrinters" 
        description="Browse our selection of professional printing solutions and industrial hardware."
      />
      
      {/* --- HERO HEADER --- */}
      <section className="bg-gray-50 border-b border-gray-100 pt-16 pb-12 px-4 md:px-10">
        <div className="max-w-[1600px] mx-auto text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight">
            Printers & <span className="text-blue-600">Hardware</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            High-performance solutions for business and home printing needs. Reliable technology for clear results.
          </p>
        </div>
      </section>

      {/* --- TOOLBAR --- */}
      <div className="bg-white border-b border-gray-100 sticky top-[188px] z-40 px-4 md:px-10">
         <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 py-4">
            <div className="w-full md:w-[350px] relative">
              <input 
                type="text" 
                placeholder="Search catalog..."
                value={search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-blue-600 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>

            <div className="flex items-center justify-between w-full md:w-auto gap-6">
               <button 
                 onClick={() => setIsMobileFilterOpen(true)}
                 className="lg:hidden flex items-center gap-2 text-[11px] font-black uppercase text-black"
               >
                 <SlidersHorizontal size={16} className="text-blue-600" /> Filters
               </button>
               
               <div className="hidden lg:flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase">
                  Units: <span className="text-black font-black">{products.length}</span>
               </div>

               <select 
                 value={sort} 
                 onChange={(e) => updateFilter('sort', e.target.value)}
                 className="h-10 px-4 bg-gray-50 border border-gray-200 rounded-sm text-[11px] font-black uppercase focus:outline-none cursor-pointer"
               >
                 <option value="newest">Latest Arrivals</option>
                 <option value="price_low">Price: Low to High</option>
                 <option value="price_high">Price: High to Low</option>
                 <option value="name_asc">A - Z</option>
               </select>
            </div>
         </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <section className="py-12 px-4 md:px-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* SIDEBAR */}
            <aside className="hidden lg:block w-64 shrink-0 space-y-10">
              <div className="space-y-6">
                <h4 className="text-[12px] font-black uppercase text-black border-b-2 border-blue-600 pb-2 inline-block">Collections</h4>
                <div className="flex flex-col gap-1">
                  <button 
                    onClick={() => updateFilter('category', '')}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-[13px] font-bold transition-all rounded-sm",
                      !category ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"
                    )}
                  >
                    All Categories
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => updateFilter('category', cat.slug)}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-[13px] font-bold transition-all rounded-sm",
                        category === cat.slug ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[12px] font-black uppercase text-black border-b-2 border-blue-600 pb-2 inline-block">Manufacturers</h4>
                <div className="flex flex-col gap-1">
                  {availableBrands.map(b => (
                    <button 
                      key={b.id} 
                      onClick={() => updateFilter('brand', brand === b.name ? '' : b.name)}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-[13px] font-bold transition-all rounded-sm",
                        brand === b.name ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"
                      )}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* PRODUCT GRID */}
            <div className="flex-1">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-32">
                  <Loader2 className="animate-spin h-8 w-8 text-blue-600 mb-4" />
                  <p className="text-[11px] font-black uppercase text-gray-300">Synchronizing...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-sm">
                  <Package size={40} className="mx-auto text-gray-200 mb-4" />
                  <h2 className="text-xl font-black uppercase">No results found</h2>
                  <button onClick={() => navigate('/shop')} className="mt-6 bg-black text-white px-8 py-3 rounded-sm text-xs font-black uppercase hover:bg-blue-600 transition-all">Clear Filters</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((p) => (
                    <div 
                      key={p.id}
                      className="group relative flex flex-col h-full bg-white transition-all duration-500 border border-gray-100 rounded-sm"
                    >
                      <div className="relative aspect-square w-full bg-[#f9fafb] flex items-center justify-center p-6 overflow-hidden transition-all duration-500 border-b border-gray-50">
                        <img 
                          src={getImagePath(p.images)} 
                          className="max-h-[85%] max-w-[85%] object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" 
                          alt={p.name} 
                        />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
                          <Link 
                            to={`/product/${p.slug}`}
                            className="h-12 w-12 bg-white text-black hover:bg-blue-600 hover:text-white flex items-center justify-center rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75"
                          >
                            <Eye size={22} />
                          </Link>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-1 text-left relative">
                        <div className="mb-auto">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">{p.brand_name || 'Premium'}</span>
                          <Link to={`/product/${p.slug}`}>
                            <h3 className="text-[14px] font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                              {p.name}
                            </h3>
                          </Link>
                        </div>
                        <p className="text-[16px] font-black text-blue-600 mt-3">${p.price}</p>

                        <div className="absolute top-full left-[-1px] right-[-1px] bg-white border-x border-b border-gray-100 shadow-xl opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 transition-all duration-500 z-30 p-4 space-y-2 rounded-b-sm">
                          <button 
                            onClick={() => handleAddToCart(p)}
                            disabled={addedItems[p.id]}
                            className={cn(
                              "w-full h-10 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                              addedItems[p.id] ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-black"
                            )}
                          >
                            {addedItems[p.id] ? <Check size={14} /> : <ShoppingCart size={14} />}
                            {addedItems[p.id] ? "Added" : "Add To Cart"}
                          </button>
                          <button 
                            onClick={() => toggleWishlist(p)}
                            className={cn(
                              "w-full h-10 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all border flex items-center justify-center gap-2",
                              isInWishlist(p.id) ? "bg-red-50 text-red-500 border-red-100" : "bg-gray-50 text-gray-400"
                            )}
                          >
                            <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} /> Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="fixed top-0 left-0 h-full w-[300px] bg-white z-[110] lg:hidden flex flex-col p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black uppercase">Filters</h3>
                <button onClick={() => setIsMobileFilterOpen(false)}><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-gray-400">Collections</h4>
                  {categories.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => { updateFilter('category', cat.slug); setIsMobileFilterOpen(false); }}
                      className={cn("w-full text-left px-4 py-3 text-sm font-bold rounded-sm", category === cat.slug ? "bg-blue-600 text-white" : "bg-gray-50")}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
