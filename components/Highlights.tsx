import React from 'react';
import SectionWrapper from './SectionWrapper';
import { HIGHLIGHTS } from '../constants';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HighlightsProps {
    limit?: number;
    showTitle?: boolean;
}

const Highlights: React.FC<HighlightsProps> = ({ limit, showTitle = true }) => {
  const displayHighlights = limit ? HIGHLIGHTS.slice(0, limit) : HIGHLIGHTS;

  return (
    <section className="bg-slate-50 py-20 relative">
        <div className="absolute inset-0 bg-grid-slate opacity-40 pointer-events-none" />
        
        <SectionWrapper id="highlights" className="relative z-10">
            {showTitle && (
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                        Summit <span className="text-gradient">Highlights</span>
                    </h2>
                    <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
                        High-impact discourse, innovation challenges, and actionable strategies designed for visionary leaders.
                    </p>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayHighlights.map((item, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    className="group glass-card rounded-2xl p-7 flex flex-col items-start text-left border border-slate-200/80 relative overflow-hidden"
                >
                    <div className={`w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300`}>
                        <item.icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                        {item.description}
                    </p>

                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-auto">
                        <div className={`h-full ${item.color} w-0 group-hover:w-full transition-all duration-500`} />
                    </div>
                </motion.div>
                ))}
            </div>

            {limit && (
                <div className="text-center mt-12">
                    <Link to="/summit" className="inline-flex items-center gap-2 font-bold text-slate-900 hover:text-blue-600 transition-colors btn-tactile text-sm">
                        View All Highlights <ArrowRight size={16} />
                    </Link>
                </div>
            )}
        </SectionWrapper>
    </section>
  );
};

export default Highlights;