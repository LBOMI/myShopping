'use client';

import { useProductStore } from '@/store/productStore';
import { useSearchStore } from '@/store/searchStore';
import { useFilterStore } from '@/store/filterStore';
import ProductCard from '@/components/ProductCard'; // 감성 카드 컴포넌트라면 유지

export default function HomePage() {
  const { keyword } = useSearchStore();
  const { products } = useProductStore();
  const { selectedPlatform, setPlatform } = useFilterStore();

  const filtered = products.filter((product) => {
    const matchesKeyword = product.name
      .toLowerCase()
      .includes(keyword.toLowerCase());

    const matchesPlatform =
      selectedPlatform === '전체' || product.platform === selectedPlatform;

    return matchesKeyword && matchesPlatform;
  });

  return (
    <main className="min-h-screen bg-white-100 px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-10">
        💖 찜한 상품 모아보기
      </h1>

      <div className='flex gap-2 mb-6 flex-wrap'>
        {['전체', '무신사', '쿠팡', '오늘의집'].map((platform) => (
          <button
            key={platform}
            onClick={() => setPlatform(platform)}
            className= {`px-4 py-2 rounded-full border text-sm transition ${
              selectedPlatform === platform
                ? 'bg-pink-400 text-white border-pink-400'
                : 'bg-white text-pink-400 border-pink-200'
            }`}
          >
            {platform}
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
