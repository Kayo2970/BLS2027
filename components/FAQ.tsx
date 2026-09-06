
import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { FAQ_DATA } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQItem: React.FC<{ item: typeof FAQ_DATA[0], isOpen: boolean, toggle: () => void }> = ({ item, isOpen, toggle }) => {
  return (
    <div className={`mb-4 overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? 'bg-white border-blue-200 shadow-lg' : 'bg-white/50 border-slate-100 hover:border-slate-300'}`}>
      <button 
        onClick={toggle}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-800 group-hover:text-blue-500'}`}>
          {item.question}
        </span>
        <div className={`p-2 rounded-xl transition-all duration-300 ${isOpen ? 'bg-blue-600 text-white rotate-0' : 'bg-slate-100 text-slate-500 rotate-90'}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="px-6 pb-6 pt-0 border-t border-slate-50">
              <p className="text-slate-600 leading-relaxed pt-4">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-slate-50 py-24 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-grid-slate opacity-30 pointer-events-none" />
        
        <SectionWrapper id="faq">
            <div className="text-center mb-16 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
                    <HelpCircle size={14} className="text-blue-500" /> Information Hub
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Frequently Asked <span className="text-blue-600">Questions</span></h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                    Everything you need to know about the Bharat Lead Summit 2026.
                </p>
            </div>

            <div className="max-w-3xl mx-auto relative z-10">
                {FAQ_DATA.map((item, idx) => (
                    <FAQItem 
                        key={idx} 
                        item={item} 
                        isOpen={openIndex === idx} 
                        toggle={() => setOpenIndex(openIndex === idx ? null : idx)} 
                    />
                ))}
            </div>

            <div className="text-center mt-12 relative z-10">
                <p className="text-slate-500 text-sm">
                    Still have questions? <Link to="/contact" className="text-blue-600 font-bold hover:underline">Get in touch with our team</Link>
                </p>
            </div>
        </SectionWrapper>
    </div>
  );
};

export default FAQ;
