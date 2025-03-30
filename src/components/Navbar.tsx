'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useSearchStore } from '@/store/searchStore';
// import { useThemeStore } from '@/store/themeStore';

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const { keyword, setKeyword } = useSearchStore();
  // const { darkMode, toggleDarkMode } = useThemeStore();

  return (
    <nav className="bg-white shadow-sm p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 sticky top-0 z-20 backdrop-blur-md">
      {/* 로고 & 장바구니 */}
      <div className="flex items-center justify-between w-full md:w-auto gap-4">
        <Link
          href="/"
          className="text-2xl font-bold text-pink-500 tracking-tight hover:opacity-90 transition"
        >
          💗 ShoppingMall
        </Link>
        <Link
          href="/cart"
          className="text-sm text-gray-600 hover:text-pink-500 transition font-medium"
        >
          🛒 장바구니 <span className="font-semibold">({totalCount})</span>
        </Link>
      </div>

      {/* 검색창 + 관리자 링크 감싸기 */}
      <div className="relative w-full md:w-64">
        <input
          type="text"
          placeholder="상품을 검색해보세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full pl-10 pr-3 py-2 rounded-full border border-zinc-300 bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition placeholder:text-zinc-400"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 text-sm">
          🔍
        </span>

        {/* 관리자 링크 - 검색창 아래 오른쪽에 조용히 */}
        <Link
          href="/admin"
          className="absolute right-2 -bottom-5 text-xs text-zinc-400 hover:text-pink-400 transition"
        >
          관리자
        </Link>
      </div>
    </nav>
  );
}
