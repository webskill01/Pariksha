// Backend/utils/fileUtils.js - Simple filename utilities

// Clean paper title for filename use
export const sanitizeFilename = (title, maxLength = 80) => {
  if (!title || typeof title !== 'string') {
    return 'untitled-paper';
  }

  return title
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .trim()
    .toLowerCase()
    .substring(0, maxLength)
    .replace(/^_+|_+$/g, '') // Remove leading/trailing underscores
    || 'untitled-paper';
};

// Generate unique filename with title + timestamp
export const generatePaperFilename = (paperTitle) => {
  const cleanTitle = sanitizeFilename(paperTitle, 60); // Leave room for timestamp
  const timestamp = Date.now();
  return `papers/${cleanTitle}_${timestamp}.pdf`;
};
