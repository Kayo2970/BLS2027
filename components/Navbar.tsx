
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Download, ChevronDown, ChevronRight } from 'lucide-react';
import { NAV_LINKS, BROCHURE_URL, LOGO_URL } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeNestedDropdown, setActiveNestedDropdown] = useState<string | null>(null);
  
  const location = useLocation();
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveNestedDropdown(null);
    }, 150);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center pt-4 md:pt-6 px-4`}
      >
        <div className={`
          w-full md:w-auto rounded-full transition-all duration-300
          ${scrolled 
            ? 'glass-card py-2 px-6 shadow-lg border border-white/40' 
            : 'bg-transparent md:bg-white/30 backdrop-blur-sm py-3 px-6 border border-white/20'
          }
        `}>
          <div className="flex items-center justify-between md:gap-8">
            
            {/* LEFT SIDE: Logo (Animated) & Navigation Links */}
            <div className="flex items-center">
                {/* Logo - Hidden at top, Slides in on scroll */}
                <div className="overflow-hidden flex-shrink-0 mr-6">
                    <Link to="/" className="flex items-center cursor-pointer group">
                      <div className={`
                          relative w-10 h-10 bg-white rounded-xl shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-all overflow-hidden border border-blue-100 flex items-center justify-center
                          ${scrolled ? 'opacity-100 translate-x-0' : 'opacity-100 translate-x-0 md:opacity-0 md:-translate-x-10 md:w-0'}
                      `}>
                         <motion.img 
                            src={LOGO_URL}
                            alt="Bharat Lead Summit" 
                            className="w-full h-full object-contain"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      </div>
                    </Link>
                </div>
                
                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-1">
                  {NAV_LINKS.map((link) => {
                    const isActive = location.pathname === link.href;
                    const hasSubLinks = link.subLinks && link.subLinks.length > 0;
                    const isDropdownOpen = activeDropdown === link.name;

                    return (
                      <div 
                        key={link.name} 
                        className="relative"
                        onMouseEnter={() => hasSubLinks && handleMouseEnter(link.name)}
                        onMouseLeave={() => hasSubLinks && handleMouseLeave()}
                      >
                        <Link
                          to={link.href}
                          className={`px-4 py-2 text-sm font-medium transition-all rounded-full flex items-center gap-1 group/link ${
                              isActive ? 'text-blue-600 bg-blue-50/80' : 'text-slate-700 hover:bg-white/50'
                          }`}
                        >
                          {link.name}
                          {hasSubLinks && (
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                          )}
                        </Link>

                        {/* Level 1 Dropdown Menu */}
                        <AnimatePresence>
                          {hasSubLinks && isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="absolute top-full left-0 mt-2 w-64 p-2 bg-white/95 backdrop-blur-xl border border-white/60 shadow-2xl rounded-2xl overflow-visible z-[60]"
                            >
                              <div className="grid gap-1">
                                {link.subLinks.map((sub, idx) => {
                                    const hasNestedLinks = sub.subLinks && sub.subLinks.length > 0;
                                    const isNestedOpen = activeNestedDropdown === sub.name;
                                    
                                    return (
                                    <div 
                                        key={idx} 
                                        className="relative group/nested"
                                        onMouseEnter={() => hasNestedLinks && setActiveNestedDropdown(sub.name)}
                                        onMouseLeave={() => hasNestedLinks && setActiveNestedDropdown(null)}
                                    >
                                        <Link
                                            to={sub.href}
                                            className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-all w-full"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-1.5 rounded-lg bg-slate-100 group-hover/nested:bg-blue-100 transition-colors">
                                                {sub.icon && <sub.icon size={14} className="group-hover/nested:text-blue-600" />}
                                                </div>
                                                <span className="text-sm font-semibold">{sub.name}</span>
                                            </div>
                                            {hasNestedLinks && <ChevronRight size={14} className="text-slate-400 group-hover/nested:text-blue-500" />}
                                        </Link>

                                        {/* Level 2 Nested Dropdown */}
                                        <AnimatePresence>
                                            {hasNestedLinks && isNestedOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                                    exit={{ opacity: 0, x: -10, scale: 0.95 }}
                                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                                    className="absolute left-full top-0 ml-2 w-56 p-2 bg-white/95 backdrop-blur-xl border border-white/60 shadow-2xl rounded-2xl z-[70]"
                                                >
                                                    <div className="grid gap-1">
                                                        {sub.subLinks!.map((nested, nIdx) => (
                                                            <Link
                                                                key={nIdx}
                                                                to={nested.href}
                                                                className="block px-3 py-2 rounded-lg hover:bg-blue-50 text-slate-600 hover:text-blue-600 text-sm font-medium transition-colors"
                                                            >
                                                                {nested.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )})}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
            </div>
            
            {/* RIGHT SIDE: Actions & Mobile Toggle */}
            <div className="flex items-center gap-3 ml-auto md:ml-0">
                <div className="hidden md:flex items-center gap-3">
                  <a 
                    href={BROCHURE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 bg-white/80 border border-slate-200 rounded-full hover:border-blue-300 hover:text-blue-600 transition-all"
                  >
                    <Download size={14} /> Brochure
                  </a>

                  {/* Registration Waitlist Blinker - Premium Shimmer */}
                  <Link to="/register" className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-300/50 shadow-md bg-[linear-gradient(110deg,#fef3c7,45%,#ffffff,55%,#fef3c7)] bg-[length:200%_100%] animate-shimmer transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-50 overflow-hidden">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
                      </span>
                      <span className="text-[10px] font-extrabold text-amber-800 tracking-widest uppercase">Register Now</span>
                  </Link>
                </div>

                {/* Mobile Button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden flex flex-col pt-28 px-6 h-screen overflow-y-auto"
          >
            <div className="space-y-2 pb-20">
              {NAV_LINKS.map((link, idx) => {
                const hasSubLinks = link.subLinks && link.subLinks.length > 0;
                return (
                  <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="border-b border-slate-100"
                  >
                      <div className="flex items-center justify-between py-4">
                        <Link
                            to={link.href}
                            onClick={() => !hasSubLinks && setIsOpen(false)}
                            className={`text-2xl font-bold ${
                                location.pathname === link.href ? 'text-blue-600' : 'text-slate-800'
                            }`}
                        >
                            {link.name}
                        </Link>
                        {hasSubLinks && (
                          <button 
                            onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                            className={`p-2 rounded-full bg-slate-50 transition-transform ${activeDropdown === link.name ? 'rotate-180 bg-blue-50 text-blue-600' : ''}`}
                          >
                            <ChevronDown size={20} />
                          </button>
                        )}
                      </div>

                      {/* Mobile Submenu Accordion Level 1 */}
                      <AnimatePresence>
                        {hasSubLinks && activeDropdown === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 pl-4 grid gap-1">
                              {link.subLinks.map((sub, sIdx) => {
                                  const hasNested = sub.subLinks && sub.subLinks.length > 0;
                                  const isNestedOpen = activeNestedDropdown === sub.name;
                                  
                                  return (
                                  <div key={sIdx}>
                                     <div className="flex items-center justify-between">
                                        <Link
                                            to={sub.href}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 py-3 text-slate-500 font-semibold"
                                        >
                                            {sub.icon && <sub.icon size={16} className="text-blue-400" />}
                                            {sub.name}
                                        </Link>
                                        {hasNested && (
                                            <button 
                                                onClick={() => setActiveNestedDropdown(isNestedOpen ? null : sub.name)}
                                                className={`p-1.5 rounded-full hover:bg-slate-50 ${isNestedOpen ? 'text-blue-600 rotate-90' : 'text-slate-400'}`}
                                            >
                                                <ChevronRight size={18} />
                                            </button>
                                        )}
                                     </div>

                                     {/* Mobile Submenu Accordion Level 2 */}
                                     <AnimatePresence>
                                         {hasNested && isNestedOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden pl-8 border-l border-slate-100 ml-2"
                                            >
                                                <div className="grid gap-2 pb-2">
                                                    {sub.subLinks!.map((nested, nIdx) => (
                                                        <Link
                                                            key={nIdx}
                                                            to={nested.href}
                                                            onClick={() => setIsOpen(false)}
                                                            className="block py-2 text-sm text-slate-500 hover:text-blue-600"
                                                        >
                                                            {nested.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                         )}
                                     </AnimatePresence>
                                  </div>
                              )})}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                  </motion.div>
                );
              })}
              
               <div className="pt-6 space-y-4">
                <motion.a
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    href={BROCHURE_URL}
                    target="_blank"
                    className="w-full flex items-center justify-center gap-2 py-4 text-slate-700 font-bold border border-slate-200 rounded-xl"
                >
                    <Download size={18} /> Download Brochure
                </motion.a>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link to="/register" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-amber-300/50 shadow-md bg-[linear-gradient(110deg,#fef3c7,45%,#ffffff,55%,#fef3c7)] bg-[length:200%_100%] animate-shimmer overflow-hidden">
                         <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
                        </span>
                        <span className="text-xs font-extrabold text-amber-800 tracking-widest uppercase">Register Now</span>
                    </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
