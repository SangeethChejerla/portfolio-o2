import PageTransition from '@/app/_components/PageTransition';
import PostNavigation from '@/app/_components/PostNavigation';
import NewMetadata from '@/lib/metadata';
import { source } from '@/lib/source';
import { formatRelativeDate } from '@/lib/utils';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Header from '../../_components/Header';

interface PostData {
  title: string;
  date: Date;
  description?: string;
  tags?: string[];
  body: React.ComponentType<any>;
}

interface Page {
  url: string;
  slugs: string[];
  data: PostData;
}

interface PageProps {
  params: {
    slug: string[];
  };
}

interface PostIndex extends Page {
  previous: Page | null;
  next: Page | null;
}

export default async function Page({ params }: PageProps) {
  // Await for params
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const post = source.getPage(slug) as Page | undefined;
  if (!post) {
    notFound();
  }

  const posts = source.getPages();
  const postsIndex = posts.reduce<Record<string, PostIndex>>(
    (acc, post, index) => {
      acc[post.slugs.join('/')] = {
        ...post,
        previous: posts[index - 1] || null,
        next: posts[index + 1] || null,
      };
      return acc;
    },
    {}
  );

  const currentPostIndex = postsIndex[post.slugs.join('/')];
  const PostBody = post.data.body;

  return (
    <PageTransition>
      <section>
        <Header
          title={post.data.title}
          description={
            post.data.description ??
            formatRelativeDate(new Date(post.data.date))
          }
          link={{ href: '/blog', text: 'blog' }}
        />

        <Suspense fallback={<div>Loading...</div>}>
          <DocsBody>
            <PostBody
              data-animate
              data-animate-speed="fast"
              className="mdx"
              components={{ ...defaultMdxComponents, Tab, Tabs }}
            />
          </DocsBody>
        </Suspense>

        <PostNavigation
          previous={
            currentPostIndex.previous
              ? {
                  url: currentPostIndex.previous.url,
                  title: currentPostIndex.previous.data.title,
                }
              : null
          }
          next={
            currentPostIndex.next
              ? {
                  url: currentPostIndex.next.url,
                  title: currentPostIndex.next.data.title,
                }
              : null
          }
        />
      </section>
    </PageTransition>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: PageProps) {
  // Await for params
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const page = source.getPage(slug) as Page | undefined;
  if (!page) {
    notFound();
  }

  return NewMetadata({
    title: page.data.title,
    description: page.data.description,
    tags: page.data.tags,
  });
}
