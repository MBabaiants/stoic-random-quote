# Stoic Quote

A quiet, single-page app for reading one Stoic quote at a time. It fetches a quote on arrival, gives the text a slow reveal, and lets visitors request another quote.

## Features

- Responsive parchment-inspired design with a locally bundled background image.
- Animated brand mark shared by the header and loading state.
- Quote and author validation before display.
- Loading, retry, and subsequent-request error states that preserve the current quote.
- Keyboard focus styles, screen-reader status messages, and reduced-motion support.
- Product-specific browser title, description, theme color, and favicon.

## Requirements

- Node.js compatible with the installed Vite version.
- npm.

## Run locally

```sh
npm ci
npm run dev
```

The Vite development server proxies `/api` requests to `https://stoic-quotes.com`.

## Scripts

```sh
npm run dev      # Start the local development server
npm run build    # Type-check and create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Quote service and deployment

The app requests `/api/quote` and expects a JSON object with non-empty string fields named `text` and `author`. Invalid responses are treated as service errors.

`vercel.json` forwards routes to `stoic-quotes.com` for deployment. The development proxy is configured separately in `vite.config.ts`. Build the app with `npm run build`; Vite writes the deployable static assets to `dist/`.

## Project structure

- `src/App.tsx` — page shell, brand header, creator links, and query provider.
- `src/components/Quote/` — quote retrieval, loading/error states, and quote action.
- `src/components/BrandMark.tsx` — reusable animated SVG brand mark.
- `src/index.css` — Tailwind import, animation tokens, and global base styles.
- `src/assets/` — background image and licensed decorative font asset.
- `public/favicon.svg` — browser favicon.

