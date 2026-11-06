import React from 'react';
import NatureIllustration from './Illustrations';

export default function Introduction() {
  return (
    <section className="section intro-section" id="introduction">
      <div className="container">
        
        <div className="intro-wrap">
          <div className="intro-header-row">
            <span className="editorial-label">The Sanctuary</span>
            <div className="nature-detail intro-mountain">
              <NatureIllustration variant="mountain" />
            </div>
          </div>
          
          <h2 className="intro-title">
            A slower way to arrive in the mountains.
          </h2>

          <div className="intro-text-block">
            <p className="intro-paragraph">
              Northstar is a small mountain sanctuary above the valley in Kud, Patnitop. 
              Framed by old-growth deodars and crisp alpine air, it is a quiet basecamp for open trails, 
              unhurried mornings, and days shaped entirely by your own pace.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
