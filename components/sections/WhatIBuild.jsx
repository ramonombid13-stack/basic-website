import ScrollReveal from '@/components/ScrollReveal';

const CAPABILITIES = [
  {
    label: 'LEAD CAPTURE',
    title: 'Systems that never lose a lead',
    body: 'Every call, form, and DM lands in one place and gets an instant first response, even when nobody is watching.',
  },
  {
    label: 'AUTOMATION',
    title: 'Follow-up that runs itself',
    body: 'New leads get nurtured automatically until they book or buy, in messages that sound like a person, not a robot.',
  },
  {
    label: 'BOOKING',
    title: 'Calendars that fill themselves',
    body: 'Prospects book in, get reminders, and show up — the system confirms and recovers no-shows on its own.',
  },
  {
    label: 'REACTIVATION',
    title: 'Old databases, woken back up',
    body: 'Past leads who went quiet become booked appointments again, often within the first week of a campaign.',
  },
];

export default function WhatIBuild() {
  return (
    <section id="what-i-build" className="section-pad">
      <ScrollReveal>
        <p className="eyebrow">WHAT I BUILD</p>
        <h2>Systems, not just software.</h2>
      </ScrollReveal>
      <div className="capability-grid">
        {CAPABILITIES.map((c) => (
          <ScrollReveal key={c.label} className="capability-card">
            <p className="capability-label">{c.label}</p>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
