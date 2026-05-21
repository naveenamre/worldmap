import { Country } from "./types_country";

export const africaCountries: Country[] = [
  // --- AFRICA (54 COUNTRIES) ---
  {
    code: "eg",
    name: "Egypt",
    capital: "Cairo",
    continent: "Africa",
    currency: { name: "Egyptian Pound", code: "EGP", symbol: "E£" },
    population: 112000000,
    languages: ["Arabic"],
    landmark: "Great Pyramids of Giza",
    funFacts: [
      "The Great Pyramid of Giza is the oldest of the Seven Wonders of the Ancient World.",
      "The Nile River, running through Egypt, is the longest river in the world."
    ],
    indiaRelation: {
      summary: "India and Egypt represent two oldest human civilizations with stable relations boosted under NAM.",
      jointExercise: "Cyclone-I",
      sharedProjects: "Agricultural wheat export chains + defense manufacturing cooperation.",
      funFactsWithIndia: [
        "Cofounded the Non-Aligned Movement (NAM) in 1961 together.",
        "Cyclone-I represents the first ever joint combat drill between Indian and Egyptian Special Forces."
      ]
    }
  },
  {
    code: "za",
    name: "South Africa",
    capital: "Pretoria",
    continent: "Africa",
    currency: { name: "South African Rand", code: "ZAR", symbol: "R" },
    population: 60000000,
    languages: ["Zulu", "Xhosa", "Afrikaans", "English"],
    landmark: "Table Mountain",
    funFacts: [
      "South Africa is the only country with three official capital cities.",
      "It has 12 official national languages to honor diverse native lineages."
    ],
    indiaRelation: {
      summary: "India and South Africa share historically profound anti-apartheid alignments, elevated under BRICS and IBSA.",
      sharedProjects: "IBSA maritime drills + mineral mining developments.",
      funFactsWithIndia: [
        "Mahatma Gandhi's transition into non-violent civil disobedience was built on his experiences in South Africa.",
        "The Gandhi-Mandela Trophy is contested dynamically in cricket."
      ]
    }
  },
  {
    code: "ng",
    name: "Nigeria",
    capital: "Abuja",
    continent: "Africa",
    currency: { name: "Nigerian Naira", code: "NGN", symbol: "₦" },
    population: 224000000,
    languages: ["English", "Hausa", "Yoruba", "Igbo"],
    landmark: "Zuma Rock",
    funFacts: [
      "Nigeria is the most populous country in Africa and has a very young population.",
      "Nollywood, Nigeria's movie industry, is one of the largest in the world by volume of films."
    ],
    indiaRelation: {
      summary: "India is Nigeria's largest trading partner in Africa, conducting major energy and technology trades.",
      sharedProjects: "ITEC training pacts and pharmaceutical development centers.",
      funFactsWithIndia: [
        "Bilateral relations were established before Nigeria's formal independence, with India opening a post in Lagos in 1958.",
        "India imports substantial crude oil from Nigeria's offshore fields."
      ]
    }
  },
  {
    code: "ke",
    name: "Kenya",
    capital: "Nairobi",
    continent: "Africa",
    currency: { name: "Kenyan Shilling", code: "KES", symbol: "KSh" },
    population: 55000000,
    languages: ["Swahili", "English"],
    landmark: "Maasai Mara Reserve",
    funFacts: [
      "The Great Rift Valley in Kenya was formed millions of years ago, visible from orbit.",
      "Nairobi is the only city globally with a full game reserve safari within municipal limits."
    ],
    indiaRelation: {
      summary: "India and Kenya are maritime neighbors connected across the Indian Ocean with a deep Indian diaspora.",
      sharedProjects: "Maritime security dialogues in the Indian Ocean Rim.",
      funFactsWithIndia: [
        "Indian-Kenyans comprise a recognized ethnic lineage contributing heavily to trade.",
        "India offers numerous college scholarships to Kenyan scholars under active grants."
      ]
    }
  },
  {
    code: "ma",
    name: "Morocco",
    capital: "Rabat",
    continent: "Africa",
    currency: { name: "Moroccan Dirham", code: "MAD", symbol: "DH" },
    population: 37500000,
    languages: ["Arabic", "Berber", "French"],
    landmark: "Hassan II Mosque",
    funFacts: [
      "The University of al-Qarawiyyin in Morocco is the world's oldest continually operating university.",
      "Morocco produces high-value Argan oil, which only grows natively in its plains."
    ],
    indiaRelation: {
      summary: "Morocco exports substantial phosphate (vital for Indian agriculture) to India.",
      funFactsWithIndia: [
        "In the 14th Century, famous Moroccan traveler Ibn Battuta visited India, spending several years as a state judge.",
        "India is the destination for a large portion of Morocco's phosphate."
      ]
    }
  },
  {
    code: "mg",
    name: "Madagascar",
    capital: "Antananarivo",
    continent: "Africa",
    currency: { name: "Malagasy Ariary", code: "MGA", symbol: "Ar" },
    population: 30000000,
    languages: ["Malagasy", "French"],
    landmark: "Avenue of the Baobabs",
    funFacts: [
      "Madagascar is the fourth-largest island on Earth, isolated for 88 million years.",
      "Over 90% of its wildlife exists nowhere else on Earth, including all lemurs."
    ],
    indiaRelation: {
      summary: "India and Madagascar cooperate on maritime safety and humanitarian help.",
      sharedProjects: "Coastal Radar Station operated with Indian Navy advice.",
      funFactsWithIndia: [
        "Indian Navy was the first responder during devastating cyclones in Madagascar.",
        "A prominent, highly industrious Indian diaspora has resided here since the late 19th Century."
      ]
    }
  },
  {
    code: "dz",
    name: "Algeria",
    capital: "Algiers",
    continent: "Africa",
    currency: { name: "Algerian Dinar", code: "DZD", symbol: "DA" },
    population: 44900000,
    languages: ["Arabic", "Berber"],
    landmark: "Monument of Martyrs",
    funFacts: [
      "Algeria is the largest country in Africa by land area.",
      "Over 80% of its massive territory belongs directly to the hyper-arid Sahara Desert."
    ],
    indiaRelation: {
      summary: "India and Algeria share warm ties, collaborating on chemical trade, gas exploration, and solar energy."
    }
  },
  {
    code: "ao",
    name: "Angola",
    capital: "Luanda",
    continent: "Africa",
    currency: { name: "Angolan Kwanza", code: "AOA", symbol: "Kz" },
    population: 35600000,
    languages: ["Portuguese"],
    landmark: "Tundavala Fissure",
    funFacts: [
      "Angola is highly famous for its native, giant Sable Antelope, a sacred national symbol.",
      "Luanda is often described as one of the most expensive cities for expats due to oil imports."
    ],
    indiaRelation: {
      summary: "India extends credit lines for Angola's railway modernization and imports crude petroleum."
    }
  },
  {
    code: "bj",
    name: "Benin",
    capital: "Porto-Novo",
    continent: "Africa",
    currency: { name: "West African CFA Franc", code: "XOF", symbol: "CFA" },
    population: 13400000,
    languages: ["French"],
    landmark: "Royal Palaces of Abomey",
    funFacts: [
      "Benin is celebrated as the birthplace and spiritual heart of the Voodoo religion.",
      "It features Ganvie, a massive lake village built entirely on wooden stilts."
    ],
    indiaRelation: {
      summary: "India provides developmental scholarships and agricultural training under ITEC programs to Benin."
    }
  },
  {
    code: "bw",
    name: "Botswana",
    capital: "Gaborone",
    continent: "Africa",
    currency: { name: "Botswana Pula", code: "BWP", symbol: "P" },
    population: 2630000,
    languages: ["English", "Tswana"],
    landmark: "Okavango Delta",
    funFacts: [
      "Botswana is home to the world's largest concentration of African elephants.",
      "The currency 'Pula' means 'rain' in Tswana, reflecting its high value as a blessing."
    ],
    indiaRelation: {
      summary: "India and Botswana share deep ties, particularly in diamond trading, machinery, and health partnerships."
    }
  },
  {
    code: "bf",
    name: "Burkina Faso",
    capital: "Ouagadougou",
    continent: "Africa",
    currency: { name: "West African CFA Franc", code: "XOF", symbol: "CFA" },
    population: 22600000,
    languages: ["French"],
    landmark: "Sindou Peaks",
    funFacts: [
      "Burkina Faso translates to 'Land of Honest People' in local Mooré and Dioula.",
      "Ouagadougou hosts FESPACO, Africa's largest and most famous film festival."
    ],
    indiaRelation: {
      summary: "India has set up rural agricultural research facilities and extended lines of credit to Burkina Faso."
    }
  },
  {
    code: "bi",
    name: "Burundi",
    capital: "Gitega",
    continent: "Africa",
    currency: { name: "Burundian Franc", code: "BIF", symbol: "FBu" },
    population: 13000000,
    languages: ["Kirundi", "French", "English"],
    landmark: "Kagera Waterfalls",
    funFacts: [
      "Burundi features the famous Royal Drummers of Burundi, performing traditional, highly acrobatic rhythms.",
      "Lake Tanganyika, bordering Burundi, is the second-deepest lake globally."
    ],
    indiaRelation: {
      summary: "India extends vocational training help and small agricultural sector support to Burundian institutions."
    }
  },
  {
    code: "cm",
    name: "Cameroon",
    capital: "Yaoundé",
    continent: "Africa",
    currency: { name: "Central African CFA Franc", code: "XAF", symbol: "FCFA" },
    population: 27900000,
    languages: ["French", "English"],
    landmark: "Mount Cameroon",
    funFacts: [
      "Cameroon is nicknamed 'Africa in Miniature' because it has all of Africa's primary climates.",
      "Mount Cameroon is an active volcano and one of the highest peaks in West Africa."
    ],
    indiaRelation: {
      summary: "India provides defense capacity training and coordinates solar electrification projects in Cameroon."
    }
  },
  {
    code: "cv",
    name: "Cape Verde",
    capital: "Praia",
    continent: "Africa",
    currency: { name: "Cape Verdean Escudo", code: "CVE", symbol: "Esc" },
    population: 590000,
    languages: ["Portuguese"],
    landmark: "Pico do Fogo Volcano",
    funFacts: [
      "Cape Verde is a stable archipelago of 10 volcanic islands in the Atlantic Ocean.",
      "Its traditional music, Morna, was popularized globally by Cesária Évora."
    ],
    indiaRelation: {
      summary: "Cape Verde coordinates with India on solar pump projects and public health technology."
    }
  },
  {
    code: "cf",
    name: "Central African Republic",
    capital: "Bangui",
    continent: "Africa",
    currency: { name: "Central African CFA Franc", code: "XAF", symbol: "FCFA" },
    population: 5500000,
    languages: ["French", "Sango"],
    landmark: "Boali Falls",
    funFacts: [
      "CAR contains Dzanga-Sangha National Park, a pristine sanctuary for forest elephants.",
      "The country has immense deposits of diamonds, gold, and uranium."
    ],
    indiaRelation: {
      summary: "India has supported CAR with lines of credit for setting up local textile mills and cement factories."
    }
  },
  {
    code: "td",
    name: "Chad",
    capital: "N'Djamena",
    continent: "Africa",
    currency: { name: "Central African CFA Franc", code: "XAF", symbol: "FCFA" },
    population: 17700000,
    languages: ["French", "Arabic"],
    landmark: "Ennedi Massif Rocks",
    funFacts: [
      "Lake Chad, bordering Chad, was historically one of the largest lakes in Africa before shrinking, vital for millions.",
      "The Ennedi Massif features thousands of ancient rock art carvings."
    ],
    indiaRelation: {
      summary: "India provides solar electrification support and training under ITEC to candidates in N'Djamena."
    }
  },
  {
    code: "km",
    name: "Comoros",
    capital: "Moroni",
    continent: "Africa",
    currency: { name: "Comorian Franc", code: "KMF", symbol: "CF" },
    population: 830000,
    languages: ["Comorian", "Arabic", "French"],
    landmark: "Mount Karthala",
    funFacts: [
      "Comoros is the world's leading producer of ylang-ylang, a fragrant flower used in luxury perfumes.",
      "It consists of three volcanic islands positioned in the Mozambique Channel."
    ],
    indiaRelation: {
      summary: "India has historically provided financial support for power defense setups and solar initiatives in Comoros."
    }
  },
  {
    code: "cd",
    name: "Congo (DRC)",
    capital: "Kinshasa",
    continent: "Africa",
    currency: { name: "Congolese Franc", code: "CDF", symbol: "FC" },
    population: 99000000,
    languages: ["French", "Lingala", "Swahili"],
    landmark: "Virunga National Park",
    funFacts: [
      "DRC is the second-largest country in Africa by land area.",
      "Virunga is Africa's oldest national park, shielding endangered mountain gorillas."
    ],
    indiaRelation: {
      summary: "India has contributed thousands of military troops to MONUSCO, the UN's peacekeeping mission in DRC.",
      funFactsWithIndia: [
        "Indian peacekeeping battalions have protected remote village populations in Goma for decades."
      ]
    }
  },
  {
    code: "cg",
    name: "Congo (Republic)",
    capital: "Brazzaville",
    continent: "Africa",
    currency: { name: "Central African CFA Franc", code: "XAF", symbol: "FCFA" },
    population: 5900000,
    languages: ["French", "Kituba", "Lingala"],
    landmark: "Lesio-Louna Reserve",
    funFacts: [
      "The Congo River is the deepest river globally, reaching depths of over 220 meters.",
      "Sapeurs of Brazzaville are world-famous for wearing ultra-high fashion designer suits in poor streets."
    ],
    indiaRelation: {
      summary: "India has extended lines of credit for rural electricity generation and transport support in Congo-Brazzaville."
    }
  },
  {
    code: "dj",
    name: "Djibouti",
    capital: "Djibouti",
    continent: "Africa",
    currency: { name: "Djiboutian Franc", code: "DJF", symbol: "Fdj" },
    population: 1100000,
    languages: ["Arabic", "French", "Somali"],
    landmark: "Lake Assal",
    funFacts: [
      "Lake Assal is the lowest point in Africa, sitting 155 meters below sea level.",
      "Djibouti occupies a highly strategic choke point along the Bab-el-Mandeb strait."
    ],
    indiaRelation: {
      summary: "India and Djibouti share a maritime bridge. Djibouti assisted India in evacuating Indian citizens during Operation Rahat in Yemen."
    }
  },
  {
    code: "gq",
    name: "Equatorial Guinea",
    capital: "Malabo",
    continent: "Africa",
    currency: { name: "Central African CFA Franc", code: "XAF", symbol: "FCFA" },
    population: 1600000,
    languages: ["Spanish", "French", "Portuguese"],
    landmark: "Basílica de la Inmaculada Concepción",
    funFacts: [
      "Equatorial Guinea is the only sovereign country in Africa where Spanish is an official language.",
      "Its capital Malabo is located on Bioko Island, off the coast of mainland Africa."
    ],
    indiaRelation: {
      summary: "India and Equatorial Guinea collaborate on petroleum exports and vocational training programs."
    }
  },
  {
    code: "er",
    name: "Eritrea",
    capital: "Asmara",
    continent: "Africa",
    currency: { name: "Eritrean Nakfa", code: "ERN", symbol: "Nkf" },
    population: 3600000,
    languages: ["Tigrinya", "Arabic", "English"],
    landmark: "Fiat Tagliero Building",
    funFacts: [
      "Asmara features some of the world's most pristine futuristic Italian Art Deco municipal architecture.",
      "Eritrea has no official national language, but Tigrinya is the most widely spoken."
    ],
    indiaRelation: {
      summary: "India provides ITEC learning resources and imports compound minerals from Eritrea."
    }
  },
  {
    code: "sz",
    name: "Eswatini",
    capital: "Mbabane",
    continent: "Africa",
    currency: { name: "Swazi Lilangeni", code: "SZL", symbol: "L" },
    population: 1200000,
    languages: ["siSwati", "English"],
    landmark: "Hlane Royal National Park",
    funFacts: [
      "Eswatini was officially known as Swaziland until it was renamed by King Mswati III in 2018.",
      "It is one of Africa's few remaining absolute monarchies."
    ],
    indiaRelation: {
      summary: "India supports Eswatini with agricultural technology lines of credit and cyber infrastructure grants."
    }
  },
  {
    code: "et",
    name: "Ethiopia",
    capital: "Addis Ababa",
    continent: "Africa",
    currency: { name: "Ethiopian Birr", code: "ETB", symbol: "Br" },
    population: 123000000,
    languages: ["Amharic"],
    landmark: "Rock-Hewn Churches of Lalibela",
    funFacts: [
      "Ethiopia is one of the few African nations never formally colonized by European powers.",
      "Coffee originated here, discovered by a goat herder named Kaldi in Kaffa."
    ],
    indiaRelation: {
      summary: "India is one of the oldest foreign investors in Ethiopia, dominant in textiles and agriculture crops."
    }
  },
  {
    code: "ga",
    name: "Gabon",
    capital: "Libreville",
    continent: "Africa",
    currency: { name: "Central African CFA Franc", code: "XAF", symbol: "FCFA" },
    population: 2400000,
    languages: ["French"],
    landmark: "Lopé National Park",
    funFacts: [
      "Over 85% of Gabon is completely covered in pristine, tropical rainforest.",
      "Gabon's Loango coast features unique 'surfing hippos' along ocean waves."
    ],
    indiaRelation: {
      summary: "India and Gabon coordinate on timber exports, manganese mining, and solar partnerships."
    }
  },
  {
    code: "gm",
    name: "Gambia",
    capital: "Banjul",
    continent: "Africa",
    currency: { name: "Gambian Dalasi", code: "GMD", symbol: "D" },
    population: 2700000,
    languages: ["English"],
    landmark: "Kunta Kinteh Island",
    funFacts: [
      "Gambia is the smallest country on mainland Africa.",
      "It is completely surrounded by Senegal, except for its Atlantic Ocean coastline."
    ],
    indiaRelation: {
      summary: "India provided funding for constructing the modern Gambian National Assembly building in Banjul."
    }
  },
  {
    code: "gh",
    name: "Ghana",
    capital: "Accra",
    continent: "Africa",
    currency: { name: "Ghanaian Cedi", code: "GHS", symbol: "₵" },
    population: 33000000,
    languages: ["English"],
    landmark: "Cape Coast Castle",
    funFacts: [
      "Ghana was the first country in Sub-Saharan Africa to declare independence from colonial rule in 1957.",
      "Lake Volta in Ghana is the world's largest artificial reservoir by surface area."
    ],
    indiaRelation: {
      summary: "India coestablished the Kofi Annan ICT Center in Accra and remains a major gold buyer from Ghana."
    }
  },
  {
    code: "gn",
    name: "Guinea",
    capital: "Conakry",
    continent: "Africa",
    currency: { name: "Guinean Franc", code: "GNF", symbol: "FG" },
    population: 13800000,
    languages: ["French"],
    landmark: "Great Mosque of Conakry",
    funFacts: [
      "Guinea holds nearly one-third of the world's total bauxite reserves, vital for aluminum.",
      "It features the Niger River source inside the Fouta Djallon highlands."
    ],
    indiaRelation: {
      summary: "India imports extensive bauxite from Guinea and coordinates on solar energy programs."
    }
  },
  {
    code: "gw",
    name: "Guinea-Bissau",
    capital: "Bissau",
    continent: "Africa",
    currency: { name: "West African CFA Franc", code: "XOF", symbol: "CFA" },
    population: 2100000,
    languages: ["Portuguese"],
    landmark: "Bijagós Archipelago",
    funFacts: [
      "The Bijagós Archipelago contains 88 islands, hosting unique saltwater hippos.",
      "Guinea-Bissau is one of the world's leading producers of raw cashew nuts."
    ],
    indiaRelation: {
      summary: "India is historically the largest buyer of Guinea-Bissau's raw cashew harvests."
    }
  },
  {
    code: "ci",
    name: "Ivory Coast",
    capital: "Yamoussoukro",
    continent: "Africa",
    currency: { name: "West African CFA Franc", code: "XOF", symbol: "CFA" },
    population: 28000000,
    languages: ["French"],
    landmark: "Basilica of Our Lady of Peace",
    funFacts: [
      "Ivory Coast is the world's leading producer and exporter of cocoa beans.",
      "Yamoussoukro features the Basilica of Our Lady of Peace, the largest church plaza globally."
    ],
    indiaRelation: {
      summary: "India and Côte d'Ivoire enjoy expanding trade, with India setting up a major IT park in Abidjan."
    }
  },
  {
    code: "ls",
    name: "Lesotho",
    capital: "Maseru",
    continent: "Africa",
    currency: { name: "Lesotho Loti", code: "LSL", symbol: "L" },
    population: 2300000,
    languages: ["Sesotho", "English"],
    landmark: "Maletsunyane Falls",
    funFacts: [
      "Lesotho is completely landlocked within South Africa.",
      "It is nicknamed the 'Kingdom in the Sky' because its entire territory lies above 1,000 meters."
    ],
    indiaRelation: {
      summary: "India supports Lesotho's IT, military training, and rural water pumping grids."
    }
  },
  {
    code: "lr",
    name: "Liberia",
    capital: "Monrovia",
    continent: "Africa",
    currency: { name: "Liberian Dollar", code: "LRD", symbol: "L$" },
    population: 5300000,
    languages: ["English"],
    landmark: "Sapo National Park",
    funFacts: [
      "Liberia was founded by the American Colonization Society as a home for freed American slaves in 1847.",
      "It features Monrovia, named directly after US President James Monroe."
    ],
    indiaRelation: {
      summary: "India provided Liberia's first fully all-female UN Police Peacekeeping Unit in 2007, serving for nine years.",
      funFactsWithIndia: [
        "The all-female Indian Blue Helmets in Liberia served as a powerful model of policing and women empowerment."
      ]
    }
  },
  {
    code: "ly",
    name: "Libya",
    capital: "Tripoli",
    continent: "Africa",
    currency: { name: "Libyan Dinar", code: "LYD", symbol: "ل.د" },
    population: 6800000,
    languages: ["Arabic"],
    landmark: "Leptis Magna Ruins",
    funFacts: [
      "Leptis Magna remains some of the most spectacularly preserved Roman ruins globally.",
      "Libya contains the Saharan oasis town of Ghadames, known as the Pearl of the Desert."
    ],
    indiaRelation: {
      summary: "Historically, Indian companies executed massive public housing and power grids in Libya."
    }
  },
  {
    code: "mw",
    name: "Malawi",
    capital: "Lilongwe",
    continent: "Africa",
    currency: { name: "Malawian Kwacha", code: "MWK", symbol: "MK" },
    population: 20000000,
    languages: ["Chichewa", "English"],
    landmark: "Lake Malawi",
    funFacts: [
      "Lake Malawi is home to more fish species than any other lake in the world.",
      "It is nicknamed 'The Warm Heart of Africa' due to its friendy locals."
    ],
    indiaRelation: {
      summary: "India is a major trading partner of Malawi, constructing business processing hubs and health centers."
    }
  },
  {
    code: "ml",
    name: "Mali",
    capital: "Bamako",
    continent: "Africa",
    currency: { name: "West African CFA Franc", code: "XOF", symbol: "CFA" },
    population: 22500000,
    languages: ["Bambara", "French"],
    landmark: "Great Mosque of Djenné",
    funFacts: [
      "The Great Mosque of Djenné is the largest mud-brick building in the world.",
      "Historically, Mali was home to Mansa Musa, widely cited as the richest person in human history."
    ],
    indiaRelation: {
      summary: "India supports Mali with lines of credit for cotton research and solar powered public grids."
    }
  },
  {
    code: "mr",
    name: "Mauritania",
    capital: "Nouakchott",
    continent: "Africa",
    currency: { name: "Mauritanian Ouguiya", code: "MRU", symbol: "UM" },
    population: 4700000,
    languages: ["Arabic"],
    landmark: "Richat Structure",
    funFacts: [
      "The Richat Structure, or Eye of the Sahara, is a giant circular rock formation visible from space.",
      "Mauritania's coasts feature Arguin Island, a sanctuary for millions of migratory birds."
    ],
    indiaRelation: {
      summary: "India supports water harvesting, agricultural infrastructure, and local mining studies in Mauritania."
    }
  },
  {
    code: "mu",
    name: "Mauritius",
    capital: "Port Louis",
    continent: "Africa",
    currency: { name: "Mauritian Rupee", code: "MUR", symbol: "₨" },
    population: 1300000,
    languages: ["English", "French", "Mauritian Creole"],
    landmark: "Chamarel Seven Coloured Earths",
    funFacts: [
      "Mauritius was the only known native habitat of the extinct dodo bird.",
      "Chamarel features sand dunes of seven distinct geological colors."
    ],
    indiaRelation: {
      summary: "India and Mauritius share extraordinary historical and economic Ties, with over 65% of Mauritians having Indian inheritance.",
      sharedProjects: "Metro Express transit system in Port Louis + Supreme Court building funded by India.",
      funFactsWithIndia: [
        "Aapravasi Ghat in Port Louis marks where early Indian indentured laborers arrived in 1834.",
        "National festivals like Shivratri are observed dynamically across Mauritius."
      ]
    }
  },
  {
    code: "mz",
    name: "Mozambique",
    capital: "Maputo",
    continent: "Africa",
    currency: { name: "Mozambican Metical", code: "MZN", symbol: "MT" },
    population: 33000000,
    languages: ["Portuguese"],
    landmark: "Bazaruto Archipelago",
    funFacts: [
      "Mozambique's flag features an AK-47 assault rifle, representing defense and liberation.",
      "It features spectacular turquoise waters and dugongs at Bazaruto."
    ],
    indiaRelation: {
      summary: "India and Mozambique participate in huge coal imports and joint maritime anti-piracy patrols in southern channels."
    }
  },
  {
    code: "na",
    name: "Namibia",
    capital: "Windhoek",
    continent: "Africa",
    currency: { name: "Namibian Dollar", code: "NAD", symbol: "N$" },
    population: 2600000,
    languages: ["English"],
    landmark: "Sossusvlei Dunes",
    funFacts: [
      "The Namib Desert is the oldest desert in the world, running for over 55 million years.",
      "Sossusvlei features giant, red sand dunes rising steeply from dry white clay pans."
    ],
    indiaRelation: {
      summary: "India and Namibia share stable ties, with India recently importing cheetahs from Namibia to reintroduce them to Kuno National Park.",
      funFactsWithIndia: [
        "Major cheetah relocation projects have established a biological bridge between India and Namibia."
      ]
    }
  },
  {
    code: "ne",
    name: "Niger",
    capital: "Niamey",
    continent: "Africa",
    currency: { name: "West African CFA Franc", code: "XOF", symbol: "CFA" },
    population: 26000000,
    languages: ["French"],
    landmark: "Air Mountains",
    funFacts: [
      "Niger is named directly after the great Niger River flowing through its southwest.",
      "Over 80% of Niger's territory is covered by the Sahara Desert."
    ],
    indiaRelation: {
      summary: "India supported constructing the Mahatma Gandhi International Convention Center in Niamey."
    }
  },
  {
    code: "rw",
    name: "Rwanda",
    capital: "Kigali",
    continent: "Africa",
    currency: { name: "Rwandan Franc", code: "RWF", symbol: "FRw" },
    population: 13800000,
    languages: ["Kinyarwanda", "French", "English", "Swahili"],
    landmark: "Volcanoes National Park",
    funFacts: [
      "Rwanda has the highest percentage of female parliament members globally.",
      "It has a clean city mandate, Umuganda, requiring monthly community cleaning."
    ],
    indiaRelation: {
      summary: "India supports Rwanda's digitization, vocational IT training, and dairy farming sectors.",
      funFactsWithIndia: [
        "India gifted hundreds of cows to Rwanda's 'Girinka' program to boost rural child nutrition."
      ]
    }
  },
  {
    code: "st",
    name: "Sao Tome and Principe",
    capital: "São Tomé",
    continent: "Africa",
    currency: { name: "Dobra", code: "STN", symbol: "Db" },
    population: 220000,
    languages: ["Portuguese"],
    landmark: "Pico Cão Grande",
    funFacts: [
      "Santo Tome is composed of two islands, known as the Chocolate Islands due to high-value cocoa.",
      "The Pico Cao Grande is a dramatic volcanic needle rising 370 meters above the forest."
    ],
    indiaRelation: {
      summary: "India supports local technology deployments and provides ITEC grants to Sao Tome."
    }
  },
  {
    code: "sn",
    name: "Senegal",
    capital: "Dakar",
    continent: "Africa",
    currency: { name: "West African CFA Franc", code: "XOF", symbol: "CFA" },
    population: 17300000,
    languages: ["French", "Wolof"],
    landmark: "African Renaissance Monument",
    funFacts: [
      "Dakar, Senegal's capital, is the westernmost city on mainland Africa.",
      "It features Lake Retba, a striking pink-colored saltwater lake due to algae."
    ],
    indiaRelation: {
      summary: "India provides heavy agricultural assembly vehicles and supports Senegal's rural irrigation schemes."
    }
  },
  {
    code: "sc",
    name: "Seychelles",
    capital: "Victoria",
    continent: "Africa",
    currency: { name: "Seychellois Rupee", code: "SCR", symbol: "SR" },
    population: 100000,
    languages: ["Seychellois Creole", "English", "French"],
    landmark: "Vallée de Mai",
    funFacts: [
      "Seychelles is the least populated country in Africa.",
      "It is home to the rare Coco de Mer coconut, the largest and heaviest seed in the world."
    ],
    indiaRelation: {
      summary: "India and Seychelles share high marine security ties, with India gifting naval patrol boats.",
      sharedProjects: "Bilateral hydrographic survey agreements in the Indian Ocean."
    }
  },
  {
    code: "sl",
    name: "Sierra Leone",
    capital: "Freetown",
    continent: "Africa",
    currency: { name: "Leone", code: "SLE", symbol: "Le" },
    population: 8600000,
    languages: ["English", "Krio"],
    landmark: "Tacugama Chimpanzee Sanctuary",
    funFacts: [
      "Sierra Leone is famous for its rare yellow-breasted primates and chimpanzees.",
      "Freetown was founded as a safe haven for liberated slaves in 1787."
    ],
    indiaRelation: {
      summary: "India has extended credit lines for solar lighting and drinking water distribution networks in Sierra Leone."
    }
  },
  {
    code: "so",
    name: "Somalia",
    capital: "Mogadishu",
    continent: "Africa",
    currency: { name: "Somali Shilling", code: "SOS", symbol: "Sh.So." },
    population: 17600000,
    languages: ["Somali", "Arabic"],
    landmark: "Laas Geel Cave Art",
    funFacts: [
      "Somalia has the longest coastline on mainland Africa, stretching for over 3,300 km.",
      "The ancient Laas Geel caves contain some of the earliest art drawings in Africa."
    ],
    indiaRelation: {
      summary: "Indian warships participate in anti-piracy operations off the Gulf of Aden to ensure shipping safety."
    }
  },
  {
    code: "ss",
    name: "South Sudan",
    capital: "Juba",
    continent: "Africa",
    currency: { name: "South Sudanese Pound", code: "SSP", symbol: "SS£" },
    population: 11000000,
    languages: ["English"],
    landmark: "Bandilo National Park",
    funFacts: [
      "South Sudan is the youngest sovereign nation globally, gaining independence in 2011.",
      "It features major seasonal wildlife migrations of antelope across its swamps."
    ],
    indiaRelation: {
      summary: "India has deployed substantial peacekeeping military forces to the UN Mission in South Sudan (UNMISS)."
    }
  },
  {
    code: "sd",
    name: "Sudan",
    capital: "Khartoum",
    continent: "Africa",
    currency: { name: "Sudanese Pound", code: "SDG", symbol: "LS" },
    population: 46000000,
    languages: ["Arabic", "English"],
    landmark: "Meroe Pyramids",
    funFacts: [
      "Sudan has more pyramids than Egypt, with over 220 standing at ancient Meroe.",
      "Khartoum is where the Blue Nile and White Nile rivers merge into the great Nile."
    ],
    indiaRelation: {
      summary: "India provides medical capacity grants and previously operated petroleum blocks in Sudan's regions."
    }
  },
  {
    code: "tz",
    name: "Tanzania",
    capital: "Dodoma",
    continent: "Africa",
    currency: { name: "Tanzanian Shilling", code: "TZS", symbol: "TSh" },
    population: 65000000,
    languages: ["Swahili", "English"],
    landmark: "Mount Kilimanjaro & Serengeti",
    funFacts: [
      "Mount Kilimanjaro in Tanzania is the highest peak in Africa.",
      "The Serengeti hosts the Great Wildebeest Migration, with millions of animals crossing."
    ],
    indiaRelation: {
      summary: "India and Tanzania share strong defense ties and water resource planning.",
      sharedProjects: "IIT Madras was first Indian university to establish an international campus in Zanzibar, Tanzania.",
      funFactsWithIndia: [
        "IIT Madras Zanzibar represents a major landmark in Indo-African higher science exchange programs."
      ]
    }
  },
  {
    code: "tg",
    name: "Togo",
    capital: "Lomé",
    continent: "Africa",
    currency: { name: "West African CFA Franc", code: "XOF", symbol: "CFA" },
    population: 8800000,
    languages: ["French"],
    landmark: "Koutammakou Valley",
    funFacts: [
      "Koutammakou features unique three-story mud Tower-houses (Takienta) built by the Batammariba.",
      "Lome is famous for its massive Akodessewa Fetish Market, central for traditional healing materials."
    ],
    indiaRelation: {
      summary: "India provides rural solar pump credit streams and holds trade discussions on phosphates with Togo."
    }
  },
  {
    code: "tn",
    name: "Tunisia",
    capital: "Tunis",
    continent: "Africa",
    currency: { name: "Tunisian Dinar", code: "TND", symbol: "DT" },
    population: 12300000,
    languages: ["Arabic", "French"],
    landmark: "Amphitheatre of El Jem",
    funFacts: [
      "El Jem is one of the largest and best-preserved Roman amphitheaters globally.",
      "Tunisia was the filming location for Luke Skywalker's home planet Tatooine in Star Wars."
    ],
    indiaRelation: {
      summary: "India and Tunisia cooperate on fertilizer production and generic pharmaceutical exchanges."
    }
  },
  {
    code: "ug",
    name: "Uganda",
    capital: "Kampala",
    continent: "Africa",
    currency: { name: "Ugandan Shilling", code: "UGX", symbol: "USh" },
    population: 47000000,
    languages: ["English", "Swahili"],
    landmark: "Murchison Falls",
    funFacts: [
      "Uganda is home to the source of the White Nile at Lake Victoria.",
      "It is nicknamed the Pearl of Africa due to its lush green landscapes."
    ],
    indiaRelation: {
      summary: "India and Uganda enjoy strong warm ties, supported by a prominent Indian business diaspora.",
      sharedProjects: "Establishing the National Forensic Sciences University (NFSU) campus in Jinja, Uganda.",
      funFactsWithIndia: [
        "NFSU Jinja represents India's premier international forensic university campus abroad."
      ]
    }
  },
  {
    code: "zm",
    name: "Zambia",
    capital: "Lusaka",
    continent: "Africa",
    currency: { name: "Zambian Kwacha", code: "ZMW", symbol: "ZK" },
    population: 20000000,
    languages: ["English"],
    landmark: "Victoria Falls",
    funFacts: [
      "Victoria Falls is one of the world's largest waterfalls, locally called Mosi-oa-Tunya (The Smoke That Thunders).",
      "Zambia is one of the world's leading producers of high-grade copper."
    ],
    indiaRelation: {
      summary: "India has a major presence in Zambia's mining sectors and supports capacity-building under ITEC."
    }
  },
  {
    code: "zw",
    name: "Zimbabwe",
    capital: "Harare",
    continent: "Africa",
    currency: { name: "Zimbabwean Dollar", code: "ZWG", symbol: "Z$" },
    population: 16000000,
    languages: ["English", "Shona", "Ndebele"],
    landmark: "Great Zimbabwe Ruins",
    funFacts: [
      "Great Zimbabwe is an ancient stone city built without mortar between the 11th and 15th centuries.",
      "Its name translates directly to 'House of Stones' in Shona."
    ],
    indiaRelation: {
      summary: "India provides medical relief, pharmaceutical supplies, and educational grants to Zimbabwe."
    }
  }
];
