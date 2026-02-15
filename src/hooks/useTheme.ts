import { useEffect, useLayoutEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'white-web-theme';

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  try {
    let stored = localStorage.getItem(THEME_STORAGE_KEY);
    // Migrate from legacy key if present
    if (stored !== 'light' && stored !== 'dark' && localStorage.getItem('theme')) {
      stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') {
        localStorage.setItem(THEME_STORAGE_KEY, stored);
        return stored;
      }
    }
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // ignore
  }
  return null;
}

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Apply to document before paint so stored theme is visible immediately
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  // Persist to localStorage (after paint is fine)
  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, setTheme, toggleTheme };
}
