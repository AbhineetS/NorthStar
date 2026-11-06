import React, { useMemo, useState } from 'react';
import { mediaRegistry } from '../config/mediaRegistry';

const styleOptions = ['Adventure', 'Relaxation', 'Nature', 'Food', 'Stargazing', 'Group activities'];
const transportOptions = [['car', 'Personal vehicle', 'Flexible travel in your own car.'], ['bus', 'Bus', 'Schedules and local connections need checking.'], ['train', 'Train', 'Additional local transport may be needed.']];
const experienceById = Object.fromEntries(mediaRegistry.experiences.map((item) => [item.id, item]));

function makeDays(days, selected, transport) {
  const activities = selected.map((id) => experienceById[id]).filter(Boolean);
  return Array.from({ length: days }, (_, index) => {
    if (index === 0) return { label: 'Arrive & settle in', text: `Arrive in Kud and settle into your base${transport === 'car' ? ' by personal vehicle' : ''}. Keep the first evening unhurried.` };
    if (index === days - 1) return { label: 'A slower morning', text: 'Take breakfast, make a final walk or viewpoint visit, and leave space for departure.' };
    const item = activities[(index - 1) % Math.max(activities.length, 1)];
    return { label: item?.title || 'Explore the mountains', text: item ? `Make time for ${item.title.toLowerCase()}, with room to adjust for weather and local conditions.` : 'Choose a nature walk, scenic outing, or quiet afternoon at your own pace.' };
  });
}

export default function BuildEscapeSection({ selectedExperiences, onToggleExperience }) {
  const [step, setStep] = useState(1);
  const [from, setFrom] = useState('');
  const [days, setDays] = useState(3);
  const [travellers, setTravellers] = useState(2);
  const [budget, setBudget] = useState('₹15,000–₹30,000');
  const [date, setDate] = useState('');
  const [styles, setStyles] = useState([]);
  const [transport, setTransport] = useState('car');
  const [generated, setGenerated] = useState(false);

  const itinerary = useMemo(() => makeDays(days, selectedExperiences, transport), [days, selectedExperiences, transport]);
  const toggle = (value) => setStyles((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  const createItinerary = (event) => { event.preventDefault(); setGenerated(true); setStep(4); };

  return (
    <section className="product-section plan-section" id="plan">
      <div className="container">
        <div className="section-header-row"><span className="editorial-label">Your trip starts here</span><span className="coord-label">KUD & PATNITOP · PLANNER</span></div>
        <div className="plan-intro"><h2>Your escape.<br /><em>Your way.</em></h2><p>Start with the essentials. Once we know who is coming and how long you have, the experiences will open up.</p></div>
        <form className="planner-shell" onSubmit={createItinerary}>
          <div className={`planner-step ${step >= 1 ? 'is-active' : ''}`}><span>01</span><div><h3>First, the basics</h3><p className="planner-note">How many people are coming, and how many days do you have?</p><div className="planner-fields planner-basics"><label>Travellers<div className="stepper"><button type="button" onClick={() => setTravellers(Math.max(1, travellers - 1))}>−</button><strong>{travellers}</strong><button type="button" onClick={() => setTravellers(Math.min(15, travellers + 1))}>+</button></div></label><label>Days<div className="stepper"><button type="button" onClick={() => setDays(Math.max(2, days - 1))}>−</button><strong>{days}</strong><button type="button" onClick={() => setDays(Math.min(10, days + 1))}>+</button></div></label></div><button type="button" className="btn-pill-primary planner-next" onClick={() => setStep(2)}>Choose activities <span aria-hidden="true">↗</span></button></div></div>
          {step >= 2 && <div className="planner-step is-active"><span>02</span><div><h3>Choose your experiences</h3><p className="planner-note">Pick anything that feels like your trip. Availability depends on weather, local conditions, and prior arrangement.</p><div className="planner-activity-grid">{mediaRegistry.experiences.map((item) => <button type="button" className={selectedExperiences.includes(item.id) ? 'planner-activity selected' : 'planner-activity'} key={item.id} onClick={() => onToggleExperience(item.id)}><img src={item.src} alt="" /><span>{selectedExperiences.includes(item.id) ? '✓ ' : '+ '}{item.title}</span></button>)}</div><button type="button" className="btn-pill-primary planner-next" onClick={() => setStep(3)}>Add trip details <span aria-hidden="true">↗</span></button></div></div>}
          {step >= 3 && <div className="planner-step is-active"><span>03</span><div><h3>Make it practical</h3><div className="planner-fields"><label>Travelling from<input value={from} onChange={(event) => setFrom(event.target.value)} placeholder="e.g. Jammu, Delhi" /></label><label>When are you travelling?<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label><label>Approx. budget<select value={budget} onChange={(event) => setBudget(event.target.value)}><option>₹10,000–₹15,000</option><option>₹15,000–₹30,000</option><option>₹30,000–₹60,000</option><option>I’m still deciding</option></select></label></div><div className="option-grid">{styleOptions.map((item) => <button type="button" className={styles.includes(item) ? 'option selected' : 'option'} key={item} onClick={() => toggle(item)}>{item} {styles.includes(item) ? '✓' : '+'}</button>)}</div><div className="transport-grid">{transportOptions.map(([id, title, description]) => <button type="button" className={transport === id ? 'transport-option selected' : 'transport-option'} key={id} onClick={() => setTransport(id)}><strong>{title}</strong><span>{description}</span></button>)}</div><div className="planner-submit"><p>Your outline is a planning aid, not a confirmed reservation or guaranteed schedule.</p><button className="btn-pill-primary" type="submit">Create My Itinerary ↗</button></div></div></div>}
        </form>
        {generated && <div className="itinerary-result"><div className="result-heading"><div><span className="editorial-label">Your working itinerary</span><h3>{days} days in Kud & Patnitop</h3><p>{travellers} traveller{travellers === 1 ? '' : 's'} · {from || 'Departure location to be confirmed'} · {budget}</p></div><button type="button" className="btn-pill-ghost" onClick={() => { setGenerated(false); setStep(1); }}>Edit trip</button></div><div className="day-list">{itinerary.map((day, index) => <div className="day-item" key={`${day.label}-${index}`}><span>DAY {String(index + 1).padStart(2, '0')}</span><div><h4>{day.label}</h4><p>{day.text}</p></div></div>)}</div><div className="result-footer"><p><strong>Transport:</strong> {transportOptions.find(([id]) => id === transport)?.[1]}. Check current schedules and local connections before travelling.</p><button type="button" className="btn-pill-primary" onClick={() => window.print()}>Print itinerary</button></div></div>}
      </div>
    </section>
  );
}
