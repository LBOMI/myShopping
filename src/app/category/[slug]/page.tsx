'use client';

import { useParams } from 'next/navigation';
import { useProductStore } from '@/store/productStore';
import ProductCard from '@/components/ProductCard';

export default function CategoryPage() {
  const { slug } = useParams(); // 예: 'shirt', 'gift' 등
  const { products } = useProductStore();

  const filtered = products.filter((p) => p.category === slug);

  return (
    <main className="min-h-screen bg-[#fafafa] px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* 타이틀 */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-400 tracking-wide capitalize">
            {slug}
          </h1>
          <p className="text-gray-500 text-sm mt-1">이 카테고리에 속한 상품들을 모아봤어요.</p>
        </div>

        {/* 상품 목록 */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-10">아직 등록된 상품이 없어요 🥲</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
