import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { colors, withOpacity } from "@/utils/colors";

interface WelcomeProps {
  onGetStarted: () => void;
}

export function Welcome({ onGetStarted }: WelcomeProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-y-auto" style={{ fontFamily: 'Nunito, sans-serif' }}>
      <div className="w-full max-w-3xl text-center relative z-10">
        {/* Logo/Icon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Hero Image */}
          <motion.div
            className="mb-4 sm:mb-6 md:mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
              style={{
                width: 'min(90vw, 400px)',
                height: 'min(90vw, 400px)',
                maxWidth: '400px',
                maxHeight: '400px',
                boxShadow: `
                  0 0 0 4px ${colors.primaryDark},
                  0 6px 0 ${colors.primaryDark},
                  0 10px 30px rgba(0,0,0,0.3)
                `,
              }}
            >
              <img
                src="/images/hero-image.png"
                alt="A child reading stories surrounded by toys"
                className="w-full h-full object-cover"
              />
              {/* Subtle glow overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 60%, rgba(255,200,100,0.15) 0%, transparent 60%)',
                }}
              />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-4"
            style={{
              fontFamily: 'Fredoka, sans-serif',
              color: colors.textPrimary,
              fontWeight: 700
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Toys to Stories 2.0
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-8"
            style={{ color: colors.textPrimary, opacity: 0.8 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Create Magical Stories with your Favourite Toys
          </motion.p>

          {/* Feature Cards */}
          <motion.div 
            className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {/* Card 1 */}
            <motion.div 
              className="rounded-3xl p-4 sm:p-6 md:p-8 text-center"
              style={{ 
                background: `linear-gradient(180deg, ${colors.skyBlueLight} 0%, ${colors.skyBlue} 100%)`,
                boxShadow: `0 0 0 4px ${colors.skyBlueDark}, 0 5px 0 ${colors.skyBlueDark}, 0 6px 20px rgba(0,0,0,0.2)`
              }}
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0
              }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 md:mb-4">📸</div>
              <h3 
                className="text-base sm:text-lg md:text-2xl mb-1 sm:mb-2"
                style={{ 
                  fontFamily: 'Fredoka, sans-serif',
                  color: colors.white,
                  fontWeight: 700,
                  textShadow: `2px 2px 0 ${colors.skyBlueDark}`
                }}
              >
                Snap a Photo
              </h3>
              <p className="text-sm sm:text-base md:text-lg" style={{ color: colors.white, opacity: 0.95, fontWeight: 600 }}>
                Take a picture of your child's toys
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              className="rounded-3xl p-4 sm:p-6 md:p-8 text-center"
              style={{ 
                background: `linear-gradient(180deg, ${colors.yellowLight} 0%, ${colors.yellow} 100%)`,
                boxShadow: `0 0 0 4px ${colors.yellowDark}, 0 5px 0 ${colors.yellowDark}, 0 6px 20px rgba(0,0,0,0.2)`
              }}
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 md:mb-4">✨</div>
              <h3 
                className="text-base sm:text-lg md:text-2xl mb-1 sm:mb-2"
                style={{ 
                  fontFamily: 'Fredoka, sans-serif',
                  color: colors.textPrimary,
                  fontWeight: 700,
                  textShadow: `2px 2px 0 ${colors.yellowDark}`
                }}
              >
                Watch Magic
              </h3>
              <p className="text-sm sm:text-base md:text-lg" style={{ color: colors.textPrimary, opacity: 0.85, fontWeight: 600 }}>
                See toys become story characters
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              className="rounded-3xl p-4 sm:p-6 md:p-8 text-center"
              style={{ 
                background: `linear-gradient(180deg, ${colors.redLight} 0%, ${colors.red} 100%)`,
                boxShadow: `0 0 0 4px ${colors.redDark}, 0 5px 0 ${colors.redDark}, 0 6px 20px rgba(0,0,0,0.2)`
              }}
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6
              }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 md:mb-4">📚</div>
              <h3 
                className="text-base sm:text-lg md:text-2xl mb-1 sm:mb-2"
                style={{ 
                  fontFamily: 'Fredoka, sans-serif',
                  color: colors.white,
                  fontWeight: 700,
                  textShadow: `2px 2px 0 ${colors.redDark}`
                }}
              >
                Read Together
              </h3>
              <p className="text-sm sm:text-base md:text-lg" style={{ color: colors.white, opacity: 0.95, fontWeight: 600 }}>
                Enjoy a personalized storybook
              </p>
            </motion.div>
          </motion.div>

          {/* Info Text */}
          <motion.p 
            className="text-sm sm:text-base md:text-xl mb-4 sm:mb-6 md:mb-8" 
            style={{ color: colors.textPrimary, opacity: 0.6 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Perfect for children ages 2-5 • Available in multiple languages
          </motion.p>

          {/* Get Started Button */}
          <div className="flex justify-center mt-4 sm:mt-6 md:mt-8">
            <motion.button
              onClick={onGetStarted}
              className="rounded-full px-16 py-5 cursor-pointer transition-all duration-200"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}