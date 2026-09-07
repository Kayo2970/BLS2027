import React from 'react';
import { STATS } from '../constants';
import { motion } from 'framer-motion';
import BorderGlow from './BorderGlow';

const Stats: React.FC = () => {
  return (
    <section className="w-full bg-slate-950 text-white relative z-20 py-12 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -3 }}
            >
              <BorderGlow
                borderRadius={16}
                backgroundColor="rgba(15,23,42,0.6)"
                glowColor="200 90% 70%"
                glowIntensity={1.1}
                className="group"
              >
                <div className="p-6 text-center relative overflow-hidden backdrop-blur-xl">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all pointer-events-none"></div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-1.5 text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                    {stat.value}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;