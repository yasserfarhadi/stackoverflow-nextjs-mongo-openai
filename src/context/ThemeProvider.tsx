'use client';

import React from 'react';

interface ThemeContextType {
  mode: 'light' | 'dark' | 'system';
  changeTheme: (selectedTheme: ThemeContextType['mode']) => void;
}

function setTheme(
  prev: ThemeContextType['mode'],
  current: ThemeContextType['mode'],
) {
  localStorage.setItem('theme', current);

  document.documentElement.classList.remove(prev);
  document.documentElement.classList.add(current);
  return current;
}

const ThemeContext = React.createContext<ThemeContextType | null>(null);

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = React.useState<ThemeContextType['mode']>('system');

  const handleThemeChange = React.useCallback(
    (selectedTheme: ThemeContextType['mode']) => {
      if (selectedTheme !== 'system') {
        setMode((prev) => {
          return setTheme(prev, selectedTheme);
        });
      } else {
        setMode((prev) => {
          const currentTheme = window.matchMedia('(prefers-color-scheme: dark)')
            .matches
            ? 'dark'
            : 'light';
          return setTheme(prev, currentTheme);
        });
      }
    },
    [],
  );

  React.useLayoutEffect(() => {
    handleThemeChange(localStorage.theme);
  }, [handleThemeChange]);

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
  if (!context) throw new Error('No initial values provided.');
  return context;
}

export default ThemeProvider;
