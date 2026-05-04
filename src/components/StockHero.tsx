"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Package, Database, Tag, Layers, ShoppingBasket, MessageCircle, FileText, CheckCircle, Truck } from "lucide-react";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";
import backgroundImage from "../assets/background.jpeg";

interface StockHeroProps {
  onContactClick: () => void;
}

export default function StockHero({ onContactClick }: StockHeroProps) {
  return (
    <section className="relative pt-32 pb-48 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
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
               { title: "Daily Deals", icon: Tag, color: "text-primary", bg: "bg-primary/10 border border-primary/20" },
               { title: "Bulk Offers", icon: Layers, color: "text-blue-400", bg: "bg-blue-500/10 border border-blue-500/20" },
               { title: "Customer Basket", icon: ShoppingBasket, color: "text-primary", bg: "bg-primary/10 border border-primary/20" },
               { title: "WhatsApp Order", icon: MessageCircle, color: "text-[#25D366]", bg: "bg-[#25D366]/10 border border-[#25D366]/20" },
               { title: "Packing Slip", icon: FileText, color: "text-zinc-400", bg: "bg-white/5 border border-white/10" },
               { title: "Payment Check", icon: CheckCircle, color: "text-primary", bg: "bg-primary/10 border border-primary/20" },
               { title: "Collection / Delivery", icon: Truck, color: "text-blue-400", bg: "bg-blue-500/10 border border-blue-500/20" },
               { title: "Customer Database", icon: Database, color: "text-primary", bg: "bg-primary/10 border border-primary/20" },
             ].map((card, i) => (
               <div key={i} className="aspect-[4/3] bg-card border border-white/5 rounded-2xl flex flex-col items-center justify-center shadow-sm relative group overflow-hidden gap-4 px-2">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${card.bg} ${card.color} group-hover:scale-110 shadow-lg`}>
                    <card.icon size={26} strokeWidth={1.5} />
                  </div>
                  <span className="text-[11px] md:text-[13px] font-black uppercase tracking-wider text-zinc-300 text-center leading-tight px-1">{card.title}</span>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
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
