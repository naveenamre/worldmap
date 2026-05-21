import { useState, useEffect } from 'react';
import { countries, Country } from './data/countries';
import { CountryCard } from './components/CountryCard';
import { CountryDetailModal } from './components/CountryDetailModal';
import { GameStats, ActiveSection, ActiveGame, TriviaQuestion, AICountryTrivia } from './types';
import { getStaticTriviaQuestion, postJson } from './services/staticCountryTools';
import { 
  Globe, Trophy, Sparkles, Star, Award, Heart, RefreshCw, CheckCircle, 
  X, HelpCircle, Compass, Search, Map, Coins, Landmark, Languages, ShieldAlert 
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('learn');
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [indiaRelationsOnly, setIndiaRelationsOnly] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Stats setup with LocalStorage persistence
  const [stats, setStats] = useState<GameStats>({
    flagQuizHighScore: 0,
    capitalQuizHighScore: 0,
    currencyHighScore: 0,
    continentHighScore: 0,
    aiTriviaHighScore: 0,
    indiaRelationHighScore: 0,
    starsEarned: 0,
    completedBadges: [],
  });

  // Active Game State
  const [activeGame, setActiveGame] = useState<ActiveGame>('none');
  const [gameScore, setGameScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
  const [currentFlagQuestion, setCurrentFlagQuestion] = useState<TriviaQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [correctAnswerSelected, setCorrectAnswerSelected] = useState<boolean>(false);

  // AI Trivia state
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
    { id: 'ai-scholar', name: 'Truth Decoder', desc: 'Claim a High Score of 5+ in Gemini AI facts', icon: Sparkles, color: 'text-rose-500 bg-rose-50 border-rose-100' },
    { id: 'diplomat', name: 'Diplomacy Expert', desc: 'Score 6+ in India Connection Quiz', icon: Award, color: 'text-orange-500 bg-orange-50 border-orange-100' },
  ];

  // Load stats from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('world_learner_stats_v3');
    if (saved) {
      try {
        setStats(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local storage stats", e);
      }
    }
  }, []);

  // Update badges when stats change
  const saveStats = (newStats: GameStats) => {
    // Determine unlocked badges dynamically
    const unlocked: string[] = [];
    if (newStats.starsEarned >= 15) unlocked.push('first-stars');
    if (newStats.flagQuizHighScore >= 8) unlocked.push('flag-master');
    if (newStats.capitalQuizHighScore >= 8) unlocked.push('capital-chief');
    if (newStats.currencyHighScore >= 8) unlocked.push('currency-collector');
    if (newStats.continentHighScore >= 8) unlocked.push('globe-trotter');
    if (newStats.aiTriviaHighScore >= 5) unlocked.push('ai-scholar');
    if ((newStats.indiaRelationHighScore || 0) >= 6) unlocked.push('diplomat');

    const updated = { ...newStats, completedBadges: unlocked };
    setStats(updated);
    localStorage.setItem('world_learner_stats_v3', JSON.stringify(updated));
  };

  const addStars = (amount: number) => {
    const updated = { ...stats, starsEarned: stats.starsEarned + amount };
    saveStats(updated);
  };

  // Generate a random Flag Question
  const generateFlagQuestion = (): TriviaQuestion => {
    // Pick correct country
    const correctCountry = countries[Math.floor(Math.random() * countries.length)];
    
    // Choose distractor option countries
    const others = countries.filter(c => c.code !== correctCountry.code);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, 3).map(c => c.name);
    
    const options = [correctCountry.name, ...distractors].sort(() => 0.5 - Math.random());

    return {
      question: `Which country is represented by this national flag?`,
      options,
      correctAnswer: correctCountry.name,
      flagCode: correctCountry.code,
      explanation: `That's correct! ${correctCountry.name} is a key nation located in ${correctCountry.continent} with an estimated population of over ${new Intl.NumberFormat().format(correctCountry.population)} citizens. Its capital is ${correctCountry.capital}.`
    };
  };

  // Generate a Capital Question
  const generateCapitalQuestion = (): TriviaQuestion => {
    // Option A: given country, pick capital (50% chance)
    // Option B: given capital, pick country (50% chance)
    const isAskCapital = Math.random() > 0.5;
    const correctCountry = countries[Math.floor(Math.random() * countries.length)];
    const others = countries.filter(c => c.code !== correctCountry.code);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random());

    if (isAskCapital) {
      const distractors = shuffledOthers.slice(0, 3).map(c => c.capital);
      const options = [correctCountry.capital, ...distractors].sort(() => 0.5 - Math.random());

      return {
        question: `What is the capital city of ${correctCountry.name}?`,
        options,
        correctAnswer: correctCountry.capital,
        flagCode: correctCountry.code,
        explanation: `Indeed! ${correctCountry.capital} serves as the primary capital city for ${correctCountry.name}.`
      };
    } else {
      const distractors = shuffledOthers.slice(0, 3).map(c => c.name);
      const options = [correctCountry.name, ...distractors].sort(() => 0.5 - Math.random());

      return {
        question: `Which nation claims ${correctCountry.capital} as its official capital city?`,
        options,
        correctAnswer: correctCountry.name,
        flagCode: correctCountry.code,
        explanation: `${correctCountry.capital} is the vibrant cultural capital city of ${correctCountry.name}.`
      };
    }
  };

  // Generate a Currency Question
  const generateCurrencyQuestion = (): TriviaQuestion => {
    const correctCountry = countries[Math.floor(Math.random() * countries.length)];
    const others = countries.filter(c => c.code !== correctCountry.code);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random());

    const isSymbolAsk = Math.random() > 0.5;

    if (isSymbolAsk) {
      const distractors = shuffledOthers.slice(0, 3).map(c => `${c.currency.code} (${c.currency.symbol})`);
      const correctText = `${correctCountry.currency.code} (${correctCountry.currency.symbol})`;
      const options = [correctText, ...distractors].sort(() => 0.5 - Math.random());

      return {
        question: `Which official currency does ${correctCountry.name} use for everyday commerce?`,
        options,
        correctAnswer: correctText,
        flagCode: correctCountry.code,
        explanation: `${correctCountry.name} transacts in the ${correctCountry.currency.name} (${correctCountry.currency.code}), recognized with the icon "${correctCountry.currency.symbol}".`
      };
    } else {
      const distractors = shuffledOthers.slice(0, 3).map(c => c.name);
      const options = [correctCountry.name, ...distractors].sort(() => 0.5 - Math.random());

      return {
        question: `Which of these countries conducts official economic trade using the ${correctCountry.currency.name} ("${correctCountry.currency.symbol}")?`,
        options,
        correctAnswer: correctCountry.name,
        flagCode: correctCountry.code,
        explanation: `Correct! ${correctCountry.name} uses the ${correctCountry.currency.name} as their official statutory currency.`
      };
    }
  };

  // Generate a Continent Question
  const generateContinentQuestion = (): TriviaQuestion => {
    const correctCountry = countries[Math.floor(Math.random() * countries.length)];
    
    // Standard list of Continents
    const options = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania"];

    return {
      question: `On which of the Earth's continents can you locate ${correctCountry.name}?`,
      options,
      correctAnswer: correctCountry.continent,
      flagCode: correctCountry.code,
      explanation: `${correctCountry.name} is nestled in the continent of ${correctCountry.continent}.`
    };
  };

  // Generate an India Relation Question
  const generateIndiaRelationQuestion = (): TriviaQuestion => {
    // Collect countries that have indiaRelation objects
    const indiaRelated = countries.filter(c => c.indiaRelation !== undefined);
    
    // Choose randomly from multiple styles of questions
    const randomChoiceStyle = Math.floor(Math.random() * 5);
    const pickCountry = indiaRelated[Math.floor(Math.random() * indiaRelated.length)];
    
    const others = countries.filter(c => c.code !== pickCountry.code);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, 3).map(c => c.name);
    const options = [pickCountry.name, ...distractors].sort(() => 0.5 - Math.random());

    if (randomChoiceStyle === 0 && pickCountry.indiaRelation?.jointExercise) {
      // Joint exercise quiz
      const exerciseName = pickCountry.indiaRelation.jointExercise;
      return {
        question: `India conducts the popular joint defense exercise "${exerciseName}" with which of these nations?`,
        options,
        correctAnswer: pickCountry.name,
        flagCode: pickCountry.code,
        explanation: `Correct! India coordinates defense operations with ${pickCountry.name} via the "${exerciseName}" exercises. ${pickCountry.indiaRelation.summary}`
      };
    } else if (randomChoiceStyle === 1 && pickCountry.indiaRelation?.borderSharing) {
      // Border sharing quiz
      return {
        question: `Which country's border/geography connection to India is described as: "${pickCountry.indiaRelation.borderSharing}"?`,
        options,
        correctAnswer: pickCountry.name,
        flagCode: pickCountry.code,
        explanation: `Spot on! ${pickCountry.name} is key to India's geopolitical landscape: ${pickCountry.indiaRelation.borderSharing}`
      };
    } else if (randomChoiceStyle === 2 && pickCountry.indiaRelation?.sharedProjects) {
      // Cooperative projects quiz
      return {
        question: `Which country is a key strategic partner in Indo-Bilateral actions including "${pickCountry.indiaRelation.sharedProjects}"?`,
        options,
        correctAnswer: pickCountry.name,
        flagCode: pickCountry.code,
        explanation: `Excellent! ${pickCountry.name} coordinates with India on major projects: ${pickCountry.indiaRelation.sharedProjects}`
      };
    } else if (randomChoiceStyle === 3 && pickCountry.indiaRelation?.funFactsWithIndia && pickCountry.indiaRelation.funFactsWithIndia.length > 0) {
      // Fun fact quiz
      const factList = pickCountry.indiaRelation.funFactsWithIndia;
      const fact = factList[Math.floor(Math.random() * factList.length)];
      return {
        question: `Bilateral Fact: Which country shares this unique link with India? "${fact}"`,
        options,
        correctAnswer: pickCountry.name,
        flagCode: pickCountry.code,
        explanation: `You got it! ${pickCountry.name} shares this unique relationship with India. ${pickCountry.indiaRelation.summary}`
      };
    } else {
      // Summary connection quiz
      const summaryHint = pickCountry.indiaRelation?.summary || "Shares close historical and cultural ties with India.";
      const maskedSummary = summaryHint.replace(new RegExp(pickCountry.name, 'gi'), "[This Country]");
      return {
        question: `Indo-Diplomatic Hint: "${maskedSummary}" — Which country is referred to?`,
        options,
        correctAnswer: pickCountry.name,
        flagCode: pickCountry.code,
        explanation: `Precisely! ${pickCountry.name} has a rich relationship history with India: ${summaryHint}`
      };
    }
  };

  // Fetch AI trivia statement from server
  const fetchAiTriviaQuestion = async () => {
    setIsLoadingAiTrivia(true);
    setHasAnswered(false);
    setSelectedAnswer(null);
    setCorrectAnswerSelected(false);
    setAiTriviaExplanation('');
    setAiTrivia(null);

    // Filter to a random country to direct our prompt better, or just any general random country
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];

    try {
      const data = await postJson<AICountryTrivia>('/api/countries/trivia', {
        countryName: randomCountry.name,
      });
      setAiTrivia(data);
    } catch (e: any) {
      console.warn('Using static trivia fallback:', e);
      setAiTrivia(getStaticTriviaQuestion(randomCountry, countries));
    } finally {
      setIsLoadingAiTrivia(false);
    }
  };

  // Start a chosen quiz game
  const handleStartGame = (game: ActiveGame) => {
    setActiveGame(game);
    setGameScore(0);
    setLives(3);
    setQuestionsAnswered(0);
    setHasAnswered(false);
    setSelectedAnswer(null);

    if (game === 'flag') {
      setCurrentFlagQuestion(generateFlagQuestion());
    } else if (game === 'capital') {
      setCurrentFlagQuestion(generateCapitalQuestion());
    } else if (game === 'currency') {
      setCurrentFlagQuestion(generateCurrencyQuestion());
    } else if (game === 'continent') {
      setCurrentFlagQuestion(generateContinentQuestion());
    } else if (game === 'ai-trivia') {
      fetchAiTriviaQuestion();
    } else if (game === 'india-trivia') {
      setCurrentFlagQuestion(generateIndiaRelationQuestion());
    }
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

    if (activeGame === 'flag') {
      setCurrentFlagQuestion(generateFlagQuestion());
    } else if (activeGame === 'capital') {
      setCurrentFlagQuestion(generateCapitalQuestion());
    } else if (activeGame === 'currency') {
      setCurrentFlagQuestion(generateCurrencyQuestion());
    } else if (activeGame === 'continent') {
      setCurrentFlagQuestion(generateContinentQuestion());
    } else if (activeGame === 'ai-trivia') {
      fetchAiTriviaQuestion();
    } else if (activeGame === 'india-trivia') {
      setCurrentFlagQuestion(generateIndiaRelationQuestion());
    }
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
    if (window.confirm("Are you sure you want to reset all high scores, stars, and badges? This action is irreversible.")) {
      const cleared = {
        flagQuizHighScore: 0,
        capitalQuizHighScore: 0,
        currencyHighScore: 0,
        continentHighScore: 0,
        aiTriviaHighScore: 0,
        indiaRelationHighScore: 0,
        starsEarned: 0,
        completedBadges: [],
      };
      setStats(cleared);
      localStorage.setItem('world_learner_stats_v3', JSON.stringify(cleared));
    }
  };

  // Filtering countries list
  const filteredCountries = countries.filter(c => {
    const matchContinent = selectedContinent === 'All' || c.continent === selectedContinent;
    const matchIndiaRelations = !indiaRelationsOnly || (c.indiaRelation !== undefined);
    const cleanQuery = searchQuery.trim().toLowerCase();
    const matchSearch = cleanQuery === '' ||
      c.name.toLowerCase().includes(cleanQuery) ||
      c.capital.toLowerCase().includes(cleanQuery) ||
      c.landmark.toLowerCase().includes(cleanQuery) ||
      c.continent.toLowerCase().includes(cleanQuery) ||
      c.languages.some(lang => lang.toLowerCase().includes(cleanQuery)) ||
      c.currency.code.toLowerCase().includes(cleanQuery) ||
      c.currency.name.toLowerCase().includes(cleanQuery);

    return matchContinent && matchIndiaRelations && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-800">
      
      {/* Interactive Main Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand / Human Labels */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md cursor-pointer hover:bg-blue-500 transition-colors">
              <Globe className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl md:text-2xl tracking-tight text-slate-900 flex items-center gap-1.5">
                World Country Learner
              </h1>
              <p className="text-xs text-slate-500 font-medium">Capitals, Flags, Currencies & Fun Facts Study Suite</p>
            </div>
          </div>

          {/* User Score Info Bar / Stats Drawer */}
          <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100/80">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/15 text-amber-700 rounded-lg select-none">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="font-extrabold text-sm">{stats.starsEarned}</span>
              <span className="text-[10px] text-amber-600 font-semibold uppercase tracking-wider ml-0.5">Stars</span>
            </div>

            <div className="flex items-center gap-1 px-3 py-1 bg-purple-50 border border-purple-100 text-purple-700 rounded-lg select-none">
               <Award className="w-4 h-4" />
               <span className="font-bold text-sm leading-none">{stats.completedBadges.length} / 7</span>
               <span className="text-[9px] font-bold text-purple-600 uppercase tracking-widest hidden md:inline ml-1">Badges</span>
             </div>

            <button 
              id="reset-overall-button"
              onClick={resetAllProgress} 
              className="text-xs font-semibold text-slate-400 hover:text-rose-600 hover:bg-rose-50 px-2 py-1 rounded-lg transition-all"
              title="Reset high scores and badges reset"
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      {/* Hero Achievement Rack Banner (Persistent) */}
      <section className="bg-slate-900 text-white py-6 px-4 shrink-0 text-center relative border-b border-slate-800">
        <div className="absolute inset-0 bg-linear-to-r from-blue-900/10 via-purple-950/20 to-slate-900 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-xs uppercase tracking-widest font-black text-blue-400">🏆 Learning Milestone Track</h2>
          
          {/* Badge Display Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
            {ALL_BADGES.map((b) => {
              const IconComp = b.icon;
              const isUnlocked = stats.completedBadges.includes(b.id);
              return (
                <div 
                  key={b.id}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all shadow-xs group cursor-default relative ${
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
      <nav className="bg-white border-b border-slate-100 flex justify-center sticky top-[77px] z-30 shadow-xs/60">
        <div className="flex gap-4 p-2">
          <button
            id="nav-tab-learn"
            onClick={() => { setActiveSection('learn'); handleExitGame(); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeSection === 'learn' && activeGame === 'none'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Compass className="w-4.5 h-4.5" />
            Study & Explore Countries
          </button>

          <button
            id="nav-tab-games"
            onClick={() => setActiveSection('games')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeSection === 'games' || activeGame !== 'none'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Trophy className="w-4.5 h-4.5" />
            Practice Quiz Suite
          </button>
        </div>
      </nav>

      {/* Outer Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6">
        
        {/* ================= SECTION A: DETAILED LEARN & EXPLORE ================= */}
        {activeSection === 'learn' && activeGame === 'none' && (
          <div className="space-y-6">
            
            {/* Filter Pill and Search Panel */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs space-y-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCountries.map((c) => (
                <CountryCard
                  key={c.code}
                  country={c}
                  onClick={() => setSelectedCountry(c)}
                />
              ))}
            </div>

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
                    
                    <button
                      id="play-game-flag"
                      onClick={() => handleStartGame('flag')}
                      className="mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3 px-4 rounded-xl transition-all cursor-pointer w-full"
                    >
                      Begin Flags Match
                    </button>
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

                    <button
                      id="play-game-capital"
                      onClick={() => handleStartGame('capital')}
                      className="mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3 px-4 rounded-xl transition-all cursor-pointer w-full"
                    >
                      Begin Capitals Challenge
                    </button>
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

                    <button
                      id="play-game-currency"
                      onClick={() => handleStartGame('currency')}
                      className="mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3 px-4 rounded-xl transition-all cursor-pointer w-full"
                    >
                      Begin Currency Quiz
                    </button>
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

                    <button
                      id="play-game-continent"
                      onClick={() => handleStartGame('continent')}
                      className="mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3 px-4 rounded-xl transition-all cursor-pointer w-full"
                    >
                      Begin Continent Sorter
                    </button>
                  </div>

                  {/* GAME 5: GEMINI AI FACT OR FICTION */}
                  <div className="bg-white rounded-2xl border border-purple-200 p-5 flex flex-col justify-between hover:border-purple-300 hover:shadow-md transition-all duration-350 bg-gradient-to-br from-white to-purple-50/20 relative overflow-hidden">
                    {/* Sparkly overlay tag */}
                    <span className="absolute top-3 right-3 text-[10px] font-extrabold text-purple-700 bg-purple-100 border border-purple-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      GenAI Mode
                    </span>

                    <div>
                      <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">
                        🤖
                      </div>
                      <h3 className="font-extrabold text-slate-800 text-lg mt-4 flex items-center gap-2">
                        Gemini Fact or Fiction
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Play true-or-false trivia. Gemini generates obscure, tricky cultural claims—can you sniff out the correct answers?
                      </p>

                      <div className="mt-4 pt-3 border-t border-purple-100/60 flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">Personal Best:</span>
                        <span className="font-bold text-purple-700">{stats.aiTriviaHighScore} points</span>
                      </div>
                    </div>

                    <button
                      id="play-game-ai-trivia"
                      onClick={() => handleStartGame('ai-trivia')}
                      className="mt-6 bg-purple-700 hover:bg-purple-600 text-white font-bold text-sm py-3 px-4 rounded-xl transition-all cursor-pointer w-full shadow-xs shadow-purple-600/10"
                    >
                      Connect AI Trivia Master
                    </button>
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

                    <button
                      id="play-game-india-trivia"
                      onClick={() => handleStartGame('india-trivia')}
                      className="mt-6 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm py-3 px-4 rounded-xl transition-all cursor-pointer w-full shadow-xs shadow-orange-600/10"
                    >
                      Begin India Trivia Study
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* ================= ACTIVE LIVE GAME INTERFACE SCREEN ================= */}
            {activeGame !== 'none' && (
              <div className="max-w-xl mx-auto bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden animate-fadeIn duration-250">
                
                {/* Game header: Lives counters & Current high scores */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
                  
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
                      {activeGame === 'ai-trivia' && '✨ Gemini True/False'}
                      {activeGame === 'india-trivia' && '🇮🇳 Bilateral India Relations'}
                    </h3>
                  </div>

                  {/* Lifeline stats shelf */}
                  <div className="flex items-center gap-4">
                    
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
                            <div className="relative aspect-[3/2] w-48 rounded-2xl overflow-hidden border border-slate-200/60 shadow-md bg-slate-50">
                              <img
                                src={`https://flagcdn.com/w160/${currentFlagQuestion.flagCode}.png`}
                                alt="Secret Country Flag"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
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

                    {/* GEMINI AI TRIVIA QUESTION INTERFACE VIEW */}
                    {activeGame === 'ai-trivia' && (
                      <div className="space-y-6">
                        
                        {/* Loading Spinner */}
                        {isLoadingAiTrivia && (
                          <div className="text-center py-10 space-y-3">
                            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-700 rounded-full animate-spin mx-auto" />
                            <p className="text-xs text-purple-700 font-bold uppercase tracking-widest animate-pulse">
                              Consulting Gemini Trivia Master...
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
        <CountryDetailModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
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
