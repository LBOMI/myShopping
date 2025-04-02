'use client';

import { useProductStore } from '@/store/productStore';

export default function CartPage() {
  const { products, removeProduct } = useProductStore();

  const cartItems = products.filter((item) => item.inCart);

  return (
    <main className="max-w-4xl mx-auto p-6 min-h-screen bg-pink-50">
      <h1 className="text-3xl font-bold text-pink-500 mb-6 text-center">
        🛒 내가 담아둔 상품들
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-pink-400">장바구니가 비어 있어요 🧺</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="bg-white/70 backdrop-blur rounded-2xl shadow-sm p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4"
            >
              <div>
                <p className="text-lg font-semibold text-pink-600">{item.name}</p>
                <p className="text-sm text-gray-500">{item.platform}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {item.price.toLocaleString()}원
                </p>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm text-pink-500 underline hover:text-pink-600"
                >
                  상품 보러가기 🛍️
                </a>
              </div>

              <button
                onClick={() => removeProduct(item.id)}
                className="text-sm text-red-400 hover:text-red-500 hover:underline"
              >
                제거하기 🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
