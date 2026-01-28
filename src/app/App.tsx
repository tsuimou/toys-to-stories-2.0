import { useState } from "react";
import { Welcome } from "@/app/components/welcome";
import { LanguageSelection } from "@/app/components/language-selection";
import { AgeSelection } from "@/app/components/age-selection";
import { PhotoUpload } from "@/app/components/photo-upload";
import { ToyNameEntry } from "@/app/components/toy-name-entry";
import { PersonalitySlider } from "@/app/components/personality-slider";
import { LoadingScreen } from "@/app/components/loading-screen";
import { StorybookReader } from "@/app/components/storybook-reader";
import { VocabularyReview } from "@/app/components/vocabulary-review";
import { getStoryForLanguage, StoryPage, VocabWord } from "@/app/data/story-translations";
import { colors } from "@/utils/colors";

type Screen = "welcome" | "language" | "age" | "upload" | "toyName" | "personality" | "loading" | "story" | "vocabulary";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [toyName, setToyName] = useState<string>("");
  const [toyEnergy, setToyEnergy] = useState<number>(50);
  const [toyConfidence, setToyConfidence] = useState<number>(50);
  const [toyPhoto, setToyPhoto] = useState<string>("");
  const [generatedStory, setGeneratedStory] = useState<{ pages: StoryPage[]; vocabulary: VocabWord[] } | null>(null);
  const [storyError, setStoryError] = useState<string | null>(null);

  // Use generated story if available, otherwise fallback to static translations
  const fallbackStory = getStoryForLanguage(selectedLanguage);
  const { pages: storyPages, vocabulary: vocabularyWords } = generatedStory || fallbackStory;

  const handleGetStarted = () => {
    setCurrentScreen("language");
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setCurrentScreen("age");
  };

  const handleAgeSelect = (age: string) => {
    setSelectedAge(age);
    setCurrentScreen("upload");
  };

  const handlePhotoUploaded = (photoUrl: string) => {
    setToyPhoto(photoUrl);
    setCurrentScreen("toyName");
  };

  const handleToyNameSet = (name: string) => {
    setToyName(name);
    setCurrentScreen("personality");
  };

  const handlePersonalitySet = (energy: number, confidence: number) => {
    setToyEnergy(energy);
    setToyConfidence(confidence);
    setStoryError(null);
    setCurrentScreen("loading");
  };

  const handleStoryGenerated = (story: { pages: StoryPage[]; vocabulary: VocabWord[] }) => {
    setGeneratedStory(story);
    setCurrentScreen("story");
  };

  const handleStoryError = (error: string) => {
    setStoryError(error);
    // Use fallback story and continue
    setGeneratedStory(null);
    setCurrentScreen("story");
  };

  const handleStoryComplete = () => {
    setCurrentScreen("vocabulary");
  };

  const handleStartOver = () => {
    setSelectedLanguage("");
    setSelectedAge("");
    setToyName("");
    setToyEnergy(50);
    setToyConfidence(50);
    setToyPhoto("");
    setGeneratedStory(null);
    setStoryError(null);
    setCurrentScreen("welcome");
  };

  const handleDownloadPdf = () => {
    alert("PDF download would start here! In a real app, this would generate and download a PDF of the story and vocabulary.");
  };

  // Onboarding screens use cloud background
  const isOnboarding = ['welcome', 'language', 'age', 'upload', 'toyName', 'personality'].includes(currentScreen);
  const isDarkScreen = ['loading', 'story', 'vocabulary'].includes(currentScreen);

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center overflow-y-auto"
      style={{
        backgroundColor: isDarkScreen ? '#1a1a2e' : '#FFF9F0',
      }}
    >
      <div className={currentScreen === 'story' || currentScreen === 'loading' || currentScreen === 'vocabulary' ? 'w-full h-full' : 'w-full max-w-[1024px] min-h-full'}>
        {currentScreen === "welcome" && (
          <Welcome onGetStarted={handleGetStarted} />
        )}

        {currentScreen === "language" && (
          <LanguageSelection 
            onSelectLanguage={handleLanguageSelect}
            onBack={() => setCurrentScreen("welcome")}
          />
        )}

        {currentScreen === "age" && (
          <AgeSelection
            onSelectAge={handleAgeSelect}
            onBack={() => setCurrentScreen("language")}
          />
        )}

        {currentScreen === "upload" && (
          <PhotoUpload
            onGenerateStory={handlePhotoUploaded}
            onBack={() => setCurrentScreen("age")}
          />
        )}

        {currentScreen === "toyName" && (
          <ToyNameEntry
            onContinue={handleToyNameSet}
            onBack={() => setCurrentScreen("upload")}
          />
        )}

        {currentScreen === "personality" && (
          <PersonalitySlider
            onContinue={handlePersonalitySet}
            onBack={() => setCurrentScreen("toyName")}
            toyName={toyName}
          />
        )}

        {currentScreen === "loading" && (
          <LoadingScreen
            toyPhoto={toyPhoto}
            toyName={toyName}
            energy={toyEnergy}
            confidence={toyConfidence}
            age={selectedAge}
            language={selectedLanguage}
            onStoryGenerated={handleStoryGenerated}
            onError={handleStoryError}
          />
        )}

        {currentScreen === "story" && (
          <StorybookReader
            pages={storyPages}
            onClose={() => setCurrentScreen("upload")}
            onComplete={handleStoryComplete}
          />
        )}

        {currentScreen === "vocabulary" && (
          <VocabularyReview
            vocabularyWords={vocabularyWords}
            onDownloadPdf={handleDownloadPdf}
            onStartOver={handleStartOver}
            onBack={() => setCurrentScreen("story")}
          />
        )}
      </div>
    </div>
  );
}