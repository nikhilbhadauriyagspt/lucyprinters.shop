import { motion } from "framer-motion";
import { Heart, Check, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { cn } from "../lib/utils";

import 'swiper/css';
import 'swiper/css/navigation';

export default function CategorySlider({ title, subtitle, products = [], bgColor = "bg-white" }) {
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
    <section className={cn("px-4 md:px-10 py-20 font-sans relative overflow-hidden", bgColor)}>
      
      <div className="max-w-[1920px] mx-auto">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 leading-none italic tracking-tighter">
              Professional <span className="text-[#0ea5e9]">Printers</span>
            </h2>
          </div>
          
          {/* Custom Navigation Controls */}
          <div className="flex items-center gap-2">
            <button className="cs-prev h-12 w-12 bg-white flex items-center justify-center border border-zinc-200 hover:bg-[#0ea5e9] hover:text-white hover:border-[#0ea5e9] transition-all duration-300 shadow-sm group">
              <ChevronLeft size={20} />
            </button>
            <button className="cs-next h-12 w-12 bg-white flex items-center justify-center border border-zinc-200 hover:bg-[#0ea5e9] hover:text-white hover:border-[#0ea5e9] transition-all duration-300 shadow-sm group">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{ prevEl: '.cs-prev', nextEl: '.cs-next' }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="!overflow-visible"
          >
            {products.map((p, idx) => (
              <SwiperSlide key={p.id}>
                <div 
                  className="relative bg-white border border-zinc-200 p-4 transition-all duration-500 flex flex-row items-center gap-6 group/card hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-[#0ea5e9]/30 h-[180px]"
                >
                  {/* Image Area - Left Side */}
                  <div className="relative h-full w-[140px] shrink-0 flex items-center justify-center overflow-hidden bg-zinc-50 p-4">
                    <img 
                      src={getImagePath(p.images)} 
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover/card:scale-110" 
                      alt={p.name} 
                    />
                  </div>

                  {/* Content Area - Right Side */}
                  <div className="flex-1 flex flex-col justify-between h-full py-1">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                         <span className="text-[9px] font-black text-[#0ea5e9] uppercase tracking-widest">
                          {p.brand_name || 'Premium'}
                        </span>
                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                          className={cn(
                            "transition-colors duration-300",
                            isInWishlist(p.id) ? "text-red-500" : "text-zinc-300 hover:text-red-500"
                          )}
                        >
                          <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                        </button>
                      </div>
                      
                      <Link to={`/product/${p.slug}`} className="block">
                        <h3 className="font-bold text-zinc-800 text-[14px] leading-tight line-clamp-2 uppercase tracking-tight group-hover/card:text-[#0ea5e9] transition-colors">
                          {p.name}
                        </h3>
                      </Link>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-50">
                      <span className="text-base font-black text-zinc-900">${p.price}</span>
                      
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                        disabled={addedItems[p.id]}
                        className={cn(
                          "h-9 w-9 rounded-lg border flex items-center justify-center transition-all duration-300 active:scale-90",
                          addedItems[p.id] 
                            ? "bg-emerald-500 border-emerald-500 text-white" 
                            : "bg-white border-zinc-200 text-zinc-400 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 shadow-sm"
                        )}
                      >
                        {addedItems[p.id] ? <Check size={16} /> : <ShoppingCart size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Simple Bottom Accent Line on Hover */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#0ea5e9] transition-all duration-500 group-hover/card:w-full" />
                  
                  <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-full z-0" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
