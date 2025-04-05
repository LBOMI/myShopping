'use client';

import { useProductStore } from '@/store/productStore';
import { useSearchStore } from '@/store/searchStore';
import { useFilterStore } from '@/store/filterStore';
import ProductCard from '@/components/ProductCard'; // 상품 카드
import { useEffect } from 'react';

export default function HomePage() {
  const { keyword } = useSearchStore();
  const { products } = useProductStore();
  const { platforms, selectedPlatform, setPlatform, loadPlatforms } = useFilterStore();

  const filtered = products.filter((product) => {
    const matchesKeyword = product.name
      .toLowerCase()
      .includes(keyword.toLowerCase());

    const matchesPlatform =
      selectedPlatform === '전체' || 
      (product.platform?.toLowerCase().trim() ?? '0') === selectedPlatform.toLowerCase().trim();


    return matchesKeyword && matchesPlatform;
  });

  useEffect(() => {
    loadPlatforms();
  }, []);

  return (
    <main className="min-h-screen bg-white-100 px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-10">
        💖 찜한 상품 모아보기
      </h1>

      <div className="flex gap-2 flex-wrap mb-4">
    <button
      onClick={() => setPlatform('전체')}
      className={`text-sm px-3 py-1 rounded-full ${
        selectedPlatform === '전체'
          ? 'bg-pink-500 text-white'
          : 'bg-pink-100 text-pink-600'
      }`}
    >
      전체 보기
    </button>

    {platforms.map((p) => (
      <button
        key={p}
        onClick={() => setPlatform(p)}
        className={`text-sm px-3 py-1 rounded-full ${
          selectedPlatform === p
            ? 'bg-pink-500 text-white'
            : 'bg-pink-100 text-pink-600'
        }`}
      >
        {p}
      </button>
    ))}
  </div>

      {filtered.length === 0 ? (
        <p className="text-center text-pink-400">검색 결과가 없어요 😢</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
