import React from 'react';
import { MapPin, CheckCircle2, ArrowRight, Shield, Clock, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const ServiceAreas = () => {
  const areas = [
    { name: 'Croydon', desc: 'Our primary service location. We provide full property maintenance across all Croydon postcodes including CR0, CR2, CR7, and CR8.' },
    { name: 'Purley', desc: 'Expert handyman and fencing services for residential properties in Purley and the CR8 area.' },
    { name: 'Thornton Heath', desc: 'Reliable home repairs and decorating services for Thornton Heath homeowners in the CR7 postcode.' },
    { name: 'Coulsdon', desc: 'Professional property maintenance and mounting services in the Coulsdon and CR5 area.' },
    { name: 'Sanderstead', desc: 'High-quality home maintenance and repair services for the Sanderstead community.' },
    { name: 'South London', desc: 'We also cover various other parts of South London for larger projects and regular maintenance.' }
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
            src="/serviceareas.jpg" 
            alt="Background" 
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-krb-yellow font-bold text-[10px] uppercase tracking-[0.3em] mb-6 block">Coverage</span>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
              Service <br />
              <span className="text-krb-blue">Areas.</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              KRB Facilities Management Limited proudly serves homeowners across Croydon and the surrounding South London areas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 lg:mb-32">
            <motion.div {...fadeIn}>
              <div className="w-14 h-14 bg-krb-blue/10 rounded-xl flex items-center justify-center text-krb-blue mb-8">
                <MapPin size={28} />
              </div>
              <span className="section-subtitle">Local Expertise</span>
              <h2 className="section-title">Serving Our Local <br />Croydon Community</h2>
              <div className="space-y-6 text-base lg:text-lg text-slate-600 leading-relaxed mb-10">
                <p>
                  Being based in <strong>Croydon</strong>, we have a deep understanding of the local area and the specific needs of homeowners in our community. We pride ourselves on being a local business that you can rely on for all your home maintenance needs.
                </p>
                <p>
                  Whether you are in the heart of <strong>Croydon</strong> or in one of the surrounding towns, we are committed to providing the same high level of professional service and attention to detail.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Prompt & Reliable Local Service',
                  'Knowledge of Local Property Styles',
                  'No Call-Out Fees for Croydon Areas',
                  'Fully Insured Local Professionals'
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="font-bold text-xs text-slate-700 tracking-tight">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {areas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-modern group"
                >
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-krb-blue mb-6 group-hover:bg-krb-blue group-hover:text-white transition-colors">
                    <MapPin size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-krb-purple mb-3 group-hover:text-krb-blue transition-colors">{area.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{area.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Trust Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-krb-purple rounded-3xl p-10 lg:p-20 text-white relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-1/3 h-full bg-krb-blue/5 skew-x-12 translate-x-1/4"></div>
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <span className="text-krb-yellow font-bold text-[10px] uppercase tracking-[0.3em] mb-6 block">Why Choose KRB</span>
              <h2 className="text-3xl lg:text-5xl font-bold mb-8 leading-tight">Your Trusted Local Partner</h2>
              <p className="text-base text-white/60 mb-12 leading-relaxed max-w-2xl mx-auto">
                We are proud to be the first choice for property maintenance in <strong>Croydon</strong> and the surrounding South London areas. Our reputation is built on quality workmanship and honest pricing.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                    <Shield size={32} className="text-krb-yellow" />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em]">Fully Insured</div>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                    <Clock size={32} className="text-krb-yellow" />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em]">On-Time Service</div>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                    <ThumbsUp size={32} className="text-krb-yellow" />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em]">Quality Guaranteed</div>
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
            <h2 className="section-title">Ready to Start Your Project?</h2>
            <p className="text-base lg:text-lg text-slate-500 mb-10 max-w-2xl mx-auto">
              Join our list of happy customers in Croydon. Get in touch today for a free, no-obligation quote for your home maintenance needs.
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
    </div>
  );
};

export default ServiceAreas;
