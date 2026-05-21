import { Country } from "./types_country";

export const europeCountries: Country[] = [
  // --- EUROPE ---
  {
    code: "gb",
    name: "United Kingdom",
    capital: "London",
    continent: "Europe",
    currency: { name: "British Pound", code: "GBP", symbol: "£" },
    population: 67000000,
    languages: ["English"],
    landmark: "Big Ben & Stonehenge",
    funFacts: [
      "No place in the UK is more than 75 miles from the sea.",
      "The UK launched the world's first public railway system."
    ],
    indiaRelation: {
      summary: "India and the UK share a deep, complex historical, educational, and trade relationship.",
      jointExercise: "Ajeya Warrior (Army) & Konkan (Navy)",
      sharedProjects: "UK-India 2030 Roadmap.",
      funFactsWithIndia: [
        "The Koh-i-Noor diamond in the Crown Jewels originated from Golconda, India.",
        "Indian-origin professionals represent a massive sector in British healthcare and technology."
      ]
    }
  },
  {
    code: "fr",
    name: "France",
    capital: "Paris",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 68000000,
    languages: ["French"],
    landmark: "Eiffel Tower",
    funFacts: [
      "France is the most visited country in the world, with over 90 million tourists yearly.",
      "It is illegal for supermarkets to discard unsold edible food; they must donate it."
    ],
    indiaRelation: {
      summary: "France is one of India's strongest and old strategic defense allies in Europe.",
      jointExercise: "Varuna & Garuda & Shakti",
      sharedProjects: "Co-founding the global International Solar Alliance (ISA).",
      funFactsWithIndia: [
        "India procured Rafale fighter jets and Scorpene-class submarines from France.",
        "ISRO and French Space Agency (CNES) cooperate on climate satellites."
      ]
    }
  },
  {
    code: "de",
    name: "Germany",
    capital: "Berlin",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 84000000,
    languages: ["German"],
    landmark: "Brandenburg Gate",
    funFacts: [
      "Sections of Germany's Autobahn highway network have no federally mandated speed limit.",
      "Around one-third of Germany remains covered in forests."
    ],
    indiaRelation: {
      summary: "Germany is India's largest trading partner in Europe for machinery and technology.",
      sharedProjects: "India-Germany Green and Sustainable Development Partnership.",
      funFactsWithIndia: [
        "Germany hosts over 25,000 Indian students in high-tech institutions.",
        "Sanskrit and Indology studies have been popular in German academia since the 19th Century."
      ]
    }
  },
  {
    code: "it",
    name: "Italy",
    capital: "Rome",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 59000000,
    languages: ["Italian"],
    landmark: "Colosseum",
    funFacts: [
      "Italy entirely surrounds water and land boundaries of San Marino and Vatican City.",
      "It has three active volcanoes: Etna, Stromboli, and Vesuvius."
    ],
    indiaRelation: {
      summary: "India and Italy share elevated Strategic Partnership ties spanning renewable energy and logistics.",
      sharedProjects: "Italy-India Mobility Pact for professionals and students.",
      funFactsWithIndia: [
        "Both nations have active cultural restoration agreements for historic monuments.",
        "Bilateral agreements have streamlined IT talent exchange programs."
      ]
    }
  },
  {
    code: "es",
    name: "Spain",
    capital: "Madrid",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 47500000,
    languages: ["Spanish"],
    landmark: "Sagrada Família",
    funFacts: [
      "Spain produces over 40% of the world's olive oil supply.",
      "Madrid is situated at the exact geographic center of the Iberian Peninsula."
    ],
    indiaRelation: {
      summary: "India and Spain share robust defense and railway engineering partnerships.",
      sharedProjects: "Co-manufacturing Airbus C295 military transport aircraft in Vadodara, India.",
      funFactsWithIndia: [
        "The C295 project represents the first private sector military production project in India.",
        "Indian blockbusters have raised tourism in Spain's coastal regions."
      ]
    }
  },
  {
    code: "ch",
    name: "Switzerland",
    capital: "Bern",
    continent: "Europe",
    currency: { name: "Swiss Franc", code: "CHF", symbol: "CHF" },
    population: 8800000,
    languages: ["German", "French", "Italian", "Romansh"],
    landmark: "The Matterhorn",
    funFacts: [
      "The Swiss flag is one of only two square sovereign flags in the world.",
      "It is illegal to own just one social pet (like a guinea pig) because they get lonely."
    ],
    indiaRelation: {
      summary: "India and Switzerland share a 1948 Friendship Treaty, with strong trade via EFTA agreements.",
      sharedProjects: "Automatic tax exchange models to increase banking transparency.",
      funFactsWithIndia: [
        "Switzerland was highly romanticized in Indian cinema by director Yash Chopra.",
        "India models several vocational training institutes on Swiss apprenticeship designs."
      ]
    }
  },
  {
    code: "nl",
    name: "Netherlands",
    capital: "Amsterdam",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 17800000,
    languages: ["Dutch"],
    landmark: "Windmills of Kinderdijk",
    funFacts: [
      "Over one-third of the country sits below sea level, protected by ancient dikes.",
      "The Netherlands has more bicycles than residents."
    ],
    indiaRelation: {
      summary: "The Netherlands is a major gateway for Indian logistics in Europe, cooperating on smart water systems.",
      sharedProjects: "Clean Ganges water restoration initiatives.",
      funFactsWithIndia: [
        "Home to the second-largest Indian origin diaspora population in mainland Europe.",
        "Dutch water engineers coordinate with coastal Indian municipalities on flood prevention."
      ]
    }
  },
  {
    code: "gr",
    name: "Greece",
    capital: "Athens",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 10400000,
    languages: ["Greek"],
    landmark: "Parthenon",
    funFacts: [
      "No point in Greece is more than 85 miles from the sea.",
      "Greece enjoys around 250 days of sun every single year."
    ],
    indiaRelation: {
      summary: "India and Greece share civilizational bonds dating back to Alexander the Great.",
      funFactsWithIndia: [
        "Ancient Mauryan courts hosted Greek ambassador Megasthenes.",
        "Indian aircraft participate in joint Mediterranean Iniochos exercises."
      ]
    }
  },
  {
    code: "se",
    name: "Sweden",
    capital: "Stockholm",
    continent: "Europe",
    currency: { name: "Swedish Krona", code: "SEK", symbol: "kr" },
    population: 10500000,
    languages: ["Swedish"],
    landmark: "Vasa Museum",
    funFacts: [
      "Sweden imports waste from other countries to power its clean energy recycling plants.",
      "It features over 267,000 islands."
    ],
    indiaRelation: {
      summary: "India and Sweden maintain stable science, carbon transition, and industrial partnerships.",
      sharedProjects: "LEAD-IT (Leadership Group for Industry Transition)."
    }
  },
  {
    code: "ie",
    name: "Ireland",
    capital: "Dublin",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 5200000,
    languages: ["Irish", "English"],
    landmark: "Cliffs of Moher",
    funFacts: [
      "Ireland is nicknamed the Emerald Isle.",
      "The harp is the official national symbol of Ireland."
    ],
    indiaRelation: {
      summary: "India and Ireland share friendly ties rooted in anti-colonial movements and education.",
      funFactsWithIndia: [
        "Irish constitutional frameworks inspired the Directive Principles in the Indian Constitution.",
        "Former Irish PM Leo Varadkar has family roots in India."
      ]
    }
  },
  {
    code: "ru",
    name: "Russia",
    capital: "Moscow",
    continent: "Europe",
    currency: { name: "Russian Ruble", code: "RUB", symbol: "₽" },
    population: 146000000,
    languages: ["Russian"],
    landmark: "Red Square & Kremlin",
    funFacts: [
      "Russia has the largest landmass globally, covering 11 timezone boundaries.",
      "The Lake Baikal contains over 20% of Earth's unfrozen fresh surface water."
    ],
    indiaRelation: {
      summary: "India and Russia share a time-tested 'special and privileged strategic partnership'.",
      jointExercise: "INDRA (joint army, navy, and air drills)",
      sharedProjects: "BrahMos supersonic cruise missiles developmental programs + Kudankulam Nuclear Plant.",
      funFactsWithIndia: [
        "Russia has been India's key defense supplier since independent eras.",
        "BrahMos is named after the Brahmaputra (India) and Moskva (Russia) rivers."
      ]
    }
  },
  {
    code: "al",
    name: "Albania",
    capital: "Tirana",
    continent: "Europe",
    currency: { name: "Albanian Lek", code: "ALL", symbol: "L" },
    population: 2800000,
    languages: ["Albanian"],
    landmark: "Gjirokastër Castle",
    funFacts: [
      "Albania features a unique gesture where nodding means no, and shaking your head means yes.",
      "It has over 170,000 concrete defense bunkers built during the Cold War."
    ],
    indiaRelation: {
      summary: "Ties are warm; Nobel winner Mother Teresa was of ethnic Albanian birth and is celebrated in both nations."
    }
  },
  {
    code: "ad",
    name: "Andorra",
    capital: "Andorra la Vella",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 80000,
    languages: ["Catalan"],
    landmark: "Madriu-Perafita-Claror Valley",
    funFacts: [
      "Andorra is the only country in the world where Catalan is the sole official language.",
      "It is co-ruled by two princes: the President of France and the Bishop of Urgell in Spain."
    ],
    indiaRelation: {
      summary: "India and Andorra share warm diplomatic relations, supported by mutual backing in multilateral UN forums."
    }
  },
  {
    code: "at",
    name: "Austria",
    capital: "Vienna",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 9000000,
    languages: ["German"],
    landmark: "Schönbrunn Palace",
    funFacts: [
      "Austria has the oldest continuously operating zoo in the world, founded in 1752 in Vienna.",
      "It is the birthplace of world-renowned classical composers like Mozart and Schubert."
    ],
    indiaRelation: {
      summary: "India and Austria share stable technological and heavy-industry machinery trade ties."
    }
  },
  {
    code: "by",
    name: "Belarus",
    capital: "Minsk",
    continent: "Europe",
    currency: { name: "Belarusian Ruble", code: "BYN", symbol: "Rbl" },
    population: 9200000,
    languages: ["Belarusian", "Russian"],
    landmark: "Mir Castle Complex",
    funFacts: [
      "Over 40% of Belarus is covered in dense primeval forests.",
      "It is nicknamed the 'Lungs of Europe' due to its vast carbon-absorbing bogs."
    ],
    indiaRelation: {
      summary: "India imports potassium and compound mining fertilizers from Belarus."
    }
  },
  {
    code: "be",
    name: "Belgium",
    capital: "Brussels",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 11700000,
    languages: ["Dutch", "French", "German"],
    landmark: "Grand Place",
    funFacts: [
      "Belgium is world-famous for chocolate, producing over 220,000 tonnes of it annually.",
      "Brussels acts as the de facto administrative headquarters of the European Union and NATO."
    ],
    indiaRelation: {
      summary: "India and Belgium maintain major commercial links, particularly centered around the diamond sorting hubs of Antwerp.",
      funFactsWithIndia: [
        "Antwerp's diamond industry features a highly prominent mercantile community of Indian diamantaires."
      ]
    }
  },
  {
    code: "ba",
    name: "Bosnia and Herzegovina",
    capital: "Sarajevo",
    continent: "Europe",
    currency: { name: "Convertible Mark", code: "BAM", symbol: "KM" },
    population: 3200000,
    languages: ["Bosnian", "Croatian", "Serbian"],
    landmark: "Stari Most Bridge",
    funFacts: [
      "Sarajevo was the host city of the 1984 Winter Olympics.",
      "The Stari Most is a rebuilt 16th-century Ottoman bridge in Mostar, historic for local high-divers."
    ],
    indiaRelation: {
      summary: "India shares warm relations based on Non-Aligned Movement (NAM) histories with former Yugoslavia."
    }
  },
  {
    code: "bg",
    name: "Bulgaria",
    capital: "Sofia",
    continent: "Europe",
    currency: { name: "Bulgarian Lev", code: "BGN", symbol: "лв" },
    population: 6400000,
    languages: ["Bulgarian"],
    landmark: "Rila Monastery",
    funFacts: [
      "Bulgaria is one of the world's oldest European states, retaining its original name since 681 AD.",
      "It produces about 85% of the world's essential Rose Oil, vital for premium perfumery."
    ],
    indiaRelation: {
      summary: "India and Bulgaria maintain robust scientific, space-tracking, and pharmaceutical exchanges."
    }
  },
  {
    code: "hr",
    name: "Croatia",
    capital: "Zagreb",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 3800000,
    languages: ["Croatian"],
    landmark: "Dubrovnik Old City Walls",
    funFacts: [
      "Croatia is the inventor of the necktie (cravat), popularized by Croatian soldiers in the 17th century.",
      "Dubrovnik served as the primary filming location for King's Landing in Game of Thrones."
    ],
    indiaRelation: {
      summary: "India and Croatia interact on tourism and pharmaceutical development projects."
    }
  },
  {
    code: "cz",
    name: "Czech Republic",
    capital: "Prague",
    continent: "Europe",
    currency: { name: "Czech Koruna", code: "CZK", symbol: "Kč" },
    population: 10500000,
    languages: ["Czech"],
    landmark: "Charles Bridge",
    funFacts: [
      "Prague features the world's largest ancient castle complex, built starting in the 9th century.",
      "The country has the highest beer consumption per capita globally."
    ],
    indiaRelation: {
      summary: "India and the Czech Republic coordinate extensively on engineering tools, metallurgy, and auto components."
    }
  },
  {
    code: "dk",
    name: "Denmark",
    capital: "Copenhagen",
    continent: "Europe",
    currency: { name: "Danish Krone", code: "DKK", symbol: "kr." },
    population: 5900000,
    languages: ["Danish"],
    landmark: "The Little Mermaid",
    funFacts: [
      "Denmark is birthplace of the world-famous colorful LEGO plastic building bricks.",
      "Copenhagen features the world's oldest amusement parks, Tivoli Gardens and Bakken."
    ],
    indiaRelation: {
      summary: "India and Denmark cooperat on Green Strategic Partnership lines, water conservation, and renewable wind grids.",
      sharedProjects: "Smart water recycling systems in Indian cities."
    }
  },
  {
    code: "ee",
    name: "Estonia",
    capital: "Tallinn",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 1300000,
    languages: ["Estonian"],
    landmark: "Tallinn Old Town",
    funFacts: [
      "Estonia is some of the most digitized societies globally, pioneering paperless voting and e-residency.",
      "Nearly 50% of Estonia's landmass is covered in fully protected forests."
    ],
    indiaRelation: {
      summary: "India and Estonia coordinate on global cybersecurity and digital e-governance technology transfers."
    }
  },
  {
    code: "fi",
    name: "Finland",
    capital: "Helsinki",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 5500000,
    languages: ["Finnish", "Swedish"],
    landmark: "Suomenlinna Fortress",
    funFacts: [
      "Finland is consistently ranked as the happiest country in the world.",
      " Saunas are a staple of Finnish culture, with over 3 million saunas (more than cars)."
    ],
    indiaRelation: {
      summary: "India and Finland operate dynamic exchange programs in high-altitude geology, 6G networks, and clean tech."
    }
  },
  {
    code: "hu",
    name: "Hungary",
    capital: "Budapest",
    continent: "Europe",
    currency: { name: "Hungarian Forint", code: "HUF", symbol: "Ft" },
    population: 9600000,
    languages: ["Hungarian"],
    landmark: "Hungarian Parliament Building",
    funFacts: [
      "Hungary is the inventor of the Rubik's Cube, designed by Erno Rubik in 1974.",
      "The thermal water springs of Budapest have been active since Roman eras."
    ],
    indiaRelation: {
      summary: "India and Hungary cooperate on technological research and pharmaceutical pipelines."
    }
  },
  {
    code: "is",
    name: "Iceland",
    capital: "Reykjavík",
    continent: "Europe",
    currency: { name: "Icelandic Króna", code: "ISK", symbol: "kr" },
    population: 380000,
    languages: ["Icelandic"],
    landmark: "Blue Lagoon",
    funFacts: [
      "Iceland has no mosquitoes at all because of rapid seasonal freeze cycles.",
      "Over 99% of its domestic electricity is generated through geothermal and hydro systems."
    ],
    indiaRelation: {
      summary: "India and Iceland share research on geothermal energy and cold climate agricultural techniques."
    }
  },
  {
    code: "lv",
    name: "Latvia",
    capital: "Riga",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 1800000,
    languages: ["Latvian"],
    landmark: "House of the Blackheads",
    funFacts: [
      "Latvia is home to Ventas Rumba, the widest natural waterfall in Europe at 249 meters.",
      "Over 50% of the country is covered in lush birch and pine forests."
    ],
    indiaRelation: {
      summary: "India and Latvia cooperate on trade and technical education opportunities in Baltic universities."
    }
  },
  {
    code: "li",
    name: "Liechtenstein",
    capital: "Vaduz",
    continent: "Europe",
    currency: { name: "Swiss Franc", code: "CHF", symbol: "CHF" },
    population: 39000,
    languages: ["German"],
    landmark: "Vaduz Castle",
    funFacts: [
      "Liechtenstein is the world's leading manufacturer of high-end false teeth.",
      "It is doubly landlocked, sharing bounds with only Switzerland and Austria."
    ],
    indiaRelation: {
      summary: "India and Liechtenstein coordinate on tracking double taxation evasion."
    }
  },
  {
    code: "lt",
    name: "Lithuania",
    capital: "Vilnius",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 2800000,
    languages: ["Lithuanian"],
    landmark: "Trakai Island Castle",
    funFacts: [
      "Lithuanian is one of the oldest surviving Indo-European languages.",
      "It features a unique sacred 'Hill of Crosses' packed with over 200,000 crosses."
    ],
    indiaRelation: {
      summary: "Lithuanian shares profound linguistic and grammatical matches with Sanskrit.",
      funFactsWithIndia: [
        "Words like 'Devas' and 'Ugnis' have direct cognates in both Lithuanian and Sanskrit as ancient linguistic ties."
      ]
    }
  },
  {
    code: "lu",
    name: "Luxembourg",
    capital: "Luxembourg",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 660000,
    languages: ["Luxembourgish", "French", "German"],
    landmark: "Bock Casemates",
    funFacts: [
      "Luxembourg is the first country to make all domestic public transport completely free.",
      "It consistently reports the highest GDP per capita across Europe."
    ],
    indiaRelation: {
      summary: "Luxembourg is an active finance and investment gate for Indian private corporate bonds."
    }
  },
  {
    code: "mt",
    name: "Malta",
    capital: "Valletta",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 530000,
    languages: ["Maltese", "English"],
    landmark: "Ggantija Temples",
    funFacts: [
      "Malta features megalithic temples that are older than both Stonehenge and the Pyramids.",
      "Valletta is the smallest capital city in the European Union."
    ],
    indiaRelation: {
      summary: "India established deep diplomatic ties with Malta to assist Indian generic pharma distribution in the Mediterranean."
    }
  },
  {
    code: "md",
    name: "Moldova",
    capital: "Chisinau",
    continent: "Europe",
    currency: { name: "Moldovan Leu", code: "MDL", symbol: "L" },
    population: 2500000,
    languages: ["Romanian"],
    landmark: "Milestii Mici Winery",
    funFacts: [
      "Milestii Mici is the world's largest wine cellar complex, housing over 2 million bottles.",
      "Moldova is a highly agriculturally intensive country, famous for sunflower seed oil."
    ],
    indiaRelation: {
      summary: "India and Moldova coordinate on trade and agricultural studies."
    }
  },
  {
    code: "mc",
    name: "Monaco",
    capital: "Monaco",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 39000,
    languages: ["French"],
    landmark: "Monte Carlo Casino",
    funFacts: [
      "Monaco is the second-smallest country globally but the most densely populated.",
      "It features the world-famous Monaco Grand Prix Formula One street race."
    ],
    indiaRelation: {
      summary: "India and Monaco share friendly diplomatic relations with elite investments in clean tourism."
    }
  },
  {
    code: "me",
    name: "Montenegro",
    capital: "Podgorica",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 620000,
    languages: ["Montenegrin"],
    landmark: "Kotor Bay",
    funFacts: [
      "Montenegro translates to Black Mountain, referencing dark pine forests of Mount Lovcen.",
      "It unilaterally adopted the Euro as its legal currency despite not being an EU member."
    ],
    indiaRelation: {
      summary: "India and Montenegro maintain cordial educational and cultural exchange platforms."
    }
  },
  {
    code: "no",
    name: "Norway",
    capital: "Oslo",
    continent: "Europe",
    currency: { name: "Norwegian Krone", code: "NOK", symbol: "kr" },
    population: 5500000,
    languages: ["Norwegian"],
    landmark: "Geirangerfjord",
    funFacts: [
      "Norway is the Land of the Midnight Sun, where daylight shines 24 hours in northern summers.",
      "The Nobel Peace Prize is awarded in Oslo (unlike the other Nobel prizes)."
    ],
    indiaRelation: {
      summary: "India and Norway coordinate closely on oceanic research under the India-Norway Ocean Dialogue.",
      sharedProjects: "Cooperation on deep sea research and sustainable maritime vessels."
    }
  },
  {
    code: "pl",
    name: "Poland",
    capital: "Warsaw",
    continent: "Europe",
    currency: { name: "Polish Zloty", code: "PLN", symbol: "zł" },
    population: 38000000,
    languages: ["Polish"],
    landmark: "Wawel Royal Castle",
    funFacts: [
      "Poland has the world's largest brick castle, Malbork Castle, built by Teutonic Knights.",
      "Marie Curie, who discovered Polonium and Radium, was born in Warsaw."
    ],
    indiaRelation: {
      summary: "India and Poland share robust electronic machinery and heavy metal trading channels.",
      funFactsWithIndia: [
        "A Maharaja of Jamnagar, India, sheltered over 1,000 Polish refugee children during World War II."
      ]
    }
  },
  {
    code: "pt",
    name: "Portugal",
    capital: "Lisbon",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 10300000,
    languages: ["Portuguese"],
    landmark: "Belém Tower",
    funFacts: [
      "Portugal is one of the oldest sovereign nations in Europe, with boundaries defined since 1139.",
      "Half of the world's cork is harvested natively in Portugal."
    ],
    indiaRelation: {
      summary: "The first Europeans to arrive in India by sea were Portuguese, landing in Kozhikode in 1498.",
      sharedProjects: "National Maritime Heritage Complex at Lothal, Gujarat.",
      funFactsWithIndia: [
        "Explorer Vasco da Gama was buried in Kochi, Kerala, before his remains were returned to Lisbon."
      ]
    }
  },
  {
    code: "ro",
    name: "Romania",
    capital: "Bucharest",
    continent: "Europe",
    currency: { name: "Romanian Leu", code: "RON", symbol: "lei" },
    population: 19000000,
    languages: ["Romanian"],
    landmark: "Bran Castle",
    funFacts: [
      "Bran Castle in Transylvania is the legendary castle linked to Dracula.",
      "Romania has the heaviest state building, the Palace of the Parliament."
    ],
    indiaRelation: {
      summary: "India and Romania share stable trading on chemical exports and automotive parts."
    }
  },
  {
    code: "sm",
    name: "San Marino",
    capital: "San Marino",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 34000,
    languages: ["Italian"],
    landmark: "Three Towers of San Marino",
    funFacts: [
      "San Marino is the oldest surviving constitutional republic globally, founded in 301 AD.",
      "It is completely landlocked by Italy."
    ],
    indiaRelation: {
      summary: "India and San Marino share cordial relations, supported by clean IT business networks."
    }
  },
  {
    code: "rs",
    name: "Serbia",
    capital: "Belgrade",
    continent: "Europe",
    currency: { name: "Serbian Dinar", code: "RSD", symbol: "дин." },
    population: 6600000,
    languages: ["Serbian"],
    landmark: "Saint Sava Temple",
    funFacts: [
      "Belgrade of Serbia is one of the oldest European cities, having been fought over in 115 wars.",
      "The country produces about 20% of the world's raspberry harvest."
    ],
    indiaRelation: {
      summary: "India and Serbia share a background of warm ties from the era of NAM."
    }
  },
  {
    code: "sk",
    name: "Slovakia",
    capital: "Bratislava",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 5400000,
    languages: ["Slovak"],
    landmark: "Bratislava Castle",
    funFacts: [
      "Slovakia has the world's highest car production per capita, dominated by giant assembly hubs.",
      "It features more than 6,000 caves."
    ],
    indiaRelation: {
      summary: "India and Slovakia participate in metallurgy, automotive supply chains, and defense equipment."
    }
  },
  {
    code: "si",
    name: "Slovenia",
    capital: "Ljubljana",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 2100000,
    languages: ["Slovenian"],
    landmark: "Lake Bled",
    funFacts: [
      "Slovenia features pristine Lake Bled, with a historic church built on a tiny island.",
      "Nearly 60% of Slovenia is fully covered in protected forest reserve."
    ],
    indiaRelation: {
      summary: "India and Slovenia share science/technology and pharmaceutical exchanges."
    }
  },
  {
    code: "ua",
    name: "Ukraine",
    capital: "Kyiv",
    continent: "Europe",
    currency: { name: "Ukrainian Hryvnia", code: "UAH", symbol: "₴" },
    population: 38000000,
    languages: ["Ukrainian"],
    landmark: "Saint Sophia Cathedral",
    funFacts: [
      "Ukraine is the largest country located entirely within Europe.",
      "It is globally known as the Breadbasket of Europe due to its rich agricultural soils."
    ],
    indiaRelation: {
      summary: "India and Ukraine previously shared comprehensive training projects, sunflower oil imports, and study exchanges.",
      funFactsWithIndia: [
        "In 2022, India launched Operation Ganga to safely evacuate over 22,000 Indian medical scholars from Ukraine."
      ]
    }
  },
  {
    code: "va",
    name: "Vatican City",
    capital: "Vatican City",
    continent: "Europe",
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    population: 800,
    languages: ["Latin", "Italian"],
    landmark: "St. Peter's Basilica",
    funFacts: [
      "Vatican City is the smallest independent state globally, both in area and population.",
      "It has its own police force, banking system, post office, and telephone service."
    ],
    indiaRelation: {
      summary: "India and the Holy See share formal diplomatic ties dating to 1948, focusing on humanitarian actions."
    }
  },
  {
    code: "mk",
    name: "North Macedonia",
    capital: "Skopje",
    continent: "Europe",
    currency: { name: "Macedonian Denar", code: "MKD", symbol: "ден" },
    population: 2000000,
    languages: ["Macedonian"],
    landmark: "Stone Bridge of Skopje",
    funFacts: [
      "North Macedonia is landlocked and features deep, tectonic Lake Ohrid.",
      "It is birthplace of Mother Teresa, who was born in Skopje in 1910."
    ],
    indiaRelation: {
      summary: "India and North Macedonia share cordial ties, with Skopje hosting a monument in honor of Mother Teresa's Indian humanitarian mission."
    }
  },
  {
    code: "am",
    name: "Armenia",
    capital: "Yerevan",
    continent: "Europe",
    currency: { name: "Armenian Dram", code: "AMD", symbol: "֏" },
    population: 2800000,
    languages: ["Armenian"],
    landmark: "Temple of Garni",
    funFacts: [
      "Armenia was the first nation to adopt Christianity as its state religion in 301 AD.",
      "Its capital, Yerevan, is older than Rome, founded in 782 BC."
    ],
    indiaRelation: {
      summary: "India and Armenia share warm ties, with Armenia recently purchasing Indian Pinaka multi-barrel rocket systems."
    }
  },
  {
    code: "az",
    name: "Azerbaijan",
    capital: "Baku",
    continent: "Europe",
    currency: { name: "Azerbaijani Manat", code: "AZN", symbol: "₼" },
    population: 10200000,
    languages: ["Azerbaijani"],
    landmark: "Maiden Tower in Baku",
    funFacts: [
      "Azerbaijan is known as the Land of Fire due to high underground natural gas venting.",
      "It features over half of the world's mud volcanoes."
    ],
    indiaRelation: {
      summary: "India and Azerbaijan coordinate on petroleum projects, and Baku's 'Ateshgah' is a historic temple carrying Sanskrit inscriptions indicating deep trade ties."
    }
  }
];
