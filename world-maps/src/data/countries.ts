import { Country, CurrencyInfo, IndiaRelation } from "./types_country";
import { americasCountries } from "./countries_americas";
import { asiaOceaniaCountries } from "./countries_asia_oceania";
import { europeCountries } from "./countries_europe";
import { africaCountries } from "./countries_africa";

// Re-export type interfaces for historical workspace compatibility
export type { Country, CurrencyInfo, IndiaRelation };

export const countries: Country[] = [
  ...asiaOceaniaCountries,
  ...europeCountries,
  ...americasCountries,
  ...africaCountries
];
