import type {
  AICountryTrivia,
  LearningMemory,
  LearningMemorySummary,
  QuizDifficulty,
  QuizGameId,
  QuizGameMemory,
  QuestionKind,
  TriviaQuestion,
} from '../types';
import type { Country } from '../data/countries';
import {
  CONTINENTS,
  WORLD_SCOPE,
  getCountrySubregion,
  getScopeTrail,
  getScopedCountries,
  getSiblingCountriesForSubregion,
  getSubregionsForContinent,
  type QuizScope,
} from '../data/quizRegions';

export const LEARNING_MEMORY_KEY = 'world_learner_memory_v1';

const QUIZ_GAMES: QuizGameId[] = ['flag', 'capital', 'currency', 'continent', 'ai-trivia', 'india-trivia'];
const RECENT_LIMIT = 8;
const REVIEW_INTERVAL = 3;

const emptyGameMemory = (): QuizGameMemory => ({
  recentCountryCodes: [],
  reviewQueue: [],
  streak: 0,
  bestStreak: 0,
  answered: 0,
});

export const createEmptyLearningMemory = (): LearningMemory => ({
  version: 1,
  countryMastery: {},
  games: {
    flag: emptyGameMemory(),
    capital: emptyGameMemory(),
    currency: emptyGameMemory(),
    continent: emptyGameMemory(),
    'ai-trivia': emptyGameMemory(),
    'india-trivia': emptyGameMemory(),
  },
  updatedAt: Date.now(),
});

export function normalizeLearningMemory(input: unknown): LearningMemory {
  const base = createEmptyLearningMemory();
  if (!input || typeof input !== 'object') return base;

  const partial = input as Partial<LearningMemory>;
  const games = { ...base.games };
  QUIZ_GAMES.forEach((game) => {
    const existing = partial.games?.[game];
    games[game] = {
      ...base.games[game],
      ...(existing || {}),
      recentCountryCodes: Array.isArray(existing?.recentCountryCodes) ? existing.recentCountryCodes.slice(0, RECENT_LIMIT) : [],
      reviewQueue: Array.isArray(existing?.reviewQueue) ? Array.from(new Set(existing.reviewQueue)) : [],
    };
  });

  return {
    version: 1,
    countryMastery: partial.countryMastery && typeof partial.countryMastery === 'object' ? partial.countryMastery : {},
    games,
    updatedAt: typeof partial.updatedAt === 'number' ? partial.updatedAt : Date.now(),
  };
}

export function loadLearningMemory(): LearningMemory {
  if (typeof window === 'undefined') return createEmptyLearningMemory();

  try {
    const saved = window.localStorage.getItem(LEARNING_MEMORY_KEY);
    return saved ? normalizeLearningMemory(JSON.parse(saved)) : createEmptyLearningMemory();
  } catch (error) {
    console.warn('Could not load learning memory:', error);
    return createEmptyLearningMemory();
  }
}

export function saveLearningMemory(memory: LearningMemory) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LEARNING_MEMORY_KEY, JSON.stringify({ ...memory, updatedAt: Date.now() }));
}

export function exportLearningMemory(memory: LearningMemory): string {
  return JSON.stringify({ exportedAt: new Date().toISOString(), memory: normalizeLearningMemory(memory) }, null, 2);
}

export function parseLearningMemoryBackup(text: string): LearningMemory {
  const parsed = JSON.parse(text);
  return normalizeLearningMemory(parsed?.memory || parsed);
}

const shuffleItems = <T,>(items: T[]): T[] => [...items].sort(() => 0.5 - Math.random());
const randomItem = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

const uniqueOptions = (correctAnswer: string, candidates: string[], size = 4): string[] => {
  const distractors = Array.from(new Set(candidates.filter((candidate) => candidate && candidate !== correctAnswer)));
  return shuffleItems([correctAnswer, ...shuffleItems(distractors).slice(0, size - 1)]);
};

function getPool(allCountries: Country[], game: QuizGameId, scope: QuizScope): Country[] {
  const predicate = game === 'india-trivia'
    ? (country: Country) => country.indiaRelation !== undefined
    : () => true;
  return getScopedCountries(allCountries, scope, predicate);
}

export function getQuizCountryPool(allCountries: Country[], game: QuizGameId, scope: QuizScope): Country[] {
  return getPool(allCountries, game, scope);
}

export function canStartQuizScope(allCountries: Country[], game: QuizGameId, scope: QuizScope): boolean {
  const scopedPool = getPool(allCountries, game, scope);

  if (game === 'continent') {
    if (scope.level === 'continent') {
      const availableSubregions = getSubregionsForContinent(scope.continent)
        .filter((subregion) => getScopedCountries(allCountries, {
          level: 'subregion',
          continent: scope.continent,
          subregion,
        }).length > 0);
      return scopedPool.length >= 4 && availableSubregions.length >= 2;
    }

    if (scope.level === 'subregion') {
      return scopedPool.length >= 1 && getSiblingCountriesForSubregion(allCountries, scope.subregion).length >= 3;
    }
  }

  return scopedPool.length >= 4;
}

function safePool(allCountries: Country[], game: QuizGameId, scope: QuizScope, minimumCountries = 4): Country[] {
  const scopedPool = getPool(allCountries, game, scope);
  if (scopedPool.length >= minimumCountries) return scopedPool;
  const worldPool = getPool(allCountries, game, WORLD_SCOPE);
  return worldPool.length >= minimumCountries ? worldPool : scopedPool;
}

function getDifficulty(gameMemory: QuizGameMemory): QuizDifficulty {
  if (gameMemory.streak >= 7 || gameMemory.answered >= 18) return 'sharp';
  if (gameMemory.streak >= 3 || gameMemory.answered >= 7) return 'steady';
  return 'warmup';
}

function getMastery(memory: LearningMemory, code: string) {
  return memory.countryMastery[code] || { attempts: 0, correct: 0, wrong: 0, mastery: 0, lastSeenAt: 0 };
}

function pickWeightedCountry(
  pool: Country[],
  memory: LearningMemory,
  game: QuizGameId
): { country: Country; isReview: boolean } {
  const gameMemory = memory.games[game];
  const reviewCode = gameMemory.answered > 0 && gameMemory.answered % REVIEW_INTERVAL === REVIEW_INTERVAL - 1
    ? gameMemory.reviewQueue.find((code) => pool.some((country) => country.code === code))
    : undefined;

  if (reviewCode) {
    return { country: pool.find((country) => country.code === reviewCode) || randomItem(pool), isReview: true };
  }

  const weighted = pool.flatMap((country) => {
    const mastery = getMastery(memory, country.code);
    const isRecent = gameMemory.recentCountryCodes.includes(country.code);
    const isQueued = gameMemory.reviewQueue.includes(country.code);
    let weight = 3;

    if (mastery.attempts === 0) weight += 6;
    if (mastery.wrong > mastery.correct) weight += 5;
    if (mastery.mastery < 35) weight += 3;
    if (isQueued) weight += 4;
    if (mastery.mastery >= 80) weight -= 2;
    if (isRecent) weight -= 5;

    return Array.from({ length: Math.max(1, weight) }, () => country);
  });

  return { country: randomItem(weighted.length ? weighted : pool), isReview: false };
}

function nearbyCountries(allCountries: Country[], pool: Country[], correctCountry: Country, difficulty: QuizDifficulty): Country[] {
  const subregion = getCountrySubregion(correctCountry);
  const sameSubregion = subregion ? allCountries.filter((country) => getCountrySubregion(country) === subregion) : [];
  const sameContinent = allCountries.filter((country) => country.continent === correctCountry.continent);

  if (difficulty === 'sharp') return [...sameSubregion, ...sameContinent, ...pool, ...allCountries];
  if (difficulty === 'steady') return [...sameContinent, ...pool, ...allCountries];
  return [...pool, ...sameContinent, ...allCountries];
}

function memoryHook(country: Country): string {
  const subregion = getCountrySubregion(country);
  return `${country.name}: ${country.capital}, ${country.currency.code}, ${subregion || country.continent}.`;
}

function questionBase(
  country: Country,
  kind: QuestionKind,
  difficulty: QuizDifficulty,
  isReview: boolean
) {
  return {
    countryCode: country.code,
    flagCode: country.code,
    questionKind: kind,
    difficulty,
    memoryHook: memoryHook(country),
    isReview,
  };
}

export function generateMultipleChoiceQuestion(
  game: Exclude<QuizGameId, 'ai-trivia'>,
  allCountries: Country[],
  scope: QuizScope,
  memory: LearningMemory
): TriviaQuestion {
  const pool = safePool(allCountries, game, scope);
  const gameMemory = memory.games[game];
  const difficulty = getDifficulty(gameMemory);
  const { country: correctCountry, isReview } = pickWeightedCountry(pool, memory, game);
  const distractorPool = nearbyCountries(allCountries, pool, correctCountry, difficulty)
    .filter((country) => country.code !== correctCountry.code);

  if (game === 'flag') {
    return {
      ...questionBase(correctCountry, 'flag-to-country', difficulty, isReview),
      question: `Which country is represented by this national flag?`,
      options: uniqueOptions(correctCountry.name, distractorPool.map((country) => country.name)),
      correctAnswer: correctCountry.name,
      explanation: `${correctCountry.name} is in ${correctCountry.continent}. Capital: ${correctCountry.capital}. Currency: ${correctCountry.currency.name} (${correctCountry.currency.code}).`,
    };
  }

  if (game === 'capital') {
    const askCapital = difficulty === 'warmup' ? true : Math.random() > 0.45;
    if (askCapital) {
      return {
        ...questionBase(correctCountry, 'country-to-capital', difficulty, isReview),
        question: `What is the capital city of ${correctCountry.name}?`,
        options: uniqueOptions(correctCountry.capital, distractorPool.map((country) => country.capital)),
        correctAnswer: correctCountry.capital,
        explanation: `${correctCountry.capital} is the capital of ${correctCountry.name}. Anchor it with ${correctCountry.landmark}.`,
      };
    }

    return {
      ...questionBase(correctCountry, 'capital-to-country', difficulty, isReview),
      question: `Which country has ${correctCountry.capital} as its capital?`,
      options: uniqueOptions(correctCountry.name, distractorPool.map((country) => country.name)),
      correctAnswer: correctCountry.name,
      explanation: `${correctCountry.capital} belongs to ${correctCountry.name}, a country in ${correctCountry.continent}.`,
    };
  }

  if (game === 'currency') {
    const askCurrency = difficulty !== 'sharp' || Math.random() > 0.45;
    const differentCurrencyCountries = distractorPool.filter(
      (country) => country.currency.code !== correctCountry.currency.code
    );

    if (askCurrency) {
      const correctText = `${correctCountry.currency.code} (${correctCountry.currency.symbol})`;
      return {
        ...questionBase(correctCountry, 'country-to-currency', difficulty, isReview),
        question: `Which official currency does ${correctCountry.name} use?`,
        options: uniqueOptions(correctText, differentCurrencyCountries.map((country) => `${country.currency.code} (${country.currency.symbol})`)),
        correctAnswer: correctText,
        explanation: `${correctCountry.name} uses the ${correctCountry.currency.name} (${correctCountry.currency.code}).`,
      };
    }

    return {
      ...questionBase(correctCountry, 'currency-to-country', difficulty, isReview),
      question: `Which country uses the ${correctCountry.currency.name} (${correctCountry.currency.code})?`,
      options: uniqueOptions(correctCountry.name, differentCurrencyCountries.map((country) => country.name)),
      correctAnswer: correctCountry.name,
      explanation: `${correctCountry.name} uses ${correctCountry.currency.name}; the false choices use different currencies.`,
    };
  }

  if (game === 'continent') {
    if (scope.level === 'continent') {
      const correctSubregion = getCountrySubregion(correctCountry) || scope.continent;
      const options = getSubregionsForContinent(scope.continent)
        .filter((subregion) => getScopedCountries(allCountries, {
          level: 'subregion',
          continent: scope.continent,
          subregion,
        }).length > 0);

      return {
        ...questionBase(correctCountry, 'country-to-subregion', difficulty, isReview),
        question: `Which ${scope.continent} subregion includes ${correctCountry.name}?`,
        options: shuffleItems([...options]),
        correctAnswer: correctSubregion,
        explanation: `${correctCountry.name} belongs to ${correctSubregion}.`,
      };
    }

    if (scope.level === 'subregion') {
      const siblingCountries = getSiblingCountriesForSubregion(allCountries, scope.subregion);
      return {
        ...questionBase(correctCountry, 'subregion-to-country', difficulty, isReview),
        question: `Which country belongs to ${scope.subregion}?`,
        options: uniqueOptions(correctCountry.name, siblingCountries.map((country) => country.name)),
        correctAnswer: correctCountry.name,
        explanation: `${correctCountry.name} is part of ${scope.subregion} in ${scope.continent}.`,
      };
    }

    return {
      ...questionBase(correctCountry, 'country-to-continent', difficulty, isReview),
      question: `On which continent can you locate ${correctCountry.name}?`,
      options: [...CONTINENTS],
      correctAnswer: correctCountry.continent,
      explanation: `${correctCountry.name} is in ${correctCountry.continent}.`,
    };
  }

  const styleOrder = ['jointExercise', 'borderSharing', 'sharedProjects', 'funFactsWithIndia', 'summary'] as const;
  const styleOffset = memory.games['india-trivia'].answered % styleOrder.length;
  const styles = [...styleOrder.slice(styleOffset), ...styleOrder.slice(0, styleOffset)];
  const relation = correctCountry.indiaRelation;
  const options = uniqueOptions(correctCountry.name, distractorPool.filter((country) => country.indiaRelation).map((country) => country.name));

  for (const style of styles) {
    if (style === 'jointExercise' && relation?.jointExercise) {
      return {
        ...questionBase(correctCountry, 'india-relation', difficulty, isReview),
        question: `India conducts the joint exercise "${relation.jointExercise}" with which nation?`,
        options,
        correctAnswer: correctCountry.name,
        explanation: `${correctCountry.name} is linked with India through "${relation.jointExercise}". ${relation.summary}`,
      };
    }

    if (style === 'borderSharing' && relation?.borderSharing) {
      return {
        ...questionBase(correctCountry, 'india-relation', difficulty, isReview),
        question: `Which country's India geography link is: "${relation.borderSharing}"?`,
        options,
        correctAnswer: correctCountry.name,
        explanation: `${correctCountry.name}: ${relation.borderSharing}`,
      };
    }

    if (style === 'sharedProjects' && relation?.sharedProjects) {
      return {
        ...questionBase(correctCountry, 'india-relation', difficulty, isReview),
        question: `Which country connects with India through "${relation.sharedProjects}"?`,
        options,
        correctAnswer: correctCountry.name,
        explanation: `${correctCountry.name} works with India on: ${relation.sharedProjects}`,
      };
    }

    if (style === 'funFactsWithIndia' && relation?.funFactsWithIndia?.length) {
      const fact = randomItem(relation.funFactsWithIndia);
      return {
        ...questionBase(correctCountry, 'india-relation', difficulty, isReview),
        question: `Which country shares this India link? "${fact}"`,
        options,
        correctAnswer: correctCountry.name,
        explanation: `${correctCountry.name} shares this link with India. ${relation.summary}`,
      };
    }
  }

  const summary = relation?.summary || 'Shares close historical and cultural ties with India.';
  return {
    ...questionBase(correctCountry, 'india-relation', difficulty, isReview),
    question: `India relation hint: "${summary.replace(new RegExp(correctCountry.name, 'gi'), '[this country]')}" Which country is it?`,
    options,
    correctAnswer: correctCountry.name,
    explanation: `${correctCountry.name}: ${summary}`,
  };
}

export function generateFactFictionQuestion(
  allCountries: Country[],
  scope: QuizScope,
  memory: LearningMemory
): AICountryTrivia {
  const game: QuizGameId = 'ai-trivia';
  const pool = safePool(allCountries, game, scope);
  const gameMemory = memory.games[game];
  const difficulty = getDifficulty(gameMemory);
  const { country, isReview } = pickWeightedCountry(pool, memory, game);
  const distractorPool = nearbyCountries(allCountries, pool, country, difficulty)
    .filter((item) => item.code !== country.code);
  const other = randomItem(distractorPool.length ? distractorPool : allCountries.filter((item) => item.code !== country.code));
  const trueTemplates = [
    {
      statement: `${country.name} has ${country.capital} as its capital city.`,
      explanation: `Fact. ${country.capital} is listed as the capital of ${country.name}.`,
    },
    {
      statement: `${country.name} uses ${country.currency.name} (${country.currency.code}) as its currency.`,
      explanation: `Fact. The currency for ${country.name} is ${country.currency.name} (${country.currency.code}).`,
    },
    {
      statement: `${country.name} is located in ${country.continent}.`,
      explanation: `Fact. ${country.name} is grouped under ${country.continent} in this study app.`,
    },
    {
      statement: `${country.landmark} is a landmark associated with ${country.name}.`,
      explanation: `Fact. ${country.landmark} is the landmark anchor saved for ${country.name}.`,
    },
  ];
  const falseTemplates = [
    {
      statement: `${country.name} has ${other.capital} as its capital city.`,
      explanation: `Fiction. ${other.capital} belongs to ${other.name}; ${country.name}'s capital is ${country.capital}.`,
    },
    {
      statement: `${country.name} uses ${other.currency.name} (${other.currency.code}) as its currency.`,
      explanation: `Fiction. ${country.name} uses ${country.currency.name} (${country.currency.code}).`,
    },
    {
      statement: `${country.name} is located in ${other.continent}.`,
      explanation: `Fiction. ${country.name} is in ${country.continent}.`,
    },
    {
      statement: `${other.landmark} is a landmark associated with ${country.name}.`,
      explanation: `Fiction. ${other.landmark} is associated with ${other.name}; ${country.name}'s landmark anchor is ${country.landmark}.`,
    },
  ];

  const useTrue = Math.random() > 0.5;
  const picked = randomItem(useTrue ? trueTemplates : falseTemplates);

  return {
    country: country.name,
    statement: picked.statement,
    isTrue: useTrue,
    explanation: picked.explanation,
    countryCode: country.code,
    questionKind: 'fact-fiction',
    difficulty,
    memoryHook: memoryHook(country),
    isReview,
  };
}

export function recordQuizAnswer(
  memory: LearningMemory,
  game: QuizGameId,
  question: TriviaQuestion | AICountryTrivia,
  isCorrect: boolean
): LearningMemory {
  const countryCode = question.countryCode || ('flagCode' in question ? question.flagCode : undefined);
  if (!countryCode) return memory;

  const now = Date.now();
  const gameMemory = memory.games[game] || emptyGameMemory();
  const existing = getMastery(memory, countryCode);
  const attempts = existing.attempts + 1;
  const correct = existing.correct + (isCorrect ? 1 : 0);
  const wrong = existing.wrong + (isCorrect ? 0 : 1);
  const accuracy = attempts ? correct / attempts : 0;
  const mastery = Math.max(0, Math.min(100, Math.round(accuracy * 75 + Math.min(correct, 5) * 5 - wrong * 4)));
  const reviewQueue = isCorrect
    ? gameMemory.reviewQueue.filter((code) => code !== countryCode)
    : Array.from(new Set([...gameMemory.reviewQueue, countryCode]));
  const streak = isCorrect ? gameMemory.streak + 1 : 0;

  return {
    ...memory,
    countryMastery: {
      ...memory.countryMastery,
      [countryCode]: { attempts, correct, wrong, mastery, lastSeenAt: now },
    },
    games: {
      ...memory.games,
      [game]: {
        ...gameMemory,
        recentCountryCodes: [countryCode, ...gameMemory.recentCountryCodes.filter((code) => code !== countryCode)].slice(0, RECENT_LIMIT),
        reviewQueue,
        streak,
        bestStreak: Math.max(gameMemory.bestStreak, streak),
        answered: gameMemory.answered + 1,
      },
    },
    updatedAt: now,
  };
}

export function getLearningMemorySummary(
  memory: LearningMemory,
  allCountries: Country[],
  game: QuizGameId,
  scope: QuizScope
): LearningMemorySummary {
  const pool = getPool(allCountries, game, scope);
  const codes = new Set(pool.map((country) => country.code));
  const weakCount = pool.filter((country) => {
    const mastery = getMastery(memory, country.code);
    return mastery.attempts > 0 && (mastery.mastery < 55 || mastery.wrong > mastery.correct);
  }).length;
  const masteredCount = pool.filter((country) => getMastery(memory, country.code).mastery >= 80).length;
  const gameMemory = memory.games[game];

  return {
    availableCount: pool.length,
    weakCount,
    masteredCount,
    reviewCount: gameMemory.reviewQueue.filter((code) => codes.has(code)).length,
    streak: gameMemory.streak,
    bestStreak: gameMemory.bestStreak,
  };
}

export function describeQuestion(question: TriviaQuestion | AICountryTrivia, scope: QuizScope): string {
  const difficulty = question.difficulty || 'warmup';
  const review = question.isReview ? 'Review' : 'Fresh';
  return `${review} - ${difficulty} - ${getScopeTrail(scope)}`;
}
