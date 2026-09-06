import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowRight, ArrowUpRight } from 'lucide-react';
import ShinyText from '../components/ShinyText';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4';

const NAV_LINKS = ['Home', 'About Us', 'Courses', 'Instructors', 'Testimonials', 'Blog'];

const Logo: React.FC = () => (
  <div className="flex items-center gap-2.5">
    <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white">
      <span className="w-3 h-3 rounded-full bg-white" />
    </span>
    <span className="text-white font-medium text-lg tracking-tight">DesignPro</span>
  </div>
);

const DesignPro: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black font-sans">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Navbar */}
        <nav className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between">
            <Logo />

            <div className="hidden lg:flex items-center gap-1 rounded-full border border-gray-700 px-2 py-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/80 hover:text-white transition-colors text-sm px-4 py-1.5"
                >
                  {link}
                </a>
              ))}
            </div>

            <a
              href="#"
              className="hidden lg:inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
            >
              Contact us
              <ArrowUpRight size={16} />
            </a>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 mt-4 flex flex-col gap-1 rounded-2xl border border-gray-700 bg-black/60 backdrop-blur-sm py-3"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/80 hover:text-white transition-colors text-sm px-4 py-2"
                >
                  {link}
                </a>
              ))}
              <a
                href="#"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm px-4 py-2"
              >
                Contact us
                <ArrowUpRight size={16} />
              </a>
            </motion.div>
          )}
        </nav>

        {/* Top two-column intro */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 lg:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
            <p className="text-white/80 text-sm md:text-base max-w-md">
              We deliver transformative programs that empower emerging product designers
              with cutting-edge expertise and vision to thrive globally.
            </p>
            <p className="text-white/80 text-sm md:text-base max-w-md lg:text-right lg:ml-auto">
              8000+ Talented Designers Launched !
            </p>
          </div>
        </div>

        {/* Hero center content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="uppercase text-white/80 text-xs md:text-sm tracking-tight mb-4"
          >
            Seats for Next Program Opening Soon
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl xl:text-9xl font-medium tracking-tighter"
            style={{ lineHeight: 0.85 }}
          >
            <span className="block text-white">Become</span>
            <span className="block">
              <ShinyText text="Product Leader." />
            </span>
          </motion.h1>

          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group mt-10 inline-flex items-center gap-2 bg-black hover:bg-gray-900 text-white rounded-full px-6 md:px-8 py-3 md:py-4 transition-colors"
          >
            <span className="text-sm md:text-base">Apply for Next Enrollment</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default DesignPro;
