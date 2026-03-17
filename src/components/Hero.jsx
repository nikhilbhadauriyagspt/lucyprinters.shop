import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Printer, 
  ChevronRight,
  Zap,
  Layers,
  FileText,
  Maximize,
  Settings,
  Image,
  Activity,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import newban1 from '@/assets/bannerr/newban1.jpg';
import newban2 from '@/assets/bannerr/newban2.jpg';
import newban3 from '@/assets/bannerr/newban3.jpg';
import banner3 from '@/assets/bannerr/4.jpg';
import banner4 from '@/assets/bannerr/2.jpg';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: newban1,
      tag: "Premium Tech 2026",
      title: "Smart Printing",
      subtitle: "Solutions",
      desc: "Precision and performance for the modern workspace.",
      theme: "light"
    },
    {
      id: 2,
      image: newban2,
      tag: "High Efficiency",
      title: "Enterprise",
      subtitle: "Laser Force",
      desc: "Experience rapid printing with crystal-clear professional text.",
      theme: "light"
    },
    {
      id: 3,
      image: newban3,
      tag: "Limited Offer",
      title: "Efficiency",
      subtitle: "Redefined",
      desc: "Multifunction gear designed for maximum productivity.",
      theme: "light"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { id: 1, name: 'Inkjet Printers', slug: 'inkjet-printers', icon: <Printer size={16} /> },
    { id: 2, name: 'Laser Printers', slug: 'laser-printers', icon: <Zap size={16} /> },
    { id: 3, name: 'All-in-One Printers', slug: 'all-in-one-printers', icon: <Layers size={16} /> },
    { id: 4, name: 'Thermal Printers', slug: 'thermal-printers', icon: <FileText size={16} /> },
    { id: 5, name: 'Dot Matrix Printers', slug: 'dot-matrix-printers', icon: <Activity size={16} /> },
    { id: 6, name: 'LED Printers', slug: 'led-printers', icon: <Cpu size={16} /> },
    { id: 7, name: 'Large Format Printers', slug: 'large-format-printers', icon: <Maximize size={16} /> },
    { id: 8, name: 'Photo Printers', slug: 'photo-printers', icon: <Image size={16} /> },
    { id: 9, name: 'Supertank Printers', slug: 'supertank-printers', icon: <Printer size={16} /> },
    { id: 10, name: 'Printer Accessories', slug: 'printer-accessories', icon: <Settings size={16} /> },
  ];

  return (
    <section className="w-full bg-white font-jakarta">
      <div className="w-full px-4">
        <div className="flex flex-col lg:flex-row gap-0">
          
          {/* --- LEFT SIDEBAR CATEGORIES --- */}
          <div className="hidden lg:block w-[280px] shrink-0 border border-gray-200 border-t-0 bg-white self-start shadow-sm h-full min-h-[665px]">
            <div className="flex flex-col h-full">
              {categories.map((cat) => (
                <Link 
                  key={cat.id}
                  to={`/shop?category=${cat.slug}`}
                  className="flex items-center justify-between px-5 py-[13.5px] text-[13px] font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all border-b border-gray-100 last:border-0 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 group-hover:text-blue-600">
                      {cat.icon}
                    </span>
                    {cat.name}
                  </div>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}

              <div className="mt-auto p-5 bg-gray-50/50 border-t border-gray-100 group/promo">
                <div className="relative overflow-hidden rounded-sm mb-4">
                  <img src={banner3} alt="Promo" className="w-full h-32 object-cover group-hover/promo:scale-110 transition-transform duration-700" />
                  <Link to="/shop" className="absolute bottom-14 right-18 bg-blue-500 text-white text-[15px] font-bold px-4 py-1">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>

          {/* --- CENTER HERO SLIDER --- */}
          <div className="flex-1 lg:mx-6 relative rounded-sm overflow-hidden min-h-[450px] md:min-h-[520px] shadow-lg mt-6 lg:mt-0 mb-6 bg-gray-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <motion.img 
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 5 }}
                  src={slides[currentSlide].image} 
                  alt={slides[currentSlide].title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/20 lg:bg-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent lg:max-w-[60%]" />
                
                <div className="relative z-10 px-8 md:px-16 h-full flex flex-col justify-center items-start">
                  <div className="max-w-md space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="inline-block bg-blue-600 text-white px-4 py-1 text-[15px] font-bold rounded-sm"
                    >
                      {slides[currentSlide].tag}
                    </motion.div>
                    
                    <div className="space-y-1">
                      <motion.h1 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-4xl md:text-5xl font-black text-black"
                      >
                        {slides[currentSlide].title}
                      </motion.h1>
                      <motion.h1 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-4xl md:text-6xl font-black text-blue-600"
                      >
                        {slides[currentSlide].subtitle}
                      </motion.h1>
                    </div>

                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="text-gray-900 text-sm md:text-lg font-bold leading-relaxed"
                    >
                      {slides[currentSlide].desc}
                    </motion.p>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      <Link 
                        to="/shop" 
                        className="inline-flex items-center gap-3 bg-black hover:bg-blue-600 text-white px-10 py-4 text-[12px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 group"
                      >
                        Shop Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide === i ? 'w-10 bg-blue-600' : 'w-2 bg-gray-400 hover:bg-gray-600'}`}
                />
              ))}
            </div>
          </div>

          {/* --- RIGHT SIDE BANNERS --- */}
          <div className="hidden xl:flex w-[320px] shrink-0 flex-col gap-6 mb-6">
            <div className="flex-1 relative rounded-sm overflow-hidden group border border-gray-100 shadow-sm">
              <img src={banner4} alt="Promotion 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 flex flex-col justify-center p-6 space-y-3 text-white">
                <span className="text-white text-[11px] font-black bg-white/40 self-start px-2 py-0.5 rounded-sm">Office Series</span>
                <h4 className="text-xl font-black drop-shadow-md">Laserjet <br/> Enterprise</h4>
                <Link to="/shop" className="text-white text-[11px] font-black uppercase border-b-2 border-blue-600 self-start pb-1 hover:text-blue-400 transition-colors">View Deals</Link>
              </div>
            </div>
            <div className="flex-1 relative rounded-sm overflow-hidden group border border-gray-100 shadow-sm">
              <img src={banner3} alt="Promotion 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-blue-900/30 flex flex-col justify-center p-6 space-y-3 text-white">
                <span className="opacity-90 text-[12px] font-black bg-blue-600/60 self-start px-2 py-0.5 rounded-sm">Exclusive Deal</span>
                <h4 className="text-xl font-black drop-shadow-md">Premium <br/> Ink & Toner</h4>
                <Link to="/shop" className="text-white text-[11px] font-black uppercase border-b-2 border-white self-start pb-1 hover:text-blue-200 transition-colors">Shop Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
