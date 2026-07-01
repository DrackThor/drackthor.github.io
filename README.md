# drackthor.me

Personal website of **Daniel Drack** - Senior DevOps Engineer & Cloud-Native Consultant, CNCF Ambassador, Kubestronaut.

Built with [Astro](https://astro.build) using the [Astrofy](https://github.com/manuelernestog/astrofy) template (MIT), Tailwind CSS and DaisyUI. Deployed to GitHub Pages at [drackthor.me](https://drackthor.me).

## Develop

```bash
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build to ./dist
npm run preview  # preview the production build
```

## Structure

| Path                                 | Purpose                                       |
| ------------------------------------ | --------------------------------------------- |
| `src/pages/index.astro`              | Home / hero + featured talks                  |
| `src/pages/cv.astro`                 | About / CV                                    |
| `src/pages/talks.astro`              | Speaker track record                          |
| `src/content/blog/`                  | Blog posts (Markdown/MDX)                     |
| `src/config.ts`                      | Site title & description                      |
| `src/components/SideBarMenu.astro`   | Navigation                                    |
| `src/components/SideBarFooter.astro` | Social links                                  |
| `public/assets/`                     | Talk slides (PDF) - served at `/assets/*.pdf` |
| `public/CNAME`                       | Custom domain                                 |

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with
[`withastro/action`](https://github.com/withastro/action) and deploys to GitHub Pages. Repo setting required once: **Settings → Pages → Source → GitHub Actions**.

## Content source

Profile copy is maintained in [`PROFILE.md`](./PROFILE.md) - the canonical source for both this site and the LinkedIn profile.

## Credits

Template: [Astrofy](https://github.com/manuelernestog/astrofy) by Manuel Ernesto Garcia (MIT).
