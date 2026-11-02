import { useEffect, type ReactNode } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { DataSafetyPage, DeleteAccountPage, PrivacyPage } from "./DataPrivacy";
import WaterBuddyShowcase, { WaterBuddyMapPreview } from "./WaterBuddyShowcase";
import RiskDashboardPreview from "./RiskDashboardPreview";
import AppShowcase from "./AppShowcase";

function Brand() {
  return <Link className="brand" to="/" aria-label="SafeWaters home"><img src="/logo.png" alt="" width="64" height="64" /><span>Safe<span className="brand-water">Waters</span></span></Link>;
}

function Layout({ children }: { children: ReactNode }) {
  return <div className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="container nav"><Brand /><nav className="header-links" aria-label="Main navigation"><Link className="header-support" to="/support-us">Support Us <span aria-hidden="true">↗</span></Link></nav></div></header>
    <main id="main">{children}</main>
    <footer className="site-footer"><div className="container footer-inner"><nav className="footer-links" aria-label="SafeWaters links"><Link to="/support-us">Support Us</Link><Link to="/data-safety">Data Safety</Link><Link to="/privacy">Privacy Policy</Link><Link to="/delete-account">Delete Account</Link></nav><p className="footer-name">Safe<span className="brand-water">Waters</span></p><p className="copyright">© {new Date().getFullYear()} Polymathic Projects</p></div></footer>
  </div>;
}

const outingSteps = [
  { title: "Plan", intro: "Start with a clear plan.", description: "Organise the activity, the participants, and set your launch, return and session plan before heading out.", tags: ["Crew", "Equipment", "Locations"], icon: "M6 4H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h6M12 4h2a1 1 0 0 1 1 1v5M6 2h6v4H6ZM6 10h6M6 14h4M6 18h2m4 4 4-1 6-6a2.1 2.1 0 0 0-3-3l-6 6-1 4Zm6-9 3 3" },
  { title: "Assess", intro: "Know your conditions.", description: "Bring weather, tides and an outing risk assessment into your planning, alongside your local knowledge.", tags: ["Weather", "Tides", "Risk"], icon: "M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Zm-4-11 3 3 5-5" },
  { title: "Track", intro: "Stay connected on the water.", description: "Follow your route and live progress. Share a WaterBuddy link with the people looking out for you.", tags: ["Live location", "WaterBuddy"], icon: "M3 12h4l3-8 4 16 3-8h4" },
];

function OutingFeatures() {
  return <div className="feature-grid">{outingSteps.map(step => <article className="feature" key={step.title}>
    <div className="feature-top"><span className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={step.icon} /></svg></span></div>
    <h3>{step.title}</h3><p className="feature-intro">{step.intro}</p><p className="feature-description">{step.description}</p>
    <ul className="feature-tags" aria-label={`${step.title} features`}>{step.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
  </article>)}</div>;
}

function HomePage() {
  return <Layout>
    <section className="hero"><div className="container hero-grid"><div className="hero-content"><span className="eyebrow">PLAN · ASSESS · TRACK</span><h1>Session planning<br /><span>&amp; live tracking.</span></h1><p className="hero-copy">Plan your session, check weather and tidal conditions, and share your live progress with WaterBuddy.</p><br /><p className="hero-copy">Download SafeWaters today and plan your next adventure with confidence.</p><div className="hero-actions"><button type="button" className="button hero-primary hero-download" disabled>Download App <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" /></svg><span className="download-coming-soon">Coming Soon</span></button><a className="button hero-features" href="#app-showcase-title" onClick={event => { event.preventDefault(); document.getElementById("app-showcase-title")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }); }}>Explore the Features</a></div></div><div className="hero-product-preview"><div className="hero-app-preview"><span className="hero-preview-label">SafeWaters App</span><div className="hero-preview-frame"><RiskDashboardPreview /></div></div><div className="hero-buddy-preview"><span className="hero-preview-label">WaterBuddy · Web</span><div className="hero-preview-frame"><WaterBuddyMapPreview /></div></div></div></div></section>
    <section className="section" id="about"><div className="container"><div className="section-heading"><div><h2>Plan, assess and track your outings.</h2></div></div><OutingFeatures /></div></section>
    <AppShowcase />
    <section className="buddy-section" id="waterbuddy"><div className="container"><div className="section-heading buddy-heading"><h2>WaterBuddy</h2><div className="buddy-intro"><p>Keep friends, family and club members connected to your outing with WaterBuddy. Share a link to let them follow your route, view outing details and track your progress in real time. <strong>No app required</strong> – simply open the shared link in any web browser.</p></div></div><WaterBuddyShowcase /></div></section>

  </Layout>;
}

function EmailConfirmedPage() {
  const { hash, search } = useLocation();
  const params = new URLSearchParams(hash.slice(1));
  const failed = params.has("error") || new URLSearchParams(search).has("error");
  return <Layout><section className="confirmation-section"><div className="confirmation-card"><div className={`check ${failed ? "check-error" : ""}`} aria-hidden="true">{failed ? "!" : "✓"}</div><span className="eyebrow">YOUR SAFEWATERS ACCOUNT</span><h1>{failed ? "Let’s try that again." : "Email confirmed."}</h1><p>{failed ? "This confirmation link could not be completed. Return to the SafeWaters app and request a new confirmation email." : "Thanks for confirming your email address. You’re ready to return to SafeWaters and sign in."}</p><a className="button button-primary button-wide" href="safewaters://">Open SafeWaters <span aria-hidden="true">↗</span></a><p className="app-hint">If the app doesn’t open, launch SafeWaters on your phone.</p><Link className="text-link" to="/">← Back to SafeWaters</Link></div><p className="confirmation-caption">A better plan starts here.</p></section></Layout>;
}

function SupportUsPage() {
  return <Layout><section className="support-section"><div className="container support-grid">
    <article className="support-card">
      <span className="eyebrow">SUPPORT SAFEWATERS</span>
      <h1>Support Us</h1>
      <p className="support-intro">SafeWaters is built to help people plan more informed outings and keep those following them better connected.</p>
      <p>If you find SafeWaters useful, you can make a voluntary contribution through Ko-fi. Your support helps with the ongoing costs of developing, running and improving the service.</p>
      <iframe
        id="kofiframe"
        className="kofi-frame"
        src="https://ko-fi.com/izaakfrost/?hidefeed=true&widget=true&embed=true&preview=true"
        height="602"
        title="Support SafeWaters through Ko-fi"
      />
      <p className="support-note">Contributions are optional and are not charitable donations.</p>
    </article>
    <aside className="support-impact" aria-label="What your support helps with">
      <span className="eyebrow">WHAT IT SUPPORTS</span>
      <div className="support-impact-item"><span aria-hidden="true">01</span><div><h2>Keeping it running</h2><p>Hosting, data services and the tools needed to operate SafeWaters.</p></div></div>
      <div className="support-impact-item"><span aria-hidden="true">02</span><div><h2>Improving the experience</h2><p>Continued development, testing and thoughtful refinements.</p></div></div>
      <div className="support-impact-item"><span aria-hidden="true">03</span><div><h2>Building for the water</h2><p>More useful planning and safety features for clubs and crews.</p></div></div>
    </aside>
  </div></section></Layout>;
}

function NotFoundPage() {
  return <Layout><section className="confirmation-section"><div className="confirmation-card"><span className="eyebrow">404 / OFF COURSE</span><h1>Let’s get you back.</h1><p>This page couldn’t be found. Head home to explore SafeWaters.</p><Link className="button button-primary" to="/">Back to home</Link></div></section></Layout>;
}

export default function App() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const titles: Record<string, string> = { "/": "SafeWaters | Plan. Assess. Track.", "/email-confirmed": "Email confirmation | SafeWaters", "/privacy": "Privacy Policy | SafeWaters", "/data-safety": "Data Safety | SafeWaters", "/delete-account": "Delete Account | SafeWaters", "/support-us": "Support Us | SafeWaters" };
    document.title = titles[pathname.replace(/\/+$/, "") || "/"] ?? "Page not found | SafeWaters";
    if (hash && document.getElementById(hash.slice(1))) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return <Routes><Route path="/" element={<HomePage />} /><Route path="/email-confirmed" element={<EmailConfirmedPage />} /><Route path="/data-safety" element={<Layout><DataSafetyPage /></Layout>} /><Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} /><Route path="/delete-account" element={<Layout><DeleteAccountPage /></Layout>} /><Route path="/support-us" element={<SupportUsPage />} /><Route path="*" element={<NotFoundPage />} /></Routes>;
}
