import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Shield, ThumbsUp, Clock, Users, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageShowcase from '../components/ImageShowcase';
import { aboutImageSlots } from '../data/siteImageSlots';

const About = () => {
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
            src="/fencing-.jfif" 
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
            <span className="text-krb-yellow font-bold text-[10px] uppercase tracking-[0.3em] mb-6 block">Our Story</span>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
              Crafting Better <br />
              <span className="text-krb-blue">Living Spaces.</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              Providing reliable, high-quality property maintenance services that homeowners across Croydon and South London can trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div {...fadeIn}>
              <span className="section-subtitle">Who We Are</span>
              <h2 className="section-title">Your Local Experts in Home Maintenance</h2>
              <div className="space-y-6 text-base lg:text-lg text-slate-600 leading-relaxed">
                <p>
                  KRB Facilities Management Limited provides professional home maintenance and handyman services for residential properties across Croydon and surrounding areas in South London.
                </p>
                <p>
                  With years of experience in the industry, we have built a reputation for excellence, reliability, and exceptional customer service. We understand that your home is your most valuable asset, and we treat every project with the care and respect it deserves.
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div className="group">
                  <div className="text-4xl font-bold text-krb-purple mb-1 group-hover:text-krb-blue transition-colors">15+</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Years of Excellence</div>
                </div>
                <div className="group">
                  <div className="text-4xl font-bold text-krb-purple mb-1 group-hover:text-krb-blue transition-colors">100%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Client Satisfaction</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl relative z-10">
                <video
                  src="/video1.mp4"
                  className="w-full h-auto"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-krb-yellow p-8 rounded-xl shadow-xl hidden lg:block z-20 max-w-[200px]">
                <Award size={32} className="text-krb-purple mb-4" />
                <div className="text-krb-purple font-bold text-lg leading-tight">Accredited <br />Professionals</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 lg:py-28 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div {...fadeIn}>
              <span className="section-subtitle">Our Foundation</span>
              <h2 className="section-title">Mission & Values</h2>
              <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
                To provide reliable, affordable, and high-quality property maintenance services that homeowners can trust.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality Workmanship',
                desc: 'We never compromise on quality. Every job is completed to the highest professional standards.',
                icon: Shield,
                color: 'bg-blue-50 text-blue-600'
              },
              {
                title: 'Reliability',
                desc: 'We show up on time and complete projects within the agreed timeframe.',
                icon: Clock,
                color: 'bg-purple-50 text-purple-600'
              },
              {
                title: 'Customer Focus',
                desc: 'Your satisfaction is our priority. We listen to your needs and deliver tailored solutions.',
                icon: ThumbsUp,
                color: 'bg-amber-50 text-amber-600'
              }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-modern group"
              >
                <div className={`w-14 h-14 ${value.color} rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-krb-purple mb-4 group-hover:text-krb-blue transition-colors">{value.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div {...fadeIn} className="order-2 lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Professional service',
                  'Attention to detail',
                  'Reliable scheduling',
                  'Friendly team',
                  'Affordable pricing',
                  'Fully insured',
                  'Local experts',
                  'Guaranteed work'
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 bg-slate-50 p-5 rounded-xl border border-slate-100 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="font-bold text-slate-700 text-xs tracking-tight">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeIn} className="order-1 lg:order-2">
              <span className="section-subtitle">The KRB Difference</span>
              <h2 className="section-title">Why Homeowners <br />Choose KRB</h2>
              <p className="text-base lg:text-lg text-slate-600 leading-relaxed mb-10">
                We have built our reputation on trust and quality. Our clients know they can rely on us for any home maintenance task, knowing it will be handled with professionalism and care.
              </p>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-krb-blue/10 flex items-center justify-center text-krb-blue">
                  <Users size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Trusted by</div>
                  <div className="text-lg font-bold text-krb-purple">500+ Local Clients</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white pb-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-krb-blue rounded-3xl p-10 lg:p-20 text-center relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_rgba(61,29,77,0.2)_0%,_transparent_50%)]"></div>
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">Ready to Experience <br />the KRB Standard?</h2>
              <p className="text-white/70 text-base lg:text-lg mb-10 max-w-2xl mx-auto">
                Join hundreds of satisfied homeowners in Croydon. Let us take care of your home maintenance needs today.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link to="/quote" className="btn-primary !bg-white !text-krb-blue hover:!bg-krb-yellow hover:!text-krb-purple">
                  Get a Free Quote
                  <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn-secondary !bg-transparent !text-white !border-white/20 hover:!border-white">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ImageShowcase
        eyebrow="Team And Projects"
        title="Our Team In Action"
        description="A glimpse of our team and completed projects, showing the care and standards behind every KRB service."
        items={aboutImageSlots}
        compact
      />
    </div>
  );
};

export default About;
