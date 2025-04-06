'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useSearchStore } from '@/store/searchStore';

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const { keyword, setKeyword } = useSearchStore();

  return (
    <nav className="bg-white/30 backdrop-blur-lg shadow-md shadow-sky-100 p-5 flex items-center justify-between relative z-20 rounded-b-xl">
      {/* 중앙 로고 */}
      <Link
        href="/"
        className="absolute left-1/2 -translate-x-1/2 text-2xl font-semibold text-sky-600 tracking-tight hover:opacity-90 transition"
      >
        MOA
      </Link>

      {/* 오른쪽: 장바구니 + 검색창 + 상품등록 */}
      <div className="flex items-center gap-5 ml-auto">
        <Link
          href="/cart"
          className="text-sm text-slate-600 hover:text-sky-500 transition font-medium"
        >
          🛒 장바구니 <span className="font-semibold">({totalCount})</span>
        </Link>

        <div className="relative w-64">
          <input
            type="text"
            placeholder="상품을 검색해보세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-full border border-sky-100 bg-white/40 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-300 placeholder:text-slate-400 transition"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">
            🔍
          </span>

          <Link
            href="/admin"
            className="absolute right-2 -bottom-5 text-xs text-slate-400 hover:text-sky-400 transition"
          >
            상품 등록하기
          </Link>
        </div>
      </div>
    </nav>
  );
}
