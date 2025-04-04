import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import toast, { Toaster } from 'react-hot-toast';

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
        <Toaster position='top-center' 
          toastOptions={{ 
            style: {
              background: '#fff0f6',
              color: '#d63384',
              border: '1px solid #faa2c1',
            },
            iconTheme: {
              primary: '#f06595',
              secondary: '#fff0f6',
            },
            duration: 2000,
          }}/>
      </body>
    </html>
  );
}
