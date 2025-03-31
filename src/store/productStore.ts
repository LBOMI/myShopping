import { create } from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';
import type { StateCreator, StoreApi } from 'zustand';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface ProductStore {
  products: Product[];
  // isHydrated: boolean;
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

// ✅ 타입 확장된 persist 사용
type MyPersist = (
  config: StateCreator<ProductStore>,
  options: {
    name: string;
    storage?: StateStorage;
    onRehydrateStorage?: (
      store: StoreApi<ProductStore>
    ) => (state?: ProductStore, error?: unknown) => void;
  }
) => StateCreator<ProductStore>;

export const useProductStore = create<ProductStore>()(
  (persist as MyPersist)(
    (set) => ({
      products: initialProducts,
      isHydrated: false,
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
      onRehydrateStorage: (store) => {
        return (persistedState) => {
          console.log('[ZUSTAND] Rehydrating...');
          if (!persistedState || persistedState.products.length === 0) {
            console.log('[ZUSTAND] 초기 상품으로 설정합니다.');
            store.setState({ products: initialProducts });
          }
          // store.setState({ isHydrated: true });
          console.log('[ZUSTAND] hydration 완료!');
        };
      }
    }
  )
);
