import React from 'react';
import { mediaRegistry } from '../config/mediaRegistry';

const destinationNotes = [
  ['Destination', 'Kud and Patnitop, Jammu & Kashmir'],
  ['Elevation', 'Kud sits around 1,850m; Patnitop around 2,024m.'],
  ['Ideal duration', 'A suggested 2–4 day escape, shaped around your pace.'],
  ['Best suited for', 'Weekend getaways, couples, families, nature lovers, and groups.'],
];

export default function DestinationSection() {
  const { experiences, property } = mediaRegistry;
  const photos = [
    [experiences[0].src, 'Follow the quieter trails.'],
    [property.surroundings.src, 'Find a viewpoint worth the climb.'],
    [experiences[3].src, 'Make room for an evening outdoors.'],
    [property.terrace.src, 'Slow down as the mountains change colour.'],
  ];

  return (
    <section className="product-section destination-section" id="destination">
      <div className="container">
        <div className="section-header-row">
          <span className="editorial-label">Your first Northstar destination</span>
          <span className="coord-label">KUD · PATNITOP · PIR PANJAL</span>
        </div>
        <div className="destination-intro">
          <h2>Closer to the mountains.<br /><em>Further from the routine.</em></h2>
          <p>Discover the quieter side of the mountains around Kud and Patnitop, where scenic drives, forest walks, open views, and unhurried evenings can shape a different kind of getaway.</p>
        </div>
        <div className="destination-facts">
          {destinationNotes.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
        </div>
        <div className="destination-collage">
          {photos.map(([src, caption], index) => <figure key={src} className={`destination-photo destination-photo-${index + 1}`}><img src={src} alt={caption} loading="lazy" /><figcaption>{caption}</figcaption></figure>)}
        </div>
        <div className="destination-bottom">
          <div>
            <span className="editorial-label">What you can explore</span>
            <h3>A destination with room for different kinds of days.</h3>
          </div>
          <div className="explore-list">
            <span>Nature and forest walks</span><span>Scenic drives and viewpoints</span><span>Sunrise and sunset outings</span><span>Stargazing when conditions permit</span><span>Local food and regional flavours</span><span>Relaxed stays surrounded by nature</span>
          </div>
        </div>
        <div className="before-trip">
          <div><span className="editorial-label">Before you make the trip</span><h3>A few useful things to decide first.</h3></div>
          <p>Consider how you will reach the destination, how many days you have, whether you need local transport, the expected weather, activity availability, and the kind of accommodation that suits your group.</p>
          <small>Activity availability depends on weather, local conditions, and prior arrangement. Northstar does not represent this outline as a confirmed booking.</small>
        </div>
      </div>
    </section>
  );
}
