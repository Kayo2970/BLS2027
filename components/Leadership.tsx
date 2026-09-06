import React from 'react';
import SectionWrapper from './SectionWrapper';
import { LEADERSHIP_MESSAGES } from '../constants';
import { Quote, Linkedin, ExternalLink } from 'lucide-react';

const Leadership: React.FC = () => {
  return (
    <div className="bg-slate-50 py-20 scroll-mt-24" id="leadership">
      <SectionWrapper>
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Leadership <span className="text-blue-600">Vision</span></h2>
            <p className="text-slate-500 mt-2">Guidance from the architects of futuristic management education.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {LEADERSHIP_MESSAGES.map((leader, idx) => (
                <div 
                    key={idx} 
                    className="group bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center text-center relative hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:border-blue-100"
                >
                    <Quote className="absolute top-8 left-8 text-blue-50 w-12 h-12 fill-current group-hover:text-blue-100 transition-colors" />
                    
                    <div className="relative w-28 h-28 rounded-[2rem] overflow-hidden mb-6 border-4 border-slate-50 shadow-inner group-hover:rotate-3 transition-transform">
                        <div className="laser-line"></div>
                        <img 
                            src={leader.image} 
                            alt={leader.name} 
                            className="w-full h-full object-cover portrait-grayscale" 
                        />
                    </div>
                    
                    <p className="text-slate-600 italic mb-8 relative z-10 font-light leading-relaxed">
                        "{leader.message}"
                    </p>
                    
                    <div className="mt-auto w-full">
                        <h4 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{leader.name}</h4>
                        <p className="text-xs text-orange-500 font-black uppercase tracking-widest mt-1 mb-6">{leader.role}</p>
                        
                        {leader.linkedin && (
                            <a 
                                href={leader.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-lg"
                            >
                                <Linkedin size={14} /> View LinkedIn <ExternalLink size={10} />
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Leadership;