import React from 'react';
import { motion } from 'motion/react';
import type { ImageSlot } from '../data/siteImageSlots';

interface ImageShowcaseProps {
  eyebrow: string;
  title: string;
  description: string;
  items: ImageSlot[];
  compact?: boolean;
}

const IMAGE_FALLBACK = '/service-fallback.svg';

const ImageShowcase: React.FC<ImageShowcaseProps> = ({
  eyebrow,
  title,
  description,
  items,
  compact = false,
}) => {
  const gridClassName = compact
    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
    : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8';

  return (
    <section className="py-20 lg:py-28 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mb-12 lg:mb-16"
        >
          <span className="section-subtitle">{eyebrow}</span>
          <h2 className="section-title">{title}</h2>
          <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
            {description}
          </p>
        </motion.div>

        <div className={gridClassName}>
          {items.map((item, index) => (
            <motion.article
              key={item.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
              className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.07)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = IMAGE_FALLBACK;
                  }}
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-krb-blue mb-3">
                  {item.label}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.alt}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageShowcase;