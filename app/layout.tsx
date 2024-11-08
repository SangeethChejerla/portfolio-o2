import { ClerkProvider } from '@clerk/nextjs';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import './global.css';
const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className} suppressHydrationWarning>
        <body className="flex flex-col min-h-screen">
          <RootProvider>
            {' '}
            <main className="w-full mx-auto px-4 min-h-screen max-w-3xl py-12">
              {children}
            </main>
          </RootProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
