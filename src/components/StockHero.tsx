"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Package, Box, ShoppingCart, Database } from "lucide-react";

interface StockHeroProps {
  onContactClick: () => void;
}

export default function StockHero({ onContactClick }: StockHeroProps) {
  return (
    <section className="relative pt-32 pb-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[9px] bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-[4px] bg-primary animate-pulse"></span>
            Building SA's Smart Wholesale Layer
          </div>

          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-black tracking-tighter uppercase italic leading-[0.8] text-glow flex flex-col items-center"
            >
              <span className="block text-4xl sm:text-5xl md:text-8xl xl:text-[124px] text-text whitespace-normal md:whitespace-nowrap leading-none">MOVE MORE STOCK.</span>
              <span className="block text-2xl sm:text-3xl md:text-6xl xl:text-[78px] text-primary mt-2">OWN EVERY CUSTOMER.</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-snug font-medium italic"
          >
            Built for South African wholesalers, cash-and-carry businesses, and bulk suppliers. 
            <span className="text-text font-bold decoration-primary/30 underline underline-offset-8"> STOCKUP</span> 
            turns fragmented offline demand into organised digital sales, cleaner operations, and valuable customer ownership.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <button
              onClick={onContactClick}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-[9px] font-black text-lg uppercase italic tracking-tighter shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span className="relative z-10">Start 15-Min Talk</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            
            <button
              onClick={onContactClick}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-card border border-white/10 text-text rounded-[9px] font-black text-lg uppercase italic tracking-tighter hover:bg-white/5 active:scale-95 shadow-sm transition-all duration-300"
            >
              <span className="relative z-10">See Pilot Package</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Custom STOCK Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 relative max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
             {[...Array(16)].map((_, i) => (
               <div key={i} className="aspect-square bg-card border border-white/5 rounded-2xl flex items-center justify-center shadow-sm relative group overflow-hidden">
                  <div className={`w-3/4 h-3/4 rounded-xl flex items-center justify-center transition-all duration-500 ${i % 3 === 0 ? 'bg-primary/5 text-primary' : 'bg-white/5 text-zinc-600'}`}>
                    {i % 4 === 0 ? <Package size={24} /> : i % 4 === 1 ? <Box size={24} /> : i % 4 === 2 ? <ShoppingCart size={24} /> : <Database size={24} />}
                  </div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
               </div>
             ))}
          </div>
          
          {/* Floating Interaction Elements */}
          <div className="absolute -top-12 -left-12 p-6 bg-card border border-white/10 rounded-[20px] shadow-2xl hidden md:block animate-float">
             <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">New Order Inbound</div>
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
                   <Package size={20} />
                </div>
                <div className="text-left leading-none">
                   <div className="text-lg font-black uppercase italic tracking-tighter">120kg Rice</div>
                   <div className="text-[10px] text-text-secondary uppercase tracking-widest">Trader# 4022</div>
                </div>
             </div>
          </div>

          <div className="absolute -bottom-12 -right-12 p-6 bg-card border border-white/10 rounded-[20px] shadow-2xl hidden md:block animate-float" style={{ animationDelay: '1s' }}>
             <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">Database Growth</div>
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
                   <Database size={20} />
                </div>
                <div className="text-left leading-none">
                   <div className="text-lg font-black uppercase italic tracking-tighter">+42 Traders</div>
                   <div className="text-[10px] text-text-secondary uppercase tracking-widest">This Week</div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
