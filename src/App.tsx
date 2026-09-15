import { Link, Route, Routes } from "react-router-dom";

function Brand() {
  return (
    <Link className="brand" to="/" aria-label="SafeWaters home">
      <span className="brand-mark" aria-hidden="true">
        <span className="wave wave-one" />
        <span className="wave wave-two" />
      </span>
      <span>SafeWaters</span>
    </Link>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container nav">
          <Brand />
          <a className="nav-link" href="https://live.safewaters.uk">
            WaterBuddy
          </a>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <Brand />
          <p>Safer decisions on the water.</p>
          <p className="copyright">
            © {new Date().getFullYear()} Polymathic Projects
          </p>
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <Layout>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">WATERSPORTS SAFETY</span>
            <h1>Plan with confidence.<br />Get home safely.</h1>
            <p className="hero-copy">
              SafeWaters brings activity planning, environmental conditions,
              risk assessment and live outing visibility together in one place.
            </p>
            <div className="actions">
              <a className="button button-primary" href="https://live.safewaters.uk">
                Open WaterBuddy
              </a>
              <a className="button button-secondary" href="#about">
                Learn more
              </a>
            </div>
          </div>

          <div className="water-card" aria-hidden="true">
            <div className="sun" />
            <div className="horizon" />
            <div className="water-lines">
              <span /><span /><span /><span /><span />
            </div>
            <div className="boat">
              <span className="boat-body" />
              <span className="oar oar-left" />
              <span className="oar oar-right" />
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">BUILT FOR THE WATER</span>
            <h2>One place for a safer outing.</h2>
            <p>
              Designed initially around rowing clubs, SafeWaters helps crews and
              club officials understand the plan, conditions and activity status.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature">
              <span className="feature-number">01</span>
              <h3>Plan</h3>
              <p>Bring the crew, equipment, locations and outing plan together.</p>
            </article>
            <article className="feature">
              <span className="feature-number">02</span>
              <h3>Assess</h3>
              <p>Use weather, tidal and activity information to support risk decisions.</p>
            </article>
            <article className="feature">
              <span className="feature-number">03</span>
              <h3>Track</h3>
              <p>Give authorised users visibility of active outings through WaterBuddy.</p>
            </article>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function EmailConfirmedPage() {
  return (
    <Layout>
      <section className="confirmation-section">
        <div className="confirmation-card">
          <div className="check" aria-hidden="true">✓</div>
          <span className="eyebrow">ACCOUNT READY</span>
          <h1>Email confirmed</h1>
          <p>
            Your email address has been successfully confirmed. You can now
            return to SafeWaters and sign in to your account.
          </p>

          <a className="button button-primary button-wide" href="safewaters://">
            Open SafeWaters
          </a>

          <Link className="text-link" to="/">
            Return to safewaters.uk
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function NotFoundPage() {
  return (
    <Layout>
      <section className="confirmation-section">
        <div className="confirmation-card">
          <span className="eyebrow">404</span>
          <h1>Page not found</h1>
          <p>The page you're looking for doesn't exist.</p>
          <Link className="button button-primary button-wide" to="/">
            Go home
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/email-confirmed" element={<EmailConfirmedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
