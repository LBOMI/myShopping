// app/layout.tsx or app/rootlayout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Providers from './providers'; // 방금 만든 client component

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
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
