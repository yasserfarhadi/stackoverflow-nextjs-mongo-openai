'use client';

import React from 'react';

interface ThemeContextType {
  mode: 'light' | 'dark';
  changeTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | null>(null);

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = React.useState<ThemeContextType['mode']>('light');
  const handleThemeChange = () => {
    if (mode === 'dark') {
      setMode('light');
      document.documentElement.classList.add('light');
    } else {
      setMode('dark');
      document.documentElement.classList.add('dark');
    }
  };
  return (
    <ThemeContext.Provider value={{ mode, changeTheme: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeProvider;
