'use client';

import { Product } from '@/types/product';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-4 cursor-pointer">
        <div className="aspect-square overflow-hidden rounded-xl mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h2 className="text-base font-semibold text-gray-800 truncate mb-1">
          {product.name}
        </h2>
        <p className="text-sm text-gray-500 mb-3">
          {product.price.toLocaleString()}원
        </p>
        <button
          onClick={(e) => {
            e.preventDefault(); // 링크 클릭 방지
            addToCart(product);
          }}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium py-2 rounded-xl transition"
        >
          장바구니 담기
        </button>
      </div>
    </Link>
  );
}
