import { motion } from "motion/react";
import { StepIndicator } from "@/app/components/step-indicator";
import { BackButton } from "@/app/components/back-button";
import { Baby, Users } from "lucide-react";
import { colors, withOpacity } from "@/utils/colors";

interface AgeSelectionProps {
  onSelectAge: (age: string) => void;
  onBack: () => void;
}

export function AgeSelection({ onSelectAge, onBack }: AgeSelectionProps) {
  return (
    <div className="h-screen p-4 sm:p-6 md:p-10 relative overflow-y-auto" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Back Button - Fixed position relative to viewport */}
      <BackButton onClick={onBack} />

      <div className="w-full max-w-2xl mx-auto relative z-10" style={{ paddingTop: '1rem' }}>
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl"
            style={{ 
              fontFamily: 'Fredoka, sans-serif',
              color: colors.textPrimary,
              fontWeight: 700
            }}
          >
            How old is your little one?
          </h1>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={2} />

        {/* Age Buttons */}
        <div className="flex flex-col gap-4 sm:gap-6 items-center mt-6 sm:mt-8 md:mt-12">
          {(() => {
            // Wood texture colors - light end grain wood
            const woodLight = '#F5E6D3';  // Very light beige
            const woodMid = '#E8D4B8';    // Light yellow-brown
            const woodDark = '#D4C0A0';   // Medium beige
            const ringDark = '#B8956E';   // Darker brown for growth rings
            
            return (
              <>
                <motion.button
                  onClick={() => onSelectAge("2-3")}
                  className="cursor-pointer transition-all duration-200"
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
                    borderRadius: '12px',
                    boxShadow: `
                      inset 0 0 0 8px #C41E3A,
                      inset 0 0 0 12px ${woodLight},
                      0 0 0 5px #C41E3A, 
                      0 6px 0 #C41E3A, 
                      0 8px 20px rgba(0,0,0,0.3)
                    `,
                    width: 'min(420px, 100%)',
                    border: 'none',
                    padding: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px'
                  }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: `
                      inset 0 0 0 8px #C41E3A,
                      inset 0 0 0 12px ${woodLight},
                      0 0 0 5px #C41E3A, 
                      0 8px 0 #C41E3A, 
                      0 10px 25px rgba(0,0,0,0.35)
                    `
                  }}
                  whileTap={{ 
                    scale: 0.97,
                    boxShadow: `
                      inset 0 0 0 8px #C41E3A,
                      inset 0 0 0 12px ${woodLight},
                      0 0 0 5px #C41E3A, 
                      0 2px 0 #C41E3A, 
                      0 4px 12px rgba(0,0,0,0.3)
                    `,
                    translateY: 4
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div 
                    className="flex items-center justify-center"
                    style={{ 
                      width: '80px', 
                      height: '80px',
                      backgroundColor: '#C41E3A', // Red block
                      borderRadius: '4px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                    }}
                  >
                    <Baby size={40} style={{ color: colors.white }} />
                  </div>
                  <span 
                    className="text-2xl"
                    style={{ 
                      fontFamily: 'Fredoka, sans-serif',
                      color: colors.textPrimary,
                      fontWeight: 700
                    }}
                  >
                    2-3 years old
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => onSelectAge("4-5")}
                  className="cursor-pointer transition-all duration-200"
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
                    borderRadius: '12px',
                    boxShadow: `
                      inset 0 0 0 8px #1565C0,
                      inset 0 0 0 12px ${woodLight},
                      0 0 0 5px #1565C0, 
                      0 6px 0 #1565C0, 
                      0 8px 20px rgba(0,0,0,0.3)
                    `,
                    width: 'min(420px, 100%)',
                    border: 'none',
                    padding: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px'
                  }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: `
                      inset 0 0 0 8px #1565C0,
                      inset 0 0 0 12px ${woodLight},
                      0 0 0 5px #1565C0, 
                      0 8px 0 #1565C0, 
                      0 10px 25px rgba(0,0,0,0.35)
                    `
                  }}
                  whileTap={{ 
                    scale: 0.97,
                    boxShadow: `
                      inset 0 0 0 8px #1565C0,
                      inset 0 0 0 12px ${woodLight},
                      0 0 0 5px #1565C0, 
                      0 2px 0 #1565C0, 
                      0 4px 12px rgba(0,0,0,0.3)
                    `,
                    translateY: 4
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div 
                    className="flex items-center justify-center"
                    style={{ 
                      width: '80px', 
                      height: '80px',
                      backgroundColor: '#1565C0', // Blue block
                      borderRadius: '4px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                    }}
                  >
                    <Users size={40} style={{ color: colors.white }} />
                  </div>
                  <span 
                    className="text-2xl"
                    style={{ 
                      fontFamily: 'Fredoka, sans-serif',
                      color: colors.textPrimary,
                      fontWeight: 700
                    }}
                  >
                    4-5 years old
                  </span>
                </motion.button>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}