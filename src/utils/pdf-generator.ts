import { jsPDF } from 'jspdf';

interface VocabWord {
  word: string;
  pronunciation: string;
  definition: string;
  icon?: string;
}

interface StoryPage {
  pageNumber: number;
  text: string;
  imageUrl: string;
  vocabWords: VocabWord[];
}

interface PdfOptions {
  toyName: string;
  language: string;
  pages: StoryPage[];
  vocabulary: VocabWord[];
}

// Convert image URL to base64 for embedding in PDF
async function imageUrlToBase64(url: string): Promise<string | null> {
  try {
    // For data URLs, return as-is
    if (url.startsWith('data:')) {
      return url;
    }

    // For remote URLs, fetch and convert
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Failed to convert image to base64:', error);
    return null;
  }
}

export async function generateStoryPdf(options: PdfOptions): Promise<void> {
  const { toyName, language, pages, vocabulary } = options;

  // Create PDF in LANDSCAPE format to match storybook layout
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth(); // 297mm in landscape
  const pageHeight = pdf.internal.pageSize.getHeight(); // 210mm in landscape
  const margin = 15;

  // Colors matching the storybook
  const primaryColor: [number, number, number] = [61, 139, 255]; // Royal Blue
  const textColor: [number, number, number] = [44, 62, 80];
  const accentColor: [number, number, number] = [155, 126, 222]; // Purple for pronunciation
  const creamBg: [number, number, number] = [255, 248, 231]; // #FFF8E7
  const darkBg: [number, number, number] = [42, 42, 64]; // #2a2a40
  const bookRed: [number, number, number] = [220, 53, 69]; // Book cover red

  // ===== TITLE PAGE (like book cover) =====
  // Dark night sky background
  pdf.setFillColor(26, 26, 46); // #1a1a2e
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Red book cover in center
  const coverWidth = 180;
  const coverHeight = 140;
  const coverX = (pageWidth - coverWidth) / 2;
  const coverY = (pageHeight - coverHeight) / 2;

  // Book shadow
  pdf.setFillColor(20, 20, 35);
  pdf.roundedRect(coverX + 4, coverY + 4, coverWidth, coverHeight, 4, 4, 'F');

  // Book cover
  pdf.setFillColor(...bookRed);
  pdf.roundedRect(coverX, coverY, coverWidth, coverHeight, 4, 4, 'F');

  // Inner cream area
  pdf.setFillColor(...creamBg);
  pdf.roundedRect(coverX + 10, coverY + 10, coverWidth - 20, coverHeight - 20, 2, 2, 'F');

  // Title
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(28);
  pdf.setTextColor(...textColor);
  const title = `${toyName}'s Adventure`;
  pdf.text(title, pageWidth / 2, coverY + 50, { align: 'center' });

  // Subtitle
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(...accentColor);
  const subtitle = `A Personalized Story in ${language}`;
  pdf.text(subtitle, pageWidth / 2, coverY + 65, { align: 'center' });

  // Decorative line
  pdf.setDrawColor(...primaryColor);
  pdf.setLineWidth(0.5);
  pdf.line(coverX + 40, coverY + 75, coverX + coverWidth - 40, coverY + 75);

  // Footer on cover
  pdf.setFontSize(10);
  pdf.setTextColor(150, 150, 150);
  pdf.text('Created with Toys to Stories', pageWidth / 2, coverY + coverHeight - 20, { align: 'center' });

  // ===== STORY PAGES (book spread layout) =====
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    pdf.addPage();

    // Two-page spread: left = image (dark bg), right = text (cream bg)
    const halfWidth = pageWidth / 2;

    // Left page - Dark background with image
    pdf.setFillColor(...darkBg);
    pdf.rect(0, 0, halfWidth, pageHeight, 'F');

    // Right page - Cream background for text
    pdf.setFillColor(...creamBg);
    pdf.rect(halfWidth, 0, halfWidth, pageHeight, 'F');

    // Center spine line
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.3);
    pdf.line(halfWidth, 0, halfWidth, pageHeight);

    // Add image on left side
    const imageMargin = 12;
    const imageWidth = halfWidth - (imageMargin * 2);
    const imageHeight = pageHeight - (imageMargin * 2);

    try {
      const imageData = await imageUrlToBase64(page.imageUrl);
      if (imageData) {
        pdf.addImage(
          imageData,
          'JPEG',
          imageMargin,
          imageMargin,
          imageWidth,
          imageHeight,
          undefined,
          'MEDIUM'
        );
      }
    } catch (error) {
      console.error('Failed to add image to PDF:', error);
      // Draw placeholder
      pdf.setFillColor(60, 60, 80);
      pdf.roundedRect(imageMargin, imageMargin, imageWidth, imageHeight, 4, 4, 'F');
      pdf.setTextColor(150, 150, 150);
      pdf.setFontSize(14);
      pdf.text('Image', halfWidth / 2, pageHeight / 2, { align: 'center' });
    }

    // Right side - Story text
    const textX = halfWidth + margin;
    const textWidth = halfWidth - (margin * 2);
    const textY = margin + 20;

    // Page number
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(...primaryColor);
    pdf.text(`${i + 1}`, halfWidth + halfWidth / 2, margin + 5, { align: 'center' });

    // Story text - larger, child-friendly font
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(16);
    pdf.setTextColor(...textColor);

    const lines = pdf.splitTextToSize(page.text, textWidth);
    pdf.text(lines, textX, textY + 15, { lineHeightFactor: 1.8 });

    // Vocab word highlight box at bottom (if any)
    if (page.vocabWords && page.vocabWords.length > 0) {
      const vocabWord = page.vocabWords[0];
      const boxY = pageHeight - 50;
      const boxHeight = 35;

      // Vocab box with primary color border
      pdf.setFillColor(245, 248, 255);
      pdf.setDrawColor(...primaryColor);
      pdf.setLineWidth(1);
      pdf.roundedRect(textX, boxY, textWidth, boxHeight, 3, 3, 'FD');

      // Star icon (text representation)
      pdf.setFontSize(14);
      pdf.setTextColor(...primaryColor);
      pdf.text('New Word:', textX + 5, boxY + 12);

      // Word
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(...textColor);
      pdf.text(vocabWord.word, textX + 40, boxY + 12);

      // Definition
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      const defLines = pdf.splitTextToSize(vocabWord.definition, textWidth - 10);
      pdf.text(defLines[0], textX + 5, boxY + 25);
    }

    // Page indicator at bottom
    pdf.setFontSize(10);
    pdf.setTextColor(180, 180, 180);
    pdf.text(`Page ${i + 1} of ${pages.length}`, halfWidth + halfWidth / 2, pageHeight - 8, { align: 'center' });
  }

  // ===== VOCABULARY REVIEW PAGE =====
  pdf.addPage();

  // Night sky background like the app
  pdf.setFillColor(26, 26, 46);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Header with stars
  pdf.setFontSize(10);
  pdf.setTextColor(255, 215, 0);
  pdf.text('⭐', 80, 25);
  pdf.text('⭐', pageWidth - 80, 25);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(28);
  pdf.setTextColor(255, 255, 255);
  pdf.text('Words You Learned!', pageWidth / 2, 30, { align: 'center' });

  // Vocabulary cards in a grid
  const cardWidth = 130;
  const cardHeight = 45;
  const cardsPerRow = 2;
  const startX = (pageWidth - (cardWidth * cardsPerRow + 20)) / 2;
  const startY = 50;

  for (let i = 0; i < vocabulary.length; i++) {
    const vocab = vocabulary[i];
    const row = Math.floor(i / cardsPerRow);
    const col = i % cardsPerRow;

    const cardX = startX + (col * (cardWidth + 20));
    const cardY = startY + (row * (cardHeight + 15));

    // Check if we need a new page
    if (cardY + cardHeight > pageHeight - 20) {
      pdf.addPage();
      pdf.setFillColor(26, 26, 46);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    }

    // White card
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(cardX, cardY, cardWidth, cardHeight, 4, 4, 'F');

    // Word
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(...textColor);
    pdf.text(vocab.word, cardX + 8, cardY + 14);

    // Pronunciation
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(10);
    pdf.setTextColor(...accentColor);
    pdf.text(vocab.pronunciation, cardX + 8, cardY + 24);

    // Definition (truncated if too long)
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(100, 100, 100);
    const defLines = pdf.splitTextToSize(vocab.definition, cardWidth - 16);
    pdf.text(defLines.slice(0, 2).join(' '), cardX + 8, cardY + 34);
  }

  // Footer
  pdf.setFontSize(11);
  pdf.setTextColor(150, 150, 150);
  pdf.text('Keep learning and exploring!', pageWidth / 2, pageHeight - 15, { align: 'center' });

  // Save the PDF
  const filename = `${toyName.replace(/[^a-zA-Z0-9]/g, '_')}_story.pdf`;
  pdf.save(filename);
}
