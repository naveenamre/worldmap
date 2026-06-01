import type { Country } from "./countries";

export const CONTINENTS = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Oceania",
] as const;

export type ContinentName = (typeof CONTINENTS)[number];

export const SUBREGIONS_BY_CONTINENT = {
  Africa: ["North Africa", "West Africa", "Central Africa", "East Africa", "Southern Africa"],
  Asia: ["Central Asia", "East Asia", "South Asia", "Southeast Asia", "West Asia"],
  Europe: ["Northern Europe", "Western Europe", "Eastern Europe", "Southern Europe"],
  "North America": ["Northern America", "Central America", "Caribbean"],
  "South America": ["Andean South America", "Southern Cone", "Northern South America", "Brazil"],
  Oceania: ["Australia and New Zealand", "Melanesia", "Micronesia", "Polynesia"],
} as const satisfies Record<ContinentName, readonly string[]>;

export type SubregionName = (typeof SUBREGIONS_BY_CONTINENT)[ContinentName][number];

export type QuizScope =
  | { level: "world" }
  | { level: "continent"; continent: ContinentName }
  | { level: "subregion"; continent: ContinentName; subregion: SubregionName };

export const WORLD_SCOPE: QuizScope = { level: "world" };

export const SUBREGION_TO_CONTINENT: Record<SubregionName, ContinentName> = Object.entries(
  SUBREGIONS_BY_CONTINENT
).reduce((acc, [continent, subregions]) => {
  subregions.forEach((subregion) => {
    acc[subregion as SubregionName] = continent as ContinentName;
  });
  return acc;
}, {} as Record<SubregionName, ContinentName>);

export const COUNTRY_SUBREGION_BY_CODE: Record<string, SubregionName> = {
  // Africa
  eg: "North Africa",
  ma: "North Africa",
  dz: "North Africa",
  ly: "North Africa",
  mr: "North Africa",
  sd: "North Africa",
  tn: "North Africa",
  bj: "West Africa",
  bf: "West Africa",
  cv: "West Africa",
  gm: "West Africa",
  gh: "West Africa",
  gn: "West Africa",
  gw: "West Africa",
  ci: "West Africa",
  lr: "West Africa",
  ml: "West Africa",
  ne: "West Africa",
  ng: "West Africa",
  sn: "West Africa",
  sl: "West Africa",
  tg: "West Africa",
  ao: "Central Africa",
  cm: "Central Africa",
  cf: "Central Africa",
  td: "Central Africa",
  cd: "Central Africa",
  cg: "Central Africa",
  gq: "Central Africa",
  ga: "Central Africa",
  st: "Central Africa",
  bi: "East Africa",
  km: "East Africa",
  dj: "East Africa",
  er: "East Africa",
  et: "East Africa",
  ke: "East Africa",
  mg: "East Africa",
  mu: "East Africa",
  rw: "East Africa",
  sc: "East Africa",
  so: "East Africa",
  ss: "East Africa",
  tz: "East Africa",
  ug: "East Africa",
  za: "Southern Africa",
  bw: "Southern Africa",
  ls: "Southern Africa",
  mw: "Southern Africa",
  mz: "Southern Africa",
  na: "Southern Africa",
  sz: "Southern Africa",
  zm: "Southern Africa",
  zw: "Southern Africa",

  // Asia
  kz: "Central Asia",
  kg: "Central Asia",
  tj: "Central Asia",
  tm: "Central Asia",
  uz: "Central Asia",
  cn: "East Asia",
  jp: "East Asia",
  kp: "East Asia",
  kr: "East Asia",
  mn: "East Asia",
  tw: "East Asia",
  af: "South Asia",
  bd: "South Asia",
  bt: "South Asia",
  in: "South Asia",
  lk: "South Asia",
  mv: "South Asia",
  np: "South Asia",
  pk: "South Asia",
  bn: "Southeast Asia",
  kh: "Southeast Asia",
  id: "Southeast Asia",
  la: "Southeast Asia",
  my: "Southeast Asia",
  mm: "Southeast Asia",
  ph: "Southeast Asia",
  sg: "Southeast Asia",
  th: "Southeast Asia",
  tl: "Southeast Asia",
  vn: "Southeast Asia",
  ae: "West Asia",
  bh: "West Asia",
  cy: "West Asia",
  ge: "West Asia",
  ir: "West Asia",
  iq: "West Asia",
  il: "West Asia",
  jo: "West Asia",
  kw: "West Asia",
  lb: "West Asia",
  om: "West Asia",
  ps: "West Asia",
  qa: "West Asia",
  sa: "West Asia",
  sy: "West Asia",
  tr: "West Asia",
  ye: "West Asia",

  // Europe
  dk: "Northern Europe",
  ee: "Northern Europe",
  fi: "Northern Europe",
  gb: "Northern Europe",
  ie: "Northern Europe",
  is: "Northern Europe",
  lt: "Northern Europe",
  lv: "Northern Europe",
  no: "Northern Europe",
  se: "Northern Europe",
  at: "Western Europe",
  be: "Western Europe",
  ch: "Western Europe",
  de: "Western Europe",
  fr: "Western Europe",
  li: "Western Europe",
  lu: "Western Europe",
  mc: "Western Europe",
  nl: "Western Europe",
  am: "Eastern Europe",
  az: "Eastern Europe",
  by: "Eastern Europe",
  cz: "Eastern Europe",
  hu: "Eastern Europe",
  md: "Eastern Europe",
  pl: "Eastern Europe",
  ro: "Eastern Europe",
  ru: "Eastern Europe",
  sk: "Eastern Europe",
  ua: "Eastern Europe",
  ad: "Southern Europe",
  al: "Southern Europe",
  ba: "Southern Europe",
  bg: "Southern Europe",
  es: "Southern Europe",
  gr: "Southern Europe",
  hr: "Southern Europe",
  it: "Southern Europe",
  me: "Southern Europe",
  mk: "Southern Europe",
  mt: "Southern Europe",
  pt: "Southern Europe",
  rs: "Southern Europe",
  si: "Southern Europe",
  sm: "Southern Europe",
  va: "Southern Europe",

  // North America
  ca: "Northern America",
  us: "Northern America",
  bz: "Central America",
  cr: "Central America",
  gt: "Central America",
  hn: "Central America",
  mx: "Central America",
  ni: "Central America",
  pa: "Central America",
  sv: "Central America",
  ag: "Caribbean",
  bb: "Caribbean",
  bs: "Caribbean",
  cu: "Caribbean",
  dm: "Caribbean",
  do: "Caribbean",
  gd: "Caribbean",
  ht: "Caribbean",
  jm: "Caribbean",
  kn: "Caribbean",
  lc: "Caribbean",
  tt: "Caribbean",
  vc: "Caribbean",

  // South America
  bo: "Andean South America",
  co: "Andean South America",
  ec: "Andean South America",
  pe: "Andean South America",
  ve: "Andean South America",
  ar: "Southern Cone",
  cl: "Southern Cone",
  py: "Southern Cone",
  uy: "Southern Cone",
  gy: "Northern South America",
  sr: "Northern South America",
  br: "Brazil",

  // Oceania
  au: "Australia and New Zealand",
  nz: "Australia and New Zealand",
  fj: "Melanesia",
  pg: "Melanesia",
  sb: "Melanesia",
  vu: "Melanesia",
  fm: "Micronesia",
  ki: "Micronesia",
  mh: "Micronesia",
  nr: "Micronesia",
  pw: "Micronesia",
  to: "Polynesia",
  tv: "Polynesia",
  ws: "Polynesia",
};

export function getCountrySubregion(country: Country): SubregionName | undefined {
  return COUNTRY_SUBREGION_BY_CODE[country.code];
}

export function matchesQuizScope(country: Country, scope: QuizScope): boolean {
  if (scope.level === "world") return true;
  if (scope.level === "continent") return country.continent === scope.continent;
  return getCountrySubregion(country) === scope.subregion;
}

export function getScopedCountries(
  allCountries: Country[],
  scope: QuizScope,
  predicate: (country: Country) => boolean = () => true
): Country[] {
  return allCountries.filter((country) => matchesQuizScope(country, scope) && predicate(country));
}

export function getScopeLabel(scope: QuizScope): string {
  if (scope.level === "world") return "World";
  if (scope.level === "continent") return scope.continent;
  return scope.subregion;
}

export function getScopeTrail(scope: QuizScope): string {
  if (scope.level === "world") return "World";
  if (scope.level === "continent") return scope.continent;
  return `${scope.continent} > ${scope.subregion}`;
}

export function getSubregionsForContinent(continent: ContinentName): readonly SubregionName[] {
  return SUBREGIONS_BY_CONTINENT[continent] as readonly SubregionName[];
}

export function getSiblingCountriesForSubregion(allCountries: Country[], subregion: SubregionName): Country[] {
  const continent = SUBREGION_TO_CONTINENT[subregion];
  return allCountries.filter(
    (country) => country.continent === continent && getCountrySubregion(country) !== subregion
  );
}
