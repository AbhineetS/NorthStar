import React from 'react';

export default function IdeaSection({ onPlan }) {
  return (
    <section className="product-section idea-section" id="idea">
      <div className="container">
        <div className="section-header-row"><span className="editorial-label">The idea behind Northstar</span><span className="coord-label">DISCOVER · CHOOSE · GO</span></div>
        <div className="idea-layout">
          <h2>A better trip begins<br /><em>before you leave.</em></h2>
          <div>
            <p>Northstar brings the pieces of a mountain escape into one thoughtful place: the destination, the moments worth making time for, and a practical outline shaped around your group.</p>
            <p>It is not a rigid package or a promise of perfect weather. It is a clear starting point for making a trip feel considered, personal, and yours.</p>
            <button type="button" className="btn-pill-primary" onClick={onPlan}>Build Your Own Experience <span aria-hidden="true">↗</span></button>
          </div>
        </div>
      </div>
    </section>
  );
}
