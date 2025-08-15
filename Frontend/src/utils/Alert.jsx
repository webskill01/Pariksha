import React, { useState, useEffect } from 'react';

const AutoDismissibleAlert = ({ 
  message, 
  type = 'info', 
  duration = 6000, 
  showProgressBar = true,
  onDismiss,
  alertId = 'default-alert', // Unique identifier for this alert
  showOncePerSession = false, // If true, shows once per browser session
  showOncePerDay = false, // If true, shows once per day
}) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Check if alert should be shown
    const shouldShowAlert = () => {
      const storageKey = `alert_dismissed_${alertId}`;
      
      try {
        const dismissedData = localStorage.getItem(storageKey);
        
        if (!dismissedData) {
          return true; // First time visiting, show alert
        }
        
        const { timestamp } = JSON.parse(dismissedData);
        const now = Date.now();
        
        if (showOncePerDay) {
          const oneDayInMs = 24 * 60 * 60 * 1000;
          return (now - timestamp) > oneDayInMs;
        }
        
        if (showOncePerSession) {
          // Check if it's the same browser session
          const sessionId = sessionStorage.getItem('session_id');
          const storedSessionId = JSON.parse(dismissedData).sessionId;
          return sessionId !== storedSessionId;
        }
        
        // Default: show only once per page visit (browser session)
        return false;
        
      } catch (error) {
        console.warn('Error reading alert storage:', error);
        return true; // Show alert if there's an error reading storage
      }
    };

    // Initialize session ID if using session-based tracking
    if (showOncePerSession && !sessionStorage.getItem('session_id')) {
      sessionStorage.setItem('session_id', Date.now().toString());
    }

    if (shouldShowAlert()) {
      setVisible(true);
    }
  }, [alertId, showOncePerSession, showOncePerDay]);

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);

    // Progress bar animation
    let interval;
    if (showProgressBar) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (duration / 100));
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, 100);
    }

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [visible, duration, showProgressBar]);

  const handleDismiss = () => {
    setVisible(false);
    
    // Store dismissal information
    const storageKey = `alert_dismissed_${alertId}`;
    const dismissalData = {
      timestamp: Date.now(),
      sessionId: sessionStorage.getItem('session_id')
    };
    
    try {
      localStorage.setItem(storageKey, JSON.stringify(dismissalData));
    } catch (error) {
      console.warn('Error storing alert dismissal:', error);
    }
    
    if (onDismiss) onDismiss();
  };

  // Reset function to manually show the alert again (useful for testing)
  const resetAlert = () => {
    const storageKey = `alert_dismissed_${alertId}`;
    localStorage.removeItem(storageKey);
    setVisible(true);
    setProgress(100);
  };

  if (!visible) return null;

  const typeClasses = {
    info: 'bg-blue-100 text-blue-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
  };

  const progressColors = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div
      className={`px-4 py-1 ${typeClasses[type]} relative transform transition-all duration-300 ease-in-out`} 
      role="alert"
    >
      <div className="flex justify-between items-between">
        <div className="flex-1 text-sm sm:text-l">
          <p>{message}</p>
        </div>
        <button
          className="ml-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition ease-in-out duration-500"
          onClick={handleDismiss}
          aria-label="Close alert"
        >
          <svg
            className="h-5 w-5"
            fill="black"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {showProgressBar && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b">
          <div 
            className={`h-full ${progressColors[type]} transition-all duration-100 ease-linear rounded-b`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default AutoDismissibleAlert;