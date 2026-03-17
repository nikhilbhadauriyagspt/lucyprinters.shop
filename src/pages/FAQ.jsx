import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { ArrowRight, ChevronDown, MessageCircle, HelpCircle, CheckCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: "Orders & Buying",
    questions: [
      { q: "How do I buy a printer?", a: "It's easy! Just pick the printer you like, add it to your cart, and follow the steps at checkout to pay." },     
      { q: "Do I need an account to shop?", a: "No, you can check out as a guest. But having an account helps you see your order history later." },
      { q: "Where can I see my order?", a: "We'll send you an email as soon as you buy something. You can also check 'Track Order' at the top of the page." },
      { q: "Can I change my mind after buying?", a: "If we haven't sent your printer yet, we can change or cancel your order. Just message us as soon as possible!" },
      { q: "What ways can I pay?", a: "We take all major bank cards and PayPal. Everything is kept safe and private." }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "Where do you deliver?", a: "We deliver to all homes and offices across the country." },
      { q: "How long will it take to get my printer?", a: "Most orders arrive in 3 to 7 days. We'll let you know exactly when it's on its way." },
      { q: "How much is the delivery fee?", a: "The fee depends on where you live and how heavy the printer is. You'll see the total before you pay." },
      { q: "How do I know where my package is?", a: "We'll email you a tracking number. You can use this to see where your printer is at any time." },
      { q: "What if I'm not home when it arrives?", a: "The delivery person will usually leave a note or try again the next day." }
    ]
  },
  {
    category: "About the Printers",
    questions: [
      { q: "Are the printers brand new?", a: "Yes, 100%. We only sell brand new, original printers in their original boxes." },
      { q: "Will I get a warranty?", a: "Yes, all printers come with a full warranty from the brand, so you're always protected." },
      { q: "Do you help with setting it up?", a: "Yes! If you find it hard to get your printer working, just reach out. We can guide you through it." },
      { q: "Do you sell ink and toner too?", a: "Yes, we have all the original ink and toner you'll need to keep printing." },
      { q: "How do I know which printer is best for me?", a: "Just think about what you print most. For letters and documents, a laser printer is great. For photos, go with inkjet. Still not sure? Ask us!" }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      { q: "Can I return a printer?", a: "Yes, if the printer is still in its box and hasn't been used, you can return it within 14 days." },
      { q: "How do I get my money back?", a: "Once we get the printer back and check it, we'll send your money back to your card within a few days." },
      { q: "What if the printer is broken?", a: "If there's any problem when it arrives, let us know right away. We will fix it or send you a new one." }
    ]
  },
  {
    category: "Support & Help",
    questions: [
      { q: "How can I contact you?", a: "You can send us an email or use the form on our Contact page. We're here to help every day." },
      { q: "When are you open?", a: "Our website is always open! Our team answers messages throughout the day, usually within 24 hours." },
      { q: "Can you help me find the right ink?", a: "Of course! Just tell us the name of your printer and we'll show you exactly what ink you need." }
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
    <div className="bg-white min-h-screen font-jakarta text-gray-900 overflow-x-hidden">
      <SEO 
        title="FAQ | LucyPrinters" 
        description="Find simple answers to your questions about printers, delivery, and support."
      />

      {/* --- HERO HEADER --- */}
      <section className="pt-16 pb-12 px-4 md:px-10 bg-gray-50 border-b border-gray-100 text-center space-y-4">
        <span className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] block">Help Center</span>
        <h1 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight">
          How can we <span className="text-blue-600">Help?</span>
        </h1>
        <p className="text-gray-500 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
          Find simple and clear answers to common questions about our printers and service.
        </p>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- CATEGORY NAVIGATION --- */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-[220px]">
            <h4 className="text-[12px] font-black uppercase tracking-widest text-black border-b-2 border-blue-600 pb-2 inline-block">Pick a Topic</h4>
            <div className="flex lg:flex-col gap-1 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
              {faqs.map((f) => (
                <button
                  key={f.category}
                  onClick={() => { setActiveCategory(f.category); setActiveIdx(null); }}
                  className={cn(
                    "px-6 py-4 text-[13px] font-bold transition-all whitespace-nowrap text-left flex items-center justify-between rounded-sm",
                    activeCategory === f.category 
                      ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" 
                      : "text-gray-500 hover:bg-gray-50 hover:text-black"
                  )}
                >
                  <span className="uppercase tracking-wider">{f.category}</span>
                  <ChevronRight size={16} className={cn("transition-transform duration-300", activeCategory === f.category ? "opacity-100" : "opacity-0")} />
                </button>
              ))}
            </div>
          </div>

          {/* --- ACCORDION PANEL --- */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              {filteredFaqs.map((faq, i) => (
                <div 
                  key={i}
                  className={cn(
                    "bg-white border transition-all duration-500 rounded-sm overflow-hidden",
                    activeIdx === i ? "border-blue-600/30 shadow-2xl shadow-blue-600/5" : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                  >
                    <span className={cn(
                      "text-base md:text-lg font-bold transition-colors leading-tight",
                      activeIdx === i ? "text-blue-600" : "text-gray-800"
                    )}>
                      {faq.q}
                    </span>
                    <div className={cn(
                      "h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center transition-all duration-500 shrink-0 ml-6",
                      activeIdx === i ? "bg-blue-600 text-white rotate-180" : "bg-gray-50 text-gray-400 group-hover:text-black"
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
                        <div className="px-6 md:px-8 pb-8">
                          <div className="h-0.5 w-8 bg-blue-600 mb-6" />
                          <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed max-w-3xl">
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
      <section className="pb-24 px-4 md:px-10 bg-white">
         <div className="max-w-[1600px] mx-auto">
            <div className="bg-black rounded-sm p-12 md:p-20 text-center relative overflow-hidden">
               <div className="max-w-3xl mx-auto space-y-8 relative z-10">
                  <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                    Still Need <span className="text-blue-500">Help?</span>
                  </h2>
                  <p className="text-gray-400 text-lg font-medium max-w-xl mx-auto">
                    If you couldn't find your answer here, our team is always ready to talk.
                  </p>
                  <div className="pt-4">
                    <Link to="/contact" className="bg-blue-600 text-white px-12 py-4 rounded-sm font-black uppercase text-sm hover:bg-white hover:text-black transition-all shadow-xl">
                      Talk to Us
                    </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
