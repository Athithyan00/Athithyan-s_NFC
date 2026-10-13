# Arcnio NFC Card — Athithyan P

Digital business card (React + Vite) for programming onto an NFC tag.

## Run
```bash
npm install
npm run dev        # local preview
npm run build      # production build -> dist/
```

## Edit content
Everything (phone, email, links, services) is in `src/data.js`.
Add a profile photo as `public/profile.jpg` (square, 600x600+). Without it, an "AP" monogram shows.
If you change contact details, also update `public/athithyan.vcf` (used by iPhone) — `src/vcard.js` builds the same file for Android/desktop.

## Deploy
Upload `dist/` to Netlify / Vercel / Cloudflare Pages / your VPS (Nginx). Then write the final
URL (e.g. https://card.arcnio.com) to the NFC tag using an app like "NFC Tools" (Write → Add a record → URL).
Serve `.vcf` as `text/vcard` (Nginx: `types { text/vcard vcf; }`).

## Save contact
One tap opens the phone's own "Add contact" screen.
- iPhone: opens the .vcf directly -> "Add to Contacts".
- Android: downloads the .vcf -> tap it to open Contacts.
Browsers are not allowed to write into the address book silently; this is the closest possible.
