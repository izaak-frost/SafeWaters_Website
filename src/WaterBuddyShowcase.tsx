import { useId } from "react";
import { useCarousel } from "./useCarousel";

// One route in the desktop map's coordinate space. The mobile transforms align
// the same marina, beach and Dawlish Warren coastline across all three views.
const route = "M740 439 C775 455 820 461 875 480 C930 505 975 560 1025 600 C1080 640 1145 685 1145 715 C1145 745 1100 770 1040 778";
const previewReadings = [
  { label: "Distance", value: "3.06 km" },
  { label: "Speed", value: "15.2 km/h" }, // 1 km / 237 seconds, rounded to 1 decimal.
  { label: "Pace", value: "3:57/km" },
];
const readingLayouts = {
  desktop: { columns: [329, 737, 1131], labelY: 930, valueY: 955, fontSize: 20, background: "#f4f7f8", width: 175 },
  overview: { columns: [16, 153, 273], labelY: 573, valueY: 599, fontSize: 19, background: "#f4f7f8", width: 95 },
  fullscreen: { columns: [33, 148, 257], labelY: 522, valueY: 552, fontSize: 18, background: "#fcfefe", width: 105 },
};
const screens = [
  { id: "overview", title: "Outing overview", width: 390, height: 643, viewBox: "2 0 387 643", transform: "translate(-221 214) scale(.407)", returnTime: { x: 143, y: 307 }, description: "WaterBuddy mobile outing overview showing the same Exmouth route and a planned return of 13:30." },
  { id: "fullscreen", title: "Full-screen map", width: 399, height: 656, viewBox: "5 4 387 645", transform: "translate(-220 11) scale(.46)", returnTime: null, description: "WaterBuddy full-screen mobile map showing the same route from Exmouth into the start of a large offshore loop." },
  { id: "desktop", title: "On your computer", width: 1833, height: 996, viewBox: "325 0 1180 996", transform: "", returnTime: { x: 862, y: 317 }, description: "WaterBuddy desktop outing overview with a route leaving Exmouth and beginning a large loop offshore. Planned return: 13:30." },
];

function Screenshot({ screen, caption = true, padded = false }: { screen: typeof screens[number]; caption?: boolean; padded?: boolean }) {
  const titleId = useId();
  const readings = readingLayouts[screen.id as keyof typeof readingLayouts];
  const [x, y, width, height] = screen.viewBox.split(" ").map(Number);
  const padding = padded ? 18 : 0;
  return <figure className={`buddy-screenshot buddy-screenshot-${screen.id}`}>
    <svg viewBox={`${x - padding} ${y - padding} ${width + padding * 2} ${height + padding * 2}`} role="img" aria-labelledby={titleId}>
      <title id={titleId}>{screen.description} Distance: 3.06 km. Speed: 15.2 km/h. Pace: 3:57 per km.</title>
      {padded && <>
        <defs><clipPath id={`${titleId}-screen`}><rect x={x} y={y} width={width} height={height} rx="4" /></clipPath></defs>
        <rect x={x - padding} y={y - padding} width={width + padding * 2} height={height + padding * 2} fill="#99def9" />
        <rect x={x - padding} y={y - padding} width={width + padding * 2} height={56 + padding} fill="#002152" />
      </>}
      <image href={`/screenshots/waterbuddy-${screen.id}.png`} width={screen.width} height={screen.height} clipPath={padded ? `url(#${titleId}-screen)` : undefined} />
      {screen.returnTime && <g fontFamily={'Aptos, "Segoe UI", Calibri, sans-serif'} fontSize="16" fontWeight="600" fill="#142b45">
        <rect x={screen.returnTime.x - 2} y={screen.returnTime.y - 15} width="52" height="20" fill="white" />
        <text x={screen.returnTime.x} y={screen.returnTime.y}>13:30</text>
      </g>}
      <g transform={screen.transform || undefined}>
        <path d={route} fill="none" stroke="#142b45" strokeWidth={screen.id === "desktop" ? 7 : 12} strokeLinecap="round" strokeLinejoin="round" />
        <path d={route} fill="none" stroke="#f57c00" strokeWidth={screen.id === "desktop" ? 4 : 7} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="1040" cy="778" r={screen.id === "desktop" ? 8 : 17} fill="#1976d2" stroke="white" strokeWidth={screen.id === "desktop" ? 3 : 5} />
      </g>
      <g fontFamily={'Aptos, "Segoe UI", Calibri, sans-serif'}>
        {previewReadings.map((reading, index) => <g key={reading.label}>
          <rect x={readings.columns[index] - 2} y={readings.labelY - 14} width={readings.width} height={readings.valueY - readings.labelY + 22} fill={readings.background} />
          <text x={readings.columns[index]} y={readings.labelY} fill="#637186" fontSize="12" fontWeight="500">{reading.label}</text>
          <text x={readings.columns[index]} y={readings.valueY} fill="#142b45" fontSize={readings.fontSize} fontWeight="600">{reading.value}</text>
        </g>)}
      </g>
    </svg>
    {caption && <figcaption>{screen.title}</figcaption>}
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
