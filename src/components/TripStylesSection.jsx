import React from 'react';
import { mediaRegistry } from '../config/mediaRegistry';

export default function TripStylesSection({ selectedExperiences, onToggleExperience, onPlan }) {
  return (
    <section className="product-section styles-section" id="experiences">
      <div className="container">
        <div className="section-header-row">
          <span className="editorial-label">Make space for what feels good</span>
          <span className="coord-label">{selectedExperiences.length} SELECTED</span>
        </div>
        <div className="styles-intro">
          <h2>Choose your<br /><em>Northstar moments.</em></h2>
          <p>Build a trip around the things you actually want to do. Pick a few experiences now, then fine-tune the people, days, and practical details in your own planner.</p>
        </div>
        <div className="activity-grid">
          {mediaRegistry.experiences.map((experience) => {
            const selected = selectedExperiences.includes(experience.id);
            return (
              <article className="activity-card" key={experience.id}>
                <div className="activity-image"><img src={experience.src} alt={experience.alt} loading="lazy" /></div>
                <div className="activity-copy">
                  <span>{experience.number} · {experience.tags.slice(0, 2).join(' · ')}</span>
                  <h3>{experience.title}</h3>
                  <p>{experience.caption}</p>
                  <button type="button" className={selected ? 'selected' : ''} onClick={() => onToggleExperience(experience.id)}>
                    {selected ? 'Added to my trip ✓' : 'Add to my trip +'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <div className="styles-transition">
          <div><span className="editorial-label">Ready when you are</span><h3>Build your own experience.</h3><p>Start with the number of people and days. We’ll reveal the next step once the basics are in place.</p></div>
          <button type="button" className="btn-pill-primary" onClick={onPlan}>Build Your Own Experience <span aria-hidden="true">↗</span></button>
        </div>
      </div>
    </section>
  );
}
