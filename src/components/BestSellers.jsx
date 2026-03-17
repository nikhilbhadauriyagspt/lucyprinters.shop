import { ChevronLeft, ChevronRight, Heart, Check, ShoppingCart, Eye } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
    <section className="bg-white py-16 w-full overflow-hidden font-jakarta border-t border-gray-100">
      <div className="w-full">
        
        {/* --- BADGE-STYLE SECTION HEADER --- */}
        <div className="flex items-center justify-between mb-12">
          <div className="relative flex items-center h-14">
            <div className="bg-blue-600 h-full w-[340px] absolute left-0 rounded-r-full" />
            <div className="relative z-10 pl-4 md:pl-10">
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
                Best <span className="text-yellow-400">Sellers</span>
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3 pr-4 md:pr-10">
            <button className="bs-prev h-10 w-10 bg-gray-50 flex items-center justify-center rounded-full hover:bg-blue-600 hover:text-white transition-all">
              <ChevronLeft size={20} />
            </button>
            <button className="bs-next h-10 w-10 bg-gray-50 flex items-center justify-center rounded-full hover:bg-blue-600 hover:text-white transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* --- CAROUSEL --- */}
        <div className="px-4 md:px-10">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.5}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            navigation={{ prevEl: '.bs-prev', nextEl: '.bs-next' }}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
              1600: { slidesPerView: 6.5 },
            }}
            className="!overflow-visible"
          >
            {products.slice(0, 15).map((p, idx) => (
              <SwiperSlide key={p.id}>
                <div className="group relative flex flex-col h-full bg-white transition-all duration-500 border border-gray-100 rounded-sm">
                  
                  {/* Image Area with Hover Eye */}
                  <div className="relative aspect-square w-full bg-[#f9fafb] flex items-center justify-center p-6 overflow-hidden transition-all duration-500 border-b border-gray-50">
                    <img 
                      src={getImagePath(p.images)} 
                      alt={p.name} 
                      className="max-h-[85%] max-w-[85%] object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Permanent Floating Wishlist Button */}
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                      className={cn(
                        "absolute top-3 right-3 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm z-20 border border-gray-100",
                        isInWishlist(p.id) ? "bg-white text-red-500 border-red-100" : "bg-white text-gray-300 hover:text-red-500"
                      )}
                    >
                      <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                    </button>
                    
                    {/* Hover Overlay Buttons */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
                      <Link 
                        to={`/product/${p.slug}`}
                        className="h-12 w-12 bg-white text-black hover:bg-blue-600 hover:text-white flex items-center justify-center rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75"
                        title="View Details"
                      >
                        <Eye size={22} />
                      </Link>
                    </div>
                  </div>

                  {/* Info Area - Left Aligned */}
                  <div className="p-4 flex flex-col flex-1 text-left relative">
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="text-[13px] font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors mb-1">
                        {p.name}
                      </h3>
                    </Link>
                    <p className="text-sm font-black text-blue-600">${p.price}</p>

                    {/* Sliding Hover Actions (The "Extra Card" part) */}
                    <div className="absolute top-full left-[-1px] right-[-1px] bg-white border-x border-b border-gray-100 shadow-xl opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 transition-all duration-500 z-30 p-4 space-y-3 rounded-b-sm">
                      <button 
                        onClick={() => handleAddToCart(p)}
                        disabled={addedItems[p.id]}
                        className={cn(
                          "w-full h-10 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm",
                          addedItems[p.id] 
                            ? "bg-green-600 text-white" 
                            : "bg-blue-600 text-white hover:bg-black active:scale-95"
                        )}
                      >
                        {addedItems[p.id] ? <Check size={14} /> : <ShoppingCart size={14} />}
                        {addedItems[p.id] ? "Added" : "Add To Cart"}
                      </button>
                      
                      <button 
                        onClick={() => toggleWishlist(p)}
                        className={cn(
                          "w-full h-10 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all border flex items-center justify-center gap-2",
                          isInWishlist(p.id) 
                            ? "bg-red-50 border-red-100 text-red-500" 
                            : "bg-gray-50 border-gray-100 text-gray-400 hover:text-red-500"
                        )}
                      >
                        <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                        Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
