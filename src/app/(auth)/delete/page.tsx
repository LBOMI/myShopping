"use client";

import { useState } from "react";
import { EmailAuthProvider, reauthenticateWithCredential, getAuth, deleteUser, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getFirestore, doc, deleteDoc } from "firebase/firestore"; // Firebase Firestore 가져오기

export default function DeleteAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  //회원 인증
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [needsReauth, setNeedsReauth] = useState(false);

  //회원 탈퇴 버튼
  const [buttonText, setButtonText] = useState("회원 탈퇴");

  const handleDelete = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();

    if (!user) {
      setError("사용자 정보가 없습니다.");
      return;
    }

    setLoading(true);

    try {
      if (needsReauth) {
        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(user, credential);
      }

      await deleteDoc(doc(db, "users", user.uid));

      await deleteUser(user);
      await signOut(auth); //로그아웃
      alert("탈퇴가 완료되었습니다.");
      router.push("/");
    } catch (err: any) {
      if (err.code === "auth/requires-recent-login") {
        setNeedsReauth(true); //재인증 입력 UI 표시
        setError("보안을 위해 다시 로그인해주세요.");
      } else {
        setError("탈퇴 중 오류가 발생했습니다.");
      }
    }
    setLoading(false);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 px-4">
      <div className="bg-white bg-opacity-70 p-8 rounded-2xl shadow-xl max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">정말 탈퇴하시겠어요?</h1>
        <p className="mb-6 text-sm text-gray-600">
          탈퇴하시면 모든 정보가 삭제되며 복구되지 않습니다.  
        </p>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {needsReauth && (
            <div className="mt-4">
                <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-xl border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400"
                />
                <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-xl border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400"
                />
            </div>
        )}

        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          {loading ? "탈퇴 중..." : buttonText}
        </button>

        <button
          onClick={handleCancel}
          disabled={loading}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold ml-2 py-2 px-4 rounded-lg transition"
        >
         취소
        </button>
      </div>
    </div>
  );
}
