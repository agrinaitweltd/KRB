import React, { useRef, useState } from 'react';
import { Send, CheckCircle2, ArrowRight, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Quote = () => {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);

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
      propertyType: String(formData.get('propertyType') || '').trim(),
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || 'Unable to send your booking request right now.');
      }

      setSubmitted(true);
      form.reset();
      setStep(1);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to send your request at the moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = () => {
    setSubmitError('');
    const form = formRef.current;

    if (!form) {
      setStep(2);
      return;
    }

    const stepOneFields = Array.from(form.querySelectorAll('[data-step="1"] [required]')) as Array<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
    const invalidField = stepOneFields.find((field) => !field.checkValidity());

    if (invalidField) {
      invalidField.reportValidity();
      return;
    }

    setStep(2);
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
            Thank you. Your booking request has been received and a confirmation email has been sent to you. We will review your preferred date, time, and location, then email final booking confirmation options and pricing.
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
              Complete the detailed booking form below so we can prepare an accurate estimate, realistic schedule, and a smoother first visit.
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

                <div className="bg-krb-blue/[0.06] border border-krb-blue/20 rounded-2xl p-5 mb-8 text-sm text-slate-600 leading-relaxed">
                  <p className="font-black text-krb-purple mb-2 uppercase tracking-[0.2em] text-[11px]">Before You Submit</p>
                  <p className="font-bold">
                    The more detail you provide, the more accurate your first quote will be. Include access issues, parking limits, preferred outcome, and any timing constraints so our team can plan the right crew and equipment in one visit.
                  </p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="relative z-10">
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                        data-step="1"
                      >
                        <h3 className="text-2xl sm:text-3xl font-black text-krb-purple mb-2">Contact Details</h3>
                        <p className="text-sm text-slate-500 leading-relaxed font-bold">
                          Tell us who to contact and how you want updates. We use this information for confirmation, arrival windows, and quote clarifications.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Full Name</label>
                            <input required name="fullName" autoComplete="name" type="text" placeholder="Enter your full name" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Email Address</label>
                            <input required name="email" autoComplete="email" type="email" placeholder="you@example.com" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Phone Number</label>
                            <input required name="phone" autoComplete="tel" type="tel" placeholder="07xxx xxxxxx" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Postcode</label>
                            <input required name="postcode" autoComplete="postal-code" type="text" placeholder="e.g. B23 6TT" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Company Name (Optional)</label>
                            <input name="companyName" autoComplete="organization" type="text" placeholder="For commercial bookings" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Preferred Contact Method</label>
                            <select required name="preferredContactMethod" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700 appearance-none cursor-pointer">
                              <option value="">Select contact preference...</option>
                              <option>Email</option>
                              <option>Phone Call</option>
                              <option>Text Message</option>
                              <option>Any of the above</option>
                            </select>
                          </div>
                        </div>
                        <motion.button 
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleNextStep}
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
                        data-step="2"
                      >
                        <h3 className="text-2xl sm:text-3xl font-black text-krb-purple mb-2">Booking Details</h3>
                        <p className="text-sm text-slate-500 leading-relaxed font-bold">
                          Provide service scope, site constraints, and outcomes you care about most. This helps us prepare the right team and avoid delays.
                        </p>
                        <div className="space-y-2">
                          <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Service Required</label>
                          <div className="relative">
                            <select required name="serviceRequired" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700 appearance-none cursor-pointer">
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
                            <input required name="preferredDate" type="date" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Preferred Time</label>
                            <select required name="preferredTime" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700 appearance-none cursor-pointer">
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
                          <input required name="serviceAddress" autoComplete="street-address" type="text" placeholder="Building number, street, area" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Town / City</label>
                            <input required name="townCity" autoComplete="address-level2" type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Property Type</label>
                            <select required name="propertyType" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700 appearance-none cursor-pointer">
                              <option value="">Select property type...</option>
                              <option>House</option>
                              <option>Flat / Apartment</option>
                              <option>Office</option>
                              <option>Commercial Unit</option>
                              <option>Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Urgency</label>
                            <select required name="urgency" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700 appearance-none cursor-pointer">
                              <option value="">Select urgency...</option>
                              <option>Emergency (Same day)</option>
                              <option>Priority (1-3 days)</option>
                              <option>Standard (This week)</option>
                              <option>Flexible (Any suitable date)</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Estimated Budget</label>
                            <select required name="estimatedBudget" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700 appearance-none cursor-pointer">
                              <option value="">Select budget range...</option>
                              <option>Under GBP 200</option>
                              <option>GBP 200 - GBP 500</option>
                              <option>GBP 500 - GBP 1,000</option>
                              <option>GBP 1,000+</option>
                              <option>Need guidance before deciding</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Site Access Details</label>
                            <input required name="accessDetails" type="text" placeholder="Gate codes, floor level, restricted access" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Parking / Loading Notes</label>
                            <input required name="parkingInfo" type="text" placeholder="Permit needed, driveway access, loading bay" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Are Materials Supplied?</label>
                          <select required name="materialsSupplied" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700 appearance-none cursor-pointer">
                            <option value="">Choose an option...</option>
                            <option>Yes, all materials ready on site</option>
                            <option>Partially, need help sourcing remaining items</option>
                            <option>No, please include materials in the quote</option>
                          </select>
                        </div>
                        <div className="space-y-3">
                          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-1">Optional Add-ons</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-bold text-slate-600">
                            <label className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl">
                              <input name="addOns" value="Waste Removal" type="checkbox" className="accent-krb-blue" />
                              Waste Removal
                            </label>
                            <label className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl">
                              <input name="addOns" value="Aftercare Plan" type="checkbox" className="accent-krb-blue" />
                              Aftercare Plan
                            </label>
                            <label className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl">
                              <input name="addOns" value="Before/After Photo Report" type="checkbox" className="accent-krb-blue" />
                              Before/After Photo Report
                            </label>
                            <label className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl">
                              <input name="addOns" value="Out of Hours Appointment" type="checkbox" className="accent-krb-blue" />
                              Out of Hours Appointment
                            </label>
                          </div>
                        </div>
                        <label className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl text-sm font-bold text-slate-600">
                          <input name="petsOnSite" type="checkbox" className="accent-krb-blue" />
                          Pets are usually on-site (helps us plan safe access).
                        </label>
                        <div className="space-y-2">
                          <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Work Description</label>
                          <textarea required name="workDescription" placeholder="Describe what needs doing, measurements if known, and any existing damage or issues." className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700 h-40 sm:h-48 resize-none"></textarea>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-black uppercase tracking-[0.3em] text-krb-purple/40 ml-6">Preferred Outcome</label>
                          <textarea required name="preferredOutcome" placeholder="What does success look like for you? Include finish quality, timeline, and any must-haves." className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-krb-blue focus:ring-0 transition-all outline-none font-bold text-slate-700 h-32 resize-none"></textarea>
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
                            disabled={isSubmitting}
                            className="btn-primary flex-[2] py-4 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? 'Sending Request...' : 'Send Booking Request'} <Send size={20} />
                          </motion.button>
                        </div>
                        {submitError && (
                          <p className="text-sm text-red-600 font-bold leading-relaxed bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                            {submitError}
                          </p>
                        )}
                        <p className="text-sm text-slate-500 font-bold leading-relaxed">
                          After submission, you will receive an instant email acknowledgment and our team will also receive your full booking brief.
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
                      { step: '01', title: 'Detailed Review', desc: 'We assess your full service brief, access notes, timing, and budget expectations.' },
                      { step: '02', title: 'Quote + Scheduling', desc: 'You receive an email with availability, price clarity, and any practical recommendations.' },
                      { step: '03', title: 'Delivery Plan', desc: 'After approval, we schedule your slot and send prep notes so your appointment runs smoothly.' }
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

                <motion.div {...fadeIn} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h4 className="text-lg font-black text-krb-purple mb-4">How To Get The Fastest Accurate Quote</h4>
                  <ul className="space-y-3 text-sm text-slate-600 font-bold leading-relaxed">
                    <li className="flex gap-2"><ArrowRight size={16} className="text-krb-blue mt-1 shrink-0" />Include measurements, material preferences, and any known structural issues.</li>
                    <li className="flex gap-2"><ArrowRight size={16} className="text-krb-blue mt-1 shrink-0" />Mention access limits like narrow entries, stairs, parking permits, or gated areas.</li>
                    <li className="flex gap-2"><ArrowRight size={16} className="text-krb-blue mt-1 shrink-0" />Share your preferred outcome so we can align quality, speed, and budget from day one.</li>
                  </ul>
                </motion.div>

                <motion.div {...fadeIn} className="bg-krb-dark text-white rounded-2xl p-6">
                  <h4 className="text-lg font-black mb-4">What You Can Expect From KRB</h4>
                  <ul className="space-y-3 text-sm text-white/80 font-bold leading-relaxed">
                    <li>Clear communication before and during your booking.</li>
                    <li>Practical scheduling windows with realistic arrival times.</li>
                    <li>Transparent pricing and clear scope before work starts.</li>
                    <li>Professional standards across domestic and commercial jobs.</li>
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
