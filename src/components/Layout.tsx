import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Menu, 
  X,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  Accessibility,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CookieBanner from './CookieBanner';

interface LayoutProps {
  children: React.ReactNode;
}

interface SubmenuItem {
  name: string;
  path: string;
}

interface DropdownItem {
  name: string;
  path?: string;
  children?: SubmenuItem[];
}

interface NavItem {
  name: string;
  path: string;
  dropdown?: DropdownItem[];
}

const WEBSITE_URL = 'https://krbfm.co.uk';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const MAIN_LOGO_SRC = '/krb-logo.png';
  const MAIN_LOGO_ALT = 'KRB Facilities Management Limited';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isCleaningOpen, setIsCleaningOpen] = useState(false);
  const [isMobileCleaningOpen, setIsMobileCleaningOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Reset nav state after route changes to avoid stale mobile overlays.
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
    setIsCleaningOpen(false);
    setIsMobileCleaningOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services', dropdown: [
      { name: 'Fencing Installation', path: '/services/fencing' },
      { name: 'Painting & Decorating', path: '/services/painting' },
      { name: 'Mirror Installation', path: '/services/mounting' },
      { name: 'TV Mounting', path: '/services/mounting' },
      { name: 'General Handyman Services', path: '/services/handyman' },
      { name: 'Property Maintenance', path: '/services/maintenance' },
      {
        name: 'Cleaning',
        children: [
          { name: 'Carpet Cleaning', path: '/services/carpet-cleaning' },
          { name: 'Domestic Cleaning', path: '/services/domestic-cleaning' },
          { name: 'Industrial Cleaning', path: '/services/industrial-cleaning' },
          { name: 'Office Cleaning', path: '/services/office-cleaning' },
          { name: 'Patio Cleaning', path: '/services/patio-cleaning' },
          { name: 'Driveway Cleaning', path: '/services/driveway-cleaning' },
        ],
      },
    ]},
    { name: 'Service Areas', path: '/service-areas' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const hasActiveDropdownItem = (item: DropdownItem) => {
    if (item.path && isActive(item.path)) {
      return true;
    }
    if (item.children) {
      return item.children.some((child) => isActive(child.path));
    }
    return false;
  };

  const handleCompactMenuClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 selection:bg-krb-blue/20 selection:text-krb-purple">
      <CookieBanner />
      
      {/* Header */}
      <header
        className="w-full z-[150] sticky top-0 bg-slate-100 border-b border-slate-200 font-google-sans"
        style={{
          ['--color-krb-purple' as string]: '#3d1d4d',
          ['--color-krb-blue' as string]: '#0088cc',
          ['--color-krb-yellow' as string]: '#f5b800',
        }}
      >
        {/* Desktop top row */}
        <div className={`hidden lg:block border-b border-slate-200 overflow-hidden transition-all duration-300 ${scrolled ? 'max-h-0 opacity-0 border-b-0' : 'max-h-24 opacity-100'}`}>
          <div className="max-w-7xl mx-auto px-6 h-[72px] flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <div className="w-40 h-auto flex items-center justify-center overflow-hidden">
                <img
                  src={MAIN_LOGO_SRC}
                  alt={MAIN_LOGO_ALT}
                  className="w-full h-auto object-contain"
                />
              </div>
            </Link>

            <div className="flex flex-col items-end gap-1 text-[10px] font-bold text-krb-purple tracking-wide">
              <div className="flex items-center gap-4">
                <Link
                  to="/about"
                  className="px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 hover:bg-[#59b947] hover:text-white active:bg-[#59b947] active:text-white"
                >
                  About us <ChevronDown size={12} />
                </Link>
                <button
                  type="button"
                  className={`px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 ${isServicesOpen ? 'bg-[#59b947] text-white' : 'hover:bg-[#59b947] hover:text-white active:bg-[#59b947] active:text-white'}`}
                  onClick={() => setIsServicesOpen((open) => !open)}
                >
                  Our expertise
                  <ChevronDown size={12} className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <Link
                  to="/service-areas"
                  className="px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 hover:bg-[#59b947] hover:text-white active:bg-[#59b947] active:text-white"
                >
                  Service areas <ChevronDown size={12} />
                </Link>
                <Link
                  to="/contact"
                  className="px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 hover:bg-[#59b947] hover:text-white active:bg-[#59b947] active:text-white"
                >
                  Contact us <ChevronDown size={12} />
                </Link>
              </div>
              <div className="flex items-center gap-3 px-2.5">
                <a href="tel:02012345678" className="hover:text-krb-blue transition-colors">020 1234 5678</a>
                <span className="text-slate-300">|</span>
                <a href="mailto:info@krbfm.co.uk" className="hover:text-krb-blue transition-colors">info@krbfm.co.uk</a>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop nav row */}
        <div className={`hidden lg:block bg-slate-50 transition-all duration-300 ${scrolled ? 'max-h-0 opacity-0 overflow-hidden' : 'max-h-24 opacity-100 overflow-visible'}`}>
          <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between gap-8">
            <nav className="flex items-center gap-2">
              {navLinks.map((link) => (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setIsServicesOpen(true)}
                  onMouseLeave={() => link.dropdown && setIsServicesOpen(false)}
                >
                  <Link
                    to={link.path}
                    onClick={(e) => {
                      if (link.dropdown) {
                        e.preventDefault();
                        setIsServicesOpen((open) => !open);
                      }
                    }}
                    className={`px-3.5 py-2 rounded-lg text-[15px] font-bold tracking-wide transition-colors flex items-center gap-1.5 ${
                      link.dropdown && isServicesOpen
                        ? 'bg-[#59b947] text-white'
                        : 'text-krb-purple/90 hover:bg-[#59b947] hover:text-white active:bg-[#59b947] active:text-white'
                    }`}
                  >
                    {link.name}
                    {link.dropdown && <ChevronDown size={12} className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />}
                  </Link>

                  {link.dropdown && (
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 mt-2"
                        >
                          <div className="grid gap-1">
                            {link.dropdown.map((sub) => (
                              sub.children ? (
                                <div
                                  key={sub.name}
                                  className="relative"
                                  onMouseEnter={() => setIsCleaningOpen(true)}
                                  onMouseLeave={() => setIsCleaningOpen(false)}
                                >
                                  <button
                                    type="button"
                                    className={`w-full px-4 py-3 rounded-xl text-[13px] font-semibold transition-all flex items-center justify-between ${
                                      isCleaningOpen
                                        ? 'bg-[#59b947] text-white'
                                        : 'text-slate-600 hover:bg-[#59b947] hover:text-white active:bg-[#59b947] active:text-white'
                                    }`}
                                    onClick={() => setIsCleaningOpen((open) => !open)}
                                  >
                                    {sub.name}
                                    <ChevronRight size={14} className={`transition-transform ${isCleaningOpen ? 'translate-x-0.5' : ''}`} />
                                  </button>

                                  <AnimatePresence>
                                    {isCleaningOpen && (
                                      <motion.div
                                        initial={{ opacity: 0, x: 8, scale: 0.98 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: 8, scale: 0.98 }}
                                        className="absolute top-0 left-full z-30"
                                      >
                                        <div className="w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3">
                                          <div className="flex flex-col gap-1">
                                          {sub.children.map((child) => (
                                            <Link
                                              key={child.name}
                                              to={child.path}
                                              className="w-full px-4 py-3 rounded-xl text-[13px] font-semibold transition-all flex items-center justify-between group/sub text-slate-600 hover:bg-[#59b947] hover:text-white active:bg-[#59b947] active:text-white"
                                            >
                                              {child.name}
                                              <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all" />
                                            </Link>
                                          ))}
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ) : (
                                <Link
                                  key={sub.name}
                                  to={sub.path || '/services'}
                                  className="px-4 py-3 rounded-xl text-[13px] font-semibold transition-all flex items-center justify-between group/sub text-slate-600 hover:bg-[#59b947] hover:text-white active:bg-[#59b947] active:text-white"
                                >
                                  {sub.name}
                                  <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all" />
                                </Link>
                              )
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 h-11 rounded-lg border border-slate-200 bg-white pl-4 pr-10 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-krb-purple/30"
                />
                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-krb-purple" />
              </div>
              <Link
                to="/quote"
                className="px-4 h-11 rounded-lg bg-krb-purple text-white text-xs font-bold tracking-wide hover:bg-krb-blue transition-colors inline-flex items-center gap-2"
              >
                Quote
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop compact row on scroll */}
        <div className={`hidden lg:block overflow-hidden transition-all duration-300 ${scrolled ? 'max-h-28 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-6 h-[76px] flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <div className="w-36 h-auto flex items-center justify-center overflow-hidden">
                <img
                  src={MAIN_LOGO_SRC}
                  alt={MAIN_LOGO_ALT}
                  className="w-full h-auto object-contain"
                />
              </div>
            </Link>

            <button
              type="button"
              onClick={handleCompactMenuClick}
              className="h-8 px-4 border border-krb-purple text-krb-purple text-[11px] font-black uppercase tracking-[0.16em] inline-flex items-center gap-1 hover:bg-krb-purple hover:text-white transition-colors"
            >
              Menu
              <ChevronUp size={12} />
            </button>
          </div>
        </div>

        {/* Mobile Header Bar */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="lg:hidden bg-white border-b border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center gap-3">
            <Link to="/" className="flex items-center">
              <div className="w-32 sm:w-36 h-auto flex items-center justify-center overflow-hidden">
                <img
                  src={MAIN_LOGO_SRC}
                  alt={MAIN_LOGO_ALT}
                  className="w-full h-auto object-contain"
                />
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="w-11 h-11 flex items-center justify-center rounded-xl text-krb-purple bg-white transition-all duration-300 active:scale-95"
                aria-label="Accessibility"
              >
                <Accessibility size={22} />
              </button>
              <button
                type="button"
                className="w-11 h-11 flex items-center justify-center rounded-xl text-krb-purple bg-white transition-all duration-300 active:scale-95"
                aria-label="Search"
              >
                <Search size={22} />
              </button>
              <button
                type="button"
                className="w-11 h-11 flex items-center justify-center rounded-xl text-krb-purple bg-white transition-all duration-300 active:scale-95"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-x-0 top-[74px] bottom-0 z-[200] bg-[#5a1f70] lg:hidden overflow-y-auto"
            >
              <div className="border-t border-black/25">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * i }}
                    className="border-b border-black/25"
                  >
                    {link.dropdown ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setIsMobileServicesOpen((open) => !open)}
                          className="w-full flex items-stretch text-white uppercase"
                        >
                          <span className="flex-1 px-6 py-5 text-[18px] font-bold tracking-wide text-left">
                            {link.name}
                          </span>
                          <span className="w-16 border-l border-black/25 flex items-center justify-center">
                            <ChevronRight size={24} className={`transition-transform ${isMobileServicesOpen ? 'rotate-90' : ''}`} />
                          </span>
                        </button>

                        <AnimatePresence>
                          {isMobileServicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden bg-[#4f1a64] border-t border-black/25"
                            >
                              {link.dropdown.map((sub) => (
                                sub.children ? (
                                  <div key={sub.name} className="border-b border-black/20">
                                    <button
                                      type="button"
                                      className="w-full flex items-stretch text-white uppercase"
                                      onClick={() => setIsMobileCleaningOpen((open) => !open)}
                                    >
                                      <span className="flex-1 px-8 py-4 text-[15px] font-semibold tracking-wide text-left">
                                        {sub.name}
                                      </span>
                                      <span className="w-14 border-l border-black/20 flex items-center justify-center">
                                        <ChevronRight size={20} className={`transition-transform ${isMobileCleaningOpen ? 'rotate-90' : ''}`} />
                                      </span>
                                    </button>

                                    <AnimatePresence>
                                      {isMobileCleaningOpen && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          className="overflow-hidden bg-[#46145a]"
                                        >
                                          {sub.children.map((child) => (
                                            <Link
                                              key={child.name}
                                              to={child.path}
                                              className="block px-10 py-3 text-white/95 text-[14px] font-medium border-t border-black/15"
                                              onClick={() => setIsMenuOpen(false)}
                                            >
                                              {child.name}
                                            </Link>
                                          ))}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                ) : (
                                  <Link
                                    key={sub.name}
                                    to={sub.path || '/services'}
                                    className="block px-8 py-4 text-white text-[15px] font-semibold uppercase tracking-wide border-b border-black/20"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {sub.name}
                                  </Link>
                                )
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        className="block px-6 py-5 text-white text-[18px] font-bold uppercase tracking-wide"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}

                <div className="p-5 border-t border-black/25 bg-[#4f1a64]">
                  <Link
                    to="/quote"
                    className="bg-krb-blue text-white w-full py-3.5 rounded-xl font-bold text-center shadow-lg flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get a Free Quote
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
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
                  <span>020 1234 5678</span>
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
