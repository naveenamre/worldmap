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

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  flagCode?: string;
}

export interface AICountryTrivia {
  country: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
}
