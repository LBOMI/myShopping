'use client';

import { useParams } from 'next/navigation';
// import products from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useProductStore } from '@/store/productStore';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products } = useProductStore();
  const { updateMemo } = useProductStore();
  
  const product = products.find((p) => p.id === Number(id));
  const addToCart = useCartStore((state) => state.addToCart);

  const [memo, setMemo] = useState('');

  useEffect(() => {
    if (product?.memo) setMemo(product.memo);
  }, [product]);

  if (!product) return <p className="p-6">상품을 찾을 수 없습니다.</p>;

  const handleSave = () => {
    updateMemo(product.id, memo);
    toast.success('메모가 저장되었어요 💾')
  };

  const handleDeleteMemo = () => {
    const confirmDelete = confirm("정말 삭제할까요?");
    if (!confirmDelete) return;

    updateMemo(product.id, "");
    setMemo("");
    toast.success('메모가 삭제되었어요! 🗑️')
  }

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
          <p className="text-indigo-400 text-xl font-semibold mt-2">
            {product.price.toLocaleString()}원
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
              toast.success("장바구니 담기 성공! 🧺")
            }}
            className="mt-4 w-full bg-pink-300 hover:bg-violet-300 text-white py-2 rounded-xl transition text-sm font-medium"
          >
            장바구니 담기
          </button>

          <div>
          <label className="block text-pink-500 text-sm mb-1">📝 메모 남기기</label>
          <textarea
            className="w-full rounded-xl border border-pink-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            rows={3}
            placeholder="예: 이번 주에 할인하니까 꼭 사기!"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
          <div className='w-full flex items-center gap-2 mt-3'>
          <button
            onClick={handleSave}
            className="flex-[9] bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-xl transition whitespace-nowrap"
          >
            메모 저장하기 💾
          </button>
          <button
            onClick={handleDeleteMemo}
            className='flex-[1.5] py-1 flex items-center justify-center bg-white border border-pink-300 text-pink-500 hover:bg-pink-100 rounded-xl transition text-lg'
            title='메모 삭제'>
            🧹
          </button>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}
