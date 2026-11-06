import React from 'react';
import { mediaRegistry } from '../config/mediaRegistry';
import NatureIllustration from './Illustrations';

export default function Hero({ onOpenPlanner }) {
  const { primaryLandscape, forestMist, hearthGlow } = mediaRegistry.hero;

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-container">
        
        {/* Editorial Sub-bar */}
        <div className="hero-top-meta">
          <span className="editorial-label">Kud, Patnitop</span>
          <span className="coord-label">33.0850° N, 75.2825° E · 2,024M</span>
        </div>

        {/* Refined Editorial Headline & Context Row */}
        <div className="hero-typography-block">
          <h1 className="hero-headline">
            <span>Make room</span>
            <span className="hero-headline-indent">for the quiet.</span>
          </h1>

          <div className="hero-narrative-row">
            <p className="hero-description">
              A considered mountain stay in Kud, Patnitop — made for long walks, warm light, and time that opens up.
            </p>

            <button
              type="button"
              onClick={onOpenPlanner}
              className="btn-pill-primary hero-cta-action"
              id="hero-build-cta"
            >
              <span>Build Your Experience</span>
              <span className="cta-arrow" aria-hidden="true">↗</span>
            </button>
          </div>
        </div>

        {/* Floating Asymmetric Photographic Composition (Clean, no badges, pure photography) */}
        <div className="hero-canvas" aria-label="Northstar landscape composition">
          <div className="nature-detail hero-birds">
            <NatureIllustration variant="birds" />
          </div>

          <div className="nature-detail hero-mountain">
            <NatureIllustration variant="mountain" />
          </div>

          <div className="nature-detail hero-maple">
            <NatureIllustration variant="maple" />
          </div>
          
          {/* Main Scenic Mountain Landscape (Left, angled slightly) */}
          <div className="hero-photo-wrapper hero-photo-main floating-photo">
            <img
              src={primaryLandscape.src}
              alt={primaryLandscape.alt}
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Vertical Deodar Forest View (Right, offset vertically) */}
          <div className="hero-photo-wrapper hero-photo-secondary floating-photo">
            <img
              src={forestMist.src}
              alt={forestMist.alt}
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Intimate Supporting Detail (Center-overlapping, subtle scale) */}
          <div className="hero-photo-wrapper hero-photo-detail floating-photo">
            <img
              src={hearthGlow.src}
              alt={hearthGlow.alt}
              loading="eager"
              decoding="async"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
