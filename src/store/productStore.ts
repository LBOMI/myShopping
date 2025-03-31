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
  removeProduct: (id: number) => void;
  updateProduct: (product: Product) => void;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: '후디',
    price: 59000,
    image: '/hoodie.jpg', 
    description: 'gray 후디',
  },
  {
    id: 2,
    name: '티셔츠',
    price: 14900,
    image: '/tshirt.jpg',
    description: '깔끔한 흰색 티셔츠',
  },
  {
    id: 3,
    name: '청바지',
    price: 44900,
    image: '/jeans.jpg',
    description: '편안한 청바지',
  },
];


export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, { id: Date.now(), ...product }],
        })),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      updateProduct: (updated) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === updated.id ? updated : p
          ),
        })),
    }),
    {
      name: 'my-shop-products',
      onRehydrateStorage: () => (state, error) => {
        if (!state || state.products.length === 0) {
          return { products: initialProducts };
        }
      },
    }
  )
);


