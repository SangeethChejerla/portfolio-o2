// src/app/page.tsx
import { EntryForm } from '@/components/entry-form';
import { EntryList } from '@/components/entry-list';
import { SignInButton, SignOutButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { Suspense } from 'react';
import Header from '../_components/Header';

export default async function Home() {
  const { userId } = await auth();

  return (
    <main className="max-w-2xl mx-auto p-4 py-8">
      <Header link={{ href: '/', text: 'Home' }} />

      <h1 className="text-4xl font-bold mb-8">Guestbook</h1>

      {!userId ? (
        <div className="flex justify-center">
          <SignInButton mode="modal" />{' '}
        </div>
      ) : (
        <div className="space-y-4">
          <SignOutButton />
          <EntryForm />
        </div>
      )}

      <div className="mt-8">
        <Suspense
          fallback={
            <div className="text-center p-4 text-gray-500">
              Loading entries...
            </div>
          }
        >
          <EntryList />
        </Suspense>
      </div>
    </main>
  );
}
