import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import printerCat from "@/assets/category/printer_cat.png";

export default function Collections() {
  return (
    <section className="bg-white py-16 px-4 md:px-10">
      <div className="max-w-[1920px] mx-auto group">
        <div className="relative bg-zinc-50 border border-zinc-100 flex flex-col md:flex-row items-stretch min-h-[450px] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]">
          
          {/* --- CONTENT SIDE --- */}
          <div className="flex-1 p-8 md:p-16 flex flex-col justify-center relative z-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-zinc-200 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#0ea5e9]" />
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Exclusive Collection</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl md:text-5xl font-black text-zinc-900 leading-tight italic tracking-tighter uppercase">
                  Smooth Printing <br /> 
                  <span className="text-[#0ea5e9]">Solutions.</span>
                </h2>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-md">
                  Maximize your productivity with our latest enterprise-grade printing solutions. Built for high-volume environments that demand absolute precision.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-zinc-200">
                {["Industrial Grade", "Sharp Results", "Next-Day Delivery"].map((text, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#0ea5e9]" />
                    <span className="text-[10px] font-black text-zinc-900 tracking-widest uppercase">{text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link to="/shop" className="inline-flex items-center gap-3 bg-zinc-900 hover:bg-[#0ea5e9] text-white h-14 px-10 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 shadow-xl group/btn">
                  Shop the Series <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* --- IMAGE SIDE --- */}
          <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full overflow-hidden">
            <img
              src={printerCat}
              alt="Professional Collection"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Subtle Gradient Overlays for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-50 via-transparent to-transparent z-10" />
            
          
          </div>

        

        </div>
      </div>
    </section>
  );
}
