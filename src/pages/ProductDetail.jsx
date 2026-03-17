import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Heart, 
  ChevronRight, 
  Truck, 
  ShieldCheck, 
  RefreshCcw,
  Loader2,
  Plus,
  Minus,
  Share2,
  CheckCircle,
  ArrowRight,
  ShoppingCart,
  ShoppingBag,
  Zap,
  Info,
  Eye,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${API_BASE_URL}/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setProduct(data.data);
          
          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';
          const brand = data.data.brand_name;
          
          let fetchUrl = `${API_BASE_URL}/products?limit=10`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;
          else if (brand) fetchUrl += `&brand=${brand}`;

          fetch(fetchUrl)
            .then(res => res.json())
            .then(relData => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter(p => p.id !== data.data.id));
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) ? imgs.map(img => `/${img}`) : [];
    } catch (e) { return []; }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white font-jakarta">
        <Loader2 className="animate-spin h-10 w-10 text-blue-600 mb-4" />
        <p className="text-[11px] font-black uppercase text-gray-300">Loading Product Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-white font-jakarta">
        <div className="h-20 w-20 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center mb-8">
           <ShoppingCart size={32} className="text-gray-200" />
        </div>
        <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-4">Product Not Found</h2>
        <p className="text-gray-500 text-sm font-medium mb-10 max-w-sm">The printer you are looking for might be out of stock or no longer available.</p>
        <Link to="/shop" className="bg-black text-white px-10 py-4 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-xl">Return to Shop</Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage = images.length > 0 ? images[activeImage] : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="bg-white min-h-screen pt-16 pb-24 font-jakarta text-gray-900 overflow-x-hidden">
      <SEO title={`${product.name} | LucyPrinters`} description={product.description?.substring(0, 160)} />
      
      <div className="max-w-[1600px] mx-auto px-4 md:px-10">
        
        {/* --- BREADCRUMBS --- */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-12">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={10} className="text-gray-300" />
          <Link to="/shop" className="hover:text-blue-600 transition-colors">Shop</Link>
          <ChevronRight size={10} className="text-gray-300" />
          <span className="text-black truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- LEFT: GALLERY --- */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-square bg-gray-50 border border-gray-100 flex items-center justify-center p-12 overflow-hidden rounded-sm group">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={mainImage} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain mix-blend-multiply relative z-10 transition-transform duration-1000 group-hover:scale-105"
              />
              
              <div className="absolute top-6 right-6 z-20">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={cn(
                    "h-12 w-12 border rounded-full transition-all duration-500 flex items-center justify-center active:scale-90 shadow-sm",
                    isInWishlist(product.id) ? "bg-white border-red-100 text-red-500" : "bg-white border-gray-100 text-gray-300 hover:text-red-500"
                  )}
                >
                  <Heart size={22} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="absolute bottom-6 left-6 z-20">
                 <div className="bg-blue-600 text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-sm">
                    {product.brand_name || 'Premium Printer'}
                 </div>
              </div>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-4">
                {images.map((img, idx) => (
                  <button 
                    key={idx} onClick={() => setActiveImage(idx)}
                    className={cn(
                      "aspect-square border transition-all duration-500 flex items-center justify-center p-3 bg-white rounded-sm group",
                      activeImage === idx ? "border-blue-600 ring-2 ring-blue-50" : "border-gray-100 hover:border-gray-300"
                    )}
                  >
                    <img src={img} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT: INFO --- */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-1 bg-blue-600 rounded-full" />
                 <span className="text-[11px] font-black uppercase tracking-widest text-blue-600">Product Details</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-black leading-tight uppercase tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 pt-2">
                <span className="text-4xl font-black text-black">${parseFloat(product.price).toLocaleString()}</span>
                {product.sale_price && (
                  <span className="text-xl font-bold text-gray-300 line-through">${parseFloat(product.sale_price).toLocaleString()}</span>
                )}
              </div>
            </div>

            <div className="space-y-6">
               <div className="flex items-center gap-2">
                  <Info size={16} className="text-blue-600" />
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-black">Description</h4>
               </div>
               <p className="text-gray-500 text-base leading-relaxed font-medium">
                 {product.description || "A high-quality professional printer designed for reliable performance and clear output. Perfect for home offices and business environments alike."}
               </p>
            </div>

            <div className="space-y-8 pt-8 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-stretch gap-4">
                <div className="h-14 bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-between px-3 w-full sm:w-[160px]">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10 flex items-center justify-center bg-white border border-gray-100 text-black hover:bg-gray-100 transition-all rounded-sm"><Minus size={14} /></button>
                  <span className="text-lg font-black">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 flex items-center justify-center bg-white border border-gray-100 text-black hover:bg-gray-100 transition-all rounded-sm"><Plus size={14} /></button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={cn(
                    "flex-1 h-14 flex items-center justify-center gap-3 text-[12px] font-black uppercase tracking-widest transition-all duration-500 active:scale-95 shadow-xl rounded-sm",
                    isAdded ? "bg-green-600 text-white" : "bg-black text-white hover:bg-blue-600"
                  )}
                >
                  {isAdded ? <CheckCircle size={20} /> : <ShoppingBag size={20} />}
                  {isAdded ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: <Truck size={18} />, label: "Fast Shipping" },
                  { icon: <ShieldCheck size={18} />, label: "Safe Payment" },
                  { icon: <RefreshCcw size={18} />, label: "14-Day Return" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center gap-2 py-6 bg-gray-50 border border-gray-100 rounded-sm group hover:border-blue-600 transition-all">
                    <div className="text-blue-600 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED PRODUCTS --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-40">
            <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-1.5 bg-blue-600 rounded-full" />
                <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                  You Might <span className="text-blue-600">Also Like</span>
                </h2>
              </div>
              <Link to="/shop" className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors">See All</Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {relatedProducts.slice(0, 5).map((p) => (
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
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="h-12 w-12 bg-white text-black hover:bg-blue-600 hover:text-white flex items-center justify-center rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <Eye size={22} />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1 text-left relative">
                    <div className="mb-auto">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">{p.brand_name || 'Premium'}</span>
                      <h3 className="text-[13px] font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{p.name}</h3>
                    </div>
                    <p className="text-[16px] font-black text-blue-600 mt-3">${p.price}</p>
                    <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
