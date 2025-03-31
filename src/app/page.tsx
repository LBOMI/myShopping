'use client';

import { useProductStore } from '@/store/productStore';
import ProductCard from '@/components/ProductCard';
import { useSearchStore } from '@/store/searchStore';

export default function HomePage() {
  const { keyword } = useSearchStore();
  // const { products, isHydrated } = useProductStore();
  const { products } = useProductStore();

  // if (!isHydrated) {
  //   return <p className="p-6 text-gray-400 text-sm">로딩 중...</p>; // or null
  // }

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-600"> 상품 목록</h1>

      {filtered.length === 0 ? (
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
 