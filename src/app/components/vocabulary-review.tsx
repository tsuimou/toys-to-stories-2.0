import { motion } from "motion/react";
import { Star, Volume2, Download, RotateCcw } from "lucide-react";
import { useMemo } from "react";
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
  onDownloadPdf: () => void;
  onStartOver: () => void;
  onBack: () => void;
}

export function VocabularyReview({ vocabularyWords, onDownloadPdf, onStartOver, onBack }: VocabularyReviewProps) {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-12">
          {vocabularyWords.map((vocab, index) => (
            <motion.div
              key={vocab.word}
              className="bg-white rounded-3xl p-4 sm:p-6 md:p-8"
              style={{ 
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
              }}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div 
                  className="rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ 
                    width: '60px', 
                    height: '60px',
                    fontSize: '32px'
                  }}
                >
                  {vocab.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 
                      className="text-3xl"
                      style={{ 
                        fontFamily: 'Fredoka, sans-serif',
                        color: '#2C3E50'
                      }}
                    >
                      {vocab.word}
                    </h3>

                    <button
                      className="rounded-full p-2 transition-all hover:scale-110 flex-shrink-0"
                      style={{ backgroundColor: '#FF9A5620' }}
                      onClick={() => alert(`Playing pronunciation for "${vocab.word}"`)}
                    >
                      <Volume2 size={20} style={{ color: '#FF9A56' }} />
                    </button>
                  </div>

                  <p 
                    className="text-lg mb-2 italic"
                    style={{ color: '#9B7EDE', opacity: 0.8 }}
                  >
                    {vocab.pronunciation}
                  </p>

                  <p 
                    className="text-lg leading-relaxed"
                    style={{ color: '#2C3E50', opacity: 0.8 }}
                  >
                    {vocab.definition}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
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