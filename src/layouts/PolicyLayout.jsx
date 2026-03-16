import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PolicyLayout({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="bg-white min-h-screen font-sans pb-20 text-zinc-900">
      {/* --- REDESIGNED PAGE HEADER --- */}
      <header className="pt-32 pb-20 bg-zinc-50 border-b border-zinc-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-3 mb-8 text-[10px] font-black uppercase tracking-[0.4em] text-[#0ea5e9]">
              <Link to="/" className="hover:text-zinc-900 transition-colors">Home</Link>
              <ChevronRight size={10} className="text-zinc-300" />
              <span className="text-zinc-400">Legal Document</span>
            </div>

            {/* Main Heading */}
            <div className="grid lg:grid-cols-2 gap-12 items-end">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold leading-none uppercase italic tracking-tighter">
                  {title.split(' ')[0]} <br/>
                  <span className="text-[#0ea5e9]">{title.split(' ').slice(1).join(' ')}</span>
                </h1>
                {subtitle && (
                  <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>

              <div className="lg:text-right">
                <div className="inline-flex items-center gap-4 bg-white px-6 py-4 rounded-[2rem] border border-zinc-100 shadow-xl shadow-zinc-200/50">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0ea5e9]">
                    <Clock size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 leading-none mb-1">Last Updated</p>
                    <p className="text-sm font-bold text-zinc-900 leading-none">{lastUpdated}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <article className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl prose prose-zinc prose-headings:font-bold prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter prose-headings:text-zinc-900 prose-h2:text-3xl prose-h2:pt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:border-zinc-100 prose-h2:pb-4 prose-p:text-zinc-500 prose-p:text-lg prose-p:font-medium prose-p:leading-relaxed prose-li:text-zinc-500 prose-li:font-medium prose-strong:text-zinc-900 prose-a:text-[#0ea5e9] prose-a:font-bold prose-a:no-underline hover:prose-a:underline"
        >
          {children}
        </motion.div>
      </article>
    </div>
  );
}
