'use client';

import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { formatRelativeDate } from '@/lib/utils';
import { BlogPost } from '../types';
import Header from './Header';
import PageTransition from './PageTransition';
import PostNavigation from './PostNavigation';

interface ClientPageProps {
  post: BlogPost;
  previousPost: BlogPost | null;
  nextPost: BlogPost | null;
}

export default function ClientBlogPostPage({
  post,
  previousPost,
  nextPost,
}: ClientPageProps): JSX.Element {
  if (!post) {
    notFound();
  }

  return (
    <section className="min-h-screen">
      <Header
        title={post.data.title}
        description={post.data.description}
        link={{ href: '/blog', text: 'Back to Blog' }}
      />

      <Suspense fallback={<BlogPostSkeleton />}>
        <PageTransition>
          <article className="container mx-auto px-4 py-8">
            <BlogPostMetadata post={post} />
            <BlogPostContent content={post.content} />
            <BlogPostFooter previousPost={previousPost} nextPost={nextPost} />
          </article>
        </PageTransition>
      </Suspense>
    </section>
  );
}

function BlogPostMetadata({ post }: { post: BlogPost }): JSX.Element {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap gap-2">
        {post.data.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 
                     px-3 py-1 text-sm font-medium text-white"
          >
            {tag}
          </span>
        ))}
      </div>
      <time dateTime={post.data.date} className="text-sm text-gray-400">
        {formatRelativeDate(new Date(post.data.date))}
      </time>
    </div>
  );
}

function BlogPostContent({ content }: { content: any }): JSX.Element {
  return (
    <div
      className="prose prose-invert max-w-none prose-pre:bg-gray-800/50 
                    prose-pre:backdrop-blur-lg prose-code:text-indigo-400"
    >
      <DocsBody content={content} components={defaultMdxComponents} />
    </div>
  );
}

function BlogPostFooter({
  previousPost,
  nextPost,
}: {
  previousPost: BlogPost | null;
  nextPost: BlogPost | null;
}): JSX.Element {
  return (
    <div className="mt-16 border-t border-gray-700/50 pt-8">
      <PostNavigation
        previous={
          previousPost
            ? {
                url: previousPost.url,
                title: previousPost.data.title,
              }
            : null
        }
        next={
          nextPost
            ? {
                url: nextPost.url,
                title: nextPost.data.title,
              }
            : null
        }
      />
    </div>
  );
}

function BlogPostSkeleton(): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-800/50" />
        <div className="h-4 w-24 animate-pulse rounded-lg bg-gray-800/30" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="h-24 w-full animate-pulse rounded-lg bg-gray-800/30"
          />
        ))}
      </div>
    </div>
  );
}
