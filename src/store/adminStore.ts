import { create } from 'zustand';
import { Product, ProductInput } from '@/types/product';

interface AdminStore {
  products: Product[];
  addProduct: (input: ProductInput) => void;
}

let id = 1000; // 고유 ID 생성용

export const useAdminStore = create<AdminStore>((set) => ({
  products: [],
  addProduct: (input) =>
    set((state) => ({
      products: [
        ...state.products,
        {
          ...input,
          id: id++, // 고유 ID 부여
        },
      ],
    })),
}));
