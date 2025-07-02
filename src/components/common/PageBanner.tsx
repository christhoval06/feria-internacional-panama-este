import { motion } from 'framer-motion';
import React from 'react';

interface PageBannerProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  heightClass?: string; // Ej: 'h-60 md:h-80'
}

const PageBanner: React.FC<PageBannerProps> = ({
  imageUrl,
  title,
  subtitle,
  heightClass = 'h-60 md:h-80' // Altura por defecto
}) => {
  return (
    <section
      className={`relative ${heightClass} bg-cover bg-center text-white`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center p-4 text-center">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring', stiffness: 100 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7, type: 'spring', stiffness: 100 }}
            className="mt-2 md:mt-4 text-md sm:text-lg md:text-xl max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageBanner;