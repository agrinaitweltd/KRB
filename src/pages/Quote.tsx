import React, { useState } from 'react';
import { CheckCircle2, Star, Phone, Mail, Clock, Home, Building2, Building, Warehouse, Package, Layers, Check } from 'lucide-react';
import { motion } from 'motion/react';

const PROPERTY_TYPES = [
  { value: 'House', Icon: Home, label: 'House' },
  { value: 'Flat / Apartment', Icon: Building2, label: 'Flat' },
  { value: 'Office', Icon: Building, label: 'Office' },
  { value: 'Commercial Unit', Icon: Warehouse, label: 'Commercial' },
  { value: 'Studio', Icon: Layers, label: 'Studio' },
  { value: 'Other', Icon: Package, label: 'Other' },
];

const inputCls =
  'w-full border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 bg-white focus:border-krb-blue focus:ring-2 focus:ring-krb-blue/10 outline-none transition-all placeholder:text-slate-400';
const labelCls = 'block text-sm font-semibold text-slate-700 mb-1.5';
const selectCls = `${inputCls} appearance-none cursor-pointer`;

const REVIEWS = [
  {
    name: 'Sarah T.',
    date: '12/03/2026',
    text: 'Brilliant job from start to finish. The team were professional, on time, and left the place spotless. Would absolutely recommend.',
  },
  {
    name: 'Marcus O.',
    date: '28/01/2026',
    text: 'Very prompt response and excellent communication. The work was completed to a high standard and exactly on schedule.',
  },
];

const TRUST = [
  'Fully Insured',
  'Vetted Professionals',
  'Competitive Pricing',
  'Free, No-Obligation Quote',
];

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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center bg-white p-12 rounded-2xl shadow-lg border border-slate-100"
        >
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Quote Requested!</h2>
          <p className="text-slate-500 mb-8 leading-relaxed text-sm">
            Thank you. Your booking request has been received and a confirmation email has been sent to you. Our team will review your details and be in touch shortly.
          </p>
          <button onClick={() => setSubmitted(false)} className="btn-primary w-full">
            Submit Another Request
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Minimal page header */}
      <div className="bg-krb-dark py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-krb-yellow text-xs font-bold uppercase tracking-[0.3em] mb-2">Free Estimate</p>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Get a <span className="text-krb-blue">Quote</span>
          </h1>
        </div>
      </div>

      {/* Main two-column layout */}
      <div className="max-w-7xl mx-auto px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Form Column */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="divide-y divide-slate-100">

              {/* Section: Property type */}
              <div className="pb-10">
                <h2 className="text-lg font-bold text-slate-900 mb-1">Property type</h2>
                <p className="text-sm text-slate-500 mb-5">Select the type of property where work is needed.</p>
                <input type="hidden" name="propertyType" value={propertyType} required />
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {PROPERTY_TYPES.map(({ value, Icon, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setPropertyType(value)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-center cursor-pointer ${
                        propertyType === value
                          ? 'border-krb-purple bg-krb-purple/5 text-krb-purple'
                          : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
                      }`}
                    >
                      <Icon size={26} strokeWidth={1.5} />
                      <span className="text-xs font-semibold leading-tight">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Section: Service details */}
              <div className="py-10">
                <h2 className="text-lg font-bold text-slate-900 mb-1">Service details</h2>
                <p className="text-sm text-slate-500 mb-5">Tell us what you need and when.</p>
                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>Service Required</label>
                    <div className="relative">
                      <select required name="serviceRequired" className={selectCls}>
                        <option value="">Select a service</option>
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
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">&#9662;</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Preferred date</label>
                      <input required name="preferredDate" type="date" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Phone Number</label>
                      <input required name="phone" autoComplete="tel" type="tel" placeholder="+44 07xxx xxxxxx" className={inputCls} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Preferred time</label>
                      <div className="relative">
                        <select required name="preferredTime" className={selectCls}>
                          <option value="">Select a time window</option>
                          <option>08:00 - 10:00</option>
                          <option>10:00 - 12:00</option>
                          <option>12:00 - 14:00</option>
                          <option>14:00 - 16:00</option>
                          <option>16:00 - 18:00</option>
                          <option>Flexible</option>
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">&#9662;</span>
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Urgency</label>
                      <div className="relative">
                        <select required name="urgency" className={selectCls}>
                          <option value="">Select urgency</option>
                          <option>Emergency (Same day)</option>
                          <option>Priority (1-3 days)</option>
                          <option>Standard (This week)</option>
                          <option>Flexible (Any suitable date)</option>
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">&#9662;</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Estimated budget</label>
                    <div className="relative">
                      <select required name="estimatedBudget" className={selectCls}>
                        <option value="">Select a range</option>
                        <option>Under £200</option>
                        <option>£200 - £500</option>
                        <option>£500 - £1,000</option>
                        <option>£1,000+</option>
                        <option>Need guidance before deciding</option>
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">&#9662;</span>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Special instructions</label>
                    <textarea
                      required
                      name="workDescription"
                      placeholder="Please list any requirements e.g. access restrictions, materials needed, specific finishes, pets on site..."
                      className={`${inputCls} h-28 resize-none`}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Section: Property address */}
              <div className="py-10">
                <h2 className="text-lg font-bold text-slate-900 mb-1">Property address</h2>
                <p className="text-sm text-slate-500 mb-5">Where will the work take place?</p>
                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>Street address</label>
                    <input
                      required
                      name="serviceAddress"
                      autoComplete="street-address"
                      type="text"
                      placeholder="e.g. 14 High Street"
                      className={inputCls}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Town / City</label>
                      <input required name="townCity" autoComplete="address-level2" type="text" placeholder="e.g. Croydon" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Postcode</label>
                      <input required name="postcode" autoComplete="postal-code" type="text" placeholder="e.g. CR0 1AA" className={inputCls} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <option value="">Choose an option</option>
                        <option>Yes, all materials ready on site</option>
                        <option>Partially, need help sourcing remaining items</option>
                        <option>No, please include materials in the quote</option>
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">&#9662;</span>
                    </div>
                  </div>
                  <label className="flex items-center gap-3 text-sm font-semibold text-slate-700 cursor-pointer select-none">
                    <input name="petsOnSite" type="checkbox" className="w-4 h-4 accent-krb-purple" />
                    There are pets on site
                  </label>
                </div>
              </div>

              {/* Section: Add-ons */}
              <div className="py-10">
                <h2 className="text-lg font-bold text-slate-900 mb-1">Add-ons</h2>
                <p className="text-sm text-slate-500 mb-5">Optional extras to include in your quote.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Waste Removal', 'Aftercare Plan', 'Before/After Photo Report', 'Out of Hours Appointment'].map((addon) => (
                    <label
                      key={addon}
                      className="flex items-center gap-3 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 cursor-pointer hover:border-krb-purple/40 hover:bg-slate-50 transition-all"
                    >
                      <input name="addOns" value={addon} type="checkbox" className="w-4 h-4 accent-krb-purple" />
                      {addon}
                    </label>
                  ))}
                </div>
              </div>

              {/* Section: Your details */}
              <div className="py-10">
                <h2 className="text-lg font-bold text-slate-900 mb-1">Your details</h2>
                <p className="text-sm text-slate-500 mb-5">
                  By completing this form your details are shared with our team for providing a quote, but absolutely no one else.
                </p>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Full name</label>
                      <input required name="fullName" autoComplete="name" type="text" placeholder="Full name" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>
                        Company name <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input name="companyName" autoComplete="organization" type="text" placeholder="Company name" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Email address</label>
                    <input required name="email" autoComplete="email" type="email" placeholder="john@example.com" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Preferred outcome</label>
                    <textarea
                      required
                      name="preferredOutcome"
                      placeholder="What does a successful job look like to you?"
                      className={`${inputCls} h-24 resize-none`}
                    ></textarea>
                  </div>
                  <div>
                    <label className={labelCls}>Preferred contact method</label>
                    <div className="relative">
                      <select required name="preferredContactMethod" className={selectCls}>
                        <option value="">Select contact preference</option>
                        <option>Email</option>
                        <option>Phone Call</option>
                        <option>Text Message</option>
                        <option>Any of the above</option>
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">&#9662;</span>
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
                  {isSubmitting ? 'Sending Request...' : 'Get Your Quote →'}
                </button>
                {!propertyType && (
                  <p className="text-xs text-slate-400 text-center mt-3">Please select a property type above to continue.</p>
                )}
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-5">

            {/* Reviews */}
            <div className="border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-5">What our customers say...</h3>
              <div className="space-y-5">
                {REVIEWS.map((r, i) => (
                  <div key={i} className={i > 0 ? 'pt-5 border-t border-slate-100' : ''}>
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={14} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed italic mb-2">"{r.text}"</p>
                    <p className="text-xs text-slate-400 font-semibold">
                      {r.name} on {r.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust signals */}
            <div className="border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-4">Our team are all:</h3>
              <ul className="space-y-3">
                {TRUST.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-krb-blue/10 text-krb-blue flex items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Need to talk */}
            <div className="bg-krb-purple rounded-xl p-6 text-white">
              <h3 className="font-bold mb-4">Need to talk?</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-center gap-3">
                  <Phone size={15} className="shrink-0 text-krb-yellow" />
                  0333 577 2280
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={15} className="shrink-0 text-krb-yellow" />
                  info@krbfm.co.uk
                </li>
                <li className="flex items-center gap-3">
                  <Clock size={15} className="shrink-0 text-krb-yellow" />
                  Mon – Sat: 8am – 6pm
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom CTA banner */}
      <div className="bg-gradient-to-r from-krb-purple to-krb-blue py-14 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">Ready to Start Your Project?</h2>
            <p className="text-white/70 text-sm">Get in touch for a free, no-obligation consultation and quote.</p>
          </div>
          <a
            href="/contact"
            className="shrink-0 bg-white text-krb-purple font-bold text-sm px-8 py-4 rounded-xl flex items-center gap-2 hover:bg-slate-100 transition-colors whitespace-nowrap uppercase tracking-wide"
          >
            GET IN TOUCH →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Quote;