import React from 'react';

export default function NatureIllustration({ variant = 'mountain', className = '' }) {
  const common = {
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  const variants = {
    mountain: (
      <svg viewBox="0 0 240 120" className={className} aria-hidden="true">
        <path d="M10 96L46 58L76 78L102 42L138 76L172 48L218 96H10Z" fill="#EDF2EB" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M48 58L62 44L74 58H48Z" fill="#F7F3EC" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M114 42L129 30L144 42H114Z" fill="#F7F3EC" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M158 52L177 36L194 52H158Z" fill="#F7F3EC" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M32 98L52 73L72 98H32Z" fill="#244B3C" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M88 98L108 69L126 98H88Z" fill="#244B3C" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M144 98L165 72L186 98H144Z" fill="#244B3C" stroke="#1B1B1B" strokeWidth="2" {...common} />
      </svg>
    ),
    maple: (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        <path d="M60 18C68 28 77 34 88 42C80 46 72 54 60 78C48 54 40 46 32 42C43 34 52 28 60 18Z" fill="#D97745" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M60 42V88" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M60 88C49 96 42 101 34 108" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M60 88C71 96 78 101 86 108" stroke="#1B1B1B" strokeWidth="2" {...common} />
      </svg>
    ),
    pine: (
      <svg viewBox="0 0 180 140" className={className} aria-hidden="true">
        <g fill="#244B3C" stroke="#1B1B1B" strokeWidth="2" {...common}>
          <path d="M82 110V72L92 80L82 42L100 70L96 26L114 60L110 14L126 56L124 82L148 56L160 88L132 86L138 110H82Z" />
          <path d="M108 110V92" stroke="#1B1B1B" strokeWidth="2" {...common} />
        </g>
        <g fill="#F5F2EE" stroke="#1B1B1B" strokeWidth="2" {...common}>
          <path d="M36 98L52 72L60 98H36Z" />
          <path d="M126 98L142 70L156 98H126Z" />
        </g>
      </svg>
    ),
    birds: (
      <svg viewBox="0 0 190 60" className={className} aria-hidden="true">
        <g fill="none" stroke="#1B1B1B" strokeWidth="2" {...common}>
          <path d="M18 35C24 31 32 31 38 35" />
          <path d="M38 35C45 31 52 31 58 35" />
          <path d="M92 27C99 23 108 23 114 27" />
          <path d="M114 27C121 23 130 23 136 27" />
          <path d="M150 35C157 31 165 31 171 35" />
          <path d="M171 35C177 31 185 31 190 35" />
        </g>
      </svg>
    ),
    map: (
      <svg viewBox="0 0 180 180" className={className} aria-hidden="true">
        <path d="M42 24H118L146 42V146L118 158L90 146L62 158L34 146V42L42 24Z" fill="#F4F6F1" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M90 32V146" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M34 58H146" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M58 42L72 82L90 88L104 108L120 88L134 66L122 54L110 72L96 90L82 86L72 68L58 42Z" fill="#A8CBD6" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <circle cx="90" cy="88" r="7" fill="#D97745" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M56 116L90 96L126 118" fill="none" stroke="#1B1B1B" strokeWidth="2" {...common} />
      </svg>
    ),
    trail: (
      <svg viewBox="0 0 160 120" className={className} aria-hidden="true">
        <path d="M18 96C38 84 48 60 66 54C85 48 92 74 118 70C133 67 142 59 150 42" fill="none" stroke="#1B1B1B" strokeWidth="3" {...common} />
        <circle cx="20" cy="94" r="8" fill="#D97745" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <circle cx="118" cy="70" r="8" fill="#8FAF83" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M58 54L74 26L82 52" fill="none" stroke="#1B1B1B" strokeWidth="2" {...common} />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 90 90" className={className} aria-hidden="true">
        <path d="M45 8L51 34L77 45L51 56L45 82L39 56L13 45L39 34L45 8Z" fill="#F0D995" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <circle cx="45" cy="45" r="5" fill="#F9F4E7" stroke="#1B1B1B" strokeWidth="2" {...common} />
      </svg>
    ),
    campfire: (
      <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
        <path d="M50 26C42 35 37 42 37 50C37 61 42 66 50 66C58 66 63 61 63 50C63 42 58 35 50 26Z" fill="#D97745" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M50 18V12" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M50 66V82" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M30 58C35 52 38 49 42 44" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M70 58C65 52 62 49 58 44" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M20 82H80" stroke="#1B1B1B" strokeWidth="2" {...common} />
      </svg>
    ),
    cloud: (
      <svg viewBox="0 0 220 80" className={className} aria-hidden="true">
        <path d="M24 52C24 34 36 24 52 24C66 24 77 31 85 41C90 35 98 28 112 28C133 28 147 41 147 56H24Z" fill="#FFFFFF" stroke="#1B1B1B" strokeWidth="2" {...common} />
        <path d="M80 42C90 28 108 24 120 32" fill="none" stroke="#1B1B1B" strokeWidth="2" {...common} />
      </svg>
    ),
  };

  return variants[variant] || variants.mountain;
}
