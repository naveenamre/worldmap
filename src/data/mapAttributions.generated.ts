import type { ReferenceMapKind } from './mapAssetLinks';

export interface MapAttribution {
  sourceType: 'generated' | 'commons' | 'local-fallback';
  title: string;
  credit: string;
  license: string;
  sourceUrl?: string;
  author?: string;
  fileName?: string;
}

export type MapAttributionIndex = Partial<Record<string, Partial<Record<ReferenceMapKind, MapAttribution>>>>;

export const mapAttributions: MapAttributionIndex = {
  "in": {
    "political": {
      "sourceType": "commons",
      "title": "Political map of India bn.svg",
      "credit": "Downloaded from Wikimedia Commons via MediaWiki API.",
      "license": "CC BY-SA 4.0",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Political_map_of_India_bn.svg",
      "author": "Sumita Roy Dutta",
      "fileName": "in-political.svg"
    },
    "physical": {
      "sourceType": "commons",
      "title": "India Karnataka relief map.svg",
      "credit": "Downloaded from Wikimedia Commons via MediaWiki API.",
      "license": "CC BY-SA 3.0",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:India_Karnataka_relief_map.svg",
      "author": "Planemad",
      "fileName": "in-physical.svg"
    }
  },
  "np": {
    "political": {
      "sourceType": "commons",
      "title": "Map of Nepal (Political and Administrative).jpg",
      "credit": "Downloaded from Wikimedia Commons via MediaWiki API.",
      "license": "Public domain",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Map_of_Nepal_(Political_and_Administrative).jpg",
      "author": "Department of Survey, Nepal Government",
      "fileName": "np-political.jpg"
    },
    "physical": {
      "sourceType": "commons",
      "title": "Nepal in Asia (relief) (-mini map).svg",
      "credit": "Downloaded from Wikimedia Commons via MediaWiki API.",
      "license": "CC BY-SA 3.0",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Nepal_in_Asia_(relief)_(-mini_map).svg",
      "author": "TUBS",
      "fileName": "np-physical.svg"
    }
  },
  "pk": {
    "political": {
      "sourceType": "commons",
      "title": "Pakistan Political Color Map.png",
      "credit": "Downloaded from Wikimedia Commons via MediaWiki API.",
      "license": "Public domain",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Pakistan_Political_Color_Map.png",
      "fileName": "pk-political.png"
    },
    "physical": {
      "sourceType": "commons",
      "title": "Pakistan Khyber Pakhtunwa relief map.svg",
      "credit": "Downloaded from Wikimedia Commons via MediaWiki API.",
      "license": "CC BY-SA 4.0",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Pakistan_Khyber_Pakhtunwa_relief_map.svg",
      "author": "Own work based on Milenioscuro",
      "fileName": "pk-physical.svg"
    }
  },
  "bd": {
    "political": {
      "sourceType": "generated",
      "title": "Bangladesh political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bd-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Bangladesh physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bd-physical.svg"
    }
  },
  "lk": {
    "political": {
      "sourceType": "generated",
      "title": "Sri Lanka political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "lk-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Sri Lanka physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "lk-physical.svg"
    }
  },
  "bt": {
    "political": {
      "sourceType": "generated",
      "title": "Bhutan political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bt-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Bhutan physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bt-physical.svg"
    }
  },
  "mv": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Maldives political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "mv-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Maldives physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "mv-physical.svg"
    }
  },
  "jp": {
    "political": {
      "sourceType": "generated",
      "title": "Japan political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "jp-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Japan physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "jp-physical.svg"
    }
  },
  "cn": {
    "political": {
      "sourceType": "generated",
      "title": "China political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cn-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "China physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cn-physical.svg"
    }
  },
  "kr": {
    "political": {
      "sourceType": "generated",
      "title": "South Korea political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "kr-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "South Korea physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "kr-physical.svg"
    }
  },
  "id": {
    "political": {
      "sourceType": "generated",
      "title": "Indonesia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "id-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Indonesia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "id-physical.svg"
    }
  },
  "sg": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Singapore political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "sg-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Singapore physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "sg-physical.svg"
    }
  },
  "th": {
    "political": {
      "sourceType": "generated",
      "title": "Thailand political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "th-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Thailand physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "th-physical.svg"
    }
  },
  "sa": {
    "political": {
      "sourceType": "generated",
      "title": "Saudi Arabia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sa-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Saudi Arabia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sa-physical.svg"
    }
  },
  "tr": {
    "political": {
      "sourceType": "generated",
      "title": "Turkey political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "tr-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Turkey physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "tr-physical.svg"
    }
  },
  "ae": {
    "political": {
      "sourceType": "generated",
      "title": "United Arab Emirates political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ae-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "United Arab Emirates physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ae-physical.svg"
    }
  },
  "af": {
    "political": {
      "sourceType": "generated",
      "title": "Afghanistan political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "af-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Afghanistan physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "af-physical.svg"
    }
  },
  "bh": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Bahrain political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "bh-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Bahrain physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "bh-physical.svg"
    }
  },
  "bn": {
    "political": {
      "sourceType": "generated",
      "title": "Brunei political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bn-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Brunei physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bn-physical.svg"
    }
  },
  "kh": {
    "political": {
      "sourceType": "generated",
      "title": "Cambodia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "kh-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Cambodia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "kh-physical.svg"
    }
  },
  "cy": {
    "political": {
      "sourceType": "generated",
      "title": "Cyprus political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cy-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Cyprus physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cy-physical.svg"
    }
  },
  "tl": {
    "political": {
      "sourceType": "generated",
      "title": "East Timor political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "tl-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "East Timor physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "tl-physical.svg"
    }
  },
  "ge": {
    "political": {
      "sourceType": "generated",
      "title": "Georgia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ge-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Georgia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ge-physical.svg"
    }
  },
  "ir": {
    "political": {
      "sourceType": "generated",
      "title": "Iran political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ir-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Iran physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ir-physical.svg"
    }
  },
  "iq": {
    "political": {
      "sourceType": "generated",
      "title": "Iraq political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "iq-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Iraq physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "iq-physical.svg"
    }
  },
  "il": {
    "political": {
      "sourceType": "generated",
      "title": "Israel political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "il-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Israel physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "il-physical.svg"
    }
  },
  "jo": {
    "political": {
      "sourceType": "generated",
      "title": "Jordan political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "jo-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Jordan physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "jo-physical.svg"
    }
  },
  "kz": {
    "political": {
      "sourceType": "generated",
      "title": "Kazakhstan political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "kz-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Kazakhstan physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "kz-physical.svg"
    }
  },
  "kw": {
    "political": {
      "sourceType": "generated",
      "title": "Kuwait political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "kw-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Kuwait physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "kw-physical.svg"
    }
  },
  "kg": {
    "political": {
      "sourceType": "generated",
      "title": "Kyrgyzstan political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "kg-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Kyrgyzstan physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "kg-physical.svg"
    }
  },
  "la": {
    "political": {
      "sourceType": "generated",
      "title": "Laos political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "la-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Laos physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "la-physical.svg"
    }
  },
  "lb": {
    "political": {
      "sourceType": "generated",
      "title": "Lebanon political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "lb-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Lebanon physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "lb-physical.svg"
    }
  },
  "my": {
    "political": {
      "sourceType": "generated",
      "title": "Malaysia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "my-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Malaysia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "my-physical.svg"
    }
  },
  "mn": {
    "political": {
      "sourceType": "generated",
      "title": "Mongolia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "mn-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Mongolia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "mn-physical.svg"
    }
  },
  "mm": {
    "political": {
      "sourceType": "generated",
      "title": "Myanmar political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "mm-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Myanmar physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "mm-physical.svg"
    }
  },
  "kp": {
    "political": {
      "sourceType": "generated",
      "title": "North Korea political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "kp-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "North Korea physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "kp-physical.svg"
    }
  },
  "om": {
    "political": {
      "sourceType": "generated",
      "title": "Oman political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "om-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Oman physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "om-physical.svg"
    }
  },
  "ph": {
    "political": {
      "sourceType": "generated",
      "title": "Philippines political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ph-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Philippines physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ph-physical.svg"
    }
  },
  "qa": {
    "political": {
      "sourceType": "generated",
      "title": "Qatar political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "qa-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Qatar physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "qa-physical.svg"
    }
  },
  "sy": {
    "political": {
      "sourceType": "generated",
      "title": "Syria political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sy-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Syria physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sy-physical.svg"
    }
  },
  "tj": {
    "political": {
      "sourceType": "generated",
      "title": "Tajikistan political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "tj-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Tajikistan physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "tj-physical.svg"
    }
  },
  "tm": {
    "political": {
      "sourceType": "generated",
      "title": "Turkmenistan political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "tm-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Turkmenistan physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "tm-physical.svg"
    }
  },
  "uz": {
    "political": {
      "sourceType": "generated",
      "title": "Uzbekistan political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "uz-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Uzbekistan physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "uz-physical.svg"
    }
  },
  "vn": {
    "political": {
      "sourceType": "generated",
      "title": "Vietnam political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "vn-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Vietnam physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "vn-physical.svg"
    }
  },
  "ye": {
    "political": {
      "sourceType": "generated",
      "title": "Yemen political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ye-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Yemen physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ye-physical.svg"
    }
  },
  "ps": {
    "political": {
      "sourceType": "generated",
      "title": "Palestine political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ps-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Palestine physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ps-physical.svg"
    }
  },
  "tw": {
    "political": {
      "sourceType": "generated",
      "title": "Taiwan political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "tw-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Taiwan physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "tw-physical.svg"
    }
  },
  "au": {
    "political": {
      "sourceType": "generated",
      "title": "Australia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "au-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Australia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "au-physical.svg"
    }
  },
  "nz": {
    "political": {
      "sourceType": "generated",
      "title": "New Zealand political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "nz-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "New Zealand physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "nz-physical.svg"
    }
  },
  "fj": {
    "political": {
      "sourceType": "generated",
      "title": "Fiji political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "fj-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Fiji physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "fj-physical.svg"
    }
  },
  "ki": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Kiribati political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "ki-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Kiribati physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "ki-physical.svg"
    }
  },
  "mh": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Marshall Islands political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "mh-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Marshall Islands physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "mh-physical.svg"
    }
  },
  "fm": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Micronesia political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "fm-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Micronesia physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "fm-physical.svg"
    }
  },
  "nr": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Nauru political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "nr-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Nauru physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "nr-physical.svg"
    }
  },
  "pw": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Palau political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "pw-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Palau physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "pw-physical.svg"
    }
  },
  "pg": {
    "political": {
      "sourceType": "generated",
      "title": "Papua New Guinea political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "pg-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Papua New Guinea physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "pg-physical.svg"
    }
  },
  "ws": {
    "political": {
      "sourceType": "generated",
      "title": "Samoa political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ws-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Samoa physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ws-physical.svg"
    }
  },
  "sb": {
    "political": {
      "sourceType": "generated",
      "title": "Solomon Islands political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sb-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Solomon Islands physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sb-physical.svg"
    }
  },
  "to": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Tonga political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "to-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Tonga physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "to-physical.svg"
    }
  },
  "tv": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Tuvalu political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "tv-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Tuvalu physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "tv-physical.svg"
    }
  },
  "vu": {
    "political": {
      "sourceType": "generated",
      "title": "Vanuatu political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "vu-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Vanuatu physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "vu-physical.svg"
    }
  },
  "gb": {
    "political": {
      "sourceType": "generated",
      "title": "United Kingdom political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "gb-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "United Kingdom physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "gb-physical.svg"
    }
  },
  "fr": {
    "political": {
      "sourceType": "generated",
      "title": "France political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "fr-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "France physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "fr-physical.svg"
    }
  },
  "de": {
    "political": {
      "sourceType": "generated",
      "title": "Germany political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "de-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Germany physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "de-physical.svg"
    }
  },
  "it": {
    "political": {
      "sourceType": "generated",
      "title": "Italy political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "it-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Italy physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "it-physical.svg"
    }
  },
  "es": {
    "political": {
      "sourceType": "generated",
      "title": "Spain political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "es-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Spain physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "es-physical.svg"
    }
  },
  "ch": {
    "political": {
      "sourceType": "generated",
      "title": "Switzerland political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ch-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Switzerland physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ch-physical.svg"
    }
  },
  "nl": {
    "political": {
      "sourceType": "generated",
      "title": "Netherlands political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "nl-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Netherlands physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "nl-physical.svg"
    }
  },
  "gr": {
    "political": {
      "sourceType": "generated",
      "title": "Greece political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "gr-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Greece physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "gr-physical.svg"
    }
  },
  "se": {
    "political": {
      "sourceType": "generated",
      "title": "Sweden political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "se-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Sweden physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "se-physical.svg"
    }
  },
  "ie": {
    "political": {
      "sourceType": "generated",
      "title": "Ireland political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ie-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Ireland physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ie-physical.svg"
    }
  },
  "ru": {
    "political": {
      "sourceType": "generated",
      "title": "Russia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ru-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Russia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ru-physical.svg"
    }
  },
  "al": {
    "political": {
      "sourceType": "generated",
      "title": "Albania political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "al-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Albania physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "al-physical.svg"
    }
  },
  "ad": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Andorra political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "ad-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Andorra physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "ad-physical.svg"
    }
  },
  "at": {
    "political": {
      "sourceType": "generated",
      "title": "Austria political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "at-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Austria physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "at-physical.svg"
    }
  },
  "by": {
    "political": {
      "sourceType": "generated",
      "title": "Belarus political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "by-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Belarus physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "by-physical.svg"
    }
  },
  "be": {
    "political": {
      "sourceType": "generated",
      "title": "Belgium political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "be-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Belgium physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "be-physical.svg"
    }
  },
  "ba": {
    "political": {
      "sourceType": "generated",
      "title": "Bosnia and Herzegovina political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ba-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Bosnia and Herzegovina physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ba-physical.svg"
    }
  },
  "bg": {
    "political": {
      "sourceType": "generated",
      "title": "Bulgaria political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bg-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Bulgaria physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bg-physical.svg"
    }
  },
  "hr": {
    "political": {
      "sourceType": "generated",
      "title": "Croatia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "hr-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Croatia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "hr-physical.svg"
    }
  },
  "cz": {
    "political": {
      "sourceType": "generated",
      "title": "Czech Republic political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cz-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Czech Republic physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cz-physical.svg"
    }
  },
  "dk": {
    "political": {
      "sourceType": "generated",
      "title": "Denmark political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "dk-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Denmark physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "dk-physical.svg"
    }
  },
  "ee": {
    "political": {
      "sourceType": "generated",
      "title": "Estonia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ee-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Estonia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ee-physical.svg"
    }
  },
  "fi": {
    "political": {
      "sourceType": "generated",
      "title": "Finland political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "fi-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Finland physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "fi-physical.svg"
    }
  },
  "hu": {
    "political": {
      "sourceType": "generated",
      "title": "Hungary political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "hu-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Hungary physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "hu-physical.svg"
    }
  },
  "is": {
    "political": {
      "sourceType": "generated",
      "title": "Iceland political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "is-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Iceland physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "is-physical.svg"
    }
  },
  "lv": {
    "political": {
      "sourceType": "generated",
      "title": "Latvia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "lv-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Latvia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "lv-physical.svg"
    }
  },
  "li": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Liechtenstein political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "li-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Liechtenstein physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "li-physical.svg"
    }
  },
  "lt": {
    "political": {
      "sourceType": "generated",
      "title": "Lithuania political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "lt-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Lithuania physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "lt-physical.svg"
    }
  },
  "lu": {
    "political": {
      "sourceType": "generated",
      "title": "Luxembourg political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "lu-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Luxembourg physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "lu-physical.svg"
    }
  },
  "mt": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Malta political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "mt-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Malta physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "mt-physical.svg"
    }
  },
  "md": {
    "political": {
      "sourceType": "generated",
      "title": "Moldova political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "md-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Moldova physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "md-physical.svg"
    }
  },
  "mc": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Monaco political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "mc-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Monaco physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "mc-physical.svg"
    }
  },
  "me": {
    "political": {
      "sourceType": "generated",
      "title": "Montenegro political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "me-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Montenegro physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "me-physical.svg"
    }
  },
  "no": {
    "political": {
      "sourceType": "generated",
      "title": "Norway political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "no-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Norway physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "no-physical.svg"
    }
  },
  "pl": {
    "political": {
      "sourceType": "generated",
      "title": "Poland political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "pl-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Poland physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "pl-physical.svg"
    }
  },
  "pt": {
    "political": {
      "sourceType": "generated",
      "title": "Portugal political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "pt-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Portugal physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "pt-physical.svg"
    }
  },
  "ro": {
    "political": {
      "sourceType": "generated",
      "title": "Romania political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ro-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Romania physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ro-physical.svg"
    }
  },
  "sm": {
    "political": {
      "sourceType": "local-fallback",
      "title": "San Marino political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "sm-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "San Marino physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "sm-physical.svg"
    }
  },
  "rs": {
    "political": {
      "sourceType": "generated",
      "title": "Serbia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "rs-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Serbia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "rs-physical.svg"
    }
  },
  "sk": {
    "political": {
      "sourceType": "generated",
      "title": "Slovakia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sk-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Slovakia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sk-physical.svg"
    }
  },
  "si": {
    "political": {
      "sourceType": "generated",
      "title": "Slovenia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "si-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Slovenia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "si-physical.svg"
    }
  },
  "ua": {
    "political": {
      "sourceType": "generated",
      "title": "Ukraine political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ua-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Ukraine physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ua-physical.svg"
    }
  },
  "va": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Vatican City political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "va-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Vatican City physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "va-physical.svg"
    }
  },
  "mk": {
    "political": {
      "sourceType": "generated",
      "title": "North Macedonia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "mk-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "North Macedonia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "mk-physical.svg"
    }
  },
  "am": {
    "political": {
      "sourceType": "generated",
      "title": "Armenia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "am-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Armenia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "am-physical.svg"
    }
  },
  "az": {
    "political": {
      "sourceType": "generated",
      "title": "Azerbaijan political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "az-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Azerbaijan physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "az-physical.svg"
    }
  },
  "us": {
    "political": {
      "sourceType": "generated",
      "title": "United States political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "us-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "United States physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "us-physical.svg"
    }
  },
  "ca": {
    "political": {
      "sourceType": "generated",
      "title": "Canada political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ca-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Canada physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ca-physical.svg"
    }
  },
  "mx": {
    "political": {
      "sourceType": "generated",
      "title": "Mexico political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "mx-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Mexico physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "mx-physical.svg"
    }
  },
  "cr": {
    "political": {
      "sourceType": "generated",
      "title": "Costa Rica political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cr-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Costa Rica physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cr-physical.svg"
    }
  },
  "pa": {
    "political": {
      "sourceType": "generated",
      "title": "Panama political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "pa-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Panama physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "pa-physical.svg"
    }
  },
  "jm": {
    "political": {
      "sourceType": "generated",
      "title": "Jamaica political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "jm-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Jamaica physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "jm-physical.svg"
    }
  },
  "cu": {
    "political": {
      "sourceType": "generated",
      "title": "Cuba political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cu-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Cuba physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cu-physical.svg"
    }
  },
  "do": {
    "political": {
      "sourceType": "generated",
      "title": "Dominican Republic political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "do-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Dominican Republic physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "do-physical.svg"
    }
  },
  "bs": {
    "political": {
      "sourceType": "generated",
      "title": "Bahamas political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bs-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Bahamas physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bs-physical.svg"
    }
  },
  "bb": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Barbados political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "bb-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Barbados physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "bb-physical.svg"
    }
  },
  "ag": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Antigua and Barbuda political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "ag-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Antigua and Barbuda physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "ag-physical.svg"
    }
  },
  "bz": {
    "political": {
      "sourceType": "generated",
      "title": "Belize political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bz-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Belize physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bz-physical.svg"
    }
  },
  "dm": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Dominica political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "dm-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Dominica physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "dm-physical.svg"
    }
  },
  "sv": {
    "political": {
      "sourceType": "generated",
      "title": "El Salvador political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sv-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "El Salvador physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sv-physical.svg"
    }
  },
  "gd": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Grenada political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "gd-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Grenada physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "gd-physical.svg"
    }
  },
  "gt": {
    "political": {
      "sourceType": "generated",
      "title": "Guatemala political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "gt-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Guatemala physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "gt-physical.svg"
    }
  },
  "ht": {
    "political": {
      "sourceType": "generated",
      "title": "Haiti political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ht-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Haiti physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ht-physical.svg"
    }
  },
  "hn": {
    "political": {
      "sourceType": "generated",
      "title": "Honduras political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "hn-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Honduras physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "hn-physical.svg"
    }
  },
  "ni": {
    "political": {
      "sourceType": "generated",
      "title": "Nicaragua political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ni-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Nicaragua physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ni-physical.svg"
    }
  },
  "kn": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Saint Kitts and Nevis political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "kn-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Saint Kitts and Nevis physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "kn-physical.svg"
    }
  },
  "lc": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Saint Lucia political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "lc-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Saint Lucia physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "lc-physical.svg"
    }
  },
  "vc": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Saint Vincent and the Grenadines political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "vc-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Saint Vincent and the Grenadines physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "vc-physical.svg"
    }
  },
  "tt": {
    "political": {
      "sourceType": "generated",
      "title": "Trinidad and Tobago political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "tt-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Trinidad and Tobago physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "tt-physical.svg"
    }
  },
  "br": {
    "political": {
      "sourceType": "generated",
      "title": "Brazil political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "br-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Brazil physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "br-physical.svg"
    }
  },
  "ar": {
    "political": {
      "sourceType": "generated",
      "title": "Argentina political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ar-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Argentina physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ar-physical.svg"
    }
  },
  "co": {
    "political": {
      "sourceType": "generated",
      "title": "Colombia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "co-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Colombia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "co-physical.svg"
    }
  },
  "pe": {
    "political": {
      "sourceType": "generated",
      "title": "Peru political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "pe-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Peru physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "pe-physical.svg"
    }
  },
  "cl": {
    "political": {
      "sourceType": "generated",
      "title": "Chile political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cl-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Chile physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cl-physical.svg"
    }
  },
  "ve": {
    "political": {
      "sourceType": "generated",
      "title": "Venezuela political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ve-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Venezuela physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ve-physical.svg"
    }
  },
  "ec": {
    "political": {
      "sourceType": "generated",
      "title": "Ecuador political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ec-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Ecuador physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ec-physical.svg"
    }
  },
  "bo": {
    "political": {
      "sourceType": "generated",
      "title": "Bolivia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bo-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Bolivia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bo-physical.svg"
    }
  },
  "py": {
    "political": {
      "sourceType": "generated",
      "title": "Paraguay political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "py-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Paraguay physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "py-physical.svg"
    }
  },
  "uy": {
    "political": {
      "sourceType": "generated",
      "title": "Uruguay political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "uy-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Uruguay physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "uy-physical.svg"
    }
  },
  "gy": {
    "political": {
      "sourceType": "generated",
      "title": "Guyana political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "gy-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Guyana physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "gy-physical.svg"
    }
  },
  "sr": {
    "political": {
      "sourceType": "generated",
      "title": "Suriname political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sr-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Suriname physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sr-physical.svg"
    }
  },
  "eg": {
    "political": {
      "sourceType": "generated",
      "title": "Egypt political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "eg-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Egypt physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "eg-physical.svg"
    }
  },
  "za": {
    "political": {
      "sourceType": "generated",
      "title": "South Africa political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "za-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "South Africa physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "za-physical.svg"
    }
  },
  "ng": {
    "political": {
      "sourceType": "generated",
      "title": "Nigeria political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ng-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Nigeria physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ng-physical.svg"
    }
  },
  "ke": {
    "political": {
      "sourceType": "generated",
      "title": "Kenya political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ke-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Kenya physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ke-physical.svg"
    }
  },
  "ma": {
    "political": {
      "sourceType": "generated",
      "title": "Morocco political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ma-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Morocco physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ma-physical.svg"
    }
  },
  "mg": {
    "political": {
      "sourceType": "generated",
      "title": "Madagascar political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "mg-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Madagascar physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "mg-physical.svg"
    }
  },
  "dz": {
    "political": {
      "sourceType": "generated",
      "title": "Algeria political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "dz-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Algeria physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "dz-physical.svg"
    }
  },
  "ao": {
    "political": {
      "sourceType": "generated",
      "title": "Angola political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ao-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Angola physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ao-physical.svg"
    }
  },
  "bj": {
    "political": {
      "sourceType": "generated",
      "title": "Benin political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bj-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Benin physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bj-physical.svg"
    }
  },
  "bw": {
    "political": {
      "sourceType": "generated",
      "title": "Botswana political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bw-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Botswana physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bw-physical.svg"
    }
  },
  "bf": {
    "political": {
      "sourceType": "generated",
      "title": "Burkina Faso political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bf-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Burkina Faso physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bf-physical.svg"
    }
  },
  "bi": {
    "political": {
      "sourceType": "generated",
      "title": "Burundi political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bi-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Burundi physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "bi-physical.svg"
    }
  },
  "cm": {
    "political": {
      "sourceType": "generated",
      "title": "Cameroon political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cm-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Cameroon physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cm-physical.svg"
    }
  },
  "cv": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Cape Verde political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "cv-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Cape Verde physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "cv-physical.svg"
    }
  },
  "cf": {
    "political": {
      "sourceType": "generated",
      "title": "Central African Republic political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cf-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Central African Republic physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cf-physical.svg"
    }
  },
  "td": {
    "political": {
      "sourceType": "generated",
      "title": "Chad political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "td-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Chad physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "td-physical.svg"
    }
  },
  "km": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Comoros political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "km-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Comoros physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "km-physical.svg"
    }
  },
  "cd": {
    "political": {
      "sourceType": "generated",
      "title": "Congo (DRC) political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cd-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Congo (DRC) physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cd-physical.svg"
    }
  },
  "cg": {
    "political": {
      "sourceType": "generated",
      "title": "Congo (Republic) political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cg-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Congo (Republic) physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "cg-physical.svg"
    }
  },
  "dj": {
    "political": {
      "sourceType": "generated",
      "title": "Djibouti political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "dj-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Djibouti physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "dj-physical.svg"
    }
  },
  "gq": {
    "political": {
      "sourceType": "generated",
      "title": "Equatorial Guinea political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "gq-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Equatorial Guinea physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "gq-physical.svg"
    }
  },
  "er": {
    "political": {
      "sourceType": "generated",
      "title": "Eritrea political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "er-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Eritrea physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "er-physical.svg"
    }
  },
  "sz": {
    "political": {
      "sourceType": "generated",
      "title": "Eswatini political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sz-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Eswatini physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sz-physical.svg"
    }
  },
  "et": {
    "political": {
      "sourceType": "generated",
      "title": "Ethiopia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "et-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Ethiopia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "et-physical.svg"
    }
  },
  "ga": {
    "political": {
      "sourceType": "generated",
      "title": "Gabon political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ga-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Gabon physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ga-physical.svg"
    }
  },
  "gm": {
    "political": {
      "sourceType": "generated",
      "title": "Gambia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "gm-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Gambia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "gm-physical.svg"
    }
  },
  "gh": {
    "political": {
      "sourceType": "generated",
      "title": "Ghana political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "gh-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Ghana physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "gh-physical.svg"
    }
  },
  "gn": {
    "political": {
      "sourceType": "generated",
      "title": "Guinea political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "gn-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Guinea physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "gn-physical.svg"
    }
  },
  "gw": {
    "political": {
      "sourceType": "generated",
      "title": "Guinea-Bissau political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "gw-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Guinea-Bissau physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "gw-physical.svg"
    }
  },
  "ci": {
    "political": {
      "sourceType": "generated",
      "title": "Ivory Coast political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ci-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Ivory Coast physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ci-physical.svg"
    }
  },
  "ls": {
    "political": {
      "sourceType": "generated",
      "title": "Lesotho political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ls-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Lesotho physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ls-physical.svg"
    }
  },
  "lr": {
    "political": {
      "sourceType": "generated",
      "title": "Liberia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "lr-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Liberia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "lr-physical.svg"
    }
  },
  "ly": {
    "political": {
      "sourceType": "generated",
      "title": "Libya political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ly-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Libya physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ly-physical.svg"
    }
  },
  "mw": {
    "political": {
      "sourceType": "generated",
      "title": "Malawi political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "mw-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Malawi physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "mw-physical.svg"
    }
  },
  "ml": {
    "political": {
      "sourceType": "generated",
      "title": "Mali political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ml-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Mali physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ml-physical.svg"
    }
  },
  "mr": {
    "political": {
      "sourceType": "generated",
      "title": "Mauritania political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "mr-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Mauritania physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "mr-physical.svg"
    }
  },
  "mu": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Mauritius political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "mu-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Mauritius physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "mu-physical.svg"
    }
  },
  "mz": {
    "political": {
      "sourceType": "generated",
      "title": "Mozambique political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "mz-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Mozambique physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "mz-physical.svg"
    }
  },
  "na": {
    "political": {
      "sourceType": "generated",
      "title": "Namibia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "na-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Namibia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "na-physical.svg"
    }
  },
  "ne": {
    "political": {
      "sourceType": "generated",
      "title": "Niger political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ne-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Niger physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ne-physical.svg"
    }
  },
  "rw": {
    "political": {
      "sourceType": "generated",
      "title": "Rwanda political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "rw-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Rwanda physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "rw-physical.svg"
    }
  },
  "st": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Sao Tome and Principe political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "st-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Sao Tome and Principe physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "st-physical.svg"
    }
  },
  "sn": {
    "political": {
      "sourceType": "generated",
      "title": "Senegal political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sn-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Senegal physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sn-physical.svg"
    }
  },
  "sc": {
    "political": {
      "sourceType": "local-fallback",
      "title": "Seychelles political map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "sc-political.svg"
    },
    "physical": {
      "sourceType": "local-fallback",
      "title": "Seychelles physical map",
      "credit": "Generated from local app country data; replace by rerunning the map builder with network access.",
      "license": "Local generated fallback",
      "fileName": "sc-physical.svg"
    }
  },
  "sl": {
    "political": {
      "sourceType": "generated",
      "title": "Sierra Leone political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sl-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Sierra Leone physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sl-physical.svg"
    }
  },
  "so": {
    "political": {
      "sourceType": "generated",
      "title": "Somalia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "so-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Somalia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "so-physical.svg"
    }
  },
  "ss": {
    "political": {
      "sourceType": "generated",
      "title": "South Sudan political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ss-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "South Sudan physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ss-physical.svg"
    }
  },
  "sd": {
    "political": {
      "sourceType": "generated",
      "title": "Sudan political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sd-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Sudan physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "sd-physical.svg"
    }
  },
  "tz": {
    "political": {
      "sourceType": "generated",
      "title": "Tanzania political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "tz-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Tanzania physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "tz-physical.svg"
    }
  },
  "tg": {
    "political": {
      "sourceType": "generated",
      "title": "Togo political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "tg-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Togo physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "tg-physical.svg"
    }
  },
  "tn": {
    "political": {
      "sourceType": "generated",
      "title": "Tunisia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "tn-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Tunisia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "tn-physical.svg"
    }
  },
  "ug": {
    "political": {
      "sourceType": "generated",
      "title": "Uganda political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ug-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Uganda physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "ug-physical.svg"
    }
  },
  "zm": {
    "political": {
      "sourceType": "generated",
      "title": "Zambia political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "zm-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Zambia physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "zm-physical.svg"
    }
  },
  "zw": {
    "political": {
      "sourceType": "generated",
      "title": "Zimbabwe political map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "zw-political.svg"
    },
    "physical": {
      "sourceType": "generated",
      "title": "Zimbabwe physical map",
      "credit": "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
      "license": "Public domain",
      "sourceUrl": "https://www.naturalearthdata.com/about/terms-of-use/",
      "fileName": "zw-physical.svg"
    }
  }
};
