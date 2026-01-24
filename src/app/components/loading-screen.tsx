import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { colors } from "@/utils/colors";
import { analyzeToyImage, generateStory, generateAllStoryImages, isApiConfigured, GeneratedStory } from "@/services/gemini";
import { StoryPage, VocabWord } from "@/app/data/story-translations";

// Default image URLs for generated stories
const defaultImageUrls = [
  "https://images.unsplash.com/photo-1753928578920-c3e936415a21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWRkeSUyMGJlYXIlMjB0b3l8ZW58MXx8fHwxNzY5MTc3MDYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1573689705959-7786e029b31e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdpY2FsJTIwZm9yZXN0fGVufDF8fHx8MTc2OTE2MjMxMnww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1485783522162-1dbb8ffcbe5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGJsb2NrcyUyMHRveXN8ZW58MXx8fHwxNzY5MjE3MDMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1718138990279-97c54c2dd00e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWluYm93JTIwc2t5fGVufDF8fHx8MTc2OTIxNzAzNHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1607948471407-3af873dda505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3klMjBkaW5vc2F1cnxlbnwxfHx8fDE3NjkyMTcwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1753928578920-c3e936415a21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWRkeSUyMGJlYXIlMjB0b3l8ZW58MXx8fHwxNzY5MTc3MDYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
];

interface LoadingScreenProps {
  toyPhoto: string;
  toyName: string;
  energy: number;
  confidence: number;
  age: string;
  language: string;
  onStoryGenerated: (story: { pages: StoryPage[]; vocabulary: VocabWord[] }) => void;
  onError: (error: string) => void;
}

type LoadingStage = "analyzing" | "generating" | "illustrating" | "finalizing" | "error";

export function LoadingScreen({
  toyPhoto,
  toyName,
  energy,
  confidence,
  age,
  language,
  onStoryGenerated,
  onError,
}: LoadingScreenProps) {
  const [stage, setStage] = useState<LoadingStage>("analyzing");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isRetrying, setIsRetrying] = useState(false);

  const [imageProgress, setImageProgress] = useState({ current: 0, total: 6 });

  const stageMessages: Record<LoadingStage, { title: string; subtitle: string }> = {
    analyzing: { title: "Analyzing your toy...", subtitle: "Looking at your special friend" },
    generating: { title: "Creating your story...", subtitle: "Weaving a magical tale" },
    illustrating: { title: "Drawing illustrations...", subtitle: `Creating image ${imageProgress.current} of ${imageProgress.total}` },
    finalizing: { title: "Almost ready!", subtitle: "Adding the finishing touches" },
    error: { title: "Oops!", subtitle: errorMessage || "Something went wrong" },
  };

  const generateStoryContent = async () => {
    try {
      setStage("analyzing");
      setProgress(10);

      // Check if API is configured
      if (!isApiConfigured()) {
        console.warn("API not configured, using fallback story");
        // Simulate some loading time then use fallback
        await new Promise(resolve => setTimeout(resolve, 2000));
        onError("API not configured - using example story");
        return;
      }

      // Step 1: Analyze the toy image
      let toyDescription = "";
      try {
        toyDescription = await analyzeToyImage(toyPhoto);
        setProgress(40);
      } catch (e) {
        console.warn("Image analysis failed, using generic description:", e);
        toyDescription = "a beloved stuffed toy";
        setProgress(40);
      }

      setStage("generating");
      setProgress(50);

      // Step 2: Generate the story
      const generatedStory: GeneratedStory = await generateStory({
        toyDescription,
        toyName,
        energy,
        confidence,
        age,
        language,
      });

      setProgress(50);
      setStage("illustrating");

      // Step 3: Generate images for each page
      let generatedImages: string[] = [];
      try {
        generatedImages = await generateAllStoryImages(
          generatedStory.pages,
          toyDescription,
          toyName,
          (current, total) => {
            setImageProgress({ current, total });
            setProgress(50 + Math.round((current / total) * 40));
          }
        );
      } catch (imgError) {
        console.warn("Image generation failed, using default images:", imgError);
        generatedImages = [];
      }

      setProgress(95);
      setStage("finalizing");

      // Step 4: Transform to expected format with images
      const storyWithImages: StoryPage[] = generatedStory.pages.map((page, index) => ({
        pageNumber: page.pageNumber,
        text: page.text,
        imageUrl: generatedImages[index] || defaultImageUrls[index % defaultImageUrls.length],
        vocabWords: index < 2
          ? generatedStory.vocabulary.slice(index * 2, (index + 1) * 2).map(v => ({
              word: v.word,
              pronunciation: v.pronunciation,
              definition: v.definition,
            }))
          : [],
      }));

      const vocabularyWithIcons: VocabWord[] = generatedStory.vocabulary.map(v => ({
        word: v.word,
        pronunciation: v.pronunciation,
        definition: v.definition,
        icon: v.icon,
      }));

      setProgress(100);

      // Brief pause to show completion
      await new Promise(resolve => setTimeout(resolve, 500));

      onStoryGenerated({
        pages: storyWithImages,
        vocabulary: vocabularyWithIcons,
      });
    } catch (e) {
      console.error("Story generation failed:", e);
      setStage("error");
      setErrorMessage(e instanceof Error ? e.message : "Failed to generate story");
    }
  };

  useEffect(() => {
    generateStoryContent();
  }, []);

  const handleRetry = async () => {
    setIsRetrying(true);
    setStage("analyzing");
    setProgress(0);
    setErrorMessage("");
    await generateStoryContent();
    setIsRetrying(false);
  };

  const handleUseFallback = () => {
    onError("Using example story");
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-10 relative overflow-hidden"
      style={{
        fontFamily: 'Nunito, sans-serif',
        backgroundColor: '#1a1a2e'
      }}
    >
      {/* Animated stars appearing */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            fontSize: i % 3 === 0 ? '24px' : i % 3 === 1 ? '16px' : '12px',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0.7, 1],
            scale: [0, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          {i % 2 === 0 ? '\u2b50' : '\u2728'}
        </motion.div>
      ))}

      {/* Moon appearing */}
      <motion.div
        className="absolute"
        style={{
          fontSize: '80px',
          right: '10%',
          top: '15%',
        }}
        initial={{ opacity: 0, scale: 0, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        {'\ud83c\udf19'}
      </motion.div>

      <div className="text-center relative z-10">
        {/* Main content container with toy block styling */}
        <motion.div
          className="rounded-3xl p-12 sm:p-16"
          style={{
            maxWidth: '600px',
            width: 'min(600px, calc(100vw - 2rem))',
            backgroundColor: '#FFF8E7',
            borderRadius: '32px',
            boxShadow: stage === "error"
              ? `
                inset 0 0 0 8px ${colors.vibrantRed},
                inset 0 0 0 12px #FFF8E7,
                0 0 0 6px #B02D38,
                0 8px 0 #B02D38,
                0 10px 30px rgba(0,0,0,0.5)
              `
              : `
                inset 0 0 0 8px ${colors.royalBlue},
                inset 0 0 0 12px #FFF8E7,
                0 0 0 6px #1E4A8F,
                0 8px 0 #1E4A8F,
                0 10px 30px rgba(0,0,0,0.5)
              `
          }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {stage === "error" ? (
            <>
              {/* Error Icon */}
              <div className="mb-8 flex justify-center">
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: '100px',
                    height: '100px',
                    background: '#FFF8E7',
                    border: `5px solid ${colors.vibrantRed}`,
                  }}
                >
                  <AlertCircle size={50} style={{ color: colors.vibrantRed }} />
                </div>
              </div>

              {/* Error Text */}
              <h1
                className="mb-3"
                style={{
                  fontFamily: 'Fredoka, sans-serif',
                  fontWeight: 700,
                  color: colors.vibrantRed,
                  fontSize: 'clamp(28px, 5vw, 36px)'
                }}
              >
                {stageMessages.error.title}
              </h1>

              <p
                className="mb-8"
                style={{
                  color: '#A0ADB9',
                  fontFamily: 'Fredoka, sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(14px, 2.5vw, 18px)'
                }}
              >
                {stageMessages.error.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className="rounded-full py-4 px-8 transition-all flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(180deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
                    color: colors.white,
                    fontSize: '18px',
                    fontFamily: 'Fredoka, sans-serif',
                    fontWeight: 700,
                    boxShadow: `0 0 0 4px ${colors.primaryDark}, 0 5px 0 ${colors.primaryDark}, 0 7px 15px rgba(0,0,0,0.3)`,
                    border: 'none',
                    cursor: isRetrying ? 'not-allowed' : 'pointer',
                    opacity: isRetrying ? 0.7 : 1,
                  }}
                  whileHover={isRetrying ? {} : { scale: 1.05 }}
                  whileTap={isRetrying ? {} : { scale: 0.95 }}
                >
                  <RefreshCw size={20} className={isRetrying ? 'animate-spin' : ''} />
                  Try Again
                </motion.button>

                <motion.button
                  onClick={handleUseFallback}
                  className="rounded-full py-4 px-8 transition-all"
                  style={{
                    background: '#EFEFEF',
                    color: colors.textPrimary,
                    fontSize: '18px',
                    fontFamily: 'Fredoka, sans-serif',
                    fontWeight: 700,
                    boxShadow: '0 0 0 4px #A0A0A0, 0 5px 0 #A0A0A0, 0 7px 15px rgba(0,0,0,0.3)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Use Example Story
                </motion.button>
              </div>
            </>
          ) : (
            <>
              {/* Animated Icon */}
              <motion.div
                className="mb-8 flex justify-center"
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center relative"
                  style={{
                    width: '100px',
                    height: '100px',
                    background: '#FFF8E7',
                    border: '5px solid #B8941E',
                    boxShadow: 'none'
                  }}
                >
                  <Sparkles size={50} style={{ color: '#E8DCC8', filter: 'none' }} />
                </div>
              </motion.div>

              {/* Text */}
              <motion.h1
                className="mb-3"
                style={{
                  fontFamily: 'Fredoka, sans-serif',
                  fontWeight: 700,
                  color: '#7A8A99',
                  fontSize: 'clamp(28px, 5vw, 36px)'
                }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {stageMessages[stage].title}
              </motion.h1>

              <motion.p
                className="mb-8"
                style={{
                  color: '#A0ADB9',
                  fontFamily: 'Fredoka, sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(16px, 3vw, 20px)'
                }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              >
                {stageMessages[stage].subtitle}
              </motion.p>

              {/* Progress Bar with toy block styling */}
              <div
                className="rounded-full overflow-hidden mx-auto"
                style={{
                  width: 'min(380px, calc(100% - 2rem))',
                  height: '16px',
                  backgroundColor: '#E8DCC8',
                  boxShadow: `
                    inset 0 2px 4px rgba(0,0,0,0.15)
                  `,
                  borderRadius: '12px'
                }}
              >
                <motion.div
                  className="h-full"
                  style={{
                    background: progress > 0 ? colors.primary : '#D1C4B0',
                    borderRadius: '12px',
                  }}
                  animate={{
                    width: progress > 0 ? `${progress}%` : ['30%', '70%', '30%']
                  }}
                  transition={progress > 0 ? {
                    duration: 0.5,
                    ease: "easeOut"
                  } : {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Progress percentage */}
              {progress > 0 && (
                <motion.p
                  className="mt-4"
                  style={{
                    color: '#A0ADB9',
                    fontFamily: 'Fredoka, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {Math.round(progress)}%
                </motion.p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
