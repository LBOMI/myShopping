'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useOrderFormStore } from '@/store/orderFormStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const { form, updateForm } = useOrderFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      alert('모든 정보를 입력해주세요!');
      return;
    }

    const phoneOnlyDigits = form.phone.replace(/[^0-9]/g, '');
    if (phoneOnlyDigits.length < 10 || phoneOnlyDigits.length > 11) {
      alert('전화번호는 10~11자리 숫자로 입력해주세요!');
      return;
    }

    setIsSubmitting(true);
    clearCart();
    setTimeout(() => {
      router.replace('/complete');
    }, 150);
  };

  if (isSubmitting) {
    return <p className="p-6 text-center text-gray-500">💫 주문을 처리 중입니다...</p>;
  }

  if (items.length === 0) {
    return <p className="p-6 text-center text-gray-500">장바구니가 비어 있어요.</p>;
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-violet-400 mb-6">🧾 주문 정보 입력</h1>

      <ul className="mb-6 space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between text-sm text-gray-600">
            <span>{item.name} × {item.quantity}</span>
            <span>{(item.price * item.quantity).toLocaleString()}원</span>
          </li>
        ))}
      </ul>

      <p className="text-lg font-semibold text-indigo-500 mb-6">
        총 결제 금액: {total.toLocaleString()}원
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 이름 */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            이름
          </label>
          <input
            id="name"
            type="text"
            placeholder="이름을 입력하세요"
            value={form.name}
            onChange={(e) => updateForm('name', e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-zinc-300 bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          />
        </div>

        {/* 전화번호 */}
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            전화번호
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="01012345678"
            value={form.phone}
            onChange={(e) =>
              updateForm('phone', e.target.value.replace(/[^0-9]/g, ''))
            }
            maxLength={11}
            className="w-full px-4 py-2 rounded-xl border border-zinc-300 bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          />
        </div>

        {/* 주소 */}
        <div className="flex flex-col gap-1">
          <label htmlFor="address" className="text-sm font-medium text-gray-700">
            배송지 주소
          </label>
          <input
            id="address"
            type="text"
            placeholder="예: 서울시 강남구 테헤란로 123"
            value={form.address}
            onChange={(e) => updateForm('address', e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-zinc-300 bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-violet-300 hover:bg-pink-300 text-white py-2 rounded-xl font-medium transition"
        >
          💳 주문하기
        </button>
      </form>
    </main>
  );
}
