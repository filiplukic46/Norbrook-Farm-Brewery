// Server-side helpers for the hand-drawn layer (seeded, so every build draws the same lines).
export function rng(seed: number) {
  let s = seed % 2147483647 || 1;
  return () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
}

const f = (n: number) => n.toFixed(1);

/** Catmull-Rom through points → cubic Bézier path. */
export function crPath(pts: [number, number][], closed = false) {
  const n = pts.length;
  const g = (i: number) => (closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + (closed ? 'Z' : '');
}

/** A wobbly hand-drawn oval inside a w×h box. */
export function sketchOval(w: number, h: number, seed: number, jitter = 3, sw = 2) {
  const r = rng(seed);
  const pts: [number, number][] = [];
  const N = 24;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const k = 1 + ((r() - 0.5) * jitter * 2) / Math.min(w, h);
    pts.push([w / 2 + Math.cos(a) * (w / 2 - sw - jitter) * k, h / 2 + Math.sin(a) * (h / 2 - sw - jitter) * k]);
  }
  return crPath(pts, true);
}

/** A hand-drawn line across width w (height 14). */
export function sketchLine(w: number, seed: number, amp = 2.5) {
  const r = rng(seed);
  const N = Math.max(4, Math.round(w / 70));
  const pts: [number, number][] = [];
  for (let i = 0; i <= N; i++) pts.push([2 + (i / N) * (w - 4), 7 + (r() - 0.5) * amp * 2]);
  return crPath(pts, false);
}

/** Curved arrow: returns the shaft and head paths. */
export function arrow(pts: [number, number][], head = 11) {
  const d = crPath(pts, false);
  const [x1, y1] = pts[pts.length - 2];
  const [x2, y2] = pts[pts.length - 1];
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h1 = [x2 - head * Math.cos(a - 0.5), y2 - head * Math.sin(a - 0.5)];
  const h2 = [x2 - head * Math.cos(a + 0.5), y2 - head * Math.sin(a + 0.5)];
  return { d, head: `M${f(h1[0])} ${f(h1[1])} L${f(x2)} ${f(y2)} L${f(h2[0])} ${f(h2[1])}` };
}

/** Periodic foam edge over width w (two identical halves, so it can drift and loop). */
export function foamEdge(seed: number, w = 2880, h = 48, base = 20) {
  const r = rng(seed);
  const c = [2 + Math.floor(r() * 3), 5 + Math.floor(r() * 4), 11 + Math.floor(r() * 6)]; // integer cycles per half
  const amp = [5, 3, 1.6];
  const ph = [r() * 6.28, r() * 6.28, r() * 6.28];
  const half = w / 2;
  let d = `M0 0 L${w} 0 L${w} ${f(yAt(w))}`;
  for (let x = w; x >= 0; x -= 12) d += ` L${f(x)} ${f(yAt(x))}`;
  return d + ' Z';
  function yAt(x: number) {
    const t = (x % half) / half;
    return base + c.reduce((s, ci, i) => s + Math.sin(t * ci * Math.PI * 2 + ph[i]) * amp[i], 0);
  }
}

/** Bubbles: circles as one path, for a strip w×h. */
export function bubbles(seed: number, count: number, w: number, h: number) {
  const r = rng(seed);
  let d = '';
  for (let i = 0; i < count; i++) {
    const x = r() * w, y = r() * h, rad = 1.4 + r() * 3.2;
    d += `M${f(x - rad)} ${f(y)}a${f(rad)} ${f(rad)} 0 1 0 ${f(2 * rad)} 0a${f(rad)} ${f(rad)} 0 1 0 ${f(-2 * rad)} 0Z`;
  }
  return d;
}

export const GLASS_PATH = 'M3 2H21C22 9 23 16 19 23C16.5 26.5 7.5 26.5 5 23C1 16 2 9 3 2Z';
