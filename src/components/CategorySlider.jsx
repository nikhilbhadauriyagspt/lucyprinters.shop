import { motion } from "framer-motion";
import { Heart, Check, ArrowRight, Eye, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function CategorySlider({ title, subtitle, products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (products.length === 0) return null;

  return (
    <section className="bg-white py-16 w-full overflow-hidden font-jakarta border-t border-gray-100">
      <div className="w-full">
        
        {/* --- BADGE-STYLE SECTION HEADER (Matches Homepage Theme) --- */}
        <div className="flex items-center justify-between mb-12">
          <div className="relative flex items-center h-14">
            <div className="bg-blue-600 h-full w-[470px] absolute left-0 rounded-r-full" />
            <div className="relative z-10 pl-4 md:pl-10">
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
                Professional <span className="text-yellow-400 font-black">Printers</span>
              </h2>
            </div>
          </div>
          
          <Link 
            to="/shop" 
            className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors pr-4 md:pr-10"
          >
            Full Collection <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- LANDSCAPE PRODUCT GRID --- */}
        <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 12).map((p, idx) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1 }}
              className="group relative flex flex-row items-center h-[180px] bg-white border border-gray-100 rounded-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-blue-600/20"
            >
              {/* Image Area (Left) */}
              <div className="w-1/3 h-full bg-[#f9fafb] flex items-center justify-center p-4 overflow-hidden relative border-r border-gray-50">
                <img 
                  src={getImagePath(p.images)} 
                  alt={p.name} 
                  className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Wishlist Button */}
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                  className={cn(
                    "absolute top-2 left-2 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm z-20 border border-gray-100",
                    isInWishlist(p.id) ? "bg-white text-red-500" : "bg-white text-gray-300 hover:text-red-500"
                  )}
                >
                  <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Info Area (Right) */}
              <div className="w-2/3 p-5 flex flex-col justify-between h-full">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                    {p.brand_name || 'Professional'}
                  </span>
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[14px] font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {p.name}
                    </h3>
                  </Link>
                </div>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                  <p className="text-lg font-black text-blue-600">${p.price}</p>
                  
                  <div className="flex items-center gap-2">
                    <Link 
                      to={`/product/${p.slug}`}
                      className="h-9 w-9 bg-gray-50 text-gray-400 hover:bg-black hover:text-white flex items-center justify-center rounded-sm transition-all"
                    >
                      <Eye size={18} />
                    </Link>
                    <button 
                      onClick={() => handleAddToCart(p)}
                      disabled={addedItems[p.id]}
                      className={cn(
                        "h-9 w-9 flex items-center justify-center transition-all rounded-sm shadow-sm",
                        addedItems[p.id] 
                          ? "bg-green-600 text-white" 
                          : "bg-blue-600 text-white hover:bg-black active:scale-95"
                      )}
                    >
                      {addedItems[p.id] ? <Check size={18} /> : <ShoppingCart size={18} />}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Full Card Link Overlay (behind buttons) */}
              <Link to={`/product/${p.slug}`} className="absolute inset-0 z-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
