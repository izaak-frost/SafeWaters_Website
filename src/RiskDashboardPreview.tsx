import { useId } from "react";

// Keep the full dashboard and matching canvas, excluding the phone status bar.
export default function RiskDashboardPreview() {
  const id = useId();
  return <svg className="hero-risk-screen" viewBox="-24 112 898 1794" role="img" aria-labelledby={id}>
    <title id={id}>SafeWaters risk dashboard showing Exmouth Dock, moderate risk, the risk forecast and weather warnings.</title>
    <rect x="-24" y="-32" width="898" height="1938" fill="#f4f7f8" />
    <defs><clipPath id={`${id}-dashboard`}><rect x="0" y="112" width="850" height="1738" /></clipPath></defs>
    <g transform="translate(0 24)"><image href="/screenshots/risk-dashboard-light.png" width="850" height="1850" clipPath={`url(#${id}-dashboard)`} /></g>
  </svg>;
}
