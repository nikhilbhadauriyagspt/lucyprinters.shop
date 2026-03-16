import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const TripleBanners = () => {
  const banners = [
    {
      title: "Inkjet",
      highlight: "Solutions",
      description: "Vibrant colors and precision for every home office project.",
      image: "/category/inkjet-printers.jpg",
      link: "/shop?category=inkjet-printers",
      color: "#0ea5e9"
    },
    {
      title: "Laser",
      highlight: "Performance",
      description: "High-speed, professional-grade printing for business demands.",
      image: "/category/laser-printers.jpg",
      link: "/shop?category=laser-printers",
      color: "#000000"
    },
    {
      title: "All-in-One",
      highlight: "Mastery",
      description: "Print, scan, and copy with absolute seamless efficiency.",
      image: "/category/all-in-one-printers.jpg",
      link: "/shop?category=all-in-one-printers",
      color: "#0ea5e9"
    }
  ];

  return (
    <section className="bg-white py-10 px-4 md:px-10">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((banner, index) => (
            <div 
              key={index} 
              className="relative h-[300px] md:h-[350px] overflow-hidden group border border-zinc-100 shadow-sm"
            >
              {/* Background Image */}
              <img 
                src={banner.image} 
                alt={banner.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                <div className="space-y-3 relative z-10">
                  <h3 className="text-2xl font-bold text-white leading-none italic">
                    {banner.title} <br /> 
                    <span style={{ color: banner.color }}>{banner.highlight}</span>
                  </h3>
                  <p className="text-white/70 text-[11px] font-medium leading-relaxed max-w-[200px]">
                    {banner.description}
                  </p>
                  <div className="pt-2">
                    <Link 
                      to={banner.link} 
                      className="inline-flex items-center gap-2 bg-white hover:bg-[#0ea5e9] text-zinc-900 hover:text-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg"
                    >
                      Explore <ArrowRight size={14} />
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
