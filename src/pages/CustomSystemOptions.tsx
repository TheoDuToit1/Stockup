/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight,
  MessageSquare,
  Package,
  ShoppingCart,
  RefreshCw,
  Database,
  Users,
  ClipboardList,
  CreditCard,
  Truck,
  BarChart3,
  Sparkles,
  FileText,
  Gift,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon';
import { communicationGif, engagementGif, ghostGif, layersGif, processingSpeedGif, secureGif } from '../assets/gifs';

interface CustomSystemOptionsProps {
  onContactClick: () => void;
}

export default function CustomSystemOptions({ onContactClick }: CustomSystemOptionsProps) {
  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Hero Section */}
      <section className="relative pt-24 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-card to-bg z-0" />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[calc(30vw)] font-black text-white/[0.02] italic select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap z-0"
        >
          BUILD
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black uppercase italic tracking-tighter leading-[0.85] text-text">
              BUILD THE STOCKUP SYSTEM <br />
              <span className="text-primary">YOUR BUSINESS ACTUALLY NEEDS.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-text-secondary max-w-4xl mx-auto leading-snug font-medium italic">
              Not every wholesaler works the same way. Some need daily specials. Some need buyer messaging. Some need packing slips, payment checks, customer data or delivery control. We help you choose the right pieces and build a system around how your business already sells.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <button
                onClick={onContactClick}
                className="group relative inline-flex items-center gap-4 px-10 py-5 bg-[#25D366] text-white rounded-[9px] font-black text-lg uppercase italic tracking-tighter shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:bg-[#20ba59] active:scale-95 transition-all duration-300"
              >
                <WhatsAppIcon className="w-7 h-7" />
                <span>WhatsApp Call</span>
              </button>
              
              <button
                onClick={onContactClick}
                className="group relative inline-flex items-center gap-4 px-10 py-5 text-text rounded-[9px] font-black text-lg uppercase italic tracking-tighter glass-pill active:scale-95 transition-all duration-300"
              >
                <span>Start With System Options</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>

            <p className="text-sm text-text-secondary font-medium italic pt-4">
              Pilot-first. Built around your products, buyers, staff and daily workflow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Choose What You Need First */}
      <section className="py-0 md:py-0 relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full text-center -translate-y-1/4 text-[calc(25vw)] font-black text-white/[0.03] italic select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap z-0"
        >
          CHOOSE
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black uppercase italic tracking-tighter leading-[0.85] text-text mb-6">
              START WITH THE FEATURES <br />
              <span className="text-primary">THAT WILL HELP YOU MOST.</span>
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto font-medium italic leading-snug">
              Choose the options that will grow your business first, then add more as the system proves itself.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: System Option Cards */}
      <section className="py-12 md:py-24 bg-card border-y border-white/5 relative overflow-hidden">
        <div 
          className="absolute bottom-0 right-0 w-full text-right translate-y-1/4 text-[calc(30vw)] font-black text-white/[0.03] italic select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap z-0"
        >
          OPTIONS
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08 }
              }
            }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Daily Specials",
                desc: "Put your daily or weekly specials into a simple online format buyers can view, message about and order from.",
                icon: <img src={ghostGif} className="w-16 h-16 rounded-lg" alt="Daily Specials" />
              },
              {
                title: "Bulk Offers",
                desc: "Create bulk deals, combo packs, trader offers and upsells that help customers build bigger baskets.",
                icon: <Gift className="w-8 h-8" />
              },
              {
                title: "In-App Messaging",
                desc: "Let shops, traders, resellers and bulk buyers message your store directly inside your own system.",
                icon: <img src={communicationGif} className="w-16 h-16 rounded-lg" alt="Messaging" />
              },
              {
                title: "Customer Baskets",
                desc: "Give buyers a simple way to add products, review their order and send it through clearly.",
                icon: <ShoppingCart className="w-8 h-8" />
              },
              {
                title: "Repeat Orders",
                desc: "Help regular buyers reorder faster from previous baskets, favourite products or common monthly needs.",
                icon: <RefreshCw className="w-8 h-8" />
              },
              {
                title: "Customer Database",
                desc: "Capture buyer names, numbers, areas, customer types, order history and buying patterns.",
                icon: <Database className="w-8 h-8" />
              },
              {
                title: "Buyer Groups",
                desc: "Group buyers by type, area or behaviour, such as spazas, salons, traders, caterers or bulk households.",
                icon: <Users className="w-8 h-8" />
              },
              {
                title: "Staff Workflow",
                desc: "Give your team clear steps for receiving orders, checking payments, packing goods and updating customers.",
                icon: <img src={processingSpeedGif} className="w-16 h-16 rounded-lg" alt="Workflow" />
              },
              {
                title: "Packing Slips",
                desc: "Turn each order into a clean packing slip so staff know what to pick, pack and prepare.",
                icon: <ClipboardList className="w-8 h-8" />
              },
              {
                title: "Payment Checks",
                desc: "Track EFTs, proof of payment, cash on collection and payment status before goods leave the store.",
                icon: <CreditCard className="w-8 h-8" />
              },
              {
                title: "Collection & Delivery",
                desc: "Manage pickup orders, local delivery zones, driver notes and customer updates from one place.",
                icon: <Truck className="w-8 h-8" />
              },
              {
                title: "Sales Dashboard",
                desc: "See daily orders, top products, active buyers, repeat customers, popular areas and specials performance.",
                icon: <BarChart3 className="w-8 h-8" />
              }
            ].map((option, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                whileHover={{ y: -8 }}
                className="group p-8 bg-white/[0.02] border border-white/5 rounded-[32px] transition-all duration-500 hover:bg-white/[0.04] hover:border-primary/30"
              >
                <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  {option.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-text mb-3 leading-tight">
                  {option.title}
                </h3>
                <p className="text-text-secondary text-base leading-snug font-medium italic">
                  {option.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 3: AI Support Options */}
      <section className="py-8 md:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter leading-[0.85] text-text mb-6">
              ADD AI <span className="text-primary">WHERE IT SAVES TIME.</span>
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto font-medium italic leading-snug">
              AI should help your team work faster behind the scenes. It should not make things complicated for your customers.
            </p>
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
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                title: "AI Product Uploads",
                desc: "Turn product lists, brochures or specials into product cards faster.",
                icon: <Sparkles className="w-8 h-8" />
              },
              {
                title: "Promo Message Helper",
                desc: "Create short deal messages for in-app updates, WhatsApp, Facebook or SMS.",
                icon: <FileText className="w-8 h-8" />
              },
              {
                title: "Bundle Ideas",
                desc: "Suggest combo deals and upsells based on products customers already buy together.",
                icon: <Package className="w-8 h-8" />
              },
              {
                title: "Customer Insights",
                desc: "Spot repeat buyers, quiet customers, strong areas and products that deserve more attention.",
                icon: <TrendingUp className="w-8 h-8" />
              }
            ].map((ai, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                whileHover={{ y: -8 }}
                className="group p-8 bg-card border border-white/5 rounded-[32px] transition-all duration-500 hover:bg-white/[0.04] hover:border-primary/30"
              >
                <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  {ai.icon}
                </div>
                <h4 className="text-lg md:text-xl font-black uppercase italic tracking-tighter text-text mb-3 leading-tight">
                  {ai.title}
                </h4>
                <p className="text-text-secondary text-sm leading-snug font-medium italic">
                  {ai.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 4: Build Paths */}
      <section className="py-12 md:py-24 bg-zinc-950 border-y border-white/5 relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-5 pointer-events-none" 
          style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black uppercase italic tracking-tighter leading-[0.85] text-text mb-6">
              THREE SIMPLE <span className="text-primary">WAYS TO START.</span>
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
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Option 1: Specials First",
                subtitle: "Best for wholesalers who mainly want to push daily or weekly deals.",
                includes: [
                  "Daily Specials",
                  "Bulk Offers",
                  "Customer Baskets",
                  "In-App Messaging",
                  "Basic Customer Database"
                ],
                buttonText: "Start With Specials",
                icon: <img src={ghostGif} className="w-20 h-20 rounded-lg" alt="Specials" />
              },
              {
                title: "Option 2: Order Flow First",
                subtitle: "Best for businesses losing time between messages, payment checks, packing and collection.",
                includes: [
                  "Customer Baskets",
                  "Staff Workflow",
                  "Packing Slips",
                  "Payment Checks",
                  "Collection & Delivery"
                ],
                buttonText: "Fix Our Order Flow",
                icon: <img src={processingSpeedGif} className="w-20 h-20 rounded-lg" alt="Order Flow" />
              },
              {
                title: "Option 3: Customer Growth First",
                subtitle: "Best for wholesalers who want to build a stronger repeat-buyer network.",
                includes: [
                  "In-App Messaging",
                  "Customer Database",
                  "Buyer Groups",
                  "Repeat Orders",
                  "Sales Dashboard"
                ],
                buttonText: "Grow Our Buyer Base",
                icon: <img src={engagementGif} className="w-20 h-20 rounded-lg" alt="Growth" />
              }
            ].map((path, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
                whileHover={{ y: -10 }}
                className="group p-8 md:p-10 bg-white/[0.02] border border-white/5 rounded-[40px] transition-all duration-500 hover:bg-white/[0.04] hover:border-primary/30 flex flex-col"
              >
                <div className="w-24 h-24 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-300">
                  {path.icon}
                </div>

                <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-text mb-4 leading-tight">
                  {path.title}
                </h3>
                <p className="text-text-secondary text-base font-medium italic mb-8 leading-snug">
                  {path.subtitle}
                </p>

                <div className="mb-8 flex-1">
                  <p className="text-sm font-black uppercase tracking-wider text-text-secondary mb-4">Includes:</p>
                  <ul className="space-y-3">
                    {path.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-text font-medium italic">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onContactClick}
                  className="w-full px-8 py-4 bg-primary text-white rounded-[9px] font-black uppercase italic tracking-tighter text-sm hover:bg-primary/90 active:scale-95 transition-all duration-300"
                >
                  {path.buttonText}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 5: How We Decide */}
      <section className="py-12 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter leading-[0.85] text-text mb-6">
              WE DO NOT SELL YOU <span className="text-primary">A TEMPLATE.</span>
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto font-medium italic leading-snug">
              We first look at how your business works now. Then we recommend the right first version.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "What products do you sell most often?",
                "Who buys from you regularly?",
                "How do customers place orders now?",
                "Where do orders get lost or delayed?",
                "Do staff need packing slips?",
                "Do you offer collection, delivery or both?",
                "Do you want to push daily specials?",
                "Do you want better customer data?",
                "Do you want to start with one branch or one product group?"
              ].map((question, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex items-start gap-4 p-6 bg-card border border-white/5 rounded-[20px] hover:border-primary/30 transition-all duration-300"
                >
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-text font-medium italic text-lg">{question}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Pilot Section */}
      <section className="py-12 md:py-24 bg-card border-y border-white/5 relative overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[calc(35vw)] font-black text-white/[0.02] italic select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap z-0"
        >
          PILOT
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] text-text mb-6">
              START SMALL. PROVE IT. <br />
              <span className="text-primary">THEN BUILD MORE.</span>
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-4xl mx-auto font-medium italic leading-snug">
              A good StockUp setup can start with selected products, one branch, one buyer group or one daily specials flow. The goal is to prove what your customers will actually use before building too much.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <div className="p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-[40px]">
              <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-text mb-8 leading-tight">
                Pilot can include:
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {[
                  "30 to 50 products",
                  "Selected specials",
                  "Buyer registration",
                  "In-app messaging",
                  "Order baskets",
                  "Staff order view",
                  "Payment status",
                  "Packing slips",
                  "Collection process",
                  "Basic customer database",
                  "Simple dashboard"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-text font-medium italic">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onContactClick}
                className="w-full md:w-auto px-12 py-5 bg-primary text-white rounded-[9px] font-black uppercase italic tracking-tighter text-lg hover:bg-primary/90 active:scale-95 transition-all duration-300"
              >
                Discuss a Pilot Build
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 7: Final CTA */}
      <section className="py-12 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-12"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black uppercase italic tracking-tighter leading-[0.85] text-text">
              READY TO BUILD <br />
              <span className="text-primary">YOUR STOCKUP SYSTEM?</span>
            </h2>
            
            <p className="text-lg md:text-2xl text-text-secondary max-w-4xl mx-auto leading-snug font-medium italic">
              Tell us what type of wholesale business you run and what problem you want to fix first. We will help you choose the right system options and build around your real daily workflow.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <button
                onClick={onContactClick}
                className="group relative inline-flex items-center gap-4 px-12 py-6 bg-[#25D366] text-white rounded-[9px] font-black text-xl uppercase italic tracking-tighter shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:bg-[#20ba59] active:scale-95 transition-all duration-300"
              >
                <WhatsAppIcon className="w-8 h-8" />
                <span>WhatsApp Call</span>
              </button>
              
              <button
                onClick={onContactClick}
                className="group relative inline-flex items-center gap-4 px-12 py-6 text-text rounded-[9px] font-black text-xl uppercase italic tracking-tighter glass-pill active:scale-95 transition-all duration-300"
              >
                <span>Send Us Your System Needs</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>

            <p className="text-sm text-text-secondary font-medium italic pt-8">
              Built for South African wholesalers, cash-and-carry stores, bulk suppliers and local distributors.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
