import React, { useEffect, useMemo, useState } from 'react';
import { mediaRegistry } from '../config/mediaRegistry';
import { supabase } from '../lib/supabase';

const today = new Date();
const todayISO = today.toISOString().slice(0, 10);
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const travelModes = [
  { id: 'air', label: 'Air', detail: 'Jammu Airport', doodle: 'plane' },
  { id: 'train', label: 'Train', detail: 'Jammu Tawi', doodle: 'train' },
  { id: 'car', label: 'Personal car', detail: 'A scenic road', doodle: 'car' },
  { id: 'bus', label: 'Bus', detail: 'Travel overland', doodle: 'bus' },
];
const activityDoodles = { '01': 'mountain', '02': 'stars', '03': 'fire', '04': 'spring', '05': 'food' };

function addDays(dateString, days) {
  if (!dateString) return '';
  const date = new Date(`${dateString}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function readableDate(dateString) {
  return dateString
    ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${dateString}T12:00:00`))
    : 'Choose a date';
}

function dateToISO(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function Doodle({ type }) {
  const drawings = {
    people: <><circle cx="28" cy="29" r="8" /><circle cx="52" cy="25" r="8" /><path d="M14 58c2-12 26-12 28 0M38 58c2-15 28-15 30 0" /></>,
    calendar: <><rect x="18" y="18" width="44" height="40" rx="6" /><path d="M18 30h44M29 13v10M51 13v10M28 40h4M40 40h4M52 40h4M28 49h4M40 49h4" /></>,
    plane: <path d="M12 43l25-5-8-22 5-2 15 20 14-3c7-1 9 5 2 7l-16 5-5 18-5 1 1-18-25 5z" />,
    train: <><rect x="19" y="17" width="42" height="35" rx="7" /><path d="M27 27h10M43 27h10M25 52l-7 8M55 52l7 8M27 43h26" /></>,
    car: <><path d="M16 46l5-16h30l9 16v9H16z" /><path d="M23 30l5-10h17l6 10M24 46h8M48 46h8" /><circle cx="27" cy="55" r="4" /><circle cx="51" cy="55" r="4" /></>,
    bus: <><rect x="18" y="15" width="44" height="42" rx="7" /><path d="M25 25h30v13H25zM25 46h7M48 46h7" /><circle cx="28" cy="58" r="4" /><circle cx="52" cy="58" r="4" /></>,
    mountain: <path d="M10 60l21-34 12 18 7-10 20 26H10zM25 36l6-10 6 10" />,
    stars: <><path d="M40 12v12M34 18h12M18 45c10-20 34-20 44 0" /><path d="M22 28l2 4 4 2-4 2-2 4-2-4-4-2 4-2zM57 25l2 3 3 1-3 2-2 3-1-3-3-2 3-1z" /></>,
    fire: <><path d="M40 64c-14 0-22-9-18-21 2-7 8-10 9-19 8 6 10 12 8 17 7-4 9-11 7-17 11 8 16 19 11 29-3 7-9 11-17 11z" /><path d="M39 55c-6-4-3-10 1-14 5 5 7 9 2 14" /></>,
    spring: <><path d="M12 48c10-8 18 8 28 0s18 8 28 0M12 57c10-8 18 8 28 0s18 8 28 0" /><path d="M40 12v28M32 20l8-8 8 8" /></>,
    food: <><path d="M16 45h48M22 45c0-16 36-16 36 0M28 52c3 7 21 7 24 0M22 23c7-8 17-8 24 0" /><path d="M31 13v10M49 13v10" /></>,
  };
  return <svg className={`planner-doodle planner-doodle-${type}`} viewBox="0 0 80 80" aria-hidden="true">{drawings[type]}</svg>;
}

function Calendar({ value, month, duration, onChange, onMonthChange }) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const checkout = addDays(value, duration);
  const cells = Array.from({ length: Math.ceil((firstDay + daysInMonth) / 7) * 7 }, (_, index) => {
    const day = index - firstDay + 1;
    return day > 0 && day <= daysInMonth ? new Date(year, monthIndex, day) : null;
  });

  return (
    <div className="planner-calendar">
      <div className="planner-calendar-head"><strong>{months[monthIndex]} {year}</strong><div><button type="button" onClick={() => onMonthChange(new Date(year, monthIndex - 1, 1))} aria-label="Previous month">‹</button><button type="button" onClick={() => onMonthChange(new Date(year, monthIndex + 1, 1))} aria-label="Next month">›</button></div></div>
      <div className="planner-weekdays">{weekdays.map((day) => <span key={day}>{day}</span>)}</div>
      <div className="planner-days">{cells.map((date, index) => {
        if (!date) return <span className="planner-day planner-day-empty" key={`empty-${index}`} />;
        const iso = dateToISO(date);
        return <button type="button" className={`planner-day ${iso === value ? 'is-selected' : ''} ${iso === checkout ? 'is-checkout' : ''}`} disabled={iso < todayISO} onClick={() => onChange(iso)} key={iso}>{date.getDate()}</button>;
      })}</div>
      <small>{value ? `Check-out: ${readableDate(checkout)}` : 'Past dates are unavailable.'}</small>
    </div>
  );
}

function Progress({ step }) {
  return <div className="planner-progress">{['Stay', 'Experiences', 'Journey', 'Options', 'Review'].map((label, index) => <span className={index + 1 <= step ? 'is-active' : ''} key={label}><b>0{index + 1}</b>{label}</span>)}</div>;
}

export default function ExperienceBuilder({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [guests, setGuests] = useState(2);
  const [duration, setDuration] = useState(3);
  const [checkIn, setCheckIn] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [origin, setOrigin] = useState('');
  const [travelMode, setTravelMode] = useState('');
  const [selectedTravelOption, setSelectedTravelOption] = useState(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const activities = mediaRegistry.activities;
  const checkout = addDays(checkIn, duration);
  const selectedItems = useMemo(() => activities.filter((item) => selectedActivities.includes(item.number)), [activities, selectedActivities]);
  const selectedTravel = travelModes.find((item) => item.id === travelMode);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKeyDown); };
  }, [open, onClose]);

  if (!open) return null;

  const closePlanner = () => { setStep(0); setSubmitted(false); setSubmitting(false); setReferenceId(''); setSubmitError(''); setSelectedTravelOption(null); setContactName(''); setContactEmail(''); setContactPhone(''); onClose(); };
  const toggleActivity = (number) => setSelectedActivities((current) => current.includes(number) ? current.filter((item) => item !== number) : [...current, number]);
  const submitEnquiry = async () => {
    if (!guests || !duration || !checkIn || !checkout || !selectedItems.length || !origin.trim() || !travelMode) { setSubmitError('Complete your stay, experiences and journey before sending your enquiry.'); return; }
    if (!contactName.trim() || !contactEmail.trim()) { setSubmitError('Add your name and email so our team can contact you.'); return; }
    if (!supabase) { setSubmitError('Enquiries are not connected yet. Check the Supabase environment settings.'); return; }
    if (submitting) return;
    setSubmitting(true);
    setSubmitError('');
    const enquiryId = crypto.randomUUID();
    const payload = { id: enquiryId, guest_count: guests, duration_days: duration, check_in: checkIn, check_out: checkout, selected_activities: selectedItems.map((item) => ({ number: item.number, title: item.title })), origin_location: origin.trim(), transport_method: travelMode, selected_travel_option: selectedTravelOption, contact_name: contactName.trim(), contact_email: contactEmail.trim(), contact_phone: contactPhone.trim() || null };
    try {
      const { error } = await supabase.from('experience_enquiries').insert(payload);
      if (error) throw error;
      setReferenceId(enquiryId);
      setSubmitted(true);
    } catch { setSubmitError('We could not send your enquiry right now. Please try again.'); } finally { setSubmitting(false); }
  };

  const header = (eyebrow, title, copy) => <div className="planner-step-heading"><span className="planner-eyebrow">{eyebrow}</span><h2>{title}</h2><p>{copy}</p></div>;
  const actions = (back, next, disabled = false) => <div className="planner-actions"><button type="button" className="planner-text-button" onClick={back}>Back</button><button type="button" className="planner-primary" disabled={disabled} onClick={next}>{next.name || 'Continue'} <span aria-hidden="true">→</span></button></div>;

  const renderWelcome = () => <div className="planner-welcome"><div><span className="planner-eyebrow">Your Northstar</span><h2>Make your own <em>adventure.</em></h2><p>Create a getaway that moves at your pace. Choose your dates, discover experiences and plan your journey to the mountains.</p><button type="button" className="planner-primary planner-primary-large" onClick={() => setStep(1)}>Start Planning <span>→</span></button></div><div className="planner-welcome-art"><Doodle type="calendar" /><span>Patnitop<br />33.0850° N · 75.2825° E</span></div></div>;

  const renderStay = () => <div className="planner-step-content">{header('Step 01 · Plan your stay', <>Let&apos;s plan your <em>getaway.</em></>, 'First, tell us a little about your trip.')}<div className="planner-stay-grid"><div className="planner-choice-panel"><Doodle type="people" /><span className="planner-panel-label">Number of guests</span><h3>Who is coming?</h3><div className="planner-number-grid">{[1, 2, 3, 4, 5, 6].map((number) => <button type="button" className={guests === number ? 'is-selected' : ''} onClick={() => setGuests(number)} key={number}>{number}</button>)}</div><small>Up to 6 guests at the property</small></div><div className="planner-choice-panel"><Doodle type="calendar" /><span className="planner-panel-label">Duration of stay</span><h3>How long?</h3><div className="planner-number-grid planner-duration-grid">{[1, 2, 3, 4, 5, 6].map((number) => <button type="button" className={duration === number ? 'is-selected' : ''} onClick={() => setDuration(number)} key={number}>{number === 6 ? '6+' : number}<small>{number === 1 ? 'day' : 'days'}</small></button>)}</div></div><div className="planner-date-panel"><span className="planner-panel-label">Travel dates</span><h3>{checkIn ? `${readableDate(checkIn)} to ${readableDate(checkout)}` : 'When will you arrive?'}</h3><button type="button" className="planner-date-trigger" onClick={() => setCalendarOpen((value) => !value)}>{checkIn ? readableDate(checkIn) : 'Select check-in'} <b>→</b></button>{calendarOpen && <Calendar value={checkIn} month={calendarMonth} duration={duration} onMonthChange={setCalendarMonth} onChange={(date) => { setCheckIn(date); setCalendarOpen(false); }} />}</div></div>{actions(() => setStep(0), () => setStep(2), !(guests && duration && checkIn))}</div>;

  const renderExperiences = () => <div className="planner-step-content">{header('Step 02 · Choose your experiences', <>Choose your <em>moments.</em></>, 'Select what belongs in your stay.')}<div className="planner-activity-grid">{activities.map((activity) => { const selected = selectedActivities.includes(activity.number); return <button type="button" className={`planner-activity-card planner-activity-${activityDoodles[activity.number]} ${selected ? 'is-selected' : ''}`} onClick={() => toggleActivity(activity.number)} key={activity.number}><div className="planner-activity-image"><Doodle type={activityDoodles[activity.number]} /><span>{activity.number}</span><b>{selected ? '✓' : '+'}</b></div><div className="planner-activity-copy"><h3>{activity.title === 'Taste the Mountains' ? 'Local Food' : activity.title}</h3></div></button>; })}</div><div className="planner-actions"><button type="button" className="planner-text-button" onClick={() => setStep(1)}>Back</button><div className="planner-action-group"><span className="planner-counter">{selectedActivities.length} experience{selectedActivities.length === 1 ? '' : 's'} selected</span><button type="button" className="planner-primary" disabled={!selectedActivities.length} onClick={() => setStep(3)}>Continue <span>→</span></button></div></div></div>;

  const renderJourney = () => <div className="planner-step-content">{header('Step 03 · Plan your journey', <>How will you <em>get here?</em></>, "Tell us where you're travelling from and we'll help you find the best way to reach Patnitop.")}<label className="planner-origin-field"><span>Starting from</span><input value={origin} onChange={(event) => setOrigin(event.target.value)} placeholder="City, airport or railway station" /></label><div className="planner-travel-grid">{travelModes.map((mode) => <button type="button" className={`planner-travel-card ${travelMode === mode.id ? 'is-selected' : ''}`} onClick={() => setTravelMode(mode.id)} key={mode.id}><Doodle type={mode.doodle} /><span>{mode.label}</span><small>{mode.detail}</small>{travelMode === mode.id && <b>✓</b>}</button>)}</div>{actions(() => setStep(2), () => setStep(4), !(origin.trim() && travelMode))}</div>;

  const renderOptions = () => { const destination = travelMode === 'air' ? 'Jammu Airport' : travelMode === 'train' ? 'Jammu Tawi Railway Station' : 'Patnitop'; const isCar = travelMode === 'car'; return <div className="planner-step-content">{header('Step 04 · Travel options', <>Your route to <em>Patnitop.</em></>, isCar ? 'A route estimate is ready for your enquiry.' : 'Live schedules appear here when a provider connection is configured.')}<div className="planner-route-summary"><span>{origin}</span><b>→</b><span>{destination}</span></div>{isCar ? <button type="button" className={`planner-result-card planner-result-selectable ${selectedTravelOption ? 'is-selected' : ''}`} onClick={() => setSelectedTravelOption(selectedTravelOption ? null : { type: 'estimate', label: 'Personal car route estimate' })}><Doodle type={selectedTravel.doodle} /><div><span className="planner-panel-label">Estimated, not live</span><h3>Drive to Patnitop</h3><p>Distance and duration will be confirmed from your starting point by our team.</p></div><b className="planner-result-check">{selectedTravelOption ? '✓' : '+'}</b></button> : <div className="planner-empty-results"><Doodle type={selectedTravel.doodle} /><div><span className="planner-panel-label">No live {selectedTravel.label.toLowerCase()} data</span><h3>Provider connection required</h3><p>Northstar will show verified {selectedTravel.label.toLowerCase()} options here once an authorised travel API is connected. No schedules or prices are being estimated.</p></div></div>}{actions(() => setStep(3), () => setStep(5))}</div>; };

  const renderReview = () => <div className="planner-step-content">{header('Step 05 · Review', <>Your mountain <em>getaway.</em></>, 'Check the essentials, then send your enquiry.')}<div className="planner-review-grid"><div><span className="planner-panel-label">Your stay</span><button type="button" className="planner-review-row" onClick={() => setStep(1)}><b>{guests} guests · {duration === 6 ? '6+ days' : `${duration} days`}</b><span>{readableDate(checkIn)} - {readableDate(checkout)} <i>Edit</i></span></button></div><div><span className="planner-panel-label">Your experiences</span><button type="button" className="planner-review-row" onClick={() => setStep(2)}><b>{selectedItems.map((item) => item.title === 'Taste the Mountains' ? 'Local Food' : item.title).join(', ')}</b><span>{selectedItems.length} selected <i>Edit</i></span></button></div><div><span className="planner-panel-label">Your journey</span><button type="button" className="planner-review-row" onClick={() => setStep(3)}><b>{origin}</b><span>{selectedTravel.label} · {selectedTravel.detail} <i>Edit</i></span></button></div><div><span className="planner-panel-label">Travel options</span><button type="button" className="planner-review-row" onClick={() => setStep(4)}><b>{selectedTravelOption?.label || (travelMode === 'car' ? 'Route estimate pending' : 'No option selected')}</b><span><i>Edit</i></span></button></div></div><div className="planner-contact-fields"><span className="planner-panel-label">Your contact</span><div className="planner-contact-grid"><label>Name<input value={contactName} onChange={(event) => setContactName(event.target.value)} placeholder="Your name" /></label><label>Email<input type="email" value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} placeholder="you@example.com" /></label><label>Phone <small>optional</small><input type="tel" value={contactPhone} onChange={(event) => setContactPhone(event.target.value)} placeholder="Phone number" /></label></div></div><div className="planner-submit-row"><div><span className="planner-panel-label">Enquiry, not booking</span><p>Our team will review your preferences and contact you.</p></div><button type="button" className="planner-primary planner-primary-large" disabled={submitting} onClick={submitEnquiry}>{submitting ? 'Sending...' : 'Submit My Experience'} <span>→</span></button></div>{submitError && <p className="planner-error" role="alert">{submitError}</p>}<div className="planner-actions"><button type="button" className="planner-text-button" onClick={() => setStep(4)}>Back</button></div></div>;

  const content = submitted ? <div className="planner-confirmation"><span className="planner-confirmation-mark">✓</span><span className="planner-eyebrow">Enquiry received</span><h2>Your mountain <em>getaway starts here.</em></h2><p>Your enquiry has been received. Our team will get in touch with you shortly.</p><small>Reference: {referenceId}</small><button type="button" className="planner-primary" onClick={closePlanner}>Return to Northstar</button></div> : step === 0 ? renderWelcome() : step === 1 ? renderStay() : step === 2 ? renderExperiences() : step === 3 ? renderJourney() : step === 4 ? renderOptions() : renderReview();
  return <div className="planner-backdrop"><section className="planner-modal" role="dialog" aria-modal="true" aria-labelledby="planner-title"><header className="planner-topbar"><button type="button" className="planner-wordmark" onClick={() => setStep(0)}>NORTHSTAR <small>YOUR MOUNTAIN ESCAPE</small></button><div>{step > 0 && !submitted && <Progress step={step} />}<button type="button" className="planner-close" onClick={closePlanner} aria-label="Close planner">×</button></div></header><main className="planner-main" id="planner-title">{content}</main></section></div>;
}
