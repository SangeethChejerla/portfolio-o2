'use client';

import { source } from '@/lib/source';
import { formatRelativeDate } from '@/lib/utils';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import Header from '../_components/Header';
import PageTransition from '../_components/PageTransition';

interface PostData {
  title: string;
  date: string;
  tags?: string[];
}

interface Page {
  url: string;
  slugs: string[];
  data: PostData;
}

type getPagesReturnType = Page[];
export type postType = Page;

export default function Page() {
  return (
    <section className="min-h-screen ">
      <Header
        title="Sangeeth's Development Notes"
        description="This is my blog, written for you"
        link={{ href: '/', text: 'Home' }}
      />
      <Suspense fallback={<LoadingSkeleton />}>
        <BlogList />
      </Suspense>
    </section>
  );
}

function BlogList() {
  const posts = source.getPages() as unknown as getPagesReturnType;
  const [query, setQuery] = useState<string>('');

  const searchIn = (text?: string) =>
    text?.toLowerCase().includes(query.toLowerCase());

  const filteredPosts = posts.filter(
    (post: postType) =>
      searchIn(post.data.title) ||
      (post.data.tags && post.data.tags.some((tag) => searchIn(tag)))
  );

  const tagList = filteredPosts.reduce((acc, post) => {
    const tags = post.data.tags || [];
    tags.forEach((tag) => {
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(post);
    });
    return acc;
  }, {} as Record<string, postType[]>);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-12 py-4 text-gray-100 
                     placeholder-gray-400 backdrop-blur-lg transition-all duration-300
                     focus:border-indigo-500 focus:bg-gray-800/70 focus:outline-none focus:ring-2 
                     focus:ring-indigo-500/20"
            placeholder="Search blog posts..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Blog Posts List */}
        <div className="space-y-6">
          {Object.keys(tagList).length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-xl bg-gray-800/50 backdrop-blur-lg">
              <p className="text-gray-400">No results found :/</p>
            </div>
          ) : (
            Object.keys(tagList).map((tag) => (
              <div
                key={tag}
                className="overflow-hidden rounded-xl bg-gray-800/30 backdrop-blur-lg 
                         transition-all duration-300 hover:bg-gray-800/50"
              >
                {/* Tag Header */}
                <div className="border-b border-gray-700/50 bg-gray-800/50 px-6 py-4">
                  <h2
                    className="inline-block rounded-lg bg-gradient-to-r from-indigo-500 
                              to-purple-500 px-4 py-1 text-sm font-medium text-white"
                  >
                    {tag}
                  </h2>
                </div>

                {/* Posts under tag */}
                <ul className="divide-y divide-gray-700/30">
                  {tagList[tag].map((post: postType) => (
                    <li
                      key={post.slugs.join('/')}
                      className="group transition-all duration-300 hover:bg-gray-800/30"
                    >
                      <Link href={post.url}>
                        <div className="flex items-center justify-between px-6 py-4">
                          <span className="text-gray-100 group-hover:text-indigo-400">
                            {post.data.title}
                          </span>
                          <span className="text-sm text-gray-400">
                            {formatRelativeDate(new Date(post.data.date))}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </PageTransition>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="h-12 w-full animate-pulse rounded-xl bg-gray-800/50" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-4 rounded-xl bg-gray-800/30 p-6">
          <div className="h-8 w-24 animate-pulse rounded-lg bg-gray-700/50" />
          {[1, 2, 3].map((j) => (
            <div
              key={j}
              className="h-12 w-full animate-pulse rounded-lg bg-gray-700/30"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
