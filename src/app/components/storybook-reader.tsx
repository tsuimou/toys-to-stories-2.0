import { useState, useEffect, useMemo, useRef, forwardRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import HTMLFlipBook from "react-pageflip";
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

// Individual page component - must use forwardRef for react-pageflip
const Page = forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  pageNumber?: number;
  isImagePage?: boolean;
}>(({ children, pageNumber, isImagePage }, ref) => {
  return (
    <div
      ref={ref}
      className="page"
      style={{
        backgroundColor: isImagePage ? '#2a2a40' : '#FFF8E7',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: '8px',
      }}
    >
      {children}
    </div>
  );
});

Page.displayName = 'Page';

export function StorybookReader({ pages, onClose, onComplete }: StorybookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedVocab, setSelectedVocab] = useState<VocabWord | null>(null);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const flipBookRef = useRef<any>(null);

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
  }, []);

  // Close vocab popup when page changes
  useEffect(() => {
    setSelectedVocab(null);
  }, [currentPage]);

  const handleNextPage = () => {
    // If on last page, go to vocabulary review
    if (currentPage >= pages.length - 1) {
      onComplete();
      return;
    }

    const pageFlip = flipBookRef.current?.pageFlip();
    if (pageFlip) {
      pageFlip.flipNext();
    }
  };

  const handlePrevPage = () => {
    const pageFlip = flipBookRef.current?.pageFlip();
    if (pageFlip) {
      pageFlip.flipPrev();
    }
  };

  const onFlip = (e: any) => {
    const newPage = Math.floor(e.data / 2);
    setCurrentPage(newPage);

    // Check if we've reached the last page
    if (e.data >= pages.length * 2 - 1) {
      // Small delay before triggering complete
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  };

  const renderTextWithVocab = (text: string, vocabWords: VocabWord[]) => {
    let result = text;
    const parts: JSX.Element[] = [];
    let lastIndex = 0;

    vocabWords.forEach((vocab, idx) => {
      const index = result.toLowerCase().indexOf(vocab.word.toLowerCase(), lastIndex);
      if (index !== -1) {
        if (index > lastIndex) {
          parts.push(<span key={`text-${idx}`}>{result.substring(lastIndex, index)}</span>);
        }

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
            onClick={(e) => {
              e.stopPropagation();
              setSelectedVocab(vocab);
            }}
          >
            {result.substring(index, index + vocab.word.length)}
          </span>
        );

        lastIndex = index + vocab.word.length;
      }
    });

    if (lastIndex < result.length) {
      parts.push(<span key="text-end">{result.substring(lastIndex)}</span>);
    }

    return parts;
  };

  // Create pages array for flipbook - each story page becomes 2 flipbook pages (image + text)
  // Enforce max 1 vocab word per page, max 4 total across the story
  const flipbookPages = useMemo(() => {
    const result: React.ReactNode[] = [];
    let totalVocabUsed = 0;

    pages.forEach((page, index) => {
      // Limit vocab: max 1 per page, max 4 total
      const remaining = Math.max(0, 4 - totalVocabUsed);
      const limitedVocab = page.vocabWords.slice(0, Math.min(1, remaining));
      totalVocabUsed += limitedVocab.length;

      // Left page - Image
      result.push(
        <Page key={`image-${index}`} pageNumber={index * 2} isImagePage>
          <div className="w-full h-full p-4">
            <img
              src={page.imageUrl}
              alt={`Page ${index + 1} illustration`}
              className="w-full h-full object-cover"
              style={{ borderRadius: '12px' }}
            />
          </div>
        </Page>
      );

      // Right page - Text
      result.push(
        <Page key={`text-${index}`} pageNumber={index * 2 + 1}>
          <div
            className="w-full h-full p-6 sm:p-8 flex flex-col justify-center"
            style={{ backgroundColor: '#FFF8E7' }}
          >
            <p
              className="leading-relaxed"
              style={{
                fontSize: 'clamp(16px, 2vw, 22px)',
                lineHeight: '1.8',
                color: colors.textPrimary,
                fontFamily: 'Fredoka, sans-serif',
                fontWeight: 600
              }}
            >
              {renderTextWithVocab(page.text, limitedVocab)}
            </p>

            {/* Page number */}
            <div
              className="absolute bottom-4 right-6"
              style={{
                fontFamily: 'Fredoka, sans-serif',
                color: colors.textPrimary,
                opacity: 0.5,
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              {index + 1}
            </div>
          </div>
        </Page>
      );
    });

    return result;
  }, [pages]);

  const totalFlipPages = pages.length * 2;
  const displayPage = Math.floor(currentPage) + 1;

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

      {/* Top Bar */}
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

      {/* Flipbook Container */}
      <div
        className="relative z-10 flex items-center justify-center book-scale-container"
        style={{
          marginTop: '70px',
          marginBottom: '80px',
        }}
      >
        {/* Book wrapper with 3D red hardcover styling */}
        <div
          className="book-cover"
          style={{
            padding: '20px',
            background: `linear-gradient(135deg, #C42B2B 0%, #DC3545 50%, #A82222 100%)`,
            borderRadius: '8px',
            boxShadow: `
              0 0 0 4px #4A0D0D,
              4px 4px 0 0 #3D0A0A,
              8px 8px 0 0 #2E0808,
              12px 12px 0 0 #1F0505,
              12px 16px 20px rgba(0,0,0,0.5),
              0 20px 40px rgba(0,0,0,0.3),
              inset 0 2px 4px rgba(255,255,255,0.2),
              inset 0 -2px 4px rgba(0,0,0,0.2)
            `,
          }}
        >
          {/* @ts-ignore - react-pageflip types are incomplete */}
          <HTMLFlipBook
            ref={flipBookRef}
            width={400}
            height={500}
            size="fixed"
            minWidth={400}
            maxWidth={400}
            minHeight={500}
            maxHeight={500}
            maxShadowOpacity={0.5}
            showCover={false}
            mobileScrollSupport={true}
            onFlip={onFlip}
            className="storybook-flipbook"
            style={{}}
            startPage={0}
            drawShadow={true}
            flippingTime={800}
            usePortrait={false}
            startZIndex={0}
            autoSize={false}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={true}
          >
            {flipbookPages}
          </HTMLFlipBook>
        </div>
      </div>

      {/* Navigation */}
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

        {/* Page Counter */}
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
          Page {displayPage} of {pages.length}
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
            className="fixed rounded-3xl p-8 shadow-lg"
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
              <X size={18} style={{ color: '#B02D38', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />
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
              <Volume2 size={24} style={{ color: '#A89200', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))' }} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close Confirmation Popup */}
      <AnimatePresence>
        {showCloseConfirmation && (
          <>
            <motion.div
              className="fixed inset-0 bg-black"
              style={{ zIndex: 60 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCloseConfirmation(false)}
            />

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

      {/* Custom styles for flipbook */}
      <style>{`
        .storybook-flipbook {
          box-shadow:
            inset 2px 0 8px rgba(0,0,0,0.1),
            inset -2px 0 8px rgba(0,0,0,0.1);
          border-radius: 4px;
        }
        .storybook-flipbook .page {
          background-color: #FFF8E7;
          box-shadow: inset 0 0 30px rgba(0,0,0,0.03);
        }
        .storybook-flipbook .page-wrapper {
          perspective: 2000px;
        }
        /* Scale the book container responsively */
        .book-scale-container {
          transform: scale(0.6);
          transform-origin: center center;
        }
        @media (min-width: 640px) {
          .book-scale-container {
            transform: scale(0.75);
          }
        }
        @media (min-width: 768px) {
          .book-scale-container {
            transform: scale(0.9);
          }
        }
        @media (min-width: 1024px) {
          .book-scale-container {
            transform: scale(1);
          }
        }
        @media (min-width: 1280px) {
          .book-scale-container {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
