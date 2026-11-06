import React from 'react';
import { mediaRegistry } from '../config/mediaRegistry';

export default function DiscoverSection() {
  const { primaryLandscape } = mediaRegistry.hero;

  return (
    <section className="discover-hero" id="home" aria-label="Northstar hero section">
      <div className="discover-hero-frame">
        <div className="discover-hero-image-wrap">
          <img src={primaryLandscape.src} alt={primaryLandscape.alt} loading="eager" decoding="async" />
        </div>

        <div className="discover-hero-content container">
          <div className="hero-location-block" aria-label="Patnitop location details">
            <p className="hero-location">PATNITOP · JAMMU &amp; KASHMIR</p>
            <p className="hero-coordinates">33.0850° N · 75.2825° E</p>
          </div>

          <div className="hero-copy">
            <h1>
              Less Planning.<br />
              <span>More Exploring.</span>
            </h1>
            <p className="hero-subtitle">Your next mountain escape starts here.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
