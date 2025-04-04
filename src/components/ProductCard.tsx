'use client';

import { Product } from '@/types/product';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/store/productStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const router = useRouter();
  const { removeProduct } = useProductStore();

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/edit/${product.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const ok = confirm("정말 삭제할까요?");

    if (ok) {
      removeProduct(product.id);
      toast.success("삭제되었어요! 🗑️")  
    }
    };

  

  

  return (
    <a href={product.url}
      target='_blank'
      rel="noopener noreferrer"
    >
      <div className="bg-white/70 backdrop-blur-md rounded-[28px] shadow-xl hover:shadow-2xl transition-all p-4 cursor-pointer border border-pink-100 hover:scale-[1.02] relative">
        <div className="aspect-square overflow-hidden rounded-2xl mb-3 bg-pink-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />

          {/* 수정/삭제 버튼 (이미지 위) */}
    <div className="absolute top-2 right-2 flex gap-1 bg-white/60 backdrop-blur-md px-2 py-1 rounded-xl shadow-sm">
      <button
        onClick={handleEdit}
        className="text-xs text-pink-600 hover:text-pink-800"
        title="수정"
      >
        ✏️
      </button>
      <button
        onClick={handleDelete}
        className="text-xs text-red-500 hover:text-red-700"
        title="삭제"
      >
        🗑️
      </button>
    </div>
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
    </a>
  );
}
