import {
  lazy,
  Suspense,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';
import { countries, Country } from './data/countries';
import { CountryCard } from './components/CountryCard';
import { GameStats, ActiveSection, ActiveGame, TriviaQuestion, AICountryTrivia, LearningMemory, QuizGameId } from './types';
import {
  canStartQuizScope,
  createEmptyLearningMemory,
  generateFactFictionQuestion,
  generateMultipleChoiceQuestion,
  getLearningMemorySummary,
  getQuizCountryPool,
  recordQuizAnswer,
} from './services/quizEngine';
import {
  clearClientState,
  exportClientState,
  flushClientStateSave,
  loadClientState,
  parseClientStateBackup,
  scheduleClientStateSave,
  type AppPreferences,
  type ClientState,
} from './services/clientStorage';
import { countryCodeToFlagEmoji } from './services/flagEmoji';
import {
  CONTINENTS,
  WORLD_SCOPE,
  getScopeLabel,
  getScopeTrail,
  getSubregionsForContinent,
  type ContinentName,
  type QuizScope,
} from './data/quizRegions';
import { 
  Globe, Trophy, Sparkles, Star, Award, Heart, RefreshCw, CheckCircle, 
  X, HelpCircle, Compass, Search, Map, Coins, Landmark, ShieldAlert, Download, Upload, Wifi, WifiOff
} from 'lucide-react';

type QuizGame = QuizGameId;
const CountryDetailModal = lazy(() => import('./components/CountryDetailModal').then((module) => ({
  default: module.CountryDetailModal,
})));

const createDefaultQuizScopes = (): Record<QuizGame, QuizScope> => ({
  flag: WORLD_SCOPE,
  capital: WORLD_SCOPE,
  currency: WORLD_SCOPE,
  continent: WORLD_SCOPE,
  'ai-trivia': WORLD_SCOPE,
  'india-trivia': WORLD_SCOPE,
});

const DEFAULT_STATS: GameStats = {
  flagQuizHighScore: 0,
  capitalQuizHighScore: 0,
  currencyHighScore: 0,
  continentHighScore: 0,
  aiTriviaHighScore: 0,
  indiaRelationHighScore: 0,
  starsEarned: 0,
  completedBadges: [],
};

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('learn');
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [indiaRelationsOnly, setIndiaRelationsOnly] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Stats setup with LocalStorage persistence
  const [stats, setStats] = useState<GameStats>(DEFAULT_STATS);

  // Active Game State
  const [activeGame, setActiveGame] = useState<ActiveGame>('none');
  const [gameScore, setGameScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
  const [currentFlagQuestion, setCurrentFlagQuestion] = useState<TriviaQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [correctAnswerSelected, setCorrectAnswerSelected] = useState<boolean>(false);
  const [quizScopes, setQuizScopes] = useState<Record<QuizGame, QuizScope>>(createDefaultQuizScopes);
  const [activeQuizScope, setActiveQuizScope] = useState<QuizScope>(WORLD_SCOPE);
  const [learningMemory, setLearningMemory] = useState<LearningMemory>(() => createEmptyLearningMemory());
  const [isOfflineReady, setIsOfflineReady] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(() => navigator.onLine);
  const [saveStatus, setSaveStatus] = useState<'loading' | 'saving' | 'saved' | 'error'>('loading');
  const [notice, setNotice] = useState<string | null>(null);
  const [updateRegistration, setUpdateRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [expandedScopeGame, setExpandedScopeGame] = useState<QuizGame | null>(null);
  const [visibleCountryCount, setVisibleCountryCount] = useState(48);
  const importInputRef = useRef<HTMLInputElement | null>(null);
  const hasLoadedClientState = useRef(false);

  // Offline Fact or Fiction state
  const [aiTrivia, setAiTrivia] = useState<AICountryTrivia | null>(null);
  const [isLoadingAiTrivia, setIsLoadingAiTrivia] = useState<boolean>(false);
  const [aiTriviaExplanation, setAiTriviaExplanation] = useState<string>('');

  // Loaded badges definition
  const ALL_BADGES = [
    { id: 'first-stars', name: 'Explorer Cadet', desc: 'Accumulate your first 15 Stars', icon: Compass, color: 'text-sky-500 bg-sky-50 border-sky-100' },
    { id: 'flag-master', name: 'Flag Master', desc: 'Reach a High Score of 8+ in Flags Trivia', icon: Trophy, color: 'text-amber-500 bg-amber-50 border-amber-100' },
    { id: 'capital-chief', name: 'Capital Tycoon', desc: 'Reach a High Score of 8+ in Capitals Quest', icon: Landmark, color: 'text-purple-500 bg-purple-50 border-purple-100' },
    { id: 'currency-collector', name: 'Nautilus Banker', desc: 'Reach a High Score of 8+ in Currencies Match', icon: Coins, color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
    { id: 'globe-trotter', name: 'World Ambassador', desc: 'Reach a High Score of 8+ in Continents Sort', icon: Globe, color: 'text-blue-500 bg-blue-50 border-blue-100' },
    { id: 'ai-scholar', name: 'Truth Decoder', desc: 'Claim a High Score of 5+ in Fact or Fiction', icon: Sparkles, color: 'text-rose-500 bg-rose-50 border-rose-100' },
    { id: 'diplomat', name: 'Diplomacy Expert', desc: 'Score 6+ in India Connection Quiz', icon: Award, color: 'text-orange-500 bg-orange-50 border-orange-100' },
  ];

  useEffect(() => {
    const defaultPreferences: AppPreferences = {
      selectedContinent: 'All',
      indiaRelationsOnly: false,
      quizScopes: createDefaultQuizScopes(),
    };
    const saved = loadClientState(DEFAULT_STATS, defaultPreferences);
    setStats(saved.stats);
    setLearningMemory(saved.learningMemory);
    setSelectedContinent(saved.preferences.selectedContinent);
    setIndiaRelationsOnly(saved.preferences.indiaRelationsOnly);
    setQuizScopes(saved.preferences.quizScopes);
    setSaveStatus('saved');
    hasLoadedClientState.current = true;

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(() => setIsOfflineReady(true))
        .catch(() => setIsOfflineReady(false));
    }

    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      setIsOfflineReady((current) => current || !navigator.onLine);
    };
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    const handleUpdateReady = (event: Event) => {
      const registration = (event as CustomEvent<ServiceWorkerRegistration>).detail;
      setUpdateRegistration(registration);
    };
    window.addEventListener('world-learner-update-ready', handleUpdateReady);
    window.addEventListener('beforeunload', flushClientStateSave);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      window.removeEventListener('world-learner-update-ready', handleUpdateReady);
      window.removeEventListener('beforeunload', flushClientStateSave);
      flushClientStateSave();
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedClientState.current) return;

    setSaveStatus('saving');
    const state: ClientState = {
      version: 1,
      stats,
      learningMemory,
      preferences: { selectedContinent, indiaRelationsOnly, quizScopes },
      updatedAt: Date.now(),
    };

    scheduleClientStateSave(
      state,
      () => setSaveStatus('saved'),
      () => setSaveStatus('error')
    );
  }, [stats, learningMemory, selectedContinent, indiaRelationsOnly, quizScopes]);

  const withUnlockedBadges = (newStats: GameStats): GameStats => {
    const unlocked: string[] = [];
    if (newStats.starsEarned >= 15) unlocked.push('first-stars');
    if (newStats.flagQuizHighScore >= 8) unlocked.push('flag-master');
    if (newStats.capitalQuizHighScore >= 8) unlocked.push('capital-chief');
    if (newStats.currencyHighScore >= 8) unlocked.push('currency-collector');
    if (newStats.continentHighScore >= 8) unlocked.push('globe-trotter');
    if (newStats.aiTriviaHighScore >= 5) unlocked.push('ai-scholar');
    if ((newStats.indiaRelationHighScore || 0) >= 6) unlocked.push('diplomat');

    return { ...newStats, completedBadges: unlocked };
  };

  // Update badges when stats change
  const saveStats = (newStats: GameStats) => {
    setStats(withUnlockedBadges(newStats));
  };

  const addStars = (amount: number) => {
    setStats((current) => withUnlockedBadges({ ...current, starsEarned: current.starsEarned + amount }));
  };

  const getCountryPool = (game: ActiveGame, scope: QuizScope = activeQuizScope): Country[] => {
    if (game === 'none') return countries;
    return getQuizCountryPool(countries, game, scope);
  };

  const canStartGameScope = (game: QuizGame, scope: QuizScope): boolean => {
    return canStartQuizScope(countries, game, scope);
  };

  const updateQuizScope = (game: QuizGame, scope: QuizScope) => {
    setQuizScopes((current) => ({ ...current, [game]: scope }));
  };

  // Generate offline fact-or-fiction trivia from local country data.
  const fetchAiTriviaQuestion = (scope: QuizScope = activeQuizScope, memoryOverride: LearningMemory = learningMemory) => {
    setIsLoadingAiTrivia(false);
    setHasAnswered(false);
    setSelectedAnswer(null);
    setCorrectAnswerSelected(false);
    setAiTriviaExplanation('');
    setAiTrivia(generateFactFictionQuestion(countries, scope, memoryOverride));
  };

  const queueNextQuestion = (
    game: ActiveGame,
    scope: QuizScope = activeQuizScope,
    memoryOverride: LearningMemory = learningMemory
  ) => {
    if (game === 'none') return;

    if (game === 'ai-trivia') {
      fetchAiTriviaQuestion(scope, memoryOverride);
      return;
    }

    setCurrentFlagQuestion(generateMultipleChoiceQuestion(game, countries, scope, memoryOverride));
  };

  // Start a chosen quiz game
  const handleStartGame = (game: ActiveGame, scope: QuizScope = activeQuizScope) => {
    setActiveGame(game);
    setActiveQuizScope(scope);
    setGameScore(0);
    setLives(3);
    setQuestionsAnswered(0);
    setHasAnswered(false);
    setSelectedAnswer(null);

    queueNextQuestion(game, scope, learningMemory);
  };

  // Submit response for multiple-choice questions (flag, capital, currency, continent)
  const handleSubmitAnswer = (option: string) => {
    if (hasAnswered) return;
    setSelectedAnswer(option);
    setHasAnswered(true);

    const isCorrect = option === currentFlagQuestion?.correctAnswer;
    setCorrectAnswerSelected(isCorrect);

    if (isCorrect) {
      setGameScore(prev => prev + 1);
      addStars(2); // Earn 2 stars per correct trivia answer
    } else {
      setLives(prev => Math.max(0, prev - 1));
    }

    if (activeGame !== 'none' && currentFlagQuestion) {
      const updatedMemory = recordQuizAnswer(learningMemory, activeGame, currentFlagQuestion, isCorrect);
      setLearningMemory(updatedMemory);
    }

    setQuestionsAnswered(prev => prev + 1);
  };

  // Submit true/false guess in AI mode
  const handleAiGuess = (guess: boolean) => {
    if (!aiTrivia || hasAnswered) return;
    setHasAnswered(true);
    const isCorrect = guess === aiTrivia.isTrue;
    setCorrectAnswerSelected(isCorrect);
    setSelectedAnswer(guess ? "True" : "False");
    setAiTriviaExplanation(aiTrivia.explanation);

    if (isCorrect) {
      setGameScore(prev => prev + 1);
      addStars(3); // Earn 3 stars for nailing tricky AI statements!
    } else {
      setLives(prev => Math.max(0, prev - 1));
    }

    const updatedMemory = recordQuizAnswer(learningMemory, 'ai-trivia', aiTrivia, isCorrect);
    setLearningMemory(updatedMemory);

    setQuestionsAnswered(prev => prev + 1);
  };

  // Advance to next question or conclude game
  const handleNextQuestion = () => {
    setHasAnswered(false);
    setSelectedAnswer(null);

    // If out of lives, end immediately
    if (lives <= 0) {
      concludeGame();
      return;
    }

    queueNextQuestion(activeGame, activeQuizScope, learningMemory);
  };

  const concludeGame = () => {
    // Check for high-score updates
    const currentStats = { ...stats };
    let scoreUpdated = false;

    if (activeGame === 'flag' && gameScore > currentStats.flagQuizHighScore) {
      currentStats.flagQuizHighScore = gameScore;
      scoreUpdated = true;
    } else if (activeGame === 'capital' && gameScore > currentStats.capitalQuizHighScore) {
      currentStats.capitalQuizHighScore = gameScore;
      scoreUpdated = true;
    } else if (activeGame === 'currency' && gameScore > currentStats.currencyHighScore) {
      currentStats.currencyHighScore = gameScore;
      scoreUpdated = true;
    } else if (activeGame === 'continent' && gameScore > currentStats.continentHighScore) {
      currentStats.continentHighScore = gameScore;
      scoreUpdated = true;
    } else if (activeGame === 'ai-trivia' && gameScore > currentStats.aiTriviaHighScore) {
      currentStats.aiTriviaHighScore = gameScore;
      scoreUpdated = true;
    } else if (activeGame === 'india-trivia' && gameScore > (currentStats.indiaRelationHighScore || 0)) {
      currentStats.indiaRelationHighScore = gameScore;
      scoreUpdated = true;
    }

    if (scoreUpdated || lives === 0) {
      saveStats(currentStats);
    }
  };

  const handleExitGame = () => {
    concludeGame();
    setActiveGame('none');
  };

  // Reset all game data progress safely
  const resetAllProgress = () => {
    clearClientState();
    setStats(DEFAULT_STATS);
    setLearningMemory(createEmptyLearningMemory());
    setQuizScopes(createDefaultQuizScopes());
    setSelectedContinent('All');
    setIndiaRelationsOnly(false);
    setConfirmResetOpen(false);
    setNotice('Progress reset. Your next answer will start a fresh learning profile.');
  };

  const handleExportProgress = () => {
    const state: ClientState = {
      version: 1,
      stats,
      learningMemory,
      preferences: { selectedContinent, indiaRelationsOnly, quizScopes },
      updatedAt: Date.now(),
    };
    const blob = new Blob([exportClientState(state)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `world-learner-progress-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearOfflineMaps = () => {
    navigator.serviceWorker.controller?.postMessage({ type: 'CLEAR_MAP_CACHE' });
    setNotice('Previously opened offline maps were cleared. Maps will cache again when opened.');
  };

  const handleImportProgress = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imported = parseClientStateBackup(await file.text(), DEFAULT_STATS, {
        selectedContinent: 'All',
        indiaRelationsOnly: false,
        quizScopes: createDefaultQuizScopes(),
      });
      setStats(imported.stats);
      setLearningMemory(imported.learningMemory);
      setSelectedContinent(imported.preferences.selectedContinent);
      setIndiaRelationsOnly(imported.preferences.indiaRelationsOnly);
      setQuizScopes(imported.preferences.quizScopes);
      setNotice('Progress imported successfully.');
    } catch (error) {
      console.error('Could not import progress backup', error);
      setNotice('Import failed. Choose a valid World Learner progress JSON file.');
    } finally {
      event.target.value = '';
    }
  };

  const deferredSearchQuery = useDeferredValue(searchQuery);
  const filteredCountries = useMemo(() => {
    const cleanQuery = deferredSearchQuery.trim().toLowerCase();

    return countries.filter((country) => {
      const matchContinent = selectedContinent === 'All' || country.continent === selectedContinent;
      const matchIndiaRelations = !indiaRelationsOnly || country.indiaRelation !== undefined;
      const matchSearch = cleanQuery === '' ||
        country.name.toLowerCase().includes(cleanQuery) ||
        country.capital.toLowerCase().includes(cleanQuery) ||
        country.landmark.toLowerCase().includes(cleanQuery) ||
        country.continent.toLowerCase().includes(cleanQuery) ||
        country.languages.some((language) => language.toLowerCase().includes(cleanQuery)) ||
        country.currency.code.toLowerCase().includes(cleanQuery) ||
        country.currency.name.toLowerCase().includes(cleanQuery);

      return matchContinent && matchIndiaRelations && matchSearch;
    });
  }, [deferredSearchQuery, selectedContinent, indiaRelationsOnly]);
  const visibleCountries = filteredCountries.slice(0, visibleCountryCount);

  useEffect(() => {
    setVisibleCountryCount(48);
  }, [deferredSearchQuery, selectedContinent, indiaRelationsOnly]);

  const renderQuizScopePicker = (game: QuizGame, startLabel: string, buttonClassName: string) => {
    const selectedScope = quizScopes[game];
    const focusedContinent = selectedScope.level === 'world' ? null : selectedScope.continent;
    const selectedCount = getCountryPool(game, selectedScope).length;
    const canStart = canStartGameScope(game, selectedScope);
    const memorySummary = getLearningMemorySummary(learningMemory, countries, game, selectedScope);
    const isExpanded = expandedScopeGame === game;
    const makeId = (label: string) => label.replace(/[^a-z0-9]+/gi, '-').toLowerCase();

    const renderScopeButton = (label: string, scope: QuizScope) => {
      const count = getCountryPool(game, scope).length;
      const isSelected = getScopeTrail(selectedScope) === getScopeTrail(scope);
      const isAvailable = canStartGameScope(game, scope);

      return (
        <button
          key={getScopeTrail(scope)}
          id={`scope-${game}-${makeId(label)}`}
          type="button"
          disabled={!isAvailable}
          title={isAvailable ? `${count} countries available` : `${count} countries available; choose a larger study area`}
          onClick={() => updateQuizScope(game, scope)}
          className={`min-h-9 px-3 py-2 rounded-lg border text-[11px] font-extrabold transition-all flex items-center justify-between gap-2 ${
            isSelected
              ? 'bg-blue-100 border-blue-300 text-blue-800 shadow-2xs'
              : isAvailable
              ? 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50 hover:text-slate-900 cursor-pointer'
              : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
          }`}
        >
          <span className="truncate">{label}</span>
          <span className="text-[10px] opacity-70 shrink-0">{count}</span>
        </button>
      );
    };

    return (
      <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-wider font-black text-slate-400">
              Study Area
            </span>
            <p className="text-xs font-bold text-slate-700 truncate">
              {getScopeTrail(selectedScope)} · {selectedCount} countries
            </p>
          </div>
          <button
            type="button"
            onClick={() => setExpandedScopeGame(isExpanded ? null : game)}
            className="min-h-10 shrink-0 rounded-lg border border-slate-200 bg-white px-3 text-[11px] font-bold text-slate-600 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Close' : 'Change'}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-2 py-2">
            <p className="text-[10px] font-black text-emerald-700">{memorySummary.masteredCount}</p>
            <p className="text-[9px] uppercase tracking-wider font-bold text-emerald-600">Mastered</p>
          </div>
          <div className="rounded-lg bg-rose-50 border border-rose-100 px-2 py-2">
            <p className="text-[10px] font-black text-rose-700">{memorySummary.weakCount}</p>
            <p className="text-[9px] uppercase tracking-wider font-bold text-rose-600">Weak</p>
          </div>
          <div className="rounded-lg bg-amber-50 border border-amber-100 px-2 py-2">
            <p className="text-[10px] font-black text-amber-700">{memorySummary.bestStreak}</p>
            <p className="text-[9px] uppercase tracking-wider font-bold text-amber-600">Best</p>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
            <div className="grid grid-cols-2 gap-2">
              {renderScopeButton('World', WORLD_SCOPE)}
              {CONTINENTS.map((continent) => renderScopeButton(continent, { level: 'continent', continent }))}
            </div>

            {focusedContinent && (
              <div className="space-y-2 border-t border-slate-200 pt-3">
                <div className="text-[10px] uppercase tracking-wider font-black text-slate-400">
                  {focusedContinent} Subregions
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {getSubregionsForContinent(focusedContinent as ContinentName).map((subregion) =>
                    renderScopeButton(subregion, { level: 'subregion', continent: focusedContinent as ContinentName, subregion })
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <button
          id={`play-game-${game}`}
          type="button"
          onClick={() => handleStartGame(game, selectedScope)}
          disabled={!canStart}
          className={`mt-2 font-bold text-sm py-3 px-4 rounded-xl transition-all w-full ${
            canStart
              ? `${buttonClassName} cursor-pointer`
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {canStart ? `${startLabel}: ${getScopeLabel(selectedScope)}` : `Need more countries for ${getScopeLabel(selectedScope)}`}
        </button>
      </div>
    );
  };

  const activeQuestionDifficulty = currentFlagQuestion?.difficulty || aiTrivia?.difficulty || 'warmup';
  const activeQuestionIsReview = Boolean(currentFlagQuestion?.isReview || aiTrivia?.isReview);
  const activeMemoryHook = currentFlagQuestion?.memoryHook || aiTrivia?.memoryHook;
  const activeGameMemory = activeGame !== 'none' ? learningMemory.games[activeGame] : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-800">
      
      {/* Interactive Main Header */}
      <header className="bg-white border-b border-slate-100 sm:sticky sm:top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Logo Brand / Human Labels */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
              <Globe className="w-6 h-6 animate-spin-slow" />
            </div>
            <div className="min-w-0">
              <h1 className="font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight text-slate-900 truncate">
                World Country Learner
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">Offline geography study suite</p>
            </div>
          </div>

          {/* User Score Info Bar / Stats Drawer */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto bg-slate-50 p-1.5 sm:p-2 rounded-xl border border-slate-100/80">
            <div className={`flex min-h-9 items-center gap-1.5 px-2.5 rounded-lg border select-none shrink-0 ${
              isOfflineReady || !isOnline
                ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                : 'bg-slate-100 border-slate-200 text-slate-500'
            }`}>
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {!isOnline ? 'Offline' : isOfflineReady ? 'Ready' : 'Caching'}
              </span>
            </div>

            <div className="flex min-h-9 items-center gap-1.5 px-2.5 bg-amber-500/10 border border-amber-500/15 text-amber-700 rounded-lg select-none shrink-0">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="font-extrabold text-sm">{stats.starsEarned}</span>
              <span className="text-[10px] text-amber-600 font-semibold uppercase tracking-wider ml-0.5">Stars</span>
            </div>

            <div className="hidden md:flex min-h-9 items-center gap-1 px-2.5 bg-purple-50 border border-purple-100 text-purple-700 rounded-lg select-none shrink-0">
               <Award className="w-4 h-4" />
               <span className="font-bold text-sm leading-none">{stats.completedBadges.length} / 7</span>
               <span className="text-[9px] font-bold text-purple-600 uppercase tracking-widest hidden md:inline ml-1">Badges</span>
             </div>

            <input
              ref={importInputRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={handleImportProgress}
            />

            <button
              id="export-progress-button"
              onClick={handleExportProgress}
              className="min-h-9 min-w-9 text-xs font-semibold text-slate-500 hover:text-blue-700 hover:bg-blue-50 px-2 rounded-lg transition-all inline-flex items-center justify-center gap-1 shrink-0 focus-visible:outline-2 focus-visible:outline-blue-600"
              title="Export learning memory backup"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Export</span>
            </button>

            <button
              id="import-progress-button"
              onClick={() => importInputRef.current?.click()}
              className="min-h-9 min-w-9 text-xs font-semibold text-slate-500 hover:text-blue-700 hover:bg-blue-50 px-2 rounded-lg transition-all inline-flex items-center justify-center gap-1 shrink-0 focus-visible:outline-2 focus-visible:outline-blue-600"
              title="Import learning memory backup"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Import</span>
            </button>

            <button 
              id="reset-overall-button"
              onClick={() => setConfirmResetOpen(true)}
              className="min-h-9 text-xs font-semibold text-slate-400 hover:text-rose-600 hover:bg-rose-50 px-2 rounded-lg transition-all shrink-0 focus-visible:outline-2 focus-visible:outline-rose-600"
              title="Reset high scores and badges reset"
            >
              Reset
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 shrink-0" role="status">
              {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'error' ? 'Save error' : 'Saved'}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Achievement Rack Banner (Persistent) */}
      <section className="bg-slate-900 text-white py-4 sm:py-6 px-4 shrink-0 text-center relative border-b border-slate-800">
        <div className="absolute inset-0 bg-linear-to-r from-blue-900/10 via-purple-950/20 to-slate-900 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-xs uppercase tracking-widest font-black text-blue-400">🏆 Learning Milestone Track</h2>
          
          {/* Badge Display Row */}
          <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-3 sm:mt-4 overflow-x-auto snap-x pb-1">
            {ALL_BADGES.map((b) => {
              const IconComp = b.icon;
              const isUnlocked = stats.completedBadges.includes(b.id);
              return (
                <div 
                  key={b.id}
                  className={`min-w-32 sm:min-w-0 snap-start p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all shadow-xs group cursor-default relative ${
                    isUnlocked 
                      ? 'bg-slate-800/80 border-slate-700 text-white' 
                      : 'bg-slate-850/40 border-slate-800/80 text-slate-500 opacity-60'
                  }`}
                  title={`${b.desc} ${isUnlocked ? '(UNLOCKED!)' : '(LOCKED)'}`}
                >
                  <div className={`p-2 rounded-full mb-1.5 transition-transform group-hover:scale-105 ${
                    isUnlocked ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-600'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold truncate max-w-full leading-tight">{b.name}</h4>
                  <p className="text-[9px] text-slate-400 line-clamp-1 mt-0.5">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Secondary Tab Selectors */}
      <nav className="bg-white border-b border-slate-100 flex justify-center sticky top-0 sm:top-[77px] z-30 shadow-xs/60">
        <div className="grid grid-cols-2 gap-1.5 p-2 w-full max-w-xl">
          <button
            id="nav-tab-learn"
            onClick={() => { setActiveSection('learn'); handleExitGame(); }}
            className={`min-h-11 flex items-center justify-center gap-2 px-3 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              activeSection === 'learn' && activeGame === 'none'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Compass className="w-4.5 h-4.5" />
            <span className="truncate">Study Countries</span>
          </button>

          <button
            id="nav-tab-games"
            onClick={() => setActiveSection('games')}
            className={`min-h-11 flex items-center justify-center gap-2 px-3 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              activeSection === 'games' || activeGame !== 'none'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Trophy className="w-4.5 h-4.5" />
            <span className="truncate">Practice Quizzes</span>
          </button>
        </div>
      </nav>

      {/* Outer Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6">
        
        {/* ================= SECTION A: DETAILED LEARN & EXPLORE ================= */}
        {activeSection === 'learn' && activeGame === 'none' && (
          <div className="space-y-6">
            
            {/* Filter Pill and Search Panel */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                
                {/* Search Text Bar */}
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="country-search-bar"
                    type="text"
                    placeholder="Search by country, capital city, language, landmark..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-100 focus:border-blue-600 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-200 hover:bg-slate-300 rounded-full p-1 text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* India Relations Fast Filter Switch */}
                <button
                  id="toggle-india-relations-filter"
                  onClick={() => setIndiaRelationsOnly(!indiaRelationsOnly)}
                  className={`flex items-center gap-2.5 p-2 px-4 rounded-2xl border transition-all cursor-pointer ${
                    indiaRelationsOnly
                      ? 'bg-orange-50 border-orange-200 text-orange-800 font-extrabold shadow-2xs'
                      : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  <span className="text-sm">🇮🇳</span>
                  <span className="text-xs font-bold font-sans">Diplomatic India Ties Only</span>
                  <div className={`w-3 h-3 rounded-full ${indiaRelationsOnly ? 'bg-orange-500 animate-pulse' : 'bg-slate-300'}`} />
                </button>

                {/* Info summary labels */}
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider shrink-0 select-none">
                  Showing {filteredCountries.length} of {countries.length} World Countries
                </span>
              </div>

              {/* Continent Filter Scroller */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Map className="w-3.5 h-3.5" /> Filter by Continent
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {["All", "Africa", "Asia", "Europe", "North America", "South America", "Oceania"].map((con) => (
                    <button
                      key={con}
                      id={`filter-continent-${con.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => setSelectedContinent(con)}
                      className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition-all cursor-pointer border ${
                        selectedContinent === con
                          ? 'bg-blue-100 border-blue-200 text-blue-700 shadow-2xs'
                          : 'bg-white border-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {con}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Empty Search Fallback */}
            {filteredCountries.length === 0 && (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-150 shadow-xs max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg text-slate-800">No Countries Found</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  We couldn't find a matchmaking country for "<span className="font-semibold text-slate-700">{searchQuery}</span>" in continent {selectedContinent}.
                </p>
                <button
                  id="reset-filters-shortcut"
                  onClick={() => { setSearchQuery(''); setSelectedContinent('All'); }}
                  className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 text-xs rounded-xl transition-all cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Country Cards Responsive Grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {visibleCountries.map((c) => (
                <CountryCard
                  key={c.code}
                  country={c}
                  onClick={() => setSelectedCountry(c)}
                />
              ))}
            </div>

            {visibleCountries.length < filteredCountries.length && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCountryCount((count) => count + 48)}
                  className="min-h-11 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Show more countries ({filteredCountries.length - visibleCountries.length} remaining)
                </button>
              </div>
            )}

          </div>
        )}

        {/* ================= SECTION B: PLAY RECREATIONAL QUIZ ZONE ================= */}
        {(activeSection === 'games' || activeGame !== 'none') && (
          <div className="space-y-6">
            
            {/* GAME BOARD SCREEN LOBBY (If no active game is selected) */}
            {activeGame === 'none' && (
              <div className="space-y-6">
                
                {/* Intro Title and Motivation tagline */}
                <div className="text-center max-w-2xl mx-auto py-4">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    The World Geographer Quiz Zone
                  </h2>
                  <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                    Test your memory and complete challenges to earn gold stars! Push your high score limit to unlock professional diplomat and geographer medallions.
                  </p>
                </div>

                {/* Grid of Interactive Games */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* GAME 1: FLAG TRIVIA */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col justify-between hover:border-blue-200 hover:shadow-md transition-all duration-350">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                        🚩
                      </div>
                      <h3 className="font-extrabold text-slate-800 text-lg mt-4 flex items-center gap-2">
                        National Flag Matcher
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Examine various flags from different continents of the world and match them correctly with their host countries.
                      </p>
                      
                      <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">Personal Best:</span>
                        <span className="font-bold text-slate-800">{stats.flagQuizHighScore} points</span>
                      </div>
                    </div>
                    {renderQuizScopePicker('flag', 'Begin Flags Match', 'bg-slate-900 hover:bg-slate-800 text-white')}
                  </div>

                  {/* GAME 2: CAPITAL QUEST */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col justify-between hover:border-blue-200 hover:shadow-md transition-all duration-350">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                        🏛️
                      </div>
                      <h3 className="font-extrabold text-slate-800 text-lg mt-4 flex items-center gap-2">
                        Capitals Explorer
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        How well do you know key political administrative centers? Match capitals with the correct geographic nations.
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">Personal Best:</span>
                        <span className="font-bold text-slate-800">{stats.capitalQuizHighScore} points</span>
                      </div>
                    </div>
                    {renderQuizScopePicker('capital', 'Begin Capitals Challenge', 'bg-slate-900 hover:bg-slate-800 text-white')}
                  </div>

                  {/* GAME 3: CURRENCY SORT */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col justify-between hover:border-blue-200 hover:shadow-md transition-all duration-350">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg">
                        💵
                      </div>
                      <h3 className="font-extrabold text-slate-800 text-lg mt-4 flex items-center gap-2">
                        Currencies & Money
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Match national currencies (symbols and ISO codes like USD, EUR, CAD, INR, JPY) to their countries of circulation.
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">Personal Best:</span>
                        <span className="font-bold text-slate-800">{stats.currencyHighScore} points</span>
                      </div>
                    </div>
                    {renderQuizScopePicker('currency', 'Begin Currency Quiz', 'bg-slate-900 hover:bg-slate-800 text-white')}
                  </div>

                  {/* GAME 4: CONTINENT SORT */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col justify-between hover:border-blue-200 hover:shadow-md transition-all duration-350">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-lg">
                        🌍
                      </div>
                      <h3 className="font-extrabold text-slate-800 text-lg mt-4 flex items-center gap-2">
                        Continents Sorter
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Put your spatial geographer skills to the test! Determine which continent each nation physically occupies.
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">Personal Best:</span>
                        <span className="font-bold text-slate-800">{stats.continentHighScore} points</span>
                      </div>
                    </div>
                    {renderQuizScopePicker('continent', 'Begin Region Sorter', 'bg-slate-900 hover:bg-slate-800 text-white')}
                  </div>

                  {/* GAME 5: OFFLINE FACT OR FICTION */}
                  <div className="bg-white rounded-2xl border border-purple-200 p-5 flex flex-col justify-between hover:border-purple-300 hover:shadow-md transition-all duration-350 bg-gradient-to-br from-white to-purple-50/20 relative overflow-hidden">
                    {/* Sparkly overlay tag */}
                    <span className="absolute top-3 right-3 text-[10px] font-extrabold text-purple-700 bg-purple-100 border border-purple-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Offline
                    </span>

                    <div>
                      <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">
                        🤖
                      </div>
                      <h3 className="font-extrabold text-slate-800 text-lg mt-4 flex items-center gap-2">
                        Fact or Fiction
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Play true-or-false trivia from local country data. Spot the believable lie before it sticks in memory.
                      </p>

                      <div className="mt-4 pt-3 border-t border-purple-100/60 flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">Personal Best:</span>
                        <span className="font-bold text-purple-700">{stats.aiTriviaHighScore} points</span>
                      </div>
                    </div>
                    {renderQuizScopePicker('ai-trivia', 'Begin Fact or Fiction', 'bg-purple-700 hover:bg-purple-600 text-white shadow-xs shadow-purple-600/10')}
                  </div>

                  {/* GAME 6: INDIA CONNECTION STRATEGIC TRIVIA */}
                  <div className="bg-white rounded-2xl border border-orange-200 p-5 flex flex-col justify-between hover:border-orange-300 hover:shadow-md transition-all duration-350 bg-gradient-to-br from-white to-orange-50/20 relative overflow-hidden">
                    <span className="absolute top-3 right-3 text-[10px] font-extrabold text-orange-700 bg-orange-100 border border-orange-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Study Focus
                    </span>

                    <div>
                      <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg select-none">
                        🇮🇳
                      </div>
                      <h3 className="font-extrabold text-slate-800 text-lg mt-4 flex items-center gap-2">
                        Bilateral India Relations
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Master the complex joint exercises, sovereign land/sea borders, strategic developmental funding, and bilateral ties between India and global countries!
                      </p>

                      <div className="mt-4 pt-3 border-t border-orange-100/60 flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">Personal Best:</span>
                        <span className="font-bold text-orange-700">{stats.indiaRelationHighScore || 0} points</span>
                      </div>
                    </div>
                    {renderQuizScopePicker('india-trivia', 'Begin India Trivia Study', 'bg-orange-600 hover:bg-orange-500 text-white shadow-xs shadow-orange-600/10')}
                  </div>

                </div>

              </div>
            )}

            {/* ================= ACTIVE LIVE GAME INTERFACE SCREEN ================= */}
            {activeGame !== 'none' && (
              <div className="max-w-2xl mx-auto bg-white border border-slate-150 rounded-2xl p-4 sm:p-8 shadow-xl relative overflow-hidden animate-fadeIn duration-250">
                
                {/* Game header: Lives counters & Current high scores */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4 mb-6">
                  
                  {/* Game Label with back trigger */}
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-blue-600 tracking-wider">
                      Active Practice Game
                    </span>
                    <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-1.5 uppercase tracking-wide leading-none mt-0.5">
                      {activeGame === 'flag' && '🚩 Flag Matcher'}
                      {activeGame === 'capital' && '🏛️ Capitals Explorer'}
                      {activeGame === 'currency' && '💵 Currency Quiz'}
                      {activeGame === 'continent' && '🌍 Continent Sorter'}
                      {activeGame === 'ai-trivia' && 'Fact or Fiction'}
                      {activeGame === 'india-trivia' && '🇮🇳 Bilateral India Relations'}
                    </h3>
                    <p className="mt-1 text-[11px] font-bold text-slate-500 normal-case tracking-normal">
                      {getScopeTrail(activeQuizScope)}
                    </p>
                  </div>

                  {/* Lifeline stats shelf */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    
                    {/* Score ticker */}
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Session Score</p>
                      <p className="text-xl font-black text-slate-800">{gameScore}</p>
                    </div>

                    {/* Hearts / Lives indicator */}
                    <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl flex items-center gap-1">
                      {[1, 2, 3].map((heartIdx) => (
                        <Heart 
                          key={heartIdx} 
                          className={`w-5 h-5 shrink-0 transition-transform ${
                            heartIdx <= lives 
                              ? 'text-rose-500 fill-rose-500 animate-pulse' 
                              : 'text-slate-300 fill-transparent'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>

                </div>

                <div className="mb-6 space-y-3">
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${Math.min(100, (questionsAnswered % 10) * 10)}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-wider">
                    <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-full">
                      {activeQuestionDifficulty} difficulty
                    </span>
                    {activeQuestionIsReview && (
                      <span className="bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-full">
                        Review comeback
                      </span>
                    )}
                    {activeGameMemory && (
                      <>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full">
                          Streak {activeGameMemory.streak}
                        </span>
                        <span className="bg-slate-50 text-slate-600 border border-slate-100 px-2.5 py-1 rounded-full">
                          Review queue {activeGameMemory.reviewQueue.length}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* GAME STATE CHECK: DEAD / LIVES RUN OUT */}
                {lives <= 0 ? (
                  <div className="text-center py-6 animation-fadeIn space-y-5">
                    <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center mx-auto">
                      <Compass className="w-8 h-8" />
                    </div>
                    
                    <div>
                      <h4 className="font-black text-slate-800 text-2xl tracking-tight">Game Over!</h4>
                      <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
                        You ran out of lives! Excellent effort study partner, you racked up a fine score.
                      </p>
                      {activeGameMemory && (
                        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                          <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-2">
                            <p className="text-base font-black text-emerald-700">{activeGameMemory.bestStreak}</p>
                            <p className="text-[9px] uppercase font-bold text-emerald-600">Best streak</p>
                          </div>
                          <div className="rounded-lg bg-amber-50 border border-amber-100 p-2">
                            <p className="text-base font-black text-amber-700">{activeGameMemory.reviewQueue.length}</p>
                            <p className="text-[9px] uppercase font-bold text-amber-600">To review</p>
                          </div>
                          <div className="rounded-lg bg-blue-50 border border-blue-100 p-2">
                            <p className="text-base font-black text-blue-700">{questionsAnswered}</p>
                            <p className="text-[9px] uppercase font-bold text-blue-600">Answered</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* High score report */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 inline-block font-medium text-sm text-slate-600">
                      🏅 Score gained: <strong className="text-slate-950 font-bold">{gameScore} answers correct!</strong>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                      <button
                        onClick={() => handleStartGame(activeGame)}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="w-4.5 h-4.5" /> Repeat Game
                      </button>
                      
                      <button
                        onClick={handleExitGame}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-850 font-bold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer"
                      >
                        Lobby Main Menu
                      </button>
                    </div>
                  </div>
                ) : (
                  
                  /* OTHERWISE GAME IS ACTIVE */
                  <div>
                    
                    {/* STANDARD TRIVIA QUESTIONS VIEW (FLAGS, CAPITALS, CURRENCY, CONTINENT, INDIA-TRIVIA) */}
                    {(activeGame === 'flag' || activeGame === 'capital' || activeGame === 'currency' || activeGame === 'continent' || activeGame === 'india-trivia') && currentFlagQuestion && (
                      <div className="space-y-6">
                        
                        {/* If Flag quiz, display large centering flag */}
                        {activeGame === 'flag' && currentFlagQuestion.flagCode && (
                          <div className="flex justify-center py-2 select-none">
                            <div className="relative aspect-[3/2] w-48 rounded-2xl overflow-hidden border border-slate-200/60 shadow-md bg-white flex items-center justify-center">
                              <span className="text-7xl leading-none" role="img" aria-label="Secret country flag">
                                {countryCodeToFlagEmoji(currentFlagQuestion.flagCode)}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Question headline */}
                        <div className="text-center">
                          <h4 className="text-base sm:text-lg font-extrabold text-slate-850 leading-snug">
                            {currentFlagQuestion.question}
                          </h4>
                          {activeGame !== 'flag' && currentFlagQuestion.flagCode && !hasAnswered && (
                            <span className="inline-block mt-3 bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                              💡 Clue: ISO {currentFlagQuestion.flagCode.toUpperCase()}
                            </span>
                          )}
                        </div>

                        {/* Multi Choice Answer Option Buttons Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          {currentFlagQuestion.options.map((option, idx) => {
                            const isCorrectAnswer = option === currentFlagQuestion.correctAnswer;
                            const isSelected = option === selectedAnswer;
                            
                            let btnStyle = "bg-white border-slate-150 hover:bg-slate-50 text-slate-700 active:bg-slate-100";
                            
                            if (hasAnswered) {
                              if (isCorrectAnswer) {
                                btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold";
                              } else if (isSelected) {
                                btnStyle = "bg-rose-50 border-rose-300 text-rose-800 font-bold line-through";
                              } else {
                                btnStyle = "bg-white border-slate-100 text-slate-400 opacity-60";
                              }
                            }

                            return (
                              <button
                                key={idx}
                                onClick={() => handleSubmitAnswer(option)}
                                disabled={hasAnswered}
                                className={`text-left p-4 border rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer ${btnStyle}`}
                              >
                                <span>{option}</span>
                                {hasAnswered && isCorrectAnswer && (
                                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                                )}
                                {hasAnswered && isSelected && !isCorrectAnswer && (
                                  <X className="w-5 h-5 text-rose-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Interactive Feedback banner */}
                        {hasAnswered && (
                          <div className={`p-4 sm:p-5 rounded-2xl border leading-relaxed animate-slideUp text-sm ${
                            correctAnswerSelected 
                              ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                              : 'bg-rose-50/50 border-rose-100 text-slate-700'
                          }`}>
                            <div className="flex gap-2 items-start">
                              {correctAnswerSelected ? (
                                <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                              ) : (
                                <HelpCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                              )}
                              <div>
                                <span className="font-extrabold uppercase text-xs tracking-wider block mb-0.5">
                                  {correctAnswerSelected ? '✨ Brilliant!' : '⚠️ Not Quite!'}
                                </span>
                                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                                  {currentFlagQuestion.explanation || `The correct answer is ${currentFlagQuestion.correctAnswer}.`}
                                </p>
                                {activeMemoryHook && (
                                  <p className="mt-2 text-[11px] text-slate-500 font-bold">
                                    Memory hook: {activeMemoryHook}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            {/* Next question trigger */}
                            <button
                              onClick={handleNextQuestion}
                              className="mt-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1"
                            >
                              Go Next Question &gt;
                            </button>
                          </div>
                        )}

                      </div>
                    )}

                    {/* OFFLINE FACT OR FICTION QUESTION INTERFACE VIEW */}
                    {activeGame === 'ai-trivia' && (
                      <div className="space-y-6">
                        
                        {/* Loading Spinner */}
                        {isLoadingAiTrivia && (
                          <div className="text-center py-10 space-y-3">
                            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-700 rounded-full animate-spin mx-auto" />
                            <p className="text-xs text-purple-700 font-bold uppercase tracking-widest animate-pulse">
                              Preparing local fact check...
                            </p>
                            <p className="text-xs text-slate-400 font-medium italic">
                              Analyzing flags, extreme geographic rules, and rare recipes...
                            </p>
                          </div>
                        )}

                        {/* Display the AI question statement */}
                        {!isLoadingAiTrivia && aiTrivia && (
                          <div className="space-y-6">
                            
                            {/* Trivia statement display board */}
                            <div className="p-6 bg-purple-50/50 border border-purple-100/75 rounded-3xl text-center shadow-xs">
                              <span className="text-[10px] uppercase font-bold text-purple-700 tracking-widest block mb-2">
                                Country Statement: {aiTrivia.country}
                              </span>
                              <blockquote className="text-base sm:text-lg font-bold text-purple-950 italic leading-relaxed">
                                "{aiTrivia.statement}"
                              </blockquote>
                            </div>

                            <p className="text-xs text-slate-400 font-medium text-center italic">
                              Can you determine if this cultural declaration is Fact or Lie?
                            </p>

                            {/* True or False options board */}
                            <div className="grid grid-cols-2 gap-4">
                              <button
                                onClick={() => handleAiGuess(true)}
                                disabled={hasAnswered}
                                className={`py-4 rounded-2xl font-black text-base shadow-xs transition-all cursor-pointer flex flex-col items-center justify-center gap-1 border-2 ${
                                  hasAnswered 
                                    ? aiTrivia.isTrue 
                                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                                      : selectedAnswer === 'True'
                                      ? 'bg-rose-50 border-rose-300 text-rose-800 line-through'
                                      : 'bg-white border-slate-100 opacity-55 text-slate-350'
                                    : 'bg-white hover:bg-emerald-50 border-slate-150 hover:border-emerald-300 text-emerald-700 active:bg-emerald-100/50'
                                }`}
                              >
                                <span className="text-xl">👍</span>
                                <span className="text-xs sm:text-sm">IT IS TRUE</span>
                              </button>

                              <button
                                onClick={() => handleAiGuess(false)}
                                disabled={hasAnswered}
                                className={`py-4 rounded-2xl font-black text-base shadow-xs transition-all cursor-pointer flex flex-col items-center justify-center gap-1 border-2 ${
                                  hasAnswered 
                                    ? !aiTrivia.isTrue 
                                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                                      : selectedAnswer === 'False'
                                      ? 'bg-rose-50 border-rose-300 text-rose-800 line-through'
                                      : 'bg-white border-slate-100 opacity-55 text-slate-350'
                                    : 'bg-white hover:bg-rose-50 border-slate-150 hover:border-rose-300 text-rose-700 active:bg-rose-100/50'
                                }`}
                              >
                                <span className="text-xl">👎</span>
                                <span className="text-xs sm:text-sm">IT IS FALSE</span>
                              </button>
                            </div>

                            {/* Interactive Answer explanation with Markdown translation */}
                            {hasAnswered && (
                              <div className={`p-5 rounded-2xl border leading-relaxed animate-slideUp space-y-1.5 text-sm ${
                                correctAnswerSelected 
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900 shadow-2xs' 
                                  : 'bg-rose-50/55 border-rose-100 text-slate-800'
                              }`}>
                                <div className="flex gap-2 items-start">
                                  {correctAnswerSelected ? (
                                    <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                  ) : (
                                    <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                                  )}
                                  <div>
                                    <span className="font-extrabold uppercase text-xs tracking-wider block mb-0.5">
                                      {correctAnswerSelected ? '✨ Marvelous Guess!' : '⚠️ Tricked You!'}
                                    </span>
                                    <p className="text-slate-800 font-bold mb-1.5">
                                      Reality: It is {aiTrivia.isTrue ? "completely TRUE!" : "FALSE!"}
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                                      {aiTriviaExplanation}
                                    </p>
                                    {activeMemoryHook && (
                                      <p className="mt-2 text-[11px] text-slate-500 font-bold">
                                        Memory hook: {activeMemoryHook}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <button
                                  onClick={handleNextQuestion}
                                  className="mt-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1"
                                >
                                  Request Another Fact &gt;
                                </button>
                              </div>
                            )}

                          </div>
                        )}

                      </div>
                    )}

                    {/* Exit option always visible */}
                    <div className="mt-8 pt-4 border-t border-slate-100 text-center">
                      <button
                        onClick={handleExitGame}
                        className="text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-xl transition-all cursor-pointer"
                      >
                        Exit Game Session
                      </button>
                    </div>

                  </div>
                )}

              </div>
            )}

          </div>
        )}

      </main>

      {/* ================= MODAL DRAWER FOR FULL INDIVIDUAL COUNTRY DETAILS & TRAVEL GUIDE ================= */}
      {selectedCountry && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
            <div className="rounded-xl bg-white px-5 py-4 text-sm font-bold text-slate-700 shadow-xl">
              Loading country study tools...
            </div>
          </div>
        }>
          <CountryDetailModal
            country={selectedCountry}
            onClose={() => setSelectedCountry(null)}
          />
        </Suspense>
      )}

      {updateRegistration && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:max-w-sm z-[60] rounded-xl border border-emerald-200 bg-white p-4 shadow-xl">
          <p className="text-sm font-black text-slate-900">A lighter app update is ready.</p>
          <p className="mt-1 text-xs text-slate-600">Reload once to use the newest offline files.</p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => updateRegistration.waiting?.postMessage({ type: 'SKIP_WAITING' })}
              className="min-h-10 rounded-lg bg-emerald-600 px-4 text-xs font-bold text-white hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Update now
            </button>
            <button
              type="button"
              onClick={() => setUpdateRegistration(null)}
              className="min-h-10 rounded-lg border border-slate-200 px-4 text-xs font-bold text-slate-600 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              Later
            </button>
          </div>
        </div>
      )}

      {notice && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:max-w-sm z-[60] rounded-xl border border-blue-200 bg-white p-4 shadow-xl flex items-start justify-between gap-3" role="status">
          <p className="text-sm font-semibold text-slate-700">{notice}</p>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="min-h-10 min-w-10 rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-600"
            aria-label="Dismiss message"
          >
            <X className="w-4 h-4 mx-auto" />
          </button>
        </div>
      )}

      {confirmResetOpen && (
        <div className="fixed inset-0 z-[70] bg-slate-900/60 p-4 flex items-center justify-center" role="presentation">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="reset-dialog-title">
            <h2 id="reset-dialog-title" className="text-lg font-black text-slate-900">Reset all progress?</h2>
            <p className="mt-2 text-sm text-slate-600">This clears scores, mastery, review queues, streaks, and saved preferences on this browser.</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setConfirmResetOpen(false)}
                className="min-h-11 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={resetAllProgress}
                className="min-h-11 rounded-xl bg-rose-600 text-sm font-bold text-white hover:bg-rose-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
              >
                Reset progress
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Humble Footer with structural attributes */}
      <footer className="bg-slate-900 text-slate-400 py-6 border-t border-slate-800/80 mt-auto shrink-0 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4 text-xs font-medium">
          <div>
            <p className="text-slate-200 font-bold">World Country Learner Study App</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Learn world geography, flags, capitals, and currencies interactively.</p>
          </div>
          <div className="flex gap-4">
            <span className="text-slate-500">Offline & Online modes integrated</span>
            <span className="text-slate-500">Persisted locally via browser client</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
