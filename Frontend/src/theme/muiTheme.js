// Frontend/src/theme/muiTheme.js

import { createTheme } from '@mui/material/styles'

// Create a dark theme that matches our Tailwind design
const muiTheme = createTheme({
  palette: {
    mode: 'dark', // Enable MUI's dark mode
    
    primary: {
      main: '#06b6d4',      // Cyan-500 - matches our Tailwind primary
      light: '#22d3ee',     // Cyan-400 
      dark: '#0891b2',      // Cyan-600
      contrastText: '#ffffff',
    },
    
    secondary: {
      main: '#64748b',      // Slate-500 - our secondary color
      light: '#94a3b8',     // Slate-400
      dark: '#475569',      // Slate-600
      contrastText: '#ffffff',
    },
    
    background: {
      default: '#0f172a',   // Slate-900 - matches our body background
      paper: '#1e293b',     // Slate-800 - for cards and surfaces
    },
    
    text: {
      primary: '#f1f5f9',   // Slate-100 - main text color
      secondary: '#cbd5e1', // Slate-300 - secondary text
    },
    
    error: {
      main: '#ef4444',      // Red-500
      light: '#f87171',     // Red-400
      dark: '#dc2626',      // Red-600
    },
    
    warning: {
      main: '#f59e0b',      // Amber-500
      light: '#fbbf24',     // Amber-400
      dark: '#d97706',      // Amber-600
    },
    
    success: {
      main: '#10b981',      // Emerald-500
      light: '#34d399',     // Emerald-400
      dark: '#059669',      // Emerald-600
    },
  },
  
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.025em',
    },
    
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#f1f5f9',     // Light text
    },
    
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#cbd5e1',     // Slightly dimmer
    },
  },
  
  shape: {
    borderRadius: 12,       // Rounded corners to match our design
  },
  
  components: {
    // Customize MUI components to match our Tailwind style
    
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',        // Don't uppercase button text
          borderRadius: '0.75rem',      // rounded-xl
          fontWeight: 500,
          padding: '0.75rem 1.5rem',
          transition: 'all 0.3s ease',
          
          '&:hover': {
            transform: 'scale(1.05)',   // Subtle hover animation
          },
        },
      },
    },
    
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '0.75rem',    // Match our form inputs
            backgroundColor: '#1e293b', // Slate-800 background
            
            '& fieldset': {
              borderColor: '#475569',   // Slate-600 border
            },
            
            '&:hover fieldset': {
              borderColor: '#64748b',   // Slate-500 on hover
            },
            
            '&.Mui-focused fieldset': {
              borderColor: '#06b6d4',   // Cyan-500 when focused
              borderWidth: '2px',
            },
          },
        },
      },
    },
    
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(30, 41, 59, 0.5)', // Slate-800/50 - semi-transparent
          backdropFilter: 'blur(12px)',              // Glass effect
          border: '1px solid rgba(71, 85, 105, 0.3)', // Subtle border
          borderRadius: '1rem',                       // rounded-2xl
          transition: 'all 0.3s ease',
          
          '&:hover': {
            borderColor: 'rgba(100, 116, 139, 0.5)', // Lighter border on hover
            transform: 'translateY(-2px)',             // Subtle lift effect
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          },
        },
      },
    },
    
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e293b',    // Slate-800
          backgroundImage: 'none',       // Remove MUI's default gradient
        },
      },
    },
    
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#cbd5e1',             // Slate-300
          transition: 'all 0.2s ease',
          
          '&:hover': {
            backgroundColor: 'rgba(71, 85, 105, 0.2)',
            color: '#06b6d4',           // Cyan-500 on hover
            transform: 'scale(1.1)',
          },
        },
      },
    },
  },
})

export default muiTheme