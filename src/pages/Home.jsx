import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import Features from "@/components/Features";
import Collections from "@/components/Collections";
import ShopByCategory from "@/components/ShopByCategory";
import ProductGrid from "@/components/ProductGrid";
import CategorySlider from "@/components/CategorySlider";
import BestSellers from "@/components/BestSellers";
import TripleBanners from "@/components/TripleBanners";
import QuickPicks from "@/components/QuickPicks";
import TheVault from "@/components/TheVault";
import PromotionGrid from "@/components/PromotionGrid";
import { Shield, Wrench, ArrowUpRight, RefreshCw, ArrowRight, Loader2, ChevronRight, Zap, Globe, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";

export default function Home() {
  const [data, setData] = useState({
    all: [],
    printers: [],
    accessories: [],
    mixedArrivals: [],
    categories: [],
    brands: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, brandRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products?limit=1000`).then(r => r.json()),
          fetch(`${API_BASE_URL}/categories`).then(r => r.json()),
          fetch(`${API_BASE_URL}/brands`).then(r => r.json())
        ]);

        if (prodRes.status === 'success' && catRes.status === 'success' && brandRes.status === 'success') {
          const allowedBrands = ["brother", "canon", "epson", "hp", "lexmark", "xerox"];
          const filteredBrands = brandRes.data.filter(b => allowedBrands.includes(b.name.trim().toLowerCase()));
          
          const all = prodRes.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );
          
          const printers = all.filter(p => 
            p.name.toLowerCase().includes('printer') || 
            p.name.toLowerCase().includes('laserjet') || 
            p.name.toLowerCase().includes('pixma')
          );
          const accessories = all.filter(p => 
            p.name.toLowerCase().includes('ink') || 
            p.name.toLowerCase().includes('toner') ||
            p.name.toLowerCase().includes('cable') ||
            p.name.toLowerCase().includes('adapter')
          );

          const shuffled = [...all].sort(() => 0.5 - Math.random());

          setData({
            all,
            printers,
            accessories,
            mixedArrivals: shuffled,
            categories: catRes.data,
            brands: filteredBrands,
            loading: false
          });
        }
      } catch (err) {
        console.error(err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white font-snpro overflow-x-hidden text-slate-900">
      <SEO 
        title="DashPrinterShop | Premium Printers & Hardware" 
        description="Premium destination for professional printers, and essential accessories. Delivering excellence in professional solutions across the USA."
      />
      
      <Hero />

      {/* --- CREATIVE TICKER --- */}
      <div className="bg-zinc-50 h-[60px] flex items-center overflow-hidden border-y border-zinc-100 font-sans">
        <div className="flex whitespace-nowrap animate-marquee items-center gap-16">
           {[...Array(4)].map((_, i) => (
             <div key={i} className="flex items-center gap-16">
               {(data.categories || []).flatMap(cat => cat.children || []).slice(0, 10).map((sub, idx) => (
                 <Link 
                   key={`${i}-${idx}`} 
                   to={`/shop?category=${sub.slug}`}
                   className="text-[13px] text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-3 hover:text-[#0ea5e9] transition-colors"
                 >
                   <Zap size={14} className="text-[#0ea5e9]" />
                   {sub.name}
                 </Link>
               ))}
             </div>
           ))}
        </div>
      </div>

      <Features />      <ShopByCategory categories={data.categories} />
      
      <BestSellers products={data.all} />
      <TripleBanners />
      
      <ProductGrid products={data.mixedArrivals.slice(0, 30)} />
       <Collections />
      <CategorySlider 
        title="Professional Printers"  
        products={data.printers} 
      />
       
      {/* --- SIMPLE CONTACT CTA SECTION --- */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="bg-zinc-50 rounded-[2.5rem] p-12 md:p-20 text-center border border-zinc-100 relative overflow-hidden">
            {/* Subtle Decorative Circle */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#0ea5e9]/5 rounded-full blur-3xl" />

            <div className="max-w-2xl mx-auto space-y-8 relative z-10">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight italic">
                  Need a <span className="text-[#0ea5e9]">Pro's advice?</span>
                </h2>
                <p className="text-zinc-500 text-lg md:text-xl font-medium">
                  We'll help you find the perfect printing solution for your business or home.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="bg-[#0ea5e9] hover:bg-zinc-900 text-white px-10 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-[#0ea5e9]/20"
                >
                  Talk to an Expert
                </Link>
                <Link
                  to="/faq"
                  className="bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200 px-10 py-4 rounded-2xl font-bold transition-all duration-300"
                >
                  Browse FAQs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>    </div>
    
  );
  
}
