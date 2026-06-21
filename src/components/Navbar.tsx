'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import logoImg from '../app/svit_logo.png';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ── Scroll listener for glass effect ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Intersection observer for active section ── */
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ── Smooth scroll handler ── */
  const scrollTo = useCallback(
    (href: string) => {
      setMobileOpen(false);
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  /* ── Lock body scroll when mobile drawer is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`sticky top-0 left-0 right-0 z-50 bg-white py-6 transition-all duration-500 border-b border-black/5 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#home')}
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Scroll to top"
          >
            <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Image src={logoImg} alt="Sri Venkateshwara Infra Tech Logo" width={80} height={80} className="object-contain" />
            </div>
            <div className="text-left">
              <p className="text-lg font-bold leading-tight tracking-wide text-navy font-heading">
                Sri Venkateshwara
              </p>
              <p className="text-[10px] text-gold tracking-[0.2em] uppercase font-semibold">
                Infra Tech
              </p>
            </div>
          </button>

          {/* Desktop Links & CTA */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className={`relative pb-1 text-sm font-medium tracking-wide transition-colors duration-300 cursor-pointer ${
                        isActive 
                          ? 'text-navy font-bold' 
                          : 'text-dark-gray hover:text-navy'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-gold rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 cursor-pointer text-navy transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white shadow-2xl z-50 md:hidden flex flex-col"
            >
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-navy p-2 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              <ul className="flex flex-col gap-2 px-6">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <button
                        onClick={() => scrollTo(link.href)}
                        className={`w-full text-left py-3 px-4 rounded-lg text-base font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'text-gold bg-gold/10'
                            : 'text-navy hover:text-blue hover:bg-light-bg'
                        }`}
                      >
                        {link.label}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
