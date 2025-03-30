// src/store/searchStore.ts
import { create } from 'zustand';

interface SearchStore {
  keyword: string;
  setKeyword: (value: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  keyword: '',
  setKeyword: (value) => set({ keyword: value }),
}));
