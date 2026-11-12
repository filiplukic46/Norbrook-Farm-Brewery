// Site motion, authored for "The Flight": pour and settle.
import { gsap } from 'gsap';
import { ease, isTouch, onPage, onScroll, prefersReducedMotion, setTransition, startScroll, stopScroll } from '../engine';
import { startPour } from './pour';

/** Called once at boot, before the first page initialises. */
export function setupMotion() {
  // Page transition: an amber pour rises over the page (foam edge first), then lifts off.
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { yPercent: 104 }, { yPercent: 0, duration: 0.75, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { yPercent: -104, duration: 0.85, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
  });

  // The header steps aside while reading down, returns on the way up.
  const html = document.documentElement;
  onScroll((s) => {
    if (html.classList.contains('menu-open')) return;
    if (Math.abs(s.velocity) > 200) return; // a jump (restored position, hash landing), not reading
    if (s.y < 160) html.classList.remove('frame-away');
    else if (s.velocity > 0.6) html.classList.add('frame-away');
    else if (s.velocity < -0.6) html.classList.remove('frame-away');
  });

  let firstPage = true;
  onPage(({ intro }) => {
    const viaPour = !firstPage; // arrived through the page transition, which is itself a pour
    firstPage = false;
    html.classList.remove('frame-away'); // every page arrives with its header in place
    const offs: (() => void)[] = [];
    offs.push(initMenu());
    initOpenNow();
    // Reduced motion: no scrubbed pour, the foam rests as a static head (CSS).
    if (!prefersReducedMotion()) offs.push(startPour());
    offs.push(initTapTabs());
    if (!isTouch() && matchMedia('(hover: hover)').matches) offs.push(initCanPreview());

    // Beer page: the glass is poured as the page arrives (foam drops to a settled head).
    const pint = document.querySelector<HTMLElement>('[data-pint]');
    const pintFoam = pint?.querySelector<HTMLElement>('[data-foam]');
    if (pint && pintFoam && !prefersReducedMotion()) {
      const head = parseFloat(getComputedStyle(pint).getPropertyValue('--head')) * 16 || 78;
      // Direct visit: the glass pours as the page arrives. Through the transition the amber pour
      // has just covered the screen, so it lifts off a glass that is already full.
      if (viaPour) gsap.set(pintFoam, { y: head - pint.offsetHeight });
      else {
        gsap.set(pintFoam, { y: 0 });
        intro.to(pintFoam, { y: () => head - pint.offsetHeight, duration: 1.5, ease: ease.inOut }, 0);
      }
      pint.classList.add('is-live');
      const can = pint.querySelector('[data-pint-can] img');
      if (can) intro.from(can, { yPercent: 8, rotation: -4, duration: 1.6, ease: ease.out }, 0.15);
    }

    // Hero intro: the five glasses get circled once the photo lands.
    if (!prefersReducedMotion()) {
      const heroImg = document.querySelector('[data-hero-img] img');
      // Transform only, so the photo paints at once (it is the LCP element).
      if (heroImg) intro.from(heroImg, { scale: 1.06, yPercent: 2, duration: 1.4, ease: ease.out }, 0.1);
      const nums = document.querySelectorAll<HTMLElement>('[data-gnum]');
      if (nums.length) {
        gsap.set(nums, { scale: 0 });
        intro.to(nums, { scale: 1, duration: 0.65, ease: ease.spring, stagger: 0.06 }, 0.55);
        nums.forEach((n) => {
          const path = n.querySelector('path');
          if (path) intro.fromTo(path, { strokeDashoffset: 160 }, { strokeDashoffset: 0, duration: 0.8, ease: ease.soft }, 0.6);
        });
        const rows = document.querySelectorAll('.sheet__title, .sheet__row');
        intro.from(rows, { y: 14, autoAlpha: 0, duration: 0.7, ease: ease.out, stagger: 0.04 }, 0.65);
      }
    }
    return () => offs.forEach((f) => f());
  });
}

/* ───── Mobile menu: dialog-like overlay with focus trap and Escape ───── */
function initMenu() {
  const btn = document.querySelector<HTMLButtonElement>('[data-menu-btn]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!btn || !menu) return () => {};
  const html = document.documentElement;
  const focusables = () => [btn, ...menu.querySelectorAll<HTMLElement>('a')];

  const open = () => {
    menu.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    btn.textContent = 'Close';
    html.classList.add('menu-open');
    html.classList.remove('frame-away');
    stopScroll();
    if (!prefersReducedMotion()) {
      gsap.fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: ease.out });
      gsap.from(menu.querySelectorAll('li'), { yPercent: 60, autoAlpha: 0, duration: 0.6, ease: ease.out, stagger: 0.04, delay: 0.1 });
    }
    menu.querySelector<HTMLElement>('a')?.focus();
  };
  const close = (refocus = true) => {
    if (menu.hidden) return;
    menu.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Menu';
    html.classList.remove('menu-open');
    startScroll();
    if (refocus) btn.focus();
  };
  const onBtn = () => (menu.hidden ? open() : close());
  const onKey = (e: KeyboardEvent) => {
    if (menu.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    const f = focusables();
    const i = f.indexOf(document.activeElement as HTMLElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
  };
  const onLink = (e: Event) => { if ((e.target as HTMLElement).closest('[data-menu-link]')) close(false); };
  const mq = matchMedia('(min-width: 901px)');
  const onMq = () => { if (mq.matches) close(false); };

  btn.addEventListener('click', onBtn);
  document.addEventListener('keydown', onKey);
  menu.addEventListener('click', onLink);
  mq.addEventListener('change', onMq);
  return () => {
    close(false);
    btn.removeEventListener('click', onBtn);
    document.removeEventListener('keydown', onKey);
    menu.removeEventListener('click', onLink);
    mq.removeEventListener('change', onMq);
  };
}

/* ───── Open now: the header status reads the brewery's local time ───── */
const HOURS: Record<number, [number, number] | null> = { 0: [12, 18], 1: null, 2: null, 3: [12, 20], 4: [12, 20], 5: [12, 20], 6: [12, 20] };
const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const fmt = (h: number) => `${h > 12 ? h - 12 : h} ${h >= 12 ? 'pm' : 'am'}`;

function initOpenNow() {
  const el = document.querySelector<HTMLElement>('[data-open]');
  const text = el?.querySelector<HTMLElement>('[data-open-text]');
  if (!el || !text) return;
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
  const wd = DAY.indexOf(parts.find((p) => p.type === 'weekday')?.value ?? '');
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0) % 24;
  const min = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  if (wd < 0) return;
  const now = hour + min / 60;
  const today = HOURS[wd];
  if (today && now >= today[0] && now < today[1]) {
    text.textContent = `Open now, pouring until ${fmt(today[1])}`;
    el.classList.add('is-open');
    return;
  }
  for (let k = 0; k < 7; k++) {
    const d = (wd + k) % 7;
    const h = HOURS[d];
    if (!h || (k === 0 && now >= h[0])) continue;
    text.textContent = `Closed now, opens ${k === 0 ? 'today' : k === 1 ? 'tomorrow' : DAY[d]} at ${fmt(h[0])}`;
    el.classList.add('is-closed');
    return;
  }
}

/* ───── Tap list tabs: year-round or seasonal, one list at a time ─────
   Without JS both lists show, each under its own heading. The choice is remembered for the
   visit, so coming back from a seasonal beer lands on the seasonal list. */
function initTapTabs() {
  const taps = document.querySelector<HTMLElement>('[data-taps]');
  const bar = taps?.querySelector<HTMLElement>('[data-tabs-bar]');
  if (!taps || !bar) return () => {};
  const tabs = [...bar.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const panels = [...taps.querySelectorAll<HTMLElement>('[data-tab-panel]')];
  const note = bar.querySelector<HTMLElement>('[data-tabs-note]');
  const reduced = prefersReducedMotion();
  panels.forEach((p) => { p.setAttribute('role', 'tabpanel'); p.setAttribute('aria-labelledby', `tab-${p.dataset.tabPanel}`); });
  bar.hidden = false;
  taps.classList.add('is-tabbed');
  let stored: string | null = null;
  try { stored = sessionStorage.getItem('nfb-taps'); } catch { /* storage blocked: start on the first tab */ }

  const select = (id: string, animate: boolean) => {
    tabs.forEach((t) => {
      const on = t.dataset.tab === id;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      if (on && note) note.textContent = t.dataset.note ?? '';
    });
    panels.forEach((p) => { p.hidden = p.dataset.tabPanel !== id; });
    try { sessionStorage.setItem('nfb-taps', id); } catch { /* not remembered, which is fine */ }
    if (animate && !reduced) {
      const panel = panels.find((p) => p.dataset.tabPanel === id);
      // The new list pours in row by row.
      if (panel) gsap.fromTo(panel.querySelectorAll('.tap'), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: ease.out, stagger: 0.035, overwrite: true, clearProps: 'transform,opacity,visibility' });
      if (note) gsap.fromTo(note, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: ease.soft });
    }
  };
  select(stored && tabs.some((t) => t.dataset.tab === stored) ? stored : tabs[0].dataset.tab!, false);

  const onClick = (e: MouseEvent) => {
    const t = (e.target as HTMLElement).closest<HTMLButtonElement>('[role="tab"]');
    if (t && t.getAttribute('aria-selected') !== 'true') select(t.dataset.tab!, true);
  };
  const onKey = (e: KeyboardEvent) => {
    const i = tabs.indexOf(e.target as HTMLButtonElement);
    if (i < 0) return;
    let k = -1;
    if (e.key === 'ArrowRight') k = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') k = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') k = 0;
    else if (e.key === 'End') k = tabs.length - 1;
    if (k < 0) return;
    e.preventDefault();
    tabs[k].focus();
    select(tabs[k].dataset.tab!, true);
  };
  bar.addEventListener('click', onClick);
  bar.addEventListener('keydown', onKey);
  return () => {
    bar.removeEventListener('click', onClick);
    bar.removeEventListener('keydown', onKey);
  };
}

/* ───── Tap list: the can follows the pointer, swaps per row ───── */
const GAP = 110; // px between the cursor and the can's left edge, at a 16px root (grows with it)

function initCanPreview() {
  const list = document.querySelector<HTMLElement>('[data-taps]');
  const box = document.querySelector<HTMLElement>('[data-can-preview]');
  const img = box?.querySelector('img');
  if (!list || !box || !img) return () => {};
  const reduced = prefersReducedMotion();
  const x = gsap.quickTo(box, 'x', { duration: reduced ? 0 : 0.55, ease: ease.soft });
  const y = gsap.quickTo(box, 'y', { duration: reduced ? 0 : 0.55, ease: ease.soft });
  const r = gsap.quickTo(box, 'rotation', { duration: 0.6, ease: ease.soft });
  let lastX = 0;
  let shown = false;
  let settle: gsap.core.Tween | null = null;
  // Never let the can rise past the top of the screen.
  const gap = () => GAP * (parseFloat(getComputedStyle(document.documentElement).fontSize) / 16);
  const toY = (cy: number) => Math.max(cy, box.offsetHeight + 12);

  const move = (e: PointerEvent) => {
    // The can sits right of the cursor, riding above it (cursor level with its base).
    x(e.clientX + gap());
    y(toY(e.clientY));
    if (!reduced) {
      r(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
      settle?.kill();
      settle = gsap.delayedCall(0.12, () => r(0)); // stands upright again when the pointer rests
    }
    lastX = e.clientX;
  };
  const over = (e: PointerEvent) => {
    const row = (e.target as HTMLElement).closest<HTMLElement>('.tap');
    if (!row?.dataset.can) return;
    if (img.getAttribute('src') !== row.dataset.can) {
      img.src = row.dataset.can;
      if (shown && !reduced) gsap.fromTo(img, { yPercent: 12, scale: 0.94 }, { yPercent: 0, scale: 1, duration: 0.5, ease: ease.spring });
    }
    if (!shown) {
      shown = true;
      gsap.set(box, { x: e.clientX + gap(), y: toY(e.clientY) });
      if (!reduced) gsap.fromTo(img, { yPercent: 14 }, { yPercent: 0, duration: 0.6, ease: ease.out });
      gsap.to(box, { autoAlpha: 1, scale: 1, duration: reduced ? 0 : 0.45, ease: ease.spring, overwrite: 'auto' });
    }
  };
  const leave = () => {
    shown = false;
    gsap.to(box, { autoAlpha: 0, scale: 0.85, duration: reduced ? 0 : 0.3, ease: ease.soft, overwrite: 'auto' });
  };
  gsap.set(box, { scale: 0.85, yPercent: -100, transformOrigin: '0% 100%' }); // GSAP owns the transform, so the anchor lives here
  // Warm the cache so swapping cans never waits on (or aborts) a request.
  list.querySelectorAll<HTMLElement>('[data-can]').forEach((a) => { const im = new Image(); im.src = a.dataset.can!; });
  list.addEventListener('pointermove', move);
  list.addEventListener('pointerover', over);
  list.addEventListener('pointerleave', leave);
  return () => {
    settle?.kill();
    list.removeEventListener('pointermove', move);
    list.removeEventListener('pointerover', over);
    list.removeEventListener('pointerleave', leave);
  };
}
