import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { colors } from "@/utils/colors";

interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="absolute flex items-center gap-2 z-50 rounded-full"
      style={{ 
        color: colors.white, 
        top: '2.5rem', 
        left: '2.5rem',
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
  );
}