

import React from 'react';
import { PARTNERS } from '../constants';

interface PartnersProps {
    showCollaborators?: boolean;
    className?: string;
    id?: string;
}

const Partners: React.FC<PartnersProps> = ({ showCollaborators = true, className = "", id }) => {
  // Quadruple the list to ensure no gaps on wide screens during animation loop
  const marqueeList = [...PARTNERS.industry, ...PARTNERS.industry, ...PARTNERS.industry, ...PARTNERS.industry];

  return (
    <div id={id} className={`bg-white border-b border-slate-100 py-10 overflow-hidden scroll-mt-24 ${className}`}>
      
      {showCollaborators && (
        <div className="max-w-7xl mx-auto px-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-sm text-slate-500 font-semibold uppercase tracking-wider shrink-0">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                In Collaboration With
            </div>
            
            <div className="flex gap-4 md:gap-8 items-center flex-wrap justify-center md:justify-end">
                {/* Collaborators */}
                {PARTNERS.collaborators.map((c, i) => (
                    <div key={i} className="group relative h-20 md:h-24 w-40 md:w-48 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-1 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer overflow-hidden">
                        <img 
                          src={c.logo} 
                          alt={c.name} 
                          className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-90 group-hover:opacity-100 p-1" 
                          onError={(e) => {
                            // Fallback if image missing
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                                e.currentTarget.style.display = 'none';
                                parent.innerText = c.name;
                                parent.className += ' text-[10px] text-center font-bold text-slate-600 leading-tight p-2';
                            }
                          }}
                        />
                    </div>
                ))}
                
                <div className="hidden md:block w-px h-12 bg-slate-200 mx-2"></div>
                
                {/* Media Partner */}
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden lg:block">Media Partner</span>
                    <div className="group relative h-16 md:h-20 w-32 md:w-40 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-2 shadow-sm hover:shadow-md hover:border-red-200 transition-all cursor-pointer">
                        <img 
                          src={PARTNERS.media.logo} 
                          alt={PARTNERS.media.name} 
                          className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100"
                          onError={(e) => {
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                                e.currentTarget.style.display = 'none';
                                parent.innerText = PARTNERS.media.name;
                                parent.className += ' text-[10px] text-center font-bold text-slate-600 leading-tight p-2';
                            }
                          }}
                        />
                    </div>
                </div>
            </div>
        </div>
      )}

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 md:gap-16 py-4">
          {marqueeList.map((partner, idx) => (
            <span 
                key={idx} 
                className="text-2xl md:text-3xl font-bold text-slate-300 hover:text-slate-800 transition-colors uppercase font-mono tracking-tighter"
            >
                {partner}
            </span>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-8 md:gap-16 py-4">
          {marqueeList.map((partner, idx) => (
            <span 
                key={idx} 
                className="text-2xl md:text-3xl font-bold text-slate-300 hover:text-slate-800 transition-colors uppercase font-mono tracking-tighter"
            >
                {partner}
            </span>
          ))}
        </div>
      </div>
      
      <style>{`
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 60s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
};

export default Partners;