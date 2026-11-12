// The pour: ONE driver for the flight. Scroll progress sets, for every glass,
//   - its liquid level (the foam overlay's wavy bottom edge rises until a settled head is left),
//   - its glass in the fixed gauge (fill = progress),
//   - the gauge count (the glass you are in now),
//   - whether its idle carbonation runs (.is-live while on screen).
// Desktop: the flight pins and you travel down the paddle sideways, glass by glass.
// Phone / short screens: glasses stack and pour as they rise into view.
// Static rest (no JS / reduced motion): CSS parks the overlay as a foam head at the top.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onScroll, scrollToTarget } from '../engine/scroll';

gsap.registerPlugin(ScrollTrigger);

const H_QUERY = '(min-width: 1024px) and (min-height: 600px)';

type Glass = { el: HTMLElement; setY: (v: number) => void; setFill: ((v: number) => void) | null; H: number };

export function startPour(root: ParentNode = document) {
  const flight = root.querySelector<HTMLElement>('[data-flight]');
  const track = flight?.querySelector<HTMLElement>('[data-track]');
  if (!flight || !track) return () => {};
  const sections = [...flight.querySelectorAll<HTMLElement>('[data-glass-section]')];
  const gauge = flight.querySelector<HTMLElement>('[data-gauge]');
  const fills = [...(gauge?.querySelectorAll<SVGRectElement>('.gauge__fill') ?? [])];
  const glassLinks = [...(gauge?.querySelectorAll<HTMLElement>('[data-gauge-glass]') ?? [])];
  const count = gauge?.querySelector<HTMLElement>('[data-gauge-count]');
  let head = 78;
  let active = -1;

  const glasses: Glass[] = sections.map((el, i) => {
    const foam = el.querySelector<HTMLElement>('[data-foam]')!;
    return {
      el,
      setY: gsap.quickSetter(foam, 'y', 'px') as (v: number) => void,
      setFill: fills[i] ? (gsap.quickSetter(fills[i], 'scaleY') as (v: number) => void) : null,
      H: el.offsetHeight,
    };
  });
  const measure = () => {
    head = parseFloat(getComputedStyle(flight).getPropertyValue('--head')) * parseFloat(getComputedStyle(document.documentElement).fontSize) || 78;
    glasses.forEach((g) => { g.H = g.el.offsetHeight; });
  };
  const setActive = (i: number) => {
    if (i === active) return;
    active = i;
    if (count) count.textContent = `${i + 1}/${sections.length}`;
    glassLinks.forEach((a, k) => (k === i ? a.setAttribute('aria-current', 'step') : a.removeAttribute('aria-current')));
  };
  if (fills.length) gsap.set(fills, { scaleY: 0, transformOrigin: '50% 100%' });
  gauge?.classList.add('is-ready');
  setActive(0);

  const mm = gsap.matchMedia();
  mm.add(H_QUERY, () => horizontal());
  mm.add(`not all and ${H_QUERY}`, () => vertical());

  /* ───── Desktop: down the paddle, sideways ───── */
  function horizontal() {
    flight!.classList.add('is-h');
    const n = glasses.length;
    const W = () => document.documentElement.clientWidth;
    const setW = () => flight!.style.setProperty('--panel-w', `${W()}px`);
    setW();
    const dist = () => W() * (n - 1);
    // Pour a panel as it slides in: empty (all foam) at the right edge, full a little before it centres.
    const pour = (g: Glass, p: number) => {
      const e = gsap.utils.clamp(0, 1, p);
      g.setY((head - g.H) * e);
      g.setFill?.(e);
    };

    // Glass 1 pours while the flight rises to the top of the screen, before the pin.
    const pre = ScrollTrigger.create({
      trigger: flight,
      start: 'top bottom',
      end: 'top top',
      refreshPriority: 2,
      onRefresh: (self) => { measure(); pour(glasses[0], self.progress / 0.85); },
      onUpdate: (self) => pour(glasses[0], self.progress / 0.85),
    });

    const tween = gsap.to(track!, { x: () => -dist(), ease: 'none' });
    const main = ScrollTrigger.create({
      trigger: flight,
      start: 'top top',
      end: () => `+=${dist()}`,
      pin: true,
      scrub: true,
      animation: tween,
      invalidateOnRefresh: true,
      refreshPriority: 1,
      onRefreshInit: setW,
      onUpdate: (self) => render(self.progress),
      onRefresh: (self) => render(self.progress),
    });
    // The gauge shows from the moment glass 1 is mostly poured until the paddle hands over.
    const show = ScrollTrigger.create({
      trigger: flight,
      start: 'top 35%',
      end: () => main.end + innerHeight * 0.4,
      onToggle: (self) => gauge?.classList.toggle('is-on', self.isActive),
    });
    ScrollTrigger.sort();

    function render(progress: number) {
      const u = progress * (n - 1); // position along the paddle, in glasses
      for (let i = 1; i < n; i++) pour(glasses[i], (1 - (i - u)) / 0.8);
      glasses.forEach((g, i) => g.el.classList.toggle('is-live', Math.abs(i - u) < 1));
      setActive(Math.min(n - 1, Math.round(u)));
    }

    // Links and focus inside the paddle travel to the right glass.
    const yFor = (i: number) => main.start + (main.end - main.start) * (i / (n - 1));
    const indexOf = (hash: string) => sections.findIndex((s) => `#${s.id}` === hash);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
      if (!a || a.origin !== location.origin || a.pathname !== location.pathname) return;
      const i = indexOf(a.hash);
      if (i < 0) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      history.replaceState(history.state, '', a.hash);
      scrollToTarget(yFor(i));
    };
    const onFocus = (e: FocusEvent) => {
      const s = (e.target as HTMLElement).closest<HTMLElement>('[data-glass-section]');
      if (!s) return;
      const i = sections.indexOf(s);
      if (i !== active) scrollToTarget(yFor(i));
    };
    addEventListener('click', onClick, true);
    track!.addEventListener('focusin', onFocus);
    // Arriving with a hash (e.g. /#catering from another page): the engine asks, we place it.
    const onHash = (e: Event) => {
      const i = indexOf((e as CustomEvent<string>).detail);
      if (i < 0) return;
      e.preventDefault();
      ScrollTrigger.refresh(); // layout settles (fonts, images) before the pin position is read
      scrollToTarget(yFor(i), true);
    };
    document.addEventListener('engine:hash', onHash);

    // When the paddle comes to rest between two glasses, it settles onto the nearer one.
    let settle: gsap.core.Tween | null = null;
    const snap = () => {
      const y = window.scrollY;
      if (y <= main.start + 1 || y >= main.end - 1) return;
      const u = main.progress * (n - 1);
      const i = Math.round(u);
      if (Math.abs(u - i) > 0.01) scrollToTarget(yFor(i), false, 0.7);
    };
    const offScroll = onScroll(() => {
      settle?.kill();
      settle = gsap.delayedCall(0.2, snap);
    });
    // Back/forward can restore a position between glasses without any further scrolling.
    const first = gsap.delayedCall(0.8, snap);

    return () => {
      document.removeEventListener('engine:hash', onHash);
      offScroll();
      settle?.kill();
      first.kill();
      removeEventListener('click', onClick, true);
      track!.removeEventListener('focusin', onFocus);
      pre.kill();
      show.kill();
      flight!.classList.remove('is-h');
      flight!.style.removeProperty('--panel-w');
      sections.forEach((s) => s.classList.remove('is-live'));
      gauge?.classList.remove('is-on');
    };
  }

  /* ───── Phone / short screens: glasses stack and pour as they arrive ───── */
  function vertical() {
    const START = 1;
    const END = 0.5; // full by the time the glass top reaches mid-screen, so no tall empty band shows
    const triggers: ScrollTrigger[] = [];
    glasses.forEach((g, i) => {
      let vh = innerHeight;
      const render = (p: number) => {
        const top = vh * (START - (START - END) * p); // section top in the viewport is linear in p
        const level = vh + (top + head - vh) * p; // liquid surface, viewport px
        g.setY(gsap.utils.clamp(head - g.H, 0, level - top - g.H));
        g.setFill?.(p);
      };
      triggers.push(ScrollTrigger.create({
        trigger: g.el,
        start: 'top bottom',
        end: `top ${END * 100}%`,
        onRefresh: (self) => { measure(); vh = innerHeight; render(self.progress); },
        onUpdate: (self) => render(self.progress),
      }));
      triggers.push(ScrollTrigger.create({ trigger: g.el, start: 'top bottom', end: 'bottom top', toggleClass: { targets: g.el, className: 'is-live' } }));
      triggers.push(ScrollTrigger.create({
        trigger: g.el,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => { if (self.isActive) setActive(i); },
      }));
    });
    if (gauge) {
      triggers.push(ScrollTrigger.create({ trigger: flight, start: 'top 45%', end: 'bottom 55%', toggleClass: { targets: gauge, className: 'is-on' } }));
    }
    return () => {
      triggers.forEach((t) => t.kill());
      sections.forEach((s) => s.classList.remove('is-live'));
    };
  }

  return () => {
    mm.revert();
    gauge?.classList.remove('is-ready');
  };
}
