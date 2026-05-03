/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  BarChart3, 
  Truck, 
  Users, 
  UserMinus,
  Zap, 
  Smartphone,
  Phone,
  Store,
  TrendingUp,
  ShieldCheck,
  Database,
  Package,
  ShoppingCart,
  CheckCircle,
  Clock,
  Box
} from 'lucide-react';

import StockHero from './components/StockHero';
import { GlobeLive } from './components/ui/cobe-globe-live';
import { CinematicFooter } from './components/ui/motion-footer';
import StockMetricChart from "./components/StockMetricChart";

// --- Components ---

export const Button = ({ children, onClick, variant = 'primary', className = '', id }: { 
  children: React.ReactNode, 
  onClick?: () => void, 
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp',
  className?: string,
  id?: string,
  key?: React.Key
}) => {
  const baseStyles = "px-8 py-4 rounded-[9px] font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-tight active:scale-95 whitespace-nowrap";
  const variants = {
    primary: "bg-primary text-white hover:bg-blue-700 shadow-xl shadow-primary/20",
    secondary: "bg-card border border-white/10 text-text hover:bg-white/5",
    outline: "border border-white/10 bg-transparent hover:bg-white/5 text-text",
    whatsapp: "bg-[#2563EB] text-white hover:opacity-90 rounded-[9px]"
  };

  return (
    <button id={id} onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, centered = true }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    <h2 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase italic tracking-tighter mb-4 md:mb-6 leading-[0.9] text-text">
      {title}
    </h2>
    {subtitle && <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-snug lg:ml-0 font-medium italic">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = '', id }: { children: React.ReactNode, className?: string, id?: string, key?: React.Key }) => (
  <div id={id} className={`card-light p-8 ${className}`}>
    {children}
  </div>
);

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-card border border-white/10 rounded-[24px] w-full max-w-md p-8 relative shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-text-secondary hover:text-text transition-colors"
        >
          <Zap className="rotate-45" size={20} />
        </button>

        {!submitted ? (
          <>
            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-text">Book Talk</h3>
            <p className="text-text-secondary mb-6 text-sm font-medium italic">Let's talk about how STOCKUP can fix your inventory chaos.</p>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-black text-text-secondary mb-2">Company Name</label>
                <input type="text" required className="w-full p-4 bg-white/5 border border-white/10 text-text rounded-[9px] focus:outline-none focus:border-primary transition-colors font-bold uppercase placeholder:text-white/10" placeholder="CAPE TOWN DISTRIBUTORS" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-black text-text-secondary mb-2">Mobile Number</label>
                <input type="tel" required className="w-full p-4 bg-white/5 border border-white/10 text-text rounded-[9px] focus:outline-none focus:border-primary transition-colors font-bold placeholder:text-white/10" placeholder="082 123 4567" />
              </div>
              <Button className="w-full mt-4 h-16">Submit Request</Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-[9px] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-text">Confirmed</h3>
            <p className="text-text-secondary mb-8 font-medium italic">We'll contact you within 24 hours.</p>
            <Button onClick={onClose} variant="secondary" className="w-full h-16 text-text">Close</Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen selection:bg-primary/20 bg-bg text-text font-sans overflow-x-hidden">
      {/* 
        MAIN CONTENT AREA 
        High z-index and background to allow the footer reveal underneath
      */}
      <div className="relative z-10 w-full bg-bg border-b border-white/5 rounded-b-[64px] shadow-2xl">
        {/* Navigation */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-bg/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary h-8 w-8 rounded-[4px] flex items-center justify-center font-bold text-xl text-white">S</div>
            <span className="text-2xl font-black tracking-tighter uppercase italic underline decoration-primary underline-offset-4 text-text">STOCKUP</span>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary font-black">South Africa • POPIA Compliant</span>
            <Button onClick={openModal} variant="outline" className="h-10 py-0 px-6 text-xs transform hover:scale-105 shadow-sm">Request Pilot</Button>
            <Button onClick={openModal} className="h-10 py-0 px-6 text-xs shadow-none transform hover:scale-105">Book Talk</Button>
          </div>
          <button onClick={openModal} className="lg:hidden text-text-secondary">
            <Zap size={24} />
          </button>
        </div>
      </header>

      <main className="pt-20">
        {/* Replace old hero with new StockHero */}
        <StockHero onContactClick={openModal} />

        {/* Section: The Reality of Chaos */}
        <section id="how-it-works" className="py-24 md:py-64 relative overflow-hidden">
          {/* Giant Background Text Mask */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 text-[40vw] md:text-[25vw] font-black text-white/[0.03] italic select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap z-0"
          >
            LEAKING
          </motion.div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-16 md:mb-32">
               <div className="lg:col-span-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 text-red-500 text-[10px] font-black uppercase tracking-widest mb-6 rounded-[4px] border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-[4px] bg-red-500 animate-pulse"></span>
                    Revenue Leak Active
                  </div>
                  <h2 className="text-4xl md:text-7xl lg:text-[100px] font-black uppercase italic tracking-tighter text-text leading-[0.75]">
                    ORDER <br />
                    CONTROL <br />
                    <span className="text-primary">IS THE</span> <br />
                    <span className="text-white/5">PRIORITY.</span>
                  </h2>
               </div>

               <div className="lg:col-span-4 relative flex justify-center">
                  <div className="w-full max-w-[300px] md:max-w-[450px] relative">
                    <div className="absolute inset-0 bg-primary/20 blur-[80px] md:blur-[100px] rounded-full opacity-20" />
                    <GlobeLive className="w-full relative z-10 opacity-80" />
                  </div>
               </div>

               <div className="lg:col-span-3 pb-8">
                  <p className="text-xl md:text-3xl text-text font-black uppercase italic tracking-tighter leading-none mb-4 md:mb-6">
                    Stop Guessing <br />Your Demand.
                  </p>
                  <p className="text-base md:text-lg text-text-secondary font-medium italic leading-snug">
                    Fragmented sales channels like WhatsApp voice notes and manual counter sales create missed details and delays. StockUp centralises offline demand into one clear system.
                  </p>
               </div>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
              className="grid lg:grid-cols-3 gap-8"
            >
               {[
                 { 
                   title: "Order Chaos", 
                   desc: "Centralise WhatsApp messages, screenshots, and phone orders into one digital system. Reduce mistakes, delays, and lost revenue.",
                   stat: "99%",
                   statLabel: "Clarity",
                   icon: <MessageSquare size={32} />
                 },
                 { 
                   title: "Ghost Users", 
                   desc: "Convert anonymous transactions into real customer data. Capture names, numbers, and suburbs to build a valuable repeat-buying database.",
                   stat: "100%",
                   statLabel: "Ownership",
                   icon: <UserMinus size={32} />
                 },
                 { 
                   title: "Staff Lag", 
                   desc: "Clear workflows for packing, collection, and delivery eliminate internal confusion. Professionalize every step from basket to completion.",
                   stat: "5 Sec",
                   statLabel: "Capture",
                   icon: <Clock size={32} />
                 }
               ].map((item, i) => (
                 <motion.div 
                   key={i} 
                   variants={{
                     hidden: { opacity: 0, y: 30 },
                     show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                   }}
                   whileHover={{ y: -10 }}
                   className="group relative h-full flex flex-col p-6 md:p-10 bg-white/[0.02] border border-white/5 rounded-[32px] md:rounded-[40px] transition-all duration-500 hover:bg-white/[0.04] hover:border-primary/30"
                 >
                    <div className="flex items-start justify-between mb-12">
                       <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary group-hover:text-primary group-hover:border-primary/20 transition-all duration-500">
                          {item.icon}
                       </div>
                       <span className="text-6xl font-black italic text-white/[0.02] group-hover:text-primary/5 transition-colors">0{i + 1}</span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-text mb-4 md:mb-6 leading-none">
                        {item.title}
                      </h3>
                      <p className="text-lg md:text-xl text-text-secondary font-medium italic mb-8 md:mb-12 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-auto pt-8 md:pt-10 border-t border-white/5 flex items-end gap-5">
                       <div className="text-4xl md:text-5xl font-black italic tracking-tighter text-text group-hover:text-primary transition-colors">
                         {item.stat}
                       </div>
                       <div className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-2">
                         {item.statLabel}
                       </div>
                    </div>
                 </motion.div>
               ))}
             </motion.div>
           </div>
        </section>

        {/* Section: The Stockup Conversion (The Order) */}
        <section className="py-24 md:py-48 bg-zinc-900 rounded-[32px] md:rounded-[64px] mx-4 relative overflow-hidden group">
           {/* Grid Pattern */}
           <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
                style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
           
           {/* Giant Background Text Mask */}
           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: "-50%" }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 text-[40vw] md:text-[25vw] font-black text-white/[0.03] italic select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap z-0"
           >
             SCALING
           </motion.div>

           <div className="max-w-7xl mx-auto px-6 relative z-10">
              <StockMetricChart />
           </div>
        </section>

        {/* Section: The Database Vault */}
        <section className="py-24 md:py-48 bg-card border-y border-white/5 relative overflow-hidden">
          {/* Large Back Decor */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 text-[40vw] md:text-[25vw] font-black text-white/[0.03] italic select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap z-0"
          >
             DATA
          </motion.div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
             <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="text-center mb-16 md:mb-24"
             >
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Core Revenue Driver</div>
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black uppercase italic tracking-tighter text-text leading-none">
                  OWN THE <span className="text-primary">TRADER.</span>
                </h2>
             </motion.div>

             <motion.div 
               initial="hidden"
               whileInView="show"
               viewport={{ once: true }}
               variants={{
                 hidden: { opacity: 0 },
                 show: {
                   opacity: 1,
                   transition: { staggerChildren: 0.1 }
                 }
               }}
               className="grid lg:grid-cols-3 gap-1px bg-white/5 border border-white/5 rounded-[32px] overflow-hidden shadow-2xl"
             >
                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  className="bg-card p-8 md:p-12 hover:bg-white/[0.02] transition-colors duration-500"
                >
                   <Database className="text-primary mb-8" size={48} />
                   <h4 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-text mb-4 leading-none">The CRM <br />for Wholesalers</h4>
                   <p className="text-text-secondary text-lg font-medium italic leading-snug">Transformation is the goal. Map every buyer's area, frequency, and basket size. Turn your traditional business into a data-driven customer asset.</p>
                </motion.div>
                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  className="bg-card p-8 md:p-12 hover:bg-white/[0.02] transition-colors duration-500"
                >
                   <TrendingUp className="text-primary mb-8" size={48} />
                   <h4 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-text mb-4 leading-none">Drive <br />Repeat Sales</h4>
                   <p className="text-text-secondary text-lg font-medium italic leading-snug">Reactivate dormant customers with targeted promotions and segment-based offers. Make repeat purchasing simple, fast, and predictable.</p>
                </motion.div>
                <motion.div 
                   variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                   className="bg-card p-8 md:p-12 hover:bg-white/[0.02] transition-colors duration-500"
                >
                   <ShieldCheck className="text-primary mb-8" size={48} />
                   <h4 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-text mb-4 leading-none">Market <br />Realities</h4>
                   <p className="text-text-secondary text-lg font-medium italic leading-snug">Built specifically for South Africa. From proof-of-payment culture to POPIA-aware customer data handling—we design for how you trade.</p>
                </motion.div>
             </motion.div>

             <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 border-t border-white/5 pt-12">
                <div className="text-center">
                   <div className="text-4xl md:text-6xl font-black text-text mb-2 italic">92%</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Database Accuracy</div>
                </div>
                <div className="text-center">
                   <div className="text-4xl md:text-6xl font-black text-text mb-2 italic">3.4x</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Order Speed</div>
                </div>
                <div className="text-center">
                   <div className="text-4xl md:text-6xl font-black text-text mb-2 italic">14m</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Setup to Live</div>
                </div>
                <div className="text-center">
                   <div className="text-4xl md:text-6xl font-black text-text mb-2 italic">100%</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Data Ownership</div>
                </div>
             </div>
          </div>
        </section>

        {/* Section: South African Reality */}
        <section className="py-24 md:py-48 relative">
          <div className="max-w-7xl mx-auto px-6">
             <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                 <motion.div 
                   initial="hidden"
                   whileInView="show"
                   viewport={{ once: true }}
                   variants={{
                     hidden: { opacity: 0 },
                     show: {
                       opacity: 1,
                       transition: { staggerChildren: 0.1 }
                     }
                   }}
                   className="order-2 lg:order-1"
                 >
                   <div className="grid grid-cols-2 gap-4">
                      <div className="aspect-square bg-card border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-white/10 transition-all duration-500">
                         <Smartphone className="text-primary" size={32} md:size={40} />
                         <div>
                            <div className="text-lg md:text-xl font-black uppercase italic leading-none mb-1">WhatsApp First</div>
                            <div className="text-[9px] md:text-xs text-text-secondary font-black uppercase tracking-tighter">Designed for mobile buyers</div>
                         </div>
                      </div>
                      <div className="aspect-square bg-card border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-white/10 transition-all duration-500">
                         <Zap className="text-primary" size={32} md:size={40} />
                         <div>
                            <div className="text-lg md:text-xl font-black uppercase italic leading-none mb-1">DATA SAVVY</div>
                            <div className="text-[9px] md:text-xs text-text-secondary font-black uppercase tracking-tighter">&lt; 2MB per basket</div>
                         </div>
                      </div>
                      <div className="aspect-square bg-card border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-white/10 transition-all duration-500">
                         <MessageSquare className="text-primary" size={32} md:size={40} />
                         <div>
                            <div className="text-lg md:text-xl font-black uppercase italic leading-none mb-1">WhatsApp</div>
                            <div className="text-[9px] md:text-xs text-text-secondary font-black uppercase tracking-tighter">EFT & Cash focus</div>
                         </div>
                      </div>
                      <div className="aspect-square bg-card border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-white/10 transition-all duration-500">
                         <Truck className="text-primary" size={32} md:size={40} />
                         <div>
                            <div className="text-lg md:text-xl font-black uppercase italic leading-none mb-1">Collection</div>
                            <div className="text-[9px] md:text-xs text-text-secondary font-black uppercase tracking-tighter">Flexible logistics models</div>
                         </div>
                      </div>
                   </div>
                </motion.div>
                 <div className="order-1 lg:order-2">
                   <motion.h2 
                     initial={{ opacity: 0, x: 30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8 }}
                     className="text-4xl sm:text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-text leading-[0.85] mb-8"
                   >
                     BUILT FOR <br />
                     <span className="text-primary">SOUTH AFRICA.</span>
                   </motion.h2>
                   <div className="space-y-8">
                      <p className="text-2xl text-text-secondary font-medium italic underline decoration-zinc-200 underline-offset-8">
                        Designed for spaza, salon, reseller, and community trade networks.
                      </p>
                      <p className="text-lg text-text-secondary leading-relaxed font-medium italic">
                        We don't build "tech startup" apps. We build practical tools that respect real South African market realities—from data-sensitive users to cash-on-collection preferences. StockUp is built for the ground.
                      </p>
                      <button onClick={openModal} className="group flex items-center gap-4 text-text font-black uppercase italic tracking-tighter text-xl outline-none">
                         Explore the pilot program 
                         <div className="w-12 h-12 bg-primary rounded-[9px] flex items-center justify-center text-white group-hover:translate-x-2 transition-transform duration-300">
                            <ArrowRight size={24} />
                         </div>
                      </button>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Section: Industrial Scale */}
        <section className="py-24 md:py-48 bg-zinc-950 border-t border-white/5 text-text rounded-t-[32px] md:rounded-t-[64px] relative overflow-hidden">
           {/* Grid Background Overlay for dark section */}
           <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" 
                style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

           <div className="max-w-7xl mx-auto px-6 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-16 md:mb-32"
              >
                 <h2 className="text-4xl sm:text-5xl md:text-8xl lg:text-[140px] font-black uppercase italic tracking-tighter leading-[0.8] mb-8">
                   SCALE YOUR <br />
                   <span className="text-primary italic">CHANNEL.</span>
                 </h2>
                 <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-medium italic">Whether you are a wholesaler, cash-and-carry, or bulk distributor—we provide the engine for growth.</p>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                 {[
                   { t: "Wholesalers", d: "Turn offline demand into digital growth.", i: <Package size={28} /> },
                   { t: "Cash & Carry", d: "Manage walk-ins and phone orders centrally.", i: <Users size={28} /> },
                   { t: "Bulk Suppliers", d: "Efficient ordering for regular traders.", i: <CheckCircle2 size={28} /> },
                   { t: "Distributors", d: "Track areas, suburbs, and purchase patterns.", i: <Box size={28} /> }
                 ].map((ind, i) => (
                   <motion.div 
                     key={i} 
                     variants={{
                       hidden: { opacity: 0, y: 20 },
                       show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                     }}
                     whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.04)" }}
                     className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] transition-all duration-300"
                   >
                      <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary mb-8 shadow-inner shadow-primary/5">
                         {ind.i}
                      </div>
                      <h4 className="text-xl font-black uppercase italic tracking-tighter mb-3 text-text leading-tight">
                        {ind.t}
                      </h4>
                      <p className="text-text-secondary text-sm leading-snug font-medium italic opacity-70 group-hover:opacity-100 transition-opacity">
                        {ind.d}
                      </p>
                   </motion.div>
                ))}
              </motion.div>
           </div>
        </section>

        {/* Final CTA Overlay */}
        <section className="py-32 md:py-64 text-center relative overflow-hidden bg-bg">
           <div className="max-w-7xl mx-auto px-6 relative z-10">
              <h2 className="text-4xl sm:text-5xl md:text-9xl hero-text mb-12 italic tracking-tighter text-text leading-[0.85]">
                RECLAIM YOUR <br /><span className="text-primary underline decoration-white/10 underline-offset-[20px]">GROWTH ASSET.</span>
              </h2>
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center">
                 <button onClick={openModal} className="w-full md:w-auto h-20 md:h-28 px-10 md:px-16 bg-primary text-white rounded-[9px] font-black uppercase italic tracking-tighter text-xl md:text-3xl shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300">
                   Start Pilot 2026
                 </button>
                 <button onClick={openModal} className="w-full md:w-auto h-20 md:h-28 px-10 md:px-16 bg-card border-2 border-white/10 text-text rounded-[9px] font-black uppercase italic tracking-tighter text-xl md:text-3xl hover:bg-white/5 active:scale-95 transition-all duration-300 shadow-sm">
                   Get Pricing
                 </button>
              </div>
              <div className="mt-16 flex items-center justify-center gap-8 text-text-secondary text-sm font-black uppercase tracking-widest italic">
                 <span>Limited pilot slots available</span>
                 <div className="w-2 h-2 bg-primary rounded-[4px] animate-pulse"></div>
                 <span>S.A Focus Only</span>
              </div>
           </div>
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 text-[25vw] font-black text-white/[0.03] italic select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap">
             STOCKUP
           </div>
        </section>
      </main>
    </div>

    <CinematicFooter />

      {/* FAB */}
      <div className="fixed bottom-8 right-8 z-50">
           <motion.button
              onClick={openModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white w-14 h-14 rounded-[9px] shadow-xl shadow-primary/30 flex items-center justify-center cursor-pointer"
           >
             < Zap fill="white" size={24} />
             <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-[4px] flex items-center justify-center text-[8px] font-bold">1</span>
           </motion.button>
      </div>

      <AnimatePresence>
        <ContactModal isOpen={isModalOpen} onClose={closeModal} />
      </AnimatePresence>
    </div>
  );
}
