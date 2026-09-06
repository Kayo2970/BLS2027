import React from 'react';
import { STATS } from '../constants';
import { motion } from 'framer-motion';

const Stats: React.FC = () => {
  return (
    <div className="w-full bg-white relative z-20 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] text-center group hover:border-blue-200 hover:shadow-xl transition-all"
            >
              <h3 className="text-4xl font-bold mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">
                {stat.value}
              </h3>
              <p className="text-sm text-slate-500 font-semibold uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;