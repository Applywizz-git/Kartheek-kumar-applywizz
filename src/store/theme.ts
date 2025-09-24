import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'dark';
export type AccentPreset = 'default' | 'cyan-pulse' | 'indigo-lime' | 'ruby-slate';

interface ThemeState {
  theme: Theme;
  accent: AccentPreset;
  setTheme: (theme: Theme) => void;
  setAccent: (accent: AccentPreset) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark', // Only dark theme available
      accent: 'default',
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.setAttribute('data-theme', theme);
      },
      setAccent: (accent) => {
        set({ accent });
        document.documentElement.setAttribute('data-accent', accent);
      },
      toggleTheme: () => {
        // Only dark theme available - no toggle functionality
        get().setTheme('dark');
      },
    }),
    {
      name: 'skillverse-theme',
    }
  )
);

// Initialize theme on app load
export const initializeTheme = () => {
  const stored = localStorage.getItem('skillverse-theme');
  if (stored) {
    const { theme, accent } = JSON.parse(stored).state;
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-accent', accent);
  } else {
    // Always use dark theme
    const theme = 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-accent', 'default');
    useThemeStore.getState().setTheme(theme);
  }
};