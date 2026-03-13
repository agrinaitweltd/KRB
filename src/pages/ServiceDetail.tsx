import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Mail, 
  Shield, 
  Clock, 
  ThumbsUp,
  ChevronRight,
  MapPin,
  Fence,
  Paintbrush,
  Tv,
  Hammer,
  Home as HomeIcon
} from 'lucide-react';
import { motion } from 'motion/react';

const serviceData: Record<string, any> = {
  'fencing': {
    title: 'Fencing Installation',
    heroImage: '/fencing-wide.png',
    description: 'Professional fencing services for privacy, security, and aesthetic appeal. We handle all types of residential fencing with expert installation.',
    benefits: [
      'Increased property privacy',
      'Enhanced home security',
      'Improved curb appeal',
      'Durable and long-lasting materials',
      'Professional, level installation'
    ],
    types: [
      'Lap Panel Fencing',
      'Closeboard Fencing',
      'Picket Fencing',
      'Trellis Installation',
      'Fence Post Repair & Replacement'
    ],
    icon: <Fence size={48} />
  },
  'painting': {
    title: 'Painting & Decorating',
    heroImage: '/kitchen-renovation.png',
    description: 'High-quality interior and exterior painting services to transform your home. We provide meticulous preparation and a flawless finish.',
    benefits: [
      'Professional, smooth finish',
      'Protection for your walls',
      'Increased property value',
      'Expert color consultation',
      'Clean and tidy workspace'
    ],
    types: [
      'Interior Wall & Ceiling Painting',
      'Exterior House Painting',
      'Woodwork & Trim Painting',
      'Wallpaper Removal',
      'Plaster Repairs'
    ],
    icon: <Paintbrush size={48} />
  },
  'mounting': {
    title: 'Mirror & TV Mounting',
    heroImage: '/mirrorinstallation.jpg',
    description: 'Secure and level mounting for TVs, mirrors, and heavy artwork. We ensure your items are safely attached to any wall type.',
    benefits: [
      'Secure and safe mounting',
      'Perfectly level positioning',
      'Neat cable management',
      'Expertise with all wall types',
      'Optimal viewing angles'
    ],
    types: [
      'TV Wall Mounting',
      'Large Mirror Installation',
      'Heavy Artwork Hanging',
      'Floating Shelf Installation',
      'Soundbar Mounting'
    ],
    icon: <Tv size={48} />
  },
  'handyman': {
    title: 'Handyman Services',
    heroImage: '/handymanservices.jpg',
    description: 'Reliable help for all those small jobs around the house. Our professional handymen handle the tasks you don\'t have time for.',
    benefits: [
      'Save time and effort',
      'Professional results',
      'Versatile skill set',
      'Reliable and punctual',
      'All tools provided'
    ],
    types: [
      'Flat-pack Furniture Assembly',
      'Door Handle & Lock Replacement',
      'Curtain Rail & Blind Fitting',
      'Basic Plumbing Repairs',
      'General Home Maintenance'
    ],
    icon: <Hammer size={48} />
  },
  'maintenance': {
    title: 'Property Maintenance',
    heroImage: '/propertmaintenance.jfif',
    description: 'Comprehensive property maintenance solutions to keep your home in top condition year-round. Preventive care for your biggest investment.',
    benefits: [
      'Prevent costly repairs',
      'Maintain property value',
      'Peace of mind',
      'Expert home assessment',
      'Year-round maintenance'
    ],
    types: [
      'Gutter Cleaning & Repair',
      'Pressure Washing (Driveways/Patios)',
      'Sealant & Caulking Replacement',
      'Damp Assessment',
      'General Home Inspections'
    ],
    icon: <HomeIcon size={48} />
  },
  'carpet-cleaning': {
    title: 'Carpet Cleaning',
    heroImage: '/carpet.jpg',
    description: 'Deep carpet cleaning for homes and rental properties, removing embedded dirt, allergens, and stains while protecting carpet fibers.',
    benefits: [
      'Fresh, hygienic carpets',
      'Stain and odor reduction',
      'Improved indoor air quality',
      'Extended carpet lifespan',
      'Fast-drying cleaning methods'
    ],
    types: [
      'Full-Room Carpet Cleaning',
      'Spot & Stain Treatment',
      'High-Traffic Area Refresh',
      'Pet Odor Neutralisation',
      'End of Tenancy Carpet Clean'
    ],
    icon: <HomeIcon size={48} />
  },
  'domestic-cleaning': {
    title: 'Domestic Cleaning',
    heroImage: '/domestic.jpg',
    description: 'Reliable domestic cleaning tailored to your home, whether you need one-off help or regular weekly and fortnightly cleaning visits.',
    benefits: [
      'Consistently clean home',
      'Flexible scheduling',
      'Attention to detail',
      'Trusted and respectful cleaners',
      'More free time for you'
    ],
    types: [
      'Weekly Domestic Cleaning',
      'Fortnightly Cleaning Visits',
      'One-Off Deep Cleans',
      'Kitchen & Bathroom Detailing',
      'Move-In / Move-Out Cleaning'
    ],
    icon: <HomeIcon size={48} />
  },
  'industrial-cleaning': {
    title: 'Industrial Cleaning',
    heroImage: '/industrial.jpg',
    description: 'Structured industrial cleaning services designed for high-traffic and operational spaces, with safe methods and minimal disruption.',
    benefits: [
      'Safer working environments',
      'Compliance-focused cleaning',
      'Reduced dust and residue buildup',
      'Scheduled around operations',
      'Professional equipment and methods'
    ],
    types: [
      'Factory Floor Cleaning',
      'Warehouse Deep Cleaning',
      'Post-Worksite Cleanups',
      'High-Level Dust Removal',
      'Machine Area Surface Cleaning'
    ],
    icon: <Hammer size={48} />
  },
  'office-cleaning': {
    title: 'Office Cleaning',
    heroImage: '/office.jpg',
    description: 'Professional office cleaning to maintain tidy desks, hygienic shared areas, and a welcoming environment for staff and visitors.',
    benefits: [
      'Cleaner, healthier workspaces',
      'Improved staff wellbeing',
      'Positive impression for clients',
      'Flexible after-hours cleaning',
      'Reliable recurring service plans'
    ],
    types: [
      'Daily Office Cleaning',
      'Reception & Lobby Cleaning',
      'Kitchenette & Breakroom Cleaning',
      'Washroom Sanitisation',
      'Desk & Touchpoint Disinfection'
    ],
    icon: <Tv size={48} />
  },
  'patio-cleaning': {
    title: 'Patio Cleaning',
    heroImage: '/fencing-close.png',
    description: 'Patio cleaning services that lift grime, algae, and weather staining from stone and slab surfaces to restore outdoor spaces.',
    benefits: [
      'Cleaner and brighter patio surfaces',
      'Reduced slip hazards',
      'Improved garden presentation',
      'Safe cleaning for varied materials',
      'Longer-lasting outdoor finishes'
    ],
    types: [
      'Pressure Patio Cleaning',
      'Algae & Moss Removal',
      'Joint Re-Sanding Prep',
      'Natural Stone Patio Care',
      'Seasonal Patio Refresh'
    ],
    icon: <Fence size={48} />
  },
  'driveway-cleaning': {
    title: 'Driveway Cleaning',
    heroImage: '/fencing-wide.png',
    description: 'Driveway cleaning for block paving, concrete, and tarmac to remove staining, weeds, and buildup for a cleaner exterior finish.',
    benefits: [
      'Improved kerb appeal',
      'Removal of oil and dirt marks',
      'Reduced weed and moss growth',
      'Safer, less slippery surfaces',
      'Prepared surfaces for sealing'
    ],
    types: [
      'Block Paving Driveway Cleaning',
      'Concrete Driveway Pressure Wash',
      'Tarmac Surface Cleaning',
      'Oil Mark Treatment',
      'Driveway Edge & Kerb Cleaning'
    ],
    icon: <HomeIcon size={48} />
  }
};

const ServiceDetail = () => {
  const SERVICE_IMAGE_FALLBACK = '/service-fallback.svg';
  const { id } = useParams<{ id: string }>();
  const service = id ? serviceData[id] : null;

  if (!service) {
    return <Navigate to="/services" />;
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[46vh] sm:h-[54vh] md:h-[60vh] flex items-center overflow-hidden bg-slate-200">
        <div className="absolute inset-0 z-0">
          <img 
            src={service.heroImage} 
            alt={service.title} 
            className="w-full h-full object-contain md:object-cover bg-slate-200"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = SERVICE_IMAGE_FALLBACK;
            }}
          />
          <div className="absolute inset-0 bg-krb-dark/45 md:bg-krb-dark/60"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <Link to="/services" className="text-krb-yellow font-bold text-xs uppercase tracking-[0.3em] hover:text-white transition-colors">Services</Link>
              <ChevronRight size={14} className="text-krb-yellow" />
              <span className="text-white font-bold text-xs uppercase tracking-[0.3em]">{service.title}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-6 sm:mb-8 leading-tight">
              {service.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 sm:gap-6 mb-10 sm:mb-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-krb-purple text-krb-yellow rounded-3xl flex items-center justify-center shadow-xl">
                  {service.icon}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-krb-purple">Service Overview</h2>
                  <div className="h-1 w-20 bg-krb-blue mt-2"></div>
                </div>
              </div>
              
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-10 sm:mb-12">
                At KRB Facilities Management, we provide expert {service.title.toLowerCase()} services tailored to the specific needs of Croydon homeowners. Our team combines years of experience with high-quality materials to deliver results that exceed expectations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-14 sm:mb-20">
                <div>
                  <h3 className="text-xl font-bold text-krb-purple mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-krb-blue/10 rounded-lg flex items-center justify-center text-krb-blue">
                      <CheckCircle2 size={18} />
                    </div>
                    Key Benefits
                  </h3>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600">
                        <div className="w-1.5 h-1.5 bg-krb-blue rounded-full mt-2 shrink-0"></div>
                        <span className="text-sm font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-krb-purple mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-krb-blue/10 rounded-lg flex items-center justify-center text-krb-blue">
                      <CheckCircle2 size={18} />
                    </div>
                    Types of {service.title}
                  </h3>
                  <ul className="space-y-4">
                    {service.types.map((type: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600">
                        <div className="w-1.5 h-1.5 bg-krb-blue rounded-full mt-2 shrink-0"></div>
                        <span className="text-sm font-medium">{type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-slate-50 p-6 sm:p-10 rounded-[32px] sm:rounded-[40px] border border-slate-100">
                <h3 className="text-2xl font-bold text-krb-purple mb-6">Our Process</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {[
                    { step: '01', title: 'Consultation', desc: 'We discuss your needs and provide a free quote.' },
                    { step: '02', title: 'Preparation', desc: 'We prepare the area and gather materials.' },
                    { step: '03', title: 'Execution', desc: 'We complete the work to the highest standard.' }
                  ].map((step, i) => (
                    <div key={i}>
                      <div className="text-3xl font-black text-krb-blue/20 mb-4">{step.step}</div>
                      <h4 className="font-bold text-krb-purple mb-2">{step.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                {/* Contact Card */}
                <div className="bg-krb-purple p-6 sm:p-10 rounded-[32px] sm:rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                  <h3 className="text-2xl font-bold mb-6 relative z-10">Get a Free Quote</h3>
                  <p className="text-white/70 text-sm mb-8 relative z-10">
                    Interested in our {service.title.toLowerCase()} services? Contact us today for a free, no-obligation estimate.
                  </p>
                  <div className="space-y-4 mb-10 relative z-10">
                    <a href="tel:02012345678" className="flex items-center gap-4 hover:text-krb-yellow transition-colors">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <Phone size={18} />
                      </div>
                      <span className="font-bold">020 1234 5678</span>
                    </a>
                    <a href="mailto:info@krbfm.co.uk" className="flex items-center gap-4 hover:text-krb-yellow transition-colors">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <Mail size={18} />
                      </div>
                      <span className="font-bold">info@krbfm.co.uk</span>
                    </a>
                  </div>
                  <Link 
                    to="/quote" 
                    className="block w-full bg-krb-yellow text-krb-purple py-4 rounded-full font-bold text-center text-sm uppercase tracking-widest hover:bg-white transition-all shadow-lg relative z-10"
                  >
                    Request Quote
                  </Link>
                </div>

                {/* Service Areas Card */}
                <div className="bg-slate-50 p-6 sm:p-10 rounded-[32px] sm:rounded-[40px] border border-slate-100">
                  <h3 className="text-xl font-bold text-krb-purple mb-6 flex items-center gap-3">
                    <MapPin size={20} className="text-krb-blue" />
                    Service Areas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Croydon', 'Purley', 'Thornton Heath', 'Coulsdon', 'Sanderstead'].map((area, i) => (
                      <span key={i} className="bg-white px-4 py-2 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-slate-200">
                        {area}
                      </span>
                    ))}
                  </div>
                  <Link to="/service-areas" className="inline-block mt-6 text-krb-blue font-bold text-xs uppercase tracking-widest hover:underline">
                    View All Areas
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Shield size={24} className="text-krb-blue mx-auto mb-2" />
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Insured</div>
                  </div>
                  <div className="text-center">
                    <Clock size={24} className="text-krb-blue mx-auto mb-2" />
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">On-Time</div>
                  </div>
                  <div className="text-center">
                    <ThumbsUp size={24} className="text-krb-blue mx-auto mb-2" />
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Guaranteed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 sm:py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-black text-krb-purple mb-8 sm:mb-12">Other Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(serviceData)
              .filter(([key]) => key !== id)
              .slice(0, 3)
              .map(([key, data]) => (
                <Link 
                  key={key} 
                  to={`/services/${key}`}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
                >
                  <h3 className="text-xl font-bold text-krb-purple mb-3 group-hover:text-krb-blue transition-colors">{data.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">{data.description}</p>
                  <span className="text-krb-blue font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    Learn More <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
