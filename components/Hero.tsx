import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, Play, X, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SHOWREEL_EMBED_URL, LOGO_URL } from '../constants';

// Reuses the same CloudFront asset already used for the site's cinematic hero treatment.
const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4';

const GRAIN_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

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

const LogoChip: React.FC<{ label: string; src: string; alt: string }> = ({ label, src, alt }) => (
  <div className="w-32 h-20 md:w-40 md:h-24 p-3 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 flex items-center justify-center hover:shadow-xl hover:-translate-y-0.5 transition-all group cursor-default">
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        e.currentTarget.nextElementSibling!.classList.remove('hidden');
      }}
    />
    <span className="font-bold text-slate-700 text-xs text-center leading-tight hidden">{label}</span>
  </div>
);

const Hero: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <VideoModal isOpen={showVideo} onClose={() => setShowVideo(false)} />
      <header id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-28 md:pt-32 pb-16 md:pb-20">

        {/* Cinematic video background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            src={VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
            style={{ backgroundImage: `url("${GRAIN_URL}")` }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

          {/* Desktop Logo Badge (Left Side) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute top-2 left-4 lg:top-4 lg:left-8 hidden md:block z-30"
          >
            <div className="bg-white/10 backdrop-blur-xl w-24 h-24 lg:w-28 lg:h-28 p-3 rounded-[1.5rem] border border-white/20 shadow-2xl hover:border-white/40 transition-all duration-500 flex items-center justify-center">
              <img src={LOGO_URL} alt="Bharat Lead Summit Logo" className="w-full h-full object-contain" />
            </div>
          </motion.div>

          {/* Top Right Logo: LEADS Next Gen Centre */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="absolute top-2 right-4 lg:top-4 lg:right-8 hidden md:flex flex-col items-center gap-2 z-30"
          >
            <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Organized By</span>
            <div className="bg-white/10 backdrop-blur-xl w-24 h-24 lg:w-28 lg:h-28 p-3 rounded-[1.5rem] border border-white/20 shadow-2xl hover:border-white/40 transition-all duration-500 flex items-center justify-center">
              <img src="/images/partners/leads-logo.webp" alt="LEADS Next Gen Centre" className="w-full h-full object-contain" />
            </div>
          </motion.div>

          {/* Centered Content */}
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            {/* Eyebrow badge */}
            <motion.div
              variants={heroItemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm mb-4"
            >
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <span className="text-white text-[11px] font-extrabold tracking-wider uppercase">LEADS NEXT GEN CENTRE · RUAS BANGALORE</span>
            </motion.div>

            {/* Announcement pill */}
            <motion.div variants={heroItemVariants} className="mb-6">
              <Link to="/register" className="cursor-pointer group">
                <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-300/40 shadow-sm bg-emerald-500/10 hover:bg-emerald-500/20 backdrop-blur-md transition-all">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span className="text-xs font-bold text-emerald-300 tracking-wide">Registrations Open · Bharat Innovation Challenge</span>
                </div>
              </Link>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={heroItemVariants}
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-4 leading-[1.02]"
            >
              BHARAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">LEAD SUMMIT</span> 2027
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={heroItemVariants}
              className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 font-normal leading-relaxed max-w-xl mx-auto"
            >
              Empowering the next generation of visionary leaders for sustainable growth and <span className="text-white font-semibold">Viksit Bharat 2047</span>.
            </motion.p>

            {/* Date status */}
            <motion.div variants={heroItemVariants} className="flex flex-wrap justify-center gap-2.5 xs:gap-3 sm:gap-4 mb-8">
              <div className="px-6 py-3 bg-white/10 text-white rounded-2xl font-bold text-lg border border-white/20 backdrop-blur-md">
                Dates To Be Announced
              </div>
            </motion.div>

            {/* Venue pill */}
            <motion.div variants={heroItemVariants} className="flex flex-wrap justify-center gap-3 mb-10">
              <div className="flex items-center gap-2.5 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl shadow-sm border border-white/20">
                <div className="p-1.5 bg-blue-500/20 text-blue-300 rounded-lg">
                  <Calendar size={15} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Date</p>
                  <p className="text-white font-bold text-xs">TBD</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl shadow-sm border border-white/20">
                <div className="p-1.5 bg-orange-500/20 text-orange-300 rounded-lg">
                  <MapPin size={15} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Venue</p>
                  <p className="text-white font-bold text-xs">Ramaiah University, Bengaluru</p>
                </div>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div variants={heroItemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md">
              <Link to="/register" className="w-full sm:w-auto flex-1">
                <button className="w-full px-6 py-3.5 bg-gradient-to-b from-white to-slate-200 hover:from-white hover:to-slate-100 text-slate-900 rounded-full font-bold text-sm shadow-lg shadow-black/30 transition-all flex items-center justify-center gap-2">
                  <UserPlus size={16} /> Register Delegate
                </button>
              </Link>

              <Link to="/sponsorship" className="w-full sm:w-auto flex-1">
                <button className="w-full px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold text-sm border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2">
                  Sponsorship Plans <ChevronRight size={16} />
                </button>
              </Link>

              <button
                onClick={() => setShowVideo(true)}
                className="w-full sm:w-auto px-5 py-3.5 bg-white/5 text-white rounded-full font-bold text-sm border border-white/20 backdrop-blur-md hover:bg-white/15 transition-all flex items-center justify-center gap-2 group"
              >
                <Play size={15} className="fill-current text-white" /> Watch Video
              </button>
            </motion.div>

            {/* Bottom logo strip */}
            <motion.div
              variants={heroItemVariants}
              className="mt-16 sm:mt-20 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12"
            >
              <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Co-Hosted By</span>
                <div className="flex flex-wrap justify-center gap-4">
                  <LogoChip label="RUAS Faculty of Management & Commerce" src="/images/partners/ruas-fmc.webp" alt="RUAS Faculty of Management & Commerce" />
                  <LogoChip label="RTBI" src="/images/partners/rtbi.webp" alt="RTBI" />
                </div>
              </div>

              <div className="hidden lg:block w-px h-16 bg-white/20"></div>
              <div className="lg:hidden w-16 h-px bg-white/20"></div>

              <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">In Association With</span>
                <div className="flex flex-wrap justify-center gap-4">
                  <LogoChip label="Startup Karnataka" src="/images/partners/startup-karnataka.webp" alt="Startup Karnataka" />
                  <LogoChip label="Government of Karnataka" src="/images/partners/govt-karnataka.webp" alt="Government of Karnataka" />
                  <LogoChip label="K-tech" src="/images/partners/k-tech.webp" alt="K-tech" />
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
