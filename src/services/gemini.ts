import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY || API_KEY === 'your_api_key_here') {
  console.warn('Gemini API key not configured. Please add your API key to .env file.');
}

const genAI = new GoogleGenerativeAI(API_KEY || '');

// Types for generated story data
export interface GeneratedStoryPage {
  pageNumber: number;
  text: string;
}

export interface GeneratedVocabWord {
  word: string;
  pronunciation: string;
  definition: string;
  icon: string;
}

export interface GeneratedStory {
  pages: GeneratedStoryPage[];
  vocabulary: GeneratedVocabWord[];
}

export interface StoryGenerationParams {
  toyDescription: string;
  toyName: string;
  energy: number;
  confidence: number;
  age: string;
  language: string;
}

/**
 * Helper to add delay between API calls
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Detailed toy character description for consistent illustrations
 */
export interface ToyCharacterProfile {
  // Basic info
  type: string;           // e.g., "teddy bear", "dinosaur plush", "robot toy"
  name?: string;          // Will be set by user

  // Visual appearance (for consistent illustrations)
  primaryColor: string;   // Main color
  secondaryColors: string; // Other colors
  material: string;       // e.g., "soft plush", "plastic", "knitted wool"
  size: string;           // e.g., "small", "medium", "huggable size"

  // Distinctive features
  facialFeatures: string; // e.g., "button eyes, stitched smile, small black nose"
  bodyShape: string;      // e.g., "round and chubby", "long and slender"
  clothing: string;       // e.g., "red bow tie", "blue overalls", "none"
  accessories: string;    // e.g., "tiny backpack", "heart patch on chest"

  // For illustration prompts
  fullDescription: string; // Complete description for image generation
}

/**
 * Analyze a toy image in DETAIL for consistent character illustration
 * @param imageBase64 - Base64 encoded image data
 * @returns Detailed character profile for consistent illustrations
 */
export async function analyzeToyImage(imageBase64: string): Promise<string> {
  const profile = await analyzeToyImageDetailed(imageBase64);
  return profile.fullDescription;
}

/**
 * Deep analysis of toy for character consistency across illustrations
 */
export async function analyzeToyImageDetailed(imageBase64: string): Promise<ToyCharacterProfile> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Remove data URL prefix if present
  const base64Data = imageBase64.includes('base64,')
    ? imageBase64.split('base64,')[1]
    : imageBase64;

  const prompt = `You are creating a character reference sheet for a children's book illustrator.
Analyze this toy image in DETAIL so an artist can draw this EXACT toy consistently across multiple illustrations.

Respond with ONLY valid JSON (no markdown):
{
  "type": "what kind of toy (e.g., teddy bear, dinosaur plush, stuffed bunny)",
  "primaryColor": "main color of the toy",
  "secondaryColors": "any other colors present",
  "material": "what it appears to be made of (plush, knitted, plastic, etc.)",
  "size": "apparent size (small, medium, large, huggable)",
  "facialFeatures": "describe eyes, nose, mouth in detail (e.g., round black button eyes, pink triangle nose, stitched smile)",
  "bodyShape": "body proportions (e.g., round and chubby, long arms, big head)",
  "clothing": "any clothes or outfits (or 'none')",
  "accessories": "any accessories, patches, bows, tags (or 'none')",
  "distinctiveFeatures": "anything unique that makes this toy special"
}`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64Data,
      },
    },
  ]);

  const response = await result.response;
  let text = response.text();

  // Parse JSON response
  if (text.includes('```json')) {
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  } else if (text.includes('```')) {
    text = text.replace(/```\n?/g, '');
  }

  try {
    const parsed = JSON.parse(text.trim());

    // Build the full description for image prompts
    const fullDescription = `A ${parsed.material} ${parsed.type} toy.
Color: ${parsed.primaryColor} with ${parsed.secondaryColors}.
Size: ${parsed.size}.
Face: ${parsed.facialFeatures}.
Body: ${parsed.bodyShape}.
${parsed.clothing !== 'none' ? `Wearing: ${parsed.clothing}.` : ''}
${parsed.accessories !== 'none' ? `Has: ${parsed.accessories}.` : ''}
${parsed.distinctiveFeatures ? `Special features: ${parsed.distinctiveFeatures}.` : ''}`.trim();

    return {
      type: parsed.type,
      primaryColor: parsed.primaryColor,
      secondaryColors: parsed.secondaryColors,
      material: parsed.material,
      size: parsed.size,
      facialFeatures: parsed.facialFeatures,
      bodyShape: parsed.bodyShape,
      clothing: parsed.clothing || 'none',
      accessories: parsed.accessories || 'none',
      fullDescription,
    };
  } catch (e) {
    console.error('Failed to parse toy analysis:', e);
    // Return a basic fallback
    return {
      type: 'stuffed toy',
      primaryColor: 'brown',
      secondaryColors: 'none',
      material: 'soft plush',
      size: 'medium',
      facialFeatures: 'friendly face',
      bodyShape: 'cuddly',
      clothing: 'none',
      accessories: 'none',
      fullDescription: 'A cute, cuddly stuffed toy with a friendly face',
    };
  }
}

/**
 * Generate a personalized children's story using Gemini
 */
export async function generateStory(params: StoryGenerationParams): Promise<GeneratedStory> {
  // Add delay to avoid rate limiting
  await delay(2000);

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Create a children's story for ages ${params.age} in ${params.language}.

Main character: A toy named "${params.toyName}" which is a ${params.toyDescription}.
Personality: ${params.energy}% energetic (0=calm, 100=very active), ${params.confidence}% confident (0=shy, 100=brave)

Requirements:
- 6 short paragraphs (1-3 sentences each)
- Age-appropriate vocabulary for ${params.age} year olds
- Positive, adventurous theme
- Include 4 vocabulary words that would be educational for this age group
- End on a happy, comforting note
- The personality should influence the story: ${getPersonalityDescription(params.energy, params.confidence)}

IMPORTANT: You must respond with ONLY valid JSON, no markdown formatting, no code blocks. Format:
{
  "pages": [
    {"pageNumber": 1, "text": "..."},
    {"pageNumber": 2, "text": "..."},
    {"pageNumber": 3, "text": "..."},
    {"pageNumber": 4, "text": "..."},
    {"pageNumber": 5, "text": "..."},
    {"pageNumber": 6, "text": "..."}
  ],
  "vocabulary": [
    {"word": "...", "pronunciation": "...", "definition": "...", "icon": "emoji"},
    {"word": "...", "pronunciation": "...", "definition": "...", "icon": "emoji"},
    {"word": "...", "pronunciation": "...", "definition": "...", "icon": "emoji"},
    {"word": "...", "pronunciation": "...", "definition": "...", "icon": "emoji"}
  ]
}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Parse JSON response, handling potential markdown code blocks
  let jsonText = text;
  if (text.includes('```json')) {
    jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  } else if (text.includes('```')) {
    jsonText = text.replace(/```\n?/g, '');
  }

  try {
    const parsed = JSON.parse(jsonText.trim());
    return parsed as GeneratedStory;
  } catch (e) {
    console.error('Failed to parse story JSON:', e);
    console.error('Raw response:', text);
    throw new Error('Failed to generate story - invalid response format');
  }
}

/**
 * Get a personality description based on energy and confidence levels
 */
function getPersonalityDescription(energy: number, confidence: number): string {
  const energyDesc = energy > 70 ? "very energetic and loves action"
    : energy > 30 ? "moderately active and curious"
    : "calm and thoughtful";

  const confidenceDesc = confidence > 70 ? "brave and outgoing"
    : confidence > 30 ? "friendly but cautious"
    : "shy and gentle";

  return `The character is ${energyDesc}, and ${confidenceDesc}.`;
}

/**
 * Check if the Gemini API is properly configured
 */
export function isApiConfigured(): boolean {
  return !!API_KEY && API_KEY !== 'your_api_key_here';
}

// ============================================
// IMAGE GENERATION
// ============================================

/**
 * Art style options for generated images
 * CUSTOMIZE THIS to change the look of your storybook illustrations
 */
export const IMAGE_STYLE = {
  // Main art style - change this to customize the look
  style: "warm and cozy children's book illustration style, soft watercolor textures, gentle pastel colors",

  // Additional style modifiers
  lighting: "soft warm lighting, golden hour glow",
  mood: "friendly, magical, comforting",

  // Technical quality settings
  quality: "high quality, detailed, professional children's book illustration",

  // What to avoid in images
  negative: "scary, dark, realistic, photographic, violent, sad"
};

export interface ImageGenerationParams {
  storyText: string;
  toyDescription: string;
  toyName: string;
  pageNumber: number;
}

/**
 * Generate an illustration for a story page using Gemini
 */
export async function generateStoryImage(params: ImageGenerationParams): Promise<string> {
  // Add delay to avoid rate limiting
  await delay(3000);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      responseModalities: ["image", "text"],
    } as any,
  });

  const imagePrompt = `Create a children's book illustration for this scene:

SCENE: ${params.storyText}

MAIN CHARACTER: A toy named "${params.toyName}" which is ${params.toyDescription}.
The toy should be the main focus and look cute and friendly.

ART STYLE: ${IMAGE_STYLE.style}
LIGHTING: ${IMAGE_STYLE.lighting}
MOOD: ${IMAGE_STYLE.mood}
QUALITY: ${IMAGE_STYLE.quality}

DO NOT include: ${IMAGE_STYLE.negative}

This is page ${params.pageNumber} of a children's storybook. Make the illustration magical and engaging for young children.`;

  try {
    const result = await model.generateContent(imagePrompt);
    const response = await result.response;

    // Check if we got an image in the response
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if ((part as any).inlineData?.mimeType?.startsWith('image/')) {
          const imageData = (part as any).inlineData.data;
          const mimeType = (part as any).inlineData.mimeType;
          return `data:${mimeType};base64,${imageData}`;
        }
      }
    }

    throw new Error('No image in response');
  } catch (error) {
    console.error('Image generation failed:', error);
    throw error;
  }
}

/**
 * Generate all images for a story
 */
export async function generateAllStoryImages(
  pages: GeneratedStoryPage[],
  toyDescription: string,
  toyName: string,
  onProgress?: (current: number, total: number) => void
): Promise<string[]> {
  const images: string[] = [];

  for (let i = 0; i < pages.length; i++) {
    onProgress?.(i + 1, pages.length);

    try {
      const imageUrl = await generateStoryImage({
        storyText: pages[i].text,
        toyDescription,
        toyName,
        pageNumber: i + 1,
      });
      images.push(imageUrl);
    } catch (error) {
      console.error(`Failed to generate image for page ${i + 1}:`, error);
      // Use a placeholder if image generation fails
      images.push('');
    }
  }

  return images;
}
