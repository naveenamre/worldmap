# World Maps

Interactive React/Vite geography study app for flags, capitals, currencies, maps, and country facts.

## Run Locally

Prerequisite: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build Static Files

```bash
npm run build
```

The static site is created in `dist/`. The Vite base path is set to `./`, so the build works from GitHub Pages project URLs, custom subfolders, and simple static hosting.

## GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/pages.yml`.

1. Push the project to GitHub.
2. In the repository, open **Settings > Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main` or run the workflow manually.

The workflow installs dependencies, runs `npm run build`, uploads `dist/`, and deploys it to Pages.

## Optional Backend Mode

GitHub Pages cannot run an Express server or hide API keys. The app now includes browser-side fallback content, so the core experience still works as a static site.

For local backend testing with Gemini:

```bash
cp .env.example .env.local
npm run dev:server
```

Set `GEMINI_API_KEY` in `.env.local` if you want live Gemini responses.
