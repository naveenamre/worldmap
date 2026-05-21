export interface CurrencyInfo {
  name: string;
  code: string;
  symbol: string;
}

export interface IndiaRelation {
  summary: string;
  jointExercise?: string;
  borderSharing?: string;
  sharedProjects?: string;
  funFactsWithIndia?: string[];
}

export interface Country {
  code: string; // ISO 2-letter code in lowercase
  name: string;
  capital: string;
  continent: string;
  currency: CurrencyInfo;
  population: number;
  languages: string[];
  landmark: string;
  funFacts: string[];
  indiaRelation?: IndiaRelation; // Connection details to India
  touristDestinations?: string[]; // Top tourist attractions
}
