import React, { useState } from 'react';
import NatureIllustration from './Illustrations';

const TRIP_INTENTS = [
  {
    id: 'solo-reset',
    label: 'Solo Reset & Stillness',
    headline: 'Unhurried solitude in the high pine air',
    highlights: ['Forest trail meditation', 'Quiet reading by the stone fireplace', 'Pahadi tea on the private terrace'],
    vibe: 'Ideal for creative focus, deep rest, and unhurried mountain walks.',
  },
  {
    id: 'ridge-trekking',
    label: 'High Ridge Exploration',
    headline: 'Active ascents and wild deodar ridges',
    highlights: ['Guided ridgeline expedition', 'Natural freshwater spring trek', 'Open-air packed alpine lunch'],
    vibe: 'Tailored for energetic explorers seeking fresh elevation and hidden viewpoints.',
  },
  {
    id: 'hearth-stars',
    label: 'Hearth & Stargazing',
    headline: 'Twilight embers and crystal night skies',
    highlights: ['Bonfire BBQ under the open sky', 'Constellation viewing session', 'Night walks along the cedar grove'],
    vibe: 'Crafted for late evenings, warm conversation, and dark-sky wonder.',
  },
  {
    id: 'culinary-immersion',
    label: 'Pahadi Gastronomy',
    headline: 'Authentic local tastes and slow mornings',
    highlights: ['Slow-simmered traditional Pahadi breakfast', 'Kashmiri Kahwa brewing', 'Locally sourced evening grill'],
    vibe: 'Designed for food lovers celebrating authentic mountain recipes and local ingredients.',
  },
];

export default function DesignYourEscape({ onOpenPlanner }) {
  const [activeIntent, setActiveIntent] = useState(TRIP_INTENTS[0]);

  return (
    <section className="section design-escape-section" id="design-escape">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header-row">
          <span className="label-tag">Personalised Itineraries</span>
          <span className="coord-label">PHASE 2 PREVIEW</span>
        </div>

        <div className="design-main-card">
          <div className="design-header-content">
            <h2 className="design-headline">
              Your escape. Your way.
            </h2>
            <p className="design-subtext">
              Choose your experiences, plan your journey, and create a mountain getaway that feels like yours.
            </p>
          </div>

          {/* Philosophy Explanation Box */}
          <div className="design-philosophy-banner">
            <div className="philosophy-label">BEYOND STANDARD LODGING</div>
            <div className="design-banner-row">
              <p className="philosophy-text">
                Most stays offer just a key and a room. Northstar is reimagining the mountain holiday: 
                you will soon be able to curate every chapter of your stay—selecting arrival transport from 
                Jammu or Udhampur, hand-picking daily expeditions, and tailoring fireside evenings to your exact pace.
              </p>
              <div className="nature-detail design-map">
                <NatureIllustration variant="map" />
              </div>
            </div>
          </div>

          {/* Interactive Intent Tags Selector */}
          <div className="intent-selector-area">
            <span className="intent-instruction">Explore how you might craft your days:</span>
            
            <div className="intent-pills-row" role="tablist" aria-label="Trip style options">
              {TRIP_INTENTS.map((intent) => {
                const isActive = intent.id === activeIntent.id;
                return (
                  <button
                    key={intent.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveIntent(intent)}
                    className={`intent-pill ${isActive ? 'intent-pill-active' : ''}`}
                  >
                    <span className="pill-dot"></span>
                    <span>{intent.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Preview Card */}
            <div className="intent-preview-box">
              <div className="intent-preview-header">
                <span className="preview-style-badge">SAMPLE CURATED CHAPTER</span>
                <h3 className="preview-headline">{activeIntent.headline}</h3>
                <p className="preview-vibe">{activeIntent.vibe}</p>
              </div>

              <div className="preview-highlights-list">
                {activeIntent.highlights.map((item, idx) => (
                  <div key={idx} className="preview-highlight-item">
                    <span className="highlight-check">✓</span>
                    <span className="highlight-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Primary CTA */}
          <div className="design-cta-row">
            <button
              type="button"
              onClick={onOpenPlanner}
              className="btn-pill-primary design-cta-btn"
              id="design-build-experience-btn"
            >
              <span>Build Your Experience</span>
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </button>
            <span className="design-cta-caption">
              Personalised planner launching in Phase 2 · Preview our interactive builder
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
