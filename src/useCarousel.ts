import { useEffect, useRef, useState } from "react";
import { nextCarouselPosition } from "./carousel";

export function useCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const requestedLeft = useRef<number | null>(null);
  const [canScroll, setCanScroll] = useState({ previous: false, next: false, overflowing: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const max = Math.max(0, track.scrollWidth - track.clientWidth);
      if (requestedLeft.current !== null && Math.abs(track.scrollLeft - requestedLeft.current) < 1) requestedLeft.current = null;
      const left = Math.min(max, requestedLeft.current ?? track.scrollLeft);
      setCanScroll({ previous: left > 1, next: left < max - 1, overflowing: max > 1 });
    };
    const reset = () => { requestedLeft.current = null; update(); };
    const observer = new ResizeObserver(reset);
    observer.observe(track);
    track.addEventListener("scroll", update, { passive: true });
    track.addEventListener("scrollend", reset);
    track.addEventListener("pointerdown", reset, { passive: true });
    track.addEventListener("wheel", reset, { passive: true });
    update();
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", update);
      track.removeEventListener("scrollend", reset);
      track.removeEventListener("pointerdown", reset);
      track.removeEventListener("wheel", reset);
    };
  }, []);

  const scroll = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    if (!cards.length) return;
    const max = Math.max(0, track.scrollWidth - track.clientWidth);
    const left = nextCarouselPosition(requestedLeft.current ?? track.scrollLeft, cards.map(card => card.offsetLeft - cards[0].offsetLeft), max, direction);
    requestedLeft.current = left;
    setCanScroll({ previous: left > 1, next: left < max - 1, overflowing: max > 1 });
    track.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return { trackRef, canScroll, scroll };
}
