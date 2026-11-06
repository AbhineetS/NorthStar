import React from 'react';
import { mediaRegistry } from '../config/mediaRegistry';

export default function ExperiencesSection() {
  const selectedImages = mediaRegistry.stay.slice(0, -1).map((_, index) => index);

  return (
    <section className="stay-section section-shell" id="stay" aria-labelledby="stay-title">
      <div className="section-heading-row stay-heading">
        <div>
          <span className="editorial-label">Come home to Northstar</span>
          <h2 id="stay-title">Your <em>Stay.</em></h2>
        </div>
        <p>Warm rooms, open lawns and the easy feeling of having nowhere else to be.</p>
      </div>
      <div className="stay-grid">
        {selectedImages.map((imageIndex, index) => {
          const item = mediaRegistry.stay[imageIndex];
          return (
            <figure className={`stay-card stay-card-${index + 1}`} key={item.src}>
              <img src={item.src} alt={item.alt} loading="lazy" />
            </figure>
          );
        })}
      </div>
    </section>
  );
}
