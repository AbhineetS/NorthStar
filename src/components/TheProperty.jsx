import React from 'react';
import { mediaRegistry } from '../config/mediaRegistry';

export default function TheProperty() {
  const property = mediaRegistry.property;

  return (
    <section className="section property-section" id="property">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header-row">
          <span className="editorial-label">The Property</span>
          <span className="coord-label">KUD, PATNITOP · BASECAMP & SANCTUARY</span>
        </div>

        <div className="property-header-block">
          <h2 className="section-title">
            Settled gently into the pine slopes.
          </h2>
          <p className="section-subtitle">
            Crafted as a tranquil refuge and launchpad for outdoor discovery. 
            Framed by stone, timber, and panoramic views of the Pir Panjal mountains.
          </p>
        </div>

        {/* Large Photographic Showcase Composition */}
        <div className="property-photo-grid">
          
          {/* Main Full-Width Alpine Exterior Feature */}
          <div className="property-feature-hero floating-photo">
            <img
              src={property.exterior.src}
              alt="Northstar lodge exterior set amidst pine trees in Kud"
              loading="eager"
              decoding="async"
            />
            <div className="property-caption-overlay">
              <span className="property-tag">THE BASECAMP</span>
              <h3 className="property-caption-title">{property.exterior.title}</h3>
              <p className="property-caption-desc">{property.exterior.caption}</p>
            </div>
          </div>

          {/* Staggered Secondary Pair: Terrace & Living Space */}
          <div className="property-dual-row">
            
            {/* Terrace Frame */}
            <div className="property-item property-item-terrace">
              <div className="property-img-wrap floating-photo">
                <img
                  src={property.terrace.src}
                  alt="Mountain-facing terrace with valley view"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="property-item-text">
                <h4 className="property-item-title">{property.terrace.title}</h4>
                <p className="property-item-desc">{property.terrace.caption}</p>
              </div>
            </div>

            {/* Living Space Frame */}
            <div className="property-item property-item-living">
              <div className="property-img-wrap floating-photo">
                <img
                  src={property.living.src}
                  alt="Cozy cedar living room with stone fireplace"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="property-item-text">
                <h4 className="property-item-title">{property.living.title}</h4>
                <p className="property-item-desc">{property.living.caption}</p>
              </div>
            </div>

          </div>

          {/* Tertiary Row: Bedroom & Immediate Forest Surroundings */}
          <div className="property-bottom-row">
            
            <div className="property-item property-item-bedroom">
              <div className="property-img-wrap floating-photo">
                <img
                  src={property.bedroom.src}
                  alt="Serene bedroom sanctuary with mountain morning light"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="property-item-text">
                <h4 className="property-item-title">{property.bedroom.title}</h4>
                <p className="property-item-desc">{property.bedroom.caption}</p>
              </div>
            </div>

            <div className="property-item property-item-surroundings">
              <div className="property-img-wrap floating-photo">
                <img
                  src={property.surroundings.src}
                  alt="Immediate surroundings with pine forest trails"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="property-item-text">
                <h4 className="property-item-title">{property.surroundings.title}</h4>
                <p className="property-item-desc">{property.surroundings.caption}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
