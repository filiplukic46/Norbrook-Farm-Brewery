/** A site path with the deploy base in front, so links work at the domain root and under a
 *  sub-path (GitHub Pages serves a project at /<repo>/). Pass paths that start with '/'. */
export const url = (path: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + path;
