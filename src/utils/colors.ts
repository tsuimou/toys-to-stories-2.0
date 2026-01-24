/**
 * Centralized Color Palette for Toys to Stories 2.0
 * Toy-inspired aesthetic with vibrant, playful colors
 * Based on adventure-ready toy aesthetic with sky, sunshine, and nostalgia
 */

export const colors = {
  // Primary - Royal Blue (saturated, accessible, main CTA color)
  primary: '#3D8BFF',
  primaryLight: '#6BA3FF',
  primaryDark: '#2B6FDB',
  
  // Secondary - Sunny Yellow (hero color, warm, inviting, adventure-ready)
  yellow: '#FFE500',
  yellowLight: '#FFF176',
  yellowDark: '#FFC700',
  
  // Accent - Vibrant Red (energy, excitement, important actions)
  red: '#E63946',
  redLight: '#EF5A62',
  redDark: '#D62839',
  
  // Royal/Cobalt Blue (depth, outlines, secondary actions)
  royalBlue: '#3D8BFF',
  royalBlueLight: '#6BA3FF',
  royalBlueDark: '#2B6FDB',
  
  // Accent Colors
  skyBlue: '#87CEEB',
  skyBlueLight: '#A8DAFF',
  skyBlueDark: '#5BC0EB',
  
  blue: '#4169E1',
  blueLight: '#6B8EF3',
  blueDark: '#2B4FBD',
  
  mint: '#32DE84',
  mintLight: '#5FE89F',
  mintDark: '#28C571',
  
  green: '#34C759',
  greenLight: '#5FD676',
  greenDark: '#2AA34A',
  
  pink: '#FFB3D9',
  pinkLight: '#FFC9E3',
  pinkDark: '#FF9DCF',
  
  lavender: '#B095DE',
  lavenderLight: '#C5ADE8',
  lavenderDark: '#9B7DD1',
  
  purple: '#6A4C93',
  purpleLight: '#8B6EB3',
  purpleDark: '#533A73',
  
  // Warm toy room tones (wood, tan, nostalgic)
  warmTan: '#C8A882',
  warmTanLight: '#D9BFA1',
  warmTanDark: '#B59770',
  
  woodBrown: '#8B7355',
  woodBrownLight: '#A58A6F',
  woodBrownDark: '#6F5C44',
  
  // Specific colors from palette for personality sliders
  accessibleSkyBlue: '#7AB8DD',
  accessibleYellow: '#E5A800',
  accessiblePink: '#D891DA',
  limeGreen: '#91C059',
  cobaltBlue: '#032F98',
  
  // Personality Slider Colors - Energy Level (Yellow to Red gradient)
  energyCalm: '#FFF176',       // Light sunny yellow
  energyPlayful: '#FFE500',    // Bright yellow
  energyEnergetic: '#E63946',  // Bright red
  
  // Personality Slider Colors - Confidence Level (Blue shades)
  confidenceShy: '#A8DAFF',    // Light sky blue
  confidenceCurious: '#87CEEB', // Sky blue (primary)
  confidenceBrave: '#2B6FDB',  // Dark royal blue
  
  // Language-specific colors (each unique) - Using Toy Story palette
  languageSpanish: '#87CEEB',      // Sky Blue (primary)
  languageFrench: '#E63946',       // Vibrant Red
  languageGerman: '#3D8BFF',       // Royal Blue
  languageJapanese: '#FFE500',     // Sunny Yellow
  languageKorean: '#E63946',       // Vibrant Red (same as French for variety)
  languageHindi: '#32DE84',        // Mint Green
  languageMandarinSimp: '#3D8BFF', // Royal Blue (same as German)
  languageMandarinTrad: '#B095DE', // Lavender
  
  // Neutrals
  darkGray: '#2C3E50',
  mediumGray: '#7F8C8D',
  lightGray: '#E0E0E0',
  offWhite: '#F5EAD8',  // Warmer cream tone
  creamWhite: '#FEFBF6', // Very light warm cream
  white: '#FFFFFF',
  
  // Sky & Cloud colors for backgrounds
  skyBackground: '#87CEEB',
  cloudWhite: '#FFFFFF',
  
  // Functional Colors
  error: '#E63946',
  success: '#34C759',
  warning: '#FFE500',
  
  // Text Colors
  textPrimary: '#2C3E50',
  textSecondary: '#7F8C8D',
  textLight: '#BDC3C7',
  textOnPrimary: '#FFFFFF',
  
  // Background Colors
  backgroundPrimary: '#FEFBF6',  // Warm cream
  backgroundSecondary: '#FFFFFF',
} as const;

/**
 * Helper function to add opacity to hex colors
 * @param hex - Hex color code (e.g., '#FF6B35')
 * @param opacity - Opacity value between 0 and 1 (e.g., 0.6 for 60%)
 * @returns RGBA color string
 */
export function withOpacity(hex: string, opacity: number): string {
  // Remove the # if present
  const cleanHex = hex.replace('#', '');
  
  // Parse the hex color
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Predefined opacity values for consistency
 */
export const opacity = {
  disabled: 0.3,
  hover: 0.8,
  subtle: 0.6,
  verySubtle: 0.4,
  ultraSubtle: 0.15,
} as const;