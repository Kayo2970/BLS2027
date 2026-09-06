import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  highlight?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, highlight }) => {
  return (
    <div className="relative pt-32 pb-16 overflow-hidden bg-slate-50 border-b border-slate-200">
      <div className="absolute inset-0 bg-grid-slate opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {title} {highlight && <span className="text-blue-600">{highlight}</span>}
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl font-light">
                {subtitle}
            </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PageHeader;