import React from 'react';
import SectionWrapper from './SectionWrapper';
import { HIGHLIGHTS } from '../constants';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HighlightsProps {
    limit?: number;
    showTitle?: boolean;
}

const Highlights: React.FC<HighlightsProps> = ({ limit, showTitle = true }) => {
  const displayHighlights = limit ? HIGHLIGHTS.slice(0, limit) : HIGHLIGHTS;

  return (
    <div className="bg-white py-24 relative">
        <div className="absolute inset-0 bg-grid-slate opacity-50" />
        
        <SectionWrapper id="highlights" className="relative z-10">
            {showTitle && (
                <div className="text-center mb-20">
                    <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-2 block">Why Attend</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Summit <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Highlights</span></h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        Experience high-impact discourse, innovation challenges, and actionable strategies designed for the next generation of leaders.
                    </p>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayHighlights.map((item, idx) => (
                <div 
                    key={idx}
                    className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                >
                    <div className={`w-14 h-14 rounded-2xl ${item.color.replace('bg-', 'bg-').replace('500', '100')} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className={`w-7 h-7 ${item.color.replace('bg-', 'text-')}`} />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed mb-6">
                        {item.description}
                    </p>

                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-auto">
                        <div className={`h-full ${item.color} w-0 group-hover:w-full transition-all duration-500`} />
                    </div>
                </div>
                ))}
            </div>

            {limit && (
                <div className="text-center mt-12">
                    <Link to="/summit" className="inline-flex items-center gap-2 font-bold text-slate-900 hover:text-blue-600 transition-colors">
                        View All Highlights <ArrowRight size={18} />
                    </Link>
                </div>
            )}
        </SectionWrapper>
    </div>
  );
};

export default Highlights;