// src/store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';

interface CartItem extends Product {
  quantity: number; // 몇 개 담았는지
}

interface CartStore {
  items: CartItem[];
  isHydrated: boolean;
  setHydrated: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  updatePrice: (id: number, price: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      isHydrated: false,
      setHydrated: () => set({ isHydrated: true }),
      addToCart: (product) => {
        const existing = get().items.find((item) => item.id === product.id);

        if (existing) {
          set((state) => ({
            items: state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { ...product, quantity: 1 }],
          }));
        }
      },
      increaseQuantity: (id: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decreaseQuantity: (id: number) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        })),
      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updatePrice: (id: number, price: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, price } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      version: 1,
      onRehydrateStorage: (state) => {
        return () => {
          state?.setHydrated(); // hydration 마친 후 호출
        };
      },
    }
  )
);

