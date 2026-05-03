import React, { useState } from 'react';
import { Phone, Mail, MapPin, Globe, CheckCircle2, ArrowRight, Home, Building2, Building, Warehouse, Package, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import ImageShowcase from '../components/ImageShowcase';
import { contactImageSlots } from '../data/siteImageSlots';

const PROPERTY_TYPES = [
  { value: 'House', Icon: Home, label: 'House' },
  { value: 'Flat / Apartment', Icon: Building2, label: 'Flat' },
  { value: 'Office', Icon: Building, label: 'Office' },
  { value: 'Commercial Unit', Icon: Warehouse, label: 'Commercial' },
  { value: 'Studio', Icon: Layers, label: 'Studio' },
  { value: 'Other', Icon: Package, label: 'Other' },
];

const inputCls = 'w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 bg-white focus:border-krb-blue focus:ring-2 focus:ring-krb-blue/10 outline-none transition-all';
const labelCls = 'block text-sm font-semibold text-slate-500 mb-1.5';
const selectCls = `${inputCls} appearance-none cursor-pointer`;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [propertyType, setPropertyType] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get('fullName') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      postcode: String(formData.get('postcode') || '').trim(),
      companyName: String(formData.get('companyName') || '').trim(),
      preferredContactMethod: String(formData.get('preferredContactMethod') || '').trim(),
      serviceRequired: String(formData.get('serviceRequired') || '').trim(),
      preferredDate: String(formData.get('preferredDate') || '').trim(),
      preferredTime: String(formData.get('preferredTime') || '').trim(),
      serviceAddress: String(formData.get('serviceAddress') || '').trim(),
      townCity: String(formData.get('townCity') || '').trim(),
      propertyType: propertyType,
      urgency: String(formData.get('urgency') || '').trim(),
      estimatedBudget: String(formData.get('estimatedBudget') || '').trim(),
      accessDetails: String(formData.get('accessDetails') || '').trim(),
      parkingInfo: String(formData.get('parkingInfo') || '').trim(),
      materialsSupplied: String(formData.get('materialsSupplied') || '').trim(),
      petsOnSite: Boolean(formData.get('petsOnSite')),
      addOns: formData.getAll('addOns').map((v) => String(v)),
      workDescription: String(formData.get('workDescription') || '').trim(),
      preferredOutcome: String(formData.get('preferredOutcome') || '').trim(),
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
      setPropertyType('');
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to send your message right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true as const },
    transition: { duration: 0.6 }
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
            <motion.span
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-krb-yellow font-bold text-[10px] uppercase tracking-[0.3em] mb-6 block"
            >Get In Touch</motion.span>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
              Contact <br />
              <span className="text-krb-blue">Our Team.</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-white/60 leading-relaxed max-w-xl"
            >
              Have a question or want to discuss a project? We're here to help homeowners across Croydon with professional maintenance solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form — first section under hero */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Form column */}
            <div className="lg:col-span-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="bg-white rounded-2xl p-10 sm:p-14 border border-slate-100 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-krb-yellow/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={30} className="text-krb-yellow" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-krb-blue mb-0.5">Submitted</p>
                      <h3 className="text-2xl font-black text-slate-900 leading-tight">All done — we've got it.</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-8 max-w-lg">
                    A confirmation email has been sent to your inbox. Our team will be in touch within a few hours — usually the same day during working hours.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    {[
                      { step: '01', label: 'Message received', desc: 'Your details are with our team right now.' },
                      { step: '02', label: 'We review it', desc: 'Usually within a few hours, Mon–Sat 8am–6pm.' },
                      { step: '03', label: 'We get back to you', desc: 'Via your preferred contact method.' },
                    ].map((s) => (
                      <div key={s.step} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                        <span className="text-2xl font-black text-krb-blue/20">{s.step}</span>
                        <p className="font-bold text-slate-800 text-sm mt-1 mb-1">{s.label}</p>
                        <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary text-xs">
                    Send another message
                  </button>
                </motion.div>
              ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-10"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Send a Message</h3>
                <p className="text-sm text-slate-400 mb-8">Fill in as much detail as possible so we can give you the most accurate response.</p>
                <form onSubmit={handleSubmit} className="divide-y divide-slate-100">

                  {/* Property type */}
                  <div className="pb-8">
                    <h4 className="text-base font-bold text-slate-800 mb-1">Property type</h4>
                    <p className="text-xs text-slate-400 mb-4">Select the type of property where work is needed.</p>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {PROPERTY_TYPES.map(({ value, Icon, label }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setPropertyType(value)}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center ${
                            propertyType === value
                              ? 'border-krb-blue bg-krb-blue/5 text-krb-blue'
                              : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                          }`}
                        >
                          <Icon size={24} strokeWidth={1.5} />
                          <span className="text-xs font-semibold leading-tight">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Your details */}
                  <div className="py-8">
                    <h4 className="text-base font-bold text-slate-800 mb-1">Your details</h4>
                    <p className="text-xs text-slate-400 mb-5">Your details are shared with our team only.</p>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>Full name</label>
                          <input name="fullName" required type="text" placeholder="Full name" autoComplete="name" className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Email address</label>
                          <input name="email" required type="email" placeholder="you@example.com" autoComplete="email" className={inputCls} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>Phone number</label>
                          <input name="phone" required type="tel" placeholder="+44 07xxx xxxxxx" autoComplete="tel" className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Company name <span className="text-slate-300 font-normal">(optional)</span></label>
                          <input name="companyName" type="text" placeholder="Company name" autoComplete="organization" className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Preferred contact method</label>
                        <div className="relative">
                          <select name="preferredContactMethod" required className={selectCls}>
                            <option value="">Select...</option>
                            <option>Email</option>
                            <option>Phone Call</option>
                            <option>Text Message</option>
                            <option>Any of the above</option>
                          </select>
                          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service details */}
                  <div className="py-8">
                    <h4 className="text-base font-bold text-slate-800 mb-1">Service details</h4>
                    <p className="text-xs text-slate-400 mb-5">Tell us what you need done and when.</p>
                    <div className="space-y-4">
                      <div>
                        <label className={labelCls}>Service required</label>
                        <div className="relative">
                          <select name="serviceRequired" required className={selectCls}>
                            <option value="">Select a service...</option>
                            <option>Fencing Installation</option>
                            <option>Painting &amp; Decorating</option>
                            <option>Mirror &amp; TV Mounting</option>
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
                          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>Preferred date</label>
                          <input name="preferredDate" required type="date" className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Preferred time</label>
                          <div className="relative">
                            <select name="preferredTime" required className={selectCls}>
                              <option value="">Select a window...</option>
                              <option>08:00 - 10:00</option>
                              <option>10:00 - 12:00</option>
                              <option>12:00 - 14:00</option>
                              <option>14:00 - 16:00</option>
                              <option>16:00 - 18:00</option>
                              <option>Flexible</option>
                            </select>
                            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>Urgency</label>
                          <div className="relative">
                            <select name="urgency" required className={selectCls}>
                              <option value="">Select urgency...</option>
                              <option>Emergency (Same day)</option>
                              <option>Priority (1-3 days)</option>
                              <option>Standard (This week)</option>
                              <option>Flexible (Any suitable date)</option>
                            </select>
                            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
                          </div>
                        </div>
                        <div>
                          <label className={labelCls}>Estimated budget</label>
                          <div className="relative">
                            <select name="estimatedBudget" required className={selectCls}>
                              <option value="">Select a range...</option>
                              <option>Under £200</option>
                              <option>£200 - £500</option>
                              <option>£500 - £1,000</option>
                              <option>£1,000+</option>
                              <option>Need guidance before deciding</option>
                            </select>
                            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="py-8">
                    <h4 className="text-base font-bold text-slate-800 mb-1">Location</h4>
                    <p className="text-xs text-slate-400 mb-5">Where will the work take place?</p>
                    <div className="space-y-4">
                      <div>
                        <label className={labelCls}>Service address</label>
                        <input name="serviceAddress" required type="text" placeholder="e.g. 14 High Street" autoComplete="street-address" className={inputCls} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>Town / City</label>
                          <input name="townCity" required type="text" placeholder="e.g. London" autoComplete="address-level2" className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Postcode</label>
                          <input name="postcode" required type="text" placeholder="e.g. SW1A 1AA" autoComplete="postal-code" className={inputCls} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Site access */}
                  <div className="py-8">
                    <h4 className="text-base font-bold text-slate-800 mb-1">Site access</h4>
                    <p className="text-xs text-slate-400 mb-5">Help us plan the visit with no surprises.</p>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>Access details</label>
                          <input name="accessDetails" required type="text" placeholder="e.g. Key with neighbour, entry code" className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Parking info</label>
                          <input name="parkingInfo" required type="text" placeholder="e.g. Free street parking outside" className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Materials supplied</label>
                        <div className="relative">
                          <select name="materialsSupplied" required className={selectCls}>
                            <option value="">Choose an option...</option>
                            <option>Yes, all materials ready on site</option>
                            <option>Partially, need help sourcing remaining items</option>
                            <option>No, please include materials in the quote</option>
                          </select>
                          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
                        </div>
                      </div>
                      <label className="flex items-center gap-3 text-sm font-semibold text-slate-600 cursor-pointer select-none">
                        <input name="petsOnSite" type="checkbox" className="w-4 h-4 accent-krb-blue" />
                        Pets on site
                      </label>
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div className="py-8">
                    <h4 className="text-base font-bold text-slate-800 mb-1">Add-ons</h4>
                    <p className="text-xs text-slate-400 mb-5">Optional extras to include.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['Waste Removal', 'Aftercare Plan', 'Before/After Photo Report', 'Out of Hours Appointment'].map((addon) => (
                        <label key={addon} className="flex items-center gap-3 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-600 cursor-pointer hover:border-krb-blue/40 hover:bg-slate-50 transition-all">
                          <input name="addOns" value={addon} type="checkbox" className="w-4 h-4 accent-krb-blue" />
                          {addon}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="py-8">
                    <h4 className="text-base font-bold text-slate-800 mb-1">Your requirements</h4>
                    <p className="text-xs text-slate-400 mb-5">The more detail here, the more accurate the quote.</p>
                    <div className="space-y-4">
                      <div>
                        <label className={labelCls}>Work description</label>
                        <textarea name="workDescription" required placeholder="Describe the work needed, scope, materials, or anything else relevant..." className={`${inputCls} h-36 resize-none`}></textarea>
                      </div>
                      <div>
                        <label className={labelCls}>Preferred outcome</label>
                        <textarea name="preferredOutcome" required placeholder="What does a successful job look like to you?" className={`${inputCls} h-28 resize-none`}></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-6">
                    {submitError && (
                      <p className="text-sm text-red-600 font-semibold bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
                        {submitError}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting || !propertyType}
                      className="w-full bg-krb-purple text-white font-bold text-sm py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-krb-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                      {!isSubmitting && <ArrowRight size={18} />}
                    </button>
                    {!propertyType && (
                      <p className="text-xs text-slate-400 text-center mt-3">Please select a property type above to continue.</p>
                    )}
                  </div>
                </form>
              </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-5">
              {[
                { icon: Phone, title: 'Call Us', value: '0333 577 2280', value2: '+44 7746 343913', sub: 'Mon – Sat: 8am – 6pm' },
                { icon: Mail, title: 'Email Us', value: 'info@krbfm.co.uk', sub: 'Reply within a few hours', href: 'mailto:info@krbfm.co.uk' },
                { icon: MapPin, title: 'Service Area', value: 'Croydon, Purley, Thornton Heath & South London', sub: 'Local Experts' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex gap-4 items-start"
                >
                  <div className="w-10 h-10 bg-krb-blue/8 text-krb-blue rounded-xl flex items-center justify-center shrink-0">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">{item.title}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-bold text-slate-800 hover:text-krb-blue transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-sm font-bold text-slate-800">{item.value}</p>
                    )}
                    {'value2' in item && <p className="text-sm font-bold text-slate-800">{item.value2}</p>}
                    <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.45 }}
                className="bg-krb-purple rounded-2xl p-6 text-white"
              >
                <h4 className="font-bold text-base mb-4">Why choose KRB?</h4>
                <div className="space-y-3">
                  {['Free, no-obligation quotes', 'Expert local advice', 'Reliable scheduling', 'Fully insured service'].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-krb-yellow/20 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle2 size={11} className="text-krb-yellow" />
                      </div>
                      <span className="text-sm font-semibold text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
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
