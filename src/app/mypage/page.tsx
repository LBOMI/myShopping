'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '@/firebase';

const auth = getAuth(app);
const db = getFirestore(app);
export default function MyPage() {
    const {data: session, status } = useSession();
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);


    useEffect(() => {
      const fetchUsername = async () => {
        const user = auth.currentUser;
        if (!user) return;
  
        const ref = doc(db, 'users', user.uid);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setUsername(data.username); // username 가져오기
        }
      };
  
      fetchUsername();
    }, []);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status]);

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
            {/* <li>로그인 정보</li> */}
            <li>프로필 관리</li>
            <li>주소록</li>
            <li>결제 정보</li>
            <Link
              href="/delete"
              >
               <li>회원 탈퇴</li> 
              </Link>
            
            {/* <li>영수증 정보</li> */}
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
            {/* <button className="border rounded px-3 py-1">내 스타일</button> */}
          </div>
        </section>

        {/* 판매/쿠폰/친구초대 등 요약 영역 */}
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
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-zinc-200 rounded-xl" />
                  <div>
                    <p className="text-sm font-medium">Adidas Samba OG White</p>
                    <p className="text-xs text-zinc-500">W255</p>
                  </div>
                </div>
                <div className="text-xs text-zinc-400 text-right">
                  <p>24/07/06</p>
                  <button className="text-blue-400 hover:underline">스타일 올리기</button>
                </div>
              </div>
            ))}
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