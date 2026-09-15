# SafeWaters website

React + TypeScript + Vite public website for safewaters.uk.

- `npm install` installs dependencies.
- `npm run dev` starts local development.
- `npm run build` checks TypeScript and produces `dist`.
- `npm run preview` serves the production build locally.

Routes: `/`, `/email-confirmed`, and a fallback page for unknown URLs.
Cloudflare Pages: use `npm run build` as the build command and `dist` as the output directory. Pages supplies SPA fallback automatically when there is no top-level `404.html`.

Cloudflare Workers Static Assets: use `npm run build`, then `npx wrangler deploy --config wrangler.jsonc`. The checked-in configuration enables `assets.not_found_handling: "single-page-application"` so direct links such as `/email-confirmed` load the React app.

Do not add the catch-all `/* /index.html 200` to `_redirects`: Workers rejects it as an infinite loop. Rebuild before deploying so old copies of `_redirects` are removed from `dist`. If Cloudflare reports a redirected configuration at `dist/wrangler.json`, update the source configuration or deployment integration that generates it with the same SPA setting; do not edit generated output. Other hosts must provide an equivalent fallback to `index.html`.

The shared logo and favicon use `public/logo.png`, served at `/logo.png`.
`src/vite-env.d.ts` supplies Vite's asset and CSS import types for `main.tsx`.
The email-confirmed page is a post-confirmation destination, not an authentication handler: the authentication provider must verify the email before redirecting here. Error redirects show a retry message. The Open SafeWaters action uses the installed mobile app's `safewaters://` scheme.
