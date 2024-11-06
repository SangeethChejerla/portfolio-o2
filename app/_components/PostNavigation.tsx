// components/PostNavigation.tsx
'use client';

import Link from 'next/link';

interface PostNavigationProps {
  previous: {
    url: string;
    title: string;
  } | null;
  next: {
    url: string;
    title: string;
  } | null;
}

export default function PostNavigation({
  previous,
  next,
}: PostNavigationProps) {
  return (
    <section className="mt-32">
      <hr className="my-8" />
      <div className="flex flex-col justify-center items-center mb-8">
        <h2 className="opacity-60">Previous Post / Next Post</h2>
      </div>
      <div className="flex justify-between">
        {previous && (
          <Link
            href={previous.url}
            className="text-primary hover:bg-secondary/100 rounded-md px-2 py-1"
          >
            ← {previous.title}
          </Link>
        )}

        {next && (
          <Link
            href={next.url}
            className="text-primary hover:bg-secondary/100 rounded-md px-2 py-1"
          >
            {next.title} →
          </Link>
        )}
      </div>
    </section>
  );
}
