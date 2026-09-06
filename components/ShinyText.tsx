import React from 'react';
import { motion } from 'framer-motion';

interface ShinyTextProps {
  text: string;
  className?: string;
  baseColor?: string;
  shineColor?: string;
  speed?: number;
  gradientAngle?: number;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  className = '',
  baseColor = '#64CEFB',
  shineColor = '#ffffff',
  speed = 3,
  gradientAngle = 100,
}) => {
  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent bg-[length:200%_100%] ${className}`}
      style={{
        backgroundImage: `linear-gradient(${gradientAngle}deg, ${baseColor} 30%, ${shineColor} 50%, ${baseColor} 70%)`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }}
      animate={{ backgroundPosition: ['200% 0%', '-200% 0%'] }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
    >
      {text}
    </motion.span>
  );
};

export default ShinyText;
