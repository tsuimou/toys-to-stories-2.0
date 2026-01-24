# Toys to Stories 2.0 Web App

A children's educational app that turns toy photos into personalized multilingual stories using AI.

## Tech Stack

- **React 18** with TypeScript
- **Vite 6** - build tool and dev server
- **Tailwind CSS 4** - with @tailwindcss/vite plugin
- **Radix UI + shadcn/ui** - accessible component primitives
- **Motion (Framer)** - animations and gestures
- **Google Generative AI (Gemini)** - story generation and image analysis
- **React DnD** - drag and drop for photo upload
- **React Hook Form** - form state management

## Commands

```bash
npm run dev    # Start dev server at localhost:5173
npm run build  # Production build to /dist
```

## Project Structure

```
/src
  /app
    /components
      /ui           # 50+ shadcn/Radix base components
      /figma        # Figma-generated components
      *.tsx         # Main screen components (welcome, photo-upload, etc.)
    /data
      story-translations.ts  # Multi-language fallback stories
    App.tsx         # Main router/state manager (screen state machine)
  /services
    gemini.ts       # Gemini API integration
  /utils
    colors.ts       # Centralized color palette
  /styles
    index.css, theme.css, fonts.css, tailwind.css
```

## Coding Conventions

### Components
- Functional components with hooks only
- Props interfaces defined at top of file
- Named exports (not default)
- Path alias: `@` resolves to `/src`

```typescript
interface ComponentProps {
  onEvent: () => void;
}

export function ComponentName({ onEvent }: ComponentProps) {
  const [state, setState] = useState<Type>(initial);
  return <div>...</div>;
}
```

### Screen State Pattern
App.tsx manages flow as a state machine:
```typescript
type Screen = "welcome" | "language" | "age" | "upload" | "toyName" | "personality" | "loading" | "story" | "vocabulary";
```

### Styling
1. **Tailwind CSS** for utility classes
2. **Inline styles** for dynamic/computed values from `colors.ts`
3. **Motion props** for animations (initial, animate, transition, whileHover, whileTap)

```typescript
style={{
  backgroundColor: colors.backgroundPrimary,
  fontFamily: 'Fredoka, sans-serif'
}}
className="rounded-lg p-6 text-center"
```

### Animation Pattern
```typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

### Color System
Use centralized colors from `@/utils/colors.ts`:
- Primary: Royal Blue (#3D8BFF)
- Secondary: Sunny Yellow (#FFE500)
- Accent: Vibrant Red (#E63946)
- Always use semantic names from colors.ts, not raw hex values

### Typography
- Headings: `fontFamily: 'Fredoka, sans-serif'`
- Body: `fontFamily: 'Nunito, sans-serif'`

## API Integration

- Environment variable: `VITE_GEMINI_API_KEY`
- Always include error handling with fallback content
- Use delay functions between API calls for rate limiting

## Supported Languages

Spanish, French, German, Japanese, Korean, Hindi, Mandarin (Simplified & Traditional)

## Key Patterns

- Sequential screen flow with back navigation
- API-driven content with static fallbacks
- Age-based content scaling (vocabulary/complexity)
- Loading stages with progress indication
