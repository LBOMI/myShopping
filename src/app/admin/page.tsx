'use client';

import { useState } from 'react';
import { useProductStore } from '@/store/productStore';
import Link from 'next/link';

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState('');

  const [form, setForm] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { addProduct, updateProduct, removeProduct, products } = useProductStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    if (!form.name || !form.price || !form.image || !form.category) return;

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
        category: form.category,
      });
    }

    setForm({ name: '', price: '', image: '', description: '', category: '' });
  };

  const handleEdit = (product: any) => {
    setForm({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      description: product.description || '',
      category: product.category || '',
    });
    setEditingId(product.id);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setForm({ name: '', price: '', image: '', description: '', category: '' });
    setIsEditing(false);
    setEditingId(null);
  };

  const categoryOptions = [
    { value: 'shirt', label: '의류' },
    { value: 'pants', label: '바지' },
    { value: 'BaseballCap', label: '모자' },
    { value: 'Sneaker', label: '신발' },
    { value: 'DeviceMobile', label: '모바일 악세사리' },
  ];

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="p-6 max-w-xs w-full bg-white rounded-2xl shadow text-center space-y-4">
          <h1 className="text-xl font-bold text-blue-500">🔐 관리자 로그인</h1>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
          <button
            onClick={() => {
              if (pw === '1234') setAuth(true);
              else alert('비밀번호가 틀렸습니다!');
            }}
            className="w-full bg-blue-300 hover:bg-blue-400 text-white py-2 rounded-xl transition"
          >
            로그인
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-10">

        {/* 헤더 + 홈 이동 */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-blue-400 tracking-wide">
            📦 상품 {isEditing ? '수정' : '등록'}
          </h1>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-blue-400 underline"
          >
            홈으로 돌아가기 →
          </Link>
        </div>

        {/* 상품 등록 폼 */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow space-y-4">
          {[
            { id: 'name', label: '상품명', type: 'text', placeholder: '예: 따뜻한 감성 머그컵' },
            { id: 'price', label: '가격', type: 'number', placeholder: '예: 12900' },
          ].map(({ id, label, type, placeholder }) => (
            <div key={id} className="flex flex-col gap-1">
              <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
              <input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                value={form[id as keyof typeof form]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
              />
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <label htmlFor="image" className="text-sm font-medium text-gray-700">상품 이미지</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-xl bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
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
              className="w-full px-4 py-2 border rounded-xl bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="text-sm font-medium text-gray-700">카테고리</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
            >
              <option value="">카테고리를 선택하세요</option>
              {categoryOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="w-full bg-blue-300 hover:bg-blue-400 text-white py-2 rounded-xl font-medium transition"
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

        {/* 상품 리스트 */}
        <div>
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
                    className="text-xs text-blue-400 hover:underline"
                  >
                    ✏️ 수정
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
        </div>
      </div>
    </main>
  );
}
