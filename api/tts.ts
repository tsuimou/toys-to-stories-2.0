import type { VercelRequest, VercelResponse } from '@vercel/node';

// ElevenLabs API configuration
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1/text-to-speech';

// Voice IDs for different languages using ElevenLabs Multilingual v2
// These voices support multiple languages with auto-detection
const VOICE_IDS: Record<string, string> = {
  // Rachel - warm, professional female voice (works great with all languages via multilingual v2)
  default: 'EXAVITQu4vr4xnSDxMaL', // Sarah - good for children's content
};

// Model IDs
const MULTILINGUAL_MODEL = 'eleven_multilingual_v2'; // Auto-detects language, supports all 29 languages

interface TTSRequest {
  text: string;
  language: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check for API key
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'ElevenLabs API key not configured',
      fallback: true
    });
  }

  try {
    const { text, language } = req.body as TTSRequest;

    if (!text) {
      return res.status(400).json({ error: 'Missing text parameter' });
    }

    // Strip parenthetical pronunciation hints (e.g., "勇敢 (yǒng gǎn)" → "勇敢")
    const textToSpeak = text.split(' (')[0].trim();

    // Use default voice (multilingual v2 auto-detects language from text)
    const voiceId = VOICE_IDS.default;

    // Call ElevenLabs API
    const response = await fetch(`${ELEVENLABS_API_URL}/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text: textToSpeak,
        model_id: MULTILINGUAL_MODEL,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', response.status, errorText);

      // Return fallback flag for quota exceeded or other errors
      if (response.status === 401) {
        return res.status(401).json({
          error: 'Invalid API key',
          fallback: true
        });
      }
      if (response.status === 429) {
        return res.status(429).json({
          error: 'Rate limit or quota exceeded',
          fallback: true
        });
      }

      return res.status(response.status).json({
        error: 'ElevenLabs API error',
        details: errorText,
        fallback: true
      });
    }

    // Get audio buffer
    const audioBuffer = await response.arrayBuffer();

    // Set appropriate headers for audio streaming
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', audioBuffer.byteLength);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours

    // Send audio data
    return res.send(Buffer.from(audioBuffer));

  } catch (error) {
    console.error('TTS error:', error);
    return res.status(500).json({
      error: 'Failed to generate speech',
      details: error instanceof Error ? error.message : 'Unknown error',
      fallback: true
    });
  }
}
