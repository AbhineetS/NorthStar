import React, { useState } from 'react';
import './App.css';
import './gallery-final.css';
import './opening-experience.css';
import Navigation from './components/Navigation';
import DiscoverSection from './components/DiscoverSection';
import GallerySection from './components/GallerySection';
import FindAdventureSection from './components/FindAdventureSection';
import ExperiencesSection from './components/ExperiencesSection';
import ExperienceBuilder from './components/ExperienceBuilder';
import OpeningExperience from './components/OpeningExperience';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [builderOpen, setBuilderOpen] = useState(false);
  if (window.location.pathname === '/admin') return <AdminDashboard />;

  return (
    <div className="northstar-app">
      <OpeningExperience />
      <Navigation onOpenPlanner={() => setBuilderOpen(true)} />
      <main id="main-content">
        <DiscoverSection />
        <GallerySection />
        <FindAdventureSection />
        <ExperiencesSection />
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <span className="brand-name">NORTHSTAR</span>
            <p>A slower way to find the mountains.</p>
          </div>
          <div className="footer-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="mailto:hello@northstar.example">hello@northstar.example</a>
            <span>Patnitop, Jammu & Kashmir</span>
          </div>
        </div>
      </footer>
      <ExperienceBuilder open={builderOpen} onClose={() => setBuilderOpen(false)} />
    </div>
  );
}
