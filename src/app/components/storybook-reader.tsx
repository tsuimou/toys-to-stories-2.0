import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Volume2, Download, X } from "lucide-react";
import { colors } from "@/utils/colors";

interface VocabWord {
  word: string;
  pronunciation: string;
  definition: string;
}

interface StoryPage {
  pageNumber: number;
  text: string;
  imageUrl: string;
  vocabWords: VocabWord[];
}

interface StorybookReaderProps {
  pages: StoryPage[];
  onClose: () => void;
  onComplete: () => void;
}

export function StorybookReader({ pages, onClose, onComplete }: StorybookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedVocab, setSelectedVocab] = useState<VocabWord | null>(null);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);

  // Generate consistent star positions that don't change between pages
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
  }, []); // Empty dependency array means this only runs once

  // Close vocab popup when page changes
  useEffect(() => {
    setSelectedVocab(null);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderTextWithVocab = (text: string, vocabWords: VocabWord[]) => {
    let result = text;
    const parts: JSX.Element[] = [];
    let lastIndex = 0;

    vocabWords.forEach((vocab, idx) => {
      const index = result.toLowerCase().indexOf(vocab.word.toLowerCase(), lastIndex);
      if (index !== -1) {
        // Add text before vocab word
        if (index > lastIndex) {
          parts.push(<span key={`text-${idx}`}>{result.substring(lastIndex, index)}</span>);
        }
        
        // Add vocab word as clickable with toy block styling
        parts.push(
          <span
            key={`vocab-${idx}`}
            className="rounded-lg cursor-pointer transition-all hover:scale-105"
            style={{ 
              backgroundColor: colors.skyBlue,
              padding: '4px 10px',
              display: 'inline-block',
              margin: '0 2px',
              boxShadow: `
                0 0 0 2px ${colors.primaryDark},
                0 3px 0 ${colors.primaryDark},
                0 4px 8px rgba(0,0,0,0.2)
              `,
              color: colors.white,
              fontWeight: 700,
              textShadow: `1px 1px 0 ${colors.primaryDark}`
            }}
            onClick={() => setSelectedVocab(vocab)}
          >
            {result.substring(index, index + vocab.word.length)}
          </span>
        );
        
        lastIndex = index + vocab.word.length;
      }
    });

    // Add remaining text
    if (lastIndex < result.length) {
      parts.push(<span key="text-end">{result.substring(lastIndex)}</span>);
    }

    return parts;
  };

  const currentPageData = pages[currentPage];

  return (
    <div 
      className="h-screen p-4 sm:p-6 md:p-10 relative overflow-hidden flex items-center justify-center" 
      style={{ 
        fontFamily: 'Nunito, sans-serif',
        backgroundColor: '#1a1a2e'
      }}
    >
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

      {/* Crescent moon */}
      <motion.div
        className="absolute"
        style={{
          fontSize: '60px',
          right: '8%',
          top: '10%',
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🌙
      </motion.div>

      {/* Top Bar - Fixed at top */}
      <div className="fixed top-4 sm:top-6 left-0 right-0 flex justify-between items-center w-full px-4 sm:px-6 md:px-10 z-20 max-w-7xl mx-auto">
        <motion.button
          className="rounded-2xl p-3 sm:p-4 transition-all flex items-center justify-center"
          style={{ 
            background: `linear-gradient(180deg, ${colors.yellow} 0%, #E8C700 100%)`,
            boxShadow: `
              0 0 0 4px #C4A200,
              0 5px 0 #C4A200,
              0 7px 15px rgba(0,0,0,0.3)
            `,
            border: 'none'
          }}
          onClick={() => alert('Narration would play here!')}
          aria-label="Play narration"
          whileHover={{ 
            scale: 1.05,
            boxShadow: `
              0 0 0 4px #C4A200,
              0 7px 0 #C4A200,
              0 9px 18px rgba(0,0,0,0.35)
            `
          }}
          whileTap={{ 
            scale: 0.95,
            boxShadow: `
              0 0 0 4px #C4A200,
              0 2px 0 #C4A200,
              0 4px 10px rgba(0,0,0,0.3)
            `,
            translateY: 3
          }}
        >
          <Volume2 size={24} style={{ color: colors.textPrimary, filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))' }} />
        </motion.button>

        <div className="flex gap-3 sm:gap-4">
          <motion.button
            className="rounded-2xl p-3 sm:p-4 transition-all flex items-center justify-center"
            style={{ 
              background: `linear-gradient(180deg, #A78BFA 0%, #8B5CF6 100%)`,
              boxShadow: `
                0 0 0 4px #7C3AED,
                0 5px 0 #7C3AED,
                0 7px 15px rgba(0,0,0,0.3)
              `,
              border: 'none'
            }}
            onClick={() => alert('PDF download would start here!')}
            whileHover={{ 
              scale: 1.05,
              boxShadow: `
                0 0 0 4px #7C3AED,
                0 7px 0 #7C3AED,
                0 9px 18px rgba(0,0,0,0.35)
              `
            }}
            whileTap={{ 
              scale: 0.95,
              boxShadow: `
                0 0 0 4px #7C3AED,
                0 2px 0 #7C3AED,
                0 4px 10px rgba(0,0,0,0.3)
              `,
              translateY: 3
            }}
          >
            <Download size={24} style={{ color: colors.white, filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))' }} />
          </motion.button>
          <motion.button
            className="rounded-2xl p-3 sm:p-4 transition-all flex items-center justify-center"
            style={{ 
              background: `linear-gradient(180deg, #FF6B6B 0%, #EE5A52 100%)`,
              boxShadow: `
                0 0 0 4px #DC2626,
                0 5px 0 #DC2626,
                0 7px 15px rgba(0,0,0,0.3)
              `,
              border: 'none'
            }}
            onClick={() => setShowCloseConfirmation(true)}
            whileHover={{ 
              scale: 1.05,
              boxShadow: `
                0 0 0 4px #DC2626,
                0 7px 0 #DC2626,
                0 9px 18px rgba(0,0,0,0.35)
              `
            }}
            whileTap={{ 
              scale: 0.95,
              boxShadow: `
                0 0 0 4px #DC2626,
                0 2px 0 #DC2626,
                0 4px 10px rgba(0,0,0,0.3)
              `,
              translateY: 3
            }}
          >
            <X size={24} style={{ color: colors.white, filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))' }} />
          </motion.button>
        </div>
      </div>

      {/* Main content container - centered with proper spacing */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 z-10" style={{ 
        marginTop: '80px',
        marginBottom: '80px',
        maxWidth: '1200px'
      }}>
        {/* Book Pages - Responsive */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className="overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0 mx-auto relative"
            style={{ 
              backgroundColor: '#FFF8E7',
              borderRadius: '32px',
              boxShadow: `
                inset 0 0 0 10px ${colors.sunnyYellow},
                inset 0 0 0 14px #FFF8E7,
                0 0 0 6px #D4B800, 
                0 10px 0 #D4B800, 
                0 12px 40px rgba(0,0,0,0.4)
              `,
              width: '100%',
              height: 'clamp(500px, 60vh, 700px)',
              transformStyle: 'preserve-3d',
              perspective: '2000px'
            }}
            initial={{ 
              opacity: 0, 
              rotateY: -90,
              transformOrigin: 'center center'
            }}
            animate={{ 
              opacity: 1, 
              rotateY: 0,
              transformOrigin: 'center center'
            }}
            exit={{ 
              opacity: 0, 
              rotateY: 90,
              transformOrigin: 'center center'
            }}
            transition={{ 
              duration: 0.8,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            {/* Left Side - Illustration */}
            <div 
              className="relative overflow-hidden order-2 lg:order-1"
              style={{ 
                backgroundColor: '#2a2a40',
                minHeight: '400px',
                borderRadius: '24px',
                margin: '16px'
              }}
            >
              <img 
                src={currentPageData.imageUrl}
                alt={`Page ${currentPage + 1} illustration`}
                className="w-full h-full object-cover"
                style={{ borderRadius: '24px' }}
              />
            </div>

            {/* Right Side - Text */}
            <div className="p-8 sm:p-10 md:p-12 flex flex-col justify-between order-1 lg:order-2" style={{ backgroundColor: '#FFF8E7' }}>
              <div>
                <p 
                  className="leading-relaxed"
                  style={{ 
                    fontSize: 'clamp(18px, 2.2vw, 26px)',
                    lineHeight: '1.8',
                    color: colors.textPrimary,
                    fontFamily: 'Fredoka, sans-serif',
                    fontWeight: 600
                  }}
                >
                  {renderTextWithVocab(currentPageData.text, currentPageData.vocabWords)}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Fixed at bottom */}
      <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 flex justify-between items-center w-full px-4 sm:px-6 md:px-10 z-20 max-w-7xl mx-auto">
        <motion.button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className="rounded-2xl p-3 sm:p-4 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
          style={{ 
            background: currentPage === 0 
              ? '#9CA3AF' 
              : `linear-gradient(180deg, ${colors.royalBlue} 0%, #2563C7 100%)`,
            color: colors.white,
            boxShadow: currentPage === 0
              ? 'none'
              : `
                0 0 0 4px #1E4A8F,
                0 5px 0 #1E4A8F,
                0 7px 15px rgba(0,0,0,0.3)
              `,
            border: 'none',
            cursor: currentPage === 0 ? 'not-allowed' : 'pointer'
          }}
          whileHover={currentPage === 0 ? {} : { 
            scale: 1.05,
            boxShadow: `
              0 0 0 4px #1E4A8F,
              0 7px 0 #1E4A8F,
              0 9px 18px rgba(0,0,0,0.35)
            `
          }}
          whileTap={currentPage === 0 ? {} : { 
            scale: 0.95,
            boxShadow: `
              0 0 0 4px #1E4A8F,
              0 2px 0 #1E4A8F,
              0 4px 10px rgba(0,0,0,0.3)
            `,
            translateY: 3
          }}
        >
          <ChevronLeft size={32} style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))' }} />
        </motion.button>

        {/* Page Counter - Between navigation arrows */}
        <div 
          className="rounded-2xl px-6 py-3" 
          style={{ 
            backgroundColor: '#FFF8E7',
            color: colors.textPrimary,
            fontFamily: 'Fredoka, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(16px, 2vw, 20px)',
            boxShadow: `
              0 0 0 4px ${colors.yellow},
              0 5px 0 #D4B800,
              0 7px 15px rgba(0,0,0,0.3)
            `,
            border: 'none'
          }}
        >
          Page {currentPage + 1} of {pages.length}
        </div>

        <motion.button
          onClick={handleNextPage}
          className="rounded-2xl p-3 sm:p-4 transition-all flex items-center justify-center"
          style={{ 
            background: `linear-gradient(180deg, ${colors.royalBlue} 0%, #2563C7 100%)`,
            color: colors.white,
            boxShadow: `
              0 0 0 4px #1E4A8F,
              0 5px 0 #1E4A8F,
              0 7px 15px rgba(0,0,0,0.3)
            `,
            border: 'none'
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: `
              0 0 0 4px #1E4A8F,
              0 7px 0 #1E4A8F,
              0 9px 18px rgba(0,0,0,0.35)
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
          <ChevronRight size={32} style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))' }} />
        </motion.button>
      </div>

      {/* Vocabulary Popup */}
      <AnimatePresence>
        {selectedVocab && (
          <motion.div
            className="absolute rounded-3xl p-8 shadow-lg"
            style={{ 
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '90vw',
              width: '400px',
              backgroundColor: '#FFF8E7',
              borderRadius: '28px',
              boxShadow: `
                inset 0 0 0 6px #4CAF50,
                inset 0 0 0 10px #FFF8E7,
                0 0 0 4px #2E7D32, 
                0 6px 0 #2E7D32, 
                0 8px 25px rgba(0,0,0,0.4)
              `,
              zIndex: 50
            }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={() => setSelectedVocab(null)}
              className="absolute rounded-xl flex items-center justify-center"
              style={{ 
                top: '12px',
                right: '12px',
                width: '36px',
                height: '36px',
                background: `linear-gradient(180deg, #FF5757 0%, ${colors.vibrantRed} 50%, #C41E3A 100%)`,
                color: colors.white,
                boxShadow: `
                  0 0 0 2px #B02D38,
                  0 3px 0 #B02D38,
                  0 4px 10px rgba(0,0,0,0.3)
                `,
                border: 'none',
                cursor: 'pointer'
              }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: `
                  0 0 0 2px #B02D38,
                  0 4px 0 #B02D38,
                  0 5px 12px rgba(0,0,0,0.35)
                `
              }}
              whileTap={{ 
                scale: 0.95,
                boxShadow: `
                  0 0 0 2px #B02D38,
                  0 1px 0 #B02D38,
                  0 2px 6px rgba(0,0,0,0.3)
                `,
                translateY: 2
              }}
            >
              <X size={18} style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />
            </motion.button>

            <h3 
              className="text-3xl mb-3"
              style={{ 
                fontFamily: 'Fredoka, sans-serif',
                color: colors.textPrimary,
                fontWeight: 700
              }}
            >
              {selectedVocab.word}
            </h3>
            
            <p 
              className="text-lg mb-4 italic"
              style={{ 
                color: '#9B7EDE',
                fontFamily: 'Fredoka, sans-serif',
                fontWeight: 600
              }}
            >
              {selectedVocab.pronunciation}
            </p>
            
            <p 
              className="text-base mb-6"
              style={{ 
                color: colors.textPrimary, 
                lineHeight: '1.6',
                fontFamily: 'Fredoka, sans-serif',
                fontWeight: 600
              }}
            >
              {selectedVocab.definition}
            </p>

            <motion.button
              className="rounded-2xl p-3 transition-all flex items-center justify-center"
              style={{ 
                background: `linear-gradient(180deg, ${colors.sunnyYellow} 0%, #D4B800 100%)`,
                boxShadow: `
                  0 0 0 3px #A89200,
                  0 4px 0 #A89200,
                  0 6px 15px rgba(0,0,0,0.3)
                `,
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => alert('Pronunciation would play here!')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `
                  0 0 0 3px #A89200,
                  0 5px 0 #A89200,
                  0 7px 18px rgba(0,0,0,0.35)
                `
              }}
              whileTap={{ 
                scale: 0.95,
                boxShadow: `
                  0 0 0 3px #A89200,
                  0 2px 0 #A89200,
                  0 4px 10px rgba(0,0,0,0.3)
                `,
                translateY: 2
              }}
            >
              <Volume2 size={24} style={{ color: colors.white, filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))' }} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close Confirmation Popup */}
      <AnimatePresence>
        {showCloseConfirmation && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black"
              style={{ zIndex: 60 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCloseConfirmation(false)}
            />
            
            {/* Confirmation Modal */}
            <div 
              className="fixed"
              style={{ 
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 70
              }}
            >
              <motion.div
                className="rounded-3xl p-10 shadow-lg"
                style={{ 
                  maxWidth: '90vw',
                  width: '520px',
                  backgroundColor: '#FFF8E7',
                  borderRadius: '32px',
                  boxShadow: `
                    inset 0 0 0 8px ${colors.vibrantRed},
                    inset 0 0 0 12px #FFF8E7,
                    0 0 0 6px #B02D38, 
                    0 8px 0 #B02D38, 
                    0 10px 35px rgba(0,0,0,0.5)
                  `
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <h3 
                  className="text-4xl mb-5"
                  style={{ 
                    fontFamily: 'Fredoka, sans-serif',
                    color: colors.textPrimary,
                    textAlign: 'center',
                    fontWeight: 700
                  }}
                >
                  Are you sure?
                </h3>
                
                <p 
                  className="text-xl mb-8"
                  style={{ 
                    color: colors.textPrimary, 
                    lineHeight: '1.6',
                    textAlign: 'center',
                    fontFamily: 'Fredoka, sans-serif',
                    fontWeight: 600,
                    opacity: 0.8
                  }}
                >
                  If you close the storybook now, you'll need to re-upload your toy photo to generate a new story.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.button
                    onClick={() => setShowCloseConfirmation(false)}
                    className="rounded-full px-10 py-4 transition-all"
                    style={{ 
                      background: `linear-gradient(180deg, #EFEFEF 0%, #D1D1D1 100%)`,
                      color: colors.textPrimary,
                      fontSize: '20px',
                      fontFamily: 'Fredoka, sans-serif',
                      fontWeight: 700,
                      boxShadow: `
                        0 0 0 4px #A0A0A0,
                        0 5px 0 #A0A0A0,
                        0 7px 15px rgba(0,0,0,0.3)
                      `,
                      border: 'none',
                      minWidth: '160px',
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
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    onClick={() => {
                      setShowCloseConfirmation(false);
                      onClose();
                    }}
                    className="rounded-full px-10 py-4 transition-all"
                    style={{ 
                      background: '#E63946',
                      color: colors.white,
                      fontSize: '20px',
                      fontFamily: 'Fredoka, sans-serif',
                      fontWeight: 700,
                      boxShadow: `
                        0 0 0 4px #B02D38,
                        0 5px 0 #B02D38,
                        0 7px 15px rgba(0,0,0,0.3)
                      `,
                      border: 'none',
                      minWidth: '160px',
                      cursor: 'pointer',
                      textShadow: `1px 1px 2px rgba(0,0,0,0.3)`
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `
                        0 0 0 4px #B02D38,
                        0 6px 0 #B02D38,
                        0 8px 18px rgba(0,0,0,0.35)
                      `
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      boxShadow: `
                        0 0 0 4px #B02D38,
                        0 2px 0 #B02D38,
                        0 4px 10px rgba(0,0,0,0.3)
                      `,
                      translateY: 3
                    }}
                  >
                    Yes, Close
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}