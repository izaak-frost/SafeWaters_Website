# SafeWaters website

React + TypeScript + Vite public website for safewaters.uk.

- `npm install` installs dependencies.
- `npm run dev` starts local development.
- `npm run build` checks TypeScript and produces `dist`.
- `npm run preview` serves the production build locally.

Routes: `/`, `/email-confirmed`, and a fallback page for unknown URLs.
Deploy `dist` with SPA fallback enabled. `public/_redirects` supplies that rule for Cloudflare Pages / Netlify. Other hosts must route unknown paths to `index.html` so direct email-confirmation links work.

The shared logo and favicon use `public/logo.png`, served at `/logo.png`.
`src/vite-env.d.ts` supplies Vite's asset and CSS import types for `main.tsx`.
The email-confirmed page is a post-confirmation destination, not an authentication handler: the authentication provider must verify the email before redirecting here. Error redirects show a retry message. The Open SafeWaters action uses the installed mobile app's `safewaters://` scheme.
