import React, { useState } from "react";
import { motion } from "motion/react";
import { StepIndicator } from "@/app/components/step-indicator";
import { BackButton } from "@/app/components/back-button";
import { colors, withOpacity } from "@/utils/colors";

interface PersonalitySliderProps {
  onContinue: (energy: number, confidence: number) => void;
  onBack: () => void;
  toyName: string;
}

export function PersonalitySlider({ onContinue, onBack, toyName }: PersonalitySliderProps) {
  const [energy, setEnergy] = useState(50);
  const [confidence, setConfidence] = useState(50);

  const getEnergyLabel = (value: number) => {
    if (value < 33) return "Calm";
    if (value < 67) return "Playful";
    return "Energetic";
  };

  const getConfidenceLabel = (value: number) => {
    if (value < 33) return "Shy";
    if (value < 67) return "Curious";
    return "Brave";
  };

  // Get pill color based on slider value
  const getEnergyColor = (value: number) => {
    if (value < 33) return colors.energyCalm; // Light orange
    if (value < 67) return colors.energyPlayful; // Medium orange
    return colors.energyEnergetic; // Bright orange
  };

  const getConfidenceColor = (value: number) => {
    if (value < 33) return colors.confidenceShy; // Light blue
    if (value < 67) return colors.confidenceCurious; // Medium blue
    return colors.confidenceBrave; // Dark blue
  };

  const handleNext = () => {
    onContinue(energy, confidence);
  };

  return (
    <div className="h-screen p-10 relative overflow-hidden" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Floating decorative circles */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '180px',
          height: '180px',
          background: withOpacity(colors.lavender, 0.15),
          bottom: '20%',
          right: '12%',
          filter: 'blur(40px)'
        }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Back Button */}
      <BackButton onClick={onBack} />

      <div className="w-full max-w-2xl mx-auto relative z-10" style={{ paddingTop: '2.5rem' }}>
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
            {toyName}'s Personality
          </h1>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={3} currentSubStep={3} />

        {/* Personality Card */}
        <motion.div 
          className="rounded-3xl p-12 mt-12"
          style={{ 
            backgroundColor: '#FFF8E7',
            borderRadius: '32px',
            boxShadow: `
              inset 0 0 0 8px #4CAF50,
              inset 0 0 0 12px #FFF8E7,
              0 0 0 6px #2E7D32, 
              0 8px 0 #2E7D32, 
              0 10px 30px rgba(0,0,0,0.3)
            `
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Energy Level Slider */}
          <div className="mb-16">
            <h3 
              className="text-2xl mb-8" 
              style={{ 
                fontFamily: 'Fredoka, sans-serif',
                color: colors.textPrimary,
                fontWeight: 600
              }}
            >
              Energy Level
            </h3>

            {/* Gradient slider track */}
            <div className="mb-4">
              <style>
                {`
                  .energy-slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    border: 3px solid ${getEnergyColor(energy)};
                    transition: border-color 0.3s ease;
                  }
                  .energy-slider::-moz-range-thumb {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    border: 3px solid ${getEnergyColor(energy)};
                    transition: border-color 0.3s ease;
                  }
                `}
              </style>
              <input
                type="range"
                min="0"
                max="100"
                value={energy}
                onChange={(e) => setEnergy(Number(e.target.value))}
                className="energy-slider w-full h-3 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${colors.energyCalm} 0%, ${colors.energyPlayful} 50%, ${colors.energyEnergetic} 100%)`,
                  outline: 'none',
                }}
              />
            </div>
            
            <div className="flex justify-between text-lg" style={{ color: colors.textPrimary, fontFamily: 'Fredoka, sans-serif', fontWeight: 600 }}>
              <span>Calm</span>
              <span>Playful</span>
              <span>Energetic</span>
            </div>
          </div>

          {/* Confidence Slider */}
          <div>
            <h3 
              className="text-2xl mb-8" 
              style={{ 
                fontFamily: 'Fredoka, sans-serif',
                color: colors.textPrimary,
                fontWeight: 600
              }}
            >
              Confidence
            </h3>

            {/* Gradient slider track */}
            <div className="mb-4">
              <style>
                {`
                  .confidence-slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    border: 3px solid ${getConfidenceColor(confidence)};
                    transition: border-color 0.3s ease;
                  }
                  .confidence-slider::-moz-range-thumb {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    border: 3px solid ${getConfidenceColor(confidence)};
                    transition: border-color 0.3s ease;
                  }
                `}
              </style>
              <input
                type="range"
                min="0"
                max="100"
                value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="confidence-slider w-full h-3 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${colors.confidenceShy} 0%, ${colors.confidenceCurious} 50%, ${colors.confidenceBrave} 100%)`,
                  outline: 'none',
                }}
              />
            </div>
            
            <div className="flex justify-between text-lg" style={{ color: colors.textPrimary, fontFamily: 'Fredoka, sans-serif', fontWeight: 600 }}>
              <span>Shy</span>
              <span>Curious</span>
              <span>Brave</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Continue Button - Fixed at bottom */}
      <div className="absolute flex justify-center" style={{ bottom: '2.5rem', left: '2.5rem', right: '2.5rem' }}>
        <div className="relative">
          {/* Magical sparkle particles floating around button */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: i % 2 === 0 ? '8px' : '6px',
                height: i % 2 === 0 ? '8px' : '6px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 210, 63, 0.8) 100%)',
                boxShadow: '0 0 8px rgba(255, 210, 63, 0.8)',
                left: `${-20 + Math.cos((i * Math.PI * 2) / 6) * 140}px`,
                top: `${20 + Math.sin((i * Math.PI * 2) / 6) * 30}px`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}

          {/* Glowing aura behind button */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${withOpacity(colors.primary, 0.4)} 0%, transparent 70%)`,
              filter: 'blur(20px)',
              transform: 'scale(1.2)',
            }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1.2, 1.3, 1.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main Button with shimmer effect */}
          <motion.button
            onClick={handleNext}
            className="relative overflow-hidden rounded-full px-16 py-5 cursor-pointer transition-all duration-200"
            style={{ 
              background: `linear-gradient(180deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
              color: colors.white,
              fontSize: '20px',
              fontFamily: 'Fredoka, sans-serif',
              fontWeight: 700,
              boxShadow: `0 0 0 5px ${colors.primaryDark}, 0 6px 0 ${colors.primaryDark}, 0 8px 20px rgba(0,0,0,0.3)`,
              border: 'none',
              textShadow: `2px 2px 0 ${colors.primaryDark}, -1px -1px 0 ${colors.primaryDark}, 1px -1px 0 ${colors.primaryDark}, -1px 1px 0 ${colors.primaryDark}`
            }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: `0 0 0 5px ${colors.primaryDark}, 0 8px 0 ${colors.primaryDark}, 0 10px 25px rgba(0,0,0,0.35)`
            }}
            whileTap={{ 
              scale: 0.95,
              boxShadow: `0 0 0 5px ${colors.primaryDark}, 0 2px 0 ${colors.primaryDark}, 0 4px 10px rgba(0,0,0,0.3)`,
              translateY: 4
            }}
          >
            {/* Shimmer overlay effect */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                borderRadius: '9999px',
              }}
              animate={{
                backgroundPosition: ['-200% 0%', '200% 0%'],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Button text with subtle glow */}
            <span className="relative z-10">
              ✨ Generate Story ✨
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}