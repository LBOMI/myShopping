// src/store/productStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface ProductStore {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) =>
        set((state) => ({
          products: [
            ...state.products,
            {
              id: Date.now(),
              ...product,
            },
          ],
        })),
    }),
    {
      name: 'my-shop-products', // localStorage 키 이름
    }
  )
);
