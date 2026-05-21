# Country Map Assets

Drop political and physical country maps in this folder.

Use lowercase ISO-2 country codes from `src/data/countries.ts`:

```text
public/maps/in-political.webp
public/maps/in-physical.webp
public/maps/us-political.webp
public/maps/us-physical.webp
```

Supported extensions, in lookup order:

```text
.webp
.jpg
.jpeg
.png
.svg
```

The app checks these automatically when you open **Maps & Sights > Reference Maps**. If no file exists, the page shows the exact filenames it is looking for.

Recommended image size: 1600px wide or larger, compressed to WebP when possible.

## Bulk builder

Run this from the repo root:

```bash
npm run maps:build
```

The builder creates fallback SVG maps for all countries, tries Natural Earth for real outlines, and optionally upgrades maps from Wikimedia Commons when a good free-license candidate is found. It also writes attribution and coverage files into this folder.
