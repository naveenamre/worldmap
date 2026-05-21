import type { Country } from '../data/countries';
import type { AICountryTrivia } from '../types';

export interface TouristDestination {
  name: string;
  type: string;
  description: string;
}

export interface StudyMapData {
  countryName: string;
  outlinePoints: { x: number; y: number }[];
  capitalPoint: {
    name: string;
    x: number;
    y: number;
    details: string;
  };
  majorCities: {
    name: string;
    x: number;
    y: number;
    description: string;
  }[];
  physicalLandmarks: {
    name: string;
    type: string;
    x: number;
    y: number;
    description: string;
    points?: { x: number; y: number }[];
  }[];
  neighborBorders: {
    name: string;
    direction: string;
    description: string;
  }[];
  academicSpecs: {
    northToSouthDistanceKm: string;
    eastToWestDistanceKm: string;
    totalAreaSqKm: string;
    totalBordersKm: string;
    coastlineStatus: string;
    extremePoints: {
      north: string;
      south: string;
      east: string;
      west: string;
    };
  };
  academicTips: string[];
}

const API_TIMEOUT_MS = 6000;

export async function postJson<T>(endpoint: string, payload: unknown): Promise<T> {
  if (isKnownStaticHost()) {
    throw new Error('Static host has no backend API.');
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(toRelativeApiUrl(endpoint), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data?.error) {
      throw new Error(String(data.error));
    }

    return data as T;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function getStaticDestinations(country: Country): TouristDestination[] {
  const configured = country.touristDestinations || [];
  const names = unique([
    ...configured,
    country.landmark,
    `${country.capital} heritage district`,
    `${country.name} cultural route`,
  ]).slice(0, 3);

  const types = ['Landmark', 'Culture & History', 'Local Experience'];

  return names.map((name, index) => ({
    name,
    type: types[index] || 'National Highlight',
    description:
      index === 0
        ? `${name} is a high-interest place to start exploring ${country.name}, especially for its geography, culture, and national identity.`
        : `Use ${name} as a study stop for understanding local life, regional history, and the character of ${country.name}.`,
  }));
}

export function getStaticGuideAnswer(country: Country, query: string): string {
  const normalizedQuery = query.toLowerCase();
  const destinations = getStaticDestinations(country);
  const languageList = country.languages.join(', ');
  const facts = country.funFacts.slice(0, 3);
  const indiaNote = country.indiaRelation
    ? `\n\n**India connection:** ${country.indiaRelation.summary}`
    : '';

  if (/(food|dish|cuisine|recipe|eat|meal)/.test(normalizedQuery)) {
    return `**Food and local flavor in ${country.name}**\n\nI do not have a live AI server on this static host, but here is a useful study answer from the app data:\n\n- Start with the capital, **${country.capital}**, where national and regional food styles are often easiest to compare.\n- Ask locals or travel guides for dishes tied to festivals, markets, and family celebrations.\n- Pair food study with language study: common language(s) include **${languageList}**.\n\n**Study tip:** connect cuisine with geography. Coastal, mountain, desert, and river regions often shape staple ingredients.${indiaNote}`;
  }

  if (/(language|greeting|phrase|speak|pronunciation)/.test(normalizedQuery)) {
    return `**Languages of ${country.name}**\n\nCommon language(s): **${languageList}**.\n\nA good learner path:\n\n- Learn a greeting, a thank-you phrase, and a polite question first.\n- Notice whether the language is used nationally, regionally, or alongside other official languages.\n- Compare language with neighboring regions in **${country.continent}** to understand cultural links.\n\n**Memory anchor:** ${country.capital} is the capital, and ${country.currency.name} (${country.currency.code}) is the currency.`;
  }

  if (/(travel|visit|itinerary|tour|sight|destination|place)/.test(normalizedQuery)) {
    return `**Simple ${country.name} travel plan**\n\n- **Day 1:** Begin in **${country.capital}** for government landmarks, museums, and local food.\n- **Day 2:** Visit **${destinations[0].name}** to connect the country's identity with a real place.\n- **Day 3:** Add **${destinations[1].name}** or **${destinations[2].name}** for cultural contrast.\n\n**Quick context:** ${country.name} is in **${country.continent}**, uses **${country.currency.name} (${country.currency.code})**, and is associated with **${country.landmark}**.`;
  }

  if (/(history|tradition|culture|music|festival|custom)/.test(normalizedQuery)) {
    return `**Culture notes for ${country.name}**\n\n${facts.map((fact) => `- ${fact}`).join('\n')}\n\n**Study angle:** connect these facts with **${country.landmark}**, the capital **${country.capital}**, and the language(s) **${languageList}**. That creates a stronger mental map than memorizing one fact alone.${indiaNote}`;
  }

  return `**${country.name} at a glance**\n\n- **Capital:** ${country.capital}\n- **Continent:** ${country.continent}\n- **Currency:** ${country.currency.name} (${country.currency.code})\n- **Language(s):** ${languageList}\n- **Landmark:** ${country.landmark}\n\n${facts.map((fact) => `- ${fact}`).join('\n')}\n\nThis is the static-site answer. Connect a backend API later if you want live Gemini responses on a server host.`;
}

export function getStaticTriviaQuestion(country: Country, allCountries: Country[]): AICountryTrivia {
  const differentCapital = randomItem(allCountries.filter((item) => item.code !== country.code)) || country;
  const differentCurrency =
    randomItem(allCountries.filter((item) => item.currency.code !== country.currency.code)) || differentCapital;

  const options: AICountryTrivia[] = [
    {
      country: country.name,
      statement: `${country.name} has ${country.capital} as its capital city.`,
      isTrue: true,
      explanation: `True. ${country.capital} is listed as the capital of ${country.name}.`,
    },
    {
      country: country.name,
      statement: `${country.name} uses the ${country.currency.name} (${country.currency.code}) as its official currency.`,
      isTrue: true,
      explanation: `True. The currency shown in this app for ${country.name} is ${country.currency.name} (${country.currency.code}).`,
    },
    {
      country: country.name,
      statement: `${country.name} has ${differentCapital.capital} as its capital city.`,
      isTrue: false,
      explanation: `False. ${differentCapital.capital} is associated with ${differentCapital.name}; the capital of ${country.name} is ${country.capital}.`,
    },
    {
      country: country.name,
      statement: `${country.name} uses the ${differentCurrency.currency.name} (${differentCurrency.currency.code}) as its official currency.`,
      isTrue: false,
      explanation: `False. ${country.name} uses ${country.currency.name} (${country.currency.code}), not ${differentCurrency.currency.name} (${differentCurrency.currency.code}).`,
    },
  ];

  return randomItem(options) || options[0];
}

export function getStaticStudyMap(country: Country): StudyMapData {
  const hash = hashString(country.code + country.name);
  const steps = 18 + (Math.abs(hash) % 4);
  const xRadius = 27 + (Math.abs(hash) % 9);
  const yRadius = 28 + (Math.abs(hash >> 4) % 10);
  const outlinePoints = Array.from({ length: steps }, (_, index) => {
    const angle = (index * 2 * Math.PI) / steps;
    const wobble = Math.sin(angle * 3 + hash) * 5 + Math.cos(angle * 5 + hash) * 3;
    return {
      x: clamp(Math.round(50 + Math.cos(angle) * (xRadius + wobble)), 8, 92),
      y: clamp(Math.round(50 + Math.sin(angle) * (yRadius + wobble)), 8, 92),
    };
  });

  const destinations = getStaticDestinations(country);
  const languageList = country.languages.join(', ');
  const landmarkType = inferLandmarkType(country.landmark);

  return {
    countryName: country.name,
    outlinePoints,
    capitalPoint: {
      name: country.capital,
      x: 50,
      y: 45,
      details: `${country.capital} is the capital city and a useful anchor point for studying ${country.name}.`,
    },
    majorCities: [
      {
        name: `${country.capital} metro region`,
        x: 52,
        y: 47,
        description: `The main administrative and cultural reference point for ${country.name}.`,
      },
      {
        name: destinations[0].name,
        x: 34,
        y: 32,
        description: `A major study landmark connected with ${country.name}'s national identity.`,
      },
      {
        name: destinations[1].name,
        x: 68,
        y: 66,
        description: `A second reference point for comparing local geography and culture.`,
      },
    ],
    physicalLandmarks: [
      {
        name: country.landmark,
        type: landmarkType,
        x: 38,
        y: 30,
        description: `${country.landmark} is the primary landmark stored for ${country.name}.`,
      },
      {
        name: `${country.name} central river basin`,
        type: 'river',
        x: 54,
        y: 58,
        description: `A study river trace used to practice reading flow, settlement, and agricultural patterns in ${country.name}.`,
        points: [
          { x: 30, y: 25 },
          { x: 42, y: 40 },
          { x: 54, y: 58 },
          { x: 72, y: 70 },
        ],
      },
    ],
    neighborBorders: [
      {
        name: `${country.continent} regional neighbors`,
        direction: 'N/E/S/W',
        description: `Compare ${country.name} with surrounding countries in ${country.continent} to understand borders and regional identity.`,
      },
      {
        name: 'Trade and travel corridors',
        direction: 'SE',
        description: `Study how capital links, landmark locations, and transport routes shape movement across the country.`,
      },
    ],
    academicSpecs: {
      northToSouthDistanceKm: 'Classroom projection estimate',
      eastToWestDistanceKm: 'Classroom projection estimate',
      totalAreaSqKm: 'Use an atlas for official area',
      totalBordersKm: 'Use an atlas for official border length',
      coastlineStatus: inferCoastlineStatus(country),
      extremePoints: {
        north: `Northern ${country.name} study point`,
        south: `Southern ${country.name} study point`,
        east: `Eastern ${country.name} study point`,
        west: `Western ${country.name} study point`,
      },
    },
    academicTips: [
      `Anchor ${country.name} with its capital, ${country.capital}, then add the landmark ${country.landmark}.`,
      `Remember the core language set: ${languageList}.`,
      `Pair currency recall (${country.currency.code}) with continent recall (${country.continent}) for quiz speed.`,
    ],
  };
}

function toRelativeApiUrl(endpoint: string): string {
  if (/^https?:\/\//i.test(endpoint)) {
    return endpoint;
  }

  return `./${endpoint.replace(/^\/+/, '')}`;
}

function isKnownStaticHost(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.location.protocol === 'file:' || window.location.hostname.endsWith('github.io');
}

function unique(items: string[]): string[] {
  return [...new Set(items.filter(Boolean))];
}

function randomItem<T>(items: T[]): T | undefined {
  return items[Math.floor(Math.random() * items.length)];
}

function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = value.charCodeAt(index) + ((hash << 5) - hash);
  }
  return hash;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function inferLandmarkType(landmark: string): string {
  const lower = landmark.toLowerCase();
  if (/(mount|peak|hill|mountain|volcano|falls|fjord|lagoon|lake|bay|delta|desert|dune)/.test(lower)) {
    return 'natural landmark';
  }
  if (/(river|canal)/.test(lower)) {
    return 'river';
  }
  if (/(temple|mosque|church|cathedral|palace|castle|tower|bridge|museum|fort|ruins|wall)/.test(lower)) {
    return 'historic landmark';
  }
  return 'landmark';
}

function inferCoastlineStatus(country: Country): string {
  const landlockedHints = /(nepal|bhutan|mongolia|kazakhstan|kyrgyzstan|tajikistan|uzbekistan|afghanistan|laos|switzerland|austria|hungary|serbia|belarus|armenia|azerbaijan|luxembourg|andorra|san marino|vatican|liechtenstein|bolivia|paraguay|botswana|burkina faso|burundi|central african|chad|ethiopia|lesotho|malawi|mali|niger|rwanda|south sudan|uganda|zambia|zimbabwe)/i;
  return landlockedHints.test(country.name) ? 'landlocked' : 'coastal or regionally connected';
}
