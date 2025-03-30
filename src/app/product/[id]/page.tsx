'use client';

import { useParams } from 'next/navigation';
import products from '@/data/products';
import { useCartStore } from '@/store/cartStore';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const addToCart = useCartStore((state) => state.addToCart);

  if (!product) return <p className="p-6">상품을 찾을 수 없습니다.</p>;

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 이미지 */}
        <div className="flex-shrink-0 w-full md:w-1/2">
          <div className="aspect-square bg-zinc-100 rounded-xl shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-500 text-sm">{product.description}</p>
          <p className="text-pink-500 text-xl font-semibold mt-2">
            {product.price.toLocaleString()}원
          </p>
          <button
            onClick={() => addToCart(product)}
            className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-xl transition text-sm font-medium"
          >
            장바구니 담기
          </button>
        </div>
      </div>
    </main>
  );
}
