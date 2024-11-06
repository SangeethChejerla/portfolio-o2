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

// Main page component
export default async function Page({ params }: PageProps) {
  try {
    const { slug } = await params;
    console.log('Rendering page for slug:', slug); // Debugging slug

    if (!slug || slug.length === 0) {
      console.error('No slug provided!');
      notFound();
    }

    const post = source.getPage(slug) as Page | undefined;
    if (!post) {
      console.error(`Post not found for slug: ${slug}`);
      notFound();
    }

    // Build the index for the posts to navigate to previous and next
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

    // Get current post navigation
    const currentPostIndex = postsIndex[post.slugs.join('/')];
    const PostBody = post.data.body;

    // Ensure that there is content to render
    if (!PostBody) {
      console.error(`Post body not found for slug: ${slug}`);
      return <div>Content not available</div>;
    }

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
    console.error('Error during page render:', error);
    return <div>Something went wrong.</div>; // Fallback UI for errors
  }
}

// Static Params generation
export async function generateStaticParams() {
  try {
    const params = await source.generateParams();
    console.log('Generated static params:', params); // Debugging params
    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return []; // Return an empty array if there is an error
  }
}

// Metadata generation
export async function generateMetadata({ params }: PageProps) {
  try {
    const { slug } = await params;
    console.log('Generating metadata for slug:', slug);

    if (!slug || slug.length === 0) {
      console.error('No slug provided!');
      notFound();
    }

    const page = source.getPage(slug) as Page | undefined;
    if (!page) {
      console.error(`Page not found for slug: ${slug}`);
      notFound();
    }

    return NewMetadata({
      title: page.data.title,
      description: page.data.description,
      tags: page.data.tags,
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {}; // Return empty metadata in case of error
  }
}
