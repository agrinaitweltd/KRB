import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Fence, 
  Paintbrush, 
  Tv, 
  Hammer, 
  Home as HomeIcon, 
  ArrowRight,
  Shield,
  Clock,
  CheckCircle2,
  ThumbsUp,
  Wrench,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import ImageShowcase from '../components/ImageShowcase';
import { servicesImageSlots } from '../data/siteImageSlots';

const Services = () => {
  const SERVICE_IMAGE_FALLBACK = '/service-fallback.svg';

  const services = [
    {
      id: 'fencing',
      title: 'Fencing Installation',
      description: 'Professional fencing services for privacy and security. We handle all types of residential fencing including panel, closeboard, and picket fencing.',
      icon: Fence,
      image: '/fencing-close.png',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'painting',
      title: 'Painting & Decorating',
      description: 'High-quality interior and exterior painting services to transform your home. We provide expert color consultation and meticulous preparation.',
      icon: Paintbrush,
      image: '/pandd.jpg',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      id: 'mounting',
      title: 'Mirror & TV Mounting',
      description: 'Secure and level mounting for TVs, mirrors, and heavy artwork. We ensure all cables are neatly managed and the mount is perfectly positioned.',
      icon: Tv,
      image: '/mirrorinstallation.jpg',
      color: 'bg-amber-50 text-amber-600'
    },
    {
      id: 'handyman',
      title: 'Handyman Services',
      description: 'Reliable help for all those small jobs around the house. From fixing leaky taps to assembling furniture, we handle it all.',
      icon: Hammer,
      image: '/handymanservices.jpg',
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      id: 'maintenance',
      title: 'Property Maintenance',
      description: 'Comprehensive property maintenance solutions for residential properties. We help keep your home in top condition year-round.',
      icon: HomeIcon,
      image: '/propertmaintenance.jfif',
      color: 'bg-rose-50 text-rose-600'
    },
    {
      id: 'repairs',
      title: 'General Repairs',
      description: 'Expert repair services for all household issues. We fix everything from broken doors to damaged flooring with precision.',
      icon: Wrench,
      image: '/flooring-install.png',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      id: 'security-services',
      title: 'Security Services',
      description: 'Professional security services across London, providing static security guards and tailored protection for retail, hospitality, offices, events, and construction sites.',
      icon: ShieldCheck,
      image: '/security.jpg',
      color: 'bg-slate-50 text-slate-600'
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Page Header */}
      <section className="bg-krb-dark py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="/piol.jpg" 
            alt="Background" 
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = SERVICE_IMAGE_FALLBACK;
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-krb-yellow font-bold text-[10px] uppercase tracking-[0.3em] mb-6 block">Our Expertise</span>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
              Expert Solutions <br />
              <span className="text-krb-blue">For Your Home.</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              From small repairs to major installations, we provide a full range of home maintenance services across Croydon and South London.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="card-modern h-full flex flex-col p-0 overflow-hidden">
                  <div className="h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden relative bg-slate-100">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-contain bg-slate-100 p-2 sm:p-3 group-hover:scale-[1.02] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = SERVICE_IMAGE_FALLBACK;
                      }}
                    />
                    <div className="absolute inset-0 bg-krb-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-krb-purple mb-3 group-hover:text-krb-blue transition-colors">{service.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>
                    <Link 
                      to={`/services/${service.id}`}
                      className="inline-flex items-center gap-2 text-krb-purple font-bold text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all"
                    >
                      Explore Service <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Standards */}
      <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-krb-purple rounded-3xl p-10 lg:p-20 text-white relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-1/3 h-full bg-krb-blue/5 skew-x-12 translate-x-1/4"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <span className="text-krb-yellow font-bold text-[10px] uppercase tracking-[0.3em] mb-6 block">Our Commitment</span>
                <h2 className="text-3xl lg:text-5xl font-bold mb-8 leading-tight">Our Service <br />Standards</h2>
                <p className="text-base text-white/60 mb-10 leading-relaxed">
                  We are committed to delivering excellence in every project. Our standards ensure you receive the best possible experience and results.
                </p>
                <div className="space-y-4">
                  {[
                    'Fully insured and guaranteed work',
                    'Professional and respectful team',
                    'Transparent and fair pricing',
                    'Clean and tidy work environment',
                    'Reliable scheduling and communication'
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-6 h-6 bg-krb-yellow rounded-full flex items-center justify-center text-krb-purple group-hover:scale-110 transition-transform">
                        <CheckCircle2 size={12} />
                      </div>
                      <span className="font-bold text-xs tracking-tight">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 text-center"
                >
                  <Shield size={32} className="text-krb-yellow mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-1">100%</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Fully Insured</div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 text-center"
                >
                  <Clock size={32} className="text-krb-yellow mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-1">On-Time</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Guarantee</div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 text-center col-span-2"
                >
                  <ThumbsUp size={32} className="text-krb-yellow mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-1">Expert Craftsmanship</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Quality Assured</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div {...fadeIn}>
            <span className="section-subtitle">Get Started</span>
            <h2 className="section-title">Need a Custom Solution?</h2>
            <p className="text-base lg:text-lg text-slate-500 mb-10 max-w-2xl mx-auto">
              If you don't see the service you need, get in touch. We handle a wide variety of home maintenance and repair tasks across Croydon.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link to="/quote" className="btn-primary">
                Request a Free Quote
                <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ImageShowcase
        eyebrow="Portfolio"
        title="Featured Service Gallery"
        description="Selected project images from our core services, highlighting clean finishes and reliable workmanship."
        items={servicesImageSlots}
        compact
      />
    </div>
  );
};

export default Services;
