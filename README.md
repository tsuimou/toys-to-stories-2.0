# Toys to Stories 2.0

A magical web app that transforms children's toy photos into personalized, multilingual storybooks using AI.

## What It Does

Kids upload a photo of their favorite toy, give it a name and personality, and the app generates a custom illustrated story featuring their toy as the main character. Stories are tailored to the child's age and available in 8 languages for early language learning.

## Features

- **Photo Upload** - Drag and drop or select a toy photo
- **AI Toy Recognition** - Gemini AI analyzes the toy to understand what it is
- **Personality Customization** - Sliders for energy level and confidence shape the story's tone
- **Age-Appropriate Content** - Stories scale vocabulary and complexity based on age (3-5, 6-8, 9-12)
- **8 Languages** - Spanish, French, German, Japanese, Korean, Hindi, Mandarin (Simplified & Traditional)
- **Interactive Storybook** - Page-by-page reader with animations
- **Vocabulary Review** - Learn new words from the story with pronunciations and definitions

## Screenshots

| Welcome | Upload Toy | Story Reader |
|---------|------------|--------------|
| Animated landing with floating toys | Drag-drop photo upload | Page-turning storybook |

## Tech Stack

- **React 18** + TypeScript
- **Vite** - Fast build tooling
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI + shadcn/ui** - Accessible component primitives
- **Motion (Framer)** - Smooth animations
- **Google Gemini AI** - Story generation and image analysis

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Google Gemini API key

### Installation

```bash
# Clone the repo
git clone https://github.com/tsuimou/toys-to-stories-2.0.git
cd toys-to-stories-2.0

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Gemini API key to .env
```

### Environment Variables

Create a `.env` file in the root directory:

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output is in the `/dist` folder, ready for deployment.

## How It Works

1. **Welcome** - Animated landing page introduces the app
2. **Language Selection** - Choose the story's language
3. **Age Selection** - Pick the child's age group
4. **Photo Upload** - Upload a toy photo (AI analyzes it)
5. **Name Your Toy** - Give the toy character a name
6. **Personality** - Set energy and confidence levels
7. **Story Generation** - AI creates a personalized story
8. **Read & Learn** - Interactive storybook with vocabulary review

## Project Structure

```
src/
├── app/
│   ├── components/     # React components
│   │   ├── ui/         # shadcn/ui base components
│   │   └── *.tsx       # Screen components
│   ├── data/           # Static translations
│   └── App.tsx         # Main app (screen state machine)
├── services/
│   └── gemini.ts       # AI integration
├── utils/
│   └── colors.ts       # Design system colors
└── styles/             # CSS files
```

## Credits

- UI Components: [shadcn/ui](https://ui.shadcn.com/) (MIT License)
- Icons: [Lucide](https://lucide.dev/)
- Design: Original Figma design

## License

MIT
