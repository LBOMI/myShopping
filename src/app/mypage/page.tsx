'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getDoc, getDocs, collection, query, where, doc } from 'firebase/firestore';
import { app, db } from '@/firebase';
import { Product } from '@/types/product';

interface PurchaseItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Purchase {
  id: string;
  items: PurchaseItem[];
  totalAmount: number;
  purchasedAt: { seconds: number };
  // image: string;
}

const auth = getAuth(app);

export default function MyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [username, setUsername] = useState<string | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  // 유저 인증 확인
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status]);

  // 유저 정보, 구매내역 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!session?.user?.email) return;
  
        // username 불러오기 (users 컬렉션에서 email로 조회)
        const userQuery = query(
          collection(db, "users"),
          where("email", "==", session.user.email)
        );
        const userSnapshot = await getDocs(userQuery);
  
        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          setUsername(userData.username ?? "Guest");
        } else {
          setUsername("Guest");
        }
  
        // 구매내역 불러오기
        const q = query(
          collection(db, "purchases"),
          where("userId", "==", session.user.email)
        );
  
        const snapshot2 = await getDocs(q);
        const data = snapshot2.docs.map(doc => {
          const docData = doc.data();
          return {
            id: doc.id,
            items: docData.items ?? [],
            totalAmount: docData.totalAmount ?? 0,
            purchasedAt: docData.purchasedAt ?? { seconds: 0 },
          };
        }) as Purchase[];
  
        setPurchases(data);
      } catch (error) {
        console.error("마이페이지 데이터 불러오기 실패:", error);
      }
    };
  
    fetchUserData();
  }, [session?.user?.email]);
  
  

  if (status === 'loading') return <p>로딩 중...</p>;

  return (
    <div className="flex min-h-screen bg-white text-zinc-800">
      {/* 왼쪽 메뉴 */}
      <aside className="w-60 border-r border-zinc-200 p-6 space-y-6">
        <h2 className="text-xl font-bold">마이 페이지</h2>

        <div>
          <h3 className="text-sm text-blue-500 mb-2">쇼핑 정보</h3>
          <ul className="space-y-1 text-sm">
            <li>구매 내역</li>
            <li>관심 상품</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm text-blue-500 mb-2">내 정보</h3>
          <ul className="space-y-1 text-sm">
            <li>프로필 관리</li>
            <li>주소록</li>
            <li>결제 정보</li>
            <Link href="/delete">
              <li>회원 탈퇴</li>
            </Link>
          </ul>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-8 space-y-8">
        {/* 프로필 카드 */}
        <section className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">{username || 'Guest'}</h2>
            <p className="text-sm text-zinc-500">{session?.user?.email || 'email@example.com'}</p>
          </div>
          <div className="space-x-2 text-sm text-zinc-600">
            <button className="border rounded px-3 py-1">프로필 관리</button>
          </div>
        </section>

        {/* 요약 박스 */}
        <section className="grid grid-cols-4 gap-4 text-center text-sm">
          <SummaryBox title="등급" value="S" />
          <SummaryBox title="포인트" value="0P" />
          <SummaryBox title="쿠폰" value="10개" />
          <SummaryBox title="내 후기" value="0개" />
        </section>

        {/* 구매 내역 */}
        <section>
          <h3 className="text-lg font-semibold mb-4">구매 내역</h3>
          
          <div className="space-y-4">
            {purchases.length === 0 ? (
              <p className="text-sm text-zinc-500">구매 내역이 없습니다.</p>
            ) : (
              purchases.map((purchase) => (
                <div key={purchase.id} className="flex flex-col gap-2 border-b pb-4">
                  <p className="text-xs text-zinc-400">
  {purchase.purchasedAt?.seconds
    ? new Date(purchase.purchasedAt.seconds * 1000).toLocaleString()
    : "날짜 없음"}
</p>

{purchase.items.map((item, i) => (
  <Link key={i} href={`/product/${item.productId}`} className="block">
    <div className="flex justify-between hover:bg-zinc-50 p-2 rounded-lg transition">
      <div className="flex gap-3 items-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-xl bg-zinc-100"
        />
        <div>
          <p className="text-sm font-medium">{item.name}</p>
          <p className="text-xs text-zinc-500">
            {item.quantity}개 / {item.price.toLocaleString()}원
          </p>
        </div>
      </div>
    </div>
  </Link>
))}

                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function SummaryBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-zinc-100 rounded-xl p-4">
      <p className="text-zinc-500">{title}</p>
      <p className="font-semibold mt-1">{value}</p>
    </div>
  );
}
