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

  // Create PDF in portrait A4 format
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  // Colors
  const primaryColor: [number, number, number] = [61, 139, 255]; // Royal Blue
  const textColor: [number, number, number] = [44, 62, 80];
  const accentColor: [number, number, number] = [155, 126, 222]; // Purple for pronunciation

  // ===== TITLE PAGE =====
  pdf.setFillColor(255, 248, 231); // Cream background
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Title
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(32);
  pdf.setTextColor(...primaryColor);

  const title = `${toyName}'s Adventure`;
  const titleWidth = pdf.getTextWidth(title);
  pdf.text(title, (pageWidth - titleWidth) / 2, 80);

  // Subtitle
  pdf.setFontSize(16);
  pdf.setTextColor(...textColor);
  pdf.setFont('helvetica', 'normal');
  const subtitle = `A Personalized Story in ${language}`;
  const subtitleWidth = pdf.getTextWidth(subtitle);
  pdf.text(subtitle, (pageWidth - subtitleWidth) / 2, 95);

  // Decorative line
  pdf.setDrawColor(...primaryColor);
  pdf.setLineWidth(1);
  pdf.line(margin + 30, 110, pageWidth - margin - 30, 110);

  // Footer on title page
  pdf.setFontSize(10);
  pdf.setTextColor(150, 150, 150);
  const footer = 'Created with Toys to Stories';
  const footerWidth = pdf.getTextWidth(footer);
  pdf.text(footer, (pageWidth - footerWidth) / 2, pageHeight - 20);

  // ===== STORY PAGES =====
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    pdf.addPage();

    // Background
    pdf.setFillColor(255, 248, 231);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Page number header
    pdf.setFontSize(12);
    pdf.setTextColor(...primaryColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Page ${i + 1}`, margin, margin);

    // Try to add image
    let imageY = margin + 10;
    const imageHeight = 100;

    try {
      const imageData = await imageUrlToBase64(page.imageUrl);
      if (imageData) {
        // Add image centered
        const imageWidth = contentWidth;
        const imageX = margin;
        pdf.addImage(imageData, 'JPEG', imageX, imageY, imageWidth, imageHeight, undefined, 'MEDIUM');
      }
    } catch (error) {
      console.error('Failed to add image to PDF:', error);
      // Draw placeholder rectangle
      pdf.setFillColor(230, 230, 230);
      pdf.rect(margin, imageY, contentWidth, imageHeight, 'F');
      pdf.setTextColor(150, 150, 150);
      pdf.setFontSize(14);
      pdf.text('Image not available', pageWidth / 2, imageY + imageHeight / 2, { align: 'center' });
    }

    // Story text
    const textY = imageY + imageHeight + 15;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(14);
    pdf.setTextColor(...textColor);

    // Word wrap the text
    const lines = pdf.splitTextToSize(page.text, contentWidth);
    pdf.text(lines, margin, textY);

    // Vocab word highlight (if any on this page)
    if (page.vocabWords && page.vocabWords.length > 0) {
      const vocabY = textY + (lines.length * 7) + 15;

      pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2], 0.1);
      pdf.roundedRect(margin, vocabY - 5, contentWidth, 25, 3, 3, 'F');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(...primaryColor);
      pdf.text('Vocabulary:', margin + 5, vocabY + 5);

      const vocabWord = page.vocabWords[0];
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(...textColor);
      const vocabText = `${vocabWord.word} - ${vocabWord.definition}`;
      const vocabLines = pdf.splitTextToSize(vocabText, contentWidth - 10);
      pdf.text(vocabLines, margin + 5, vocabY + 15);
    }

    // Page footer
    pdf.setFontSize(10);
    pdf.setTextColor(180, 180, 180);
    pdf.text(`${i + 1} / ${pages.length}`, pageWidth / 2, pageHeight - 15, { align: 'center' });
  }

  // ===== VOCABULARY REVIEW PAGE =====
  pdf.addPage();

  // Background
  pdf.setFillColor(255, 248, 231);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Header
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(24);
  pdf.setTextColor(...primaryColor);
  const vocabTitle = 'Words You Learned!';
  const vocabTitleWidth = pdf.getTextWidth(vocabTitle);
  pdf.text(vocabTitle, (pageWidth - vocabTitleWidth) / 2, margin + 10);

  // Decorative line
  pdf.setDrawColor(...primaryColor);
  pdf.setLineWidth(0.5);
  pdf.line(margin + 20, margin + 18, pageWidth - margin - 20, margin + 18);

  // Vocabulary list
  let vocabListY = margin + 35;
  const vocabItemHeight = 35;

  for (let i = 0; i < vocabulary.length; i++) {
    const vocab = vocabulary[i];

    // Check if we need a new page
    if (vocabListY + vocabItemHeight > pageHeight - margin) {
      pdf.addPage();
      pdf.setFillColor(255, 248, 231);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      vocabListY = margin;
    }

    // Card background
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(margin, vocabListY, contentWidth, vocabItemHeight - 5, 3, 3, 'F');

    // Word
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(...textColor);
    pdf.text(vocab.word, margin + 5, vocabListY + 10);

    // Pronunciation
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(11);
    pdf.setTextColor(...accentColor);
    pdf.text(vocab.pronunciation, margin + 5, vocabListY + 18);

    // Definition
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.setTextColor(...textColor);
    const defLines = pdf.splitTextToSize(vocab.definition, contentWidth - 10);
    pdf.text(defLines[0], margin + 5, vocabListY + 26);

    vocabListY += vocabItemHeight;
  }

  // Final footer
  pdf.setFontSize(10);
  pdf.setTextColor(180, 180, 180);
  const finalFooter = 'Keep learning and exploring!';
  const finalFooterWidth = pdf.getTextWidth(finalFooter);
  pdf.text(finalFooter, (pageWidth - finalFooterWidth) / 2, pageHeight - 15);

  // Save the PDF
  const filename = `${toyName.replace(/[^a-zA-Z0-9]/g, '_')}_story.pdf`;
  pdf.save(filename);
}
