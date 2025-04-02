import { create } from 'zustand';

interface FilterState {
  selectedPlatform: string;
  setPlatform: (platform: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedPlatform: '전체',
  setPlatform: (platform) => set({ selectedPlatform: platform }),
}));
