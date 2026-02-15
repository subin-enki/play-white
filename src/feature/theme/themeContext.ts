import { createContext, useContext } from 'react';
import { useTheme } from '@/hooks';

type ThemeContextType = ReturnType<typeof useTheme>;

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
}
