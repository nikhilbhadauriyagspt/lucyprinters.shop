import { motion } from "framer-motion";
import { Heart, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function ProductGrid({ products = [] }) {
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

  return (
    <section className="bg-white py-24 px-4 md:px-10 overflow-hidden font-sans">
      <div className="max-w-[1920px] mx-auto">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-zinc-100 pb-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200">
               <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Fresh Inventory</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 leading-none italic tracking-tighter">
              New <span className="text-[#0ea5e9]">Arrivals</span>
            </h2>
          </div>
          
          <Link 
            to="/shop" 
            className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            Explore Complete Catalog <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {products.slice(0, 30).map((p, idx) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 6) * 0.05 }}
              className={cn(
                "bg-white border border-zinc-200 transition-all duration-500 relative flex flex-col h-full group/card",
                "hover:border-[#0ea5e9]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
              )}
            >
              {/* Image Area */}
              <div className="aspect-square w-full overflow-hidden bg-white flex items-center justify-center p-8 relative">
                <img 
                  src={getImagePath(p.images)} 
                  alt={p.name} 
                  className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover/card:scale-110 relative z-10"
                />
              </div>

              {/* Info Area */}
              <div className="p-6 bg-white border-t border-zinc-50 flex flex-col flex-1 relative">
                <div className="space-y-2 mb-6 flex-1">
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[13px] font-bold text-zinc-800 line-clamp-1 group-hover/card:text-[#0ea5e9] transition-colors duration-300">
                      {p.name}
                    </h3>
                  </Link>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black text-zinc-900">${p.price}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 relative z-20 mt-auto">
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                    disabled={addedItems[p.id]}
                    className={cn(
                      "flex-1 h-10 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 flex items-center justify-center gap-2",
                      addedItems[p.id] 
                        ? "bg-emerald-500 text-white shadow-md" 
                        : "bg-zinc-900 text-white hover:bg-[#0ea5e9] shadow-sm hover:shadow-md"
                    )}
                  >
                    {addedItems[p.id] ? <Check size={14} /> : "Add to Cart"}
                  </button>
                  
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                    className={cn(
                      "h-10 w-10 rounded-xl border flex items-center justify-center transition-all duration-300 active:scale-95 shadow-sm",
                      isInWishlist(p.id) 
                        ? "bg-red-50 border-red-100 text-red-500" 
                        : "bg-white border-zinc-200 text-zinc-400 hover:text-red-500 hover:border-red-100"
                    )}
                  >
                    <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Simple Bottom Accent Line on Hover */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#0ea5e9] transition-all duration-500 group-hover/card:w-full" />
              </div>
              
              <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-[70%] z-0" />
            </motion.div>
          ))}
        </div>

        {/* --- VIEW ALL FOOTER --- */}
        <div className="mt-20 pt-10 border-t border-zinc-100 text-center">
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-4 bg-zinc-900 hover:bg-[#0ea5e9] text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-2xl"
            >
              Browse All Products <ArrowRight size={18} />
            </Link>
        </div>

      </div>
    </section>
  );
}
