import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Shield, 
  Clock, 
  CheckCircle2, 
  Star, 
  Hammer, 
  Paintbrush, 
  Fence, 
  Tv, 
  Wrench, 
  Home as HomeIcon,
  MapPin,
  Play,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import ImageShowcase from '../components/ImageShowcase';
import { homeImageSlots } from '../data/siteImageSlots';

const heroSlides = [
  {
    title: <>Trusted Facilities<br />support for homes<br />and businesses</>,
    description: 'From planned maintenance to responsive cleaning and repairs, KRB helps properties run smoothly with dependable, high-quality service delivery.',
  },
  {
    title: <>Professional Fencing<br />& Property<br />Maintenance</>,
    description: 'Quality fencing installation and ongoing property upkeep to protect and enhance your home or business premises.',
  },
  {
    title: <>Expert Painting,<br />Decorating &<br />Repairs</>,
    description: 'Transform your space with our skilled painters and reliable repair services — delivering clean finishes every time.',
  },
  {
    title: <>Your Local<br />Handyman &<br />Cleaning Team</>,
    description: 'From odd jobs to deep cleans, our friendly team is here to keep your property looking its best all year round.',
  },
];

const Home = () => {
  const [comparisonPosition, setComparisonPosition] = useState(50);
  const [isDraggingComparison, setIsDraggingComparison] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const activeComparisonPointerId = useRef<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((s) => (s + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlide]);

  const updateComparisonPosition = (clientX: number) => {
    if (!comparisonRef.current) {
      return;
    }

    const rect = comparisonRef.current.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setComparisonPosition(Math.min(98, Math.max(2, next)));
  };

  const beginComparisonDrag = (pointerId: number, clientX: number) => {
    if (!comparisonRef.current) {
      return;
    }

    activeComparisonPointerId.current = pointerId;
    comparisonRef.current.setPointerCapture(pointerId);
    setIsDraggingComparison(true);
    updateComparisonPosition(clientX);
  };

  const endComparisonDrag = (pointerId: number) => {
    if (!comparisonRef.current) {
      return;
    }

    if (activeComparisonPointerId.current !== pointerId) {
      return;
    }

    if (comparisonRef.current.hasPointerCapture(pointerId)) {
      comparisonRef.current.releasePointerCapture(pointerId);
    }

    activeComparisonPointerId.current = null;
    setIsDraggingComparison(false);
  };

  const services = [
    {
      id: 'fencing',
      title: 'Fencing Installation',
      description: 'High-quality residential fencing solutions for security and privacy.',
      icon: Fence,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'painting',
      title: 'Painting & Decorating',
      description: 'Professional interior and exterior painting services with attention to detail.',
      icon: Paintbrush,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      id: 'mounting',
      title: 'Mirror & TV Mounting',
      description: 'Secure and precise mounting services for TVs, mirrors, and artwork.',
      icon: Tv,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      id: 'handyman',
      title: 'Handyman Services',
      description: 'Expert help for all those small jobs and repairs around your home.',
      icon: Hammer,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'maintenance',
      title: 'Property Maintenance',
      description: 'Comprehensive maintenance solutions to keep your property in top condition.',
      icon: HomeIcon,
      color: 'bg-rose-50 text-rose-600',
    },
    {
      id: 'repairs',
      title: 'General Repairs',
      description: 'Quick and reliable fixes for common household issues and wear and tear.',
      icon: Wrench,
      color: 'bg-indigo-50 text-indigo-600',
    },
  ];

  const testimonials = [
    { name: "Sarah Johnson", text: "Excellent fencing work. The team was professional, tidy, and the finish is superb. Highly recommend KRB for any home projects." },
    { name: "Mark Thompson", text: "Great painting job in our living room. Attention to detail was fantastic and they finished ahead of schedule." },
    { name: "David Wilson", text: "Mounted our 75-inch TV perfectly. Very professional service and clean installation. Will definitely use them again." },
    { name: "Emma Davis", text: "KRB handled several small repairs around my house. Efficient, friendly, and very reasonably priced." },
    { name: "James Miller", text: "The property maintenance service is top-notch. They keep our rental properties in great shape year-round." },
    { name: "Lisa Brown", text: "Fantastic handyman service. No job was too small and everything was completed to a high standard." },
  ];

  const serviceHighlights = [
    {
      title: 'Fencing Installation',
      description: 'Secure, well-finished residential fencing installed to improve privacy, safety, and curb appeal.',
      linkText: 'Explore fencing services',
      link: '/services/fencing',
    },
    {
      title: 'Painting & Decorating',
      description: 'Interior and exterior painting delivered with careful prep, clean finishes, and long-lasting results.',
      linkText: 'View painting and decorating',
      link: '/services/painting',
    },
    {
      title: 'Mirror & TV Mounting',
      description: 'Accurate and secure mounting for TVs, mirrors, and wall fixtures with a neat, professional finish.',
      linkText: 'See mounting services',
      link: '/services/mounting',
    },
    {
      title: 'Handyman Services',
      description: 'Reliable support for everyday home jobs, repairs, fittings, and practical improvements.',
      linkText: 'Browse handyman services',
      link: '/services/handyman',
    },
    {
      title: 'Property Maintenance',
      description: 'Planned and reactive maintenance services that keep your home in top condition year-round.',
      linkText: 'Explore maintenance services',
      link: '/services/maintenance',
    },
    {
      title: 'Cleaning Services',
      description: 'Domestic, office, industrial, carpet, patio, and driveway cleaning tailored to your property needs.',
      linkText: 'View all cleaning services',
      link: '/services/domestic-cleaning',
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="bg-white pt-6 lg:pt-8 pb-10 lg:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-[1520px] mx-auto px-2 sm:px-3 lg:px-6"
        >
          <div className="grid lg:grid-cols-[1.65fr_1fr] overflow-hidden min-h-[360px] sm:min-h-[520px] lg:min-h-[620px]">
            <div
              ref={comparisonRef}
              className="relative select-none touch-pan-y cursor-ew-resize"
              onPointerDown={(e) => beginComparisonDrag(e.pointerId, e.clientX)}
              onPointerMove={(e) => {
                if (isDraggingComparison && activeComparisonPointerId.current === e.pointerId) {
                  updateComparisonPosition(e.clientX);
                }
              }}
              onPointerUp={(e) => endComparisonDrag(e.pointerId)}
              onPointerCancel={(e) => endComparisonDrag(e.pointerId)}
            >
              <img
                src="/kitchen-renovation1.png"
                alt="Kitchen before renovation"
                className="w-full h-full object-cover"
                draggable={false}
                fetchPriority="high"
                decoding="async"
              />

              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - comparisonPosition}% 0 0)` }}
                aria-hidden="true"
              >
                <img
                  src="/kitchen-renovation.png"
                  alt="Kitchen after renovation"
                  className="w-full h-full object-cover"
                  draggable={false}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>

              <div
                className="absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
                style={{ left: `${comparisonPosition}%` }}
                aria-hidden="true"
              />

              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 sm:w-10 sm:h-10 rounded-full bg-white text-krb-purple border border-slate-200 shadow-xl flex items-center justify-center pointer-events-none"
                style={{ left: `${comparisonPosition}%` }}
                aria-hidden="true"
              >
                <ChevronRight size={14} className="rotate-180 -mr-0.5" />
                <ChevronRight size={14} className="-ml-0.5" />
              </div>

              <div className="absolute left-4 bottom-4 bg-black/55 text-white text-[10px] uppercase tracking-[0.14em] font-bold px-3 py-1.5 rounded-full">
                Before
              </div>
              <div className="absolute right-4 bottom-4 bg-black/55 text-white text-[10px] uppercase tracking-[0.14em] font-bold px-3 py-1.5 rounded-full">
                After
              </div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/45 text-white text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1.5 rounded-full">
                Drag to Compare
              </div>
            </div>

            <div className="relative bg-[#003a70] text-white px-7 py-10 sm:px-10 lg:px-12 lg:py-14 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 opacity-80 pointer-events-none" aria-hidden="true">
                <svg viewBox="0 0 700 700" className="w-full h-full">
                  <g fill="none" stroke="#a92a9b" strokeWidth="8">
                    <path d="M-40 520 C120 390, 250 390, 410 520 C570 650, 700 650, 860 520" />
                    <path d="M-40 548 C120 418, 250 418, 410 548 C570 678, 700 678, 860 548" />
                    <path d="M-40 576 C120 446, 250 446, 410 576 C570 706, 700 706, 860 576" />
                    <path d="M-40 604 C120 474, 250 474, 410 604 C570 734, 700 734, 860 604" />
                    <path d="M-40 632 C120 502, 250 502, 410 632 C570 762, 700 762, 860 632" />
                    <path d="M-40 660 C120 530, 250 530, 410 660 C570 790, 700 790, 860 660" />
                  </g>
                </svg>
              </div>

              <div className="relative z-10">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-7">
                  {heroSlides[heroSlide].title}
                </h1>

                <p className="text-lg lg:text-2xl leading-relaxed text-white/95 max-w-xl">
                  {heroSlides[heroSlide].description}
                </p>
              </div>

              <div className="relative z-10 mt-10">
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-3 bg-[#f5b800] text-[#052f58] px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Get a Free Quote
                  <ArrowRight size={18} />
                </Link>

                <div className="mt-7 flex items-center gap-4 text-white/90">
                  <button
                    className="w-10 h-10 sm:w-8 sm:h-8 rounded-full border border-white/40 flex items-center justify-center hover:border-white transition-colors"
                    aria-label="Previous slide"
                    onClick={() => setHeroSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length)}
                  >
                    <ChevronRight size={14} className="rotate-180" />
                  </button>
                  <div className="flex items-center gap-3">
                    {heroSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setHeroSlide(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          i === heroSlide ? 'bg-white scale-110' : 'border border-white/80 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    className="w-10 h-10 sm:w-8 sm:h-8 rounded-full border border-white/40 flex items-center justify-center hover:border-white transition-colors"
                    aria-label="Next slide"
                    onClick={() => setHeroSlide((s) => (s + 1) % heroSlides.length)}
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Marquee */}
      <section className="py-16 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <span className="section-subtitle">Client Feedback</span>
          <h2 className="text-2xl lg:text-3xl font-bold text-krb-purple">What Our Customers Say</h2>
        </div>
        
        <div className="relative flex overflow-hidden">
          <div className="animate-marquee flex gap-8 py-4">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-[280px] sm:w-[320px] lg:w-[350px] bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <p className="text-slate-600 italic leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-1 bg-krb-blue rounded-full"></div>
                  <span className="font-bold text-krb-purple text-sm">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="bg-slate-100/70 border-y border-slate-200/80 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-48 opacity-40 pointer-events-none">
          <svg viewBox="0 0 1200 160" className="w-full h-full" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 70 C140 10, 260 10, 400 70 C540 130, 660 130, 800 70 C940 10, 1060 10, 1200 70" fill="none" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M0 84 C140 24, 260 24, 400 84 C540 144, 660 144, 800 84 C940 24, 1060 24, 1200 84" fill="none" stroke="#d1d5db" strokeWidth="2" />
            <path d="M0 98 C140 38, 260 38, 400 98 C540 158, 660 158, 800 98 C940 38, 1060 38, 1200 98" fill="none" stroke="#dbe2ea" strokeWidth="2" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 lg:pt-28 lg:pb-24 relative z-10">
          <motion.div {...fadeIn} className="max-w-3xl mb-14 lg:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-krb-purple leading-[1.1] tracking-tight">
              Exceptional services,
              <br />
              exceptional results
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
            {serviceHighlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className={index > 2 ? 'lg:col-span-1' : ''}
              >
                <h3 className="text-2xl sm:text-3xl lg:text-5xl font-light text-krb-purple mb-4 leading-tight underline underline-offset-8 decoration-1">
                  {item.title}
                </h3>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6 max-w-md">
                  {item.description}
                </p>
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-2 text-krb-purple font-bold text-sm underline underline-offset-4 hover:text-krb-blue transition-colors"
                >
                  <ChevronRight size={16} />
                  {item.linkText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div {...fadeIn} className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl relative z-10 aspect-video lg:aspect-square">
                <img 
                  src="/whykrb.jfif" 
                  alt="Quality Work" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 z-20 bg-krb-purple p-8 rounded-2xl shadow-xl text-white hidden sm:block">
                <div className="text-4xl font-bold mb-1">3+</div>
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-60">Years of Excellence</div>
              </div>
            </motion.div>

            <motion.div {...fadeIn}>
              <span className="section-subtitle">Why KRB?</span>
              <h2 className="section-title">The Standard of <br />Home Maintenance</h2>
              <p className="text-base lg:text-lg text-slate-600 mb-10 leading-relaxed">
                We combine traditional craftsmanship with modern efficiency to provide the best possible results for your home.
              </p>

              <div className="grid gap-6">
                {[
                  { title: 'Fully Insured', desc: 'Complete peace of mind with comprehensive public liability insurance.', icon: Shield },
                  { title: 'Reliable & Punctual', desc: 'We respect your time and always arrive when promised.', icon: Clock },
                  { title: 'Quality Guaranteed', desc: 'All our work is finished to the highest professional standards.', icon: CheckCircle2 },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-krb-blue shrink-0 shadow-sm">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-krb-purple mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div {...fadeIn}>
              <span className="section-subtitle">Where We Work</span>
              <h2 className="section-title">Serving Croydon & <br />South London</h2>
              <p className="text-slate-600 text-base lg:text-lg leading-relaxed">
                We provide expert home maintenance services across a wide range of locations in South London.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {['Croydon', 'Purley', 'Thornton Heath', 'Coulsdon', 'Sanderstead', 'Addiscombe', 'Shirley', 'Selhurst', 'Norbury', 'South Norwood'].map((area, i) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-slate-50 border border-slate-100 p-6 rounded-xl text-center hover:bg-white hover:shadow-md hover:border-krb-blue/20 transition-all group"
              >
                <MapPin size={18} className="mx-auto mb-3 text-krb-blue group-hover:scale-110 transition-transform" />
                <span className="font-bold text-krb-purple text-sm tracking-tight">{area}</span>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="mt-16 text-center">
            <Link to="/service-areas" className="btn-secondary inline-flex">
              All Service Areas
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-slate-100 pb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[1400px] mx-auto px-6"
        >
          <div className="bg-krb-purple px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-semibold tracking-tight mb-10">
              Delivering homes fit for the future
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 text-white">
              {[
                {
                  stat: '250+ homes',
                  label: 'customers',
                  text: 'Trusted by homeowners, landlords, and local businesses across Croydon and South London.',
                },
                {
                  stat: '5+ years',
                  label: 'experience',
                  text: 'Hands-on maintenance and improvement experience across a wide range of property types.',
                },
                {
                  stat: '100% insured',
                  label: 'projects',
                  text: 'Every project is backed by full insurance and delivered with safety and quality in mind.',
                },
                {
                  stat: 'Top-rated team',
                  label: 'service quality',
                  text: 'Known for punctual service, transparent pricing, and reliable workmanship from start to finish.',
                },
              ].map((item) => (
                <div key={item.stat}>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-3 leading-none">{item.stat}</h3>
                  <p className="text-white text-xl sm:text-2xl font-semibold mb-4 leading-snug">{item.label}</p>
                  <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <ImageShowcase
        eyebrow="Recent Projects"
        title="Work Completed By KRB"
        description="A quick look at completed jobs that show the quality, finish, and range of work we deliver across Croydon and South London."
        items={homeImageSlots}
      />
    </div>
  );
};

export default Home;
