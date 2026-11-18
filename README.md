# tonight.design

Studio site. React + Vite, served by a Cloudflare Worker with static assets (`wrangler.jsonc`), DNS and domain on Cloudflare, code on GitHub. Every push to `main` builds and deploys through Workers Builds.

## Pages
- `/` studio site, English and Spanish (toggle, or `?lang=es`)
- `/brief` general project brief
- `/brief/<client>` a client's own question set, e.g. `/brief/kin-kakaw`

Question sets live in `src/briefs.js`. Copy a set, give it a new key, push, and the link works.

## Brief answers
`worker/index.js` handles `POST /api/brief`. It receives the brief and emails it through Resend, with Reply going to the client.

Variables (Workers & Pages > tonight-design-site > Settings > Variables and secrets):
- `RESEND_API_KEY` (secret, required)
- `BRIEF_TO` default `julian@tonight.design`
- `BRIEF_FROM` default `tonight.design <briefs@tonight.design>` (domain must be verified in Resend)

The same Worker redirects www.tonight.design to tonight.design and serves everything else from `dist/` as a single-page app.

## Develop
```
npm install
npm run dev      # local preview of the site
npm run build && npx wrangler dev   # site plus the brief endpoint
npm run build    # output in dist/
```

## Cloudflare build settings
Build command `npm run build` · deploy command `npx wrangler deploy` · build variable `NODE_VERSION` = `22`.

## DNS (Cloudflare)
- `tonight.design` and `www.tonight.design` are attached as Worker custom domains (Cloudflare creates the records)
- Keep the Google Workspace mail records: MX `smtp.google.com`, SPF TXT, `_dmarc` TXT
