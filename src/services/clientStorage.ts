import type { GameStats, LearningMemory, QuizGameId } from '../types';
import type { QuizScope } from '../data/quizRegions';
import { createEmptyLearningMemory, normalizeLearningMemory } from './quizEngine';

const CLIENT_STATE_KEY = 'world_learner_client_v1';
const CLIENT_STATE_BACKUP_KEY = 'world_learner_client_backup_v1';
const LEGACY_STATS_KEY = 'world_learner_stats_v3';
const LEGACY_MEMORY_KEY = 'world_learner_memory_v1';
const SAVE_DELAY_MS = 350;

export interface AppPreferences {
  selectedContinent: string;
  indiaRelationsOnly: boolean;
  quizScopes: Record<QuizGameId, QuizScope>;
}

export interface ClientState {
  version: 1;
  stats: GameStats;
  learningMemory: LearningMemory;
  preferences: AppPreferences;
  updatedAt: number;
}

let saveTimer: ReturnType<typeof setTimeout> | null = null;
let pendingState: ClientState | null = null;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function normalizeStats(input: unknown, fallback: GameStats): GameStats {
  if (!isRecord(input)) return fallback;

  return {
    flagQuizHighScore: Number(input.flagQuizHighScore) || 0,
    capitalQuizHighScore: Number(input.capitalQuizHighScore) || 0,
    currencyHighScore: Number(input.currencyHighScore) || 0,
    continentHighScore: Number(input.continentHighScore) || 0,
    aiTriviaHighScore: Number(input.aiTriviaHighScore) || 0,
    indiaRelationHighScore: Number(input.indiaRelationHighScore) || 0,
    starsEarned: Number(input.starsEarned) || 0,
    completedBadges: Array.isArray(input.completedBadges)
      ? input.completedBadges.filter((badge): badge is string => typeof badge === 'string')
      : [],
  };
}

function normalizePreferences(input: unknown, fallback: AppPreferences): AppPreferences {
  if (!isRecord(input)) return fallback;
  const scopes = isRecord(input.quizScopes) ? input.quizScopes : {};

  return {
    selectedContinent: typeof input.selectedContinent === 'string' ? input.selectedContinent : fallback.selectedContinent,
    indiaRelationsOnly: typeof input.indiaRelationsOnly === 'boolean' ? input.indiaRelationsOnly : fallback.indiaRelationsOnly,
    quizScopes: {
      ...fallback.quizScopes,
      ...scopes,
    } as Record<QuizGameId, QuizScope>,
  };
}

function normalizeClientState(
  input: unknown,
  defaultStats: GameStats,
  defaultPreferences: AppPreferences
): ClientState {
  const record = isRecord(input) ? input : {};
  return {
    version: 1,
    stats: normalizeStats(record.stats, defaultStats),
    learningMemory: normalizeLearningMemory(record.learningMemory || createEmptyLearningMemory()),
    preferences: normalizePreferences(record.preferences, defaultPreferences),
    updatedAt: typeof record.updatedAt === 'number' ? record.updatedAt : Date.now(),
  };
}

function readJson(key: string): unknown {
  const raw = window.localStorage.getItem(key);
  return raw ? JSON.parse(raw) : undefined;
}

export function loadClientState(defaultStats: GameStats, defaultPreferences: AppPreferences): ClientState {
  if (typeof window === 'undefined') {
    return normalizeClientState(undefined, defaultStats, defaultPreferences);
  }

  try {
    const saved = readJson(CLIENT_STATE_KEY);
    if (saved) return normalizeClientState(saved, defaultStats, defaultPreferences);
  } catch (error) {
    console.warn('Primary client state is unreadable; trying recovery backup.', error);
  }

  try {
    const backup = readJson(CLIENT_STATE_BACKUP_KEY);
    if (backup) return normalizeClientState(backup, defaultStats, defaultPreferences);
  } catch (error) {
    console.warn('Client state recovery backup is unreadable.', error);
  }

  try {
    return normalizeClientState({
      stats: readJson(LEGACY_STATS_KEY),
      learningMemory: readJson(LEGACY_MEMORY_KEY),
      preferences: defaultPreferences,
    }, defaultStats, defaultPreferences);
  } catch (error) {
    console.warn('Legacy client state could not be migrated.', error);
    return normalizeClientState(undefined, defaultStats, defaultPreferences);
  }
}

function writeClientState(state: ClientState) {
  if (typeof window === 'undefined') return;
  const serialized = JSON.stringify({ ...state, version: 1, updatedAt: Date.now() });
  const current = window.localStorage.getItem(CLIENT_STATE_KEY);
  if (current) window.localStorage.setItem(CLIENT_STATE_BACKUP_KEY, current);
  window.localStorage.setItem(CLIENT_STATE_KEY, serialized);
}

export function scheduleClientStateSave(state: ClientState, onSaved?: () => void, onError?: () => void) {
  pendingState = state;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      if (pendingState) writeClientState(pendingState);
      onSaved?.();
    } catch (error) {
      console.error('Could not save client state.', error);
      onError?.();
    }
    pendingState = null;
    saveTimer = null;
  }, SAVE_DELAY_MS);
}

export function flushClientStateSave() {
  if (saveTimer) clearTimeout(saveTimer);
  try {
    if (pendingState) writeClientState(pendingState);
  } catch (error) {
    console.error('Could not flush client state.', error);
  }
  pendingState = null;
  saveTimer = null;
}

export function exportClientState(state: ClientState): string {
  return JSON.stringify({
    app: 'World Country Learner',
    exportedAt: new Date().toISOString(),
    state: { ...state, version: 1, updatedAt: Date.now() },
  }, null, 2);
}

export function parseClientStateBackup(
  text: string,
  defaultStats: GameStats,
  defaultPreferences: AppPreferences
): ClientState {
  const parsed = JSON.parse(text);
  return normalizeClientState(parsed?.state || parsed, defaultStats, defaultPreferences);
}

export function clearClientState() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(CLIENT_STATE_KEY);
  window.localStorage.removeItem(CLIENT_STATE_BACKUP_KEY);
  window.localStorage.removeItem(LEGACY_STATS_KEY);
  window.localStorage.removeItem(LEGACY_MEMORY_KEY);
}
