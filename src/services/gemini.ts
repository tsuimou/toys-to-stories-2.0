import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini clients
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY || API_KEY === 'your_api_key_here') {
  console.warn('Gemini API key not configured. Please add your API key to .env file.');
}

// Old SDK for text generation
const genAI = new GoogleGenerativeAI(API_KEY || '');

// New SDK for image generation (same as your working code!)
const ai = new GoogleGenAI({ apiKey: API_KEY || '' });

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
 * Following the 5 Storytelling Principles for ages 0-5
 */
export async function generateStory(params: StoryGenerationParams): Promise<GeneratedStory> {
  // Add delay to avoid rate limiting
  await delay(2000);

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a children's book author creating a story for ages ${params.age} in ${params.language}.

══════════════════════════════════════════════════════════════
MAIN CHARACTER
══════════════════════════════════════════════════════════════
Name: "${params.toyName}"
Description: ${params.toyDescription}
Personality: ${getPersonalityDescription(params.energy, params.confidence)}

══════════════════════════════════════════════════════════════
5 STORYTELLING PRINCIPLES (FOLLOW THESE EXACTLY)
══════════════════════════════════════════════════════════════

1. SIMPLE YET MEANINGFUL STORY STRUCTURE
   - Page 1: Introduce ${params.toyName} in their cozy world
   - Page 2-3: Present a small, relatable problem (lost something, feeling shy, wanting to try something new)
   - Page 4-5: Show their journey - exploration, emotions, reactions to the challenge
   - Page 6: Heartwarming resolution with a clear, gentle lesson

2. STRONG, RELATABLE EMOTIONS
   - Use emotions children recognize: joy, worry, curiosity, excitement, pride
   - Show expressive reactions: "${params.toyName}'s eyes grew wide!" or "${params.toyName} felt a little flutter in their tummy."

3. PLAYFUL AND ENGAGING LANGUAGE
   - Short, rhythmic sentences fun to read aloud
   - Use REPETITION: "${params.toyName} looked left. ${params.toyName} looked right."
   - Use ONOMATOPOEIA: "WHOOSH! SPLASH! POP! CRASH!"
   - Use occasional RHYME: "Up and down, all around!"
   - Dr. Seuss-style playfulness encouraged

4. VISUALLY RICH DESCRIPTIONS
   - Simple but vivid imagery: "The sun painted the sky orange and pink"
   - Sensory details: soft, warm, sparkly, squishy, tiny

5. GENTLE, POSITIVE LESSON
   - End with uplifting message like:
     "It's okay to make mistakes!"
     "Everyone is special in their own way!"
     "Trying something new can be exciting!"
     "Being kind makes the world brighter!"

══════════════════════════════════════════════════════════════
OUTPUT REQUIREMENTS
══════════════════════════════════════════════════════════════

- Write in ${params.language}
- 6 pages, each 2-4 short sentences
- Include 4 vocabulary words appropriate for ${params.age} year olds
- Vocabulary should come from the story naturally
- Make it wholesome, imaginative, and perfect for reading aloud

IMPORTANT: Respond with ONLY valid JSON, no markdown, no code blocks:
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
    {"word": "...", "pronunciation": "...", "definition": "child-friendly definition", "icon": "emoji"},
    {"word": "...", "pronunciation": "...", "definition": "child-friendly definition", "icon": "emoji"},
    {"word": "...", "pronunciation": "...", "definition": "child-friendly definition", "icon": "emoji"},
    {"word": "...", "pronunciation": "...", "definition": "child-friendly definition", "icon": "emoji"}
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
// C2PA CONTENT CREDENTIALS
// ============================================

/**
 * Sign an image with C2PA Content Credentials
 * This adds provenance metadata indicating the image is AI-generated
 */
export async function signImageWithC2PA(
  imageDataUrl: string,
  pageNumber?: number
): Promise<string> {
  try {
    // Extract base64 and mimeType from data URL
    const matches = imageDataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) {
      console.warn('[C2PA] Invalid data URL format, skipping signing');
      return imageDataUrl;
    }

    const [, mimeType, imageBase64] = matches;

    // Call the signing API
    const response = await fetch('/api/sign-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageBase64,
        mimeType,
        pageNumber,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[C2PA] Signing failed:', errorData);
      return imageDataUrl; // Return unsigned image on failure
    }

    const data = await response.json();
    if (data.success && data.signedImageBase64) {
      console.log(`[C2PA] Image signed successfully (page ${pageNumber || 'unknown'})`);
      return `data:${data.mimeType};base64,${data.signedImageBase64}`;
    }

    return imageDataUrl;
  } catch (error) {
    console.error('[C2PA] Error signing image:', error);
    return imageDataUrl; // Return unsigned image on error
  }
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
  totalPages: number;
  enableC2PA?: boolean; // Enable Content Credentials signing
}

/**
 * Extract the key action/scene from story text for illustration
 */
function extractSceneAction(storyText: string, pageNumber: number, totalPages: number): string {
  // Add context based on typical story structure
  if (pageNumber === 1) {
    return `INTRODUCTION SCENE - Show the main character in their home/starting location. ${storyText}`;
  } else if (pageNumber === totalPages) {
    return `ENDING SCENE - Happy, peaceful conclusion. ${storyText}`;
  } else {
    return `ADVENTURE SCENE - ${storyText}`;
  }
}

/**
 * Generate an illustration for a story page using gemini-2.5-flash-image
 * Uses the same SDK and model that works in Google AI Studio
 */
export async function generateStoryImage(params: ImageGenerationParams): Promise<string> {
  // Add small delay to be nice to the API
  await delay(1000);

  const sceneDescription = extractSceneAction(params.storyText, params.pageNumber, params.totalPages);

  // Build prompt similar to your working code
  const imagePrompt = `Create a ${IMAGE_STYLE.style} children's book illustration.

Subject: A toy named "${params.toyName}" which is ${params.toyDescription}.

Scene: ${sceneDescription}

CRITICAL VISUAL CONSTRAINTS:
- The toy "${params.toyName}" must be the main focus of the image
- Style: ${IMAGE_STYLE.mood}, ${IMAGE_STYLE.lighting}
- Quality: ${IMAGE_STYLE.quality}
- Do NOT include: ${IMAGE_STYLE.negative}

The illustration should be magical, warm, and perfect for a children's storybook.`;

  console.log(`[Image Gen] Page ${params.pageNumber} - Using gemini-2.5-flash-image`);
  console.log(`[Image Gen] Prompt preview:`, imagePrompt.substring(0, 150) + '...');

  try {
    // Use the same pattern as your working Google AI Studio code
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [
        {
          parts: [
            {
              text: imagePrompt,
            },
          ],
        },
      ],
    });

    console.log(`[Image Gen] Page ${params.pageNumber} - Response received`);

    // Extract image from response
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.mimeType?.startsWith('image/')) {
          const imageData = part.inlineData.data;
          const mimeType = part.inlineData.mimeType;
          console.log(`[Image Gen] Page ${params.pageNumber} - Success! Got ${mimeType} image`);

          let imageUrl = `data:${mimeType};base64,${imageData}`;

          // Sign with C2PA Content Credentials if enabled
          if (params.enableC2PA) {
            console.log(`[Image Gen] Page ${params.pageNumber} - Signing with C2PA...`);
            imageUrl = await signImageWithC2PA(imageUrl, params.pageNumber);
          }

          return imageUrl;
        }
      }
    }

    console.error(`[Image Gen] Page ${params.pageNumber} - No image in response`);
    throw new Error('No image in response');
  } catch (error: any) {
    console.error(`[Image Gen] Page ${params.pageNumber} failed:`, error?.message || error);
    throw error;
  }
}

/**
 * Reset model index (not needed anymore but kept for compatibility)
 */
export function resetImageModelIndex(): void {
  // No-op - using single model now
}

/**
 * Generate all images for a story
 * Each image will feature the same toy character in different scenes
 * @param enableC2PA - Enable Content Credentials signing for AI transparency
 */
export async function generateAllStoryImages(
  pages: GeneratedStoryPage[],
  toyDescription: string,
  toyName: string,
  onProgress?: (current: number, total: number) => void,
  enableC2PA: boolean = true // Enable C2PA by default
): Promise<string[]> {
  const images: string[] = [];
  const totalPages = pages.length;

  console.log('Starting image generation for', totalPages, 'pages');
  console.log('Toy character description:', toyDescription);
  console.log('C2PA Content Credentials:', enableC2PA ? 'ENABLED' : 'DISABLED');

  for (let i = 0; i < pages.length; i++) {
    onProgress?.(i + 1, totalPages);
    console.log(`Generating image ${i + 1}/${totalPages}: "${pages[i].text.substring(0, 50)}..."`);

    try {
      const imageUrl = await generateStoryImage({
        storyText: pages[i].text,
        toyDescription,
        toyName,
        pageNumber: i + 1,
        totalPages,
        enableC2PA,
      });
      images.push(imageUrl);
      console.log(`✓ Image ${i + 1} generated${enableC2PA ? ' and signed with C2PA' : ''}`);
    } catch (error) {
      console.error(`✗ Failed to generate image for page ${i + 1}:`, error);
      // Use empty string - will fall back to default image
      images.push('');
    }
  }

  return images;
}
