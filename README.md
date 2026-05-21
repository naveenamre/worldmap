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

## Political And Physical Country Maps

The Google Maps embed has been removed. The app now has a static **Reference Maps** viewer inside **Maps & Sights** with two study modes:

- **Political**: borders, capitals, states/provinces, major cities, neighboring countries.
- **Physical**: mountains, rivers, plains, deserts, coastlines, plateaus, lakes.

### Add Local Map Images

Put map files in `public/maps/` using lowercase ISO-2 country codes from `src/data/countries.ts`.

Examples:

```text
public/maps/in-political.webp
public/maps/in-physical.webp
public/maps/us-political.webp
public/maps/us-physical.webp
```

Supported extensions, checked in this order:

```text
.webp
.jpg
.jpeg
.png
.svg
```

For GitHub Pages, local files are the best option because they load fast, do not need an API key, and keep the app fully static.

### Use External Map Image Links

If you do not want to store images in the repo, add direct image URLs in `src/data/mapAssetLinks.ts`:

```ts
export const mapAssetLinks: MapAssetLinks = {
  in: {
    political: 'https://example.com/india-political-map.jpg',
    physical: 'https://example.com/india-physical-map.jpg',
  },
};
```

Use direct image URLs ending in `.webp`, `.jpg`, `.jpeg`, `.png`, or `.svg`. Normal webpage URLs will not work as image sources.

### Good Map Sources

- Natural Earth: https://www.naturalearthdata.com/
  Public-domain vector and raster data. Best if you want to generate consistent maps yourself in QGIS.
- Natural Earth terms: https://www.naturalearthdata.com/about/terms-of-use/
  Natural Earth says its raster and vector map data is public domain.
- Wikimedia Commons blank maps by country: https://commons.wikimedia.org/wiki/Category:Blank_maps_by_country
  Good for SVG base maps, but check the license on every file page before using it.

### Best Workflow For This App

1. Download or create a map.
2. Crop it to the country, keeping labels readable.
3. Export as WebP around 1600px wide.
4. Save it as `public/maps/{iso2}-political.webp` or `public/maps/{iso2}-physical.webp`.
5. Run `npm run dev` and open **Maps & Sights > Reference Maps**.

### Bulk Build Maps

To avoid manually adding 392 files, run the map builder:

```bash
npm run maps:build -- --dry-run
npm run maps:build
```

What it does:

- Discovers all countries from `src/data/countries.ts`.
- Generates fallback SVG maps for every country and both map kinds.
- Tries to fetch Natural Earth GeoJSON for better generated outlines.
- Tries to find acceptable Wikimedia Commons maps and saves them over the generated SVGs as `.jpg`, `.png`, or `.svg` when the license and size are acceptable.
- Writes `public/maps/map-report.json`, `public/maps/ATTRIBUTIONS.md`, and `src/data/mapAttributions.generated.ts`.

Useful options:

```bash
npm run maps:build -- --force
npm run maps:build -- --skip-commons
```

`--force` overwrites existing generated/downloaded map files. `--skip-commons` only creates generated maps and does not search Wikimedia Commons.

## Optional Backend Mode

GitHub Pages cannot run an Express server or hide API keys. The app now includes browser-side fallback content, so the core experience still works as a static site.

For local backend testing with Gemini:

```bash
cp .env.example .env.local
npm run dev:server
```

Set `GEMINI_API_KEY` in `.env.local` if you want live Gemini responses.
