'use client';

// import { useProductStore } from '@/store/productStore';
// import ProductCard from '@/components/ProductCard';
// import { useSearchStore } from '@/store/searchStore';
import { Shirt } from 'lucide-react';
import { Pants, BaseballCap, Sneaker, DeviceMobile, Heart } from "@phosphor-icons/react";
import Link from 'next/link';

const categories = [
  { name: '의류', icon: Shirt, href: '/category/shirt'},
  { name: '바지', icon: Pants, href: '/category/pants' },
  { name: '모자', icon: BaseballCap, href: '/category/Accessories' },
  { name: '신발', icon: Sneaker, href: '/category/Shoes' },
  { name: '모바일 악세사리', icon: DeviceMobile, href: '/category/DeviceMobile' },
  { name: '찜', icon: Heart, href: '/category/Heart' },
]
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-center px-4 py-8 space-y-8">
      {/* Top Navigation */}
      <div className="flex justify-center space-x-8 text-blue-400 text-lg font-medium">
        <span>Popular</span>
        <span className="border-b-2 border-blue-400 pb-1">Home</span>
        <span>Login</span>
        {/* <span><Link
          href="/admin"
          className="text-xs text-zinc-400 hover:text-pink-400 transition"
        >
          관리자
        </Link></span> */}
      </div>

      {/* Title */}
      <div>
        <h1 className="text-4xl font-extrabold text-blue-400 tracking-wide">ShoppingMall</h1>
        <p className="text-gray-700 text-lg font-semibold mt-1">🌊🌊🌊</p>
        
      </div>
      

      {/* Icon Grid */}
      <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
        {categories.map(({ icon: Icon, href }, index) => (
          <Link
            href={href}
            key={index}
            className="group block aspect-square bg-white rounded-2xl shadow-md flex flex-col items-center justify-center hover:shadow-lg transition"
          >
            <Icon className="w-10 h-10 text-blue-400 group-hover:scale-110 transition duration-200" />
            {/* <span className="mt-2 text-sm text-gray-600 font-medium tracking-wide">
              {name}
            </span> */}
          </Link>
        ))}
      </div>

      {/* Footer Text */}
      <div className="text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">
        <p className="mb-4">
        Welcome to my ShoppingMall!
        </p>
        <div className="flex justify-between text-xs text-gray-400">
          <span>#Happy</span>
          <span>crafted by <span className="text-blue-400 font-bold">BOM</span></span>
          <span>1 Jan 2025</span>
        </div>
      </div>
    </div>
  );
}
