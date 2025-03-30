// src/app/product/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useProductStore } from '@/store/productStore';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products } = useProductStore();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <p className="p-6">해당 상품을 찾을 수 없습니다.</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <div className="aspect-square overflow-hidden rounded-xl shadow-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="md:w-1/2 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-gray-500 text-sm">{product.description}</p>
        <p className="text-pink-500 text-xl font-semibold">
          {product.price.toLocaleString()}원
        </p>
      </div>
    </main>
  );
}
