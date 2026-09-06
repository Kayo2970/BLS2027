
import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import { SUMMIT_SCHEDULE, BROCHURE_URL } from '../constants';
import { Sparkles, Calendar, ChevronRight, Clock, ExternalLink, Users, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Agenda: React.FC = () => {
  const [activeDay, setActiveDay] = useState<'day1' | 'day2'>('day1');
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#agenda-day1') setActiveDay('day1');
    if (location.hash === '#agenda-day2') setActiveDay('day2');
  }, [location.hash]);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedSession(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-white py-24 relative overflow-hidden" id="agenda">
        {/* Decorative elements */}
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-x-1/2 pointer-events-none" />
        <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 translate-x-1/2 pointer-events-none" />
        
        <SectionWrapper>
            <div className="flex flex-col lg:flex-row gap-16">
                {/* Left Side: Static Info */}
                <div className="lg:w-1/3 space-y-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase mb-6 shadow-sm border border-indigo-100">
                            <Sparkles size={14} /> Knowledge Sessions
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            Summit <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Schedule</span>
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            A meticulously curated two-day journey designed to bridge the gap between academic brilliance and industrial excellence.
                        </p>
                    </div>

                    {/* Day Selector Tabs */}
                    <div className="relative p-1 bg-slate-100 rounded-2xl flex items-center border border-slate-200">
                        {['day1', 'day2'].map((day) => (
                            <button
                                key={day}
                                onClick={() => setActiveDay(day as any)}
                                className={`flex-1 py-4 text-sm font-bold rounded-xl transition-all relative z-10 ${
                                    activeDay === day ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
                                }`}
                            >
                                {day === 'day1' ? 'Day 01 - April 10' : 'Day 02 - April 11'}
                                {activeDay === day && (
                                    <motion.div 
                                        layoutId="activeDayTab"
                                        className="absolute inset-0 bg-white rounded-xl shadow-lg border border-slate-200 -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
                        <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                            <Calendar size={18} /> Venue Details
                        </h4>
                        <p className="text-sm text-blue-700 leading-relaxed">
                            University House, New BEL Rd, M S R Nagar, Mathikere, Bengaluru, Karnataka 560054
                        </p>
                    </div>
                </div>

                {/* Right Side: Dynamic Schedule Timeline */}
                <div className="lg:w-2/3">
                    <div className="relative">
                        {/* Vertical Timeline Line */}
                        <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200 md:left-1/2 md:-translate-x-px"></div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeDay}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8 relative z-10"
                            >
                                {SUMMIT_SCHEDULE[activeDay].map((item, idx) => {
                                    // Cast item to any to access optional link property safely
                                    const itemWithLink = item as any;
                                    const hasSpeakers = itemWithLink.speakers && itemWithLink.speakers.length > 0;
                                    const hasModerator = !!itemWithLink.moderator;
                                    
                                    return (
                                    <div 
                                        key={idx} 
                                        className={`flex flex-col md:flex-row gap-6 md:gap-0 items-center md:items-start group ${
                                            idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                                        }`}
                                    >
                                        {/* Time Indicator */}
                                        <div className="w-full md:w-1/2 flex justify-center md:justify-start px-8">
                                            <div className={`
                                                flex items-center gap-3 py-2 px-4 rounded-full bg-white border border-slate-200 shadow-sm transition-all group-hover:border-blue-300 group-hover:shadow-md
                                                ${idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}
                                            `}>
                                                <Clock size={14} className="text-blue-500" />
                                                <span className="text-sm font-bold text-slate-700">{item.time}</span>
                                            </div>
                                        </div>

                                        {/* Timeline Node */}
                                        <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-blue-600 md:-translate-x-2 shadow-[0_0_0_4px_rgba(37,99,235,0.1)] group-hover:scale-125 transition-transform z-20"></div>

                                        {/* Event Card */}
                                        <div className="w-full md:w-1/2 px-8">
                                            {itemWithLink.link ? (
                                                <a 
                                                    href={itemWithLink.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all relative"
                                                >
                                                    <div className="absolute top-4 right-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <ExternalLink size={16} />
                                                    </div>
                                                    <div className="flex items-center gap-4 mb-2">
                                                        <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                                                            <item.icon size={20} />
                                                        </div>
                                                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                                                            {item.event}
                                                        </h3>
                                                    </div>
                                                    <p className="text-sm text-slate-500 leading-relaxed ml-12">
                                                        Engagement session with industry experts and interactive networking.
                                                    </p>
                                                </a>
                                            ) : (
                                                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all">
                                                    <div className="flex items-center gap-4 mb-2">
                                                        <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                                                            <item.icon size={20} />
                                                        </div>
                                                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                                                            {item.event}
                                                        </h3>
                                                    </div>
                                                    
                                                    {(hasSpeakers || hasModerator) && (
                                                        <div className="ml-12 mt-4">
                                                            <button 
                                                                onClick={() => setSelectedSession(itemWithLink)}
                                                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors"
                                                            >
                                                                <Users size={16} />
                                                                View Speakers
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )})}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-12 text-center">
                        <a 
                          href={BROCHURE_URL} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-blue-600 transition-all shadow-xl group"
                        >
                            Download Complete PDF Brochure <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </SectionWrapper>

        {/* Speakers Modal */}
        <AnimatePresence>
            {selectedSession && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedSession(null)}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />
                    <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-3">
                                    <Clock size={14} /> {selectedSession.time}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">{selectedSession.event}</h3>
                            </div>
                            <button 
                                onClick={() => setSelectedSession(null)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors flex-shrink-0"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto">
                            {selectedSession.moderator && (
                                <div className="mb-8">
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Moderator</h4>
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                                        <div className="w-16 h-16 rounded-full bg-indigo-200 overflow-hidden flex-shrink-0 flex items-center justify-center border-2 border-white shadow-sm">
                                            {selectedSession.moderator.image ? (
                                                <img src={selectedSession.moderator.image} alt={selectedSession.moderator.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <User size={24} className="text-indigo-400" />
                                            )}
                                        </div>
                                        <div>
                                            <h5 className={`text-lg font-bold ${!selectedSession.moderator.confirmed ? 'text-slate-500' : 'text-slate-900'}`}>
                                                {selectedSession.moderator.name}
                                                {!selectedSession.moderator.confirmed && <span className="ml-2 text-xs font-normal px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">TBA</span>}
                                            </h5>
                                            <p className="text-indigo-700 font-medium text-sm">{selectedSession.moderator.role}</p>
                                            {selectedSession.moderator.company && <p className="text-slate-500 text-sm">{selectedSession.moderator.company}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedSession.speakers && selectedSession.speakers.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Speakers & Panelists</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {selectedSession.speakers.map((speaker: any, idx: number) => (
                                            <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all bg-white">
                                                <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center border-2 border-white shadow-sm">
                                                    {speaker.image ? (
                                                        <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User size={20} className="text-slate-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h5 className={`font-bold ${!speaker.confirmed ? 'text-slate-500' : 'text-slate-900'}`}>
                                                        {speaker.name}
                                                        {!speaker.confirmed && <span className="ml-2 text-[10px] font-normal px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full inline-block mt-1">TBA</span>}
                                                    </h5>
                                                    {speaker.role && <p className="text-blue-600 font-medium text-xs mt-0.5">{speaker.role}</p>}
                                                    {speaker.company && <p className="text-slate-500 text-xs mt-0.5">{speaker.company}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default Agenda;
