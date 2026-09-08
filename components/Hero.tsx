
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, Play, X, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SHOWREEL_EMBED_URL, LOGO_URL } from '../constants';

// A single wave tile spanning 0-800, repeated once more (800-1600) so that
// translating the group by -800 loops seamlessly.
const wavePath = (y: number, amp: number) =>
  `M0,${y} C 200,${y - amp} 200,${y + amp} 400,${y} C 600,${y - amp} 600,${y + amp} 800,${y} ` +
  `C 1000,${y - amp} 1000,${y + amp} 1200,${y} C 1400,${y - amp} 1400,${y + amp} 1600,${y}`;

const TricolorLineBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <svg
      viewBox="0 0 1600 400"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <filter id="lineGlow" x="-20%" y="-100%" width="140%" height="300%">
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#000000" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Saffron flowing line */}
      <motion.g
        animate={{ x: [0, -800] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <path d={wavePath(150, 55)} fill="none" stroke="#FF9933" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
      </motion.g>

      {/* White flowing line - glow filter keeps it visible against the light hero bg */}
      <motion.g
        animate={{ x: [-800, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        filter="url(#lineGlow)"
      >
        <path d={wavePath(200, 45)} fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.95" />
      </motion.g>

      {/* Green flowing line */}
      <motion.g
        animate={{ x: [0, -800] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        <path d={wavePath(250, 55)} fill="none" stroke="#138808" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
      </motion.g>
    </svg>

    {/* Soft fade at the edges so the lines don't hard-cut against the viewport */}
    <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-transparent to-slate-50 opacity-70" />
    <div className="absolute inset-0 bg-slate-50/40" />
  </div>
);

const TirangaBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-slate-50">
    {/* 1. Tricolor Flowing Line - the main animated graphic */}
    <TricolorLineBackground />

    {/* 2. The Requested Square Grid Overlay - Crisp and Technical */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    
    {/* 3. Subtle Noise Texture for Premium Feel */}
    <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

    {/* 4. Soft White Overlay for Text Readability */}
    <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
  </div>
);

// Staggered fade + slide-up reveal: parent triggers each child in sequence
const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

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
                        title="Bharat Lead Summit 2027 Showreel"
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

    return () => {
        window.removeEventListener('scroll', handleScroll);
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



        {/* Centered Content Wrapper - staggered fade + slide-up reveal */}
        <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >

            {/* 1. EYEBROW BADGE */}
            <motion.div
                variants={heroItemVariants}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/80 shadow-sm mb-4"
            >
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                <span className="text-slate-700 text-[11px] font-extrabold tracking-wider uppercase">LEADS NEXT GEN CENTRE · RUAS BANGALORE</span>
            </motion.div>

            {/* 2. INNOVATION CHALLENGE ANNOUNCEMENT */}
            <motion.div
                variants={heroItemVariants}
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

            {/* 3. MAIN TITLE */}
            <motion.h1
                variants={heroItemVariants}
                className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 mb-4 leading-[1.02]"
            >
                BHARAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-blue-600 to-emerald-600">LEAD SUMMIT</span> 2027
            </motion.h1>

            {/* 4. SUBTITLE */}
            <motion.p
                variants={heroItemVariants}
                className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 font-normal leading-relaxed max-w-xl mx-auto"
            >
                Empowering visionary leaders for sustainable growth towards <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-emerald-600">Viksit Bharat 2047</span>.
            </motion.p>

            {/* 5. DATE STATUS */}
            <motion.div
                variants={heroItemVariants}
                className="flex flex-wrap justify-center gap-2.5 xs:gap-3 sm:gap-4 mb-8"
            >
                <div className="px-6 py-3 bg-blue-50 text-blue-700 rounded-2xl font-bold text-lg border border-blue-100">
                    Dates To Be Announced
                </div>
            </motion.div>

            {/* 6. DATE & VENUE PILLS */}
            <motion.div
                variants={heroItemVariants}
                className="flex flex-wrap justify-center gap-3 mb-10"
            >
                <div className="flex items-center gap-2.5 px-4 py-2 bg-white/90 rounded-xl shadow-xs border border-slate-200/80">
                    <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                        <Calendar size={15} />
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Date</p>
                        <p className="text-slate-800 font-bold text-xs">TBD</p>
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
                variants={heroItemVariants}
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
                variants={heroItemVariants}
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
        </motion.div>
      </div>
    </header>
    </>
  );
};

export default Hero;
