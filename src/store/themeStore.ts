import { create } from 'zustand';

interface ThemeStore {
  darkMode: boolean;
  toggleDarkMode: () => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  darkMode: false,

  toggleDarkMode: () => {
    const current = get().darkMode;
    const next = !current;
    set({ darkMode: next });
    localStorage.setItem('darkMode', JSON.stringify(next)); // ✅ 저장
  },

  initializeTheme: () => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      set({ darkMode: JSON.parse(saved) });
    }
  },
}));
