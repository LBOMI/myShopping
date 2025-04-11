'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { app } from '@/firebase';

const auth = getAuth(app);
const db = getFirestore(app);

export default function SignUpPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const checkUsername = async () => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) return alert('아이디를 입력해주세요.');
    const ref = doc(db, 'usernames', trimmedUsername);
    const snapshot = await getDoc(ref);
    setUsernameAvailable(!snapshot.exists());
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (!trimmedUsername || !trimmedEmail) {
      alert('모든 필드를 입력해주세요.');
      setLoading(false);
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.');
      setLoading(false);
      return;
    }

    if (!usernameAvailable) {
      alert('아이디 중복 확인이 필요합니다.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      const user = userCredential.user;
      await sendEmailVerification(user);

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        username: trimmedUsername,
        createdAt: serverTimestamp(),
      });

      await setDoc(doc(db, 'usernames', trimmedUsername), {
        uid: user.uid,
      });

      alert('회원가입 성공! 이메일 인증을 완료해주세요.');
      router.push('/login');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        alert('이미 사용 중인 이메일입니다.');
      } else {
        alert('회원가입 실패: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 px-4">
      <form
        onSubmit={handleSignUp}
        className="backdrop-blur-sm bg-white/70 border border-white/30 shadow-lg p-8 rounded-2xl w-full max-w-md text-left"
      >
        <h2 className="text-3xl font-extrabold text-blue-400 mb-6 text-center">회원가입</h2>

        {/* 아이디 */}
        <label className="block text-sm text-gray-700 mb-1">아이디</label>
        <div className="flex mb-3">
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameAvailable(null);
            }}
            className="flex-grow p-2 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <button
            type="button"
            onClick={checkUsername}
            className="px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-r-xl transition-all"
          >
            중복 확인
          </button>
        </div>
        {usernameAvailable === true && (
          <p className="text-green-600 text-sm mb-2">사용 가능한 아이디입니다.</p>
        )}
        {usernameAvailable === false && (
          <p className="text-red-600 text-sm mb-2">이미 사용 중인 아이디입니다.</p>
        )}

        {/* 이메일 */}
        <label className="block text-sm text-gray-700 mb-1">이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded-xl border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />

        {/* 비밀번호 */}
        <label className="block text-sm text-gray-700 mb-1">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded-xl border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />

        {/* 비밀번호 재확인 */}
        <label className="block text-sm text-gray-700 mb-1">비밀번호 재확인</label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="w-full p-2 rounded-xl border border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />

        {/* 버튼 */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-violet-400 hover:bg-blue-500 text-white py-2 rounded-xl disabled:opacity-50 transition-all"
        >
          {loading ? '가입 중...' : '회원가입'}
        </button>

        {/* 로그인 링크 */}
        <p className="mt-6 text-sm text-gray-600 text-center">
          이미 계정이 있으신가요?{' '}
          <a href="/login" className="text-blue-500 hover:underline font-medium">
            로그인
          </a>
        </p>
      </form>
    </div>
  );
}
