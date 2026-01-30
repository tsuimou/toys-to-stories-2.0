import { motion } from "motion/react";
import { Camera, Sparkles, BookOpen } from "lucide-react";
import { colors } from "@/utils/colors";

interface WelcomeProps {
  onGetStarted: () => void;
}

export function Welcome({ onGetStarted }: WelcomeProps) {
  return (
    <div
      className="h-screen relative overflow-hidden"
      style={{
        fontFamily: 'Nunito, sans-serif',
        background: 'linear-gradient(180deg, #1a1a2e 0%, #2d2d44 50%, #1a1a2e 100%)'
      }}
    >
      {/* Ambient glow effect behind hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 35%, rgba(255, 180, 100, 0.15) 0%, transparent 60%)',
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 py-4 sm:px-6 sm:py-6 md:px-10 md:py-8">

        {/* Hero Image - Responsive to viewport */}
        <motion.div
          className="w-full flex justify-center mb-3 sm:mb-4 md:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div
            className="relative"
            style={{
              width: 'min(50vh, min(85vw, 400px))',
              height: 'min(50vh, min(85vw, 400px))',
              maxWidth: '400px',
              maxHeight: '400px',
            }}
          >
            {/* Glow behind image */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(255,200,120,0.4) 0%, transparent 70%)',
                transform: 'scale(1.2)',
                filter: 'blur(30px)',
              }}
            />

            {/* Image container with frame */}
            <motion.div
              className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden"
              style={{
                boxShadow: `
                  0 0 0 3px rgba(255,200,120,0.6),
                  0 0 0 6px rgba(255,150,80,0.3),
                  0 20px 60px rgba(0,0,0,0.5),
                  0 0 100px rgba(255,180,100,0.2)
                `,
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/images/hero-image.png"
                alt="A child reading magical stories surrounded by beloved toys"
                className="w-full h-full object-cover"
              />

              {/* Subtle vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, transparent 50%, rgba(0,0,0,0.2) 100%)',
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Title Section */}
        <motion.div
          className="text-center mb-3 sm:mb-4 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-1 sm:mb-2"
            style={{
              fontFamily: 'Fredoka, sans-serif',
              fontWeight: 700,
              color: '#FFFFFF',
              textShadow: '0 2px 20px rgba(255,180,100,0.3)',
              letterSpacing: '-0.02em',
            }}
          >
            Toys to Stories
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl"
            style={{
              fontFamily: 'Fredoka, sans-serif',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '0.01em',
            }}
          >
            Turn your child's toys into magical adventures
          </p>
        </motion.div>

        {/* Feature Pills - Clean horizontal layout */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {[
            { icon: Camera, label: 'Snap a Photo', color: '#5BC0EB' },
            { icon: Sparkles, label: 'AI Magic', color: '#FFE500' },
            { icon: BookOpen, label: 'Read Together', color: '#FF6B6B' },
          ].map((feature, index) => (
            <motion.div
              key={feature.label}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              whileHover={{
                background: 'rgba(255,255,255,0.15)',
                scale: 1.05,
              }}
            >
              <feature.icon
                size={16}
                className="sm:w-[18px] sm:h-[18px]"
                style={{ color: feature.color }}
              />
              <span
                className="text-xs sm:text-sm font-semibold"
                style={{ color: '#FFFFFF' }}
              >
                {feature.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={onGetStarted}
          className="relative px-8 sm:px-12 py-3 sm:py-4 rounded-full cursor-pointer overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
            color: '#FFFFFF',
            fontSize: 'clamp(16px, 3.5vw, 20px)',
            fontFamily: 'Fredoka, sans-serif',
            fontWeight: 700,
            border: 'none',
            boxShadow: `
              0 0 0 3px ${colors.primaryDark},
              0 4px 0 ${colors.primaryDark},
              0 8px 25px rgba(61, 139, 255, 0.4)
            `,
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{
            scale: 1.05,
            boxShadow: `
              0 0 0 3px ${colors.primaryDark},
              0 6px 0 ${colors.primaryDark},
              0 12px 35px rgba(61, 139, 255, 0.5)
            `,
          }}
          whileTap={{
            scale: 0.98,
            boxShadow: `
              0 0 0 3px ${colors.primaryDark},
              0 2px 0 ${colors.primaryDark},
              0 4px 12px rgba(61, 139, 255, 0.4)
            `,
            translateY: 2,
          }}
        >
          Get Started
        </motion.button>

        {/* Subtle info text */}
        <motion.p
          className="mt-3 sm:mt-4 text-center text-xs sm:text-sm"
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontWeight: 500,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Ages 2-5 • 8 Languages • Personalized Stories
        </motion.p>
      </div>

      {/* Decorative stars */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${10 + (i * 7) % 80}%`,
            top: `${5 + (i * 11) % 85}%`,
            fontSize: i % 3 === 0 ? '12px' : '8px',
            opacity: 0.4 + (i % 3) * 0.2,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 3 + i % 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          {i % 2 === 0 ? '✨' : '⭐'}
        </motion.div>
      ))}
    </div>
  );
}
