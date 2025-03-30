'use client';

import { useState } from 'react';
import { useProductStore } from '@/store/productStore';

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState('');

  const [form, setForm] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const {
    addProduct,
    updateProduct,
    removeProduct,
    products,
  } = useProductStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setForm((prev) => ({ ...prev, image: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) return;

    if (isEditing && editingId !== null) {
      updateProduct({
        ...form,
        id: editingId,
        price: parseInt(form.price),
      });
      
      setIsEditing(false);
      setEditingId(null);
    } else {
      addProduct({
        name: form.name,
        price: parseInt(form.price),
        image: form.image,
        description: form.description,
      });
    }

    setForm({ name: '', price: '', image: '', description: '' });
  };

  const handleEdit = (product: { id: number; name: string; price: number; image: string; description?: string }) => {
    setForm({
      name: product.name,
      price: product.price.toString(), // 👈 문자열로 변환!
      image: product.image,
      description: product.description || '',
    });
    setEditingId(product.id);
    setIsEditing(true);
  };
  

  const handleCancelEdit = () => {
    setForm({ name: '', price: '', image: '', description: '' });
    setIsEditing(false);
    setEditingId(null);
  };

  if (!auth) {
    return (
      <div className="p-6 max-w-xs mx-auto">
        <h1 className="text-xl font-bold mb-4 text-pink-500">🔐 관리자 로그인</h1>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl mb-4 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
        />
        <button
          onClick={() => {
            if (pw === '1234') setAuth(true);
            else alert('비밀번호가 틀렸습니다!');
          }}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-xl transition"
        >
          로그인
        </button>
      </div>
    );
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-pink-500">📦 상품 {isEditing ? '수정' : '등록'}</h1>

      <form onSubmit={handleSubmit} className="space-y-5 mb-8">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">상품명</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="예: 따뜻한 감성 머그컵"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="price" className="text-sm font-medium text-gray-700">가격</label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="예: 12900"
            value={form.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="image" className="text-sm font-medium text-gray-700">상품 이미지</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-xl bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">상품 설명</label>
          <textarea
            id="description"
            name="description"
            placeholder="상품에 대한 간단한 설명을 입력하세요"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-xl font-medium transition"
          >
            {isEditing ? '수정 완료' : '등록하기'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="w-32 bg-zinc-300 hover:bg-zinc-400 text-sm text-zinc-700 py-2 rounded-xl transition"
            >
              취소
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-4 text-gray-700">📋 등록된 상품 목록</h2>
      <ul className="space-y-3">
        {products.map((p) => (
          <li
            key={p.id}
            className="bg-white border rounded-xl p-4 shadow-sm text-sm text-gray-700 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-gray-400 text-xs">{p.price.toLocaleString()}원</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="text-xs text-blue-500 hover:underline"
              >
                ✏ 수정
              </button>
              <button
                onClick={() => removeProduct(p.id)}
                className="text-xs text-red-500 hover:underline"
              >
                🗑 삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
