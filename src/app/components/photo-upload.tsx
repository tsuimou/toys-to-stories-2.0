import React, { useState, useCallback, useRef } from "react";
import { motion } from "motion/react";
import { StepIndicator } from "@/app/components/step-indicator";
import { Camera, AlertCircle, X, Image, ArrowLeft } from "lucide-react";
import { colors, withOpacity, opacity } from "@/utils/colors";

interface PhotoUploadProps {
  onGenerateStory: (photoUrl: string) => void;
  onBack: () => void;
}

export function PhotoUpload({ onGenerateStory, onBack }: PhotoUploadProps) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhoto(result);
        // Simulate face detection (random for demo)
        const hasFace = Math.random() < 0.3;
        setShowWarning(hasFace);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleGalleryClick = () => {
    galleryInputRef.current?.click();
  };

  const handleGenerate = () => {
    if (photo && !showWarning) {
      onGenerateStory(photo);
    }
  };

  return (
    <div className="h-screen flex flex-col p-4 sm:p-6 md:p-10 relative overflow-y-auto" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Back Button - Responsive position to match container padding */}
      <motion.button
        onClick={onBack}
        className="absolute flex items-center gap-2 z-50 rounded-full top-4 left-4 sm:top-6 sm:left-6 md:top-10 md:left-10"
        style={{ 
          color: colors.white, 
          paddingLeft: '20px',
          paddingRight: '24px',
          paddingTop: '14px',
          paddingBottom: '14px',
          cursor: 'pointer',
          background: `linear-gradient(180deg, ${colors.mediumGray} 0%, ${colors.darkGray} 100%)`,
          border: 'none',
          boxShadow: `0 0 0 3px ${colors.darkGray}, 0 4px 0 ${colors.darkGray}, 0 5px 12px rgba(0,0,0,0.3)`,
          fontFamily: 'Fredoka, sans-serif',
          fontWeight: 700,
          fontSize: '18px'
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: `0 0 0 3px ${colors.darkGray}, 0 6px 0 ${colors.darkGray}, 0 7px 15px rgba(0,0,0,0.35)`
        }}
        whileTap={{
          scale: 0.95,
          boxShadow: `0 0 0 3px ${colors.darkGray}, 0 2px 0 ${colors.darkGray}, 0 3px 8px rgba(0,0,0,0.3)`,
          translateY: 2
        }}
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </motion.button>

      <div className="w-full max-w-3xl mx-auto relative z-10 pt-4 sm:pt-6 md:pt-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 
            className="mb-4"
            style={{ 
              fontFamily: 'Fredoka, sans-serif',
              color: colors.textPrimary,
              fontWeight: 700,
              fontSize: 'clamp(32px, 6vw, 48px)'
            }}
          >
            Show us your toy!
          </h1>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={3} currentSubStep={1} />

        {/* Upload Zone */}
        <motion.div
          className="mb-6 sm:mb-8 cursor-pointer transition-all duration-200 flex items-center justify-center relative overflow-hidden mt-8 sm:mt-12 mx-auto"
          style={{
            width: 'min(600px, calc(100vw - 2rem))',
            height: 'clamp(250px, 35vh, 450px)',
            margin: 'clamp(1rem, 2vw, 2rem) auto clamp(0.5rem, 1.5vw, 1.5rem) auto',
            backgroundColor: isDragging ? withOpacity(colors.skyBlue, 0.2) : '#FFF8E7',
            border: 'none',
            boxShadow: isDragging 
              ? `
                  inset 0 0 0 8px ${colors.skyBlue},
                  inset 0 0 0 12px #FFF8E7,
                  0 0 0 6px ${colors.skyBlue}, 
                  0 8px 0 ${colors.skyBlue}, 
                  0 10px 30px rgba(0,0,0,0.3)
                `
              : `
                  inset 0px 0px 0px 8px rgba(212, 184, 0, 1),
                  inset 0px 0px 0px 12px rgba(255, 248, 231, 1),
                  0px 0px 0px 6px rgba(212, 184, 0, 1),
                  0px 10px 0px 0px rgba(212, 184, 0, 1),
                  0px 12px 35px 0px rgba(0, 0, 0, 0.35)
                `,
            overflow: 'hidden',
            borderRadius: '44px'
          }}
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          whileHover={{
            scale: 1.02,
            boxShadow: `
              inset 0px 0px 0px 8px rgba(212, 184, 0, 1),
              inset 0px 0px 0px 12px rgba(255, 248, 231, 1),
              0px 0px 0px 6px rgba(212, 184, 0, 1),
              0px 10px 0px 0px rgba(212, 184, 0, 1),
              0px 12px 35px 0px rgba(0, 0, 0, 0.35)
            `
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            capture="environment"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
            className="hidden"
          />

          <input
            ref={galleryInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
            className="hidden"
          />

          {/* Warning - Inside upload zone at top */}
          {showWarning && (
            <motion.div
              className="absolute top-0 left-0 right-0 p-4 flex items-center gap-3 z-10"
              style={{ 
                backgroundColor: '#FFF8E7',
                borderRadius: '32px 32px 0 0',
                boxShadow: `
                  inset 0 0 0 6px #C41E3A,
                  inset 0 0 0 10px #FFF8E7,
                  0 0 0 4px #C41E3A,
                  0 4px 0 #C41E3A,
                  0 6px 15px rgba(0,0,0,0.3)
                `
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#C41E3A',
                  flexShrink: 0
                }}
              >
                <AlertCircle size={20} style={{ color: '#FFFFFF' }} />
              </div>
              <div className="flex-1">
                <p className="text-base" style={{ fontFamily: 'Fredoka, sans-serif', color: colors.textPrimary, fontWeight: 700 }}>
                  Oops! We detected a face.
                </p>
                <p className="text-sm" style={{ fontFamily: 'Fredoka, sans-serif', color: colors.textPrimary, fontWeight: 600, opacity: 0.7 }}>
                  Please upload a photo with just the toy.
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPhoto(null);
                  setShowWarning(false);
                }}
                className="px-6 py-3 rounded-2xl transition-all"
                style={{ 
                  background: 'linear-gradient(180deg, #FF5757 0%, #C41E3A 50%, #A01229 100%)',
                  color: '#FFFFFF',
                  fontFamily: 'Fredoka, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  boxShadow: `
                    0 0 0 3px #7A0D1F,
                    0 4px 0 #7A0D1F,
                    0 6px 12px rgba(0,0,0,0.3)
                  `,
                  border: 'none',
                  cursor: 'pointer',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                Try Again
              </button>
            </motion.div>
          )}

          {!photo ? (
            <div className="flex flex-col items-center gap-4 p-8 text-center">
              <div 
                className="rounded-2xl flex items-center justify-center"
                style={{ 
                  width: '100px', 
                  height: '100px',
                  backgroundColor: '#FFF8E7',
                  boxShadow: `
                    inset 0 0 0 6px ${colors.vibrantRed},
                    inset 0 0 0 9px #FFF8E7,
                    0 0 0 4px #B02D38,
                    0 5px 0 #B02D38,
                    0 7px 15px rgba(0,0,0,0.3)
                  `
                }}
              >
                <Camera size={48} style={{ color: colors.sunnyYellow, filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))' }} />
              </div>
              <p 
                className="text-2xl"
                style={{ 
                  fontFamily: 'Fredoka, sans-serif',
                  color: colors.textPrimary,
                  fontWeight: 700
                }}
              >
                Tap to open camera
              </p>
              <p className="text-lg" style={{ fontFamily: 'Fredoka, sans-serif', color: colors.textPrimary, opacity: 0.7, fontWeight: 600 }}>
                Or use the gallery button below
              </p>
            </div>
          ) : (
            <div className="w-full h-full relative" style={{ padding: '16px' }}>
              <img 
                src={photo} 
                alt="Uploaded toy" 
                className="w-full h-full object-contain"
                style={{ borderRadius: '20px' }}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPhoto(null);
                  setShowWarning(false);
                }}
                className="absolute top-4 right-4 rounded-2xl p-3 transition-all"
                style={{ 
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)',
                  color: colors.textPrimary,
                  boxShadow: `
                    0 0 0 3px ${colors.textPrimary},
                    0 4px 0 ${colors.textPrimary},
                    0 6px 12px rgba(0,0,0,0.3)
                  `,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <X size={24} />
              </button>
            </div>
          )}

          {/* Gallery Button - Bottom left corner */}
          {!photo && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                handleGalleryClick();
              }}
              className="absolute flex items-center justify-center"
              style={{ 
                bottom: '20px',
                left: '20px',
                width: '70px',
                height: '70px',
                background: `linear-gradient(180deg, #5BA3FF 0%, ${colors.royalBlue} 50%, #2563C7 100%)`,
                borderRadius: '24px',
                boxShadow: `
                  0 0 0 5px #1E4A8F,
                  0 6px 0 #1E4A8F,
                  0 8px 20px rgba(0,0,0,0.4)
                `,
                border: 'none',
                zIndex: 20,
                cursor: 'pointer'
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `
                  0 0 0 5px #1E4A8F,
                  0 8px 0 #1E4A8F,
                  0 10px 25px rgba(0,0,0,0.45)
                `
              }}
              whileTap={{ 
                scale: 0.95,
                boxShadow: `
                  0 0 0 5px #1E4A8F,
                  0 2px 0 #1E4A8F,
                  0 4px 12px rgba(0,0,0,0.4)
                `,
                translateY: 4
              }}
            >
              <Image size={32} style={{ color: colors.white, filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))' }} />
            </motion.button>
          )}
        </motion.div>

        {/* Safety Reminder */}
        <div className="flex items-center justify-center gap-2 mb-4" style={{
          color: 'rgba(205, 161, 4, 1)'
        }}>
          <AlertCircle size={20} />
          <p className="text-lg" style={{ fontWeight: 600 }}>Make sure no faces are in the photo</p>
        </div>

        {/* Generate Button - Below content, not fixed */}
        <div className="flex justify-center pb-8">
        <motion.button
          onClick={handleGenerate}
          disabled={!photo || showWarning}
          className="rounded-full py-5 px-16 transition-all duration-200"
          style={{
            background: (!photo || showWarning) 
              ? withOpacity(colors.mediumGray, 0.3)
              : `linear-gradient(180deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
            color: (!photo || showWarning) ? withOpacity(colors.textPrimary, opacity.subtle) : colors.white,
            fontSize: '20px',
            fontFamily: 'Fredoka, sans-serif',
            fontWeight: 700,
            cursor: (!photo || showWarning) ? 'not-allowed' : 'pointer',
            boxShadow: (!photo || showWarning) 
              ? 'none' 
              : `0 0 0 5px ${colors.primaryDark}, 0 6px 0 ${colors.primaryDark}, 0 8px 20px rgba(0,0,0,0.3)`,
            border: 'none',
            textShadow: (!photo || showWarning) 
              ? 'none' 
              : `2px 2px 0 ${colors.primaryDark}, -1px -1px 0 ${colors.primaryDark}, 1px -1px 0 ${colors.primaryDark}, -1px 1px 0 ${colors.primaryDark}`
          }}
          whileHover={(!photo || showWarning) ? {} : { 
            scale: 1.05,
            boxShadow: `0 0 0 5px ${colors.primaryDark}, 0 8px 0 ${colors.primaryDark}, 0 10px 25px rgba(0,0,0,0.35)`
          }}
          whileTap={(!photo || showWarning) ? {} : { 
            scale: 0.95,
            boxShadow: `0 0 0 5px ${colors.primaryDark}, 0 2px 0 ${colors.primaryDark}, 0 4px 10px rgba(0,0,0,0.3)`,
            translateY: 4
          }}
        >
          Next
        </motion.button>
        </div>
      </div>
    </div>
  );
}