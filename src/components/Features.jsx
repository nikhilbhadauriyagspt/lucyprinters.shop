import { Truck, RefreshCcw, ShieldCheck, Headset } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Truck size={32} strokeWidth={1.5} />,
    title: "Free Shipping",
    desc: "On all orders",
    tag: "LOGISTICS"
  },
  {
    icon: <RefreshCcw size={32} strokeWidth={1.5} />,
    title: "30-Day Returns",
    desc: "Hassle-free money back guarantee",
    tag: "PROTECTION"
  },
  {
    icon: <ShieldCheck size={32} strokeWidth={1.5} />,
    title: "Official Warranty",
    desc: "100% genuine products with warranty",
    tag: "QUALITY"
  },
  {
    icon: <Headset size={32} strokeWidth={1.5} />,
    title: "Expert Support",
    desc: "24/7 Dedicated help for your printer",
    tag: "SUPPORT"
  }
];

export default function Features() {
  return (
    <section className="bg-white py-16 md:py-28 font-sans relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#0ea5e9 1px, transparent 1px)', size: '40px 40px' }} />
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-zinc-100 divide-x divide-y lg:divide-y-0 divide-zinc-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
          {features.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 md:p-12 relative overflow-hidden flex flex-col items-center text-center hover:bg-zinc-50/50 transition-colors duration-500"
            >
              {/* Corner Tag */}
              <div className="absolute top-4 right-6 text-[8px] font-black text-zinc-300 uppercase tracking-[0.3em] group-hover:text-[#0ea5e9]/50 transition-colors">
                {item.tag}
              </div>

              {/* Icon Container with Floating Effect */}
              <div className="relative mb-8">
                <div className="h-16 w-16 bg-white border border-zinc-100 flex items-center justify-center text-zinc-900 group-hover:text-[#0ea5e9] group-hover:border-[#0ea5e9]/30 group-hover:shadow-[0_15px_30px_rgba(14,165,233,0.1)] transition-all duration-500 rounded-2xl relative z-10">
                  {item.icon}
                </div>
                {/* Decorative background element */}
                <div className="absolute -inset-2 bg-[#0ea5e9]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
              </div>

              {/* Text Content */}
              <div className="space-y-3 relative z-10">
                <h3 className="text-xl font-bold text-zinc-900 uppercase tracking-tighter italic leading-none group-hover:text-[#0ea5e9] transition-colors duration-300">
                  {item.title.split(' ')[0]} <span className="text-zinc-400 group-hover:text-[#0ea5e9]/70">{item.title.split(' ').slice(1).join(' ')}</span>
                </h3>
                <p className="text-[11px] font-black text-zinc-400 uppercase tracking-widest leading-relaxed max-w-[180px] mx-auto">
                  {item.desc}
                </p>
              </div>

              {/* Unique Bottom Indicator */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-100 group-hover:bg-[#0ea5e9] transition-all duration-700 origin-left scale-x-0 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
