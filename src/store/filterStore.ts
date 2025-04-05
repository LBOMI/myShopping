// src/store/filterStore.ts
import { create } from 'zustand';

interface FilterState {
  selectedPlatform: string;
  setPlatform: (platform: string) => void;

  platforms: string[];
  addPlatform: (platform: string) => void;
  loadPlatforms: () => void; // 🔥 추가
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedPlatform: '전체',
  setPlatform: (platform) => set({ selectedPlatform: platform }),

  platforms: [],

  addPlatform: (platform) =>
    set((state) => {
      const trimmed = platform.trim();
      if (!trimmed || state.platforms.includes(trimmed)) return state;

      const updated = [...state.platforms, trimmed];
      localStorage.setItem('moa-platforms', JSON.stringify(updated)); // 🔥 저장

      return { platforms: updated };
    }),

  loadPlatforms: () => {
    const raw = localStorage.getItem('moa-platforms');
    const saved = raw ? JSON.parse(raw) : [];
    set({ platforms: saved });
  },
}));
