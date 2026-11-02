/** Unique reachable positions, including the clamped end of a wide viewport. */
export function nextCarouselPosition(current: number, cardOffsets: number[], maxScroll: number, direction: number) {
  const max = Math.max(0, maxScroll);
  const gaps = cardOffsets.slice(1).map((offset, index) => offset - cardOffsets[index]).filter(gap => gap > 0);
  const minimumStep = gaps.length ? Math.min(...gaps) / 2 : 0;
  // Merge a tiny final movement into the preceding card advance.
  const stops = [...new Set([0, ...cardOffsets.map(offset => Math.max(0, Math.min(max, offset))), max])]
    .filter(stop => stop === 0 || stop === max || max - stop >= minimumStep)
    .sort((a, b) => a - b);
  return direction > 0
    ? stops.find(stop => stop > current + 1) ?? max
    : [...stops].reverse().find(stop => stop < current - 1) ?? 0;
}
