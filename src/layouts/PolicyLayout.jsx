import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PolicyLayout({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="bg-white min-h-screen font-jakarta pb-20 text-gray-900">
      {/* --- PREMIUM POLICY HEADER --- */}
      <header className="pt-16 pb-12 px-4 md:px-10 bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-3 mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
              <Link to="/" className="hover:text-black transition-colors">Home</Link>
              <ChevronRight size={10} className="text-gray-300" />
              <span className="text-gray-400">Legal Policy</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>

              <div className="shrink-0 flex items-center gap-4 bg-white px-6 py-4 rounded-sm border border-gray-100 shadow-sm">
                <div className="h-10 w-10 bg-blue-50 flex items-center justify-center rounded-full text-blue-600">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 leading-none mb-1">Revised on</p>
                  <p className="text-sm font-bold text-black leading-none">{lastUpdated}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- POLICY CONTENT --- */}
      <article className="max-w-[1600px] mx-auto px-4 md:px-10 py-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl prose prose-zinc prose-headings:font-black prose-headings:uppercase prose-headings:text-black prose-h2:text-2xl prose-h2:pt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-3 prose-p:text-gray-600 prose-p:text-sm prose-p:leading-relaxed prose-li:text-gray-600 prose-li:text-sm prose-strong:text-black prose-a:text-blue-600 prose-a:font-bold hover:prose-a:text-black transition-colors"
        >
          {children}
        </motion.div>
      </article>
    </div>
  );
}
