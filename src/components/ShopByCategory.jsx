import React, { useState } from 'react';
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { cn } from '../lib/utils';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [] }) {
  const [activeId, setActiveId] = useState(null);

  const filteredCategories = categories.filter(cat => {
    const name = cat.name.toLowerCase();
    const slug = cat.slug.toLowerCase();
    return !name.includes('laptop') && 
           !slug.includes('laptop') && 
           !name.includes('computer') && 
           !name.includes('pc') &&
           !name.includes('chromebook') &&
           !name.includes('notebook');
  });

  const subcategories = filteredCategories
    .flatMap(parent => parent.children || [])
    .filter(sub => {
      const name = sub.name.toLowerCase();
      const slug = sub.slug.toLowerCase();
      return !name.includes('laptop') && 
             !slug.includes('laptop') && 
             !name.includes('computer') && 
             !name.includes('pc');
    });

  const getImagePath = (image) => {
    if (image) return `/${image}`;
    return "https://via.placeholder.com/400x400?text=Category";
  };

  return (
    <section className="bg-zinc-50/50 py-20 px-4 md:px-10 overflow-hidden font-sans border-y border-zinc-100">
      <div className="max-w-[1920px] mx-auto relative">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
           
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 leading-none italic">
              Shop by <span className="text-[#0ea5e9]">Category</span>
            </h2>
          </div>
          
          {/* Custom Navigation Controls */}
          <div className="flex items-center gap-2">
            <button className="cat-prev h-12 w-12 bg-white flex items-center justify-center border border-zinc-200 hover:bg-[#0ea5e9] hover:text-white hover:border-[#0ea5e9] transition-all duration-300 shadow-sm group">
              <ChevronLeft size={20} />
            </button>
            <button className="cat-next h-12 w-12 bg-white flex items-center justify-center border border-zinc-200 hover:bg-[#0ea5e9] hover:text-white hover:border-[#0ea5e9] transition-all duration-300 shadow-sm group">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* --- CAROUSEL --- */}
        <div className="relative group">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.cat-prev',
              nextEl: '.cat-next',
            }}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3.5 },
              1280: { slidesPerView: 4.5 },
              1536: { slidesPerView: 6 },
            }}
            className="!overflow-visible"
          >
            {subcategories.map((item) => (
              <SwiperSlide key={item.id}>
                <Link 
                  to={`/shop?category=${item.slug}`}
                  onClick={() => setActiveId(item.id)}
                  className="block group/card"
                >
                  <div className={cn(
                    "bg-white border border-zinc-200 transition-all duration-500 relative overflow-hidden h-full",
                    "group-hover/card:border-[#0ea5e9]/30 group-hover/card:shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
                  )}>
                    
                    {/* Image Area */}
                    <div className="aspect-square w-full overflow-hidden bg-white flex items-center justify-center p-8 relative">
                      {/* Subtle Overlay on Hover */}
                      <div className="absolute inset-0 bg-[#0ea5e9]/0 group-hover/card:bg-[#0ea5e9]/5 transition-colors duration-500" />
                      
                      <img 
                        src={getImagePath(item.image)} 
                        alt={item.name} 
                        className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover/card:scale-110 relative z-10"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                      />
                    </div>

                    {/* Label Area */}
                    <div className="p-6 bg-white border-t border-zinc-50 text-center relative">
                      <h3 className="text-sm font-bold text-zinc-800 group-hover/card:text-[#0ea5e9] transition-colors duration-300">
                        {item.name}
                      </h3>
                      <p className="text-[10px] font-medium text-zinc-400 mt-1 uppercase tracking-tighter opacity-0 group-hover/card:opacity-100 transition-all duration-300 translate-y-2 group-hover/card:translate-y-0">
                        Explore Collection
                      </p>
                      
                      {/* Bottom Accent Line */}
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#0ea5e9] transition-all duration-500 group-hover/card:w-full" />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
