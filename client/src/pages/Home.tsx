import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Compass,
  Facebook,
  GraduationCap,
  Instagram,
  Linkedin,
  Menu,
  Play,
  Quote,
  Sparkles,
  Target,
  Users,
  X,
  Youtube,
} from "lucide-react";
import { FormEvent, useState } from "react";

const navItems = [
  { label: "Why ZanHR", href: "#why" },
  { label: "Learn", href: "#learn" },
  { label: "For careers", href: "#careers" },
  { label: "For organizations", href: "#organizations" },
];

const audiences = [
  { title: "Students", copy: "Turn classroom theory into practical workplace confidence.", icon: GraduationCap },
  { title: "Job seekers", copy: "Build a clearer CV, stronger interviews, and a more intentional career plan.", icon: Target },
  { title: "People at work", copy: "Understand your rights, relationships, and responsibilities at work.", icon: Users },
  { title: "Organizations", copy: "Create healthier, more consistent people systems that help teams grow.", icon: BriefcaseBusiness },
];

const learningTracks = [
  { number: "01", title: "HRM foundations", copy: "The essentials of people management, explained without the jargon." },
  { number: "02", title: "Hiring & recruitment", copy: "Practical guidance for finding, selecting, and welcoming the right people." },
  { number: "03", title: "Workplace rights", copy: "Make employment rights, labour relations, and HR laws easier to understand." },
  { number: "04", title: "Better workplaces", copy: "Small shifts in behavior, policies, and systems that make work better." },
];

const values = [
  ["Integrity", "Honest, evidence-based information."],
  ["Learning", "Always improving the way we understand work."],
  ["Practicality", "Advice people can use on Monday morning."],
  ["Accessibility", "Simple language for real people."],
  ["Innovation", "Technology and AI in service of better work."],
  ["Professionalism", "High standards with a human approach."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#fbfaf6] text-[#183a33]">
      <header className="site-header">
        <div className="container flex items-center justify-between py-5">
          <a href="#top" className="brand-lockup" aria-label="ZanHR Lab home" onClick={closeMenu}>
            <span className="brand-mark">Z</span>
            <span>
              <span className="brand-name">ZanHR</span>
              <span className="brand-suffix">LAB</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="header-cta hidden lg:inline-flex">
            Start exploring <ArrowUpRight size={16} />
          </a>

          <button
            type="button"
            className="menu-toggle lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu lg:hidden">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="mobile-nav-link" onClick={closeMenu}>
                {item.label}
              </a>
            ))}
            <a href="#contact" className="header-cta mt-2 inline-flex" onClick={closeMenu}>
              Start exploring <ArrowUpRight size={16} />
            </a>
          </div>
        )}
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> Human resources, made human</div>
              <h1>Better work starts with <em>understanding.</em></h1>
              <p className="hero-lede">
                ZanHR Lab makes Human Resource Management practical, accessible, and useful — for every person and organization building a better future of work in Africa.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#learn">Explore the learning hub <ArrowRight size={17} /></a>
                <a className="button button-quiet" href="#why"><span className="play-icon"><Play size={13} fill="currentColor" /></span> Why ZanHR Lab?</a>
              </div>
              <div className="hero-proof">
                <div className="avatar-stack" aria-hidden="true"><span>J</span><span>A</span><span>M</span><span>+</span></div>
                <p><strong>Built for curious people</strong><br /><span>Students, teams, and the people who lead them.</span></p>
              </div>
            </div>
            <div className="hero-visual" aria-label="Illustration representing connected people and ideas">
              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />
              <div className="hero-note note-top"><Sparkles size={15} /> Learn. Apply. Grow.</div>
              <div className="hero-note note-bottom"><span className="note-line" /> The human side of work</div>
              <div className="hero-card hero-card-main">
                <div className="card-kicker">THE PEOPLE PRACTICE</div>
                <div className="card-heading">Make work<br /><span>work better.</span></div>
                <div className="card-graph"><span className="graph-bar bar-one" /><span className="graph-bar bar-two" /><span className="graph-bar bar-three" /><span className="graph-bar bar-four" /><span className="graph-line" /></div>
                <div className="card-footer"><span>Knowledge</span><strong>→</strong><span>Impact</span></div>
              </div>
              <div className="hero-card hero-card-mini"><BookOpen size={19} /><span><strong>Practical resources</strong><small>For real working lives</small></span></div>
              <span className="visual-spark spark-a">✦</span><span className="visual-spark spark-b">✳</span>
            </div>
          </div>
          <div className="hero-scribble" aria-hidden="true">/ / /</div>
        </section>

        <section className="trust-strip">
          <div className="container trust-inner">
            <span className="trust-label">For every chapter of work</span>
            <div className="trust-audiences"><span>Students</span><i>·</i><span>Job seekers</span><i>·</i><span>Employees</span><i>·</i><span>Managers</span><i>·</i><span>Founders</span><i>·</i><span>Organizations</span></div>
          </div>
        </section>

        <section id="why" className="section section-intro">
          <div className="container intro-grid">
            <div>
              <div className="eyebrow">A clearer way forward</div>
              <h2>HR knowledge should not feel like a <span>closed door.</span></h2>
            </div>
            <div className="intro-copy">
              <p>Work touches every part of our lives, yet the systems around it can feel confusing, intimidating, or out of reach. ZanHR Lab exists to make the people side of work easier to understand and easier to improve.</p>
              <a className="text-link" href="#learn">See what we’re learning together <ArrowRight size={16} /></a>
            </div>
          </div>
          <div className="container audience-grid">
            {audiences.map(({ title, copy, icon: Icon }, index) => (
              <article className={`audience-card audience-${index + 1}`} key={title}>
                <div className="audience-icon"><Icon size={21} strokeWidth={1.7} /></div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <a href={index === 3 ? "#organizations" : "#careers"} aria-label={`Explore resources for ${title}`}><ArrowUpRight size={17} /></a>
              </article>
            ))}
          </div>
        </section>

        <section id="learn" className="section learning-section">
          <div className="container">
            <div className="section-heading-row">
              <div><div className="eyebrow eyebrow-light">The learning hub</div><h2>Good HR is a <em>practice.</em></h2></div>
              <p>Clear ideas. Useful tools. Honest conversations about how we work together.</p>
            </div>
            <div className="learning-layout">
              <div className="learning-feature">
                <div className="feature-stamp"><Compass size={19} /> Start here</div>
                <h3>From HRM basics to the future of work.</h3>
                <p>Build the foundations first, then keep going. Our resources are designed to meet you where you are and help you take a useful next step.</p>
                <a href="#contact" className="button button-light">Browse all resources <ArrowRight size={17} /></a>
                <div className="feature-corner" aria-hidden="true">Z</div>
              </div>
              <div className="track-list">
                {learningTracks.map((track) => <a className="track-item" href="#contact" key={track.number}><span className="track-number">{track.number}</span><span><strong>{track.title}</strong><small>{track.copy}</small></span><ArrowUpRight size={18} /></a>)}
              </div>
            </div>
          </div>
        </section>

        <section id="careers" className="section careers-section">
          <div className="container careers-grid">
            <div className="career-art" aria-hidden="true"><div className="art-circle" /><div className="art-card art-card-top"><span className="art-label">YOUR NEXT STEP</span><strong>Make it<br /><em>intentional.</em></strong></div><div className="art-card art-card-bottom"><Check size={15} /> CV clarity <span /><Check size={15} /> Interview confidence</div><span className="art-star">✦</span></div>
            <div className="careers-copy"><div className="eyebrow">For your career</div><h2>Confidence is a career <span>skill.</span></h2><p>Whether you’re entering the workforce, changing direction, or ready for your next opportunity, practical guidance can change what feels possible.</p><ul className="check-list"><li><Check size={17} /> CV and LinkedIn improvement</li><li><Check size={17} /> Interview preparation that feels like you</li><li><Check size={17} /> Career planning with a clearer view</li></ul><a className="button button-primary" href="#contact">Find your next step <ArrowRight size={17} /></a></div>
          </div>
        </section>

        <section id="organizations" className="section org-section">
          <div className="container org-grid">
            <div className="org-copy"><div className="eyebrow">For organizations</div><h2>Healthy workplaces are <em>built</em>, not wished for.</h2><p>Small businesses, NGOs, schools, hospitals, hotels, startups, and growing teams deserve HR systems that are clear, fair, and fit for purpose.</p><a className="text-link" href="#contact">Explore the organization pathway <ArrowRight size={16} /></a></div>
            <div className="org-pillars"><div className="pillar"><span>01</span><strong>People systems</strong><p>Policies and practices that give teams a reliable foundation.</p></div><div className="pillar"><span>02</span><strong>Better hiring</strong><p>Recruitment thinking that respects both the role and the person.</p></div><div className="pillar"><span>03</span><strong>Team culture</strong><p>Everyday behaviors that create more engaged workplaces.</p></div></div>
          </div>
        </section>

        <section className="section values-section">
          <div className="container values-layout"><div className="values-intro"><div className="eyebrow">The ZanHR standard</div><h2>People first.<br /><em>Always.</em></h2><div className="quote-mark"><Quote size={34} /></div><blockquote>Knowledge → Trust → Community → Reputation → Clients → Company</blockquote><p>That is the sequence. We are building trust before we sell anything.</p></div><div className="values-list">{values.map(([title, copy], index) => <div className="value-row" key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{copy}</p></div>)}</div></div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-card"><div className="contact-copy"><div className="eyebrow eyebrow-light">Keep learning with us</div><h2>The best workplaces begin with better conversations.</h2><p>Get practical HR insights, career prompts, and useful resources in your inbox. No noise — just one thoughtful note at a time.</p></div><div className="newsletter-box">{subscribed ? <div className="success-state"><div className="success-icon"><Check size={20} /></div><h3>You’re on the list.</h3><p>We’ll keep the useful stuff coming your way.</p></div> : <form onSubmit={handleSubscribe}><label htmlFor="email">Your email address</label><div className="newsletter-input"><input id="email" type="email" required placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} /><button type="submit" aria-label="Subscribe"><ArrowRight size={18} /></button></div><small>By subscribing, you agree to hear from ZanHR Lab. Unsubscribe anytime.</small></form>}</div></div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-main"><div className="footer-brand"><a href="#top" className="brand-lockup"><span className="brand-mark">Z</span><span><span className="brand-name">ZanHR</span><span className="brand-suffix">LAB</span></span></a><p>Making HR understandable, accessible, and practical for Africa.</p></div><div className="footer-links"><div><span className="footer-heading">Explore</span><a href="#why">Why ZanHR</a><a href="#learn">Learning hub</a><a href="#careers">Career resources</a></div><div><span className="footer-heading">Connect</span><a href="#contact">Newsletter</a><a href="#organizations">For organizations</a><a href="mailto:hello@zanhrlab.com">hello@zanhrlab.com</a></div></div><div className="social-links"><span className="footer-heading">Follow along</span><div><a href="#contact" aria-label="YouTube"><Youtube size={18} /></a><a href="#contact" aria-label="Instagram"><Instagram size={18} /></a><a href="#contact" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="#contact" aria-label="Facebook"><Facebook size={18} /></a></div></div></div><div className="container footer-bottom"><span>© 2026 ZanHR Lab. Built for better work.</span><span>Education · Careers · Organizations · Innovation</span></div></footer>
    </div>
  );
}
