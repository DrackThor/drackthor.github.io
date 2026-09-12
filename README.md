# drackthor.me

Personal website of **Daniel Drack** - Senior DevOps Engineer & Cloud-Native Consultant, CNCF Ambassador, Kubestronaut.

Built with [Astro](https://astro.build) using the [Astrofy](https://github.com/manuelernestog/astrofy) template (MIT), Tailwind CSS and DaisyUI.
Deployed to GitHub Pages at [drackthor.me](https://drackthor.me).

## Develop

The toolchain is managed by [devenv](https://devenv.sh) (Nix), which provides Node 22 and pnpm.
Enter the shell first — `direnv allow` (automatic via `.envrc`) or `devenv shell` — then use `make`.
All tasks run through `pnpm` under the hood.

```bash
make install   # install dependencies (pnpm)
make dev       # local dev server at http://localhost:4321
make build     # production build to ./dist
make preview   # preview the production build
make check     # type-check + validate content/routes (astro check)
make test      # alias for check
make lint      # check formatting (prettier)
make format    # auto-format all files (prettier)
make clean     # remove build output and caches
make help      # list all targets (default)
```

## Structure

| Path                                 | Purpose                                       |
| ------------------------------------ | --------------------------------------------- |
| `src/pages/index.astro`              | Home / hero + upcoming & featured talks       |
| `src/pages/cv.astro`                 | About / CV                                    |
| `src/pages/talks.astro`              | Speaker track record                          |
| `src/data/talks.ts`                  | Talks data (shared by home & talks page)      |
| `src/content/blog/`                  | Blog posts (Markdown/MDX)                     |
| `src/content.config.ts`              | Content collections config                    |
| `src/components/Analytics.astro`     | GoatCounter analytics loader                  |
| `src/config.ts`                      | Site title & description                      |
| `src/components/SideBarMenu.astro`   | Navigation                                    |
| `src/components/SideBarFooter.astro` | Social links                                  |
| `public/assets/`                     | Talk slides (PDF) - served at `/assets/*.pdf` |
| `public/CNAME`                       | Custom domain                                 |

## Analytics

Traffic is tracked with [GoatCounter](https://www.goatcounter.com) (privacy-friendly, cookieless, no consent banner needed).
Dashboard: [drackthor.goatcounter.com](https://drackthor.goatcounter.com).
The loader lives in `src/components/Analytics.astro`; localhost is ignored by default, so dev and preview do not pollute stats.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with [`withastro/action`](https://github.com/withastro/action) and deploys to GitHub Pages.
Repo setting required once: **Settings → Pages → Source → GitHub Actions**.

## Credits

Template: [Astrofy](https://github.com/manuelernestog/astrofy) by Manuel Ernesto Garcia (MIT).
