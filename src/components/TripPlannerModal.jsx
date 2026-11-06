import React, { useState, useEffect } from 'react';

export default function TripPlannerModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="planner-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="planner-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="planner-modal-close"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="planner-modal-inner">
          <div className="planner-badge-row">
            <span className="label-tag">PHASE 2 ROADMAP</span>
            <span className="coord-label">KUD, PATNITOP (2,024M)</span>
          </div>

          <h2 className="planner-modal-title" id="modal-title">
            Personalised Trip Planner
          </h2>

          <p className="planner-modal-lead">
            We are currently building Phase 2 of Northstar: an interactive, bespoke travel planner 
            where you will be able to customize every aspect of your mountain getaway.
          </p>

          <div className="planner-feature-preview">
            <div className="preview-item">
              <span className="preview-icon">✦</span>
              <div>
                <strong>Tailored Expeditions:</strong> Select from ridge trekking, spring discovery, stargazing, and fireside evenings.
              </div>
            </div>
            <div className="preview-item">
              <span className="preview-icon">✦</span>
              <div>
                <strong>Curated Dining:</strong> Choose traditional Pahadi breakfasts, outdoor barbecues, and evening tea.
              </div>
            </div>
            <div className="preview-item">
              <span className="preview-icon">✦</span>
              <div>
                <strong>Transport & Travel Guidance:</strong> Custom routes and pickup arrangements from Jammu and Udhampur.
              </div>
            </div>
          </div>

          {/* Early Access Notification Form */}
          <div className="planner-notify-box">
            {submitted ? (
              <div className="planner-success-msg">
                <span className="success-icon">✓</span>
                <p>Thank you. We will notify you the moment the Phase 2 planner is live.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="planner-form">
                <label htmlFor="planner-email-input" className="planner-form-label">
                  Be first to build your experience when Phase 2 launches:
                </label>
                <div className="planner-input-group">
                  <input
                    id="planner-email-input"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="planner-input"
                  />
                  <button type="submit" className="btn-pill-primary planner-submit-btn">
                    Notify Me
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="planner-modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn-pill-secondary planner-return-btn"
            >
              ← Return to Sanctuary
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
