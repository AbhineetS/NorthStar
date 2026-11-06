import React from 'react';
import { mediaRegistry } from '../config/mediaRegistry';
import NatureIllustration from './Illustrations';

function CollageCard({ experience, clone = false }) {
  return (
    <figure className={`collage-card collage-card-${experience.id}`}>
      <img
        src={experience.src}
        alt={clone ? '' : experience.alt}
        aria-hidden={clone}
        loading={clone ? 'lazy' : 'eager'}
        decoding="async"
      />
      <figcaption>
        <span>{experience.number}</span>
        <strong>{experience.title}</strong>
      </figcaption>
    </figure>
  );
}

function CollageTrack({ experiences, reverse = false }) {
  const renderSet = (clone) => (
    <div className="collage-set" aria-hidden={clone}>
      {experiences.map((experience) => (
        <CollageCard key={`${experience.id}-${clone ? 'clone' : 'original'}`} experience={experience} clone={clone} />
      ))}
    </div>
  );

  return (
    <div className={`collage-track${reverse ? ' collage-track-reverse' : ''}`}>
      {renderSet(false)}
      {renderSet(true)}
    </div>
  );
}

export default function ExperienceGallery() {
  const { experiences } = mediaRegistry;

  return (
    <section className="experiences-section experiences-landing" id="experiences">
      <div className="experiences-landing-intro">
        <div>
          <span className="editorial-label">Northstar · Kud, Patnitop</span>
          <h1 className="landing-title">Make room<br />for the quiet.</h1>
          <p className="landing-subtitle">
            A slower way to arrive in the mountains.
          </p>
        </div>
        <span className="coord-label">A slower way to arrive</span>
      </div>

      <div className="landing-mountain-doodle" aria-hidden="true">
        <NatureIllustration variant="mountain" />
      </div>
      <div className="exp-collage" aria-label="A moving collage of Northstar experiences">
        <CollageTrack experiences={experiences.slice(0, 3)} />
        <CollageTrack experiences={experiences.slice(3, 6)} reverse />
      </div>
    </section>
  );
}
