import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Lazy initialize Gemini clients to avoid crashes if API key is missing
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("GEMINI_API_KEY is not configured or in placeholder state. AI features will fallback to offline mock responses.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

const app = express();
app.use(express.json());

const PORT = 3000;

// API route: Travel Guide assistant
app.post("/api/countries/ask", async (req, res) => {
  const { countryName, query } = req.body;
  if (!countryName || !query) {
    return res.status(400).json({ error: "countryName and query are required" });
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Offline / Placeholder Fallback response
    return res.json({
      answer: `🌍 **[Offline Guide Mode]**
It looks like the Gemini API Key is not set in the AI Studio environment yet.

But here is some classic info about **${countryName}**:
People love exploring its major sights, tasting its famous national food, and enjoying local customs!

*Tip: Add your \`GEMINI_API_KEY\` in AI Studio's **Settings > Secrets** panel to unlock full, live AI travel answers, custom 3-day itineraries, and interactive cultural conversations!*`
    });
  }

  try {
    const prompt = `Tell me about ${countryName}. Question: ${query}`;
    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are an expert cultural ambassador, historian, and travel guide.
Your goal is to explain traditions, recipes, sightseeing guides, histories, and local languages about a country in an engaging, beautifully structured manner (using bullet points and bold highlights).
Keep the answers concise and tailored to a curious learner or gamer, around 150-250 words total.
If asked about travel plans, outline a delightful, short, immersive list.
Avoid any low-quality metadata headers like "Here is your response". Just start with elegant Markdown directly.`,
        temperature: 0.7,
      }
    });

    res.json({ answer: result.text || "I was unable to find an answer for that country." });
  } catch (error: any) {
    console.error("Gemini Travel Guide Error:", error);
    res.status(500).json({ error: `AI Guide encountered an issue: ${error.message || error}` });
  }
});

// API route: Country Trivia Fact/Fiction generator
app.post("/api/countries/trivia", async (req, res) => {
  const { countryName } = req.body;
  const targetCountry = countryName || "any random country";

  const ai = getGeminiClient();
  if (!ai) {
    // Elegant Offline Fallback Trivia
    const fallbackFacts = [
      {
        country: "Japan",
        statement: "Japan has more than 5 million vending machines, which can sell items ranging from hot canned coffee to fresh fruit.",
        isTrue: true,
        explanation: "Yes! Vending machines in Japan are widely spread and highly advanced, serving a wide variety of everyday products with incredible reliability."
      },
      {
        country: "Canada",
        statement: "Canada contains more lakes than the rest of the world's freshwater lakes combined.",
        isTrue: true,
        explanation: "That's true! Canada has over two million lakes in total, making up about 60% of all the world's lakes."
      },
      {
        country: "Australia",
        statement: "Australia is physically home to the tallest pyramid in the world, built by ancient civilizations thousands of years ago.",
        isTrue: false,
        explanation: "False! The tallest pyramids are located in Egypt and the largest in Mexico. Australia does not have ancient stone pyramids."
      },
      {
        country: "Egypt",
        statement: "The Great Pyramid of Giza is the only member of the original Seven Wonders of the Ancient World that is still standing today.",
        isTrue: true,
        explanation: "Absolutely true! Built over 4,500 years ago as a tomb for Pharaoh Khufu, it remains highly intact and preserved."
      }
    ];

    // Pick a random fallback
    const selected = fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
    return res.json({
      country: selected.country,
      statement: `${selected.statement} (Offline fallback)`,
      isTrue: selected.isTrue,
      explanation: selected.explanation
    });
  }

  try {
    const prompt = `Generate a fascinating, lesser-known country trivia statement about ${targetCountry}. It can either be fully True OR completely False (make it about a 50/50 chance). Focus on flags, capital cities, unique currency stories, عجیب landmarks, extreme rules, or local traditions. Make sure it sounds plausible but is factually either correct or fabricated based on the 'isTrue' boolean.`;

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are a trivia game master creating fun, engaging true-or-false quiz questions for a geography education game.
Generate exactly one trivia question that is either completely true or false.
Provide a clear, educational, and fun explanation.
Output your response matching the requested JSON format exactly.`,
        temperature: 0.9,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            country: {
              type: Type.STRING,
              description: "The specific country the question is about."
            },
            statement: {
              type: Type.STRING,
              description: "A fun and engaging true-or-false statement about the country. Do not mention whether it is true or false in the statement itself."
            },
            isTrue: {
              type: Type.BOOLEAN,
              description: "Must be true if the statement is factually correct, or false if the statement lies/exaggerates."
            },
            explanation: {
              type: Type.STRING,
              description: "A brief, interesting, 1-2 sentence explanation revealing the truth and detailing the fact."
            }
          },
          required: ["country", "statement", "isTrue", "explanation"]
        }
      }
    });

    const parsedData = JSON.parse(result.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini Trivia Error:", error);
    res.status(500).json({ error: `AI Trivia Master encountered an issue: ${error.message || error}` });
  }
});

// API route: Live Tourist Destinations generator
app.post("/api/countries/destinations", async (req, res) => {
  const { countryName } = req.body;
  if (!countryName) {
    return res.status(400).json({ error: "countryName is required" });
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Offline placeholder destinations
    return res.json({
      country: countryName,
      destinations: [
        {
          name: "Historic Capital District",
          type: "Culture & History",
          description: `Explore the vibrant capital city center of ${countryName} featuring magnificent museums, monuments, and culinary hubs.`
        },
        {
          name: "Sovereign Landmark Sanctuary",
          type: "Nature & Adventure",
          description: `Visit the country's most legendary geographic landmarks and capture panoramic views of the spectacular local terrain.`
        },
        {
          name: "Vibrant Heritage Bazaar",
          type: "Civic Landmark",
          description: `Experience everyday local life, connect with friendly residents, and savor the iconic spices, sweets, and dishes.`
        }
      ]
    });
  }

  try {
    const prompt = `Generate exactly 3 top travel and tourist destinations in ${countryName}. Give each a clear name, a type/category (e.g., Natural Wonder, Historic Ruins, Cultural Retreat), and a compelling 1-2 sentence description highlighting why someone must visit.`;

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are an elite travel concierge. Supply a neat JSON response containing a list of exactly 3 remarkable must-visit tourist destinations for the requested country. Provide accurate, real-world locations. Do not say "Here is the JSON."`,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            country: { type: Type.STRING },
            destinations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Name of the destination." },
                  type: { type: Type.STRING, description: "Category/Theme" },
                  description: { type: Type.STRING, description: "Engaging 1-2 sentence travel description." }
                },
                required: ["name", "type", "description"]
              }
            }
          },
          required: ["country", "destinations"]
        }
      }
    });

    const parsedDestinations = JSON.parse(result.text || "{}");
    res.json(parsedDestinations);
  } catch (error: any) {
    console.error("Gemini Destinations Error:", error);
    res.status(500).json({ error: `AI Guide was unable to retrieve tourist destinations: ${error.message || error}` });
  }
});

// API route: Isolated Academic Study Map generator
app.post("/api/countries/study-map", async (req, res) => {
  const { countryName } = req.body;
  if (!countryName) {
    return res.status(400).json({ error: "countryName is required" });
  }

  // Generate offline procedural fallback data
  const offlineFallback = (() => {
    let hash = 0;
    for (let i = 0; i < countryName.length; i++) {
      hash = countryName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const steps = 18;
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < steps; i++) {
      const angle = (i * 2 * Math.PI) / steps;
      const noise = Math.sin(angle * 3 + hash) * 11 + Math.cos(angle * 5 + hash) * 3;
      const radius = 33 + noise;
      const x = Math.round(50 + Math.cos(angle) * radius);
      const y = Math.round(50 + Math.sin(angle) * radius);
      points.push({ x, y });
    }
    return {
      countryName,
      outlinePoints: points,
      capitalPoint: {
        name: "Capital Core",
        x: 50,
        y: 45,
        details: "The historical administrative and sovereign capital city center."
      },
      majorCities: [
        { name: "Metro Terminal A", x: 30, y: 30, description: "A major economic cluster and trade crossroad." },
        { name: "Coastal Horizon City", x: 70, y: 65, description: "A picturesque coastal district acting as a deep-sea port." }
      ],
      physicalLandmarks: [
        { name: "Sovereign Highlands", type: "mountain", x: 35, y: 25, description: "The dominant mountain peak shaping local weather systems." },
        {
          name: "Sovereign Valley River",
          type: "river",
          x: 52,
          y: 52,
          description: "The primary freshwater artery of the country, sustaining agricultural fields.",
          points: [
            { x: 35, y: 25 },
            { x: 45, y: 40 },
            { x: 52, y: 55 },
            { x: 70, y: 65 }
          ]
        }
      ],
      neighborBorders: [
        { name: "Alliance Border", direction: "NE", description: "Bilateral land crossing bounded by ancient boundary fences." },
        { name: "Coastal Maritime Bay", direction: "SW", description: "An expansive ocean waterfront with deep cargo terminals." }
      ],
      academicSpecs: {
        northToSouthDistanceKm: "Approx. 1,450 km",
        eastToWestDistanceKm: "Approx. 980 km",
        totalAreaSqKm: "Regionally Scaled",
        totalBordersKm: "Approx. 3,100 km",
        coastlineStatus: "coastal",
        extremePoints: {
          north: "Northern Pass",
          south: "Southern Waterfront Cape",
          east: "Eastern Wetland Estuary",
          west: "Western Highland Ridge"
        }
      },
      academicTips: [
        `Studying the isolated bounds of ${countryName} highlights its unique shape on the coordinate grid.`,
        "Notice how the major rivers flow through valleys to satisfy agricultural zones.",
        "Hover over coordinate markers or switch to Quiz Mode to test your topographic recall!"
      ]
    };
  })();

  const ai = getGeminiClient();
  if (!ai) {
    return res.json(offlineFallback);
  }

  try {
    const prompt = `Create a complete academic geography study profile for the country: ${countryName}.
    You MUST provide:
    1. A simplified polygon of exactly 15 to 22 sequential coordinate points (x, y both integers 0 to 100) that roughly resembles its distinct geographic shape. Center the shape tightly inside the 0-100 coordinate block with 10% outer padding (bounds 10 to 90), so we can draw its isolated silhouette.
    2. The exact capital city positioned inside that same 100x100 space, with its name and study details.
    3. Exactly 2 to 3 other major cities with relative coordinate positions (x, y) on the grid and a brief description.
    4. Exactly 2 to 3 physical geography landforms (mountains, rivers, or lakes) with coordinates and descriptions. For a river, optionally supply a sequential path of 3 to 5 'points' so we can trace its flowing line.
    5. Direct neighboring countries and maritime borders with precise cardinal directions (e.g. N, S, NE, NW, SW, etc.).
    6. Specific geographic specs (North-South span in km, East-West span in km, total area, landlocked status, and names of North, South, East, West extreme points).
    7. Exactly 3 highly useful geography study tips or core exam-based analytical points about this country's terrain, climate, or borders.`;

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are a professional cartographer and geography professor compiling study blueprints for competitive exams.
        Supply a beautifully accurate, real-world JSON response containing coordinates and study landmarks for the requested country.
        Ensure all x and y coordinates are integers strictly within the range of 5 to 95, representing the correct spatial relationships. Keep coordinates consistent so landmarks actually sit inside the border polygon.
        Provide authentic, factually accurate numbers and descriptions. Do not say "Here is the JSON."`,
        temperature: 0.2, // Low temperature for high precision coordinate and geographical data
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            countryName: { type: Type.STRING },
            outlinePoints: {
              type: Type.ARRAY,
              description: "Array of exactly 15 to 22 sequential x, y coordinate points (0-100) defining the country's outer polygon boundary.",
              items: {
                type: Type.OBJECT,
                properties: {
                  x: { type: Type.INTEGER },
                  y: { type: Type.INTEGER }
                },
                required: ["x", "y"]
              }
            },
            capitalPoint: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                x: { type: Type.INTEGER },
                y: { type: Type.INTEGER },
                details: { type: Type.STRING }
              },
              required: ["name", "x", "y", "details"]
            },
            majorCities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  x: { type: Type.INTEGER },
                  y: { type: Type.INTEGER },
                  description: { type: Type.STRING }
                },
                required: ["name", "x", "y", "description"]
              }
            },
            physicalLandmarks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  type: { type: Type.STRING, description: "mountain, river, lake, forest, desert, or volcano" },
                  x: { type: Type.INTEGER },
                  y: { type: Type.INTEGER },
                  description: { type: Type.STRING },
                  points: {
                    type: Type.ARRAY,
                    description: "Only for rivers: coordinates tracing the river flow path.",
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        x: { type: Type.INTEGER },
                        y: { type: Type.INTEGER }
                      },
                      required: ["x", "y"]
                    }
                  }
                },
                required: ["name", "type", "x", "y", "description"]
              }
            },
            neighborBorders: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Name of neighbor country or waterbody" },
                  direction: { type: Type.STRING, description: "N, S, E, W, NE, NW, SE, SW" },
                  description: { type: Type.STRING, description: "Border style or political relationship detail" }
                },
                required: ["name", "direction", "description"]
              }
            },
            academicSpecs: {
              type: Type.OBJECT,
              properties: {
                northToSouthDistanceKm: { type: Type.STRING },
                eastToWestDistanceKm: { type: Type.STRING },
                totalAreaSqKm: { type: Type.STRING },
                totalBordersKm: { type: Type.STRING },
                coastlineStatus: { type: Type.STRING, description: "coastal or landlocked" },
                extremePoints: {
                  type: Type.OBJECT,
                  properties: {
                    north: { type: Type.STRING, description: "Northernmost physical location name" },
                    south: { type: Type.STRING, description: "Southernmost physical location name" },
                    east: { type: Type.STRING, description: "Easternmost physical location name" },
                    west: { type: Type.STRING, description: "Westernmost physical location name" }
                  },
                  required: ["north", "south", "east", "west"]
                }
              },
              required: ["northToSouthDistanceKm", "eastToWestDistanceKm", "totalAreaSqKm", "totalBordersKm", "coastlineStatus", "extremePoints"]
            },
            academicTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 highly valuable geography study notes for students."
            }
          },
          required: [
            "countryName",
            "outlinePoints",
            "capitalPoint",
            "majorCities",
            "physicalLandmarks",
            "neighborBorders",
            "academicSpecs",
            "academicTips"
          ]
        }
      }
    });

    const parsedStudyMap = JSON.parse(result.text || "{}");
    res.json(parsedStudyMap);
  } catch (error: any) {
    console.error("Gemini Study Map Error:", error);
    res.json(offlineFallback); // Gracefully return standard offline procedural map on error
  }
});

// Mount Vite middleware for development, or serve built assets in production
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html as fallback for SPA
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`World Country Learner Server running on port ${PORT}`);
  });
}

start();
