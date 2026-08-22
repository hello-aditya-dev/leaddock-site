# LeadDock Marketing Site

Static marketing site for **LeadDock — WhatsApp Web CRM**. Zero frameworks,
zero trackers, system fonts. Deployed on Vercel.

## Deploy (Vercel)

1. Push this repo to GitHub (`witejackel-eng/leaddock-site`).
2. Vercel → Add New Project → import this repo.
3. Framework preset: **Other**. Build command: **(empty)**. Output dir: **./**
4. Name the project exactly **`leaddock`** so the domain is
   `https://leaddock.vercel.app` (all canonical URLs assume this).

## Regenerate pages

```bash
node build.js        # rebuilds all .html, robots.txt, sitemap.xml, favicon.svg
node check-links.js  # verifies every internal link resolves
```

Edit page content in `build.js` (page bodies live there), then re-run.
`index.html`, `styles.css`, `site.js` are hand-maintained files.

## Pages

- `/` home · `/features` · `/pricing` · `/demo` · `/faq` · `/docs`
- Intent pages: `/whatsapp-crm` `/whatsapp-web-crm` `/whatsapp-lead-tracker`
  `/whatsapp-quick-replies` `/whatsapp-follow-up`
- Audiences: `/for-agencies` `/developer-kit`
- Legal: `/privacy` `/license`

Every page has unique title/description/canonical/OG tags. `sitemap.xml`
lists only canonical URLs.

## Domain swap

If you point a custom domain instead of `leaddock.vercel.app`, replace the
old domain across `build.js`, `index.html`, `vercel.json` (none), then run
`node build.js`.
