'use client';

import { Product } from '@/types/product';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white/70 backdrop-blur-md rounded-[28px] shadow-xl hover:shadow-2xl transition-all p-4 cursor-pointer border border-pink-100 hover:scale-[1.02] relative">
        <div className="aspect-square overflow-hidden rounded-2xl mb-3 bg-pink-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h2 className="text-base font-bold text-pink-700 truncate mb-1">
          🧸 {product.name}
        </h2>
        <p className="text-sm text-pink-500 mb-1">
          {product.price.toLocaleString()}원
        </p>
        {product.memo && (
          <p className="text-xs text-pink-400 italic mb-3 bg-pink-50 px-2 py-1 rounded-xl">
            💬 {product.memo}
          </p>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="w-full bg-pink-400 hover:bg-pink-500 text-white text-sm font-semibold py-2 rounded-xl transition shadow"
        >
          장바구니 담기 💕
        </button>
      </div>
    </Link>
  );
}
