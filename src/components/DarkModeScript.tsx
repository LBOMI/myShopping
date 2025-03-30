'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';

export default function DarkModeScript() {
  const { darkMode, initializeTheme } = useThemeStore();

  useEffect(() => {
    console.log('🌙 initializeTheme 실행!');
    initializeTheme(); // ✅ 최초 실행 시 localStorage 상태 복원
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return null;
}
