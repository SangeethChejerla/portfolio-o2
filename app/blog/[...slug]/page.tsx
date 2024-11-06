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
  params: Promise<{ slug: string[] }>;
}

interface PostIndex extends Page {
  previous: Page | null;
  next: Page | null;
}

export default async function Page({ params }: PageProps) {
  try {
    const { slug } = await params; // Destructure slug from params

    if (!slug || slug.length === 0) {
      console.error('No slug provided in params.');
      notFound();
    }

    const post = source.getPage(slug) as Page | undefined;
    if (!post) {
      console.error(`Post not found for slug: ${slug}`);
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
  } catch (error) {
    console.error('Error occurred while rendering the page:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const params = await source.generateParams();
    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const { slug } = await params; // Destructure slug from params

    if (!slug || slug.length === 0) {
      console.error('No slug provided in params for metadata.');
      notFound();
    }

    const page = source.getPage(slug) as Page | undefined;
    if (!page) {
      console.error(`Metadata not found for slug: ${slug}`);
      notFound();
    }

    return NewMetadata({
      title: page.data.title,
      description: page.data.description,
      tags: page.data.tags,
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    notFound();
  }
}
