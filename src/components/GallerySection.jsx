import React from 'react';
import { mediaRegistry } from '../config/mediaRegistry';

export default function GallerySection() {
  const selectedImages = [0, 4, 8, 13, 16, 20, 23, 24, 30];

  return (
    <section className="explore-section section-shell" id="explore" aria-labelledby="explore-title">
      <div className="section-heading-row explore-heading">
        <div>
          <span className="editorial-label">The landscape around us</span>
          <h2 id="explore-title">Explore the<br /><em>open air.</em></h2>
        </div>
        <p>Long ridgelines, forest paths and small moments worth taking home from the mountains.</p>
      </div>
      <div className="explore-grid">
        {selectedImages.map((imageIndex, index) => {
          const item = mediaRegistry.explore[imageIndex];
          return (
            <figure className={`explore-card explore-card-${index + 1}`} key={item.src}>
              <img src={item.src} alt={item.alt} />
            </figure>
          );
        })}
      </div>
    </section>
  );
}
