import { useCarousel } from "./useCarousel";

const screens = [
  { id: "overview", title: "Outing Overview", subtitle: "See the outing plan, crew and live progress in one place.", width: 387, height: 643, description: "WaterBuddy mobile outing overview for Mersea Island Rowing Club, showing an example outing from West Mersea Lifeboat Station into the Quarters and a planned return of 13:30." },
  { id: "fullscreen", title: "Full-Screen Map", subtitle: "Follow the route and latest location on a larger map.", width: 387, height: 645, description: "WaterBuddy full-screen mobile map showing the same example route from West Mersea Lifeboat Station into the Quarters and the Blackwater estuary." },
  { id: "desktop", title: "On Your Computer", subtitle: "View the same outing from any web browser on your computer.", width: 1180, height: 996, description: "WaterBuddy desktop outing overview for Mersea Island Rowing Club, showing the same example estuary route from West Mersea Lifeboat Station. Planned return: 13:30." },
] as const;

function Screenshot({ screen, caption = true }: { screen: typeof screens[number]; caption?: boolean }) {
  return <figure className={`buddy-screenshot buddy-screenshot-${screen.id}`}>
    <img src={`/screenshots/mersea-waterbuddy-${screen.id}.png`}
      alt={`${screen.description} Distance: 2.66 km. Speed: 15.2 km/h. Pace: 3:57 per km. Location Updated: Just Now.`}
      width={screen.width} height={screen.height} loading={caption ? "lazy" : "eager"} decoding="async" />
    {caption && <figcaption className="screenshot-caption"><h3>{screen.title}</h3><p>{screen.subtitle}</p></figcaption>}
  </figure>;
}

export function WaterBuddyMapPreview() {
  return <Screenshot screen={screens.find(screen => screen.id === "fullscreen")!} caption={false} />;
}

export default function WaterBuddyShowcase() {
  const { trackRef, canScroll, scroll } = useCarousel();
  return <div className="buddy-showcase" role="region" aria-label="WaterBuddy screenshots" aria-roledescription={canScroll.overflowing ? "carousel" : undefined}>

    <div className="buddy-screenshots" id="waterbuddy-screenshots" ref={trackRef} tabIndex={canScroll.overflowing ? 0 : undefined} role="group" aria-label="Outing overview, full-screen map and desktop view" onKeyDown={event => {
      if (canScroll.overflowing && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        event.preventDefault();
        scroll(event.key === "ArrowLeft" ? -1 : 1);
      }
    }}>{screens.map(screen => <Screenshot key={screen.id} screen={screen} />)}</div>
    {canScroll.overflowing && <div className="carousel-controls carousel-bottom-controls">
      <button type="button" aria-label="Previous WaterBuddy screenshot" aria-controls="waterbuddy-screenshots" disabled={!canScroll.previous} onClick={() => scroll(-1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg></button>
      <button type="button" aria-label="Next WaterBuddy screenshot" aria-controls="waterbuddy-screenshots" disabled={!canScroll.next} onClick={() => scroll(1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg></button>
    </div>}
  </div>;
}
