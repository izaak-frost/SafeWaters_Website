import { useEffect, type ReactNode } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

function Brand() {
  return <Link className="brand" to="/" aria-label="SafeWaters home"><img src="/logo.png" alt="" width="64" height="64" /><span>Safe<span className="brand-water">Waters</span><small>Safer decisions on the water.</small></span></Link>;
}

function Layout({ children }: { children: ReactNode }) {
  return <div className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="container nav"><Brand /></div></header>
    <main id="main">{children}</main>
    <footer className="site-footer"><div className="container footer-inner"><Brand /><div><p>Plan thoughtfully. Stay connected.</p><p className="copyright">© {new Date().getFullYear()} Polymathic Projects</p></div></div></footer>
  </div>;
}

function WaterBuddyPreview() {
  return <div className="outing-preview">
    <img className="waterbuddy-display" src="/waterbuddy_display.png"
      alt="WaterBuddy showing a completed rowing route and outing statistics"
      width="1191" height="707" fetchPriority="high" />
  </div>;
}

function HomePage() {
  return <Layout>
    <section className="hero"><div className="container hero-grid"><div className="hero-content"><span className="eyebrow">BEFORE, DURING & AFTER YOUR OUTING</span><h1>A better plan.<br />A safer day<br /><span>on the water.</span></h1><p className="hero-copy">From the first weather check to the journey home. SafeWaters brings your crew, your plans and your conditions together.</p><p className="hero-note">Built around rowing. Made for people on the water.</p></div><WaterBuddyPreview /></div></section>
    <section className="section" id="about"><div className="container"><div className="section-heading"><div><span className="eyebrow">EVERY PART OF YOUR OUTING</span><h2>Less scattered information.<br />More informed decisions.</h2></div><p>Bring the details that matter into one place, so crews and authorised club officials can understand the plan.</p></div><div className="feature-grid">
      <article className="feature"><span className="feature-number">01 / PLAN</span><h3>Start with a clear plan.</h3><p>Choose your boat, bring your crew together and set your launch, return and session plan before heading out.</p><span className="feature-tag">People · Equipment · Locations</span></article>
      <article className="feature"><span className="feature-number">02 / ASSESS</span><h3>Know your conditions.</h3><p>Bring weather, tidal information and activity risk assessment into your planning, alongside your local knowledge.</p><span className="feature-tag">Weather · Tides · Risk</span></article>
      <article className="feature"><span className="feature-number">03 / CONNECT</span><h3>Keep your people informed.</h3><p>Share your WaterBuddy link so the people following your outing can see its plan and live progress.</p><span className="feature-tag">Plan · Progress · Return</span></article>
    </div></div></section>
    <section className="buddy-section"><div className="container buddy-card"><div className="buddy-symbol" aria-hidden="true">↗</div><div><span className="eyebrow">MEET WATERBUDDY</span><h2>Your outing. A shared view.</h2><p>WaterBuddy connects your SafeWaters activity with the people looking out for you. Following an outing? Open the WaterBuddy link shared by its organiser.</p></div></div></section>
  </Layout>;
}

function EmailConfirmedPage() {
  const { hash, search } = useLocation();
  const params = new URLSearchParams(hash.slice(1));
  const failed = params.has("error") || new URLSearchParams(search).has("error");
  return <Layout><section className="confirmation-section"><div className="confirmation-card"><div className={`check ${failed ? "check-error" : ""}`} aria-hidden="true">{failed ? "!" : "✓"}</div><span className="eyebrow">YOUR SAFEWATERS ACCOUNT</span><h1>{failed ? "Let’s try that again." : "Email confirmed."}</h1><p>{failed ? "This confirmation link could not be completed. Return to the SafeWaters app and request a new confirmation email." : "Thanks for confirming your email address. You’re ready to return to SafeWaters and sign in."}</p><a className="button button-primary button-wide" href="safewaters://">Open SafeWaters <span aria-hidden="true">↗</span></a><p className="app-hint">If the app doesn’t open, launch SafeWaters on your phone.</p><Link className="text-link" to="/">← Back to SafeWaters</Link></div><p className="confirmation-caption">A better plan starts here.</p></section></Layout>;
}

function NotFoundPage() {
  return <Layout><section className="confirmation-section"><div className="confirmation-card"><span className="eyebrow">404 / OFF COURSE</span><h1>Let’s get you back.</h1><p>This page couldn’t be found. Head home to explore SafeWaters.</p><Link className="button button-primary" to="/">Back to home</Link></div></section></Layout>;
}

export default function App() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = pathname === "/" ? "SafeWaters | Safer decisions on the water" : pathname === "/email-confirmed" ? "Email confirmation | SafeWaters" : "Page not found | SafeWaters";
    if (hash === "#about") document.getElementById("about")?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return <Routes><Route path="/" element={<HomePage />} /><Route path="/email-confirmed" element={<EmailConfirmedPage />} /><Route path="*" element={<NotFoundPage />} /></Routes>;
}
