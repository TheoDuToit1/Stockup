"use client";

import React from "react";
import { motion } from "framer-motion";
import { DotGlobeHero } from "./ui/globe-hero";
import { ArrowRight, MessageSquare, Smartphone } from "lucide-react";
import { Button } from "../App"; // Importing the basic Button from App for consistency

export default function StockupGlobeHero({ onContactClick }: { onContactClick: () => void }) {
  return (
    <DotGlobeHero
      rotationSpeed={0.003}
      className="bg-bg-dark relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-bg-dark/30" />
      
      <div className="relative z-10 text-center space-y-6 max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-black tracking-tighter leading-[0.82] uppercase italic hero-text text-glow"
            >
              <span className="block text-5xl md:text-8xl xl:text-[108px] text-white whitespace-nowrap">MOVE MORE STOCK.</span>
              <span className="block text-3xl md:text-6xl xl:text-[72px] text-primary mt-2">KNOW MORE CUSTOMERS.</span>
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-zinc-400 leading-snug font-medium italic">
              You have your own internal messaging system between stores and members, so you don't have to follow WhatsApp restrictions. <span className="text-white underline decoration-primary/40 underline-offset-8">STOCKUP</span> turns your order chaos into a professional digital asset. Capture every trader and grow your database with every sale.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
        >
          <button
            onClick={onContactClick}
            className="group relative inline-flex items-center gap-3 px-10 py-5 text-white rounded-[9px] font-black text-lg uppercase italic tracking-tighter glass-pill active:scale-95 transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10">Book Discovery Call</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
          
          <button
            onClick={onContactClick}
            className="group relative inline-flex items-center gap-3 px-10 py-5 text-white rounded-[9px] font-black text-lg uppercase italic tracking-tighter glass-pill active:scale-95 transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10">Request a Pilot</span>
          </button>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 1.2 }}
           className="flex flex-wrap justify-center gap-x-12 gap-y-6 pt-16"
        >
           <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Smartphone size={24} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Low Data</span>
                <span className="text-lg font-bold text-white tracking-tight italic">Works on 3G</span>
              </div>
           </div>
           <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <MessageSquare size={24} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Direct Comms</span>
                <span className="text-lg font-bold text-white tracking-tight italic">Internal Chat</span>
              </div>
           </div>
        </motion.div>
      </div>
    </DotGlobeHero>
  );
}
