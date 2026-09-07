
import React from 'react';
import SectionWrapper from './SectionWrapper';
import { ArrowUpRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeAboutTeaser: React.FC = () => {
  return (
    <div className="bg-slate-50 py-20 relative overflow-hidden">
        {/* Techy background for the section */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <SectionWrapper>
            <div className="flex flex-col md:flex-row gap-16 items-center">
                <div className="md:w-1/2 z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase mb-6 border border-blue-100">
                        <Zap size={14} /> About The Summit
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                        Shaping the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Indian Leadership</span>
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8">
                        The BharatLead Summit 2026 is a strategic platform where experience meets ambition. Hosted by the LEADS Next-Gen Centre at RUAS, we are uniting changemakers to reshape a future where business success and planetary stewardship are inseparable.
                    </p>
                    <Link to="/about" className="group inline-flex items-center gap-2 text-slate-900 font-bold border-b-2 border-slate-900 hover:text-blue-600 hover:border-blue-600 transition-colors pb-1">
                        Read Our Full Vision <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                
                <div className="md:w-1/2 relative flex justify-center items-center">
                     {/* Premium Photo Container */}
                     <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                        {/* Rotating Rings */}
                        <div className="absolute inset-0 border border-slate-200 rounded-full animate-[spin_20s_linear_infinite]" />
                        <div className="absolute inset-8 border border-dashed border-blue-200 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
                        
                        {/* Glass Card - Updated to fill completely with photo */}
                        <div className="relative z-10 w-72 h-72 sm:w-96 sm:h-96 bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(37,99,235,0.15)] border border-white/60 backdrop-blur-xl flex items-center justify-center overflow-hidden transform hover:scale-105 transition-transform duration-500">
                             {/* Overlay for depth */}
                             <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-60 z-10 pointer-events-none" />
                             
                             {/* Subtle Grid */}
                             <div className="absolute inset-0 bg-grid-slate opacity-[0.1] z-10 pointer-events-none" />

                             <img 
                                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2070" 
                                alt="Bharat Lead Summit Event" 
                                className="w-full h-full object-cover relative z-0"
                             />
                        </div>

                        {/* Floating Elements - Kept for tech feel */}
                        <div className="absolute top-12 right-12 p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-100 animate-float z-20">
                             <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                        </div>
                        <div className="absolute bottom-16 left-12 p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-100 animate-float z-20" style={{ animationDelay: '1s' }}>
                             <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        </div>
                     </div>
                </div>
            </div>
        </SectionWrapper>
    </div>
  );
};

export default HomeAboutTeaser;
