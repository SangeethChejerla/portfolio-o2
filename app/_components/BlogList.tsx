'use client';

import { formatRelativeDate } from '@/lib/utils';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { BlogPost } from '../types';
import PageTransition from './PageTransition';

interface BlogListProps {
  initialPosts: BlogPost[];
}

export default function BlogList({ initialPosts }: BlogListProps): JSX.Element {
  const [query, setQuery] = useState<string>('');

  const searchIn = (text: string | undefined): boolean => {
    if (!text || !query) return false;
    return text.toLowerCase().includes(query.toLowerCase());
  };

  const filteredPosts = useMemo(() => {
    if (!query) return initialPosts;
    return initialPosts.filter(
      (post: BlogPost) =>
        searchIn(post.data.title) ||
        post.data.tags?.some((tag) => searchIn(tag))
    );
  }, [initialPosts, query]);

  const tagList = useMemo(() => {
    return filteredPosts.reduce<Record<string, BlogPost[]>>((acc, post) => {
      const tags = post.data.tags || [];
      tags.forEach((tag) => {
        if (!acc[tag]) {
          acc[tag] = [];
        }
        acc[tag].push(post);
      });
      return acc;
    }, {});
  }, [filteredPosts]);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <SearchBar query={query} setQuery={setQuery} />
        <TagList tagList={tagList} />
      </div>
    </PageTransition>
  );
}

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

function SearchBar({ query, setQuery }: SearchBarProps): JSX.Element {
  return (
    <div className="relative mb-8">
      <input
        type="search"
        className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-12 py-4 
                   text-gray-100 placeholder-gray-400 backdrop-blur-lg transition-all 
                   duration-300 focus:border-indigo-500 focus:bg-gray-800/70 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        placeholder="Search blog posts..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        aria-label="Search blog posts"
      />
      <MagnifyingGlassIcon
        className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />
    </div>
  );
}

interface TagListProps {
  tagList: Record<string, BlogPost[]>;
}

function TagList({ tagList }: TagListProps): JSX.Element {
  return (
    <div className="space-y-6">
      {Object.keys(tagList).length === 0 ? (
        <div
          className="flex h-40 items-center justify-center rounded-xl 
                      bg-gray-800/50 backdrop-blur-lg"
        >
          <p className="text-gray-400">No results found</p>
        </div>
      ) : (
        Object.entries(tagList).map(([tag, posts]) => (
          <TagSection key={tag} tag={tag} posts={posts} />
        ))
      )}
    </div>
  );
}

interface TagSectionProps {
  tag: string;
  posts: BlogPost[];
}

function TagSection({ tag, posts }: TagSectionProps): JSX.Element {
  return (
    <div
      className="overflow-hidden rounded-xl bg-gray-800/30 backdrop-blur-lg 
                   transition-all duration-300 hover:bg-gray-800/50"
    >
      <div className="border-b border-gray-700/50 bg-gray-800/50 px-6 py-4">
        <h2
          className="inline-block rounded-lg bg-gradient-to-r from-indigo-500 
                      to-purple-500 px-4 py-1 text-sm font-medium text-white"
        >
          {tag}
        </h2>
      </div>

      <ul className="divide-y divide-gray-700/30">
        {posts.map((post) => (
          <li
            key={post.slugs.join('/')}
            className="group transition-all 
                                                   duration-300 hover:bg-gray-800/30"
          >
            <Link href={post.url} className="block">
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-gray-100 group-hover:text-indigo-400">
                  {post.data.title}
                </span>
                <time
                  dateTime={post.data.date}
                  className="text-sm text-gray-400"
                >
                  {formatRelativeDate(new Date(post.data.date))}
                </time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
