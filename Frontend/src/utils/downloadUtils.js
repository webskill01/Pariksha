// Frontend/src/utils/downloadUtils.js - Reusable download utility

import { toast } from 'react-toastify';

// Clean filename for downloads
export const getCleanFilename = (title, maxLength = 100) => {
  if (!title || typeof title !== 'string') {
    return 'paper.pdf';
  }

  return title
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .trim()
    .toLowerCase()
    .substring(0, maxLength)
    .replace(/^_+|_+$/g, '') // Remove leading/trailing underscores
    + '.pdf';
};

// Universal paper download function
export const downloadPaper = async (paper, options = {}) => {
  const { showToast = true, onStart, onSuccess, onError } = options;

  try {
    if (!paper?.fileUrl) {
      throw new Error('No file URL available');
    }

    if (onStart) onStart();

    // Generate clean filename
    const cleanFilename = getCleanFilename(paper.title);
    
    // Create and trigger download
    const link = document.createElement('a');
    link.href = paper.fileUrl;
    link.download = cleanFilename;
    link.target = '_blank'; // Fallback to open in new tab
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    if (showToast) {
      toast.success(`"${paper.title}" downloaded successfully!`);
    }

    if (onSuccess) onSuccess(cleanFilename);
    
    return { success: true, filename: cleanFilename };

  } catch (error) {
    console.error('Download error:', error);
    
    // Fallback: try to open in new tab
    try {
      window.open(paper.fileUrl, '_blank');
      if (showToast) {
        toast.info('Paper opened in new tab for review');
      }
    } catch (fallbackError) {
      if (showToast) {
        toast.error('Download failed. Please try again.');
      }
      if (onError) onError(error);
      throw error;
    }
  }
};

// Hook for download with loading state
export const useDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const download = async (paper) => {
    if (isDownloading) return;

    return downloadPaper(paper, {
      onStart: () => setIsDownloading(true),
      onSuccess: () => setIsDownloading(false),
      onError: () => setIsDownloading(false)
    });
  };

  return { download, isDownloading };
};
