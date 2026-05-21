export type ReferenceMapKind = 'political' | 'physical';

export type MapAssetLinks = Partial<Record<string, Partial<Record<ReferenceMapKind, string>>>>;

// Optional external image links for maps you do not want to store in the repo.
// Keys are lowercase ISO-2 country codes from src/data/countries.ts.
// Example:
// export const mapAssetLinks: MapAssetLinks = {
//   in: {
//     political: 'https://example.com/india-political-map.jpg',
//     physical: 'https://example.com/india-physical-map.jpg',
//   },
// };
export const mapAssetLinks: MapAssetLinks = {};
