import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import '../admin.css';

const statusOptions = ['pending', 'contacted', 'confirmed', 'closed'];
const statusLabels = { pending: 'New', contacted: 'Contacted', confirmed: 'Confirmed', closed: 'Closed' };

function formatDate(value) {
  if (!value) return 'Not provided';
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00`));
}

function formatCreatedAt(value) {
  if (!value) return 'Unknown date';
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }).format(new Date(value));
}

function activityNames(activities) {
  if (!Array.isArray(activities) || !activities.length) return 'None selected';
  return activities.map((activity) => activity.title || activity).join(', ');
}

function StatusBadge({ status }) {
  return <span className={`admin-status admin-status-${status}`}>{statusLabels[status] || status}</span>;
}

function SignIn({ onSignedIn, unavailable }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(unavailable ? 'Supabase is not configured in this environment.' : '');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setError('');
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (signInError) setError('The email or password was not accepted.');
    else onSignedIn(data.session);
    setLoading(false);
  };

  return (
    <main className="admin-auth-shell">
      <section className="admin-auth-card" aria-labelledby="admin-sign-in-title">
        <div className="admin-brand-lockup"><strong>NORTHSTAR</strong><span>ADMIN CONSOLE</span></div>
        <span className="admin-eyebrow">Private workspace</span>
        <h1 id="admin-sign-in-title">Welcome back.</h1>
        <p>Sign in to manage mountain getaway enquiries.</p>
        <form className="admin-auth-form" onSubmit={submit}>
          <label>Email<input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button className="admin-primary-button" type="submit" disabled={loading || unavailable}>{loading ? 'Signing in...' : 'Sign in'} <span aria-hidden="true">→</span></button>
        </form>
        <a className="admin-back-link" href="/">← Return to Northstar</a>
      </section>
    </main>
  );
}

function StatCard({ label, value, tone }) {
  return <article className={`admin-stat-card admin-stat-${tone}`}><span>{label}</span><strong>{value}</strong></article>;
}

function DetailField({ label, value }) {
  return <div className="admin-detail-field"><span>{label}</span><strong>{value || 'Not provided'}</strong></div>;
}

function EnquiryDetail({ enquiry, onClose, onUpdate, onDelete, updating }) {
  const [status, setStatus] = useState(enquiry.enquiry_status || 'pending');
  const [notes, setNotes] = useState(enquiry.internal_notes || '');

  useEffect(() => {
    setStatus(enquiry.enquiry_status || 'pending');
    setNotes(enquiry.internal_notes || '');
  }, [enquiry]);

  return <aside className="admin-detail-panel" aria-labelledby="admin-detail-title">
    <div className="admin-detail-head"><div><span className="admin-eyebrow">Enquiry detail</span><h2 id="admin-detail-title">{enquiry.contact_name}</h2></div><button type="button" className="admin-icon-button" onClick={onClose} aria-label="Close enquiry detail">×</button></div>
    <div className="admin-detail-scroll">
      <div className="admin-detail-meta"><StatusBadge status={enquiry.enquiry_status} /><span>Received {formatCreatedAt(enquiry.created_at)}</span></div>
      <div className="admin-detail-actions"><a href={`mailto:${enquiry.contact_email}`} className="admin-secondary-button">Email customer</a>{enquiry.contact_phone && <a href={`tel:${enquiry.contact_phone}`} className="admin-secondary-button">Call customer</a>}</div>
      <section className="admin-detail-section"><h3>Contact</h3><div className="admin-detail-grid"><DetailField label="Name" value={enquiry.contact_name} /><DetailField label="Email" value={enquiry.contact_email} /><DetailField label="Phone" value={enquiry.contact_phone} /></div></section>
      <section className="admin-detail-section"><h3>Stay</h3><div className="admin-detail-grid"><DetailField label="Check-in" value={formatDate(enquiry.check_in)} /><DetailField label="Check-out" value={formatDate(enquiry.check_out)} /><DetailField label="Guests" value={enquiry.guest_count} /><DetailField label="Duration" value={`${enquiry.duration_days} days`} /></div></section>
      <section className="admin-detail-section"><h3>Journey</h3><div className="admin-detail-grid"><DetailField label="Starting from" value={enquiry.origin_location} /><DetailField label="Transport" value={enquiry.transport_method} /></div>{enquiry.selected_travel_option && <pre className="admin-json-block">{JSON.stringify(enquiry.selected_travel_option, null, 2)}</pre>}</section>
      <section className="admin-detail-section"><h3>Experiences</h3><p className="admin-detail-copy">{activityNames(enquiry.selected_activities)}</p></section>
      <section className="admin-detail-section"><h3>Internal notes</h3><textarea className="admin-notes" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Add a note for the NorthStar team..." /></section>
      <section className="admin-detail-section"><h3>Status</h3><select className="admin-select" value={status} onChange={(event) => setStatus(event.target.value)}>{statusOptions.map((option) => <option value={option} key={option}>{statusLabels[option]}</option>)}</select></section>
    </div>
    <div className="admin-detail-footer"><button type="button" className="admin-danger-button" onClick={() => onDelete(enquiry.id)}>Delete</button><button type="button" className="admin-primary-button" disabled={updating} onClick={() => onUpdate(enquiry.id, { enquiry_status: status, internal_notes: notes })}>{updating ? 'Saving...' : 'Save changes'}</button></div>
  </aside>;
}

function Dashboard({ session, onSignOut }) {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  const loadEnquiries = async () => {
    if (!supabase) return;
    const { data, error: queryError } = await supabase.from('experience_enquiries').select('*').order('created_at', { ascending: false });
    if (queryError) setError('Could not load enquiries. Confirm the admin RLS policies are installed.');
    else { setEnquiries(data || []); setError(''); }
    setLoading(false);
  };

  useEffect(() => {
    loadEnquiries();
    if (!supabase) return undefined;
    const channel = supabase.channel('admin-enquiries').on('postgres_changes', { event: '*', schema: 'public', table: 'experience_enquiries' }, loadEnquiries).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return enquiries.filter((enquiry) => {
      const searchable = `${enquiry.contact_name || ''} ${enquiry.contact_email || ''} ${enquiry.contact_phone || ''}`.toLowerCase();
      const matchesSearch = !query || searchable.includes(query);
      const matchesStatus = statusFilter === 'all' || enquiry.enquiry_status === statusFilter;
      const matchesFrom = !fromDate || enquiry.check_in >= fromDate;
      const matchesTo = !toDate || enquiry.check_in <= toDate;
      return matchesSearch && matchesStatus && matchesFrom && matchesTo;
    });
  }, [enquiries, search, statusFilter, fromDate, toDate]);

  const selected = enquiries.find((enquiry) => enquiry.id === selectedId) || null;
  const updateEnquiry = async (id, changes) => {
    if (!supabase) return;
    setUpdating(true);
    const { error: updateError } = await supabase.from('experience_enquiries').update({ ...changes, updated_at: new Date().toISOString() }).eq('id', id);
    if (updateError) setError('Could not save those changes.');
    else await loadEnquiries();
    setUpdating(false);
  };

  const deleteEnquiry = async (id) => {
    if (!supabase || !window.confirm('Delete this enquiry permanently?')) return;
    const { error: deleteError } = await supabase.from('experience_enquiries').delete().eq('id', id);
    if (deleteError) setError('Could not delete the enquiry.');
    else { setSelectedId(null); await loadEnquiries(); }
  };

  const total = enquiries.length;
  const newCount = enquiries.filter((enquiry) => enquiry.enquiry_status === 'pending').length;
  const contacted = enquiries.filter((enquiry) => enquiry.enquiry_status === 'contacted').length;
  const confirmed = enquiries.filter((enquiry) => enquiry.enquiry_status === 'confirmed').length;

  return <main className="admin-app-shell">
    <header className="admin-header"><div className="admin-brand-lockup"><strong>NORTHSTAR</strong><span>ADMIN CONSOLE</span></div><div className="admin-header-actions"><span>{session.user.email}</span><button type="button" className="admin-secondary-button" onClick={onSignOut}>Sign out</button></div></header>
    <div className="admin-content"><div className="admin-page-heading"><div><span className="admin-eyebrow">Concierge workspace</span><h1>Enquiries</h1><p>Keep every mountain getaway moving.</p></div><span className="admin-live-indicator"><i /> Live updates on</span></div>
      <section className="admin-stats-grid" aria-label="Enquiry overview"><StatCard label="Total enquiries" value={total} tone="neutral" /><StatCard label="New enquiries" value={newCount} tone="orange" /><StatCard label="Contacted" value={contacted} tone="blue" /><StatCard label="Confirmed" value={confirmed} tone="green" /></section>
      <section className="admin-table-section"><div className="admin-table-heading"><div><span className="admin-eyebrow">Enquiry management</span><h2>Recent requests</h2></div><span className="admin-table-count">{filtered.length} shown</span></div><div className="admin-filters"><label className="admin-search-field"><span>Search</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name, email or phone" /></label><label><span>Status</span><select className="admin-select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">All statuses</option>{statusOptions.map((option) => <option value={option} key={option}>{statusLabels[option]}</option>)}</select></label><label><span>Check-in from</span><input type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} /></label><label><span>To</span><input type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} /></label></div>{error && <p className="admin-error admin-table-error" role="alert">{error}</p>}{loading ? <div className="admin-empty-state">Loading enquiries...</div> : !filtered.length ? <div className="admin-empty-state">No enquiries match these filters.</div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Customer</th><th>Stay</th><th>Guests</th><th>Experiences</th><th>Transport</th><th>Status</th></tr></thead><tbody>{filtered.map((enquiry) => <tr key={enquiry.id} className={selectedId === enquiry.id ? 'is-selected' : ''} onClick={() => setSelectedId(enquiry.id)}><td><strong>{enquiry.contact_name}</strong><span>{enquiry.contact_email}</span></td><td><strong>{formatDate(enquiry.check_in)}</strong><span>{formatDate(enquiry.check_out)}</span></td><td>{enquiry.guest_count}</td><td className="admin-activities-cell">{activityNames(enquiry.selected_activities)}</td><td>{enquiry.transport_method}</td><td><StatusBadge status={enquiry.enquiry_status} /></td></tr>)}</tbody></table></div>}</section>
    </div>{selected && <EnquiryDetail enquiry={selected} onClose={() => setSelectedId(null)} onUpdate={updateEnquiry} onDelete={deleteEnquiry} updating={updating} />}
  </main>;
}

export default function AdminDashboard() {
  const [session, setSession] = useState(undefined);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    if (!supabase) { setSession(null); return undefined; }
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      const nextSession = data.session;
      setUnauthorized(Boolean(nextSession && nextSession.user.app_metadata?.role !== 'admin'));
      setSession(nextSession);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      const isAdmin = Boolean(nextSession && nextSession.user.app_metadata?.role === 'admin');
      setUnauthorized(Boolean(nextSession && !isAdmin));
      setSession(isAdmin ? nextSession : null);
      if (nextSession && !isAdmin) supabase.auth.signOut();
    });
    return () => { mounted = false; authListener.subscription.unsubscribe(); };
  }, []);

  const signOut = async () => { await supabase?.auth.signOut(); setSession(null); };
  if (session === undefined) return <main className="admin-auth-shell"><div className="admin-loading">Loading secure workspace...</div></main>;
  if (!session || unauthorized) return <SignIn unavailable={!supabase} onSignedIn={(nextSession) => { if (nextSession?.user.app_metadata?.role === 'admin') setSession(nextSession); else setUnauthorized(true); }} />;
  return <Dashboard session={session} onSignOut={signOut} />;
}
