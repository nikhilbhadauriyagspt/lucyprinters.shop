import React, { useState } from 'react';
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { cn } from '../lib/utils';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [] }) {
  const [hoveredId, setHoveredId] = useState(null);

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
    <section className="bg-white py-16 w-full overflow-hidden font-jakarta border-t border-gray-100">
      <div className="w-full relative">
        
        {/* --- EDGE-TO-GRID BADGE HEADER --- */}
        <div className="flex items-center justify-between mb-16 pr-4 md:pr-10">
          <div className="relative flex items-center h-16">
            {/* The Badge: Starts from screen edge, ends with a rounded corner */}
            <div className="bg-blue-600 h-full w-[380px] absolute left-0 rounded-r-full shadow-lg shadow-blue-600/10" />
            
            <div className="relative z-10 pl-4 md:pl-10">
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
                Shop By <span className="text-yellow-400 font-black">Category</span>
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="cat-prev h-11 w-11 bg-gray-50 flex items-center justify-center rounded-full hover:bg-blue-600 hover:text-white transition-all border border-gray-100">
              <ChevronLeft size={22} />
            </button>
            <button className="cat-next h-11 w-11 bg-gray-50 flex items-center justify-center rounded-full hover:bg-blue-600 hover:text-white transition-all border border-gray-100">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* --- COMPACT CAROUSEL --- */}
        <div className="w-full px-4 md:px-10">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2.2}
            navigation={{
              prevEl: '.cat-prev',
              nextEl: '.cat-next',
            }}
            breakpoints={{
              640: { slidesPerView: 3.5 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6.5 },
              1600: { slidesPerView: 8 },
            }}
            className="!overflow-visible"
          >
            {subcategories.map((item) => (
              <SwiperSlide key={item.id}>
                <Link 
                  to={`/shop?category=${item.slug}`}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="block group"
                >
                  <div className="flex flex-col items-center gap-4">
                    {/* Compact Image Container */}
                    <div className="w-full aspect-square bg-[#f9fafb] rounded-2xl flex items-center justify-center p-6 transition-all duration-500 group-hover:bg-white group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-transparent group-hover:border-gray-100">
                      <motion.img 
                        src={getImagePath(item.image)} 
                        alt={item.name} 
                        className="max-h-full max-w-full object-contain drop-shadow-sm"
                        animate={hoveredId === item.id ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                      />
                    </div>

                    {/* Simple Text Label */}
                    <div className="text-center w-full">
                      <h3 className="text-[13px] font-bold text-gray-800 uppercase  truncate transition-colors group-hover:text-blue-600">
                        {item.name}
                      </h3>
                      <div className="h-0.5 w-0 bg-blue-600 mx-auto mt-1 transition-all duration-300 group-hover:w-8" />
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
