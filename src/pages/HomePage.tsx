/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  MessageSquare, 
  Smartphone
} from 'lucide-react';

import StockHero from '../components/StockHero';
import { GlobeLive } from '../components/ui/cobe-globe-live';
import { communicationGif, engagementGif, ghostGif, layersGif, processingSpeedGif, secureGif } from '../assets/gifs';

interface HomePageProps {
  onContactClick: () => void;
}

export default function HomePage({ onContactClick }: HomePageProps) {
  return (
    <>
      {/* Replace old hero with new StockHero */}
      <StockHero onContactClick={onContactClick} />

      {/* Section: The Reality of Chaos */}
      <section id="how-it-works" className="py-12 md:py-32 relative overflow-hidden">
        {/* Giant Background Text Mask */}
         <div 
           className="absolute bottom-0 left-0 w-full text-center translate-y-1/4 text-[calc(20vw-2px)] md:text-[calc(15vw-2px)] font-black text-white/[0.03] italic select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap z-0"
         >
           CONTROL
         </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-16 md:mb-32">
             <div className="lg:col-span-5">
                <h2 className="text-[8px] md:text-[60px] lg:text-[70.5px] font-black uppercase italic tracking-tighter text-text leading-[0.75]">
                  KEEP YOUR <br />
                  ORDERS AND <br />
                  <span className="text-green-500">CUSTOMERS</span> <br />
                  <span className="text-blue-500 text-[3px] md:text-[55px] lg:text-[65.5px]">IN ONE PLACE.</span>
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
                  Stop Guessing <br />Customer Demand.
                </p>
                <p className="text-base md:text-lg text-text-secondary font-medium italic leading-snug">
                  You have your own internal messaging system between stores and members, so you don't have to follow WhatsApp restrictions.
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
                 title: "In-App Buying Network", 
                 desc: "Customers, shops and bulk traders can message your store directly inside the app, place orders and ask about specials.",
                 stat: "Daily deals",
                 statLabel: "MORE OFFERS",
                 icon: <img src={communicationGif} className="w-14 h-14 object-cover rounded-xl" alt="In-App Buying Network" />
               },
               { 
                 title: "Control Your Specials", 
                 desc: "Change prices, daily deals, bulk offers and upsells whenever you need to, so customers always see the latest offers.",
                 stat: "Daily deals",
                 statLabel: "Better baskets",
                 icon: <img src={ghostGif} className="w-14 h-14 object-cover rounded-xl" alt="Control Your Specials" />
               },
               { 
                 title: "Clear Staff Roles", 
                 desc: "Know who received the order, who checked payment, who packed it, and who updated the customer.",
                 stat: "Clear steps",
                 statLabel: "Less confusion",
                 icon: <img src={processingSpeedGif} className="w-14 h-14 object-cover rounded-xl" alt="Clear Staff Roles" />
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
                     <span className="text-6xl font-black italic text-white/[0.3] group-hover:text-primary/5 transition-colors">0{i + 1}</span>
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

      {/* Section: The Database Vault */}
      <section className="py-24 md:py-48 bg-card border-y border-white/5 relative overflow-hidden">
        {/* Large Back Decor */}
        <div 
          className="absolute bottom-0 left-0 w-full text-center translate-y-1/4 text-[calc(40vw-2px)] md:text-[calc(25vw-2px)] font-black text-white/[0.05] italic select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap z-0"
        >
           DATA
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-center mb-16 md:mb-24"
           >
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
                 <img src={layersGif} className="w-20 h-20 rounded-lg mb-8" alt="CRM" />
                 <h4 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-text mb-4 leading-none">The CRM <br />for Wholesalers</h4>
                 <p className="text-text-secondary text-lg font-medium italic leading-snug">Transformation is the goal. Map every buyer's area, frequency, and basket size. Turn your traditional business into a data-driven customer asset.</p>
              </motion.div>
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="bg-card p-8 md:p-12 hover:bg-white/[0.02] transition-colors duration-500"
              >
                 <img src={engagementGif} className="w-20 h-20 rounded-lg mb-8" alt="engagement" />
                 <h4 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-text mb-4 leading-none">Drive <br />Repeat Sales</h4>
                 <p className="text-text-secondary text-lg font-medium italic leading-snug">Reactivate dormant customers with targeted promotions and segment-based offers. Make repeat purchasing simple, fast, and predictable.</p>
              </motion.div>
              <motion.div 
                 variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                 className="bg-card p-8 md:p-12 hover:bg-white/[0.02] transition-colors duration-500"
              >
                 <img src={secureGif} className="w-20 h-20 rounded-lg mb-8" alt="secure" />
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
                 <div className="text-4xl md:text-6xl font-black text-text mb-2 italic">30 DAYS</div>
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
      <section className="py-12 md:py-24 relative">
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
                       <img src={communicationGif} className="w-20 h-20 object-cover rounded-lg" alt="In-App Messaging" />
                       <div>
                          <div className="text-lg md:text-xl font-black uppercase italic leading-none mb-1">In-App Messaging</div>
                          <div className="text-[9px] md:text-xs text-text-secondary font-black uppercase tracking-tighter">Direct buyer-to-store chats</div>
                       </div>
                    </div>
                    <div className="aspect-square bg-card border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-white/10 transition-all duration-500">
                       <img src={processingSpeedGif} className="w-20 h-20 object-cover rounded-lg" alt="Daily Specials" />
                       <div>
                          <div className="text-lg md:text-xl font-black uppercase italic leading-none mb-1">Daily Specials</div>
                          <div className="text-[9px] md:text-xs text-text-secondary font-black uppercase tracking-tighter">Push deals and upsells anytime</div>
                       </div>
                    </div>
                    <div className="aspect-square bg-card border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-white/10 transition-all duration-500">
                       <img src={engagementGif} className="w-20 h-20 object-cover rounded-lg" alt="Mobile Friendly" />
                       <div>
                          <div className="text-lg md:text-xl font-black uppercase italic leading-none mb-1">Mobile Friendly</div>
                          <div className="text-[9px] md:text-xs text-text-secondary font-black uppercase tracking-tighter">Easy ordering on any phone</div>
                       </div>
                    </div>
                    <div className="aspect-square bg-card border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-white/10 transition-all duration-500">
                       <img src={layersGif} className="w-20 h-20 object-cover rounded-lg" alt="Collection Ready" />
                       <div>
                          <div className="text-lg md:text-xl font-black uppercase italic leading-none mb-1">Collection Ready</div>
                          <div className="text-[9px] md:text-xs text-text-secondary font-black uppercase tracking-tighter">Built for pickup and local delivery</div>
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
                   className="text-4xl sm:text-5xl md:text-[54px] font-black uppercase italic tracking-tighter text-text leading-[0.85] mb-8"
                 >
                   PERFECT FOR <br />
                   <span className="text-primary">SPAZAS, SALONS & RESELLERS.</span>
                 </motion.h2>
                 <div className="space-y-8">
                    <p className="text-lg text-text-secondary leading-relaxed font-medium italic">
                      StockUp gives your buyers an easier way to see specials, message your store in-app, place repeat orders and arrange collection or delivery. Your team gets a cleaner way to manage the daily rush without relying on scattered chats, paper notes or staff phones.
                    </p>
                    <button onClick={onContactClick} className="group flex items-center gap-4 text-text font-black uppercase italic tracking-tighter text-xl outline-none glass-pill px-8 py-4 rounded-[9px]">
                       See Custom System Options
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
      <section className="py-12 md:py-24 bg-zinc-950 border-t border-white/5 text-text rounded-t-[32px] md:rounded-t-[64px] relative overflow-hidden">
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
                 <span className="text-text">GROW YOUR</span> <br />
                 <span className="text-primary italic">BUYING NETWORK</span>
               </h2>
               <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-medium italic">Give spazas, salons, resellers, traders and regular buyers a simpler way to see deals, order again and stay connected to your store.</p>
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
                 { t: "Wholesalers", d: "Put your daily specials, repeat products and customer orders into one cleaner system.", i: <img src={layersGif} className="w-16 h-16 rounded-md" alt="layers" /> },
                 { t: "Cash & Carry", d: "Help walk-ins, phone buyers and regular traders order faster and come back easier.", i: <img src={communicationGif} className="w-16 h-16 rounded-md" alt="comm" /> },
                 { t: "Bulk Suppliers", d: "Give shops, salons, caterers and resellers a simple way to buy more often.", i: <img src={processingSpeedGif} className="w-16 h-16 rounded-md" alt="speed" /> },
                 { t: "Distributors", d: "See which customers, areas and product groups are driving demand.", i: <img src={engagementGif} className="w-16 h-16 rounded-md" alt="engagement" /> }
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
                    <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary mb-8 shadow-inner shadow-primary/5">
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
      <section className="py-4 md:py-12 text-center relative overflow-hidden bg-bg">
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl sm:text-5xl md:text-9xl hero-text mb-12 italic tracking-tighter text-text leading-[0.85]">
              <span className="text-text">SMARTER</span> <span className="text-primary">SYSTEM.</span>
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-medium italic mb-12">
              We help you build a custom StockUp setup for your products, buyers, staff flow and collection or delivery process.
            </p>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center">
               <button onClick={onContactClick} className="w-full md:w-auto h-20 md:h-28 px-10 md:px-16 bg-[#25D366] text-white rounded-[9px] font-black uppercase italic tracking-tighter text-xl md:text-3xl shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:bg-[#20ba59] active:scale-95 transition-all duration-300 flex items-center gap-4">
                  <MessageSquare size={32} />
                  WhatsApp Call
               </button>
               <button onClick={onContactClick} className="w-full md:w-auto h-20 md:h-28 px-10 md:px-16 text-text rounded-[9px] font-black uppercase italic tracking-tighter text-xl md:text-3xl glass-pill active:scale-95 transition-all duration-300 flex items-center gap-4">
                  <Smartphone size={32} />
                  Request a Pilot
               </button>
            </div>
         </div>
      </section>
    </>
  );
}
