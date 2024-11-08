'use client';

import { EyeOpenIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

export function ViewCounter({
  slug,
  initialCount,
}: {
  slug: string;
  initialCount: number;
}) {
  const [views, setViews] = useState(initialCount);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        const response = await fetch('/api/views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        });

        if (!response.ok) throw new Error('Failed to increment views');

        const data = await response.json();
        setViews(data.count);
      } catch (error) {
        console.error('Failed to increment view count:', error);
      }
    };

    incrementViews();
  }, [slug]);

  return (
    <div className="mb-8 flex items-center justify-end dark:text-white">
      <EyeOpenIcon className="mr-2 h-5 w-5" />
      <span>{views} views</span>
    </div>
  );
}
