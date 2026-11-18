# tonight.design

Studio site. React + Vite, hosted on Netlify, DNS on Cloudflare, code on GitHub.

## Pages
- `/` studio site, English and Spanish (toggle, or `?lang=es`)
- `/brief` general project brief
- `/brief/<client>` a client's own question set, e.g. `/brief/kin-kakaw`

Question sets live in `src/briefs.js`. Copy a set, give it a new key, push, and the link works.

## Brief answers
The brief posts to Netlify Forms (form name `brief`). Each submission holds the contact fields plus `answers`, the whole brief as readable text. Set up email notifications in Netlify: Site configuration > Forms > Form notifications. Free tier: 100 submissions a month.

## Develop
```
npm install
npm run dev      # local preview
npm run build    # output in dist/
```
Every push to `main` deploys automatically on Netlify.

## DNS (Cloudflare)
- Apex `tonight.design`: CNAME to `<site>.netlify.app`, proxy off (grey cloud)
- `www`: CNAME to `<site>.netlify.app`, proxy off
- Keep the existing MX, SPF and other mail records so julian@tonight.design keeps working
