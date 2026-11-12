# Norbrook Farm Brewery: website

The homepage and beer pages for Norbrook Farm Brewery in Colebrook, CT.
Built with [Astro](https://astro.build), GSAP and Lenis. Static output, no server needed.

## Run it locally

Needs Node 22.23 or newer.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into ./dist
npm run preview  # serve the production build
```

## Publish on GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. Create an empty repository on GitHub and push this folder to its `main` branch.
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push again, or run the workflow by hand under **Actions**. The site appears at
   `https://<user>.github.io/<repo>/`.

Links work under that `/<repo>/` sub-path because every internal link goes through
`src/lib/url.ts`, and the workflow passes the sub-path to Astro as `BASE_PATH`.
Canonical links always name `https://www.norbrookfarm.com`, so a preview copy is never
treated as the real site by search engines.

For a custom domain, add it under Settings → Pages; the workflow then builds for the root.

## Where things are

| What | Where |
| --- | --- |
| All copy, beers, hours, links | `src/data/site.ts` |
| Pages | `src/pages/` (home, `beers/[slug]`, 404) |
| Styles and design tokens | `src/styles/` |
| Motion: the pour, page transition, can preview, tabs | `src/motion/`, `src/engine/` |
| Photos and cans | `src/assets/` |

## Still placeholder

- Tasting sheets on beer pages (look, nose, taste, serve, food pairing): written from the
  style and the brewer's description; to be checked by the brewery.
- Descriptions for Doldrums of Winter, Tap Back, Fordson Cork, On The Hill and Goulet's Grade A
  (none on the brewery's menu yet); they show a note on the style instead.
- Social, store-locator and order links, and the mailto forms, in `src/data/site.ts`.
