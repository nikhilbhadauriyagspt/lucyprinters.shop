import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Printer, Settings2, CheckCircle, Headphones, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';
import aboutHero from "@/assets/bannerr/about.jpg";
import sideBanner from "@/assets/bannerr/banner4.jpg";

const About = () => {
  return (
    <div className="bg-white min-h-screen font-sans text-zinc-900 overflow-x-hidden">
      <SEO 
        title="About Us | DashPrinterShop"
        description="Learn more about DashPrinterShop and our simple mission to provide the best printers and support for your home or office."
      />

      {/* --- HERO SECTION --- */}
      <section className="pt-20 pb-24 px-6 md:px-10 bg-zinc-50 border-b border-zinc-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Main Text Block */}
            <div className="lg:col-span-6 space-y-8 relative z-10">
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0ea5e9]">Who We Are</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 leading-[1.1] tracking-tighter">
                    Printers Made <br />
                    <span className="text-[#0ea5e9]">Simple.</span>
                  </h1>
               </div>
               <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-lg">
                 At DashPrinterShop, we believe buying a printer should be easy. We find the best models for your home or office so you can focus on your work without any worries.
               </p>
               <div className="pt-6">
                 <Link to="/shop" className="inline-flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-xl text-[13px] font-bold transition-all hover:bg-[#0ea5e9] shadow-lg shadow-zinc-200">
                    See All Printers <ArrowRight size={18} />
                 </Link>
               </div>
            </div>

            {/* Visual Block */}
            <div className="lg:col-span-6 relative">
               <div className="absolute inset-0 bg-[#0ea5e9]/5 rounded-[3rem] -rotate-3 scale-105" />
               <div className="relative h-[400px] md:h-[500px] w-full rounded-[2.5rem] overflow-hidden border border-zinc-100 shadow-2xl">
                 <img src={aboutHero} alt="Printers in an office" className="absolute inset-0 w-full h-full object-cover" />
               </div>
               
               
              
            </div>

          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-32 px-6 md:px-10 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0ea5e9]">Our Promise</span>
             <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tighter">
                Why Shop <span className="text-[#0ea5e9]">With Us</span>
              </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Printer size={28} />, 
                title: "Top Brands", 
                desc: "We only sell original printers from the world's most trusted brands that you already know and love."
              },
              { 
                icon: <Settings2 size={28} />, 
                title: "Checked & Tested", 
                desc: "Every printer we sell is carefully checked by our team to make sure it works perfectly right out of the box."
              },
              { 
                icon: <Truck size={28} />, 
                title: "Fast Delivery", 
                desc: "We ship your printer as quickly as possible so you can start printing your important documents sooner."
              }
            ].map((item, i) => (
              <div key={i} className="bg-zinc-50 p-10 rounded-[2rem] border border-zinc-100 space-y-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
                <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center text-[#0ea5e9] shadow-sm group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl font-bold text-zinc-900">{item.title}</h4>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SUPPORT SECTION --- */}
      <section className="py-24 px-6 md:px-10 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-xl border border-zinc-200">
               <img src={sideBanner} alt="Printer support" className="absolute inset-0 w-full h-full object-cover" />
            </div>

            <div className="space-y-10">
               <div className="space-y-6">
                  <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tighter leading-tight">
                    Friendly <span className="text-[#0ea5e9]">Help.</span>
                  </h3>
                  <p className="text-zinc-500 text-lg font-medium leading-relaxed">
                    Setting up a new printer can sometimes be confusing. That's why our friendly experts are always here to help you with setup, maintenance, or finding the right ink.
                  </p>
               </div>
               
               <ul className="space-y-4">
                  {[
                    "Easy setup help over the phone",
                    "Advice on the best printer for you",
                    "Help with ink and paper supplies"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-700 font-semibold">
                      <CheckCircle size={20} className="text-[#0ea5e9]" />
                      {feature}
                    </li>
                  ))}
               </ul>

               <div className="pt-4">
                  <Link to="/contact" className="inline-flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-xl text-[13px] font-bold transition-all hover:bg-[#0ea5e9] shadow-lg">
                    Contact Our Team <ArrowRight size={18} />
                  </Link>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-6 md:px-10 bg-white">
         <div className="max-w-[1400px] mx-auto">
            <div className="bg-zinc-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
               {/* Decorative Background */}
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0ea5e9]/10 rounded-full blur-[100px] pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0ea5e9]/5 rounded-full blur-[100px] pointer-events-none" />
               
               <div className="max-w-3xl mx-auto space-y-10 relative z-10">
                  <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-tight">
                    Find Your New <br /> 
                    <span className="text-[#0ea5e9]">Perfect Printer</span>
                  </h2>
                  <p className="text-zinc-400 text-lg max-w-xl mx-auto font-medium">
                    Whether it's for school work or your business, we have the right printer for you.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    <Link to="/shop" className="bg-[#0ea5e9] text-white px-10 py-4 rounded-xl text-[13px] font-bold transition-all hover:bg-white hover:text-black shadow-lg shadow-[#0ea5e9]/20">
                      Browse Shop
                    </Link>
                    <Link to="/contact" className="bg-transparent border border-zinc-700 text-white px-10 py-4 rounded-xl text-[13px] font-bold transition-all hover:border-white">
                      Ask a Question
                    </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;