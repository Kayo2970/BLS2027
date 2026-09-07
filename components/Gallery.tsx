
import React from 'react';
import { GALLERY_IMAGES, EVENT_TICKER_ITEMS } from '../constants';
import { Camera, Zap } from 'lucide-react';

const Gallery: React.FC = () => {
  // Dynamically calculate column split based on total images to support 10-15 images
  const quarter = Math.ceil(GALLERY_IMAGES.length / 4);
  const col1Data = GALLERY_IMAGES.slice(0, quarter);
  const col2Data = GALLERY_IMAGES.slice(quarter, quarter * 2);
  const col3Data = GALLERY_IMAGES.slice(quarter * 2, quarter * 3);
  const col4Data = GALLERY_IMAGES.slice(quarter * 3);

  // Duplicate for infinite scroll loop
  const col1 = [...col1Data, ...col1Data];
  const col2 = [...col2Data, ...col2Data];
  const col3 = [...col3Data, ...col3Data];
  const col4 = [...col4Data, ...col4Data];

  return (
    <div className="bg-slate-900 relative overflow-hidden h-[800px]" id="gallery">
      {/* CSS Styles for scrolling animation */}
      <style>{`
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-up {
          animation: scrollUp 40s linear infinite;
        }
        .animate-scroll-down {
          animation: scrollDown 40s linear infinite;
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
      `}</style>

      {/* Ticker Tape */}
      <div className="absolute top-8 left-0 right-0 z-30 bg-white/5 backdrop-blur-md border-y border-white/10 py-3 overflow-hidden select-none">
         <div className="flex animate-ticker w-fit">
            {/* Loop ticker items multiple times for smooth infinite scroll */}
            {[...EVENT_TICKER_ITEMS, ...EVENT_TICKER_ITEMS, ...EVENT_TICKER_ITEMS].map((item, i) => (
                <div key={i} className="flex items-center mx-8 whitespace-nowrap">
                    <span className="text-blue-400 mr-4"><Zap size={14} fill="currentColor" /></span>
                    <span className="text-white font-mono font-bold tracking-[0.2em] text-sm md:text-base uppercase">{item}</span>
                </div>
            ))}
         </div>
      </div>

      {/* Main Kinetic Wall */}
      <div className="h-full w-full max-w-[1920px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-24 pb-12">
        
        {/* Column 1 - UP */}
        <div className="h-full overflow-hidden relative group">
           <div className="animate-scroll-up w-full space-y-4 md:space-y-6">
              {col1.map((img, i) => (
                 <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 </div>
              ))}
           </div>
        </div>

        {/* Column 2 - DOWN */}
        <div className="h-full overflow-hidden relative group">
           <div className="animate-scroll-down w-full space-y-4 md:space-y-6">
              {col2.map((img, i) => (
                 <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 </div>
              ))}
           </div>
        </div>

        {/* Column 3 - UP (Hidden on mobile for cleaner look if needed, kept for now) */}
        <div className="h-full overflow-hidden relative group hidden md:block">
           <div className="animate-scroll-up w-full space-y-4 md:space-y-6" style={{ animationDuration: '45s' }}>
              {col3.map((img, i) => (
                 <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 </div>
              ))}
           </div>
        </div>

        {/* Column 4 - DOWN (Hidden on mobile) */}
        <div className="h-full overflow-hidden relative group hidden md:block">
           <div className="animate-scroll-down w-full space-y-4 md:space-y-6" style={{ animationDuration: '38s' }}>
              {col4.map((img, i) => (
                 <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 </div>
              ))}
           </div>
        </div>

      </div>

      {/* Gradient Masks for Fade In/Out */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-900 via-slate-900/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent z-20 pointer-events-none" />
      
      {/* Overlay Content */}
      <div className="absolute bottom-12 left-0 right-0 z-40 text-center pointer-events-none">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
              <Camera size={20} className="text-blue-400" />
              <span className="text-white font-bold tracking-wide">Captured Moments</span>
              <div className="w-px h-4 bg-white/20 mx-2" />
              <span className="text-slate-400 text-xs uppercase tracking-widest font-mono">2023-2026</span>
          </div>
      </div>
    </div>
  );
};

export default Gallery;
