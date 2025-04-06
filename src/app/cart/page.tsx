'use client';

import { useCartStore } from '@/store/cartStore';
import { useState, useEffect } from 'react';

import Link from 'next/link';

export default function CartPage() {
  const {
    items: cartItems,
    isHydrated,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    updatePrice, // ✅ 추가 (store에 정의되어 있어야 함!)
  } = useCartStore();

  const [ready, setReady] = useState(typeof window === 'undefined' ? false : true);

  useEffect(() => {
    if (isHydrated) {
      setReady(true);
    }
  }, [isHydrated]);

  if (!ready) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-pink-100">
        <p className="text-pink-400 text-sm">장바구니 불러오는 중... 🎀</p>
      </main>
    );
  }

  const platformGroups = cartItems.reduce((acc, item) => {
    if (!acc[item.platform!]) {
      acc[item.platform!] = { total: 0, items: [] };
    }
    acc[item.platform!].items.push(item);
    acc[item.platform!].total += item.price * item.quantity;
    return acc;
  }, {} as Record<string, { items: typeof cartItems; total: number }>);

  const totalSum = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );



  return (
    <main className="max-w-4xl mx-auto p-6 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-pink-500 mb-6 text-center">
        🛒 내가 담아둔 상품들
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-pink-400">장바구니가 비어 있어요 🧺</p>
      ) : (
        <div className="space-y-10">
          {Object.entries(platformGroups).map(([platform, group]) => (
            <section key={platform}>
              <h2 className="text-xl font-semibold text-pink-600 mb-4">
                📦 {platform}
              </h2>
            
              <ul className="space-y-4">
                {group.items.map((item) => {
                  const [editing, setEditing] = useState(false);
                  const [editedPrice, setEditedPrice] = useState(item.price);

                  return (
                    <Link href={`/product/${item.id}`} key={item.id}>
  <li
    className="cursor-pointer bg-pink-100/70 border border-pink-200 backdrop-blur rounded-xl shadow-md p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4 hover:bg-pink-100/90 transition"
  >
    <div>
      <p className="text-lg font-semibold text-pink-600">{item.name}</p>
      <p className="text-sm text-gray-600">
        {editing ? (
          <input
            type="number"
            value={editedPrice}
            onChange={(e) => setEditedPrice(Number(e.target.value))}
            onClick={(e) => e.stopPropagation()}
            onBlur={(e) => {
              updatePrice(item.id, editedPrice);
              setEditing(false);
              e.stopPropagation();
            }}
            className="w-24 px-2 py-1 border border-pink-300 rounded-md text-sm"
          />
        ) : (
          <>
            {item.price.toLocaleString()}원{' '}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditing(true);
              }}
              className="text-xs text-pink-400 hover:text-pink-600"
            >
              ✏️
            </button>
          </>
        )}
        × {item.quantity}
      </p>
      <p className="text-sm text-gray-800 mt-1 font-medium">
        합계: {(item.price * item.quantity).toLocaleString()}원
      </p>

      <div className="mt-2 flex gap-2 items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            decreaseQuantity(item.id);
          }}
          className="w-8 h-8 flex items-center justify-center bg-zinc-100 rounded-full text-sm hover:bg-zinc-200 transition"
        >
          -
        </button>
        <span className="text-sm font-medium">{item.quantity}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            increaseQuantity(item.id);
          }}
          className="w-8 h-8 flex items-center justify-center bg-zinc-100 rounded-full text-sm hover:bg-zinc-200 transition"
        >
          +
        </button>
      </div>

      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-block mt-2 text-sm text-pink-500 underline hover:text-pink-600"
      >
        상품 보러가기 🛍️
      </a>
    </div>

    <button
      onClick={(e) => {
        e.stopPropagation();
        removeFromCart(item.id);
      }}
      className="text-sm text-red-400 hover:text-red-500 hover:underline"
    >
      제거하기 🗑️
    </button>
  </li>
</Link>

                  );
                })}
              </ul>

              <p className="mt-4 text-right text-sm text-pink-500 font-medium">
                🧾 {platform} 총합: {group.total.toLocaleString()}원
              </p>
            </section>
          ))}

          <div className="text-right text-xl font-bold text-pink-600 mt-10">
            💳 전체 합계: {totalSum.toLocaleString()}원
          </div>
        </div>
      )}
    </main>
  );

}

