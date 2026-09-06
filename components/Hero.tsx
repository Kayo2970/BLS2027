
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, Play, X, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SHOWREEL_EMBED_URL, LOGO_URL } from '../constants';

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center bg-white/80 backdrop-blur-md border border-slate-100 shadow-xl shadow-blue-500/5 p-2 rounded-xl w-14 xs:w-16 sm:w-20 md:w-24 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
    <div className="absolute top-0 right-0 w-8 h-8 bg-blue-100 rounded-full -mr-4 -mt-4 blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
    
    <div className="relative h-6 sm:h-8 w-full overflow-hidden flex justify-center items-center mb-1">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: "50%", opacity: 0, scale: 0.5 }}
          animate={{ y: "0%", opacity: 1, scale: 1 }}
          exit={{ y: "-50%", opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute text-lg xs:text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tabular-nums"
        >
          {value < 10 ? `0${value}` : value}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="text-[7px] xs:text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
  </div>
);

const TirangaBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-slate-50">
    {/* 1. Premium Diagonal Gradients */}
    <div className="absolute inset-[-25%] w-[150%] h-[150%] md:inset-[-50%] md:w-[200%] md:h-[200%] rotate-[-15deg] md:rotate-[-45deg] flex flex-col justify-center opacity-90 md:opacity-60">
        
        {/* Saffron Layer - Lighter, vibrant saffron */}
        <motion.div 
            className="flex-1 bg-gradient-to-b from-orange-500 via-orange-300 to-transparent blur-[60px] md:blur-[120px] will-change-transform"
            animate={{ 
                scaleY: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* White Layer - Pure and clean */}
        <motion.div 
            className="flex-1 bg-white/90 blur-[50px] md:blur-[100px] will-change-transform"
            animate={{ 
                scale: [1, 1.05, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Green Layer - Deep Emerald */}
        <motion.div 
            className="flex-1 bg-gradient-to-t from-emerald-700 via-emerald-500 to-transparent blur-[60px] md:blur-[120px] will-change-transform"
            animate={{ 
                scaleY: [1, 1.1, 1],
                opacity: [0.7, 0.9, 0.7]
            }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
    </div>

    {/* 2. The Requested Square Grid Overlay - Crisp and Technical */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    
    {/* 3. Subtle Noise Texture for Premium Feel */}
    <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

    {/* 4. Soft White Overlay for Text Readability */}
    <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
  </div>
);

const VideoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                    <X size={24} />
                </button>
                <div className="w-full h-full flex items-center justify-center text-white">
                     <iframe 
                        width="100%" 
                        height="100%" 
                        src={SHOWREEL_EMBED_URL}
                        title="Bharat Lead Summit 2026 Showreel" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isEventStarted, setIsEventStarted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Scroll Handler to hide logo when scrolling down
    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
    };
    
    // Check initial position
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    
    // Countdown Timer
    const targetDate = new Date('2026-04-10T09:00:00+05:30').getTime();
    const calculate = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setIsEventStarted(false);
      } else {
        setIsEventStarted(true);
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        clearInterval(interval);
    };
  }, []);

  return (
    <>
    <VideoModal isOpen={showVideo} onClose={() => setShowVideo(false)} />
    <header id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-24 md:pt-32 pb-16 md:pb-20">
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        <div className="absolute inset-0 bg-grid-slate [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        
        {/* Animated Blobs - Replaced with Tiranga Background */}
        <TirangaBackground />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Desktop Logo Badge (Left Side) - Hides on Scroll */}
        <motion.div 
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            animate={scrolled 
                ? { opacity: 0, x: -100, pointerEvents: 'none' } 
                : { opacity: 1, x: 0, pointerEvents: 'auto' }
            }
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute top-4 left-4 lg:top-8 lg:left-8 hidden md:block z-30"
        >
             <div className="bg-white/80 backdrop-blur-xl w-32 h-32 lg:w-48 lg:h-48 p-4 rounded-[2rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.12)] transition-all duration-500 group transform hover:scale-105 flex items-center justify-center">
                 {/* Inner border decoration */}
                 <div className="absolute inset-2 border border-dashed border-slate-200 rounded-[1.5rem] pointer-events-none" />
                 
                 <img 
                    src={LOGO_URL} 
                    alt="Bharat Lead Summit Logo" 
                    className="w-full h-full object-contain relative z-10" 
                 />
                 
                 {/* Tech Corner Accents */}
                 <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
        </motion.div>

        {/* Top Right Logo: LEADS Next Gen Centre */}
        <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, pointerEvents: 'auto' }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
            className="absolute top-4 right-4 lg:top-8 lg:right-8 hidden md:flex flex-col items-center gap-2 z-30"
        >
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Organized By</span>
             <div className="bg-white/80 backdrop-blur-xl w-32 h-32 lg:w-48 lg:h-48 p-4 rounded-[2rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.12)] transition-all duration-500 group transform hover:scale-105 flex items-center justify-center text-center">
                 <div className="absolute inset-2 border border-dashed border-slate-200 rounded-[1.5rem] pointer-events-none" />
                 <img src="/images/partners/leads-logo.webp" alt="LEADS Next Gen Centre" className="w-full h-full object-contain relative z-10 p-4" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.classList.remove('hidden'); }} />
                 <span className="font-bold text-slate-700 text-sm relative z-10 hidden">LEADS Next Gen Centre</span>
                 <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
        </motion.div>



        {/* Centered Content Wrapper */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            
            {/* 1. EYEBROW BADGE */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/80 shadow-sm mb-4"
            >
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                <span className="text-slate-700 text-[11px] font-extrabold tracking-wider uppercase">LEADS NEXT GEN CENTRE · RUAS BANGALORE</span>
            </motion.div>

            {/* 2. INNOVATION CHALLENGE ANNOUNCEMENT */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="mb-6"
            >
                <Link to="/register" className="cursor-pointer group">
                    <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-300/80 shadow-sm bg-emerald-50/80 hover:bg-emerald-100/80 transition-all btn-tactile">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                        </span>
                        <span className="text-xs font-bold text-emerald-900 tracking-wide">Registrations Open · Bharat Innovation Challenge</span>
                    </div>
                </Link>
            </motion.div>

            {/* 3. MAIN TITLE (Max 2 lines on desktop) */}
            <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 mb-4 leading-[1.02]"
            >
                BHARAT <span className="text-gradient">LEAD SUMMIT</span> 2026
            </motion.h1>

            {/* 4. SUBTITLE (Max 20 words) */}
            <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 font-normal leading-relaxed max-w-xl mx-auto"
            >
                Empowering the next generation of visionary leaders for sustainable growth and <span className="text-slate-900 font-semibold">Viksit Bharat 2047</span>.
            </motion.p>
            
            {/* 5. COUNTDOWN */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-wrap justify-center gap-2.5 xs:gap-3 sm:gap-4 mb-8"
            >
                {!isEventStarted ? (
                    <>
                        <CountdownUnit value={timeLeft.days} label="Days" />
                        <CountdownUnit value={timeLeft.hours} label="Hours" />
                        <CountdownUnit value={timeLeft.minutes} label="Mins" />
                        <CountdownUnit value={timeLeft.seconds} label="Secs" />
                    </>
                ) : (
                    <div className="px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-bold text-lg border border-red-100 animate-pulse">
                        Summit Underway!
                    </div>
                )}
            </motion.div>

            {/* 6. DATE & VENUE PILLS */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap justify-center gap-3 mb-10"
            >
                <div className="flex items-center gap-2.5 px-4 py-2 bg-white/90 rounded-xl shadow-xs border border-slate-200/80">
                    <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                        <Calendar size={15} />
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Date</p>
                        <p className="text-slate-800 font-bold text-xs">April 10 - 11, 2026</p>
                    </div>
                </div>

                <div className="flex items-center gap-2.5 px-4 py-2 bg-white/90 rounded-xl shadow-xs border border-slate-200/80">
                    <div className="p-1.5 bg-orange-50 text-orange-600 rounded-lg">
                        <MapPin size={15} />
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Venue</p>
                        <p className="text-slate-800 font-bold text-xs">Ramaiah University, Bengaluru</p>
                    </div>
                </div>
            </motion.div>

            {/* 7. ACTION BUTTONS */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md"
            >
                <Link to="/register" className="w-full sm:w-auto flex-1">
                    <button className="w-full px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-sm shadow-lg shadow-blue-600/25 transition-all btn-tactile flex items-center justify-center gap-2">
                        <UserPlus size={16} /> Register Delegate
                    </button>
                </Link>

                <Link to="/sponsorship" className="w-full sm:w-auto flex-1">
                    <button className="w-full px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-sm shadow-md transition-all btn-tactile flex items-center justify-center gap-2">
                        Sponsorship Plans <ChevronRight size={16} />
                    </button>
                </Link>
                
                <button 
                    onClick={() => setShowVideo(true)}
                    className="w-full sm:w-auto px-5 py-3.5 bg-white text-slate-800 rounded-full font-bold text-sm border border-slate-200/80 shadow-xs hover:bg-slate-50 transition-all btn-tactile flex items-center justify-center gap-2 group"
                >
                    <Play size={15} className="fill-current text-slate-700 group-hover:text-blue-600 transition-colors" /> Watch Video
                </button>
            </motion.div>

            {/* 8. BOTTOM LOGOS (CO-HOSTED & ASSOCIATION) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-16 sm:mt-24 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12"
            >
                {/* Co-Hosted By */}
                <div className="flex flex-col items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Co-Hosted By</span>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-64 h-24 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center hover:shadow-md hover:border-blue-200 transition-all group cursor-default">
                            <img src="/images/partners/ruas-fmc.webp" alt="RUAS Faculty of Management & Commerce" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.classList.remove('hidden'); }} />
                            <span className="font-bold text-slate-700 text-sm text-center max-w-[200px] group-hover:text-blue-600 transition-colors hidden">RUAS Faculty of Management & Commerce</span>
                        </div>
                        <div className="w-64 h-24 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center hover:shadow-md hover:border-blue-200 transition-all group cursor-default">
                            <img src="/images/partners/rtbi.webp" alt="RTBI" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.classList.remove('hidden'); }} />
                            <span className="font-bold text-slate-700 text-sm text-center group-hover:text-blue-600 transition-colors hidden">RTBI</span>
                        </div>
                    </div>
                </div>

                {/* Divider (Desktop) */}
                <div className="hidden lg:block w-px h-16 bg-slate-300"></div>
                {/* Divider (Mobile) */}
                <div className="lg:hidden w-16 h-px bg-slate-300"></div>

                {/* In Association With */}
                <div className="flex flex-col items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">In Association With</span>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-64 h-24 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center hover:shadow-md hover:border-blue-200 transition-all group cursor-default">
                            <img src="/images/partners/startup-karnataka.webp" alt="Startup Karnataka" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.classList.remove('hidden'); }} />
                            <span className="font-bold text-slate-700 text-sm text-center group-hover:text-blue-600 transition-colors hidden">Startup Karnataka</span>
                        </div>
                        <div className="w-64 h-24 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center hover:shadow-md hover:border-blue-200 transition-all group cursor-default">
                            <img src="/images/partners/govt-karnataka.webp" alt="Government of Karnataka" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.classList.remove('hidden'); }} />
                            <span className="font-bold text-slate-700 text-sm text-center group-hover:text-blue-600 transition-colors hidden">Government of Karnataka</span>
                        </div>
                        <div className="w-64 h-24 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center hover:shadow-md hover:border-blue-200 transition-all group cursor-default">
                            <img src="/images/partners/k-tech.webp" alt="K-tech" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.classList.remove('hidden'); }} />
                            <span className="font-bold text-slate-700 text-sm text-center group-hover:text-blue-600 transition-colors hidden">K-tech</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </header>
    </>
  );
};

export default Hero;
