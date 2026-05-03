import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Home, Building2, Building, Warehouse, Package, Layers } from 'lucide-react';
import { motion } from 'motion/react';

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

const Quote = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const form = e.currentTarget as HTMLFormElement;
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
      addOns: formData.getAll('addOns').map((value) => String(value)),
      workDescription: String(formData.get('workDescription') || '').trim(),
      preferredOutcome: String(formData.get('preferredOutcome') || '').trim(),
    };

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/booking-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || 'Unable to send your booking request right now.');
      }

      setSubmitted(true);
      form.reset();
      setPropertyType('');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to send your request at the moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center bg-white p-12 lg:p-16 rounded-3xl shadow-xl border border-slate-100"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black text-krb-purple mb-4">Quote Requested!</h2>
          <p className="text-slate-500 mb-8 leading-relaxed text-sm">
            Thank you. Your booking request has been received and a confirmation email has been sent to you. We will review your preferred date, time, and location, then email final booking confirmation options and pricing.
          </p>
          <button
            onClick={() => setSubmitted(false)}
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
      <section className="bg-krb-dark py-20 sm:py-24 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-krb-yellow font-black text-xs uppercase tracking-[0.4em] mb-5 block">Free Estimate</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Book a <span className="text-krb-blue">Service.</span>
            </h1>
            <p className="text-white/60 text-base leading-relaxed">
              Complete the form below and we will prepare an accurate quote and schedule.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Main Form Column */}
            <div className="lg:col-span-8">
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="divide-y divide-slate-100"
              >
                {/* Section: Property Type */}
                <div className="pb-10">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Property type</h2>
                  <p className="text-sm text-slate-400 mb-6">Select the type of property where work is needed.</p>
                  <input type="hidden" name="propertyType" value={propertyType} required />
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {PROPERTY_TYPES.map(({ value, Icon, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setPropertyType(value)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-center ${
                          propertyType === value
                            ? 'border-krb-blue bg-krb-blue/5 text-krb-blue'
                            : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700'
                        }`}
                      >
                        <Icon size={28} strokeWidth={1.5} />
                        <span className="text-xs font-semibold leading-tight">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section: Service Details */}
                <div className="py-10">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Service details</h2>
                  <p className="text-sm text-slate-400 mb-6">Tell us what you need done and when.</p>
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>Service required</label>
                      <div className="relative">
                        <select required name="serviceRequired" className={selectCls}>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Preferred date</label>
                        <input required name="preferredDate" type="date" className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Preferred time</label>
                        <div className="relative">
                          <select required name="preferredTime" className={selectCls}>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Urgency</label>
                        <div className="relative">
                          <select required name="urgency" className={selectCls}>
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
                          <select required name="estimatedBudget" className={selectCls}>
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

                {/* Section: Location */}
                <div className="py-10">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Location</h2>
                  <p className="text-sm text-slate-400 mb-6">Where will the work take place?</p>
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>Service address</label>
                      <input required name="serviceAddress" autoComplete="street-address" type="text" placeholder="e.g. 14 High Street" className={inputCls} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Town / City</label>
                        <input required name="townCity" autoComplete="address-level2" type="text" placeholder="e.g. London" className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Postcode</label>
                        <input required name="postcode" autoComplete="postal-code" type="text" placeholder="e.g. SW1A 1AA" className={inputCls} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Site Access */}
                <div className="py-10">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Site access</h2>
                  <p className="text-sm text-slate-400 mb-6">Help us plan the visit with no surprises.</p>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Access details</label>
                        <input required name="accessDetails" type="text" placeholder="e.g. Key with neighbour, entry code" className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Parking info</label>
                        <input required name="parkingInfo" type="text" placeholder="e.g. Free street parking outside" className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Materials supplied</label>
                      <div className="relative">
                        <select required name="materialsSupplied" className={selectCls}>
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

                {/* Section: Add-ons */}
                <div className="py-10">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Add-ons</h2>
                  <p className="text-sm text-slate-400 mb-6">Optional extras you'd like included in the quote.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Waste Removal', 'Aftercare Plan', 'Before/After Photo Report', 'Out of Hours Appointment'].map((addon) => (
                      <label key={addon} className="flex items-center gap-3 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-600 cursor-pointer hover:border-krb-blue/40 hover:bg-slate-50 transition-all">
                        <input name="addOns" value={addon} type="checkbox" className="w-4 h-4 accent-krb-blue" />
                        {addon}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Section: Requirements */}
                <div className="py-10">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Your requirements</h2>
                  <p className="text-sm text-slate-400 mb-6">The more detail here, the more accurate the quote.</p>
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>Work description</label>
                      <textarea required name="workDescription" placeholder="Describe the work needed, scope, materials, or anything else relevant..." className={`${inputCls} h-36 resize-none`}></textarea>
                    </div>
                    <div>
                      <label className={labelCls}>Preferred outcome</label>
                      <textarea required name="preferredOutcome" placeholder="What does a successful job look like to you?" className={`${inputCls} h-28 resize-none`}></textarea>
                    </div>
                  </div>
                </div>

                {/* Section: Your Details */}
                <div className="py-10">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Your details</h2>
                  <p className="text-sm text-slate-400 mb-6">By completing this form your details are shared with our team for providing a quote, but absolutely no one else.</p>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Full name</label>
                        <input required name="fullName" autoComplete="name" type="text" placeholder="Full name" className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Company name <span className="text-slate-300 font-normal">(optional)</span></label>
                        <input name="companyName" autoComplete="organization" type="text" placeholder="Company name" className={inputCls} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Email address</label>
                        <input required name="email" autoComplete="email" type="email" placeholder="you@example.com" className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Phone number</label>
                        <input required name="phone" autoComplete="tel" type="tel" placeholder="+44 07xxx xxxxxx" className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Preferred contact method</label>
                      <div className="relative">
                        <select required name="preferredContactMethod" className={selectCls}>
                          <option value="">Select contact preference...</option>
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

                {/* Submit */}
                <div className="pt-8">
                  {submitError && (
                    <p className="text-sm text-red-600 font-semibold bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5">
                      {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting || !propertyType}
                    className="w-full bg-krb-purple text-white font-bold text-sm py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-krb-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending Request...' : 'Get Your Quote'}
                    {!isSubmitting && <ArrowRight size={18} />}
                  </button>
                  {!propertyType && (
                    <p className="text-xs text-slate-400 text-center mt-3">Please select a property type above to continue.</p>
                  )}
                </div>
              </motion.form>
            </div>

            {/* Info Side */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-5">What happens next?</h3>
                  <div className="space-y-6">
                    {[
                      { step: '01', title: 'Detailed Review', desc: 'We assess your full service brief, access notes, timing, and budget expectations.' },
                      { step: '02', title: 'Quote & Scheduling', desc: 'You receive an email with availability, price clarity, and any practical recommendations.' },
                      { step: '03', title: 'Delivery Plan', desc: 'After approval, we schedule your slot and send prep notes so your appointment runs smoothly.' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="text-3xl font-black text-krb-blue/15 shrink-0 leading-none">{item.step}</span>
                        <div>
                          <p className="font-bold text-slate-800 text-sm mb-1">{item.title}</p>
                          <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-6"
                >
                  <h4 className="font-bold text-slate-900 mb-4 text-sm">Tips for a faster quote</h4>
                  <ul className="space-y-3 text-sm text-slate-500 leading-relaxed">
                    <li className="flex gap-2"><ArrowRight size={14} className="text-krb-blue mt-0.5 shrink-0" />Include measurements, material preferences, and known access issues.</li>
                    <li className="flex gap-2"><ArrowRight size={14} className="text-krb-blue mt-0.5 shrink-0" />Mention parking limits, narrow entries, or gated areas.</li>
                    <li className="flex gap-2"><ArrowRight size={14} className="text-krb-blue mt-0.5 shrink-0" />Share your preferred outcome so we can align quality, speed, and budget.</li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="bg-krb-dark text-white rounded-2xl p-6"
                >
                  <h4 className="font-bold mb-4 text-sm">What to expect from KRB</h4>
                  <ul className="space-y-2.5 text-sm text-white/70 leading-relaxed">
                    <li>Clear communication before and during your booking.</li>
                    <li>Realistic arrival windows and scheduling.</li>
                    <li>Transparent pricing before work starts.</li>
                    <li>Professional standards on every job.</li>
                  </ul>
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
