/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  CheckCircle2,
  Zap
} from 'lucide-react';

import HomePage from './pages/HomePage';
import CustomSystemOptions from './pages/CustomSystemOptions';
import { CinematicFooter } from './components/ui/motion-footer';
import { WhatsAppIcon } from "./components/ui/WhatsAppIcon";

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
    primary: "bg-primary text-white glass-pill",
    secondary: "text-text glass-pill",
    outline: "text-text glass-pill",
    whatsapp: "bg-[#25D366] text-white border-none shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:bg-[#20ba59]"
  };

  return (
    <button id={id} onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

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
            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-text">WhatsApp Chat</h3>
            <p className="text-text-secondary mb-6 text-sm font-medium italic">Let's talk about how STOCKUP can fix your inventory chaos.</p>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-black text-text-secondary mb-1">Company Name</label>
                <input type="text" required className="w-full p-4 bg-white/5 border border-white/10 text-text rounded-[9px] focus:outline-none focus:border-primary transition-colors font-bold uppercase placeholder:text-white/10 text-sm" placeholder="CAPE TOWN DISTRIBUTORS" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-black text-text-secondary mb-1">Email Address</label>
                <input type="email" required className="w-full p-4 bg-white/5 border border-white/10 text-text rounded-[9px] focus:outline-none focus:border-primary transition-colors font-bold placeholder:text-white/10 text-sm" placeholder="trader@wholesaler.co.za" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-black text-text-secondary mb-1">Mobile Number</label>
                <input type="tel" required className="w-full p-4 bg-white/5 border border-white/10 text-text rounded-[9px] focus:outline-none focus:border-primary transition-colors font-bold placeholder:text-white/10 text-sm" placeholder="082 123 4567" />
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
            <p className="text-text-secondary mb-8 font-medium italic">You will be called within 24 hours.</p>
            <Button onClick={onClose} variant="secondary" className="w-full h-16 text-text">Close</Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

function Navigation({ openWhatsApp }: { openWhatsApp: () => void }) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary h-8 w-8 rounded-[4px] flex items-center justify-center font-bold text-xl text-white">S</div>
          <span className="text-2xl font-black tracking-tighter uppercase italic underline decoration-primary underline-offset-4 text-text">STOCKUP</span>
        </Link>
        <div className="hidden lg:flex items-center gap-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary font-black">South Africa • POPIA Compliant</span>
          <Button onClick={() => navigate('/custom-system-options')} variant="outline" className="h-10 py-0 px-6 text-xs transform hover:scale-105 shadow-sm">Custom system options</Button>
          <Button onClick={openWhatsApp} variant="whatsapp" className="h-10 py-0 px-6 text-xs transform hover:scale-105">
            <WhatsAppIcon className="w-6 h-6" />
            WhatsApp Call
          </Button>
        </div>
        <button onClick={openWhatsApp} className="lg:hidden bg-[#25D366] text-white w-10 h-10 rounded-[9px] flex items-center justify-center shadow-[0_0_15px_rgba(37,211,102,0.3)]">
          <Zap size={20} fill="white" />
        </button>
      </div>
    </header>
  );
}

export default function AppWithRouting() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openWhatsApp = () => window.open('https://wa.me/27714329190', '_blank');

  return (
    <BrowserRouter>
      <div className="min-h-screen selection:bg-primary/20 bg-bg text-text font-sans overflow-x-hidden">
        {/* 
          MAIN CONTENT AREA 
          High z-index and background to allow the footer reveal underneath
        */}
        <div className="relative z-10 w-full bg-bg border-b border-white/5 rounded-b-[64px] shadow-2xl">
          {/* Navigation */}
          <Navigation openWhatsApp={openWhatsApp} />

          <main className="pt-20">
            <Routes>
              <Route path="/" element={<HomePage onContactClick={openWhatsApp} />} />
              <Route path="/custom-system-options" element={<CustomSystemOptions onContactClick={openWhatsApp} />} />
            </Routes>
          </main>
        </div>

        <CinematicFooter />

        {/* Contact Modal */}
        <ContactModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </BrowserRouter>
  );
}
