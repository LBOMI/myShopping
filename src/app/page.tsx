'use client';

import { useProductStore } from '@/store/productStore';
import { useSearchStore } from '@/store/searchStore';
import { useFilterStore } from '@/store/filterStore';
import ProductCard from '@/components/ProductCard';
import { useEffect } from 'react';

export default function HomePage() {
  const { keyword } = useSearchStore();
  const { products } = useProductStore();
  const { platforms, selectedPlatform, setPlatform, loadPlatforms, removePlatform } = useFilterStore();

  const filtered = products.filter((product) => {
    const matchesKeyword = product.name
      .toLowerCase()
      .includes(keyword.toLowerCase());

    const matchesPlatform =
      selectedPlatform === '전체' ||
      (product.platform?.toLowerCase().trim() ?? '0') ===
        selectedPlatform.toLowerCase().trim();

    return matchesKeyword && matchesPlatform;
  });

  useEffect(() => {
    loadPlatforms();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-sky-100 px-4 py-10">
      {/* 필터 버튼 영역 */}
      <section className="max-w-5xl mx-auto mb-8">
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          <button
            onClick={() => setPlatform('전체')}
            className={`text-sm px-4 py-1.5 rounded-full transition font-medium shadow-sm ${
              selectedPlatform === '전체'
                ? 'bg-sky-500 text-white'
                : 'bg-white text-sky-500 border border-sky-200 hover:bg-sky-100'
            }`}
          >
            전체 보기
          </button>

          {platforms.map((p) => (
  <div key={p} className="relative">
    <button
      onClick={() => setPlatform(p)}
      className={`text-sm px-4 py-1.5 pr-7 rounded-full transition font-medium shadow-sm ${
        selectedPlatform === p
          ? 'bg-sky-500 text-white'
          : 'bg-white text-sky-500 border border-sky-200 hover:bg-sky-100'
      }`}
    >
      {p}
    </button>
    
    {/* ❌ 삭제 버튼 */}
    <button
      onClick={() => removePlatform(p)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-red-400"
      title="필터 삭제"
    >
      x
    </button>
  </div>
))}

        </div>
      </section>

      {/* 상품 카드 목록 */}
      <section className="max-w-6xl mx-auto">
        {filtered.length === 0 ? (
          <p className="text-center text-sky-400 text-sm mt-20">
            검색 결과가 없어요 😢
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
