import ScrollReveal from '@/components/ScrollReveal';

export default function About() {
  return (
    <section id="about" className="section-pad">
      <ScrollReveal className="about-grid">
        <img src="/headshot.png" alt="Ramon Ombid" className="about-photo" />
        <div className="about-copy">
          <p className="eyebrow">ABOUT</p>
          <h2>
            A decade inside other people&rsquo;s systems.
            <br />
            <em>Now building his own.</em>
          </h2>
          <p>
            I spent more than a decade in operations across different
            industries learning firsthand how good businesses lose money to
            small, repeatable gaps. The forgotten follow-up. The lead nobody
            logged. The no-show nobody chased.
          </p>
          <p>
            So I don&rsquo;t think like a &ldquo;tech guy.&rdquo; I think
            like an operator who happens to build in GoHighLevel. I care less
            about features and more about whether the system matches how the
            day actually runs.
          </p>
          <div className="about-stats">
            <div className="stat">
              <p className="stat-num">10+ years</p>
              <p className="stat-label">IN OPERATIONS &amp; SYSTEMS</p>
            </div>
            <div className="stat">
              <p className="stat-num">GHL Certified</p>
              <p className="stat-label">SPECIALIST</p>
            </div>
            <div className="stat">
              <p className="stat-num">5+ industries</p>
              <p className="stat-label">WORKED ACROSS</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
