import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { ArrowRight, ChevronDown, MessageCircle, HelpCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: "Orders & Buying",
    questions: [
      { q: "How do I place an order?", a: "Just find the printer you want, add it to your cart, and follow the simple checkout steps to pay." },     
      { q: "Do I need to create an account?", a: "No, you can shop as a guest. But creating an account makes it easier to track your orders later." },
      { q: "How can I check my order status?", a: "We'll send you emails with updates, or you can log in to your account to see where your order is." },
      { q: "Can I change or cancel my order?", a: "You can change or cancel your order as long as we haven't shipped it yet. Just contact us quickly!" },   
      { q: "What payment methods do you accept?", a: "We accept all major credit cards and PayPal for safe and easy payments." }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "Where do you ship?", a: "We ship to all 50 states in the USA, including homes and businesses." },
      { q: "How long does delivery take?", a: "Most orders arrive within 3 to 7 business days, depending on where you live." },
      { q: "How much is shipping?", a: "Shipping costs depend on the weight of the printer and your location. You'll see the final price at checkout." },
      { q: "How do I track my package?", a: "Once we ship your printer, we'll email you a tracking number so you can see its progress." }
    ]
  },
  {
    category: "Printers & Ink",
    questions: [
      { q: "Are your printers new and original?", a: "Yes, every printer we sell is 100% brand new, original, and comes in a sealed box with a full warranty." },
      { q: "How do I choose the best printer for me?", a: "Our friendly experts are happy to help! Just tell us what you need to print and we'll recommend the best match." },
      { q: "Do you sell original ink and toner?", a: "Yes, we sell genuine ink and toner to make sure your printer always works its best." },
      { q: "What if an item is out of stock?", a: "You can sign up for an alert on the product page, and we'll email you as soon as it's back." }
    ]
  },
  {
    category: "Warranty & Help",
    questions: [
      { q: "Do the printers have a warranty?", a: "Yes, all our printers come with a full manufacturer's warranty to protect your purchase." },
      { q: "What if my printer arrives damaged?", a: "Please let us know within 48 hours. We'll make it right by sending a replacement or fixing the issue." },
      { q: "Do you help with setup?", a: "Yes! If you have trouble setting up your new printer, our team is here to guide you through it." },
      { q: "How do I contact support?", a: "You can reach us by email or through our contact form 7 days a week. We're always here to help!" }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      { q: "Can I return my printer?", a: "Yes, you can return most items within 7 to 14 days if they are unused and in their original packaging." },
      { q: "How do I get a refund?", a: "Once we receive and check your return, we'll process your refund within 5 to 7 business days." },
      { q: "What if my printer is defective?", a: "If there's a problem with your printer, let us know right away so we can replace it or help you with a warranty claim." }
    ]
  }
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);

  const toggle = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const filteredFaqs = faqs.find(f => f.category === activeCategory)?.questions || [];

  return (
    <div className="bg-white min-h-screen font-sans text-zinc-900 overflow-x-hidden">
      <SEO 
        title="FAQ | DashPrinterShop" 
        description="Find simple answers to common questions about printers, orders, and shipping at DashPrinterShop."
      />

      {/* --- HERO SECTION --- */}
      <section className="pt-20 pb-24 px-6 md:px-10 bg-zinc-50 border-b border-zinc-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0ea5e9]">Help Center</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 leading-[1.1] tracking-tighter uppercase italic">
                Common <br />
                <span className="text-[#0ea5e9]">Questions.</span>
              </h1>
              <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-md">
                Find quick and simple answers to everything you need to know about our printers, shipping, and support.
              </p>
            </div>
            <div className="hidden lg:block relative text-right">
               <HelpCircle size={200} className="text-zinc-100 ml-auto" strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- CATEGORY NAVIGATION --- */}
          <div className="lg:col-span-4 space-y-8 sticky top-[100px]">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Categories</span>
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
              {faqs.map((f) => (
                <button
                  key={f.category}
                  onClick={() => { setActiveCategory(f.category); setActiveIdx(null); }}
                  className={cn(
                    "px-6 py-4 text-[13px] font-bold transition-all whitespace-nowrap text-left flex items-center justify-between group rounded-xl",
                    activeCategory === f.category 
                      ? "bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/20" 
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                  )}
                >
                  <span className="uppercase tracking-widest">{f.category}</span>
                  <ArrowRight size={16} className={cn("transition-transform duration-300", activeCategory === f.category ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0")} />
                </button>
              ))}
            </div>
          </div>

          {/* --- ACCORDION PANEL --- */}
          <div className="lg:col-span-8 space-y-6">
            <div className="mb-10">
               <h3 className="text-3xl font-bold text-zinc-900 uppercase italic tracking-tighter">{activeCategory}</h3>
            </div>

            <div className="space-y-4">
              {filteredFaqs.map((faq, i) => (
                <div 
                  key={i}
                  className={cn(
                    "bg-white border transition-all duration-500 rounded-3xl overflow-hidden",
                    activeIdx === i ? "border-[#0ea5e9]/30 shadow-2xl shadow-[#0ea5e9]/5" : "border-zinc-100 hover:border-zinc-200"
                  )}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between p-8 text-left"
                  >
                    <span className={cn(
                      "text-base md:text-lg font-bold transition-colors leading-tight",
                      activeIdx === i ? "text-[#0ea5e9]" : "text-zinc-800"
                    )}>
                      {faq.q}
                    </span>
                    <div className={cn(
                      "h-10 w-10 rounded-full bg-zinc-50 flex items-center justify-center transition-all duration-500 shrink-0 ml-6",
                      activeIdx === i ? "bg-[#0ea5e9] text-white rotate-180" : "text-zinc-300 group-hover:text-zinc-900"
                    )}>
                      <ChevronDown size={20} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeIdx === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-8 pb-8">
                          <div className="h-px w-10 bg-[#0ea5e9] mb-6" />
                          <p className="text-zinc-500 text-base md:text-lg font-medium leading-relaxed max-w-3xl">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <section className="pb-32 px-6 md:px-10">
         <div className="max-w-[1400px] mx-auto">
            <div className="bg-zinc-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group">
               {/* Decorative Background */}
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0ea5e9]/10 rounded-full blur-[100px] pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0ea5e9]/5 rounded-full blur-[100px] pointer-events-none" />
               
               <div className="max-w-3xl mx-auto space-y-10 relative z-10">
                  <div className="space-y-4">
                     <h2 className="text-4xl md:text-6xl font-bold text-white uppercase italic tracking-tighter leading-tight">
                       Still have <br /> 
                       <span className="text-[#0ea5e9]">Questions?</span>
                     </h2>
                     <p className="text-zinc-400 text-lg font-medium max-w-xl mx-auto">
                       Our friendly support team is here to help you with any questions you might have.
                     </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    <Link to="/contact" className="bg-[#0ea5e9] text-white px-12 py-5 rounded-xl text-[13px] font-bold transition-all hover:bg-white hover:text-black shadow-lg shadow-[#0ea5e9]/20">
                      Contact Us Now
                    </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
