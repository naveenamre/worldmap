export interface GameStats {
  flagQuizHighScore: number;
  capitalQuizHighScore: number;
  currencyHighScore: number;
  continentHighScore: number;
  aiTriviaHighScore: number;
  indiaRelationHighScore?: number;
  starsEarned: number;
  completedBadges: string[];
}

export type ActiveSection = 'learn' | 'games' | 'guides';

export type ActiveGame = 'none' | 'flag' | 'capital' | 'currency' | 'continent' | 'ai-trivia' | 'india-trivia';

export type QuizGameId = Exclude<ActiveGame, 'none'>;

export type QuestionKind =
  | 'flag-to-country'
  | 'country-to-capital'
  | 'capital-to-country'
  | 'country-to-currency'
  | 'currency-to-country'
  | 'country-to-continent'
  | 'country-to-subregion'
  | 'subregion-to-country'
  | 'india-relation'
  | 'fact-fiction';

export type QuizDifficulty = 'warmup' | 'steady' | 'sharp';

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  flagCode?: string;
  countryCode?: string;
  questionKind?: QuestionKind;
  difficulty?: QuizDifficulty;
  memoryHook?: string;
  isReview?: boolean;
}

export interface AICountryTrivia {
  country: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
  countryCode?: string;
  questionKind?: QuestionKind;
  difficulty?: QuizDifficulty;
  memoryHook?: string;
  isReview?: boolean;
}

export interface CountryMastery {
  attempts: number;
  correct: number;
  wrong: number;
  mastery: number;
  lastSeenAt: number;
}

export interface QuizGameMemory {
  recentCountryCodes: string[];
  reviewQueue: string[];
  streak: number;
  bestStreak: number;
  answered: number;
}

export interface LearningMemory {
  version: number;
  countryMastery: Record<string, CountryMastery>;
  games: Record<QuizGameId, QuizGameMemory>;
  updatedAt: number;
}

export interface LearningMemorySummary {
  availableCount: number;
  weakCount: number;
  masteredCount: number;
  reviewCount: number;
  streak: number;
  bestStreak: number;
}
