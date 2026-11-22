import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  Compass,
  Facebook,
  GraduationCap,
  Instagram,
  Languages,
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
import { FormEvent, useEffect, useState } from "react";
import { SiteLanguage, SitePage, siteCopy } from "@/lib/siteCopy";

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");
const brandLogoSrc = `${import.meta.env.BASE_URL}zanhr-lab-logo.png`;
const audienceIcons = [GraduationCap, Target, Users, BriefcaseBusiness];

const pageHref = (page: SitePage) => {
  const suffix = page === "home" ? "" : `${page}/`;
  return `${BASE_PATH}/${suffix}`;
};

function LanguagePicker({
  language,
  label,
  onChange,
}: {
  language: SiteLanguage;
  label: string;
  onChange: (language: SiteLanguage) => void;
}) {
  return (
    <label className="language-picker">
      <Languages size={16} aria-hidden="true" />
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={language}
        onChange={(event) => onChange(event.target.value as SiteLanguage)}
      >
        <option value="en">English</option>
        <option value="sw">Kiswahili</option>
      </select>
    </label>
  );
}

export default function Home({ page = "home" }: { page?: SitePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<SiteLanguage>("en");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const t = siteCopy[language];

  useEffect(() => {
    if (window.localStorage.getItem("zanhr-language") === "sw") {
      setLanguage("sw");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.pageTitles[page];
    const setMetaContent = (selector: string, content: string) => {
      const meta = document.querySelector<HTMLMetaElement>(selector);
      if (meta) meta.content = content;
    };
    setMetaContent('meta[name="description"]', t.pageDescriptions[page]);
    setMetaContent('meta[property="og:title"]', t.pageTitles[page]);
    setMetaContent('meta[property="og:description"]', t.pageDescriptions[page]);
    setMetaContent('meta[name="twitter:title"]', t.pageTitles[page]);
    setMetaContent('meta[name="twitter:description"]', t.pageDescriptions[page]);
    window.localStorage.setItem("zanhr-language", language);
  }, [language, page, t]);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  const closeMenu = () => setMenuOpen(false);
  const navItems: { page: SitePage; label: string }[] = [
    { page: "home", label: t.nav.home },
    { page: "learn", label: t.nav.learn },
    { page: "careers", label: t.nav.careers },
    { page: "organizations", label: t.nav.organizations },
    { page: "about", label: t.nav.about },
  ];

  return (
    <div className={`min-h-screen bg-[#fbfaf6] text-[#183a33] page-${page}`}>
      <header className="site-header">
        <div className="container site-header-inner">
          <a href={pageHref("home")} className="brand-lockup" aria-label="ZanHR Lab home" onClick={closeMenu}>
            <img src={brandLogoSrc} alt="ZanHR Lab" className="brand-logo" />
          </a>

          <nav className="site-nav hidden items-center gap-6 lg:flex" aria-label={t.navigationLabel}>
            {navItems.map((item) => (
              <a
                key={item.page}
                href={pageHref(item.page)}
                className={`nav-link${page === item.page ? " is-active" : ""}`}
                aria-current={page === item.page ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <LanguagePicker language={language} label={t.languageLabel} onChange={setLanguage} />
            <a href={pageHref("learn")} className="header-cta hidden lg:inline-flex">
              {t.startExploring} <ArrowUpRight size={16} />
            </a>
            <button
              type="button"
              className="menu-toggle lg:hidden"
              aria-label={menuOpen ? t.closeMenu : t.openMenu}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-menu lg:hidden" aria-label={t.navigationLabel}>
            {navItems.map((item) => (
              <a
                key={item.page}
                href={pageHref(item.page)}
                className="mobile-nav-link"
                aria-current={page === item.page ? "page" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a href={pageHref("learn")} className="header-cta mt-2 inline-flex" onClick={closeMenu}>
              {t.startExploring} <ArrowUpRight size={16} />
            </a>
          </nav>
        )}
      </header>

      <main id="top">
        {page === "home" && (
          <>
            <section className="hero-section">
              <div className="container hero-grid">
                <div className="hero-copy">
                  <div className="eyebrow"><span className="eyebrow-dot" /> {t.hero.eyebrow}</div>
                  <h1>{t.hero.headline} <em>{t.hero.headlineAccent}</em></h1>
                  <p className="hero-lede">{t.hero.lede}</p>
                  <div className="hero-actions">
                    <a className="button button-primary" href={pageHref("learn")}>{t.hero.explore} <ArrowRight size={17} /></a>
                    <a className="button button-quiet" href={pageHref("about")}><span className="play-icon"><Play size={13} fill="currentColor" /></span> {t.hero.why}</a>
                  </div>
                  <div className="hero-proof">
                    <div className="avatar-stack" aria-hidden="true"><span>J</span><span>A</span><span>M</span><span>+</span></div>
                    <p><strong>{t.hero.proofTitle}</strong><br /><span>{t.hero.proofText}</span></p>
                  </div>
                </div>
                <div className="hero-visual" aria-label={t.hero.visualLabel}>
                  <div className="hero-orbit orbit-one" />
                  <div className="hero-orbit orbit-two" />
                  <div className="hero-note note-top"><Sparkles size={15} /> {t.hero.noteTop}</div>
                  <div className="hero-note note-bottom"><span className="note-line" /> {t.hero.noteBottom}</div>
                  <div className="hero-card hero-card-main">
                    <div className="card-kicker">{t.hero.cardKicker}</div>
                    <div className="card-heading">{t.hero.cardTitle}<br /><span>{t.hero.cardAccent}</span></div>
                    <div className="card-graph"><span className="graph-bar bar-one" /><span className="graph-bar bar-two" /><span className="graph-bar bar-three" /><span className="graph-bar bar-four" /><span className="graph-line" /></div>
                    <div className="card-footer"><span>{t.hero.knowledge}</span><strong>→</strong><span>{t.hero.impact}</span></div>
                  </div>
                  <div className="hero-card hero-card-mini"><BookOpen size={19} /><span><strong>{t.hero.resourceTitle}</strong><small>{t.hero.resourceText}</small></span></div>
                  <span className="visual-spark spark-a">✦</span><span className="visual-spark spark-b">✳</span>
                </div>
              </div>
              <div className="hero-scribble" aria-hidden="true">/ / /</div>
            </section>

            <section className="trust-strip">
              <div className="container trust-inner">
                <span className="trust-label">{t.trustLabel}</span>
                <div className="trust-audiences">{t.trustAudiences.map((audience, index) => <span className="trust-audience" key={audience}>{index > 0 && <i>·</i>}{audience}</span>)}</div>
              </div>
            </section>

            <section id="why" className="section section-intro">
              <div className="container intro-grid">
                <div>
                  <div className="eyebrow">{t.intro.eyebrow}</div>
                  <h2>{t.intro.title} <span>{t.intro.accent}</span></h2>
                </div>
                <div className="intro-copy">
                  <p>{t.intro.copy}</p>
                  <a className="text-link" href={pageHref("learn")}>{t.intro.link} <ArrowRight size={16} /></a>
                </div>
              </div>
              <div className="container audience-grid">
                {t.audiences.map(({ title, copy }, index) => {
                  const Icon = audienceIcons[index];
                  const target: SitePage = index === 3 ? "organizations" : "careers";
                  return (
                    <article className={`audience-card audience-${index + 1}`} key={title}>
                      <div className="audience-icon"><Icon size={21} strokeWidth={1.7} /></div>
                      <h3>{title}</h3>
                      <p>{copy}</p>
                      <a href={pageHref(target)} aria-label={`${language === "en" ? "Explore resources for" : "Chunguza rasilimali za"} ${title}`}><ArrowUpRight size={17} /></a>
                    </article>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {page === "learn" && (
          <section id="learn" className="section learning-section page-section">
            <div className="container">
              <div className="section-heading-row">
                <div><div className="eyebrow eyebrow-light">{t.learning.eyebrow}</div><h1>{t.learning.title} <em>{t.learning.accent}</em></h1></div>
                <p>{t.learning.summary}</p>
              </div>
              <div className="learning-layout">
                <div className="learning-feature">
                  <div className="feature-stamp"><Compass size={19} /> {t.learning.startHere}</div>
                  <h2>{t.learning.featureTitle}</h2>
                  <p>{t.learning.featureCopy}</p>
                  <a href={`${pageHref("about")}#contact`} className="button button-light">{t.learning.browse} <ArrowRight size={17} /></a>
                  <div className="feature-corner" aria-hidden="true">Z</div>
                </div>
                <div className="track-list">
                  {t.learning.tracks.map((track, index) => <article className="track-item" key={track.title}><span className="track-number">0{index + 1}</span><span><strong>{track.title}</strong><small>{track.copy}</small></span><ArrowUpRight size={18} /></article>)}
                </div>
              </div>
            </div>
          </section>
        )}

        {page === "careers" && (
          <section id="careers" className="section careers-section page-section">
            <div className="container careers-grid">
              <div className="career-art" aria-hidden="true"><div className="art-circle" /><div className="art-card art-card-top"><span className="art-label">{t.careers.artLabel}</span><strong>{t.careers.artTitle}<br /><em>{t.careers.artAccent}</em></strong></div><div className="art-card art-card-bottom"><Check size={15} /> {t.careers.cv} <span /><Check size={15} /> {t.careers.interviews}</div><span className="art-star">✦</span></div>
              <div className="careers-copy"><div className="eyebrow">{t.careers.eyebrow}</div><h1>{t.careers.title} <span>{t.careers.accent}</span></h1><p>{t.careers.copy}</p><ul className="check-list">{t.careers.steps.map((step) => <li key={step}><Check size={17} /> {step}</li>)}</ul><a className="button button-primary" href={`${pageHref("about")}#contact`}>{t.careers.cta} <ArrowRight size={17} /></a></div>
            </div>
          </section>
        )}

        {page === "organizations" && (
          <section id="organizations" className="section org-section page-section">
            <div className="container org-grid">
              <div className="org-copy"><div className="eyebrow">{t.organizations.eyebrow}</div><h1>{t.organizations.title} <em>{t.organizations.accent}</em>{t.organizations.titleEnd}</h1><p>{t.organizations.copy}</p><a className="text-link" href={`${pageHref("about")}#contact`}>{t.organizations.link} <ArrowRight size={16} /></a></div>
              <div className="org-pillars">{t.organizations.pillars.map((pillar, index) => <div className="pillar" key={pillar.title}><span>0{index + 1}</span><strong>{pillar.title}</strong><p>{pillar.copy}</p></div>)}</div>
            </div>
          </section>
        )}

        {page === "about" && (
          <>
            <section id="about" className="section values-section page-section">
              <div className="container values-layout"><div className="values-intro"><div className="eyebrow">{t.values.eyebrow}</div><h1>{t.values.title}<br /><em>{t.values.accent}</em></h1><div className="quote-mark"><Quote size={34} /></div><blockquote>{t.values.quote}</blockquote><p>{t.values.copy}</p></div><div className="values-list">{t.values.items.map(([title, copy], index) => <div className="value-row" key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{copy}</p></div>)}</div></div>
            </section>
            <section id="contact" className="section contact-section">
              <div className="container contact-card"><div className="contact-copy"><div className="eyebrow eyebrow-light">{t.contact.eyebrow}</div><h2>{t.contact.title}</h2><p>{t.contact.copy}</p></div><div className="newsletter-box">{subscribed ? <div className="success-state"><div className="success-icon"><Check size={20} /></div><h3>{t.contact.successTitle}</h3><p>{t.contact.successCopy}</p></div> : <form onSubmit={handleSubscribe}><label htmlFor="email">{t.contact.emailLabel}</label><div className="newsletter-input"><input id="email" type="email" required placeholder={t.contact.placeholder} value={email} onChange={(event) => setEmail(event.target.value)} /><button type="submit" aria-label={t.contact.subscribe}><ArrowRight size={18} /></button></div><small>{t.contact.consent}</small></form>}</div></div>
            </section>
          </>
        )}
      </main>

      <footer className="site-footer"><div className="container footer-main"><div className="footer-brand"><a href={pageHref("home")} className="brand-lockup" aria-label="ZanHR Lab home"><img src={brandLogoSrc} alt="ZanHR Lab" className="brand-logo" /></a><p>{t.footer.brandCopy}</p></div><div className="footer-links"><div><span className="footer-heading">{t.footer.explore}</span><a href={`${pageHref("home")}#why`}>{t.footer.why}</a><a href={pageHref("learn")}>{t.footer.learning}</a><a href={pageHref("careers")}>{t.footer.careerResources}</a></div><div><span className="footer-heading">{t.footer.connect}</span><a href={`${pageHref("about")}#contact`}>{t.footer.newsletter}</a><a href={pageHref("organizations")}>{t.footer.forOrganizations}</a><a href="mailto:hello@zanhrlab.com">hello@zanhrlab.com</a></div></div><div className="social-links"><span className="footer-heading">{t.footer.follow}</span><div><a href="#contact" aria-label="YouTube"><Youtube size={18} /></a><a href="#contact" aria-label="Instagram"><Instagram size={18} /></a><a href="#contact" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="#contact" aria-label="Facebook"><Facebook size={18} /></a></div></div></div><div className="container footer-bottom"><span>{t.footer.copyright}</span><span>{t.footer.topics}</span></div></footer>
    </div>
  );
}
