import { motion } from "motion/react";
import { Star, Volume2, Download, RotateCcw } from "lucide-react";
import { useMemo, useState, useEffect, useRef } from "react";
import { colors, withOpacity } from "@/utils/colors";
import { BackButton } from "@/app/components/back-button";

interface VocabWord {
  word: string;
  pronunciation: string;
  definition: string;
  icon: string;
}

interface VocabularyReviewProps {
  vocabularyWords: VocabWord[];
  language: string;
  onDownloadPdf: () => void;
  onStartOver: () => void;
  onBack: () => void;
}

// Map app language names to Web Speech API language codes
const languageCodeMap: Record<string, string> = {
  'Spanish': 'es-ES',
  'French': 'fr-FR',
  'German': 'de-DE',
  'Japanese': 'ja-JP',
  'Korean': 'ko-KR',
  'Hindi': 'hi-IN',
  'Mandarin (Simplified)': 'zh-CN',
  'Mandarin (Traditional)': 'zh-TW',
  'Chinese (Simplified)': 'zh-CN',
  'Chinese (Traditional)': 'zh-TW',
};

export function VocabularyReview({ vocabularyWords, language, onDownloadPdf, onStartOver, onBack }: VocabularyReviewProps) {
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.onended = () => {
      setSpeakingWord(null);
    };
    audioRef.current.onerror = () => {
      setSpeakingWord(null);
      setIsLoadingAudio(false);
    };

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Ensure voices are loaded
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // Get the best available voice for a language
  const getBestVoice = (langCode: string): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return null;

    const matchingVoices = voices.filter(voice =>
      voice.lang.startsWith(langCode.split('-')[0]) || voice.lang === langCode
    );

    if (matchingVoices.length === 0) return null;

    const sortedVoices = matchingVoices.sort((a, b) => {
      const premiumKeywords = ['premium', 'enhanced', 'neural', 'wavenet', 'natural'];
      const aIsPremium = premiumKeywords.some(kw => a.name.toLowerCase().includes(kw));
      const bIsPremium = premiumKeywords.some(kw => b.name.toLowerCase().includes(kw));

      if (aIsPremium && !bIsPremium) return -1;
      if (!aIsPremium && bIsPremium) return 1;
      if (a.localService && !b.localService) return -1;
      if (!a.localService && b.localService) return 1;
      if (a.lang === langCode && b.lang !== langCode) return -1;
      if (a.lang !== langCode && b.lang === langCode) return 1;

      return 0;
    });

    return sortedVoices[0];
  };

  // Browser TTS fallback
  const speakWithBrowserTTS = (word: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const wordToSpeak = word.split(' (')[0].trim();
    const utterance = new SpeechSynthesisUtterance(wordToSpeak);
    const langCode = languageCodeMap[language] || 'en-US';
    utterance.lang = langCode;
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const bestVoice = getBestVoice(langCode);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utterance.onstart = () => setSpeakingWord(word);
    utterance.onend = () => setSpeakingWord(null);
    utterance.onerror = () => setSpeakingWord(null);

    window.speechSynthesis.speak(utterance);
  };

  // ElevenLabs TTS with fallback
  const speakWord = async (word: string) => {
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    window.speechSynthesis.cancel();

    // Set to false to enable ElevenLabs TTS
    const USE_BROWSER_TTS_ONLY = false;
    if (USE_BROWSER_TTS_ONLY) {
      speakWithBrowserTTS(word);
      return;
    }

    setIsLoadingAudio(true);
    setSpeakingWord(word);

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: word, language }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ fallback: true }));
        if (errorData.fallback) {
          setIsLoadingAudio(false);
          speakWithBrowserTTS(word);
          return;
        }
        throw new Error(errorData.error || 'TTS request failed');
      }

      const contentType = response.headers.get('Content-Type');
      if (!contentType?.includes('audio')) {
        setIsLoadingAudio(false);
        speakWithBrowserTTS(word);
        return;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        setIsLoadingAudio(false);
        await audioRef.current.play();
      }

      audioRef.current?.addEventListener('ended', () => {
        URL.revokeObjectURL(audioUrl);
      }, { once: true });

    } catch (error) {
      console.error('ElevenLabs TTS error:', error);
      setIsLoadingAudio(false);
      speakWithBrowserTTS(word);
    }
  };

  // Generate consistent star positions that don't change
  const stars = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: i % 3 === 0 ? '16px' : i % 3 === 1 ? '12px' : '8px',
      emoji: i % 2 === 0 ? '⭐' : '✨',
      duration: 12 + Math.random() * 8,
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <div 
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-y-auto" 
      style={{ 
        fontFamily: 'Nunito, sans-serif',
        backgroundColor: '#1a1a2e'
      }}
    >
      {/* Back Button */}
      <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 100 }}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{ 
            color: colors.white,
            top: '2.5rem', 
            left: '2.5rem',
            minHeight: '60px',
            minWidth: '60px',
            paddingLeft: '18px',
            paddingRight: '18px',
            paddingTop: '18px',
            paddingBottom: '18px',
            cursor: 'pointer',
            background: 'transparent',
            border: 'none',
            position: 'absolute'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span className="text-lg" style={{ fontFamily: 'Fredoka, sans-serif' }}>Back</span>
        </button>
      </div>

      {/* Night sky with twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            fontSize: star.size,
            left: `${star.left}%`,
            top: `${star.top}%`,
          }}
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        >
          {star.emoji}
        </motion.div>
      ))}

      <div className="w-full max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star size={40} style={{ color: '#6DD5A7' }} fill="#6DD5A7" />
            <h1
              className="text-3xl sm:text-4xl md:text-5xl"
              style={{ 
                fontFamily: 'Fredoka, sans-serif',
                color: colors.white,
                fontWeight: 700
              }}
            >
              Words You Learned!
            </h1>
            <Star size={40} style={{ color: '#6DD5A7' }} fill="#6DD5A7" />
          </div>
        </div>

        {/* Vocabulary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7 mb-6 sm:mb-8 md:mb-12">
          {(() => {
            // Wood texture colors - light end grain wood
            const woodLight = '#F5E6D3';

            // Alternating border colors for cards
            const borderColors = ['#C41E3A', '#1565C0', '#2E7D32', '#F57C00'];

            return vocabularyWords.map((vocab, index) => {
              const borderColor = borderColors[index % borderColors.length];

              return (
                <motion.div
                  key={vocab.word}
                  className="cursor-pointer"
                  style={{
                    background: `
                      repeating-linear-gradient(
                        45deg,
                        transparent 0px,
                        transparent 8px,
                        rgba(184, 149, 110, 0.12) 8px,
                        rgba(184, 149, 110, 0.12) 9px,
                        transparent 9px,
                        transparent 16px,
                        rgba(139, 90, 43, 0.1) 16px,
                        rgba(139, 90, 43, 0.1) 17px,
                        transparent 17px,
                        transparent 24px,
                        rgba(184, 149, 110, 0.08) 24px,
                        rgba(184, 149, 110, 0.08) 25px,
                        transparent 25px,
                        transparent 32px
                      ),
                      ${woodLight}
                    `,
                    borderRadius: '12px',
                    boxShadow: `
                      inset 0 0 0 6px ${borderColor},
                      inset 0 0 0 10px ${woodLight},
                      0 0 0 4px ${borderColor},
                      0 5px 0 ${borderColor},
                      0 7px 18px rgba(0,0,0,0.35)
                    `,
                    padding: '24px',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: `
                      inset 0 0 0 6px ${borderColor},
                      inset 0 0 0 10px ${woodLight},
                      0 0 0 4px ${borderColor},
                      0 7px 0 ${borderColor},
                      0 9px 22px rgba(0,0,0,0.4)
                    `
                  }}
                  whileTap={{
                    scale: 0.97,
                    boxShadow: `
                      inset 0 0 0 6px ${borderColor},
                      inset 0 0 0 10px ${woodLight},
                      0 0 0 4px ${borderColor},
                      0 2px 0 ${borderColor},
                      0 4px 10px rgba(0,0,0,0.3)
                    `,
                    translateY: 3
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon Block */}
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: '64px',
                        height: '64px',
                        backgroundColor: borderColor,
                        borderRadius: '6px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        fontSize: '32px'
                      }}
                    >
                      {vocab.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3
                          className="text-2xl sm:text-3xl truncate"
                          style={{
                            fontFamily: 'Fredoka, sans-serif',
                            color: colors.textPrimary,
                            fontWeight: 700
                          }}
                        >
                          {vocab.word}
                        </h3>

                        <motion.button
                          className="rounded-lg p-2 flex-shrink-0"
                          style={{
                            backgroundColor: speakingWord === vocab.word ? '#4CAF50' : borderColor,
                            boxShadow: speakingWord === vocab.word
                              ? '0 2px 0 #388E3C, 0 3px 6px rgba(0,0,0,0.2), 0 0 12px rgba(76,175,80,0.5)'
                              : `0 2px 0 ${borderColor}dd, 0 3px 6px rgba(0,0,0,0.2)`,
                            cursor: isLoadingAudio ? 'wait' : 'pointer'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isLoadingAudio) {
                              speakWord(vocab.word);
                            }
                          }}
                          whileHover={isLoadingAudio ? {} : { scale: 1.1 }}
                          whileTap={isLoadingAudio ? {} : { scale: 0.95 }}
                          animate={speakingWord === vocab.word ? {
                            scale: [1, 1.15, 1],
                          } : {}}
                          transition={speakingWord === vocab.word ? {
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "easeInOut"
                          } : {}}
                        >
                          <Volume2 size={18} style={{ color: colors.white }} />
                        </motion.button>
                      </div>

                      <p
                        className="text-base sm:text-lg mb-2 italic"
                        style={{
                          color: '#9B7EDE',
                          fontFamily: 'Fredoka, sans-serif',
                          fontWeight: 500
                        }}
                      >
                        {vocab.pronunciation}
                      </p>

                      <p
                        className="text-base sm:text-lg leading-relaxed"
                        style={{
                          color: colors.textPrimary,
                          fontFamily: 'Fredoka, sans-serif',
                          fontWeight: 500,
                          opacity: 0.85
                        }}
                      >
                        {vocab.definition}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            });
          })()}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pb-4">
          <motion.button
            onClick={onDownloadPdf}
            className="rounded-full px-10 py-4 flex items-center gap-3 transition-all"
            style={{
              background: `linear-gradient(180deg, ${colors.royalBlue} 0%, #2563C7 100%)`,
              color: colors.white,
              fontSize: '20px',
              fontFamily: 'Fredoka, sans-serif',
              fontWeight: 700,
              boxShadow: `
                0 0 0 4px #1E4A8F,
                0 5px 0 #1E4A8F,
                0 7px 15px rgba(0,0,0,0.3)
              `,
              border: 'none',
              minWidth: '220px',
              justifyContent: 'center',
              cursor: 'pointer',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `
                0 0 0 4px #1E4A8F,
                0 6px 0 #1E4A8F,
                0 8px 18px rgba(0,0,0,0.35)
              `
            }}
            whileTap={{
              scale: 0.95,
              boxShadow: `
                0 0 0 4px #1E4A8F,
                0 2px 0 #1E4A8F,
                0 4px 10px rgba(0,0,0,0.3)
              `,
              translateY: 3
            }}
          >
            <Download size={22} style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))' }} />
            Download PDF
          </motion.button>

          <motion.button
            onClick={onStartOver}
            className="rounded-full px-10 py-4 flex items-center gap-3 transition-all"
            style={{
              background: `linear-gradient(180deg, #EFEFEF 0%, #D1D1D1 100%)`,
              color: '#2C3E50',
              fontSize: '20px',
              fontFamily: 'Fredoka, sans-serif',
              fontWeight: 700,
              boxShadow: `
                0 0 0 4px #A0A0A0,
                0 5px 0 #A0A0A0,
                0 7px 15px rgba(0,0,0,0.3)
              `,
              border: 'none',
              minWidth: '220px',
              justifyContent: 'center',
              cursor: 'pointer',
              textShadow: '1px 1px 0 rgba(255,255,255,0.5)'
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `
                0 0 0 4px #A0A0A0,
                0 6px 0 #A0A0A0,
                0 8px 18px rgba(0,0,0,0.35)
              `
            }}
            whileTap={{
              scale: 0.95,
              boxShadow: `
                0 0 0 4px #A0A0A0,
                0 2px 0 #A0A0A0,
                0 4px 10px rgba(0,0,0,0.3)
              `,
              translateY: 3
            }}
          >
            <RotateCcw size={22} style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />
            Start Over
          </motion.button>
        </div>
      </div>
    </div>
  );
}