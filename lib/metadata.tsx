import type { Metadata } from 'next';

// Extend the Metadata type to include tags
declare module 'next' {
  interface Metadata {
    tags?: string[];
  }
}

export default function NewMetadata({
  title,
  description,
  tags,
}: {
  title?: string;
  description?: string;
  tags?: string[];
}): Metadata {
  return {
    metadataBase: new URL(
      process.env.PUBLIC_BASE_URL
        ? process.env.PUBLIC_BASE_URL
        : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${process.env.PORT ?? 3_000}`
    ),
    title: title,
    description: description,
    keywords: [
      'blog',
      'AI',
      'Next.js',
      'Web development',
      'Leetcode',
      'frontend',
      'backend',

      ...(tags || []),
    ],
    openGraph: {
      type: 'website',
      locale: 'india',
      siteName: "Aryayama's blog",
      title: title,
      description: description,
      images: '/og-image.png',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      creator: '@Aryayama Nyx',
      images: '/og-image.png',
    },
    formatDetection: {
      telephone: false,
    },
    tags: tags, // Now this is valid because we've extended the Metadata type
  };
}
