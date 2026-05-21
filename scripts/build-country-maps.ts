import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { countries, type Country } from '../src/data/countries';
import type { ReferenceMapKind } from '../src/data/mapAssetLinks';

type Position = [number, number];
type BBox = [number, number, number, number];
type Geometry = {
  type: string;
  coordinates?: any;
};
type Feature = {
  type: 'Feature';
  properties?: Record<string, any>;
  geometry: Geometry | null;
};
type FeatureCollection = {
  type: 'FeatureCollection';
  features: Feature[];
};
type SourceType = 'generated' | 'commons' | 'local-fallback';

interface Args {
  dryRun: boolean;
  force: boolean;
  skipCommons: boolean;
}

interface NaturalEarthData {
  admin0?: FeatureCollection;
  admin1?: FeatureCollection;
  places?: FeatureCollection;
  rivers?: FeatureCollection;
  lakes?: FeatureCollection;
}

interface MapAttribution {
  sourceType: SourceType;
  title: string;
  credit: string;
  license: string;
  sourceUrl?: string;
  author?: string;
  fileName?: string;
}

interface MapResult {
  generated: boolean;
  downloaded: boolean;
  fileName: string;
  sourceType: SourceType;
  warning?: string;
}

interface CountryReport {
  code: string;
  name: string;
  political: MapResult;
  physical: MapResult;
}

interface CommonsCandidate {
  title: string;
  sourceUrl: string;
  imageUrl: string;
  mime: string;
  width: number;
  height: number;
  license: string;
  author?: string;
  score: number;
}

const ROOT = process.cwd();
const PUBLIC_MAP_DIR = path.join(ROOT, 'public', 'maps');
const CACHE_DIR = path.join(ROOT, '.cache', 'country-map-builder');
const ATTRIBUTION_TS_PATH = path.join(ROOT, 'src', 'data', 'mapAttributions.generated.ts');
const ATTRIBUTIONS_MD_PATH = path.join(PUBLIC_MAP_DIR, 'ATTRIBUTIONS.md');
const REPORT_PATH = path.join(PUBLIC_MAP_DIR, 'map-report.json');
const SVG_WIDTH = 1600;
const SVG_HEIGHT = 1100;
const SVG_PADDING = 90;
const FETCH_TIMEOUT_MS = 9000;
const COMMONS_SEARCH_LIMIT = 12;

const NATURAL_EARTH_SOURCES = {
  admin0: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson',
  admin1: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_1_states_provinces.geojson',
  places: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_populated_places.geojson',
  rivers: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_rivers_lake_centerlines.geojson',
  lakes: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_lakes.geojson',
} as const;

const COUNTRY_NAME_ALIASES: Record<string, string[]> = {
  gb: ['United Kingdom', 'Great Britain'],
  cd: ['Democratic Republic of the Congo', 'Dem. Rep. Congo'],
  cg: ['Republic of the Congo', 'Congo'],
  ci: ["Cote d'Ivoire", 'Ivory Coast'],
  va: ['Vatican City', 'Holy See'],
  ps: ['Palestine', 'State of Palestine'],
  tw: ['Taiwan'],
  sz: ['Eswatini', 'Swaziland'],
  mk: ['North Macedonia', 'Macedonia'],
  kr: ['South Korea', 'Republic of Korea'],
  kp: ['North Korea'],
  la: ['Laos', 'Lao PDR'],
  mm: ['Myanmar', 'Burma'],
  tl: ['Timor-Leste', 'East Timor'],
  tr: ['Turkey', 'Turkiye'],
  cz: ['Czechia', 'Czech Republic'],
  us: ['United States', 'United States of America'],
  ru: ['Russia', 'Russian Federation'],
  vn: ['Vietnam', 'Viet Nam'],
  sy: ['Syria', 'Syrian Arab Republic'],
  tz: ['Tanzania', 'United Republic of Tanzania'],
  bo: ['Bolivia', 'Bolivia (Plurinational State of)'],
  ve: ['Venezuela', 'Venezuela (Bolivarian Republic of)'],
};

const BAD_COMMONS_TITLE_WORDS = [
  'flag',
  'emblem',
  'coat of arms',
  'locator',
  'location',
  'election',
  'vote',
  'population',
  'climate',
  'historical',
  'ancient',
  'blank locator',
  'orthographic',
  'globe',
];

async function main() {
  const startedAt = Date.now();
  const args = parseArgs(process.argv.slice(2));
  const countryCount = countries.length;

  if (args.dryRun) {
    console.log(`Dry run: discovered ${countryCount} country entries.`);
    console.log(`Would create ${countryCount * 2} generated SVG fallback maps in public/maps.`);
    console.log('Would attempt Wikimedia Commons upgrades unless --skip-commons is passed.');
    return;
  }

  await mkdir(PUBLIC_MAP_DIR, { recursive: true });
  await mkdir(CACHE_DIR, { recursive: true });

  const naturalEarth = await loadNaturalEarthData();
  const report: CountryReport[] = [];
  const attributions: Record<string, Partial<Record<ReferenceMapKind, MapAttribution>>> = {};
  let commonsUnavailable = args.skipCommons;
  let generatedCount = 0;
  let downloadedCount = 0;

  for (let index = 0; index < countries.length; index += 1) {
    const country = countries[index];
    const countryAttributions: Partial<Record<ReferenceMapKind, MapAttribution>> = {};
    const countryReport: CountryReport = {
      code: country.code,
      name: country.name,
      political: createEmptyMapResult(),
      physical: createEmptyMapResult(),
    };

    for (const kind of ['political', 'physical'] as ReferenceMapKind[]) {
      const generated = await writeGeneratedMap(country, kind, naturalEarth, args.force);
      generatedCount += generated.written ? 1 : 0;

      countryAttributions[kind] = generated.attribution;
      countryReport[kind] = {
        generated: true,
        downloaded: false,
        fileName: generated.fileName,
        sourceType: generated.attribution.sourceType,
        warning: generated.warning,
      };

      if (!commonsUnavailable) {
        try {
          const downloaded = await tryDownloadCommonsMap(country, kind, args.force);
          if (downloaded) {
            downloadedCount += downloaded.written ? 1 : 0;
            countryAttributions[kind] = downloaded.attribution;
            countryReport[kind] = {
              generated: true,
              downloaded: true,
              fileName: downloaded.fileName,
              sourceType: 'commons',
            };
          }
        } catch (error) {
          commonsUnavailable = true;
          countryReport[kind].warning = `Commons disabled after request failure: ${formatError(error)}`;
          console.warn(countryReport[kind].warning);
        }
      }
    }

    attributions[country.code] = countryAttributions;
    report.push(countryReport);

    if ((index + 1) % 20 === 0 || index === countries.length - 1) {
      console.log(`Processed ${index + 1}/${countries.length} countries...`);
    }
  }

  await writeAttributionModule(attributions);
  await writeAttributionsMarkdown(attributions);
  await writeReport(report, {
    countryCount,
    generatedCount,
    downloadedCount,
    commonsSkipped: args.skipCommons,
    commonsUnavailable,
    durationMs: Date.now() - startedAt,
  });

  console.log(`Done. Countries: ${countryCount}; generated SVG writes: ${generatedCount}; Commons downloads: ${downloadedCount}.`);
  console.log(`Report: ${relative(REPORT_PATH)}`);
}

function parseArgs(argv: string[]): Args {
  return {
    dryRun: argv.includes('--dry-run'),
    force: argv.includes('--force'),
    skipCommons: argv.includes('--skip-commons'),
  };
}

async function loadNaturalEarthData(): Promise<NaturalEarthData> {
  const result: NaturalEarthData = {};

  for (const [key, url] of Object.entries(NATURAL_EARTH_SOURCES)) {
    try {
      result[key as keyof NaturalEarthData] = await fetchCachedJson<FeatureCollection>(`${key}.geojson`, url);
      console.log(`Loaded Natural Earth ${key}.`);
    } catch (error) {
      console.warn(`Natural Earth ${key} unavailable; generated maps will use simpler local fallback where needed. ${formatError(error)}`);
    }
  }

  return result;
}

async function fetchCachedJson<T>(cacheName: string, url: string): Promise<T> {
  const cachePath = path.join(CACHE_DIR, cacheName);

  if (existsSync(cachePath)) {
    return JSON.parse(await readFile(cachePath, 'utf8')) as T;
  }

  const response = await fetchWithTimeout(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }

  const text = await response.text();
  await writeFile(cachePath, text, 'utf8');
  return JSON.parse(text) as T;
}

async function writeGeneratedMap(
  country: Country,
  kind: ReferenceMapKind,
  naturalEarth: NaturalEarthData,
  force: boolean,
) {
  const fileName = `${country.code}-${kind}.svg`;
  const outputPath = path.join(PUBLIC_MAP_DIR, fileName);
  const feature = naturalEarth.admin0 ? findCountryFeature(country, naturalEarth.admin0.features) : undefined;
  const sourceType: SourceType = feature ? 'generated' : 'local-fallback';
  const warning = feature ? undefined : 'No Natural Earth feature match; used symbolic fallback outline.';

  if (!existsSync(outputPath) || force) {
    const svg = feature
      ? renderNaturalEarthMap(country, kind, feature, naturalEarth)
      : renderSymbolicMap(country, kind);
    await writeFile(outputPath, svg, 'utf8');
    return {
      fileName,
      written: true,
      warning,
      attribution: generatedAttribution(country, kind, fileName, sourceType),
    };
  }

  return {
    fileName,
    written: false,
    warning,
    attribution: generatedAttribution(country, kind, fileName, sourceType),
  };
}

function renderNaturalEarthMap(
  country: Country,
  kind: ReferenceMapKind,
  countryFeature: Feature,
  naturalEarth: NaturalEarthData,
): string {
  const rawBbox = bboxOfGeometry(countryFeature.geometry);
  const bbox = normalizeBBox(rawBbox || fallbackBBox(country.code));
  const expanded = expandBBox(bbox, 0.5);
  const project = createProjection(expanded);
  const countryPath = geometryToPath(countryFeature.geometry, project);
  const nearbyCountries = (naturalEarth.admin0?.features || [])
    .filter((feature) => feature !== countryFeature && bboxIntersects(bboxOfGeometry(feature.geometry), expanded))
    .slice(0, 40);
  const admin1 = (naturalEarth.admin1?.features || []).filter((feature) =>
    featureBelongsToCountry(feature, country) && bboxIntersects(bboxOfGeometry(feature.geometry), expanded),
  );
  const places = (naturalEarth.places?.features || [])
    .filter((feature) => bboxContainsPosition(expanded, featurePoint(feature)))
    .sort((a, b) => Number(b.properties?.POP_MAX || 0) - Number(a.properties?.POP_MAX || 0))
    .slice(0, 8);
  const rivers = (naturalEarth.rivers?.features || [])
    .filter((feature) => bboxIntersects(bboxOfGeometry(feature.geometry), expanded))
    .slice(0, 35);
  const lakes = (naturalEarth.lakes?.features || [])
    .filter((feature) => bboxIntersects(bboxOfGeometry(feature.geometry), expanded))
    .slice(0, 25);

  const neighborPaths = nearbyCountries
    .map((feature) => `<path class="neighbor" d="${geometryToPath(feature.geometry, project)}" />`)
    .join('\n');
  const adminPaths = admin1
    .map((feature) => `<path class="admin1" d="${geometryToPath(feature.geometry, project)}" />`)
    .join('\n');
  const riverPaths = rivers
    .map((feature) => `<path class="river" d="${geometryToPath(feature.geometry, project)}" />`)
    .join('\n');
  const lakePaths = lakes
    .map((feature) => `<path class="lake" d="${geometryToPath(feature.geometry, project)}" />`)
    .join('\n');
  const cityLabels = places
    .map((feature) => {
      const point = featurePoint(feature);
      if (!point) return '';
      const [x, y] = project(point);
      return `<g class="city"><circle cx="${x}" cy="${y}" r="5" /><text x="${x + 12}" y="${y + 4}">${escapeXml(String(feature.properties?.NAME || 'City'))}</text></g>`;
    })
    .join('\n');
  const title = `${country.name} ${kind === 'political' ? 'Political' : 'Physical'} Study Map`;

  return svgShell(
    title,
    kind,
    `${neighborPaths}
${kind === 'physical' ? lakePaths : ''}
<path class="country" d="${countryPath}" />
${kind === 'political' ? adminPaths : ''}
${kind === 'physical' ? riverPaths : ''}
${cityLabels}
${mapLabel(title, country, kind)}`,
    'Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.',
  );
}

function renderSymbolicMap(country: Country, kind: ReferenceMapKind): string {
  const title = `${country.name} ${kind === 'political' ? 'Political' : 'Physical'} Study Map`;
  const hash = hashString(country.code + kind);
  const outline = symbolicBlobPath(hash);
  const river = symbolicRiverPath(hash);
  const labels =
    kind === 'political'
      ? `<g class="city"><circle cx="800" cy="505" r="7" /><text x="816" y="510">${escapeXml(country.capital)}</text></g>`
      : `<path class="river" d="${river}" /><text class="terrain-label" x="660" y="355">Highlands</text><text class="terrain-label" x="880" y="720">Lowlands</text>`;

  return svgShell(
    title,
    kind,
    `<path class="country" d="${outline}" />
${labels}
${mapLabel(title, country, kind)}`,
    'Generated from local app country data. Run npm run maps:build with network access for Natural Earth/Commons upgrades.',
  );
}

function svgShell(title: string, kind: ReferenceMapKind, body: string, footer: string): string {
  const isPhysical = kind === 'physical';
  const fill = isPhysical ? 'url(#terrain)' : '#f7f1df';
  const background = isPhysical ? '#d8edf0' : '#eaf3f8';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${SVG_WIDTH}" height="${SVG_HEIGHT}" viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(title)}</title>
  <desc id="desc">${escapeXml(footer)}</desc>
  <defs>
    <linearGradient id="terrain" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#6c8c53" />
      <stop offset="42%" stop-color="#d5c487" />
      <stop offset="72%" stop-color="#b88b5f" />
      <stop offset="100%" stop-color="#f1f5ee" />
    </linearGradient>
    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.16" />
    </filter>
    <style>
      .neighbor { fill: #ffffff; stroke: #94a3b8; stroke-width: 1.2; opacity: 0.72; }
      .country { fill: ${fill}; stroke: #1f2937; stroke-width: 4; filter: url(#softShadow); }
      .admin1 { fill: none; stroke: #64748b; stroke-width: 1.1; stroke-dasharray: 6 7; opacity: 0.75; }
      .river { fill: none; stroke: #1d9bd1; stroke-width: 3; stroke-linecap: round; opacity: 0.88; }
      .lake { fill: #8ed1ea; stroke: #0ea5e9; stroke-width: 1.5; opacity: 0.8; }
      .city circle { fill: #ef4444; stroke: #ffffff; stroke-width: 2; }
      .city text, .terrain-label { fill: #172033; font: 700 24px system-ui, sans-serif; paint-order: stroke; stroke: #ffffff; stroke-width: 5; stroke-linejoin: round; }
      .map-title { fill: #0f172a; font: 800 46px system-ui, sans-serif; }
      .map-subtitle { fill: #475569; font: 600 24px system-ui, sans-serif; }
      .footer { fill: #64748b; font: 500 18px system-ui, sans-serif; }
    </style>
  </defs>
  <rect width="100%" height="100%" fill="${background}" />
  <rect x="40" y="40" width="${SVG_WIDTH - 80}" height="${SVG_HEIGHT - 80}" rx="32" fill="#ffffff" opacity="0.54" />
  ${body}
  <text class="footer" x="80" y="${SVG_HEIGHT - 64}">${escapeXml(footer)}</text>
</svg>
`;
}

function mapLabel(title: string, country: Country, kind: ReferenceMapKind): string {
  const subtitle =
    kind === 'political'
      ? `Capital: ${country.capital} | Continent: ${country.continent}`
      : `Landmark: ${country.landmark} | Study terrain and water systems`;

  return `<text class="map-title" x="80" y="105">${escapeXml(title)}</text>
<text class="map-subtitle" x="80" y="145">${escapeXml(subtitle)}</text>`;
}

async function tryDownloadCommonsMap(
  country: Country,
  kind: ReferenceMapKind,
  force: boolean,
): Promise<{ fileName: string; written: boolean; attribution: MapAttribution } | null> {
  const candidate = await findCommonsCandidate(country, kind);
  if (!candidate) {
    return null;
  }

  const extension = extensionForMime(candidate.mime, candidate.imageUrl);
  const fileName = `${country.code}-${kind}.${extension}`;
  const outputPath = path.join(PUBLIC_MAP_DIR, fileName);

  if (existsSync(outputPath) && !force) {
    return {
      fileName,
      written: false,
      attribution: commonsAttribution(candidate, fileName),
    };
  }

  const response = await fetchWithTimeout(candidate.imageUrl);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} downloading ${candidate.imageUrl}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(outputPath, bytes);
  return {
    fileName,
    written: true,
    attribution: commonsAttribution(candidate, fileName),
  };
}

async function findCommonsCandidate(country: Country, kind: ReferenceMapKind): Promise<CommonsCandidate | null> {
  const queries =
    kind === 'political'
      ? [`${country.name} political map`, `${country.name} administrative map`, `${country.name} map`]
      : [`${country.name} physical map`, `${country.name} relief map`, `${country.name} topographic map`];

  const candidates: CommonsCandidate[] = [];

  for (const query of queries) {
    const url = new URL('https://commons.wikimedia.org/w/api.php');
    url.searchParams.set('action', 'query');
    url.searchParams.set('format', 'json');
    url.searchParams.set('origin', '*');
    url.searchParams.set('generator', 'search');
    url.searchParams.set('gsrnamespace', '6');
    url.searchParams.set('gsrlimit', String(COMMONS_SEARCH_LIMIT));
    url.searchParams.set('gsrsearch', query);
    url.searchParams.set('prop', 'imageinfo');
    url.searchParams.set('iiprop', 'url|size|mime|extmetadata');
    url.searchParams.set('iiurlwidth', '1600');

    const response = await fetchWithTimeout(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} searching Commons`);
    }

    const data = await response.json();
    const pages = Object.values(data.query?.pages || {}) as any[];
    for (const page of pages) {
      const imageInfo = page.imageinfo?.[0];
      if (!imageInfo) continue;
      const candidate = toCommonsCandidate(page.title, imageInfo, country, kind);
      if (candidate) {
        candidates.push(candidate);
      }
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates[0] || null;
}

function toCommonsCandidate(title: string, imageInfo: any, country: Country, kind: ReferenceMapKind): CommonsCandidate | null {
  const lowerTitle = title.toLowerCase();
  if (BAD_COMMONS_TITLE_WORDS.some((word) => lowerTitle.includes(word))) {
    return null;
  }

  if (!lowerTitle.includes('map')) {
    return null;
  }

  const license = htmlToText(imageInfo.extmetadata?.LicenseShortName?.value || imageInfo.extmetadata?.UsageTerms?.value || '');
  if (!isAcceptedLicense(license)) {
    return null;
  }

  const width = Number(imageInfo.thumbwidth || imageInfo.width || 0);
  const height = Number(imageInfo.thumbheight || imageInfo.height || 0);
  if (width * height < 420_000) {
    return null;
  }

  const kindWords = kind === 'political' ? ['political', 'administrative', 'admin', 'province', 'states'] : ['physical', 'relief', 'terrain', 'topographic', 'geographic'];
  const countryTerms = [country.name, ...(COUNTRY_NAME_ALIASES[country.code] || [])].map(normalizeName);
  const normalizedTitle = normalizeName(title);
  let score = Math.min(45, Math.floor((width * height) / 100_000));
  if (countryTerms.some((term) => normalizedTitle.includes(term))) score += 50;
  if (kindWords.some((word) => lowerTitle.includes(word))) score += 40;
  if (lowerTitle.endsWith('.svg')) score += 8;
  if (lowerTitle.includes('blank')) score += kind === 'political' ? 4 : -20;
  if (kind === 'physical' && lowerTitle.includes('administrative')) score -= 25;

  if (score < 55) {
    return null;
  }

  const imageUrl = imageInfo.thumburl || imageInfo.url;
  const sourceUrl = imageInfo.descriptionurl || imageInfo.descriptionshorturl;
  if (!imageUrl || !sourceUrl) {
    return null;
  }

  return {
    title,
    sourceUrl,
    imageUrl,
    mime: imageInfo.mime || '',
    width,
    height,
    license,
    author: htmlToText(imageInfo.extmetadata?.Artist?.value || imageInfo.extmetadata?.Credit?.value || ''),
    score,
  };
}

function generatedAttribution(country: Country, kind: ReferenceMapKind, fileName: string, sourceType: SourceType): MapAttribution {
  const title = `${country.name} ${kind} map`;
  return sourceType === 'generated'
    ? {
        sourceType,
        title,
        credit: 'Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.',
        license: 'Public domain',
        sourceUrl: 'https://www.naturalearthdata.com/about/terms-of-use/',
        fileName,
      }
    : {
        sourceType,
        title,
        credit: 'Generated from local app country data; replace by rerunning the map builder with network access.',
        license: 'Local generated fallback',
        fileName,
      };
}

function commonsAttribution(candidate: CommonsCandidate, fileName: string): MapAttribution {
  return {
    sourceType: 'commons',
    title: candidate.title.replace(/^File:/, ''),
    credit: 'Downloaded from Wikimedia Commons via MediaWiki API.',
    license: candidate.license,
    sourceUrl: candidate.sourceUrl,
    author: candidate.author || undefined,
    fileName,
  };
}

async function writeAttributionModule(attributions: Record<string, Partial<Record<ReferenceMapKind, MapAttribution>>>) {
  const content = `import type { ReferenceMapKind } from './mapAssetLinks';

export interface MapAttribution {
  sourceType: 'generated' | 'commons' | 'local-fallback';
  title: string;
  credit: string;
  license: string;
  sourceUrl?: string;
  author?: string;
  fileName?: string;
}

export type MapAttributionIndex = Partial<Record<string, Partial<Record<ReferenceMapKind, MapAttribution>>>>;

export const mapAttributions: MapAttributionIndex = ${JSON.stringify(attributions, null, 2)};
`;

  await writeFile(ATTRIBUTION_TS_PATH, content, 'utf8');
}

async function writeAttributionsMarkdown(attributions: Record<string, Partial<Record<ReferenceMapKind, MapAttribution>>>) {
  const lines = [
    '# Map Attributions',
    '',
    'Generated by `npm run maps:build`.',
    '',
    '| Country | Kind | Source | License | Credit |',
    '| --- | --- | --- | --- | --- |',
  ];

  for (const country of countries) {
    for (const kind of ['political', 'physical'] as ReferenceMapKind[]) {
      const attribution = attributions[country.code]?.[kind];
      if (!attribution) continue;
      const source = attribution.sourceUrl ? `[${escapeMarkdown(attribution.title)}](${attribution.sourceUrl})` : escapeMarkdown(attribution.title);
      const credit = attribution.author ? `${attribution.credit} Author: ${attribution.author}` : attribution.credit;
      lines.push(`| ${escapeMarkdown(country.name)} | ${kind} | ${source} | ${escapeMarkdown(attribution.license)} | ${escapeMarkdown(credit)} |`);
    }
  }

  await writeFile(ATTRIBUTIONS_MD_PATH, `${lines.join('\n')}\n`, 'utf8');
}

async function writeReport(report: CountryReport[], summary: Record<string, unknown>) {
  await writeFile(
    REPORT_PATH,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        summary,
        countries: report,
      },
      null,
      2,
    )}\n`,
    'utf8',
  );
}

function findCountryFeature(country: Country, features: Feature[]): Feature | undefined {
  const code = country.code.toUpperCase();
  const names = [country.name, ...(COUNTRY_NAME_ALIASES[country.code] || [])].map(normalizeName);

  return features.find((feature) => {
    const props = feature.properties || {};
    const codes = [
      props.ISO_A2,
      props.ISO_A2_EH,
      props.WB_A2,
      props.POSTAL,
      props.ADM0_A3,
      props.SOV_A3,
      props.GU_A3,
      props.iso_a2,
    ]
      .filter(Boolean)
      .map((value) => String(value).toUpperCase());
    if (codes.includes(code)) {
      return true;
    }

    const featureNames = [props.NAME, props.NAME_EN, props.ADMIN, props.SOVEREIGNT, props.BRK_NAME]
      .filter(Boolean)
      .map((value) => normalizeName(String(value)));
    return featureNames.some((featureName) => names.includes(featureName));
  });
}

function featureBelongsToCountry(feature: Feature, country: Country): boolean {
  const props = feature.properties || {};
  const code = country.code.toUpperCase();
  const countryNames = [country.name, ...(COUNTRY_NAME_ALIASES[country.code] || [])].map(normalizeName);
  const propCodes = [props.iso_a2, props.ISO_A2, props.postal, props.adm0_a3, props.ADM0_A3].filter(Boolean).map((value) => String(value).toUpperCase());
  if (propCodes.includes(code)) return true;

  const names = [props.admin, props.ADMIN, props.geonunit, props.name, props.NAME].filter(Boolean).map((value) => normalizeName(String(value)));
  return names.some((name) => countryNames.includes(name));
}

function geometryToPath(geometry: Geometry | null, project: (position: Position) => [number, number]): string {
  if (!geometry || !geometry.coordinates) return '';

  if (geometry.type === 'Polygon') {
    return polygonPath(geometry.coordinates, project);
  }

  if (geometry.type === 'MultiPolygon') {
    return geometry.coordinates.map((polygon: any) => polygonPath(polygon, project)).join(' ');
  }

  if (geometry.type === 'LineString') {
    return linePath(geometry.coordinates, project);
  }

  if (geometry.type === 'MultiLineString') {
    return geometry.coordinates.map((line: any) => linePath(line, project)).join(' ');
  }

  return '';
}

function polygonPath(polygon: any, project: (position: Position) => [number, number]): string {
  return polygon
    .map((ring: Position[]) => {
      const line = linePath(ring, project);
      return line ? `${line} Z` : '';
    })
    .join(' ');
}

function linePath(line: Position[], project: (position: Position) => [number, number]): string {
  return line
    .map((position, index) => {
      const [x, y] = project(position);
      return `${index === 0 ? 'M' : 'L'} ${round(x)} ${round(y)}`;
    })
    .join(' ');
}

function bboxOfGeometry(geometry: Geometry | null): BBox | null {
  if (!geometry) return null;
  let bbox: BBox | null = null;
  forEachPosition(geometry, (position) => {
    if (!bbox) {
      bbox = [position[0], position[1], position[0], position[1]];
      return;
    }
    bbox[0] = Math.min(bbox[0], position[0]);
    bbox[1] = Math.min(bbox[1], position[1]);
    bbox[2] = Math.max(bbox[2], position[0]);
    bbox[3] = Math.max(bbox[3], position[1]);
  });
  return bbox;
}

function forEachPosition(geometry: Geometry, callback: (position: Position) => void) {
  const walk = (coordinates: any) => {
    if (!Array.isArray(coordinates)) return;
    if (typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
      callback(coordinates as Position);
      return;
    }
    for (const child of coordinates) {
      walk(child);
    }
  };
  walk(geometry.coordinates);
}

function createProjection(bbox: BBox) {
  const width = Math.max(0.0001, bbox[2] - bbox[0]);
  const height = Math.max(0.0001, bbox[3] - bbox[1]);
  const scale = Math.min((SVG_WIDTH - SVG_PADDING * 2) / width, (SVG_HEIGHT - SVG_PADDING * 2) / height);
  const drawWidth = width * scale;
  const drawHeight = height * scale;
  const offsetX = (SVG_WIDTH - drawWidth) / 2;
  const offsetY = (SVG_HEIGHT - drawHeight) / 2 + 35;

  return ([lon, lat]: Position): [number, number] => [
    offsetX + (lon - bbox[0]) * scale,
    offsetY + (bbox[3] - lat) * scale,
  ];
}

function normalizeBBox(bbox: BBox): BBox {
  const width = bbox[2] - bbox[0];
  const height = bbox[3] - bbox[1];
  const minSpan = 2.2;
  const cx = (bbox[0] + bbox[2]) / 2;
  const cy = (bbox[1] + bbox[3]) / 2;
  const nextWidth = Math.max(width, minSpan);
  const nextHeight = Math.max(height, minSpan);
  return [cx - nextWidth / 2, cy - nextHeight / 2, cx + nextWidth / 2, cy + nextHeight / 2];
}

function expandBBox(bbox: BBox, ratio: number): BBox {
  const width = bbox[2] - bbox[0];
  const height = bbox[3] - bbox[1];
  return [bbox[0] - width * ratio, bbox[1] - height * ratio, bbox[2] + width * ratio, bbox[3] + height * ratio];
}

function bboxIntersects(a: BBox | null, b: BBox): boolean {
  if (!a) return false;
  return a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1];
}

function bboxContainsPosition(bbox: BBox, position?: Position): boolean {
  if (!position) return false;
  return position[0] >= bbox[0] && position[0] <= bbox[2] && position[1] >= bbox[1] && position[1] <= bbox[3];
}

function featurePoint(feature: Feature): Position | undefined {
  if (!feature.geometry) return undefined;
  if (feature.geometry.type === 'Point' && Array.isArray(feature.geometry.coordinates)) {
    return feature.geometry.coordinates as Position;
  }

  const bbox = bboxOfGeometry(feature.geometry);
  return bbox ? [(bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2] : undefined;
}

function fallbackBBox(code: string): BBox {
  const hash = hashString(code);
  const lon = ((hash % 280) + 280) % 280 - 140;
  const lat = ((((hash >> 5) % 110) + 110) % 110) - 55;
  return [lon - 5, lat - 4, lon + 5, lat + 4];
}

function symbolicBlobPath(hash: number): string {
  const points = 22;
  const cx = 800;
  const cy = 565;
  const rx = 390 + (Math.abs(hash) % 100);
  const ry = 290 + (Math.abs(hash >> 4) % 85);

  return Array.from({ length: points }, (_, index) => {
    const angle = (Math.PI * 2 * index) / points;
    const wobble = Math.sin(angle * 3 + hash) * 38 + Math.cos(angle * 5 + hash) * 22;
    const x = cx + Math.cos(angle) * (rx + wobble);
    const y = cy + Math.sin(angle) * (ry + wobble);
    return `${index === 0 ? 'M' : 'L'} ${round(x)} ${round(y)}`;
  }).join(' ') + ' Z';
}

function symbolicRiverPath(hash: number): string {
  const y1 = 330 + (Math.abs(hash) % 90);
  return `M 460 ${y1} C 610 ${y1 + 120}, 670 ${y1 - 95}, 820 ${y1 + 35} S 1040 ${y1 + 210}, 1160 ${y1 + 110}`;
}

function createEmptyMapResult(): MapResult {
  return {
    generated: false,
    downloaded: false,
    fileName: '',
    sourceType: 'local-fallback',
  };
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'world-maps-study-app/1.0 (educational map builder)',
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}

function isAcceptedLicense(value: string): boolean {
  const license = value.toLowerCase();
  if (!license) return false;
  if (license.includes('noncommercial') || license.includes('non-commercial') || license.includes('no derivatives') || license.includes('nd')) {
    return false;
  }
  return (
    license.includes('public domain') ||
    license.includes('cc0') ||
    license.includes('cc by') ||
    license.includes('cc-by') ||
    license.includes('creative commons attribution')
  );
}

function extensionForMime(mime: string, url: string): 'jpg' | 'png' | 'svg' {
  if (mime.includes('svg') || /\.svg($|\?)/i.test(url)) return 'svg';
  if (mime.includes('png') || /\.png($|\?)/i.test(url)) return 'png';
  return 'jpg';
}

function normalizeName(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/gi, ' ')
    .trim()
    .toLowerCase();
}

function htmlToText(value: string): string {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeMarkdown(value: string): string {
  return value.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = value.charCodeAt(index) + ((hash << 5) - hash);
    hash |= 0;
  }
  return hash;
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}

function relative(filePath: string): string {
  return path.relative(ROOT, filePath).replace(/\\/g, '/');
}

function formatError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
