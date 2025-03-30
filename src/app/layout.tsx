import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import DarkModeScript from '@/components/DarkModeScript';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MyShop',
  description: 'Next.js Shopping Mall App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
