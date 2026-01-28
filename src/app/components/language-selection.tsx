import { motion } from "motion/react";
import { StepIndicator } from "@/app/components/step-indicator";
import { BackButton } from "@/app/components/back-button";
import { colors, withOpacity } from "@/utils/colors";

interface LanguageSelectionProps {
  onSelectLanguage: (language: string) => void;
  onBack: () => void;
}

const languages = [
  { name: "Spanish", letter: "Ñ", color: colors.languageSpanish },
  { name: "French", letter: "É", color: colors.languageFrench },
  { name: "German", letter: "Ü", color: colors.languageGerman },
  { name: "Japanese", letter: "あ", color: colors.languageJapanese },
  { name: "Korean", letter: "한", color: colors.languageKorean },
  { name: "Hindi", letter: "अ", color: colors.languageHindi },
  { name: "Mandarin (Simplified)", letter: "中", color: colors.languageMandarinSimp },
  { name: "Mandarin (Traditional)", letter: "中", color: colors.languageMandarinTrad },
];

export function LanguageSelection({ onSelectLanguage, onBack }: LanguageSelectionProps) {
  return (
    <div className="h-screen p-4 sm:p-6 md:p-10 relative overflow-y-auto" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Back Button - Fixed position relative to viewport */}
      <BackButton onClick={onBack} />

      <div className="w-full max-w-4xl mx-auto relative z-10" style={{ paddingTop: '1rem' }}>
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl mb-3" 
            style={{ 
              fontFamily: 'Fredoka, sans-serif',
              color: colors.textPrimary,
              fontWeight: 700
            }}
          >
            Choose Your Language
          </h1>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={1} />

        {/* Language Grid - Wooden Block Style */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 mt-6 sm:mt-8 md:mt-12 mx-auto pb-4" style={{ maxWidth: '750px' }}>
          {languages.map((language, index) => {
            // Classic wooden toy block colors
            const toyBlockColors = [
              { face: '#C41E3A', dark: '#8B1528' },  // Red
              { face: '#1565C0', dark: '#0D4A8C' },  // Blue
              { face: '#2E7D32', dark: '#1B5E20' },  // Green
              { face: '#F9A825', dark: '#C17900' },  // Yellow
              { face: '#C41E3A', dark: '#8B1528' },  // Red
              { face: '#2E7D32', dark: '#1B5E20' },  // Green
              { face: '#1565C0', dark: '#0D4A8C' },  // Blue
              { face: '#F9A825', dark: '#C17900' },  // Yellow
            ];
            const blockColor = toyBlockColors[index % toyBlockColors.length];

            // Wood texture colors - light end grain wood
            const woodLight = '#F5E6D3';  // Very light beige
            const woodMid = '#E8D4B8';    // Light yellow-brown
            const woodDark = '#D4C0A0';   // Medium beige
            const ringDark = '#B8956E';   // Darker brown for growth rings

            return (
              <motion.button
                key={language.name}
                onClick={() => onSelectLanguage(language.name)}
                className="cursor-pointer"
                style={{
                  // Simple diagonal wood grain texture
                  background: `
                    /* Diagonal parallel wood grain lines */
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
                    /* Base light wood color */
                    ${woodLight}
                  `,
                  borderRadius: '8px',
                  // 3D wooden block with colored border
                  boxShadow: `
                    inset 0 0 0 6px ${blockColor.face},
                    inset 0 0 0 9px ${woodMid},
                    inset 3px 3px 6px rgba(255,255,255,0.3),
                    inset -2px -2px 4px rgba(0,0,0,0.1),
                    0 0 0 3px ${blockColor.dark},
                    4px 4px 0 ${blockColor.dark},
                    5px 5px 0 #8B7355,
                    6px 6px 15px rgba(0,0,0,0.4)
                  `,
                  border: 'none',
                  // Square shape
                  width: '140px',
                  minHeight: '140px',
                  height: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  padding: '8px',
                }}
                whileHover={{
                  scale: 1.08,
                  y: -4,
                  boxShadow: `
                    inset 0 0 0 6px ${blockColor.face},
                    inset 0 0 0 9px ${woodMid},
                    inset 3px 3px 6px rgba(255,255,255,0.4),
                    inset -2px -2px 4px rgba(0,0,0,0.1),
                    0 0 0 3px ${blockColor.dark},
                    6px 8px 0 ${blockColor.dark},
                    7px 9px 0 #8B7355,
                    8px 12px 20px rgba(0,0,0,0.45)
                  `,
                }}
                whileTap={{
                  scale: 0.95,
                  y: 2,
                  boxShadow: `
                    inset 0 0 0 6px ${blockColor.face},
                    inset 0 0 0 9px ${woodMid},
                    inset 2px 2px 4px rgba(255,255,255,0.2),
                    inset -2px -2px 4px rgba(0,0,0,0.15),
                    0 0 0 3px ${blockColor.dark},
                    2px 2px 0 ${blockColor.dark},
                    2px 2px 8px rgba(0,0,0,0.35)
                  `,
                }}
                initial={{ opacity: 0, y: 20, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: index * 0.06, type: "spring", stiffness: 200 }}
              >
                {/* Letter Display - Colored inset like carved/painted letter */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '65px',
                    height: '65px',
                    fontSize: '40px',
                    fontFamily: 'Fredoka, sans-serif',
                    background: `linear-gradient(145deg, ${blockColor.face} 0%, ${blockColor.dark} 100%)`,
                    color: '#FFFFFF',
                    fontWeight: 800,
                    textShadow: `
                      1px 1px 0 ${blockColor.dark},
                      2px 2px 3px rgba(0,0,0,0.3)
                    `,
                    borderRadius: '6px',
                    // Inset carved effect
                    boxShadow: `
                      inset 2px 2px 4px rgba(255,255,255,0.25),
                      inset -2px -2px 4px rgba(0,0,0,0.2),
                      0 2px 4px rgba(0,0,0,0.2)
                    `,
                    border: `2px solid ${blockColor.dark}`,
                  }}
                >
                  {language.letter}
                </div>

                {/* Language Name - Carved into wood */}
                <span
                  style={{
                    fontFamily: 'Fredoka, sans-serif',
                    color: '#5D4037',
                    fontWeight: 700,
                    fontSize: '16px',
                    textShadow: '0.5px 0.5px 0 rgba(255,255,255,0.5)',
                    letterSpacing: '0.5px',
                    whiteSpace: 'normal',
                    textAlign: 'center',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    lineHeight: '1',
                    padding: '0 4px',
                  }}
                >
                  {language.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}