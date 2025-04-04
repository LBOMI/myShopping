'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import toast from 'react-hot-toast';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { products, updateProduct } = useProductStore();

  const product = products.find((p) => p.id === Number(id));

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('');
  const [price, setPrice] = useState('');

  // 폼 초기화
  useEffect(() => {
    if (product) {
      setName(product.name);
      setImage(product.image);
      setUrl(product.url ?? '');
      setPlatform(product.platform ?? '');
      setPrice(product.price.toString());
    }
  }, [product]);

  const handleUpdate = () => {
    if (!product) return;

    updateProduct({
      ...product,
      name,
      image,
      url,
      platform,
      price: parseInt(price),
    });

    toast.success('수정 완료! 🔮')
    router.push('/');
  };

  if (!product) {
    return <p className="p-6 text-pink-400">상품을 찾을 수 없어요 😢</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-pink-50 px-4 py-10">
      <div className="w-full max-w-xl space-y-6 bg-white/80 backdrop-blur-xl border border-pink-100 rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-extrabold text-pink-600 text-center mb-2">상품 수정 ✏️</h2>

        {/* 각 입력 필드 동일 */}
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-pink-200 rounded-xl p-3 bg-white placeholder-pink-300 text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder='상품명'/>
        <input value={image} onChange={(e) => setImage(e.target.value)} className="w-full border border-pink-200 rounded-xl p-3 bg-white placeholder-pink-300 text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder='이미지 URL'/>
        <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full border border-pink-200 rounded-xl p-3 bg-white placeholder-pink-300 text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder='상품 링크(URL)'/>
        <input value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full border border-pink-200 rounded-xl p-3 bg-white placeholder-pink-300 text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder='플랫폼 이름(예: 무신사)'/>
        <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" className="w-full border border-pink-200 rounded-xl p-3 bg-white placeholder-pink-300 text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder='가격(선택)'/>

        <button
          onClick={handleUpdate}
          className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold p-3 rounded-xl transition"
        >
          수정하기 ✨
        </button>
      </div>
    </div>
  );
}
