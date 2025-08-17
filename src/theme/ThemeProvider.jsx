import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme, themeVariants } from './theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [customTheme, setCustomTheme] = useState(theme);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(newTheme);
    setCustomTheme(themeVariants[newTheme] || theme);
  };

  const updateTheme = (newThemeData) => {
    setCustomTheme({ ...customTheme, ...newThemeData });
  };

  const resetTheme = () => {
    setCustomTheme(theme);
    setCurrentTheme('dark');
  };

  const value = {
    theme: customTheme,
    currentTheme,
    toggleTheme,
    updateTheme,
    resetTheme,
    isDark: currentTheme === 'dark',
    isLight: currentTheme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={customTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
