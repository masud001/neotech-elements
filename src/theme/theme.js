// Theme configuration for styled-components
// Based on analysis of all CSS files in the project
// Includes CSS variables from App.css for backward compatibility

// CSS Variables for backward compatibility (can be used in CSS files)
export const cssVariables = {
  '--clr-primary': '#29221d',
  '--clr-primar-light': '#473b33',
  '--clr-secondary': '#1e1611',
  '--clr-white': '#fff',
  '--clr-black': '#000',
  '--clr-pumpkin': '#fe6c00',
  '--clr-silver': '#e8e6e7', // Improved contrast - lighter silver
  '--clr-silver-v1': '#f0eeef', // Improved contrast - lighter silver variant
  '--clr-scarlet': '#fe1e00',
  '--clr-scarlet-v1': 'rgba(254, 30, 0, 0.79)',
  '--clr-green': '#00fe93',
  '--clr-yellow': '#fec80a',
  '--clr-jet': '#302924',
  '--clr-peach': '#ffc397',
  '--font-family-bai': '"Bai Jamjuree", sans-serif',
  '--transition-default': 'all 300ms ease-in-out'
};

export const theme = {
  // Color Palette
  colors: {
    // Primary Colors (from CSS variables)
    primary: '#29221d',
    primaryLight: '#473b33',
    primaryDark: '#1e1611',
    secondary: '#1e1611',
    
    // Neutral Colors
    white: '#fff',
    black: '#000',
    jet: '#302924',
    
    // Status Colors
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    
    // Background Colors
    background: '#f8f9fa',
    backgroundHover: '#e9ecef',
    
    // Border Colors
    border: '#dee2e6',
    borderLight: '#e9ecef',
    
    // Text Colors - Improved contrast for accessibility
    textPrimary: '#212529',
    textSecondary: '#6c757d',
    silver: '#e8e6e7', // Improved contrast - lighter silver
    silverV1: '#f0eeef', // Improved contrast - lighter silver variant
    silverDark: '#c7c4c6', // Darker silver for better contrast on light backgrounds
    silverDarker: '#8a8587', // Even darker silver for maximum contrast
    
    // Accent Colors (from CSS variables)
    pumpkin: '#fe6c00',
    scarlet: '#fe1e00',
    scarletV1: 'rgba(254, 30, 0, 0.79)',
    green: '#00fe93',
    yellow: '#fec80a',
    peach: '#ffc397',
    
    // Additional colors found in components
    cardGradient: {
      primary: 'rgba(66, 59, 55, 0.6)',
      secondary: 'rgba(59, 43, 30, 0.37)',
      accent: '#fea767'
    },
    cardText: {
      primary: '#e8e6e7', // Improved contrast
      secondary: '#c7c4c6' // Improved contrast
    },
    subscriptionIcon: 'rgba(254, 30, 0, 0.15)',
    
    // Cards component specific colors
    cardBalance: '#e8e6e7', // Improved contrast
    cardPinText: '#c7c4c6' // Improved contrast
  },

  // Typography
  typography: {
    fontFamily: {
      primary: '"Bai Jamjuree", sans-serif'
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px'
    },
    fontWeight: {
      light: 200,
      normal: 300,
      medium: 400,
      semibold: 500,
      bold: 600,
      extrabold: 700
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8
    }
  },

  // Spacing
  spacing: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '10px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '20px',
    '4xl': '24px',
    '5xl': '28px',
    '6xl': '32px',
    '7xl': '36px',
    '8xl': '42px',
    '9xl': '48px'
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '10px',
    xl: '12px',
    '2xl': '16px',
    full: '100%'
  },

  // Shadows
  shadows: {
    sm: 'rgba(0, 0, 0, 0.05) 0px 8px 24px',
    md: 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
    lg: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    scrollbar: 'inset 0 0 6px rgba(0, 0, 0, 0.3)'
  },

  // Transitions
  transitions: {
    default: 'all 300ms ease-in-out',
    fast: 'all 150ms ease-in-out',
    slow: 'all 500ms ease-in-out'
  },

  // Breakpoints
  breakpoints: {
    xs: '375px',
    sm: '420px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px'
  },

  // Layout
  layout: {
    sidebar: {
      width: {
        expanded: '260px',
        collapsed: '72px'
      },
      padding: {
        expanded: '36px 20px',
        collapsed: '24px 16px',
        mobile: '12px'
      },
      height: '100px',
      scrollbar: {
        width: '4px',
        borderRadius: '18px'
      }
    },
    content: {
      padding: {
        default: '32px',
        lg: '20px',
        md: '16px'
      }
    },
    grid: {
      gap: {
        default: '16px',
        small: '12px',
        none: '0'
      }
    }
  },

  // Component Specific
  components: {
    card: {
      background: 'linear-gradient(114.07deg, rgba(66, 59, 55, 0.6) 3.49%, rgba(66, 59, 55, 0) 34.7%), linear-gradient(138.58deg, rgba(59, 43, 30, 0.37) 43.56%, #fea767 112.68%)',
      borderRadius: '10px',
      padding: '16px'
    },
    progressBar: {
      size: '210px',
      strokeWidth: '20',
      strokeDasharray: '625px'
    },
    avatar: {
      size: {
        small: '32px',
        medium: '40px',
        large: '48px'
      }
    },
    sidebar: {
      navItem: {
        height: '44px',
        iconSize: '22px',
        collapsedIconSize: '32px'
      }
    }
  },

  // Z-Index
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060
  }
};

// Theme variants for different color schemes
export const themeVariants = {
  light: {
    ...theme,
    colors: {
      ...theme.colors,
      primary: '#f8f9fa',
      secondary: '#e9ecef',
      white: '#000',
      black: '#fff',
      silver: '#6c757d',
      silverV1: '#495057'
    }
  },
  
  dark: {
    ...theme,
    // Dark theme uses the default colors
  }
};

// Helper functions for theme usage
export const getColor = (colorPath) => {
  const path = colorPath.split('.');
  let value = theme.colors;
  
  for (const key of path) {
    value = value[key];
  }
  
  return value;
};

export const getSpacing = (size) => theme.spacing[size] || size;

export const getBreakpoint = (breakpoint) => theme.breakpoints[breakpoint];

export const getTypography = (variant) => {
  const [size, weight] = variant.split('-');
  return {
    fontSize: theme.typography.fontSize[size] || theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight[weight] || theme.typography.fontWeight.normal
  };
};

// Media query helpers
export const media = {
  xs: `@media (max-width: ${theme.breakpoints.xs})`,
  sm: `@media (max-width: ${theme.breakpoints.sm})`,
  md: `@media (max-width: ${theme.breakpoints.md})`,
  lg: `@media (max-width: ${theme.breakpoints.lg})`,
  xl: `@media (max-width: ${theme.breakpoints.xl})`
};

export default theme;
