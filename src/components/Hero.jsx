import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

import banner3 from '@/assets/bannerr/4.jpg';
import banner4 from '@/assets/bannerr/2.jpg';

const Hero = () => {
  return (
    <section className="w-full bg-white mt-[20px] md:mt-[60px] px-4 md:px-10 pb-10">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[500px] lg:h-[600px]">
          
          {/* --- LEFT NARROW BANNER --- */}
          <div className="md:col-span-4 relative h-[350px] md:h-full overflow-hidden group order-2 md:order-1">
            <img 
              src={banner4} 
              alt="Enterprise Laser Force" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center p-8 md:p-12">
              <div className="space-y-4 relative z-10">
                <div className="inline-block bg-[#0ea5e9] text-white px-3 py-1 text-[10px] font-bold">
                  Business Pro
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-white leading-none italic">
                  Enterprise <br /> <span className="text-[#0ea5e9]">Laser Force</span>
                </h3>
                <p className="text-white/70 text-sm font-medium leading-relaxed max-w-xs">
                  High-volume precision gear for demanding workspaces. Experience rapid printing with crystal-clear professional text.
                </p>
                <div className="pt-2">
                  <Link 
                    to="/shop" 
                    className="inline-flex items-center gap-3 bg-[#0ea5e9] hover:bg-white text-white hover:text-[#0ea5e9] px-7 py-3.5 text-xs font-bold transition-all shadow-xl active:scale-95"
                  >
                    Shop Now <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
            </div>
          </div>

          {/* --- RIGHT WIDE BANNER --- */}
          <div className="md:col-span-8 relative h-[400px] md:h-full overflow-hidden group order-1 md:order-2">
            <img 
              src={banner3} 
              alt="Printing Made Simple" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent flex items-center justify-end text-right">
              <div className="px-8 md:px-16 w-full lg:w-2/3 space-y-5">
                <div className="inline-flex items-center justify-end">
                   <div className="bg-[#0ea5e9] text-white px-4 py-1 text-[10px] font-bold">
                    Best Seller
                  </div>
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white leading-[1] italic">
                  Print Everything <br /> <span className="text-[#0ea5e9]">With Ease</span>
                </h2>
                <p className="text-white/80 text-sm md:text-base font-medium max-w-md ml-auto hidden md:block leading-relaxed">
                  Enjoy thousands of professional-quality prints without ever worrying about ink costs. The smartest and most affordable way to print for your home or busy office.
                </p>
                <div className="pt-2">
                  <Link 
                    to="/shop" 
                    className="inline-flex items-center gap-3 bg-white hover:bg-[#0ea5e9] text-black hover:text-white px-10 py-4 text-xs font-bold transition-all shadow-2xl active:scale-95 group/btn"
                  >
                    Shop Best Deals <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
