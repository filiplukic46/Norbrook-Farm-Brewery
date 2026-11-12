// Engine core: framework-agnostic page lifecycle (engine.md). No loader and no WebGL on this site:
// a farm brewery earns craft in type, layout and the pour, not a GL scene.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScroll, resetScroll, scrollToTarget, startScroll, stopScroll } from './scroll';
import { initReveals } from './reveal';
import { initMagnetic } from './interactions';
import { playEnter, playLeave } from './transition';
import { prefersReducedMotion } from './env';

export { onScroll, scrollState, scrollToTarget, stopScroll, startScroll } from './scroll';
export { setTransition } from './transition';
export { ease, isTouch, isMobile, prefersReducedMotion } from './env';

export type PageFn = (page: { intro: gsap.core.Timeline; path: string }) => void | (() => void);
const pageFns = new Set<PageFn>();
const cleanups: (() => void)[] = [];
let ctx: gsap.Context | null = null;
let intro: gsap.core.Timeline | null = null;
let ready = false;
let booted = false;

/** Run fn on every page load (and now, if a page is ready). Returns an unsubscribe. */
export function onPage(fn: PageFn) {
  pageFns.add(fn);
  if (ready) runPageFn(fn);
  return () => { pageFns.delete(fn); };
}

function runPageFn(fn: PageFn) {
  ctx?.add(() => {
    const c = fn({ intro: intro!, path: location.pathname });
    if (typeof c === 'function') cleanups.push(c);
  });
}

export function syncFlags() {
  const h = document.documentElement.classList;
  h.add('js', 'is-booted');
  h.toggle('motion', !prefersReducedMotion());
}

function initPage() {
  syncFlags();
  ctx = gsap.context(() => {
    intro = initReveals(document);
    initMagnetic(document);
  });
  ready = true;
  pageFns.forEach(runPageFn);
  requestAnimationFrame(() => ScrollTrigger.refresh());
  watchHeight();
}

/** Late layout (a lazy image, a font) moves every trigger below it: re-measure when the page height changes. */
function watchHeight() {
  let lastH = document.body.offsetHeight;
  let call: gsap.core.Tween | null = null;
  const ro = new ResizeObserver(() => {
    const h = document.body.offsetHeight;
    if (Math.abs(h - lastH) < 2) return;
    lastH = h;
    call?.kill();
    call = gsap.delayedCall(0.25, () => { ScrollTrigger.refresh(); lastH = document.body.offsetHeight; });
  });
  ro.observe(document.body);
  cleanups.push(() => { ro.disconnect(); call?.kill(); });
}

/** Land on location.hash after a page is laid out. Page code can claim it via the cancelable
 *  'engine:hash' event (e.g. a target inside a pinned horizontal track). */
function landOnHash() {
  const hash = location.hash;
  if (hash.length < 2) return;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const ev = new CustomEvent('engine:hash', { detail: hash, cancelable: true });
    if (!document.dispatchEvent(ev)) return;
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    // A number from the real page position: Lenis's own element lookup can trail the browser's anchor jump.
    if (el) scrollToTarget(el.getBoundingClientRect().top + window.scrollY, true);
  }));
}

export async function boot(setup?: () => void) {
  if (booted) return;
  booted = true;
  syncFlags();
  initScroll();
  setup?.();
  initPage();
  document.documentElement.classList.add('is-loaded');
  startScroll();
  intro?.play();
  landOnHash();
}

export async function leave() {
  stopScroll();
  await playLeave();
}

export function cleanup() {
  if (!ready) return;
  ready = false;
  cleanups.splice(0).forEach((c) => c());
  ctx?.revert();
  ctx = null;
}

export async function enter({ transition = true, scrollTop = true } = {}) {
  if (!booted) return;
  cleanup();
  if (scrollTop) resetScroll();
  initPage();
  // The intro starts under the lifting pour, so the wave lifts off a page that is already arriving.
  const tl = intro;
  if (transition) {
    gsap.delayedCall(0.2, () => tl?.play());
    await playEnter();
  } else tl?.play();
  startScroll();
  landOnHash();
}
