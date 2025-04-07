'use client';

import { Product } from '@/types/product';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Link href={`/product/${product.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-4 cursor-pointer flex flex-col items-center">
        {/* 이미지 */}
        <div className="aspect-square w-full rounded-xl overflow-hidden mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* 텍스트 */}
        <div className="text-center w-full">
          <h2 className="text-sm font-semibold text-gray-800 truncate">
            {product.name}
          </h2>
          <p className="text-violet-400 text-xs mt-1">
            {product.price.toLocaleString()}원
          </p>
        </div>

        {/* 장바구니 버튼 */}
        <button
          onClick={(e) => {
            e.preventDefault(); // 링크 이동 방지
            addToCart(product);
          }}
          className="mt-4 w-full bg-blue-300 hover:bg-blue-400 text-white text-xs font-medium py-2 rounded-full transition"
        >
          장바구니에 담기
        </button>
      </div>
    </Link>
  );
}
