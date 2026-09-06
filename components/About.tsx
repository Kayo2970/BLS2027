

import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { Target, Eye, Globe, Zap, ShieldCheck, Activity, ChevronRight, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'centre' | 'summit'>('centre');

  return (
    <div className="bg-white py-24 relative overflow-hidden">
        {/* Techy Background Elements - Light Theme */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-blue-100/60 to-transparent rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-cyan-100/60 to-transparent rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/4" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-grid-slate opacity-[0.05] pointer-events-none" />

        <SectionWrapper id="about" className="relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
                
                {/* Content Side (Tabs) */}
                <div className="lg:w-1/2 relative z-10">
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 backdrop-blur-md mb-6 shadow-sm">
                             <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                             <span className="text-xs font-bold tracking-widest uppercase text-blue-700">Organization Profile</span>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-6">
                            Shaping the <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-800">Future of Leadership</span>
                        </h2>
                    </div>

                    {/* Tech Tab Switcher */}
                    <div className="flex p-1 bg-slate-100/80 rounded-xl border border-slate-200 mb-8 w-fit relative">
                        <button 
                            onClick={() => setActiveTab('centre')}
                            className={`relative px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'centre' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {activeTab === 'centre' && (
                                <motion.div layoutId="tab-bg" className="absolute inset-0 bg-white shadow-sm border border-slate-100 rounded-lg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                            )}
                            <span className="relative z-10">LEADS Next-Gen Centre</span>
                        </button>
                        <button 
                            onClick={() => setActiveTab('summit')}
                            className={`relative px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'summit' ? 'text-orange-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {activeTab === 'summit' && (
                                <motion.div layoutId="tab-bg" className="absolute inset-0 bg-white shadow-sm border border-slate-100 rounded-lg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                            )}
                            <span className="relative z-10">Bharat Lead Summit</span>
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[300px]">
                        <AnimatePresence mode="wait">
                            {activeTab === 'centre' ? (
                                <motion.div
                                    key="centre"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                            <Layers size={20} />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800">About LEADS Next-Gen Centre</h3>
                                    </div>
                                    <p className="text-slate-600 text-lg leading-relaxed">
                                        The Centre for Leadership Empowering Attitude Development for Sustainability is a premier, student-led initiative at RUAS, strategically evolved from the E-Cell to foster multidisciplinary leadership and a sustainability mindset. 
                                    </p>
                                    <p className="text-slate-600 text-lg leading-relaxed">
                                        LEADS empowers students through experiential learning, ethical mentorship, and industry-aligned projects. Our mission is to cultivate future-ready leaders who are equipped to drive meaningful, sustainable impact across all sectors, redefining success through purposeful action and collaborative innovation.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="summit"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                            <Globe size={20} />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800">About Bharat Lead Summit</h3>
                                    </div>
                                    <p className="text-slate-600 text-lg leading-relaxed">
                                        The BharatLead Summit 2026 by the LEADS Next-Gen Centre at RUAS is a strategic platform that prepares emerging executives for a resource-conscious global economy.
                                    </p>
                                    <p className="text-slate-600 text-lg leading-relaxed">
                                        Bringing together industry leaders, policymakers, academics, and student innovators, the Summit focuses on practical strategies for building sustainable and scalable businesses. Through roundtables, real-world innovation challenges, and industry keynotes, participants learn to turn market pressures into opportunities and design responsible, future-ready enterprises.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Tech Visuals Side - Sticky on Desktop */}
                <div className="lg:w-1/2 w-full relative lg:sticky lg:top-32">
                    <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square">
                        
                        {/* Decorative Rings */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-blue-100 rounded-full animate-[spin_30s_linear_infinite]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-cyan-100 rounded-full animate-[spin_20s_linear_infinite_reverse]" />

                        {/* Main Tech Card Cluster */}
                        <div className="grid grid-cols-2 gap-4 h-full relative z-10 p-4">
                            
                            {/* Vision Card */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-2xl shadow-slate-200/50 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                                    <Eye size={120} />
                                </div>
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 mb-4">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Our Vision</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
                                        Reshaping Bharat's Future
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
                                        To empower future leaders to be purpose-driven, ethical changemakers who champion sustainable innovation and shape an equitable, resilient future.
                                    </p>
                                </div>
                                {/* Tech Scanline */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-0 group-hover:opacity-100 animate-scan" />
                            </motion.div>

                            {/* Mission Card */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 hover:border-blue-300 transition-colors flex flex-col justify-between group"
                            >
                                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Target className="text-orange-500 w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Mission</h3>
                                    <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                        To empower future leaders through experiential learning, ethical mentorship, and sustainability-driven action for purposeful and impactful leadership.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Interactive Data Card */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-[2rem] border border-blue-500/50 relative overflow-hidden group cursor-pointer hover:shadow-[0_10px_30px_rgba(37,99,235,0.4)] transition-all"
                            >
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                     <div className="flex justify-between items-start">
                                        <Activity className="text-white/80 w-6 h-6" />
                                        <span className="text-[10px] font-bold bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-white">GOAL</span>
                                     </div>
                                     <div>
                                        <div className="text-3xl font-bold text-white mb-1">100+</div>
                                        <p className="text-blue-100 text-xs font-medium">Delegates Expected</p>
                                     </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    </div>
  );
};

export default About;
