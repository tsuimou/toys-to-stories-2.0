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
    <div className="h-screen p-10 relative overflow-hidden" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Floating decorative circles - Headspace style */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '250px',
          height: '250px',
          background: withOpacity(colors.skyBlue, 0.15),
          top: '15%',
          right: '10%',
          filter: 'blur(40px)'
        }}
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '180px',
          height: '180px',
          background: withOpacity(colors.yellow, 0.1),
          bottom: '20%',
          left: '8%',
          filter: 'blur(35px)'
        }}
        animate={{
          y: [0, -25, 0]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Back Button - Fixed position relative to viewport */}
      <BackButton onClick={onBack} />

      <div className="w-full max-w-4xl mx-auto relative z-10" style={{ paddingTop: '2.5rem' }}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 
            className="text-5xl mb-3" 
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

        {/* Language Grid - Responsive: 3-3-2 on smaller screens, 4x2 on larger screens */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 mx-auto" style={{ maxWidth: '900px' }}>
          {languages.map((language, index) => {
            // Classic toy block colors matching the reference image pattern
            const toyBlockColors = [
              '#2E7D32',  // Green (A)
              '#F9A825',  // Yellow (B)
              '#C41E3A',  // Red (C)
              '#1565C0',  // Blue (D)
              '#C41E3A',  // Red (G)
              '#1565C0',  // Blue (H)
              '#2E7D32',  // Green (I)
              '#F9A825',  // Yellow (J)
            ];
            const borderColor = toyBlockColors[index % toyBlockColors.length];
            const creamBg = '#FFF8E7'; // Cream/beige background like toy blocks
            
            return (
              <motion.button
                key={language.name}
                onClick={() => onSelectLanguage(language.name)}
                className="cursor-pointer transition-all duration-200"
                style={{ 
                  background: creamBg,
                  borderRadius: '12px', // Slightly rounded corners like real blocks
                  boxShadow: `
                    inset 0 0 0 8px ${borderColor},
                    inset 0 0 0 12px ${creamBg},
                    0 0 0 5px ${borderColor}, 
                    0 6px 0 ${borderColor}, 
                    0 8px 20px rgba(0,0,0,0.3)
                  `,
                  border: 'none',
                  width: 'calc(25% - 18px)', // 4 columns on larger screens with gap
                  minWidth: '160px',
                  padding: '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `
                    inset 0 0 0 8px ${borderColor},
                    inset 0 0 0 12px ${creamBg},
                    0 0 0 5px ${borderColor}, 
                    0 8px 0 ${borderColor}, 
                    0 10px 25px rgba(0,0,0,0.35)
                  `
                }}
                whileTap={{ 
                  scale: 0.95,
                  boxShadow: `
                    inset 0 0 0 8px ${borderColor},
                    inset 0 0 0 12px ${creamBg},
                    0 0 0 5px ${borderColor}, 
                    0 2px 0 ${borderColor}, 
                    0 4px 12px rgba(0,0,0,0.3)
                  `,
                  translateY: 4
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Letter Display - Colored square with white letter */}
                <div 
                  className="flex items-center justify-center"
                  style={{ 
                    width: '80px', 
                    height: '80px',
                    fontSize: '48px',
                    fontFamily: 'Fredoka, sans-serif',
                    backgroundColor: borderColor,
                    color: '#FFFFFF',
                    fontWeight: 800,
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    letterSpacing: '-2px',
                    borderRadius: '4px'
                  }}
                >
                  {language.letter}
                </div>
                
                {/* Language Name */}
                <span 
                  className="text-lg"
                  style={{ 
                    fontFamily: 'Fredoka, sans-serif',
                    color: colors.textPrimary,
                    fontWeight: 700
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