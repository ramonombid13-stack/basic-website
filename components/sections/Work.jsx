import ScrollReveal from '@/components/ScrollReveal';

const CASE_STUDIES = [
  {
    client: 'NON-LIFE INSURANCE AGENT — ELE INSURANCE (PH)',
    image: '/result-ele-insurance.png',
    before: 'Leads came from everywhere, tracked nowhere. Cold leads piled up.',
    built: 'Full lead pipeline with stage-based automation and instant follow-up.',
    result: 'Zero Lead Loss System',
    resultDetail: 'cold leads — every inquiry followed up in minutes',
  },
  {
    client: 'COMPLETE GHL ECOSYSTEM — TINKERTRIBE (PH)',
    image: '/result-tinkertribe.png',
    before: 'New operation, no CRM, everything manual.',
    built: 'Capture, pipeline, automation, calendar & reporting — the full stack.',
    result: 'Zero → Full',
    resultDetail: 'from manual to fully automated',
  },
  {
    client: 'PATIENT MANAGEMENT SYSTEM — 29:11 DENTAL CLINIC (PH)',
    image: '/result-dental.png',
    before: 'Patient inquiries, appointments, and follow-ups were handled manually.',
    built: 'Automated CRM with booking, reminders, treatment tracking, and recalls.',
    result: 'First Inquiry → Lifelong Care',
    resultDetail: 'one connected patient journey',
  },
];

export default function Work() {
  return (
    <section id="work" className="section-pad">
      <ScrollReveal>
        <p className="eyebrow">SELECTED WORK</p>
        <h2>Systems I&rsquo;ve built.</h2>
      </ScrollReveal>
      <div className="work-grid">
        {CASE_STUDIES.map((cs) => (
          <ScrollReveal key={cs.client} className="work-card">
            <p className="work-client">{cs.client}</p>
            <img src={cs.image} alt={cs.client} className="work-image" />
            <p className="work-meta">
              <span>BEFORE</span> {cs.before}
            </p>
            <p className="work-meta">
              <span>BUILT</span> {cs.built}
            </p>
            <p className="work-result">
              <em>{cs.result}</em> <span>{cs.resultDetail}</span>
            </p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
