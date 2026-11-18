# tonight.design

Studio site. React + Vite, hosted on Cloudflare Pages, DNS and domain on Cloudflare, code on GitHub. Every push to `main` deploys.

## Pages
- `/` studio site, English and Spanish (toggle, or `?lang=es`)
- `/brief` general project brief
- `/brief/<client>` a client's own question set, e.g. `/brief/kin-kakaw`

Question sets live in `src/briefs.js`. Copy a set, give it a new key, push, and the link works.

## Brief answers
`functions/api/brief.js` is a Cloudflare Pages Function. It receives the brief and emails it through Resend, with Reply going to the client.

Variables (Cloudflare Pages > Settings > Variables and secrets):
- `RESEND_API_KEY` (secret, required)
- `BRIEF_TO` default `julian@tonight.design`
- `BRIEF_FROM` default `tonight.design <briefs@tonight.design>` (domain must be verified in Resend)

`functions/_middleware.js` redirects www.tonight.design to tonight.design.

## Develop
```
npm install
npm run dev      # local preview (the brief function needs `npx wrangler pages dev dist` to run locally)
npm run build    # output in dist/
```

## Cloudflare Pages build settings
Framework preset Vite (or none) · build command `npm run build` · output `dist` · env var `NODE_VERSION` = `22`.

## DNS (Cloudflare)
- `tonight.design` and `www` are attached as Pages custom domains (Cloudflare creates the records)
- Keep the Google Workspace mail records: MX `smtp.google.com`, SPF TXT, `_dmarc` TXT
