// src/components/entry-list.tsx
import { db } from '@/db/db';
import { guestbook } from '@/db/schema';
import { desc } from 'drizzle-orm';

async function getEntries() {
  try {
    return await db
      .select()
      .from(guestbook)
      .orderBy(desc(guestbook.createdAt))
      .limit(50); // Optional: limit the number of entries
  } catch (error) {
    console.error('Error fetching entries:', error);
    return [];
  }
}

export async function EntryList() {
  const entries = await getEntries();

  if (!entries.length) {
    return (
      <div className="text-center p-4 text-gray-500">
        No entries yet. Be the first to sign!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm"
        >
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {entry.authorName}
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            {entry.message}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {new Date(entry.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      ))}
    </div>
  );
}
