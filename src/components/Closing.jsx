import React from 'react';
import NatureIllustration from './Illustrations';

export default function Closing({ onOpenPlanner }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="closing-section" id="closing">
      <div className="container">
        
        {/* Editorial Closing Statement */}
        <div className="closing-content-block">
          <span className="label-tag">Begin Your Journey</span>
          <div className="nature-detail closing-leaf">
            <NatureIllustration variant="maple" />
          </div>
          
          <h2 className="closing-headline">
            The mountains are waiting.<br />
            Find your kind of somewhere.
          </h2>

          <p className="closing-subtext">
            Join us in Kud, Patnitop. Crisp deodar breezes, quiet ridgelines, and an escape shaped 
            entirely by your idea of discovery.
          </p>

          <div className="closing-cta-row">
            <button
              type="button"
              onClick={onOpenPlanner}
              className="btn-pill-primary closing-cta-btn"
              id="closing-build-experience-btn"
            >
              <span>Build Your Experience</span>
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </button>
          </div>
        </div>

        {/* Divider Hairline */}
        <div className="closing-divider"></div>

        {/* Editorial Footer Grid */}
        <div className="footer-meta-grid">
          
          <div className="footer-col-brand">
            <span className="footer-wordmark">NORTHSTAR</span>
            <p className="footer-tagline">
              An independent outdoor-experience sanctuary settled amidst the pine forests of Kud, Patnitop.
            </p>
            <div className="footer-coordinates">
              <span className="coord-label">33.0850° N, 75.2825° E · EL. 2,024 M</span>
              <span className="coord-label">PIR PANJAL, JAMMU & KASHMIR, INDIA</span>
            </div>
          </div>

          <div className="footer-col-nav">
            <span className="footer-heading">NAVIGATION</span>
            <ul className="footer-link-list">
              <li>
                <button type="button" onClick={() => scrollToSection('home')}>
                  The Beginning
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('explore')}>
                  Explore Gallery
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('stay')}>
                  Your Stay
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('stay')}>
                  The house
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-col-contact">
            <span className="footer-heading">CONCIERGE & INQUIRIES</span>
            <p className="footer-contact-text">
              For upcoming seasonal bookings, private buyouts, or expedition notes:
            </p>
            <a href="mailto:hello@northstarkud.com" className="footer-email-link">
              hello@northstarkud.com ↗
            </a>
            <div className="footer-status-pill">
              <span className="status-live-dot"></span>
              <span>PHASE 1 · BRAND IDENTITY & SANCTUARY LAUNCH</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <span className="footer-copy">
            © {new Date().getFullYear()} Northstar Mountain Sanctuary. All rights reserved.
          </span>
          <button type="button" onClick={scrollToTop} className="footer-back-to-top">
            <span>Back to top</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
