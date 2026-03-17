import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Import higher quality banners from assets
import banner1 from '@/assets/bannerr/banner1.jpg';
import banner2 from '@/assets/bannerr/banner2.jpg';
import banner5 from '@/assets/bannerr/banner5.jpg';

const TripleBanners = () => {
  const banners = [
    {
      title: "Enterprise",
      highlight: "Solutions",
      description: "High-volume laser printing designed for large-scale professional workspaces.",
      image: banner1,
      link: "/shop?category=laser-printers",
      accent: "blue"
    },
    {
      title: "Next-Gen",
      highlight: "Precision",
      description: "Experience vibrant color accuracy with our premium inkjet collection.",
      image: banner5,
      link: "/shop?category=inkjet-printers",
      accent: "black"
    },
    {
      title: "Pro Ink",
      highlight: "& Toner",
      description: "Genuine supplies to keep your machines running at peak performance.",
      image: banner2,
      link: "/shop?category=printer-accessories",
      accent: "blue"
    }
  ];

  return (
    <section className="bg-white py-10 px-4 w-full font-jakarta">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {banners.map((banner, index) => (
            <div 
              key={index} 
              className="relative h-[240px] md:h-[260px] overflow-hidden group rounded-sm border border-gray-100"
            >
              {/* Background Image */}
              <img 
                src={banner.image} 
                alt={banner.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <div className="space-y-2 relative z-10">
                  <div className="space-y-0.5">
                    <span className={`inline-block px-2 py-0.5 rounded-sm text-[10px] font-bold ${banner.accent === 'blue' ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}>
                      {banner.accent === 'blue' ? 'Featured' : 'Exclusive'}
                    </span>
                    <h3 className="text-2xl font-black text-white leading-tight">
                      {banner.title} <span className="text-blue-400">{banner.highlight}</span>
                    </h3>
                  </div>
                  
                  <p className="text-gray-200 text-[12px] font-medium leading-tight max-w-[260px]">
                    {banner.description}
                  </p>
                  
                  <div className="pt-1">
                    <Link 
                      to={banner.link} 
                      className="inline-flex items-center gap-2 text-white text-[12px] font-bold hover:text-blue-400 transition-colors"
                    >
                      Shop Now <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripleBanners;
