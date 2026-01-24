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
    <div className="h-screen p-10 relative overflow-hidden" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Floating decorative circles */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '200px',
          height: '200px',
          background: withOpacity(colors.red, 0.12),
          top: '20%',
          right: '15%',
          filter: 'blur(40px)'
        }}
        animate={{
          y: [0, 25, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Back Button - Fixed position relative to viewport */}
      <BackButton onClick={onBack} />

      <div className="w-full max-w-2xl mx-auto relative z-10" style={{ paddingTop: '2.5rem' }}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 
            className="text-5xl"
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
        <div className="flex flex-col gap-6 items-center mt-12">
          <motion.button
            onClick={() => onSelectAge("2-3")}
            className="cursor-pointer transition-all duration-200"
            style={{ 
              background: '#FFF8E7', // Cream/beige background like toy blocks
              borderRadius: '12px',
              boxShadow: `
                inset 0 0 0 8px #C41E3A,
                inset 0 0 0 12px #FFF8E7,
                0 0 0 5px #C41E3A, 
                0 6px 0 #C41E3A, 
                0 8px 20px rgba(0,0,0,0.3)
              `,
              width: '420px',
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
                inset 0 0 0 12px #FFF8E7,
                0 0 0 5px #C41E3A, 
                0 8px 0 #C41E3A, 
                0 10px 25px rgba(0,0,0,0.35)
              `
            }}
            whileTap={{ 
              scale: 0.97,
              boxShadow: `
                inset 0 0 0 8px #C41E3A,
                inset 0 0 0 12px #FFF8E7,
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
              background: '#FFF8E7', // Cream/beige background like toy blocks
              borderRadius: '12px',
              boxShadow: `
                inset 0 0 0 8px #1565C0,
                inset 0 0 0 12px #FFF8E7,
                0 0 0 5px #1565C0, 
                0 6px 0 #1565C0, 
                0 8px 20px rgba(0,0,0,0.3)
              `,
              width: '420px',
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
                inset 0 0 0 12px #FFF8E7,
                0 0 0 5px #1565C0, 
                0 8px 0 #1565C0, 
                0 10px 25px rgba(0,0,0,0.35)
              `
            }}
            whileTap={{ 
              scale: 0.97,
              boxShadow: `
                inset 0 0 0 8px #1565C0,
                inset 0 0 0 12px #FFF8E7,
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
        </div>
      </div>
    </div>
  );
}