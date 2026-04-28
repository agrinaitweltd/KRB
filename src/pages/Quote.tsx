import React, { useState } from 'react';
import { Send, CheckCircle2, ArrowRight, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Quote = () => {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center bg-white p-12 lg:p-20 rounded-[64px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100"
        >
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl font-black text-krb-purple mb-6">Quote Requested!</h2>
          <p className="text-slate-500 mb-10 leading-relaxed font-bold">
            Thank you. Your booking request has been received. We will review your preferred date, time, and location, then email you with booking confirmation options and pricing.
          </p>
          <button 
            onClick={() => {
              setSubmitted(false);
              setStep(1);
            }}
            className="btn-primary w-full"
          >
            Back to Form
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden">
      {/* Page Header */}
      <section className="bg-krb-dark py-20 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/quote.jpg" 
            alt="Background" 
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-krb-dark via-krb-dark/80 to-krb-dark"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <span className="text-krb-yellow font-black text-xs uppercase tracking-[0.4em] mb-6 block">Free Estimate</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 sm:mb-8 leading-[0.95] tracking-tight">
              Book a <br />
              <span className="text-krb-blue">Service.</span>
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl">
              Choose your preferred date, time, and location. We'll email you back with booking confirmation and pricing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Form Side */}
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl sm:rounded-[40px] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.12)] border border-slate-100 relative overflow-hidden max-w-4xl lg:max-w-3xl xl:max-w-4xl mx-auto"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-krb-blue/5 rounded-full -mr-32 -mt-32"></div>
                
                {/* Progress Bar */}
                <div className="flex items-center gap-3 mb-8 sm:mb-10 relative z-10">
                  <div className={`h-3 flex-1 rounded-full transition-all duration-700 ${step >= 1 ? 'bg-krb-blue shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-slate-100'}`}></div>
                  <div className={`h-3 flex-1 rounded-full transition-all duration-700 ${step >= 2 ? 'bg-krb-blue shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-slate-100'}`}></div>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10">
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl sm:text-3xl font-black text-krb-purple mb-2">Contact Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Full Name</label>
                            <input required type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Email Address</label>
                            <input required type="email" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Phone Number</label>
                            <input required type="tel" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Postcode</label>
                            <input required type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700" />
                          </div>
                        </div>
                        <motion.button 
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setStep(2)}
                          className="btn-primary w-full py-4 text-sm"
                        >
                          Next Step <ChevronRight size={20} />
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl sm:text-3xl font-black text-krb-purple mb-2">Booking Details</h3>
                        <div className="space-y-2">
                          <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Service Required</label>
                          <div className="relative">
                            <select required className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700 appearance-none cursor-pointer">
                              <option value="">Select a service...</option>
                              <option>Fencing Installation</option>
                              <option>Painting & Decorating</option>
                              <option>Mirror & TV Mounting</option>
                              <option>General Handyman Services</option>
                              <option>Property Maintenance</option>
                              <option>Carpet Cleaning</option>
                              <option>Domestic Cleaning</option>
                              <option>Industrial Cleaning</option>
                              <option>Office Cleaning</option>
                              <option>Patio Cleaning</option>
                              <option>Driveway Cleaning</option>
                              <option>Other / Multiple Services</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-krb-blue">
                              <ChevronRight size={20} className="rotate-90" />
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Preferred Date</label>
                            <input required type="date" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Preferred Time</label>
                            <select required className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700 appearance-none cursor-pointer">
                              <option value="">Select a time window...</option>
                              <option>08:00 - 10:00</option>
                              <option>10:00 - 12:00</option>
                              <option>12:00 - 14:00</option>
                              <option>14:00 - 16:00</option>
                              <option>16:00 - 18:00</option>
                              <option>Flexible</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Service Address</label>
                          <input required type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Town / City</label>
                            <input required type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Property Type</label>
                            <select required className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700 appearance-none cursor-pointer">
                              <option value="">Select property type...</option>
                              <option>House</option>
                              <option>Flat / Apartment</option>
                              <option>Office</option>
                              <option>Commercial Unit</option>
                              <option>Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Work Description</label>
                          <textarea required className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700 h-40 sm:h-48 resize-none"></textarea>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <button 
                            type="button"
                            onClick={() => setStep(1)}
                            className="btn-secondary flex-1 py-4 text-sm"
                          >
                            Back
                          </button>
                          <motion.button 
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-primary flex-[2] py-4 text-sm"
                          >
                            Send Booking Request <Send size={20} />
                          </motion.button>
                        </div>
                        <p className="text-sm text-slate-500 font-bold leading-relaxed">
                          After submission, we will email available booking slots and pricing confirmation.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            </div>

            {/* Info Side */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-10">
                <motion.div {...fadeIn}>
                  <span className="section-subtitle">Process</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-krb-purple mb-6 leading-tight">What Happens Next?</h3>
                  <div className="space-y-7">
                    {[
                      { step: '01', title: 'Review', desc: 'We review your requested service, date, time, and location details.' },
                      { step: '02', title: 'Email Reply', desc: 'We email booking availability and a clear price confirmation.' },
                      { step: '03', title: 'Booking Confirmed', desc: 'Once approved, your slot is confirmed and our team is scheduled.' }
                    ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-5 group"
                      >
                        <div className="text-4xl font-black text-krb-blue/10 shrink-0 group-hover:text-krb-blue/30 transition-colors">{item.step}</div>
                        <div>
                          <h4 className="text-lg font-black text-krb-purple mb-1">{item.title}</h4>
                          <p className="text-sm text-slate-500 leading-relaxed font-bold">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quote;
