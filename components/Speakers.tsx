
import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import { SPEAKERS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, User, Quote, ExternalLink } from 'lucide-react';
import { useLocation } from 'react-router-dom';

type Tab = 'governing' | 'corporate' | 'academic';

const Speakers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('governing');
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#speakers-governing') setActiveTab('governing');
    if (location.hash === '#speakers-corporate') setActiveTab('corporate');
    if (location.hash === '#speakers-academic') setActiveTab('academic');
  }, [location.hash]);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'governing', label: 'Governing Council' },
    { id: 'corporate', label: 'Corporate Advisory' },
    { id: 'academic', label: 'Academic Advisory' },
  ];

  return (
    <div className="bg-slate-50 py-24 border-y border-slate-200">
        <SectionWrapper id="speakers">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Visionary <span className="text-blue-600">Leaders</span></h2>
                <p className="text-slate-600 max-w-xl text-lg">
                    Honored to have guidance from senior leaders across government, corporate, and academic sectors.
                </p>
            </div>
            
            {/* Styled Tabs */}
            <div className="bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm inline-flex flex-wrap gap-1">
                {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                    activeTab === tab.id
                        ? 'bg-slate-900 text-white shadow-lg'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                >
                    {tab.label}
                </button>
                ))}
            </div>
        </div>

        {/* Grid with min-height to prevent jumping */}
        <div className="min-h-[600px] md:min-h-[450px]">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {SPEAKERS[activeTab].map((speaker, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group relative bg-white rounded-3xl p-8 border border-slate-200 hover:border-blue-400 hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] transition-all duration-500 flex flex-col items-center text-center h-full overflow-hidden"
                        >
                            {/* Techy Background Accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100%] group-hover:bg-blue-50 transition-colors duration-500 -z-0" />
                            
                            <div className="relative z-10 flex flex-col items-center justify-center mb-8">
                                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-xl mb-4">
                                    <div className="laser-line"></div>
                                    {speaker.image ? (
                                        <img 
                                            src={speaker.image} 
                                            alt={speaker.name} 
                                            className="w-full h-full object-cover portrait-grayscale" 
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center portrait-grayscale">
                                            <User className="text-slate-300 w-10 h-10" />
                                        </div>
                                    )}
                                </div>
                                <Quote className="text-blue-50 w-10 h-10 fill-current group-hover:text-blue-100 transition-colors absolute top-0 right-0 -mr-12 -mt-4 opacity-50" />
                            </div>
                            
                            <div className="relative z-10 mt-auto flex flex-col items-center">
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{speaker.name}</h3>
                                <p className="text-xs font-black text-orange-500 mt-1 uppercase tracking-widest">{speaker.title}</p>
                                <div className="h-px w-8 bg-slate-200 my-4 group-hover:w-full group-hover:bg-blue-100 transition-all duration-500"></div>
                                <p className="text-sm text-slate-500 leading-relaxed italic line-clamp-2">"{speaker.role}"</p>
                            </div>

                            <div className="relative z-10 mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Verified Profile</span>
                                {speaker.linkedin ? (
                                    <a 
                                        href={speaker.linkedin} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                    >
                                        <Linkedin size={14} /> Profile <ExternalLink size={10} />
                                    </a>
                                ) : (
                                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                                        Private <Linkedin size={14} className="opacity-30" />
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
        </SectionWrapper>
    </div>
  );
};

export default Speakers;
