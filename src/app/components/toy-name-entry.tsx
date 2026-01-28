import React, { useState } from "react";
import { motion } from "motion/react";
import { StepIndicator } from "@/app/components/step-indicator";
import { BackButton } from "@/app/components/back-button";
import { colors, withOpacity, opacity } from "@/utils/colors";

interface ToyNameEntryProps {
  onContinue: (toyName: string) => void;
  onBack: () => void;
}

export function ToyNameEntry({ onContinue, onBack }: ToyNameEntryProps) {
  const [toyName, setToyName] = useState("");

  const handleContinue = () => {
    if (toyName.trim()) {
      onContinue(toyName.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && toyName.trim()) {
      handleContinue();
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10 relative" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Back Button - Fixed position relative to viewport */}
      <BackButton onClick={onBack} />

      <div className="w-full max-w-2xl mx-auto relative z-10" style={{ paddingTop: '1rem' }}>
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
            What's your toy's name?
          </h1>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={3} currentSubStep={2} />

        {/* Input Card */}
        <motion.div 
          className="rounded-3xl p-6 sm:p-8 md:p-12 mt-6 sm:mt-8 md:mt-12"
          style={{ 
            backgroundColor: '#FFF8E7',
            boxShadow: `
              inset 0 0 0 8px #2E7D32,
              inset 0 0 0 12px #FFF8E7,
              0 0 0 6px #2E7D32, 
              0 8px 0 #2E7D32, 
              0 10px 30px rgba(0,0,0,0.3)
            `,
            borderRadius: '24px'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label 
            htmlFor="toy-name"
            className="block text-2xl mb-6"
            style={{ 
              fontFamily: 'Fredoka, sans-serif',
              color: colors.textPrimary,
              fontWeight: 700
            }}
          >
            Toy Name
          </label>
          
          <input
            id="toy-name"
            type="text"
            value={toyName}
            onChange={(e) => setToyName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter toy name..."
            maxLength={30}
            className="w-full rounded-2xl px-6 py-5 text-xl outline-none transition-all duration-200 placeholder:text-gray-400"
            style={{
              fontFamily: 'Nunito, sans-serif',
              color: colors.textPrimary,
              backgroundColor: colors.white,
              border: `3px solid #2E7D32`,
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
            }}
            onFocus={(e) => {
              e.target.style.border = `3px solid ${colors.skyBlue}`;
              e.target.style.boxShadow = `0 0 0 3px ${withOpacity(colors.skyBlue, 0.2)}, inset 0 2px 4px rgba(0,0,0,0.1)`;
            }}
            onBlur={(e) => {
              e.target.style.border = `3px solid #2E7D32`;
              e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.1)';
            }}
            autoFocus
          />

          <div className="flex justify-between items-center mt-4">
            <p 
              className="text-sm"
              style={{ 
                color: colors.textPrimary, 
                opacity: 0.6,
                fontFamily: 'Fredoka, sans-serif',
                fontWeight: 600
              }}
            >
              Press Enter to continue
            </p>
            <p 
              className="text-sm"
              style={{ 
                color: colors.textPrimary, 
                opacity: 0.6,
                fontFamily: 'Fredoka, sans-serif',
                fontWeight: 600
              }}
            >
              {toyName.length}/30
            </p>
          </div>
        </motion.div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center" style={{ padding: '2rem 0' }}>
        <motion.button
          onClick={handleContinue}
          disabled={!toyName.trim()}
          className="rounded-full px-16 py-5 transition-all duration-200"
          style={{ 
            background: toyName.trim() 
              ? `linear-gradient(180deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)` 
              : withOpacity(colors.mediumGray, 0.3),
            color: toyName.trim() ? colors.white : withOpacity(colors.textPrimary, opacity.subtle),
            fontSize: '20px',
            fontFamily: 'Fredoka, sans-serif',
            fontWeight: 700,
            cursor: toyName.trim() ? 'pointer' : 'not-allowed',
            boxShadow: toyName.trim() 
              ? `0 0 0 5px ${colors.primaryDark}, 0 6px 0 ${colors.primaryDark}, 0 8px 20px rgba(0,0,0,0.3)` 
              : 'none',
            border: 'none',
            textShadow: toyName.trim() 
              ? `2px 2px 0 ${colors.primaryDark}, -1px -1px 0 ${colors.primaryDark}, 1px -1px 0 ${colors.primaryDark}, -1px 1px 0 ${colors.primaryDark}` 
              : 'none'
          }}
          whileHover={toyName.trim() ? { 
            scale: 1.05, 
            boxShadow: `0 0 0 5px ${colors.primaryDark}, 0 8px 0 ${colors.primaryDark}, 0 10px 25px rgba(0,0,0,0.35)` 
          } : {}}
          whileTap={toyName.trim() ? { 
            scale: 0.95,
            boxShadow: `0 0 0 5px ${colors.primaryDark}, 0 2px 0 ${colors.primaryDark}, 0 4px 10px rgba(0,0,0,0.3)`,
            translateY: 4
          } : {}}
        >
          Next
        </motion.button>
      </div>
    </div>
  );
}