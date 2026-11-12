// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Where this build is served (sitemap, OG image). The GitHub Pages workflow sets SITE_URL;
  // canonical links always name the brewery's own domain (see Base.astro).
  site: process.env.SITE_URL || 'https://www.norbrookfarm.com',
  // Sub-path the site is served under. The GitHub Pages workflow sets BASE_PATH to /<repo>;
  // locally and on the real domain it is the root.
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});
