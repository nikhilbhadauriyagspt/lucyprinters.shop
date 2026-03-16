import { ChevronLeft, ChevronRight, Heart, Check } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

import 'swiper/css';
import 'swiper/css/navigation';

export default function BestSellers({ products = [] }) {
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
    <section className="bg-zinc-50/50 py-20 px-4 md:px-10 overflow-hidden font-sans border-y border-zinc-100">
      <div className="max-w-[1920px] mx-auto relative">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 leading-none italic">
              Market <span className="text-[#0ea5e9]">Favorites</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="bs-prev h-12 w-12 bg-white flex items-center justify-center border border-zinc-200 hover:bg-[#0ea5e9] hover:text-white hover:border-[#0ea5e9] transition-all duration-300 shadow-sm group">
              <ChevronLeft size={20} />
            </button>
            <button className="bs-next h-12 w-12 bg-white flex items-center justify-center border border-zinc-200 hover:bg-[#0ea5e9] hover:text-white hover:border-[#0ea5e9] transition-all duration-300 shadow-sm group">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* --- CAROUSEL --- */}
        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.2}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{ prevEl: '.bs-prev', nextEl: '.bs-next' }}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3.5 },
              1280: { slidesPerView: 4.5 },
              1536: { slidesPerView: 6 },
            }}
            className="!overflow-visible"
          >
            {products.slice(0, 12).map((p, idx) => (
              <SwiperSlide key={p.id}>
                <div className={cn(
                  "bg-white border border-zinc-200 transition-all duration-500 relative flex flex-col h-full group/card",
                  "hover:border-[#0ea5e9]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
                )}>
                  
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
                        <span className="text-sm font-black text-zinc-900">${p.price}</span>
                        {idx % 3 === 0 && (
                          <span className="text-[10px] font-medium text-zinc-400 line-through">
                            ${(parseFloat(p.price) * 1.2).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 relative z-20 mt-auto">
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                        disabled={addedItems[p.id]}
                        className={cn(
                          "flex-1 h-11 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 flex items-center justify-center gap-2",
                          addedItems[p.id] 
                            ? "bg-emerald-500 text-white shadow-[0_10px_20px_rgba(16,185,129,0.1)]" 
                            : "bg-zinc-900 text-white hover:bg-[#0ea5e9] shadow-[0_10px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_20px_rgba(14,165,233,0.1)]"
                        )}
                      >
                        {addedItems[p.id] ? (
                          <><Check size={16} /> Added</>
                        ) : (
                          <>Add to Cart</>
                        )}
                      </button>
                      
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                        className={cn(
                          "h-11 w-11 rounded-xl border flex items-center justify-center transition-all duration-300 active:scale-95 shadow-sm",
                          isInWishlist(p.id) 
                            ? "bg-red-50 border-red-100 text-red-500" 
                            : "bg-white border-zinc-200 text-zinc-400 hover:text-red-500 hover:border-red-100"
                        )}
                      >
                        <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                      </button>
                    </div>

                    {/* Simple Bottom Accent Line on Hover */}
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#0ea5e9] transition-all duration-500 group-hover/card:w-full" />
                  </div>
                  
                  <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-[70%] z-0" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
