
import React from 'react';
import SectionWrapper from './SectionWrapper';
import { PAST_INITIATIVES, ADDITIONAL_INITIATIVES } from '../constants';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

const PastInitiativesContent: React.FC = () => {
  return (
    <div id="past-initiatives" className="bg-white py-24 relative overflow-hidden scroll-mt-24">
      {/* Background Tech Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[120px] opacity-60 pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-50 rounded-full blur-[100px] opacity-60 pointer-events-none translate-y-1/2 -translate-x-1/4" />
      <div className="absolute inset-0 bg-grid-slate opacity-[0.03] pointer-events-none" />

      <SectionWrapper>
        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Past <span className="text-blue-600">Initiatives</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                A legacy of impactful events shaping the discourse on innovation and leadership.
            </p>
        </div>

        {/* Featured Gallery Grid Layout - Full Image Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {PAST_INITIATIVES.map((initiative, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[450px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-default"
            >
              {/* Full Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={initiative.image} 
                  alt={initiative.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/1e293b/cbd5e1?text=Event+Image';
                  }}
                />
                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end relative z-10">
                <div className="absolute top-6 left-6">
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-widest shadow-lg">
                      <Calendar size={12} /> {initiative.year}
                   </div>
                </div>

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-bold text-white leading-tight mb-3 group-hover:text-blue-300 transition-colors">
                        {initiative.title}
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                        {initiative.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <span className="w-8 h-0.5 bg-blue-400"></span>
                        Event Highlights
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Initiatives List */}
        <div className="relative z-10">
            <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-4">
                    <span className="w-12 h-px bg-slate-300"></span>
                    And More Impactful Events
                    <span className="w-12 h-px bg-slate-300"></span>
                </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {ADDITIONAL_INITIATIVES.map((item, idx) => (
                 <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center font-semibold text-slate-600 hover:bg-white hover:border-blue-200 hover:shadow-lg hover:text-blue-600 transition-all duration-300 cursor-default flex items-center justify-center gap-2 group"
                 >
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors" />
                    <span className="text-sm md:text-base">{item}</span>
                 </motion.div>
              ))}
            </div>
        </div>

      </SectionWrapper>
    </div>
  );
};

export default PastInitiativesContent;
