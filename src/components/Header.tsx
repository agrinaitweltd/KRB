import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  Accessibility,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

const MAIN_LOGO_SRC = '/krb-logo.png';
const MAIN_LOGO_ALT = 'KRB Facilities Management Limited';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isCleaningOpen, setIsCleaningOpen] = useState(false);
  const [isMobileCleaningOpen, setIsMobileCleaningOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const allServices = [
    { name: 'Fencing Installation', path: '/services/fencing' },
    { name: 'Painting & Decorating', path: '/services/painting' },
    { name: 'Mirror Installation', path: '/services/mounting' },
    { name: 'TV Mounting', path: '/services/mounting' },
    { name: 'General Handyman Services', path: '/services/handyman' },
    { name: 'Property Maintenance', path: '/services/maintenance' },
    { name: 'Carpet Cleaning', path: '/services/carpet-cleaning' },
    { name: 'Domestic Cleaning', path: '/services/domestic-cleaning' },
    { name: 'Industrial Cleaning', path: '/services/industrial-cleaning' },
    { name: 'Office Cleaning', path: '/services/office-cleaning' },
    { name: 'Patio Cleaning', path: '/services/patio-cleaning' },
    { name: 'Driveway Cleaning', path: '/services/driveway-cleaning' },
    { name: 'General Repairs', path: '/services/repairs' },
    { name: 'Security Services', path: '/services/security-services' },
  ];

  const filteredServices = searchQuery.trim()
    ? allServices.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : allServices;

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
    setIsCleaningOpen(false);
    setIsMobileCleaningOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const navLinks: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    {
      name: 'Services',
      path: '/services',
      dropdown: [
        { name: 'Fencing Installation', path: '/services/fencing' },
        { name: 'Painting & Decorating', path: '/services/painting' },
        { name: 'Mirror Installation', path: '/services/mounting' },
        { name: 'TV Mounting', path: '/services/mounting' },
        { name: 'General Handyman Services', path: '/services/handyman' },
        { name: 'Property Maintenance', path: '/services/maintenance' },
        { name: 'Security Services', path: '/services/security-services' },
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
      ],
    },
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
    <header
      className="w-full z-[150] fixed top-0 left-0 bg-slate-100 border-b border-slate-200 font-google-sans"
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
              <a href="tel:03335772280" className="hover:text-krb-blue transition-colors">0333 577 2280</a>
              <span className="text-slate-300">|</span>
              <a href="tel:+447746343913" className="hover:text-krb-blue transition-colors">+44 7746 343913</a>
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
              aria-label="Search services"
              onClick={() => {
                setIsSearchOpen(true);
                setIsMenuOpen(false);
              }}
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

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[250] bg-[#003a70] lg:hidden flex flex-col"
          >
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/15">
              <Search size={20} className="text-white/60 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white text-lg placeholder-white/40 outline-none font-medium"
              />
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Close search"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3">
              {filteredServices.length > 0 ? (
                <div className="space-y-1">
                  {filteredServices.map((service, i) => (
                    <motion.div
                      key={service.path + service.name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.2 }}
                    >
                      <Link
                        to={service.path}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center justify-between px-4 py-4 rounded-xl text-white hover:bg-white/10 transition-colors group"
                      >
                        <span className="text-[15px] font-medium">{service.name}</span>
                        <ArrowRight size={16} className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Search size={40} className="text-white/20 mx-auto mb-4" />
                  <p className="text-white/50 text-sm font-medium">No services found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[74px] bottom-0 z-[200] bg-[#003a70] lg:hidden overflow-y-auto"
          >
            <div>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * i }}
                  className="border-b border-white/15"
                >
                  {link.dropdown ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsMobileServicesOpen((open) => !open)}
                        className="w-full flex items-center justify-between text-white uppercase px-5 py-5"
                      >
                        <span className="text-[15px] font-semibold tracking-[0.12em]">
                          {link.name}
                        </span>
                        <ChevronRight size={20} className={`text-white/70 transition-transform ${isMobileServicesOpen ? 'rotate-90' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isMobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden bg-[#002a55]"
                          >
                            {link.dropdown.map((sub) => (
                              sub.children ? (
                                <div key={sub.name} className="border-t border-white/10">
                                  <button
                                    type="button"
                                    className="w-full flex items-center justify-between text-white uppercase px-7 py-4"
                                    onClick={() => setIsMobileCleaningOpen((open) => !open)}
                                  >
                                    <span className="text-[13px] font-semibold tracking-[0.1em]">
                                      {sub.name}
                                    </span>
                                    <ChevronRight size={18} className={`text-white/60 transition-transform ${isMobileCleaningOpen ? 'rotate-90' : ''}`} />
                                  </button>

                                  <AnimatePresence>
                                    {isMobileCleaningOpen && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden bg-[#001f42]"
                                      >
                                        {sub.children.map((child) => (
                                          <Link
                                            key={child.name}
                                            to={child.path}
                                            className="block px-9 py-3.5 text-white/90 text-[13px] font-medium border-t border-white/8"
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
                                  className="block px-7 py-4 text-white text-[13px] font-semibold uppercase tracking-[0.1em] border-t border-white/10"
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
                      className="block px-5 py-5 text-white text-[15px] font-semibold uppercase tracking-[0.12em]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
