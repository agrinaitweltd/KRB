import React, { useState } from 'react';
import { Phone, Mail, MapPin, Globe, Clock, Send, Shield, ThumbsUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import ImageShowcase from '../components/ImageShowcase';
import { contactImageSlots } from '../data/siteImageSlots';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get('fullName') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      serviceType: String(formData.get('serviceType') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    };

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/contact-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || 'Unable to send your message right now.');
      }

      form.reset();
      setSubmitSuccess('Thanks, your message has been sent. We will get back to you shortly.');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to send your message right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            src="/contact.jfif" 
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
            <span className="text-krb-yellow font-bold text-[10px] uppercase tracking-[0.3em] mb-6 block">Get In Touch</span>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
              Contact <br />
              <span className="text-krb-blue">Our Team.</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              Have a question or want to discuss a project? We're here to help homeowners across Croydon with professional maintenance solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Contact Info */}
            <div className="lg:col-span-5">
              <motion.div {...fadeIn} className="mb-12">
                <span className="section-subtitle">Connect With Us</span>
                <h2 className="section-title">We're Ready to <br />Help You</h2>
                <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
                  Whether you need a quick repair or a major home improvement, our friendly team is just a call or message away.
                </p>
              </motion.div>

              <div className="space-y-8">
                {[
                  { icon: Phone, title: 'Call Us', value: '0333 577 2280 / +44 7746 343913', sub: 'Mon - Sat: 8am - 6pm' },
                  { icon: Mail, title: 'Email Us', value: 'info@krbfm.co.uk', sub: 'Reply within 24 hours', href: 'mailto:info@krbfm.co.uk' },
                  { icon: Globe, title: 'Website', value: 'krbfm.co.uk', sub: 'Visit us online', href: 'https://krbfm.co.uk' },
                  { icon: MapPin, title: 'Service Areas', value: 'Croydon, Purley, Thornton Heath, Coulsdon & South London', sub: 'Local Experts' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="w-14 h-14 bg-slate-50 text-krb-blue rounded-xl flex items-center justify-center shrink-0 group-hover:bg-krb-blue group-hover:text-white transition-all duration-300 shadow-sm">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-krb-purple mb-1">{item.title}</h4>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-base text-slate-700 font-bold tracking-tight hover:text-krb-blue transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-base text-slate-700 font-bold tracking-tight">{item.value}</p>
                      )}
                      <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-[0.2em] font-bold">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                {...fadeIn}
                className="mt-12 sm:mt-16 p-6 sm:p-10 bg-krb-purple rounded-3xl text-white relative overflow-hidden shadow-xl"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12"></div>
                <h4 className="text-xl font-bold mb-6">Why Contact Us?</h4>
                <div className="space-y-4">
                  {[
                    'Free, no-obligation quotes',
                    'Expert local advice',
                    'Reliable scheduling',
                    'Fully insured service'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 bg-krb-yellow rounded-full flex items-center justify-center text-krb-purple">
                        <CheckCircle2 size={12} />
                      </div>
                      <span className="font-bold text-xs tracking-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white p-8 lg:p-16 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-krb-blue/5 rounded-full -mr-24 -mt-24"></div>
                <h3 className="text-2xl lg:text-3xl font-bold text-krb-purple mb-10 relative z-10">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-krb-purple/40 ml-4">Full Name</label>
                      <input 
                        name="fullName"
                        required
                        type="text" 
                        placeholder="Your full name"
                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700 text-sm" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-krb-purple/40 ml-4">Email Address</label>
                      <input 
                        name="email"
                        required
                        type="email" 
                        placeholder="you@example.com"
                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700 text-sm" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-krb-purple/40 ml-4">Phone Number</label>
                      <input 
                        name="phone"
                        required
                        type="tel" 
                        placeholder="07xxx xxxxxx"
                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700 text-sm" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-krb-purple/40 ml-4">Service Type</label>
                      <div className="relative">
                        <select name="serviceType" required className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700 text-sm appearance-none cursor-pointer">
                          <option>General Enquiry</option>
                          <option>Fencing</option>
                          <option>Painting</option>
                          <option>Mounting</option>
                          <option>Handyman</option>
                          <option>Maintenance</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-krb-blue">
                          <Send size={14} className="rotate-90" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-krb-purple/40 ml-4">Your Message</label>
                    <textarea 
                      name="message"
                      required
                      placeholder="Tell us how we can help and any preferred timelines."
                      className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-6 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700 text-sm h-40 resize-none" 
                    ></textarea>
                  </div>
                  <motion.button 
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="btn-primary w-full py-5 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'} <Send size={18} />
                  </motion.button>
                  {submitSuccess && (
                    <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3 font-bold">
                      {submitSuccess}
                    </p>
                  )}
                  {submitError && (
                    <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 font-bold">
                      {submitError}
                    </p>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[420px] sm:h-[500px] lg:h-[600px] relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40000!2d-0.1!3d51.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760123456789ab%3A0x1234567890abcdef!2sCroydon!5e0!3m2!1sen!2suk!4v1234567890123" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(1) contrast(1.1) opacity(0.7)' }} 
            allowFullScreen 
            loading="lazy"
            title="Croydon Map"
          ></iframe>
        </div>
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl text-center max-w-sm pointer-events-auto border border-slate-100"
          >
            <div className="w-16 h-16 bg-krb-purple text-krb-yellow rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <MapPin size={32} />
            </div>
            <h3 className="text-2xl font-bold text-krb-purple mb-3">Based in Croydon</h3>
            <p className="text-slate-500 font-bold text-xs mb-6 leading-relaxed">Serving all of Croydon and the surrounding South London areas.</p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-krb-blue font-bold text-[10px] uppercase tracking-[0.2em] hover:gap-3 transition-all"
            >
              Get Directions <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      <ImageShowcase
        eyebrow="Trust Builders"
        title="Meet The Team And See The Results"
        description="A quick look at the people behind KRB and the standard of completed work you can expect."
        items={contactImageSlots}
        compact
      />
    </div>
  );
};

export default Contact;
