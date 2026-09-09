import ScrollReveal from '@/components/ScrollReveal';

// Placeholder address carried over from the previous site (see spec's
// "Open item"). Replace with a real contact address before this ships.
const CONTACT_EMAIL = 'you@example.com';

export default function Contact() {
  return (
    <section id="contact" className="section-pad">
      <ScrollReveal className="contact-inner">
        <p className="eyebrow">GET IN TOUCH</p>
        <h2>
          Let&rsquo;s build something that
          <br />
          <em>actually runs itself.</em>
        </h2>
        <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-solid">
          Email me
        </a>
      </ScrollReveal>
    </section>
  );
}
