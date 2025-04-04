// MOA 프로젝트 초기 구조 설정 – 핀터레스트 감성 스타일링 (핑크 + 몽환)
"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/store/productStore";
import { useRouter } from "next/navigation";
import { saveRecentPlatform, loadRecentPlatforms } from "@/utils/localRecent";

export default function AddProductPage() {
  const router = useRouter();
  const { addProduct } = useProductStore();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("");
  const [recentPlatforms, setRecentPlatforms] = useState<string[]>([]);
  const [price, setPrice] = useState("");

  useEffect(() => {
    setRecentPlatforms(loadRecentPlatforms());
  }, []);

  const handleSubmit = () => {
    const newProduct = {
      name,
      image,
      url,
      platform: platform.trim(),
      price: price ? parseInt(price) : 0,
      isFavorite: false,
      inCart: false,
      createdAt: new Date().toISOString(),
    };

    saveRecentPlatform(platform);
    addProduct(newProduct);
    router.push("/");
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white flex justify-center px-4 py-10">
      <div className="w-full max-w-xl space-y-6 bg-white/80 backdrop-blur-xl border border-pink-100 rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-extrabold text-pink-600 text-center mb-2 tracking-wider">상품 등록</h2>

        <div>
          <p className="text-xs text-pink-500 mb-1">상품명</p>
          <input
            className="w-full border border-pink-200 rounded-xl p-3 bg-white placeholder-pink-300 text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="예: 러블리 니트 가디건"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <p className="text-xs text-pink-500 mb-1">이미지 URL</p>
          <input
            className="w-full border border-pink-200 rounded-xl p-3 bg-white placeholder-pink-300 text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="예: https://image.com/item.jpg"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div>
          <p className="text-xs text-pink-500 mb-1">상품 링크(URL)</p>
          <input
            className="w-full border border-pink-200 rounded-xl p-3 bg-white placeholder-pink-300 text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="예: https://platform.com/item"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

       {recentPlatforms.length > 0 && (
        <div className="text-xs text-pink-400 mb-1">
          최근 입력: {" "}
          {recentPlatforms.map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className="text-pink-600 underline mr-2 hover:text-pink-800"
            >
              {p}
            </button>
          ))}
        </div>
       )}
        <div>
          <p className="text-xs text-pink-500 mb-1">플랫폼 이름 (예: 무신사)</p>
          <input
            className="w-full border border-pink-200 rounded-xl p-3 bg-white placeholder-pink-300 text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="예: 무신사, 쿠팡, 오늘의집 등"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />
        </div>

        <div>
          <p className="text-xs text-pink-500 mb-1">가격 (선택)</p>
          <input
            className="w-full border border-pink-200 rounded-xl p-3 bg-white placeholder-pink-300 text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="예: 29000"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-pink-400 text-white font-semibold p-3 rounded-xl shadow-lg hover:bg-pink-500 transition"
        >
          등록하기 💖
        </button>
      </div>
    </div>
  );
}