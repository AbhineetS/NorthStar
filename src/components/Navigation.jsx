import React, { useState, useEffect } from 'react';

export default function Navigation({ onOpenPlanner }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const marker = window.innerHeight * 0.35;
      const current = ['home', 'explore', 'stay']
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .find((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= marker && bounds.bottom > marker;
        });
      if (current) setActiveSection(current.id);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className={`nav-header ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-inner container">
        {/* Brand Wordmark & Location */}
        <a href="#home" className="nav-brand" aria-label="Northstar Home">
          <span className="brand-name">NORTHSTAR</span>
          <span className="brand-sub">DESTINATIONS, EXPERIENCES & GETAWAYS</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links" aria-label="Main Navigation">
          <button type="button" onClick={() => scrollToSection('home')} className="nav-link">Home</button>
          <button type="button" onClick={() => scrollToSection('stay')} className="nav-link">Stay</button>
          <button type="button" onClick={() => scrollToSection('explore')} className="nav-link">Explore</button>
        </nav>

        {/* Action Button */}
        <div className="nav-actions">
          <button
            type="button"
            onClick={onOpenPlanner}
            className={`btn-pill-primary nav-cta-btn ${activeSection === 'home' ? '' : 'nav-cta-hidden'}`}
            id="nav-plan-escape"
            aria-hidden={activeSection !== 'home'}
            tabIndex={activeSection === 'home' ? 0 : -1}
          >
            <span>Build Your Experience</span>
            <span className="arrow-icon" aria-hidden="true">↗</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'drawer-visible' : ''}`}>
        <div className="mobile-drawer-inner">
          <span className="coord-label mobile-coords">33.0850° N, 75.2825° E · KUD</span>
          <nav className="mobile-nav-links">
            <button 
              type="button" 
              onClick={() => scrollToSection('home')} 
              className="mobile-nav-link"
            >
              Home
            </button>
            <button 
              type="button" 
              onClick={() => scrollToSection('stay')} 
              className="mobile-nav-link"
            >
              Stay
            </button>
            <button 
              type="button" 
              onClick={() => scrollToSection('explore')} 
              className="mobile-nav-link"
            >
              Explore
            </button>
            <button 
              type="button" 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPlanner();
              }}
              className="mobile-nav-link"
            >
              Build Your Experience
            </button>
          </nav>
          <div className="mobile-cta-wrap">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPlanner();
              }}
              className="btn-pill-primary mobile-cta"
            >
              <span>Build Your Experience</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
