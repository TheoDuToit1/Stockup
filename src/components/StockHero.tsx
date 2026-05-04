"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Package, Database } from "lucide-react";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";

import {
  hbgDataUrl as hbg,
  c1DataUrl as c1,
  c2DataUrl as c2,
  c3DataUrl as c3,
  c4DataUrl as c4,
  c5DataUrl as c5,
  c6DataUrl as c6,
  c7DataUrl as c7,
  c8DataUrl as c8
} from "../assets/image-data";

interface StockHeroProps {
  onContactClick: () => void;
}

export default function StockHero({ onContactClick }: StockHeroProps) {
  return (
    <section className="relative pt-32 pb-48 overflow-hidden">
      <img
        src={hbg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        onError={(e) => console.error("Failed to load hero background image:", e.currentTarget.src)}
      />
      <div className="absolute inset-0 bg-black/80 z-0" />
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-black tracking-tighter uppercase italic leading-[0.8] text-glow flex flex-col items-center"
            >
              <span className="block text-[13.5px] sm:text-[25.5px] md:text-[73.5px] xl:text-[101.5px] text-text whitespace-normal md:whitespace-nowrap leading-none">WHOLESALE SUCCESS IN 2026.</span>
              <span className="block text-2xl sm:text-3xl md:text-6xl xl:text-[78px] text-primary mt-2">STARTS WITH SMARTER SYSTEMS.</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[18.5px] md:text-[22.5px] text-text-secondary max-w-4xl mx-auto leading-snug font-medium italic"
          >
            Every special becomes a smarter order. Every order grows your customer database.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8"
          >
            <button
              onClick={onContactClick}
              className="group relative inline-flex items-center gap-5 px-10 py-5 bg-[#25D366] text-white rounded-[9px] font-black text-lg uppercase italic tracking-tighter shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:bg-[#20ba59] active:scale-95 transition-all duration-300"
            >
              <WhatsAppIcon className="relative z-10 w-9 h-9" />
              <span className="relative z-10">Discuss YOUR CUSTOM BUILD</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            
            <button
              onClick={onContactClick}
              className="group relative inline-flex items-center gap-5 px-10 py-5 text-text rounded-[9px] font-black text-lg uppercase italic tracking-tighter glass-pill active:scale-95 transition-all duration-300"
            >
              <span className="relative z-10">Custom system Options</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Custom STOCK Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-28 relative max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { title: "Daily Deals", img: c1 },
               { title: "Bulk Offers", img: c2 },
               { title: "Customer Basket", img: c3 },
               { title: "WhatsApp Order", img: c4 },
               { title: "Packing Slip", img: c5 },
               { title: "Payment Check", img: c6 },
               { title: "Collection / Delivery", img: c7 },
               { title: "Customer Database", img: c8 },
             ].map((card, i) => (
               <div key={i} className="aspect-[4/3] bg-card border border-white/5 rounded-2xl flex flex-col items-center justify-center shadow-sm relative group overflow-hidden px-2">
                  {card.img && (
                    <img
                      src={card.img}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105" 
                      onError={(e) => console.error(`Failed to load card image for ${card.title}:`, e.currentTarget.src)}
                    />
                  )}
                  {card.img && <div className="absolute inset-0 bg-black/50 z-0 transition-opacity duration-300 group-hover:bg-black/60" />}
                  <span className="relative z-10 text-[11px] md:text-[13px] font-black uppercase tracking-wider text-white text-center leading-tight px-1 drop-shadow-md">{card.title}</span>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 z-20 pointer-events-none" />
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
