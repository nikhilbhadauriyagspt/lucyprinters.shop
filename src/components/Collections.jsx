import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import printerCat from "@/assets/category/printer_cat.jpg";

export default function Collections() {
  return (
    <section className="bg-white py-16 px-4 md:px-10 font-jakarta border-t border-gray-100">
      <div className="max-w-full mx-auto group">
        <div className="relative bg-gray-50 border border-gray-100 flex flex-col md:flex-row items-stretch min-h-[350px] overflow-hidden transition-all duration-500 hover:shadow-xl rounded-sm">
          
          {/* --- CONTENT SIDE --- */}
          <div className="flex-1 p-8 md:p-16 flex flex-col justify-center relative z-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-sm shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Exclusive Collection</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl md:text-5xl font-black text-black leading-tight uppercase">
                  Perfect Home & <br /> 
                  <span className="text-blue-600">Office Printing</span>
                </h2>
                <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed max-w-md">
                  Easy to use printers that give you great results every time. Perfect for your daily needs at home or at the office.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-200">
                {["Easy to Setup", "Very Fast", "Always Reliable"].map((text, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-blue-600" />
                    <span className="text-[11px] font-bold text-gray-800 uppercase">{text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link to="/shop" className="inline-flex items-center gap-3 bg-black hover:bg-blue-600 text-white h-12 px-8 text-[11px] font-black uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-md group/btn rounded-sm">
                  Shop the Series <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
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
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-gray-50 via-transparent to-transparent z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
