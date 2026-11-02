import { useState } from "react";
import { useCarousel } from "./useCarousel";

const appScreens = [
  { image: "risk-dashboard", title: "Risk dashboard", description: "See the day’s risk forecast and the conditions contributing to it." },
  { image: "risk-assessment", title: "Outing risk assessment", description: "Understand an outing’s risk score and the factors behind it." },
  { image: "forecast", title: "Weather forecast", description: "Explore hourly weather and marine forecasts before heading out." },
  { image: "tide-table", title: "Tide table", description: "Check tide times, predicted heights and the shape of the day’s tide." },
  { image: "activities", title: "Your activities", description: "Keep your planned, completed and cancelled outings in one place." },
  { image: "club-management", title: "Club management", description: "Manage your club’s members, saved locations and equipment." },
];

export default function AppShowcase() {
  const { trackRef, canScroll, scroll } = useCarousel();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return <section className="section app-showcase" data-screenshot-theme={theme} aria-labelledby="app-showcase-title" aria-roledescription="carousel">
    <div className="container">
      <div className="section-heading app-showcase-heading">
        <h2 id="app-showcase-title">SafeWaters App</h2>
        <button type="button" className="screenshot-theme-switch" role="switch" aria-checked={theme === "dark"} aria-label="Dark mode app screenshots" aria-controls="app-screenshots" title={theme === "light" ? "Show dark mode screenshots" : "Show light mode screenshots"} onClick={() => setTheme(current => current === "light" ? "dark" : "light")}>
          <span className="theme-switch-thumb" aria-hidden="true" />
          <svg className="theme-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></svg>
          <svg className="theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z" /></svg>
        </button>
      </div>
      <div className="screenshot-carousel" id="app-screenshots" ref={trackRef} tabIndex={0} role="group" aria-label={`App screenshots in ${theme} mode. Use the arrow keys or swipe to explore.`} onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          scroll(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}>{appScreens.map((screen, index) => <figure className="screenshot-card" key={screen.image} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${appScreens.length}: ${screen.title}`}>
        <div className="app-screen"><img src={`/screenshots/${screen.image}${theme === "light" ? "-light.png" : ".jpg"}`} alt={`SafeWaters ${screen.title.toLowerCase()} screen in ${theme} mode`} width="588" height="1280" loading={index < 3 ? "eager" : "lazy"} decoding="async" /></div>
        <figcaption><h3>{screen.title}</h3><p>{screen.description}</p></figcaption>
      </figure>)}</div>
        <div className="carousel-controls carousel-bottom-controls">
          <button type="button" aria-label="Previous app screenshot" aria-controls="app-screenshots" disabled={!canScroll.previous} onClick={() => scroll(-1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg></button>
          <button type="button" aria-label="Next app screenshot" aria-controls="app-screenshots" disabled={!canScroll.next} onClick={() => scroll(1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg></button>
        </div>
    </div>
  </section>;
}
