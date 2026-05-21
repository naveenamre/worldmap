import React, { useState, useEffect, useRef } from 'react';
import { Country } from '../data/countries';
import { mapAttributions } from '../data/mapAttributions.generated';
import { mapAssetLinks, type ReferenceMapKind } from '../data/mapAssetLinks';
import {
  getStaticDestinations,
  getStaticGuideAnswer,
  getStaticStudyMap,
  postJson,
  type StudyMapData,
  type TouristDestination,
} from '../services/staticCountryTools';
import { 
  X, Info, Coins, Languages, Landmark, 
  MapPin, Users, Lightbulb, Compass, Send, Sparkles, AlertCircle, Map, Layers,
  BookOpen, Award, RotateCcw, HelpCircle, Eye
} from 'lucide-react';

interface CountryDetailModalProps {
  country: Country;
  onClose: () => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

const MAP_FILE_EXTENSIONS = ['webp', 'jpg', 'jpeg', 'png', 'svg'];

export const CountryDetailModal: React.FC<CountryDetailModalProps> = ({ country, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'facts' | 'india-relation' | 'maps-tourism' | 'ai-guide'>('overview');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Map and Tourism States
  const [referenceMapKind, setReferenceMapKind] = useState<ReferenceMapKind>('political');
  const [mapImageIndex, setMapImageIndex] = useState<number>(0);
  const [failedExternalMap, setFailedExternalMap] = useState<boolean>(false);
  const [aiDestinations, setAiDestinations] = useState<TouristDestination[] | null>(null);
  const [loadingDestinations, setLoadingDestinations] = useState(false);
  const [destinationsError, setDestinationsError] = useState<string | null>(null);

  // New Isolated Academic Study Map States
  const [mapSubTab, setMapSubTab] = useState<'academic' | 'reference'>('academic');
  const [studyMapData, setStudyMapData] = useState<StudyMapData | null>(null);
  const [loadingStudyMap, setLoadingStudyMap] = useState<boolean>(false);
  const [studyMapError, setStudyMapError] = useState<string | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<any | null>(null);
  const [selectedMapFeature, setSelectedMapFeature] = useState<any | null>(null);
  const [studyMode, setStudyMode] = useState<'view' | 'quiz'>('view');
  
  // Custom interactive geography quiz states
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizTotal, setQuizTotal] = useState<number>(0);
  const [currentQuizTarget, setCurrentQuizTarget] = useState<any | null>(null);
  const [quizMessage, setQuizMessage] = useState<string | null>(null);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [hasAnsweredQuiz, setHasAnsweredQuiz] = useState<boolean>(false);
  const [mapTheme, setMapTheme] = useState<'slate' | 'parchment' | 'mono'>('slate');
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const expectedMapFiles = MAP_FILE_EXTENSIONS.map((extension) => `public/maps/${country.code}-${referenceMapKind}.${extension}`);
  const externalMapSrc = mapAssetLinks[country.code]?.[referenceMapKind];
  const shouldUseExternalMap = Boolean(externalMapSrc) && !failedExternalMap;
  const localMapPath = `maps/${country.code}-${referenceMapKind}.${MAP_FILE_EXTENSIONS[mapImageIndex]}`;
  const referenceMapSrc = shouldUseExternalMap ? externalMapSrc : new URL(localMapPath, document.baseURI).toString();
  const isReferenceMapMissing = !shouldUseExternalMap && mapImageIndex >= MAP_FILE_EXTENSIONS.length;
  const referenceMapAttribution = mapAttributions[country.code]?.[referenceMapKind];

  // Initialize messages with a warm greeting from the guide
  useEffect(() => {
    setChatMessages([
      {
        role: 'assistant',
        text: `✈️ Hola, Hello, Bonjour! I am your **AI Cultural Guide** for **${country.name}**!\n\nAsk me anything about its local traditions, history, hidden tourist gems, traditional food, or typical language phrases!\n\n*Try one of the quick pro prompts below or type your own:*`
      }
    ]);
    setActiveTab('overview');
    setApiError(null);
    setReferenceMapKind('political');
    setMapImageIndex(0);
    setAiDestinations(null);
    setDestinationsError(null);
    setLoadingDestinations(false);

    // Reset and trigger custom Study Map fetches
    setMapSubTab('academic');
    setStudyMapData(null);
    setHoveredPoint(null);
    setSelectedMapFeature(null);
    setStudyMode('view');
    setQuizScore(0);
    setQuizTotal(0);
    setQuizMessage(null);
    setCurrentQuizTarget(null);
    setHasAnsweredQuiz(false);
    fetchStudyMap();
  }, [country]);

  useEffect(() => {
    setMapImageIndex(0);
    setFailedExternalMap(false);
  }, [country.code, referenceMapKind]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    // Add user message
    const incomingMessages = [...chatMessages, { role: 'user' as const, text: textToSend }];
    setChatMessages(incomingMessages);
    setChatInput('');
    setIsLoading(true);
    setApiError(null);

    try {
      const data = await postJson<{ answer: string }>('/api/countries/ask', {
        countryName: country.name,
        query: textToSend,
      });

      setChatMessages(prev => [...prev, { role: 'assistant', text: data.answer }]);
    } catch (err: any) {
      console.warn('Using static guide fallback:', err);
      setApiError(null);
      setChatMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          text: getStaticGuideAnswer(country, textToSend),
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStudyMap = async () => {
    setLoadingStudyMap(true);
    setStudyMapError(null);
    setStudyMapData(null);
    setHoveredPoint(null);
    setSelectedMapFeature(null);
    setQuizMessage(null);
    setCurrentQuizTarget(null);
    setHasAnsweredQuiz(false);
    try {
      const data = await postJson<StudyMapData>('/api/countries/study-map', {
        countryName: country.name,
      });
      setStudyMapData(data);
    } catch (err: any) {
      console.warn('Using static study map fallback:', err);
      setStudyMapData(getStaticStudyMap(country));
      setStudyMapError(null);
    } finally {
      setLoadingStudyMap(false);
    }
  };

  const startNewQuizQuestion = (data: any = studyMapData) => {
    if (!data) return;
    
    // Pick an interactive point/feature to quiz
    const targets: any[] = [];
    
    // Add capital
    targets.push({
      name: data.capitalPoint.name,
      type: 'Capital City',
      x: data.capitalPoint.x,
      y: data.capitalPoint.y,
      details: data.capitalPoint.details
    });
    
    // Add major cities
    data.majorCities?.forEach((c: any) => {
      targets.push({
        name: c.name,
        type: 'Major City',
        x: c.x,
        y: c.y,
        details: c.description
      });
    });
    
    // Add landforms
    data.physicalLandmarks?.forEach((l: any) => {
      targets.push({
        name: l.name,
        type: l.type.toUpperCase(),
        x: l.x,
        y: l.y,
        details: l.description
      });
    });
    
    if (targets.length === 0) return;
    
    const selected = targets[Math.floor(Math.random() * targets.length)];
    setCurrentQuizTarget(selected);
    setQuizMessage(null);
    setHasAnsweredQuiz(false);
    
    // Generate some interesting wrong options
    const wrongLandmarks = [
      "Victoria Falls", "Grand Canyon", "Andes Mountain Pass", 
      "Everest Base camp", "Amazon Tributary", "Nile Delta Basin", 
      "Sahara Dune Ridge", "Suez Canal Corridor"
    ];
    
    const otherTargetNames = targets
      .filter(t => t.name !== selected.name)
      .map(t => t.name);
      
    const optionsPool = [...otherTargetNames, ...wrongLandmarks];
    const shuffledWrong = optionsPool.filter((v, i, self) => self.indexOf(v) === i).sort(() => 0.5 - Math.random()).slice(0, 3);
    
    const finalOptions = [selected.name, ...shuffledWrong].sort(() => 0.5 - Math.random());
    setQuizOptions(finalOptions);
  };

  const handleSelectQuizAnswer = (option: string) => {
    if (hasAnsweredQuiz || !currentQuizTarget) return;
    
    setHasAnsweredQuiz(true);
    setQuizTotal(prev => prev + 1);
    
    if (option === currentQuizTarget.name) {
      setQuizScore(prev => prev + 1);
      setQuizMessage(`✨ Sahi Uttar (Correct)! That is ${currentQuizTarget.name} (${currentQuizTarget.type}). Coords: (${currentQuizTarget.x}, ${currentQuizTarget.y})!`);
    } else {
      setQuizMessage(`❌ Galat Uttar (Incorrect). That is actually ${currentQuizTarget.name} (${currentQuizTarget.type}).`);
    }
  };

  const fetchDestinations = async () => {
    setLoadingDestinations(true);
    setDestinationsError(null);
    try {
      const data = await postJson<{ destinations?: TouristDestination[] }>('/api/countries/destinations', {
        countryName: country.name,
      });
      setAiDestinations(data.destinations?.length ? data.destinations : getStaticDestinations(country));
    } catch (err: any) {
      console.warn('Using static destinations fallback:', err);
      setAiDestinations(getStaticDestinations(country));
      setDestinationsError(null);
    } finally {
      setLoadingDestinations(false);
    }
  };

  const formatPopulation = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + ' Billion';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + ' Million';
    }
    return new Intl.NumberFormat().format(num);
  };

  // Helper to parse double asterisks and bullet points into React nodes to display high-quality Markdown
  const renderMarkdownText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let trimmed = line.trim();
      
      // Determine if list item
      const isListItem = trimmed.startsWith('* ') || trimmed.startsWith('- ');
      if (isListItem) {
        trimmed = trimmed.substring(2);
      }

      // Parse bold elements **something**
      const parts = [];
      let lastIndex = 0;
      const regex = /\*\*(.*?)\*\*/g;
      let match;

      while ((match = regex.exec(trimmed)) !== null) {
        // Add text before match
        if (match.index > lastIndex) {
          parts.push(trimmed.substring(lastIndex, match.index));
        }
        // Add bolded text
        parts.push(
          <strong key={match.index} className="font-bold text-slate-800 bg-slate-100/65 px-1 rounded">
            {match[1]}
          </strong>
        );
        lastIndex = regex.lastIndex;
      }

      if (lastIndex < trimmed.length) {
        parts.push(trimmed.substring(lastIndex));
      }

      const finalContent = parts.length > 0 ? parts : trimmed;

      if (isListItem) {
        return (
          <li key={idx} className="ml-5 list-disc text-slate-700 leading-relaxed my-1">
            {finalContent}
          </li>
        );
      }

      if (trimmed === '') {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="text-slate-700 leading-relaxed mb-1.5 break-words">
          {finalContent}
        </p>
      );
    });
  };

  const presetPrompts = [
    { label: "🍳 Local Dish", text: `What are the most famous traditional dishes and key food items from ${country.name}?` },
    { label: "🗣️ Greetings", text: `Teach me 4 common greetings and polite phrases in ${country.name}'s official language, with pronunciations or context.` },
    { label: "🎵 Traditional Music", text: `What are the iconic traditional musical instruments, folk songs, or cultural performances originating in ${country.name}?` },
    { label: "🗺️ 3-Day Travel Itinerary", text: `Create a captivating, budget-friendly 3-day sightseeing journey itinerary for visiting ${country.name}.` }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
      <div 
        id="country-detail-panel" 
        className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-100"
      >
        {/* Header Ribbon / Image background banner */}
        <div className="relative bg-slate-950 text-white p-6 md:p-8 shrink-0 flex items-end">
          {/* Subtle decoration overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-blue-900/40 via-purple-900/40 to-slate-950 opacity-90 z-0 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 z-10 w-full relative">
            {/* Flag Frame */}
            <div className="relative rounded-xl overflow-hidden border-2 border-white/90 shadow-xl w-24 md:w-32 aspect-[3/2] bg-slate-800 shrink-0 select-none">
              <img
                src={`https://flagcdn.com/w160/${country.code}.png`}
                alt={`${country.name} Flag`}
                referrerPolicy="no-referrer"
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title Block */}
            <div className="flex-grow">
              <div className="flex items-center gap-2.5">
                <span className="bg-white/20 hover:bg-white/30 transition-colors text-white text-xs px-2.5 py-0.5 rounded-md font-mono tracking-wider font-bold uppercase select-none">
                  ISO: {country.code.toUpperCase()}
                </span>
                <span className="text-blue-300 text-sm font-semibold">{country.continent}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1 text-white">
                {country.name}
              </h1>
              <p className="text-slate-300/95 text-sm mt-1.5 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                Capital City: <strong className="text-white font-medium">{country.capital}</strong>
              </p>
            </div>
          </div>

          {/* Close button */}
          <button 
            id="close-detail-modal"
            onClick={onClose}
            className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-full p-2.5 transition-all shadow-md cursor-pointer z-20"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls Navigation */}
        <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 gap-1.5 shrink-0 select-none">
          <button
            id="tab-overview"
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'overview' 
                ? 'bg-white shadow-sm text-blue-600 border border-slate-100' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Info className="w-4 h-4" />
            Overview
          </button>
          
          <button
            id="tab-facts"
            onClick={() => setActiveTab('facts')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'facts' 
                ? 'bg-white shadow-sm text-blue-600 border border-slate-100' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Did You Know?
          </button>

          <button
            id="tab-india-relation"
            onClick={() => setActiveTab('india-relation')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'india-relation' 
                ? 'bg-amber-50 border border-amber-200 text-amber-700 font-extrabold shadow-sm' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span className="text-sm">🇮🇳</span>
            India Connection
          </button>

          <button
            id="tab-maps-tourism"
            onClick={() => setActiveTab('maps-tourism')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'maps-tourism' 
                ? 'bg-emerald-55 border border-emerald-250 text-emerald-800 font-extrabold shadow-sm bg-emerald-50' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Map className="w-4 h-4 text-emerald-600 animate-pulse" />
            Maps & Sights
          </button>

          <button
            id="tab-ai-guide"
            onClick={() => setActiveTab('ai-guide')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'ai-guide font-extrabold' 
                ? 'bg-blue-50 border border-blue-100 text-blue-700' 
                : activeTab === 'ai-guide'
                ? 'bg-white shadow-sm text-blue-600 border border-slate-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
            AI Travel Guide
          </button>
        </div>

        {/* Modal Scrollable Content viewport */}
        <div className="flex-grow overflow-y-auto p-6 bg-slate-50/20">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn duration-250">
              {/* Quick stats board */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-start gap-4 shadow-xs">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs text-slate-400 font-bold uppercase tracking-wider">Estimated Population</h3>
                    <p className="text-xl font-bold text-slate-800 mt-0.5">{formatPopulation(country.population)}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Approx. modern census</p>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-start gap-4 shadow-xs">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs text-slate-400 font-bold uppercase tracking-wider">National Currency</h3>
                    <p className="text-xl font-bold text-slate-800 mt-0.5">
                      {country.currency.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-600 font-bold">
                        CODE: {country.currency.code}
                      </span>
                      <span className="font-medium">Symbol: <strong className="text-emerald-600 font-semibold">{country.currency.symbol}</strong></span>
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-start gap-4 shadow-xs">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                    <Languages className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs text-slate-400 font-bold uppercase tracking-wider">Languages Used</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {country.languages.map((lang, i) => (
                        <span key={i} className="text-xs bg-purple-50 border border-purple-100/50 text-purple-700 px-2.5 py-1 rounded-lg font-medium">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-start gap-4 shadow-xs">
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs text-slate-400 font-bold uppercase tracking-wider">Representative Landmark</h3>
                    <p className="text-lg font-bold text-slate-800 mt-0.5">{country.landmark}</p>
                    <p className="text-xs text-slate-500">World-famous destination</p>
                  </div>
                </div>
              </div>

              {/* Geographic Overview */}
              <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs">
                <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-blue-500" /> Key Features
                </h3>
                <div className="text-slate-600 text-sm space-y-2 leading-relaxed">
                  <p>
                    <strong>{country.name}</strong> is a sovereign territory positioned within <strong className="text-slate-800 font-medium">{country.continent}</strong>. Its capital, <strong>{country.capital}</strong>, is the central node of politics, culture, and economic development.
                  </p>
                  <p>
                    Tourists and geography students recognize {country.name} primarily for its outstanding landmark, <strong>{country.landmark}</strong>, and its rich tapestry of language spoken natively (including {country.languages.join(", ")}).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* FACTS TAB */}
          {activeTab === 'facts' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 p-3 bg-amber-50 text-amber-800 rounded-xl border border-amber-200/50 mb-2">
                <Lightbulb className="w-5 h-5 shrink-0" />
                <span className="text-xs font-semibold">Incredible learning trivia about {country.name}! Great for studying flag quizzes and testing facts:</span>
              </div>

              {country.funFacts.map((fact, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs flex items-start gap-4 leading-relaxed hover:border-amber-200 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-mono font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <div className="text-slate-700 text-sm md:text-base font-medium pt-1">
                    {fact}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* INDIA CONNECTION TAB */}
          {activeTab === 'india-relation' && (
            <div className="space-y-6 animate-fadeIn duration-250">
              
              {country.indiaRelation ? (
                <div className="space-y-6">
                  {/* Summary card */}
                  <div className="bg-orange-50/40 border border-orange-100 p-5 rounded-3xl shadow-xs">
                    <h3 className="text-sm font-extrabold text-orange-850 uppercase tracking-wider mb-2.5 flex items-center gap-2 select-none">
                      🇮🇳 Bilateral Diplomatic Summary
                    </h3>
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed font-semibold">
                      {country.indiaRelation.summary}
                    </p>
                  </div>

                  {/* Attributes Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {country.indiaRelation.jointExercise && (
                      <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-start gap-3.5 shadow-xs">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl font-bold select-none text-xl">
                          ⚔️
                        </div>
                        <div>
                          <h4 className="text-xs text-slate-400 font-bold uppercase tracking-wider">Joint Military Drills</h4>
                          <p className="text-sm font-bold text-slate-800 mt-1">{country.indiaRelation.jointExercise}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">Shared defense coordination</p>
                        </div>
                      </div>
                    )}

                    {country.indiaRelation.borderSharing && (
                      <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-start gap-3.5 shadow-xs">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl font-bold select-none text-xl">
                          🗺️
                        </div>
                        <div>
                          <h4 className="text-xs text-slate-400 font-bold uppercase tracking-wider">Borders & Geography</h4>
                          <p className="text-sm font-bold text-slate-800 mt-1">{country.indiaRelation.borderSharing}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">Sovereign demarcation limits</p>
                        </div>
                      </div>
                    )}

                    {country.indiaRelation.sharedProjects && (
                      <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-start gap-3.5 shadow-xs md:col-span-2">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold select-none text-xl">
                          🤝
                        </div>
                        <div>
                          <h4 className="text-xs text-slate-400 font-bold uppercase tracking-wider">Strategic Bilateral Cooperation</h4>
                          <p className="text-sm font-bold text-slate-800 mt-1 leading-relaxed">{country.indiaRelation.sharedProjects}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">Economic infrastructure, funding & joint services</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Factoids shelf */}
                  <div className="bg-white border border-slate-150 p-5 rounded-3xl space-y-4 shadow-xs">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 select-none">
                      ✨ Comparative Bilateral Trivia
                    </h3>
                    <div className="space-y-3">
                      {country.indiaRelation.funFactsWithIndia.map((relationFact, i) => (
                        <div key={i} className="flex gap-3 items-start leading-relaxed text-slate-700 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-2" />
                          <p>{relationFact}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-slate-100 p-12 text-center rounded-3xl shadow-sm max-w-sm mx-auto">
                  <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-4 border border-slate-100 text-2xl select-none">
                    🇮🇳
                  </div>
                  <h4 className="font-bold text-slate-800 text-base">Friendship Network Global Partner</h4>
                  <p className="text-xs text-slate-500 mt-1 lines-relaxed">
                    {country.name} coordinates with India through global multilateral platforms such as the United Nations, G20, and major international trade routes.
                  </p>
                </div>
              )}

            </div>
          )}

          {/* MAPS & SIGHTS WORKSPACE TAB */}
          {activeTab === 'maps-tourism' && (
            <div className="space-y-6 animate-fadeIn duration-250">
              
              {/* Dual Workspacce Selector Sub-bar */}
              <div className="flex bg-slate-100/80 border border-slate-200/50 p-1.5 rounded-2xl select-none max-w-sm sm:max-w-md mx-auto">
                <button
                  type="button"
                  onClick={() => setMapSubTab('academic')}
                  className={`flex-1 text-center font-extrabold text-[11px] sm:text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    mapSubTab === 'academic'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-650 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  🎓 Isolated Study Map
                </button>
                <button
                  type="button"
                  onClick={() => setMapSubTab('reference')}
                  className={`flex-1 text-center font-extrabold text-[11px] sm:text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    mapSubTab === 'reference'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-650 hover:text-slate-900'
                  }`}
                >
                  <Map className="w-3.5 h-3.5 shrink-0" />
                  Reference Maps
                </button>
              </div>

              {/* 1. ACADEMIC STUDY MAP WORKSPACE */}
              {mapSubTab === 'academic' && (
                <div className="space-y-6">
                  {loadingStudyMap ? (
                    <div className="bg-white border border-slate-100 p-16 text-center rounded-3xl shadow-xs space-y-4">
                      <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                        <Compass className="w-12 h-12 text-emerald-600 animate-spin-slow" />
                        <span className="absolute w-12 h-12 border-2 border-dashed border-emerald-500 rounded-full animate-ping opacity-45" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-800 text-base">Formulating Isolated Study Blueprint...</h4>
                        <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">Gemini is tracing correct boundary points, capital coordinates, and rivers of {country.name} directly on the grid.</p>
                      </div>
                    </div>
                  ) : studyMapError || !studyMapData ? (
                    <div className="bg-white border border-slate-100 p-8 text-center rounded-3xl shadow-xs space-y-3">
                      <AlertCircle className="w-12 h-12 text-orange-500 mx-auto" />
                      <h4 className="font-bold text-slate-800 text-base">Temporary Blueprint Interruption</h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">{studyMapError || "Unable to acquire country projection."}</p>
                      <button
                        onClick={fetchStudyMap}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                      >
                        Try Rebuilding Projection
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Configuration Header controls */}
                      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                            <Layers className="w-4 h-4 text-emerald-600 animate-pulse" />
                            Academic Geographic Visualizer
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">Isolated single-country focus mode to improve topographic study without distraction.</p>
                        </div>

                        {/* Styles & Modes controllers */}
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Modality Toggler */}
                          <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-xl select-none text-[11px] font-bold">
                            <button
                              onClick={() => setStudyMode('view')}
                              className={`px-3 py-1 rounded-lg cursor-pointer transition-all flex items-center gap-1 ${
                                studyMode === 'view' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-650 hover:text-slate-900'
                              }`}
                            >
                              <Eye className="w-3 h-3" />
                              Learn Mode
                            </button>
                            <button
                              onClick={() => {
                                setStudyMode('quiz');
                                startNewQuizQuestion(studyMapData);
                              }}
                              className={`px-3 py-1 rounded-lg cursor-pointer transition-all flex items-center gap-1 ${
                                studyMode === 'quiz' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-650 hover:text-slate-900'
                              }`}
                            >
                              <HelpCircle className="w-3 h-3" />
                              Quiz Mode
                            </button>
                          </div>

                          {/* Theme dropdown */}
                          <select
                            value={mapTheme}
                            onChange={(e: any) => setMapTheme(e.target.value)}
                            className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-bold outline-none cursor-pointer hover:border-slate-350"
                          >
                            <option value="slate">🌌 Slate Theme</option>
                            <option value="parchment">📜 Antique Parchment</option>
                            <option value="mono">🎹 Minimal Grid</option>
                          </select>

                          {/* Refresh button */}
                          <button
                            onClick={fetchStudyMap}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer transition-all shrink-0"
                            title="Re-project map data"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Map Board layout */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                        
                        {/* LEFT COLUMN: SVG Coordinates Canvas */}
                        <div className="lg:col-span-7 flex flex-col gap-4">
                          <div className={`relative rounded-3xl border p-4 shadow-sm flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                            mapTheme === 'slate' ? 'bg-slate-950 text-slate-100 border-slate-800' :
                            mapTheme === 'parchment' ? 'bg-[#FAF6EC] text-[#422C1A] border-[#DCD0B1] shadow-inner' :
                            'bg-white text-neutral-900 border-neutral-200'
                          }`}>
                            {/* Accent Watermark rulers */}
                            <div className="absolute top-2 left-2 text-[8px] font-mono opacity-40 uppercase tracking-widest pointer-events-none select-none">
                              X-Coordinate Bounds: 00..100
                            </div>
                            <div className="absolute bottom-2 right-2 text-[8px] font-mono opacity-40 uppercase tracking-widest pointer-events-none select-none">
                              Study projection scale: Native Scale
                            </div>

                            {/* Center compass direction rose */}
                            <div className="absolute top-4 right-4 text-center pointer-events-none select-none opacity-30">
                              <Compass className={`w-8 h-8 mx-auto ${
                                mapTheme === 'slate' ? 'text-emerald-500' :
                                mapTheme === 'parchment' ? 'text-amber-800' :
                                'text-neutral-900'
                              }`} />
                              <span className="text-[7px] font-bold block mt-0.5">N ▲</span>
                            </div>

                            {/* SVG Container */}
                            <div className="w-full flex items-center justify-center py-2 relative">
                              <svg
                                viewBox="0 0 100 100"
                                className="w-full max-w-md h-auto aspect-square select-none overflow-visible"
                              >
                                <defs>
                                  {/* Grid pattern */}
                                  <pattern id="academicGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path
                                      d="M 10 0 L 0 0 0 10"
                                      fill="none"
                                      stroke={
                                        mapTheme === 'slate' ? '#1e293b' :
                                        mapTheme === 'parchment' ? '#EFE6CE' :
                                        '#f1f5f9'
                                      }
                                      strokeWidth="0.5"
                                    />
                                  </pattern>
                                  {/* Shadow or inner glow */}
                                  <linearGradient id="vectorFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    {mapTheme === 'slate' ? (
                                      <>
                                        <stop offset="0%" stopColor="#065f46" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#022c22" stopOpacity="0.9" />
                                      </>
                                    ) : mapTheme === 'parchment' ? (
                                      <>
                                        <stop offset="0%" stopColor="#DFD4B5" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#CAAF83" stopOpacity="0.9" />
                                      </>
                                    ) : (
                                      <>
                                        <stop offset="0%" stopColor="#e5e5e5" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#cccccc" stopOpacity="1" />
                                      </>
                                    )}
                                  </linearGradient>
                                </defs>

                                {/* Draw Grid lines background */}
                                <rect width="100" height="100" fill="url(#academicGrid)" rx="6" />

                                {/* Coordinate ticks */}
                                <g className="text-[1.8px] font-mono fill-current opacity-30">
                                  <text x="1" y="10">Y: 10</text>
                                  <text x="1" y="30">Y: 30</text>
                                  <text x="1" y="50">Y: 50</text>
                                  <text x="1" y="70">Y: 70</text>
                                  <text x="1" y="90">Y: 90</text>
                                  
                                  <text x="10" y="99">X: 10</text>
                                  <text x="30" y="99">X: 30</text>
                                  <text x="50" y="99">X: 50</text>
                                  <text x="70" y="99">X: 70</text>
                                  <text x="90" y="99">X: 90</text>
                                </g>

                                {/* Draw Isolated Border Polygon */}
                                {studyMapData.outlinePoints && (
                                  <path
                                    d={studyMapData.outlinePoints.map((p: any, i: number) => 
                                      `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
                                    ).join(' ') + ' Z'}
                                    fill="url(#vectorFillGrad)"
                                    stroke={
                                      mapTheme === 'slate' ? '#10b981' :
                                      mapTheme === 'parchment' ? '#8C6C30' :
                                      '#171717'
                                    }
                                    strokeWidth={mapTheme === 'mono' ? '1.5' : '1.2'}
                                    className="transition-all duration-300 shadow-md"
                                  />
                                )}

                                {/* Draw physical landforms (Rivers paths) */}
                                {studyMapData.physicalLandmarks?.filter((l: any) => l.type === 'river').map((river: any, idx: number) => {
                                  if (!river.points || river.points.length < 2) return null;
                                  const pathD = river.points.map((pt: any, ptIdx: number) => 
                                    `${ptIdx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`
                                  ).join(' ');
                                  return (
                                    <path
                                      key={`river-${idx}`}
                                      d={pathD}
                                      fill="none"
                                      stroke="#3b82f6"
                                      strokeWidth="1.2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="animate-pulse"
                                      onClick={() => setSelectedMapFeature(river)}
                                      onMouseEnter={() => setHoveredPoint(river)}
                                      onMouseLeave={() => setHoveredPoint(null)}
                                      cursor="pointer"
                                    />
                                  );
                                })}

                                {/* Draw lakes (blue transparent circles) */}
                                {studyMapData.physicalLandmarks?.filter((l: any) => l.type === 'lake').map((lake: any, idx: number) => (
                                  <circle
                                    key={`lake-${idx}`}
                                    cx={lake.x}
                                    cy={lake.y}
                                    r="3"
                                    fill="#2563eb"
                                    fillOpacity="0.4"
                                    stroke="#1d4ed8"
                                    strokeWidth="0.4"
                                    className="hover:scale-130 transition-transform cursor-pointer"
                                    onClick={() => setSelectedMapFeature(lake)}
                                    onMouseEnter={() => setHoveredPoint(lake)}
                                    onMouseLeave={() => setHoveredPoint(null)}
                                  />
                                ))}

                                {/* Draw mountains (triangles) */}
                                {studyMapData.physicalLandmarks?.filter((l: any) => l.type === 'mountain' || l.type === 'volcano').map((mtn: any, idx: number) => (
                                  <polygon
                                    key={`mtn-${idx}`}
                                    points={`${mtn.x},${mtn.y - 3.5} ${mtn.x - 3},${mtn.y + 2.5} ${mtn.x + 3},${mtn.y + 2.5}`}
                                    fill={mapTheme === 'slate' ? '#d1fae5' : '#78350f'}
                                    stroke={mapTheme === 'slate' ? '#10b981' : '#451a03'}
                                    strokeWidth="0.5"
                                    className="hover:scale-130 transition-transform cursor-pointer"
                                    onClick={() => setSelectedMapFeature(mtn)}
                                    onMouseEnter={() => setHoveredPoint(mtn)}
                                    onMouseLeave={() => setHoveredPoint(null)}
                                  />
                                ))}

                                {/* Draw Capital (pulsing star) */}
                                {studyMapData.capitalPoint && (
                                  <g
                                    className="cursor-pointer"
                                    onClick={() => setSelectedMapFeature({
                                      name: studyMapData.capitalPoint.name,
                                      type: 'Capital City',
                                      x: studyMapData.capitalPoint.x,
                                      y: studyMapData.capitalPoint.y,
                                      description: studyMapData.capitalPoint.details
                                    })}
                                    onMouseEnter={() => setHoveredPoint({
                                      name: studyMapData.capitalPoint.name,
                                      type: 'Capital City',
                                      x: studyMapData.capitalPoint.x,
                                      y: studyMapData.capitalPoint.y,
                                      description: studyMapData.capitalPoint.details
                                    })}
                                    onMouseLeave={() => setHoveredPoint(null)}
                                  >
                                    <circle
                                      cx={studyMapData.capitalPoint.x}
                                      cy={studyMapData.capitalPoint.y}
                                      r="4"
                                      fill="#fbbf24"
                                      fillOpacity="0.4"
                                      className="animate-ping"
                                    />
                                    {/* Star geometry */}
                                    <polygon
                                      points={`
                                        ${studyMapData.capitalPoint.x},${studyMapData.capitalPoint.y - 3.2} 
                                        ${studyMapData.capitalPoint.x + 0.9},${studyMapData.capitalPoint.y - 1} 
                                        ${studyMapData.capitalPoint.x + 3.1},${studyMapData.capitalPoint.y - 1} 
                                        ${studyMapData.capitalPoint.x + 1.3},${studyMapData.capitalPoint.y + 0.6} 
                                        ${studyMapData.capitalPoint.x + 2},${studyMapData.capitalPoint.y + 2.8} 
                                        ${studyMapData.capitalPoint.x},${studyMapData.capitalPoint.y + 1.5} 
                                        ${studyMapData.capitalPoint.x - 2},${studyMapData.capitalPoint.y + 2.8} 
                                        ${studyMapData.capitalPoint.x - 1.3},${studyMapData.capitalPoint.y + 0.6} 
                                        ${studyMapData.capitalPoint.x - 3.1},${studyMapData.capitalPoint.y - 1} 
                                        ${studyMapData.capitalPoint.x - 0.9},${studyMapData.capitalPoint.y - 1}
                                      `}
                                      fill="#d97706"
                                      stroke="#fbbf24"
                                      strokeWidth="0.5"
                                    />
                                  </g>
                                )}

                                {/* Draw other major cities (red pin circles) */}
                                {studyMapData.majorCities?.map((city: any, idx: number) => (
                                  <g
                                    key={`city-${idx}`}
                                    className="cursor-pointer animate-fadeIn"
                                    onClick={() => setSelectedMapFeature({
                                      name: city.name,
                                      type: 'Major City',
                                      x: city.x,
                                      y: city.y,
                                      description: city.description
                                    })}
                                    onMouseEnter={() => setHoveredPoint({
                                      name: city.name,
                                      type: 'Major City',
                                      x: city.x,
                                      y: city.y,
                                      description: city.description
                                    })}
                                    onMouseLeave={() => setHoveredPoint(null)}
                                  >
                                    <circle
                                      cx={city.x}
                                      cy={city.y}
                                      r="1.8"
                                      fill={
                                        mapTheme === 'slate' ? '#f43f5e' :
                                        mapTheme === 'parchment' ? '#b91c1c' :
                                        '#262626'
                                      }
                                      stroke="#ffffff"
                                      strokeWidth="0.4"
                                    />
                                  </g>
                                ))}

                                {/* RENDER INTERACTIVE LABELS based on Study Mode */}
                                {studyMode === 'view' ? (
                                  // LEARN MODE: Full Factual Labels directly visible
                                  <g className={`text-[2.2px] font-extrabold pointer-events-none select-none ${
                                    mapTheme === 'slate' ? 'fill-slate-200' : 'fill-slate-800'
                                  }`}>
                                    {/* Capital label */}
                                    {studyMapData.capitalPoint && (
                                      <text
                                        x={studyMapData.capitalPoint.x}
                                        y={studyMapData.capitalPoint.y - 4}
                                        textAnchor="middle"
                                        className="font-black fill-amber-500 text-[2.6px]"
                                      >
                                        ⭐ {studyMapData.capitalPoint.name} (Capital)
                                      </text>
                                    )}

                                    {/* Major Cities labels */}
                                    {studyMapData.majorCities?.map((city: any, idx: number) => (
                                      <text
                                        key={`lbl-city-${idx}`}
                                        x={city.x}
                                        y={city.y - 2.8}
                                        textAnchor="middle"
                                        className="text-[2px]"
                                      >
                                        🏙️ {city.name}
                                      </text>
                                    ))}

                                    {/* Physical landmarks labels */}
                                    {studyMapData.physicalLandmarks?.map((l: any, idx: number) => (
                                      <text
                                        key={`lbl-lm-${idx}`}
                                        x={l.x}
                                        y={l.y + 4.5}
                                        textAnchor="middle"
                                        className="fill-blue-400 text-[1.8px] opacity-85"
                                      >
                                        {l.type === 'river' ? '〰️' : l.type === 'lake' ? '💧' : '⛰️'} {l.name}
                                      </text>
                                    ))}
                                  </g>
                                ) : (
                                  // QUIZ CHALLENGE MODE: Hide labels, replace landmarks with structural indices (e.g. ①, ②)
                                  <g className="text-[2.5px] font-black fill-white text-center pointer-events-none select-none">
                                    {/* Capital index indicator */}
                                    {studyMapData.capitalPoint && (
                                      <text
                                        x={studyMapData.capitalPoint.x}
                                        y={studyMapData.capitalPoint.y + 0.8}
                                        textAnchor="middle"
                                        className="fill-slate-900 font-bold text-[2.1px]"
                                      >
                                        ⭐
                                      </text>
                                    )}

                                    {/* Major Cities indices */}
                                    {studyMapData.majorCities?.map((city: any, idx: number) => (
                                      <text
                                        key={`quiz-lbl-city-${idx}`}
                                        x={city.x}
                                        y={city.y + 0.6}
                                        textAnchor="middle"
                                        className="fill-white font-bold text-[1.6px]"
                                      >
                                        {idx + 1}
                                      </text>
                                    ))}

                                    {/* Physical landmarks indices */}
                                    {studyMapData.physicalLandmarks?.map((l: any, idx: number) => (
                                      <text
                                        key={`quiz-lbl-lm-${idx}`}
                                        x={l.x}
                                        y={l.y + 0.8}
                                        textAnchor="middle"
                                        className="fill-blue-150 font-bold text-[1.6px]"
                                      >
                                        {String.fromCharCode(65 + idx)} {/* A, B, C */}
                                      </text>
                                    ))}
                                  </g>
                                )}
                              </svg>
                            </div>

                            {/* HOVER STATUS HUD ON CANVAS BOTTOM */}
                            <div className={`mt-2 p-2.5 rounded-xl border font-mono text-[10px] flex items-center justify-between min-h-[44px] tracking-wide ${
                              mapTheme === 'slate' ? 'bg-slate-900/90 border-slate-800 text-slate-300' :
                              mapTheme === 'parchment' ? 'bg-[#FAF0D6] border-[#D1C39E] text-amber-900' :
                              'bg-neutral-50 border-neutral-300 text-neutral-800'
                            }`}>
                              {hoveredPoint ? (
                                <>
                                  <span className="shrink-0 flex items-center gap-1.5 font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                                    Active HUD Target: {hoveredPoint.name} ({hoveredPoint.type || 'Landform'})
                                  </span>
                                  <span className="hidden sm:inline opacity-75 font-bold text-[9px]">Grid Coords: (X: {hoveredPoint.x}, Y: {hoveredPoint.y})</span>
                                </>
                              ) : (
                                <span className="opacity-60 flex items-center gap-1 select-none">
                                  💡 Tip: Move your cursor or tap on the map icons to study coordinates and geography specs.
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Detail of tapped features */}
                          {selectedMapFeature ? (
                            <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl shadow-xs space-y-1.5">
                              <div className="flex justify-between items-center select-none">
                                <span className="text-[9px] uppercase font-bold text-emerald-800 bg-emerald-100 border border-emerald-150 px-2.5 py-0.5 rounded-full leading-none shrink-0 font-mono">
                                  🔬 Feature Profile: {selectedMapFeature.type || 'Landform'}
                                </span>
                                <button
                                  onClick={() => setSelectedMapFeature(null)}
                                  className="text-slate-400 hover:text-slate-600 font-bold text-xs cursor-pointer p-0.5"
                                >
                                  Close
                                </button>
                              </div>
                              <h4 className="font-extrabold text-slate-800 text-sm">{selectedMapFeature.name}</h4>
                              <p className="text-xs text-slate-600 leading-relaxed">{selectedMapFeature.description || selectedMapFeature.details}</p>
                              <div className="text-[10px] text-slate-400 font-bold font-mono">
                                Positional Grid Pinpoint: (X: {selectedMapFeature.x}, Y: {selectedMapFeature.y})
                              </div>
                            </div>
                          ) : (
                            <div className="bg-slate-50 border border-slate-100 border-dashed p-4 rounded-2xl text-center select-none text-xs text-slate-400">
                              No map landmark selected. Tap any city, river, or mountain pin above to read its study specifications.
                            </div>
                          )}

                        </div>

                        {/* RIGHT COLUMN: Ledger Books, Exam Quizzes, Neighbor direction charts */}
                        <div className="lg:col-span-5 flex flex-col gap-4">

                          {/* 1. If Quiz Mode: Geography Challenge Workbook */}
                          {studyMode === 'quiz' && (
                            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 p-4 rounded-3xl shadow-2xs space-y-3.5">
                              <div className="flex justify-between items-center select-none">
                                <span className="text-[10px] font-black uppercase text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full flex items-center gap-1 leading-none tracking-wider">
                                  <Award className="w-3.5 h-3.5 animate-bounce" />
                                  Geography Challenge Workbook
                                </span>
                                <span className="text-xs font-bold text-purple-900 bg-white/80 border border-purple-100 px-2.5 py-1 rounded-xl">
                                  Score: {quizScore} / {quizTotal}
                                </span>
                              </div>

                              {currentQuizTarget ? (
                                <div className="space-y-3 font-medium">
                                  <p className="text-xs text-slate-700 leading-relaxed">
                                    Can you pinpoint the correct name of the <strong>{currentQuizTarget.type}</strong> marked at coordinates <strong className="text-slate-900 bg-white p-1 rounded font-mono text-[10px]">X: {currentQuizTarget.x}, Y: {currentQuizTarget.y}</strong>?
                                  </p>

                                  {/* Multi-choice options */}
                                  <div className="grid grid-cols-1 gap-2">
                                    {quizOptions.map((opt, oIdx) => (
                                      <button
                                        key={oIdx}
                                        disabled={hasAnsweredQuiz}
                                        onClick={() => handleSelectQuizAnswer(opt)}
                                        className={`text-left text-xs p-2.5 rounded-xl font-bold border transition-all cursor-pointer ${
                                          hasAnsweredQuiz
                                            ? opt === currentQuizTarget.name
                                              ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                                              : 'bg-white border-slate-200 text-slate-400'
                                            : 'bg-white hover:bg-slate-100 hover:border-purple-300 border-slate-200 text-slate-700'
                                        }`}
                                      >
                                        <span className="inline-block text-[9px] bg-slate-100 border px-1.5 py-0.5 rounded mr-2 uppercase font-mono font-bold">
                                          Option {String.fromCharCode(65 + oIdx)}
                                        </span>
                                        {opt}
                                      </button>
                                    ))}
                                  </div>

                                  {/* Answer Feedbacks */}
                                  {quizMessage && (
                                    <div className="p-3 bg-white rounded-xl border border-purple-150 text-xs text-slate-700 leading-relaxed animate-fadeIn font-semibold shadow-2xs">
                                      {quizMessage}
                                      <p className="mt-1.5 text-[11px] text-slate-500 font-normal">{currentQuizTarget.details || "A crucial geographic waypoint of the nation."}</p>
                                    </div>
                                  )}

                                  {/* Action Buttons */}
                                  {hasAnsweredQuiz && (
                                    <button
                                      onClick={() => startNewQuizQuestion(studyMapData)}
                                      className="w-full bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-xs cursor-pointer transition-all flex items-center justify-center gap-1"
                                    >
                                      Next Landmark Question
                                      <span>→</span>
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <div className="text-center py-6">
                                  <HelpCircle className="w-8 h-8 text-purple-400 mx-auto mb-2 animate-bounce" />
                                  <p className="text-xs text-slate-500 max-w-xs mx-auto mb-3">Learn country locations first! When ready, press start to generate workbook questions sequentially.</p>
                                  <button
                                    onClick={() => startNewQuizQuestion(studyMapData)}
                                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                                  >
                                    Start quiz challenge!
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          {/* 2. Topographic Blueprint Specifications Card */}
                          <div className="bg-white border border-slate-100 p-4 rounded-3xl shadow-2xs space-y-3.5">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 select-none font-sans">
                              📊 Technical Topographic Ledger
                            </h4>
                            <div className="grid grid-cols-2 gap-3 text-xs leading-none">
                              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">North-South Span</span>
                                <strong className="text-slate-800 text-xs block mt-1">{studyMapData.academicSpecs?.northToSouthDistanceKm || "1,200 km"}</strong>
                              </div>
                              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">East-West Span</span>
                                <strong className="text-slate-800 text-xs block mt-1">{studyMapData.academicSpecs?.eastToWestDistanceKm || "850 km"}</strong>
                              </div>
                              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Total Borders Limit</span>
                                <strong className="text-slate-800 text-xs block mt-1">{studyMapData.academicSpecs?.totalBordersKm || "3,200 km"}</strong>
                              </div>
                              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Coastal Status</span>
                                <strong className="text-slate-800 text-xs block mt-1 uppercase">{studyMapData.academicSpecs?.coastlineStatus || "coastal"}</strong>
                              </div>
                            </div>

                            {/* Extreme point locations */}
                            {studyMapData.academicSpecs?.extremePoints && (
                              <div className="pt-2 border-t border-slate-100">
                                <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider mb-2 select-none">📌 Extreme Sovereign Points</span>
                                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                                  <div>▲ <strong className="text-slate-800 font-semibold">North:</strong> {studyMapData.academicSpecs.extremePoints.north}</div>
                                  <div>▼ <strong className="text-slate-800 font-semibold">South:</strong> {studyMapData.academicSpecs.extremePoints.south}</div>
                                  <div>► <strong className="text-slate-800 font-semibold">East:</strong> {studyMapData.academicSpecs.extremePoints.east}</div>
                                  <div>◄ <strong className="text-slate-800 font-semibold">West:</strong> {studyMapData.academicSpecs.extremePoints.west}</div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* 3. Cardinal Neighbors limits radar card */}
                          <div className="bg-white border border-slate-100 p-4 rounded-3xl shadow-2xs space-y-3 flex flex-col justify-between">
                            <div>
                              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 select-none font-sans mb-3">
                                🧭 Circular Sovereign Borders (Clockwise)
                              </h4>
                              <div className="max-h-[160px] overflow-y-auto space-y-2.5 pr-1">
                                {studyMapData.neighborBorders?.map((nb: any, idx: number) => (
                                  <div
                                    key={idx}
                                    className="bg-slate-50 hover:bg-slate-100 border border-slate-100 p-2.5 rounded-xl transition-all flex items-start gap-2.5 group"
                                  >
                                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black font-mono shrink-0 select-none uppercase group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                      {nb.direction}
                                    </span>
                                    <div>
                                      <h5 className="font-extrabold text-[12px] text-slate-800 leading-snug">{nb.name}</h5>
                                      <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed mt-0.5">{nb.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* 4. Professor's Memorization / Exam study notes */}
                          {studyMapData.academicTips && (
                            <div className="bg-gradient-to-br from-emerald-50/40 via-white to-white border border-emerald-100/50 p-4 rounded-3xl shadow-2xs space-y-2.5">
                              <h4 className="text-xs font-black text-emerald-700 uppercase tracking-widest flex items-center gap-1.5 select-none font-sans">
                                ✒️ Geography Professor's Study Notes
                              </h4>
                              <ul className="space-y-2 text-xs text-slate-705 leading-relaxed">
                                {studyMapData.academicTips.map((tip: string, idx: number) => (
                                  <li key={idx} className="flex gap-2.5 items-start">
                                    <span className="p-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[9px] font-bold mt-0.5 shrink-0 select-none">✔</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        </div>

                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* 2. STATIC POLITICAL / PHYSICAL REFERENCE MAPS */}
              {mapSubTab === 'reference' && (
                <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-xs space-y-4 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-emerald-600" />
                        Political and Physical Reference Maps
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">Drop your own study maps into public/maps using the country ISO code.</p>
                    </div>

                    <div className="flex bg-slate-50 border border-slate-100 p-1 rounded-xl shrink-0 select-none">
                      <button
                        onClick={() => setReferenceMapKind('political')}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          referenceMapKind === 'political'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Political
                      </button>
                      <button
                        onClick={() => setReferenceMapKind('physical')}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          referenceMapKind === 'physical'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Physical
                      </button>
                    </div>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border border-slate-150 shadow-inner bg-slate-100 min-h-[22rem] flex items-center justify-center">
                    {isReferenceMapMissing ? (
                      <div className="p-8 text-center max-w-lg mx-auto">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
                          <Map className="w-7 h-7" />
                        </div>
                        <h4 className="font-extrabold text-slate-850 text-base">No {referenceMapKind} map added for {country.name} yet</h4>
                        <p className="text-xs text-slate-500 leading-relaxed mt-2">
                          Add a map image with one of these filenames and it will appear here automatically.
                        </p>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                          {expectedMapFiles.map((fileName) => (
                            <code key={fileName} className="bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-[10px] text-slate-600 font-mono break-all">
                              {fileName}
                            </code>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <img
                        key={`${country.code}-${referenceMapKind}-${mapImageIndex}-${failedExternalMap ? 'local' : 'external'}`}
                        src={referenceMapSrc}
                        alt={`${country.name} ${referenceMapKind} map`}
                        className="w-full h-full max-h-[34rem] object-contain bg-white"
                        loading="lazy"
                        onError={() => {
                          if (shouldUseExternalMap) {
                            setFailedExternalMap(true);
                            return;
                          }

                          setMapImageIndex((currentIndex) => currentIndex + 1);
                        }}
                      />
                    )}
                  </div>

                  {!isReferenceMapMissing && referenceMapAttribution && (
                    <div className="text-[11px] text-slate-500 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                      <span className="font-bold text-slate-700">Source:</span>{' '}
                      {referenceMapAttribution.sourceUrl ? (
                        <a
                          href={referenceMapAttribution.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-700 hover:text-emerald-800 underline underline-offset-2"
                        >
                          {referenceMapAttribution.title}
                        </a>
                      ) : (
                        <span>{referenceMapAttribution.title}</span>
                      )}{' '}
                      <span>({referenceMapAttribution.license})</span>
                      {referenceMapAttribution.author && (
                        <span> by {referenceMapAttribution.author}</span>
                      )}
                      <span>. {referenceMapAttribution.credit}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
                      <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Political</span>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">Best for borders, capitals, states, provinces, and neighboring countries.</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
                      <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Physical</span>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">Best for mountains, rivers, deserts, plains, plateaus, and coastlines.</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
                      <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Naming</span>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Current slot: <code className="font-mono text-slate-800">{country.code}-{referenceMapKind}.webp</code>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tourist Sights Panel */}
              <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-emerald-600 animate-bounce" />
                      Must-Visit Tourist Attractions & Hotspots
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Primary landmark of the nation: <strong className="text-slate-800">{country.landmark}</strong></p>
                  </div>

                  {/* AI Generation button */}
                  {!aiDestinations && (
                    <button
                      onClick={fetchDestinations}
                      disabled={loadingDestinations}
                      className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      {loadingDestinations ? "Formulating sights with AI..." : "Consult AI Travel Planner"}
                    </button>
                  )}
                </div>

                {/* Sights display */}
                {loadingDestinations ? (
                  <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-ping" />
                      <span className="font-extrabold text-sm text-purple-700 uppercase tracking-widest animate-pulse">Contacting travel concierge...</span>
                    </div>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">AI is finding 3 remarkable tourist hotspots with authentic details. Just a moment!</p>
                  </div>
                ) : destinationsError ? (
                  <div className="p-4 bg-orange-50 border border-orange-100 text-orange-900 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4.5 h-4.5 text-orange-600" />
                    <span>{destinationsError} Let's check some local destinations below instead.</span>
                  </div>
                ) : null}

                {/* Destinations container Grid */}
                <div>
                  {/* If we have direct/offline destinations (either statically configured, or the AI returned them) */}
                  {(aiDestinations || country.touristDestinations) ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {(aiDestinations || (country.touristDestinations?.map(d => ({
                        name: d,
                        type: "National Treasure",
                        description: `A must-see high-interest location highlighting the natural ecosystem, cultural traditions, or architecture of ${country.name}.`
                      }))) || []).map((dest, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col justify-between hover:border-emerald-200 hover:bg-white transition-all shadow-2xs group hover:-translate-y-0.5 duration-200">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-emerald-700 bg-emerald-100/70 border border-emerald-100 px-2 py-0.5 rounded-full tracking-wider">
                              {dest.type}
                            </span>
                            <h4 className="font-extrabold text-slate-800 text-sm mt-2.5 group-hover:text-emerald-700 transition-colors">{dest.name}</h4>
                            <p className="text-xs text-slate-500 line-clamp-3 mt-1.5 leading-relaxed">{dest.description}</p>
                          </div>
                          <div className="mt-4 pt-2.5 border-t border-slate-100/50 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase select-none">
                            <span>Study reference</span>
                            <button
                              onClick={() => {
                                setMapSubTab('reference');
                                setReferenceMapKind('political');
                              }}
                              className="text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded cursor-pointer"
                            >
                              Open Maps
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Default display with generic country attractions, which prompt AI consulting */
                    <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
                      <h4 className="font-bold text-slate-800 text-sm mb-1">Looking for beautiful tourist attractions?</h4>
                      <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                        Discover 3 pristine destinations for {country.name} including natural sights, temples, and historical centers.
                      </p>
                      <button
                        onClick={fetchDestinations}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Generate Tourist Sights
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* AI CULTURAL TRAVEL GUIDE CHAT */}
          {activeTab === 'ai-guide' && (
            <div className="flex flex-col h-full min-h-[350px] bg-slate-900 rounded-2xl overflow-hidden shadow-inner text-slate-100 border border-slate-800 animate-fadeIn">
              
              {/* Chat log body */}
              <div className="flex-grow overflow-y-auto p-4 space-y-3 max-h-[320px]">
                {chatMessages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`p-3.5 rounded-2xl text-xs md:text-sm max-w-[85%] leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none shadow-sm' 
                        : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-750'
                    }`}>
                      <div className="font-semibold text-[10px] uppercase opacity-70 tracking-widest mb-1 select-none">
                        {msg.role === 'user' ? 'You' : `AI Guide - ${country.name}`}
                      </div>
                      <div className="space-y-1">
                        {renderMarkdownText(msg.text)}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 max-w-[85%] rounded-bl-none">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></span>
                          <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></span>
                          <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-300"></span>
                        </div>
                        <span className="text-xs text-purple-300 font-medium">Assembling details from the cloud...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Suggestions shelf */}
              <div className="p-3 border-t border-slate-800 bg-slate-950/40 shrink-0 select-none">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2 px-1">
                  💡 Suggestions Prompt Selector
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {presetPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(p.text)}
                      disabled={isLoading}
                      className="text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 active:bg-slate-650 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-700 transition-all cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input panel */}
              <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  placeholder={`Ask anything about ${country.name} (e.g. Traditional customs, history, weather)...`}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(chatInput)}
                  disabled={isLoading}
                  className="flex-grow bg-slate-900 border border-slate-850 hover:border-slate-800 focus:border-blue-600 rounded-xl px-4 py-2.5 text-xs md:text-sm text-slate-100 focus:outline-none placeholder-slate-500 disabled:opacity-55"
                />
                
                <button
                  onClick={() => handleSendMessage(chatInput)}
                  disabled={isLoading || !chatInput.trim()}
                  className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white p-2.5 rounded-xl transition-all disabled:opacity-40 disabled:hover:bg-blue-600 cursor-pointer"
                  aria-label="Send query"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer bar */}
        <div className="border-t border-slate-100 p-4 bg-slate-50 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 shrink-0 gap-2 font-medium">
          <p className="flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-blue-500" />
            Learn geography efficiently by interacting!
          </p>
          <div className="flex gap-2">
            <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded-sm font-semibold select-none">
              Capitals Quiz
            </span>
            <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded-sm font-semibold select-none">
              Flags Test
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
