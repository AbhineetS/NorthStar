import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mediaRegistry } from '../config/mediaRegistry';

gsap.registerPlugin(ScrollTrigger);

export default function OpeningExperience() {
  const stageRef = useRef(null);
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      stage.dataset.reducedMotion = 'true';
      stage.dataset.complete = 'true';
      return undefined;
    }

    const heroImage = new Image();
    heroImage.decoding = 'async';
    heroImage.src = mediaRegistry.hero.primaryLandscape.src;
    heroImage.decode?.().catch(() => undefined);

    document.body.classList.add('opening-active');
    document.body.style.setProperty('--opening-progress', '0');

    const context = gsap.context(() => {
      const animation = gsap.to(stage, {
        '--opening-progress': 1,
        ease: 'none',
        paused: true,
        onUpdate: () => {
          const progress = animation.progress();
          document.body.style.setProperty('--opening-progress', progress);
          stage.dataset.complete = progress >= 0.995 ? 'true' : 'false';
          document.body.classList.toggle('opening-active', progress < 0.995);
        },
      });

      ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: () => `+=${window.innerHeight}`,
        scrub: true,
        invalidateOnRefresh: true,
        animation,
      });
    }, stage);

    return () => {
      context.revert();
      document.body.classList.remove('opening-active');
      document.body.style.removeProperty('--opening-progress');
    };
  }, []);

  const mountainImage = mediaRegistry.hero.primaryLandscape;

  return (
    <section ref={stageRef} className="opening-experience" aria-label="Northstar mountain introduction">
      <link rel="preload" as="image" href={mountainImage.src} />
      <div className="opening-experience-sticky">
        <img className="opening-landscape" src={mountainImage.src} alt="" aria-hidden="true" />
        <svg className="opening-mask" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          <defs>
            <mask id="opening-word-mask" mask-type="luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">
              <rect width="1000" height="1000" fill="black" />
              <text className="opening-mask-text" x="500" y="500" textAnchor="middle" dominantBaseline="middle" fill="white">northstar</text>
            </mask>
          </defs>
          <image href={mountainImage.src} width="1000" height="1000" preserveAspectRatio="xMidYMid slice" mask="url(#opening-word-mask)" />
        </svg>
      </div>
    </section>
  );
}
