'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export default function CartPage() {
  const {
    items,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-violet-400 mb-6">
        🛒 내 장바구니
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-500">장바구니가 비어 있어요.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
              >
                <div>
                  <p className="text-base font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.price.toLocaleString()}원 × {item.quantity}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-8 h-8 flex items-center justify-center bg-zinc-100 rounded-full text-sm hover:bg-zinc-200 transition"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="w-8 h-8 flex items-center justify-center bg-zinc-100 rounded-full text-sm hover:bg-zinc-200 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-red-500 hover:underline text-sm"
                  >
                    제거
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t pt-6 space-y-4">
            <p className="text-xl font-bold text-indigo-500">
              총 결제 금액: {totalPrice.toLocaleString()}원
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={clearCart}
                className="bg-zinc-200 hover:bg-zinc-300 text-sm px-4 py-2 rounded-xl transition"
              >
                장바구니 비우기
              </button>

              <Link
                href="/checkout"
                className="bg-violet-400 hover:bg-pink-400 text-white text-sm px-4 py-2 rounded-xl text-center transition"
              >
                💳 결제하기
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
