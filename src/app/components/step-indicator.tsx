import { motion } from "motion/react";
import { Check } from "lucide-react";
import { colors, withOpacity } from "@/utils/colors";

interface StepIndicatorProps {
  currentStep: number; // 1, 2, or 3 (main steps)
  currentSubStep?: number; // 1, 2, or 3 (sub-steps for step 3)
  totalSteps?: number;
}

const stepLabels = [
  "Language",
  "Age",
  "Toy"
];

export function StepIndicator({ 
  currentStep, 
  currentSubStep,
  totalSteps = 3
}: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-6 mb-8">
      {/* Main Steps */}
      <div className="flex items-center justify-center gap-4">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isStep3 = stepNumber === 3;
          
          // Calculate progress for step 3
          const progressPercent = isStep3 && currentSubStep ? (currentSubStep / 3) * 100 : 0;

          return (
            <div key={stepNumber} className="flex items-center gap-4">
              {/* Step Circle */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="relative rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    width: isActive ? '56px' : '48px',
                    height: isActive ? '56px' : '48px',
                  }}
                >
                  {/* Background circle */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: isCompleted || isActive ? colors.primary : colors.white,
                      border: isActive ? `3px solid ${colors.primary}` : `2px solid ${colors.lightGray}`,
                      boxShadow: isActive ? `0 4px 12px ${withOpacity(colors.primary, 0.3)}` : '0 2px 8px rgba(0,0,0,0.05)',
                    }}
                  />
                  
                  {/* Progress ring for step 3 only when active */}
                  {isStep3 && isActive && currentSubStep && (
                    <svg
                      className="absolute inset-0"
                      style={{
                        width: '100%',
                        height: '100%',
                        transform: 'rotate(-90deg)',
                      }}
                    >
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke={colors.yellow}
                        strokeWidth="4"
                        strokeDasharray={`${2 * Math.PI * (isActive ? 25 : 21)}`}
                        strokeDashoffset={`${2 * Math.PI * (isActive ? 25 : 21) * (1 - progressPercent / 100)}`}
                        style={{
                          transition: 'stroke-dashoffset 0.5s ease',
                        }}
                      />
                    </svg>
                  )}
                  
                  {/* Step number or checkmark */}
                  <div className="relative z-10">
                    {isCompleted ? (
                      <Check 
                        className="text-2xl"
                        style={{ color: colors.textOnPrimary }}
                      />
                    ) : (
                      <span 
                        className="text-xl"
                        style={{ 
                          fontFamily: 'Fredoka, sans-serif',
                          color: isActive ? colors.textOnPrimary : colors.mediumGray,
                          fontWeight: 600
                        }}
                      >
                        {stepNumber}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Step Label */}
                <span 
                  className="text-base text-center"
                  style={{ 
                    fontFamily: 'Nunito, sans-serif',
                    color: isActive || isCompleted ? colors.textPrimary : colors.mediumGray,
                    fontWeight: isActive ? 700 : 400,
                    minWidth: '60px'
                  }}
                >
                  {stepLabels[index]}
                </span>
              </div>

              {/* Connector Line */}
              {index < totalSteps - 1 && (
                <div
                  className="rounded-full"
                  style={{
                    width: '60px',
                    height: '4px',
                    backgroundColor: isCompleted ? colors.primary : colors.lightGray,
                    marginBottom: '32px'
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}