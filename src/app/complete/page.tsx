'use client';

import { useOrderFormStore } from '@/store/orderFormStore';

export default function CompletePage() {
  const { form } = useOrderFormStore();

  return (
    <main className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">🎉 주문 완료!</h1>
      <p className="mb-2">감사합니다, <strong>{form.name}</strong>님!</p>
      <p className="text-sm text-gray-600">연락처: {form.phone}</p>
      <p className="text-sm text-gray-600">배송지: {form.address}</p>
    </main>
  );
}
