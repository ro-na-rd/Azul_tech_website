import React from "react";
import { ArrowRight, Play, BookOpen } from "lucide-react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function MasterBento() {
  return (
    <section id="stack" className="section-navy relative overflow-hidden pt-32 pb-20">
      {/* Background Decorative patterns */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px] -mr-48 -mt-48" />
      
      <div className="container-editorial relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="bento-grid-main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[240px]"
        >
          
          {/* Card 1: Headline */}
          <motion.div 
            variants={itemVariants}
            className="bento-item-entrance lg:col-span-2 lg:row-span-1 flex flex-col justify-end p-8 bg-white/5 border border-white/10 rounded-xl group cursor-pointer hover:bg-white/10 transition-all"
          >
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Sovereign infrastructure for <br />
              <span className="text-gradient-brand">Digital Sovereignty.</span>
            </h1>
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-blue group-hover:bg-brand-blue transition-all">
              <ArrowRight size={20} className="text-white" />
            </div>
          </motion.div>

          {/* Card 2: Featured (TALL) */}
          <motion.div 
            variants={itemVariants}
            className="bento-item-entrance lg:col-span-1 lg:row-span-2 relative overflow-hidden rounded-xl group cursor-pointer"
          >
            <img 
              src="/Users/macbookpro/.gemini/antigravity/brain/81500446-7c4b-41b2-be29-4e952c5c9c36/azul_leadership_featured_1776764869570.png" 
              alt="Featured Leader" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight via-brand-midnight/20 to-transparent p-8 flex flex-col justify-end">
              <div className="text-[10px] font-technical text-brand-blue uppercase tracking-widest mb-2 font-bold">The Specification</div>
              <h3 className="text-xl font-serif font-bold text-white leading-snug group-hover:text-brand-blue transition-colors">
                A reference architecture is the specification every subsequent implementation must conform to.
              </h3>
            </div>
          </motion.div>

          {/* Card 3: Report Cover */}
          <motion.div 
            variants={itemVariants}
            className="bento-item-entrance lg:col-span-1 lg:row-span-1 bg-slate-800 flex items-center justify-center p-8 rounded-xl group cursor-pointer"
          >
            <div className="w-full h-full border-2 border-white/10 flex flex-col p-4 bg-slate-900 rounded-lg group-hover:border-brand-blue transition-colors relative overflow-hidden shadow-2xl rotate-3 group-hover:rotate-0 transform duration-300">
               <div className="text-[8px] font-technical text-brand-blue mb-1">REFERENCE STACK</div>
               <div className="text-lg font-bold text-white font-serif leading-tight">AZUL STACK</div>
               <div className="mt-auto text-[8px] text-muted">Five integrated layers.</div>
               <BookOpen size={16} className="absolute bottom-4 right-4 text-brand-blue opacity-50" />
            </div>
          </motion.div>

          {/* Card 4: Video Card */}
          <motion.div 
            variants={itemVariants}
            className="bento-item-entrance lg:col-span-1 lg:row-span-1 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e5381bb7e?auto=format&fit=crop&q=80')] bg-cover opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
               <div className="flex items-center gap-2 mb-3">
                 <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center">
                   <Play size={12} fill="white" className="text-white ml-0.5" />
                 </div>
                 <span className="text-[10px] font-technical text-white uppercase tracking-widest">Architecture Briefing</span>
               </div>
               <h4 className="text-sm font-bold text-white leading-tight">Understanding the Sovereign Identity layer</h4>
            </div>
          </motion.div>

          {/* Card 5: Pattern Card */}
          <motion.div 
            variants={itemVariants}
            className="bento-item-entrance lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 p-6 rounded-xl flex flex-col justify-end group cursor-pointer"
          >
              <div className="w-10 h-10 rounded-full bg-pink-500/20 mb-4 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-pink-500" />
              </div>
              <h4 className="text-sm font-bold text-white">Compound layers. Zero re-platforming over time.</h4>
          </motion.div>

          {/* Card 6: Blue Pattern */}
          <motion.div 
            variants={itemVariants}
            className="bento-item-entrance lg:col-span-1 lg:row-span-1 bg-brand-midnight border border-white/10 p-6 rounded-xl relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-blue via-transparent to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end">
               <h4 className="text-sm font-bold text-white">Targeting 10 Sovereign Deployments by 2030.</h4>
            </div>
          </motion.div>

          {/* Card 7: Actions */}
          <motion.div 
            variants={itemVariants}
            className="bento-item-entrance lg:col-span-2 lg:row-span-1 flex flex-col p-8 bg-brand-blue border border-white/10 rounded-xl shadow-2xl shadow-brand-blue/20 group cursor-pointer"
          >
            <h3 className="text-xl font-bold text-white mb-2 font-serif transition-all">Request an architecture briefing</h3>
            <p className="text-sm text-white/80 mb-6 max-w-sm">We operate in the space between policy intent and system reality.</p>
            <div className="mt-auto">
               <a href="#contact" className="inline-flex items-center gap-2 font-technical text-[10px] uppercase tracking-widest text-white border-b border-white/40 pb-1 hover:border-white transition-colors">
                  Contact our strategy team
                  <ArrowRight size={12} />
               </a>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
