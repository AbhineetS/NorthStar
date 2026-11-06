import React, { useEffect, useRef } from 'react';
import { mediaRegistry } from '../config/mediaRegistry';

const activities = mediaRegistry.activities;

export default function FindAdventureSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const updateJourneyProgress = () => {
      const bounds = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight - bounds.top) / (bounds.height + window.innerHeight)));
      section.style.setProperty('--journey-progress', progress);
    };

    const items = section.querySelectorAll('.adventure-item');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }

    updateJourneyProgress();
    window.addEventListener('scroll', updateJourneyProgress, { passive: true });
    window.addEventListener('resize', updateJourneyProgress);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.18 });

    items.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateJourneyProgress);
      window.removeEventListener('resize', updateJourneyProgress);
    };
  }, []);

  return (
    <section ref={sectionRef} className="adventure-section" id="adventure" aria-labelledby="adventure-title">
      <div className="adventure-intro">
        <span className="editorial-label">The Northstar way out</span>
        <h2 id="adventure-title">A day shaped by the <em>mountains.</em></h2>
        <p>Follow the day from a mountain trail to open skies, a warming fire, fresh spring water and a meal worth lingering over.</p>
      </div>

      <div className="adventure-journey">
        {activities.map((activity, index) => (
          <article className={`adventure-item ${index % 2 === 0 ? 'adventure-item-right' : 'adventure-item-left'}`} key={activity.number}>
            <span className="adventure-marker" aria-hidden="true" />
            <figure className={`adventure-media adventure-media-${activity.number}`}>
              <img src={activity.image.src} alt={activity.image.alt} loading={activity.number === '05' ? 'eager' : 'lazy'} decoding="async" />
            </figure>
            <div className="adventure-copy">
              <span className="adventure-number">{activity.number}</span>
              <h3>{activity.title}</h3>
              {activity.description && <p className="adventure-description">{activity.description}</p>}
              <ul>
                {activity.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
