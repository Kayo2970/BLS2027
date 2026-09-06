import React from 'react';
import SectionWrapper from './SectionWrapper';
import { LEGACY_STATS } from '../constants';

const Legacy: React.FC = () => {
  return (
    <div className="bg-slate-900 py-16 text-white relative overflow-hidden scroll-mt-24" id="legacy">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        
        <SectionWrapper>
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                <h2 className="text-3xl font-bold tracking-tight">Our <span className="text-blue-400">Legacy</span></h2>
                <div className="h-px bg-slate-700 flex-grow mx-8 hidden md:block"></div>
                <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">Past Initiatives</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-slate-800 pt-8">
                {LEGACY_STATS.map((stat, idx) => (
                    <div key={idx} className="text-center group">
                        <div className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors">
                            <span className="text-blue-600 text-lg align-top mr-1 opacity-50">#</span>{stat.count}
                        </div>
                        <p className="text-xs text-slate-400 leading-snug group-hover:text-white transition-colors">
                            {stat.event}
                        </p>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    </div>
  );
};

export default Legacy;