import { Truck, RotateCcw, Headset, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Truck size={32} className="text-blue-600" />,
    title: "Free Shipping & Return",
    desc: "For all orders"
  },
  {
    icon: <RotateCcw size={32} className="text-blue-600" />,
    title: "Money Back Guarantee",
    desc: "Any back within 30 days"
  },
  {
    icon: <Headset size={32} className="text-blue-600" />,
    title: "Online Support 24/7",
    desc: "Dedicated support team"
  },
  {
    icon: <CreditCard size={32} className="text-blue-600" />,
    title: "Secure Payment",
    desc: "100% secure payment gateway"
  }
];

export default function Features() {
  return (
    <section className="bg-white py-12 border-t border-gray-100 font-jakarta">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-6 p-4 group cursor-default"
            >
              <div className="h-16 w-16 bg-gray-50 flex items-center justify-center rounded-full group-hover:bg-blue-50 transition-colors shrink-0">
                {item.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-[15px] font-black text-bold  uppercase  leading-none group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
