import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronRight, Award, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import aboutHero from "@/assets/bannerr/about.jpg";
import bannerBg from "@/assets/bannerr/banner6.jpg";

const About = () => {
  return (
    <div className="bg-white min-h-screen font-jakarta text-gray-900 overflow-x-hidden">
      <SEO 
        title="About | LucyPrinters"
        description="A new perspective on professional printing solutions. Discover why businesses trust LucyPrinters."
      />

      {/* --- FULL WIDTH IMMERSIVE HERO --- */}
      <section className="relative h-[60vh] md:h-[75vh] w-full flex items-center justify-center overflow-hidden">
        <img 
          src={bannerBg} 
          alt="Immersive Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-700 text-[16px] font-black uppercase tracking-[0.4em] block"
          >
            Since 2026
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-black text-white  uppercase "
          >
            A Better Way <br /> To <span className="text-blue-500">Print.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="h-1 w-16 bg-blue-600 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* --- REFINED TEXT BLOCK --- */}
      <section className="py-24 px-4 md:px-10 bg-white">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-blue-600 text-[16px] font-blackt">The LucyPrinters Promise</span>
            <h2 className="text-2xl md:text-4xl font-black text-black uppercase ">
              We find the best <br /> printers, so you <br /> don't have to.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-8">
            <p className="text-gray-500 text-base md:text-xl font-medium leading-relaxed max-w-2xl">
              LucyPrinters was built on a simple idea everyone deserves a printer that just works. We spent months searching for the most reliable, easy-to-use machines so that you can buy with confidence and get straight to work.
            </p>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl">
              We don't believe in using  or making things complicated. Our goal is to provide honest advice and original products from brands you already know and trust. Whether it's for a small home office or a growing business, we have the right fit for you.
            </p>
            <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-gray-100">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-blue-600">
                  <ShieldCheck size={20} />
                  <h4 className="text-sm font-black uppercase text-black">100% Original</h4>
                </div>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">Every printer we sell is brand new and comes directly from the factory in a sealed box.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-blue-600">
                  <Award size={20} />
                  <h4 className="text-sm font-black uppercase text-black">Full Warranty</h4>
                </div>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">Your purchase is always protected with a full manufacturer's warranty for total peace of mind.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      {/* --- VALUES SECTION --- */}
      <section className="py-24 px-4 md:px-10 bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            {[
              { title: "Direct Shipping", desc: "Fast and secure delivery directly from our hub to your home or office." },
              { title: "Setup Support", desc: "Our team is always ready to help you get your new printer started in minutes." },
              { title: "Honest Advice", desc: "We help you pick the best printer for what you actually need, not just the most expensive." }
            ].map((v, i) => (
              <div key={i} className="p-10 bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-xl hover:border-blue-600/20 transition-all group">
                <span className="text-2xl font-black text-blue-600/20 block mb-4 group-hover:text-blue-600 transition-colors">0{i+1}</span>
                <h3 className="text-lg font-black text-black uppercase tracking-tight mb-3 group-hover:text-blue-600 transition-colors">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CLEAN FINAL ACTION --- */}
      <section className="py-24 px-4 md:px-10 bg-white">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10 bg-black p-12 md:p-20 rounded-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <span className="text-8xl font-black uppercase italic">LUCY</span>
          </div>
          
          <div className="relative z-10 space-y-3 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
              Find Your <br /> Perfect Match
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-medium max-w-xs mx-auto md:mx-0">
              Browse our selection of the most reliable printers on the market.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4">
            <Link to="/shop" className="bg-blue-600 text-white px-12 py-4 rounded-sm font-black uppercase text-xs hover:bg-white hover:text-black transition-all shadow-xl inline-flex items-center gap-2 active:scale-95">
              Start Shopping <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-white/10 text-white px-12 py-4 rounded-sm font-black uppercase text-xs hover:border-white transition-all inline-flex items-center gap-2 active:scale-95">
              Contact Us <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
