import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Accessibility,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CookieBanner from './CookieBanner';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const WEBSITE_URL = 'https://krbfm.co.uk';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const MAIN_LOGO_SRC = '/krb-logo.png';
  const MAIN_LOGO_ALT = 'KRB Facilities Management Limited';
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 selection:bg-krb-blue/20 selection:text-krb-purple">
      <CookieBanner />
      <Header />

      {/* Main Content */}
      <main className="flex-grow pt-[74px] lg:pt-[142px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer
        className="bg-slate-100 pt-0 pb-10 px-6 text-slate-700"
        style={{
          ['--color-krb-purple' as string]: '#3d1d4d',
          ['--color-krb-blue' as string]: '#0088cc',
          ['--color-krb-yellow' as string]: '#f5b800',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 mb-14 pt-10">
            {/* Logo and About */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <Link to="/" className="flex items-center justify-center lg:justify-start gap-4 mb-7">
                <div className="w-52 h-auto flex items-center justify-center lg:justify-start">
                  <img
                    src={MAIN_LOGO_SRC}
                    alt={MAIN_LOGO_ALT}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </Link>
              <p className="text-slate-600 text-base leading-relaxed mb-7 max-w-md mx-auto lg:mx-0">
                Professional home maintenance and handyman services for residential properties across Croydon and South London. Reliable, affordable, and high-quality.
              </p>
              <div className="flex gap-3 justify-center lg:justify-start">
                {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-krb-blue hover:border-krb-blue transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-3">
              <h4 className="text-krb-purple font-bold text-xs mb-6 uppercase tracking-[0.25em]">Quick Links</h4>
              <ul className="space-y-3 text-sm text-slate-600 font-medium">
                <li><Link to="/" className="hover:text-krb-purple transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-krb-purple transition-colors">Our Company</Link></li>
                <li><Link to="/services" className="hover:text-krb-purple transition-colors">Services</Link></li>
                <li><Link to="/service-areas" className="hover:text-krb-purple transition-colors">Service Areas</Link></li>
                <li><Link to="/contact" className="hover:text-krb-purple transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h4 className="text-krb-purple font-bold text-xs mb-6 uppercase tracking-[0.25em]">Contact Info</h4>
              <ul className="space-y-4 text-sm text-slate-600 font-medium">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-krb-blue mt-1 shrink-0" />
                  <span className="leading-relaxed">Serving Croydon, Purley, Thornton Heath, Coulsdon & South London</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-krb-blue shrink-0" />
                  <span>0333 577 2280 / +44 7746 343913</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-krb-blue shrink-0" />
                  <span>info@krbfm.co.uk</span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={16} className="text-krb-blue shrink-0" />
                  <a
                    href={WEBSITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-krb-purple transition-colors"
                  >
                    krbfm.co.uk
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-300 flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-xs font-semibold text-slate-500 tracking-wide">
              © {new Date().getFullYear()} KRB Facilities Management Limited.Made & Designed By <a href="https://www.kavotech.uk" target="_blank" rel="noopener noreferrer" className="hover:text-krb-purple transition-colors">Kavo Tech Uk</a>.
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs font-medium text-slate-500">
              <Link to="#" className="hover:text-krb-purple transition-colors">Accessibility</Link>
              <Link to="#" className="hover:text-krb-purple transition-colors">Cookie policy</Link>
              <Link to="#" className="hover:text-krb-purple transition-colors">Privacy notice</Link>
              <Link to="#" className="hover:text-krb-purple transition-colors">Site terms</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Accessibility Floating Button */}
      <button className="hidden md:flex fixed bottom-8 right-8 bg-white text-krb-purple w-14 h-14 rounded-2xl shadow-2xl items-center justify-center z-[90] border border-slate-100 hover:bg-krb-blue hover:text-white transition-all duration-500 hover:scale-110 group">
        <Accessibility size={24} className="group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};

export default Layout;
