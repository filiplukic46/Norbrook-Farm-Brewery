export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isTouch = () => matchMedia('(hover: none), (pointer: coarse)').matches;
export const isMobile = () => matchMedia('(max-width: 767px)').matches;

// Shared easing vocabulary. "Pour and settle": a quick rise that settles slowly.
export const ease = {
  out: 'expo.out', // default entrance (settle)
  inOut: 'expo.inOut', // pours, page transitions
  soft: 'power3.out', // small UI
  spring: 'back.out(1.6)', // glass numbers, use rarely
} as const;
