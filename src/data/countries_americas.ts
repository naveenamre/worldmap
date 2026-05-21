import { Country } from "./types_country";

export const americasCountries: Country[] = [
  // --- NORTH AMERICA (23 COUNTRIES) ---
  {
    code: "us",
    name: "United States",
    capital: "Washington, D.C.",
    continent: "North America",
    currency: { name: "US Dollar", code: "USD", symbol: "$" },
    population: 333000000,
    languages: ["English"],
    landmark: "Statue of Liberty",
    funFacts: [
      "The US does not have an official national language at the federal level.",
      "It is home to the world's tallest tree, a coast redwood named Hyperion, measuring over 380 feet."
    ],
    indiaRelation: {
      summary: "India and the US maintain a global strategic partnership, cooperating on defense, space, and Indo-Pacific security.",
      jointExercise: "Yudh Abhyas & Vajra Prahar (Military), Malabar (Naval)",
      sharedProjects: "NASA-ISRO Synthetic Aperture Radar (NISAR) satellite mission + QUAD Alliance.",
      funFactsWithIndia: [
        "The US is home to a massive Indian diaspora of over 4.5 million, with several holding leadership roles in top tech companies.",
        "NISAR is an advanced joint radar satellite designed to observe Earth's changing ecosystems."
      ]
    }
  },
  {
    code: "ca",
    name: "Canada",
    capital: "Ottawa",
    continent: "North America",
    currency: { name: "Canadian Dollar", code: "CAD", symbol: "CA$" },
    population: 40000000,
    languages: ["English", "French"],
    landmark: "CN Tower",
    funFacts: [
      "Canada has more lakes than the rest of the world combined.",
      "It is the global capital of maple syrup, producing over 70% of the world's supply."
    ],
    indiaRelation: {
      summary: "India and Canada share bilateral relations rooted in common democratic values, education exchanges, and a large diaspora.",
      sharedProjects: "Bilateral Science and Technology Agreement.",
      funFactsWithIndia: [
        "Over 1.8 million Canadians of Indian origin reside here, making up about 5% of the total population.",
        "Indian students comprise the single largest group of international scholars pursuing higher studies in Canadian universities."
      ]
    }
  },
  {
    code: "mx",
    name: "Mexico",
    capital: "Mexico City",
    continent: "North America",
    currency: { name: "Mexican Peso", code: "MXN", symbol: "Mex$" },
    population: 128000000,
    languages: ["Spanish"],
    landmark: "Chichen Itza",
    funFacts: [
      "Mexico City is sinking roughly 10 inches per year because it was built over dry lakebeds.",
      "Mexico introduced chocolate, corn, and chilies to the rest of the world."
    ],
    indiaRelation: {
      summary: "India and Mexico share 'Privileged Partnership' status, with strong warm ties spanning aerospace, energy, and IT sectors.",
      sharedProjects: "ISRO and Mexican Space Agency (AEM) joint satellite development pacts.",
      funFactsWithIndia: [
        "Mexico was the first Latin American country to recognize independent India back in August 1950.",
        "Scientist M.S. Swaminathan collaborated extensively with Mexican wheat projects during the Green Revolution."
      ]
    }
  },
  {
    code: "cr",
    name: "Costa Rica",
    capital: "San José",
    continent: "North America",
    currency: { name: "Costa Rican Colón", code: "CRC", symbol: "₡" },
    population: 5200000,
    languages: ["Spanish"],
    landmark: "Arenal Volcano",
    funFacts: [
      "Costa Rica constitutionally abolished its military completely in 1948.",
      "The common greeting 'Pura Vida' means 'pure life' and is a way of living."
    ],
    indiaRelation: {
      summary: "India and Costa Rica share warm diplomatic cooperation, supported by mutual interest in ecological conservation and IT.",
      sharedProjects: "India-Costa Rica IT Center of Excellence to train Central American professionals.",
      funFactsWithIndia: [
        "Costa Rica supports India's bid for a permanent seat on the United Nations Security Council.",
        "A large number of Indian IT engineers assist with multinational offshore centers in Costa Rica."
      ]
    }
  },
  {
    code: "pa",
    name: "Panama",
    capital: "Panama City",
    continent: "North America",
    currency: { name: "Panamanian Balboa", code: "PAB", symbol: "B/." },
    population: 4400000,
    languages: ["Spanish"],
    landmark: "Panama Canal",
    funFacts: [
      "Panama is the only place where you can see the sun rise on the Pacific and set on the Atlantic.",
      "The Panama Canal connects the Atlantic and Pacific, saving ships from a 15,000-mile detour."
    ],
    indiaRelation: {
      summary: "Panama was the first Central American nation to develop ties with India, acting as a primary trade gateway through the Colon Free Zone.",
      sharedProjects: "Shared IT training centers and mutual maritime cooperation.",
      funFactsWithIndia: [
        "Indian traders first arrived in Panama in the mid-19th Century to assist in constructing the Panama Canal Railroad.",
        "Panama represents the largest concentration of Overseas Indians in the Central American region."
      ]
    }
  },
  {
    code: "jm",
    name: "Jamaica",
    capital: "Kingston",
    continent: "North America",
    currency: { name: "Jamaican Dollar", code: "JMD", symbol: "J$" },
    population: 2800000,
    languages: ["English", "Patois"],
    landmark: "Dunn's River Falls",
    funFacts: [
      "Jamaica is the birthplace of Reggae music and legendary sprinter Usain Bolt.",
      "It has the most churches per square mile of any country in the world."
    ],
    indiaRelation: {
      summary: "India and Jamaica maintain warm relations, united by Commonwealth heritages, cricket, and shared democratic ideals.",
      sharedProjects: "Bilateral technical assistance under the ITEC program.",
      funFactsWithIndia: [
        "Kingston's 'India-Jamaica Friendship Garden' celebrates the arrival of Indian laborers starting in 1845.",
        "Bilateral relations are strengthened by a shared enthusiasm for cricket."
      ]
    }
  },
  {
    code: "cu",
    name: "Cuba",
    capital: "Havana",
    continent: "North America",
    currency: { name: "Cuban Peso", code: "CUP", symbol: "₱" },
    population: 11000000,
    languages: ["Spanish"],
    landmark: "El Capitolio",
    funFacts: [
      "Cuba is known for its well-preserved retro 1950s American cars rolling through Havana.",
      "Cuba has one of the highest literacy rates in the world at 99.8%."
    ],
    indiaRelation: {
      summary: "India and Cuba are founding members of the Non-Aligned Movement, enjoying close ties based on medical and food science cooperation.",
      sharedProjects: "Bilateral solar energy and active pharmaceutical ingredient exports.",
      funFactsWithIndia: [
        "Fidel Castro and Jawaharlal Nehru shared an iconic friendship that spearheaded early South-South cooperation.",
        "India donated 100,000 tonnes of wheat to Cuba during critical food shortages, earning gratitude."
      ]
    }
  },
  {
    code: "do",
    name: "Dominican Republic",
    capital: "Santo Domingo",
    continent: "North America",
    currency: { name: "Dominican Peso", code: "DOP", symbol: "RD$" },
    population: 11300000,
    languages: ["Spanish"],
    landmark: "Zona Colonial",
    funFacts: [
      "Santo Domingo, founded in 1496, is the oldest continuously inhabited European settlement in the Americas.",
      "The country's national dance and music is the fast-paced, rhythmic Merengue."
    ],
    indiaRelation: {
      summary: "India and the Dominican Republic share growing trade relations focused on pharmaceuticals, gold, and IT services.",
      sharedProjects: "IT training center of excellence in Santo Domingo.",
      funFactsWithIndia: [
        "India opened a resident embassy in Santo Domingo recently to accommodate expanding trade and visa requests.",
        "The Dominican Republic exports refined gold and zinc ores to industrial sectors in India."
      ]
    }
  },
  {
    code: "bs",
    name: "Bahamas",
    capital: "Nassau",
    continent: "North America",
    currency: { name: "Bahamian Dollar", code: "BSD", symbol: "B$" },
    population: 410000,
    languages: ["English"],
    landmark: "Atlantis Paradise Island",
    funFacts: [
      "The Bahamas is home to the world-famous swimming pigs at Big Major Cay beach.",
      "The name Bahamas comes from the Spanish words 'baja mar', meaning shallow water."
    ],
    indiaRelation: {
      summary: "India and the Bahamas coordinate on international maritime forums and benefit from growing tourism and finance exchanges."
    }
  },
  {
    code: "bb",
    name: "Barbados",
    capital: "Bridgetown",
    continent: "North America",
    currency: { name: "Barbadian Dollar", code: "BBD", symbol: "Bds$" },
    population: 281000,
    languages: ["English"],
    landmark: "Harrison's Cave",
    funFacts: [
      "Barbados is the birthplace of pop superstar Rihanna.",
      "It is widely regarded as the birthplace of rum, with Mount Gay distilleries running since 1703."
    ],
    indiaRelation: {
      summary: "India and Barbados share cordial relations through Commonwealth cricket, disaster relief, and healthcare partnerships.",
      funFactsWithIndia: [
        "India donated Covishield vaccines directly to Barbados during the pandemic, prompting gratitude from PM Mia Mottley.",
        "Sir Garfield Sobers and other cricket icons of Barbados remain legends highly admired in India."
      ]
    }
  },
  {
    code: "ag",
    name: "Antigua and Barbuda",
    capital: "St. John's",
    continent: "North America",
    currency: { name: "East Caribbean Dollar", code: "XCD", symbol: "EC$" },
    population: 100000,
    languages: ["English"],
    landmark: "Nelson's Dockyard",
    funFacts: [
      "Antigua has exactly 365 beaches, boasting 'one for every day of the year'.",
      "Cricket is the official national sport, with several legendary players born here."
    ],
    indiaRelation: {
      summary: "India supports Antigua and Barbuda through bilateral grants, IT resources, and active disaster management resources."
    }
  },
  {
    code: "bz",
    name: "Belize",
    capital: "Belmopan",
    continent: "North America",
    currency: { name: "Belize Dollar", code: "BZD", symbol: "BZ$" },
    population: 412000,
    languages: ["English", "Belizean Creole", "Spanish"],
    landmark: "Great Blue Hole",
    funFacts: [
      "Belize is the only country in Central America where English is the sole official language.",
      "The Great Blue Hole is a giant marine sinkhole off the coast, measuring over 300 meters across."
    ],
    indiaRelation: {
      summary: "India and Belize cooperate via the India-CARICOM framework, focusing on climate change and vocational studies."
    }
  },
  {
    code: "dm",
    name: "Dominica",
    capital: "Roseau",
    continent: "North America",
    currency: { name: "East Caribbean Dollar", code: "XCD", symbol: "EC$" },
    population: 730000,
    languages: ["English", "Antillean Creole"],
    landmark: "Boiling Lake",
    funFacts: [
      "Dominica is nicknamed the 'Nature Island of the Caribbean' due to its lush rainforests.",
      "It is home to Boiling Lake, the second-largest hot spring in the world."
    ],
    indiaRelation: {
      summary: "India provides developmental aid and medical supplies under South-South cooperation frameworks."
    }
  },
  {
    code: "sv",
    name: "El Salvador",
    capital: "San Salvador",
    continent: "North America",
    currency: { name: "US Dollar", code: "USD", symbol: "$" },
    population: 6300000,
    languages: ["Spanish"],
    landmark: "Santa Ana Volcano",
    funFacts: [
      "El Salvador is known as the 'Land of Volcanoes' because it has more than 20 active ones.",
      "It was the first country in the world to adopt Bitcoin as legal tender in 2021."
    ],
    indiaRelation: {
      summary: "India and El Salvador share warm diplomatic relations, with India providing IT training centers inside San Salvador."
    }
  },
  {
    code: "gd",
    name: "Grenada",
    capital: "St. George's",
    continent: "North America",
    currency: { name: "East Caribbean Dollar", code: "XCD", symbol: "EC$" },
    population: 125000,
    languages: ["English"],
    landmark: "Underwater Sculpture Park",
    funFacts: [
      "Grenada is known as the 'Spice Island' because it is one of the world's largest exporters of nutmeg and mace.",
      "It features the world's first underwater sculpture park, designed to act as an artificial reef."
    ],
    indiaRelation: {
      summary: "India and Grenada share warm ties, reinforced by Indian IT scholarships and disaster resilience training."
    }
  },
  {
    code: "gt",
    name: "Guatemala",
    capital: "Guatemala City",
    continent: "North America",
    currency: { name: "Guatemalan Quetzal", code: "GTQ", symbol: "Q" },
    population: 18000000,
    languages: ["Spanish"],
    landmark: "Tikal Mayan Ruins",
    funFacts: [
      "Guatemala has more than 30 volcanoes, three of which are consistently active.",
      "The name Guatemala translates to 'land of many trees' in the ancient Maya tongue."
    ],
    indiaRelation: {
      summary: "India is a major buyer of Guatemalan cardamom, and both nations collaborate on pharmaceutical exports.",
      funFactsWithIndia: [
        "Cardamom trade forms a main economic bridge, as India imports high-quality spices from Guatemalan farms."
      ]
    }
  },
  {
    code: "ht",
    name: "Haiti",
    capital: "Port-au-Prince",
    continent: "North America",
    currency: { name: "Haitian Gourde", code: "HTG", symbol: "G" },
    population: 11500000,
    languages: ["French", "Haitian Creole"],
    landmark: "Citadelle Laferrière",
    funFacts: [
      "Haiti was the world's first black-led republic after declaring independence from France in 1804.",
      "The Citadelle Laferrière is a massive mountaintop fortress built to repel colonial invasions."
    ],
    indiaRelation: {
      summary: "India has dispatched several UN peacekeeping forces to Haiti and continues to assist with emergency medical programs."
    }
  },
  {
    code: "hn",
    name: "Honduras",
    capital: "Tegucigalpa",
    continent: "North America",
    currency: { name: "Honduran Lempira", code: "HNL", symbol: "L" },
    population: 10400000,
    languages: ["Spanish"],
    landmark: "Copán Mayan Ruins",
    funFacts: [
      "Honduras has a unique yearly weather phenomenon where rain of fish occurs in Yoro.",
      "The currency is named Lempira after a native indigenous chieftain who fought Spanish conquerors."
    ],
    indiaRelation: {
      summary: "India has extended several developmental lines of credit to Honduras for solar pumps and rural irrigation projects."
    }
  },
  {
    code: "ni",
    name: "Nicaragua",
    capital: "Managua",
    continent: "North America",
    currency: { name: "Nicaraguan Córdoba", code: "NIO", symbol: "C$" },
    population: 6900000,
    languages: ["Spanish"],
    landmark: "Masaya Volcano",
    funFacts: [
      "Nicaragua contains Lake Nicaragua, the largest lake in Central America, hosting freshwater sharks.",
      "It has some of the oldest colonial towns in Central America, like Leon and Granada."
    ],
    indiaRelation: {
      summary: "India provides trade support, pharmaceutical supplies, and educational lines of credit to Nicaragua."
    }
  },
  {
    code: "kn",
    name: "Saint Kitts and Nevis",
    capital: "Basseterre",
    continent: "North America",
    currency: { name: "East Caribbean Dollar", code: "XCD", symbol: "EC$" },
    population: 480000,
    languages: ["English"],
    landmark: "Brimstone Hill Fortress",
    funFacts: [
      "St. Kitts and Nevis is the smallest sovereign state in the Americas, both in area and population.",
      "It is composed of two islands separated by a small 3-mile channel called The Narrows."
    ],
    indiaRelation: {
      summary: "India supports local wellness programs and provides technological grants under the CARICOM aid framework."
    }
  },
  {
    code: "lc",
    name: "Saint Lucia",
    capital: "Castries",
    continent: "North America",
    currency: { name: "East Caribbean Dollar", code: "XCD", symbol: "EC$" },
    population: 180000,
    languages: ["English"],
    landmark: "The Pitons Peaks",
    funFacts: [
      "St. Lucia is famous for the Pitons, two volcanic plugs rising steeply from the shoreline.",
      "It is the only country in the world named after a historic woman (Saint Lucy of Syracuse)."
    ],
    indiaRelation: {
      summary: "India and Saint Lucia enjoy friendly relations, with India providing active aid for IT, health, and sport training."
    }
  },
  {
    code: "vc",
    name: "Saint Vincent and the Grenadines",
    capital: "Kingstown",
    continent: "North America",
    currency: { name: "East Caribbean Dollar", code: "XCD", symbol: "EC$" },
    population: 104000,
    languages: ["English"],
    landmark: "La Soufrière Volcano",
    funFacts: [
      "It is composed of over 32 islands, many of which were chosen to shoot the Pirates of the Caribbean movies.",
      "La Soufrière is an active volcano rising to nearly 4,000 feet."
    ],
    indiaRelation: {
      summary: "India has signed agreements to establish a local center of excellence in IT and provides solar lights for street safety."
    }
  },
  {
    code: "tt",
    name: "Trinidad and Tobago",
    capital: "Port of Spain",
    continent: "North America",
    currency: { name: "Trinidad and Tobago Dollar", code: "TTD", symbol: "TT$" },
    population: 1530000,
    languages: ["English"],
    landmark: "Pitch Lake",
    funFacts: [
      "Trinidad and Tobago is the birthplace of the steelpan drum, calypso music, and limbo dancing.",
      "Pitch Lake is the world's largest natural deposit of asphalt, covering over 100 acres."
    ],
    indiaRelation: {
      summary: "India and Trinidad and Tobago enjoy deep relations due to half a million citizens tracing their roots back to India.",
      sharedProjects: "Mahatma Gandhi Institute for Cultural Cooperation + digital health initiatives.",
      funFactsWithIndia: [
        "Approximately 35% of the country's population are Indo-Trinidadians, whose ancestors arrived starting in 1845.",
        "Major Indian festivals like Diwali are observed as national state holidays here."
      ]
    }
  },

  // --- SOUTH AMERICA (12 COUNTRIES) ---
  {
    code: "br",
    name: "Brazil",
    capital: "Brasília",
    continent: "South America",
    currency: { name: "Brazilian Real", code: "BRL", symbol: "R$" },
    population: 215000000,
    languages: ["Portuguese"],
    landmark: "Christ the Redeemer",
    funFacts: [
      "Brazil is the fifth-largest country in the world and covers three time zones.",
      "The Amazon Rainforest, mostly located in Brazil, produces about 20% of Earth's oxygen."
    ],
    indiaRelation: {
      summary: "India and Brazil enjoy a multi-faceted partnership, coordinating in global forums like BRICS, G20, and IBSA.",
      sharedProjects: "Bilateral Agriculture research + BRICS New Development Bank.",
      funFactsWithIndia: [
        "India and Brazil are partners in 'IBSA' designed to foster South-South development.",
        "Brazil's modern cattle breeds include Nelore cattle, which was originally imported from Ongole, Andhra Pradesh."
      ]
    }
  },
  {
    code: "ar",
    name: "Argentina",
    capital: "Buenos Aires",
    continent: "South America",
    currency: { name: "Argentine Peso", code: "ARS", symbol: "$" },
    population: 46000000,
    languages: ["Spanish"],
    landmark: "Iguazu Falls",
    funFacts: [
      "Argentina has the highest consumption of red meat in the world.",
      "The dance and music of Tango originated in Buenos Aires."
    ],
    indiaRelation: {
      summary: "India and Argentina share strong trade cooperation, particularly in agricultural exports (lithium, soy oils) and nuclear energy.",
      sharedProjects: "ISRO and Argentina Space Agency (CONAE) cooperation on satellite earth tracking.",
      funFactsWithIndia: [
        "Indian Nobel laureate Rabindranath Tagore visited Argentina in 1924, writing several notable poems.",
        "Argentina represents a key frontier for mineral imports for India's domestic electric vehicle batteries."
      ]
    }
  },
  {
    code: "co",
    name: "Colombia",
    capital: "Bogotá",
    continent: "South America",
    currency: { name: "Colombian Peso", code: "COP", symbol: "Col$" },
    population: 52000000,
    languages: ["Spanish"],
    landmark: "Salt Cathedral of Zipaquirá",
    funFacts: [
      "Colombia produces about 60% of the world's most expensive emeralds.",
      "It is the second most biodiverse country in the world."
    ],
    indiaRelation: {
      summary: "India and Colombia participate in pharmaceutical exchanges, trade, and IT system modernization.",
      sharedProjects: "Cooperation in pharmaceutical supply chains and cyber defense exercises.",
      funFactsWithIndia: [
        "Colombia has shown significant interest in adopting India's digital public infrastructure (DPI) to overhaul local grids.",
        "Indian pharmaceuticals provide highly cost-effective generic medications to Colombia's national healthcare."
      ]
    }
  },
  {
    code: "pe",
    name: "Peru",
    capital: "Lima",
    continent: "South America",
    currency: { name: "Peruvian Sol", code: "PEN", symbol: "S/." },
    population: 34000000,
    languages: ["Spanish", "Quechua"],
    landmark: "Machu Picchu",
    funFacts: [
      "Peru is home to the mysterious Nazca Lines, giant geoglyphs etched into the desert.",
      "The potato is native to Peru, where over 4,000 distinct varieties are grown."
    ],
    indiaRelation: {
      summary: "India and Peru share expanding trade ties, negotiating a bilateral Free Trade Agreement (FTA) to boost mineral trade.",
      sharedProjects: "Cooperation in medicinal chemistry and Space technology.",
      funFactsWithIndia: [
        "Peru imports significant amounts of Indian automobiles, particularly three-wheelers.",
        "India imports large portions of gold ore from Peru's rich mineral veins."
      ]
    }
  },
  {
    code: "cl",
    name: "Chile",
    capital: "Santiago",
    continent: "South America",
    currency: { name: "Chilean Peso", code: "CLP", symbol: "Ch$" },
    population: 19600000,
    languages: ["Spanish"],
    landmark: "Easter Island Moai",
    funFacts: [
      "Chile is the longest country in the world from north to south, stretching over 2,600 miles.",
      "The Atacama Desert in northern Chile is the driest non-polar desert on Earth."
    ],
    indiaRelation: {
      summary: "India and Chile share structured commercial ties, driven by a Preferential Trade Agreement (PTA) for lithium and copper.",
      sharedProjects: "Global Lithium mining investments and supply chain coordination.",
      funFactsWithIndia: [
        "Chile acts as an essential gateway for Indian software services in Latin America.",
        "Chilean walnuts and copper ores are widely imported and consumed across Indian retail markets."
      ]
    }
  },
  {
    code: "ve",
    name: "Venezuela",
    capital: "Caracas",
    continent: "South America",
    currency: { name: "Venezuelan Bolívar Soberano", code: "VES", symbol: "Bs.S" },
    population: 28000000,
    languages: ["Spanish"],
    landmark: "Angel Falls",
    funFacts: [
      "Venezuela is home to Angel Falls, the world's highest uninterrupted waterfall at over 3,200 feet.",
      "It has the largest proven oil reserves of any country in the world."
    ],
    indiaRelation: {
      summary: "India and Venezuela maintain energy-focused ties, with Indian companies investing in oil extraction blocks.",
      funFactsWithIndia: [
        "Indian oil public sectors have joint ventures in Venezuela's Orinoco Belt oil projects.",
        "The country has a highly visible Indian merchant diaspora involved in textiles."
      ]
    }
  },
  {
    code: "ec",
    name: "Ecuador",
    capital: "Quito",
    continent: "South America",
    currency: { name: "US Dollar", code: "USD", symbol: "$" },
    population: 18000000,
    languages: ["Spanish", "Kichwa"],
    landmark: "Galápagos Islands",
    funFacts: [
      "The Galápagos Islands belong to Ecuador and inspired Charles Darwin's theory of evolution.",
      "Quito is the closest capital city to the equator, standing at an elevation of 9,350 feet."
    ],
    indiaRelation: {
      summary: "India and Ecuador have signed trade agreements focusing on agricultural technology and medicine imports."
    }
  },
  {
    code: "bo",
    name: "Bolivia",
    capital: "Sucre",
    continent: "South America",
    currency: { name: "Bolivian Boliviano", code: "BOB", symbol: "Bs." },
    population: 12000000,
    languages: ["Spanish", "Quechua", "Aymara"],
    landmark: "Salar de Uyuni",
    funFacts: [
      "Bolivia is home to Salar de Uyuni, the world's largest salt flat, forming a natural mirror when wet.",
      "It is a landlocked nation with two capital cities: Sucre (constitutional) and La Paz (administrative)."
    ],
    indiaRelation: {
      summary: "India and Bolivia collaborate on space exploration, lithium resources, and generic drug supplies."
    }
  },
  {
    code: "py",
    name: "Paraguay",
    capital: "Asunción",
    continent: "South America",
    currency: { name: "Paraguayan Guaraní", code: "PYG", symbol: "₲" },
    population: 6800000,
    languages: ["Spanish", "Guaraní"],
    landmark: "Itaipu Dam",
    funFacts: [
      "Paraguay is landlocked but has a large navy because it sits on major internal river highways.",
      "Guaraní is an official language, spoken by over 90% of the native population."
    ],
    indiaRelation: {
      summary: "India and Paraguay share steady diplomatic relations, with India opening its resident embassy in Asuncion."
    }
  },
  {
    code: "uy",
    name: "Uruguay",
    capital: "Montevideo",
    continent: "South America",
    currency: { name: "Uruguayan Peso", code: "UYU", symbol: "$U" },
    population: 3400000,
    languages: ["Spanish"],
    landmark: "Casapueblo",
    funFacts: [
      "Uruguay was the first country to legalize the cultivation, sale, and consumption of recreational marijuana in 2013.",
      "It generates over 95% of its electricity from renewable energy sources."
    ],
    indiaRelation: {
      summary: "India and Uruguay participate in IT and software offshoring trade, supported by business outsourcing hubs."
    }
  },
  {
    code: "gy",
    name: "Guyana",
    capital: "Georgetown",
    continent: "South America",
    currency: { name: "Guyanese Dollar", code: "GYD", symbol: "G$" },
    population: 800000,
    languages: ["English"],
    landmark: "Kaieteur Falls",
    funFacts: [
      "Guyana is the only English-speaking nation in South America.",
      "Kaieteur Falls is the world's largest single-drop waterfall by volume of water."
    ],
    indiaRelation: {
      summary: "India and Guyana enjoy deeply fraternal ties, with nearly 40% of Guyana's population being of Indian origin.",
      sharedProjects: "Bilateral funding for Guyana National Stadium + direct sea vessel manufacturing support.",
      funFactsWithIndia: [
        "In 1838, the first Indian arrivals reached Guyana's sugar plantations.",
        "Cricket binds both nations, with Guyanese players historically starring on the West Indies cricket team."
      ]
    }
  },
  {
    code: "sr",
    name: "Suriname",
    capital: "Paramaribo",
    continent: "South America",
    currency: { name: "Surinamese Dollar", code: "SRD", symbol: "SRD$" },
    population: 620000,
    languages: ["Dutch", "Sranan Tongo"],
    landmark: "Saint Peter and Paul Cathedral",
    funFacts: [
      "Suriname is the smallest sovereign country in South America by land area and population.",
      "Over 90% of its territory is covered in pristine, ancient Amazonian rainforest."
    ],
    indiaRelation: {
      summary: "India and Suriname share strong bonds, as over 27% of Suriname's citizens are of Hindustani (Indian) descent.",
      sharedProjects: "Development grants for healthcare systems and solar electrification.",
      funFactsWithIndia: [
        "Sarnami Hindustani, a dialect of Bhojpuri/Awadhi, is widely spoken by Indo-Surinamese families.",
        "Indian President Droupadi Murmu was awarded Suriname's highest civilian honor during state visits."
      ]
    }
  }
];
