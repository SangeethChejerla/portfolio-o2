import PageTransition from '@/app/_components/PageTransition';
import NewMetadata from '@/lib/metadata';
import { source } from '@/lib/source';
import { formatRelativeDate } from '@/lib/utils';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DocsBody } from 'fumadocs-ui/page';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '../../_components/Header';

interface PostData {
  title: string;
  date: string;
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
  params: Promise<{
    slug: string[];
  }>;
}

interface PostIndex extends Page {
  previous: Page | null;
  next: Page | null;
}

export default async function Page(props: PageProps) {
  const { slug } = await props.params;

  if (!slug) {
    notFound();
  }

  const post = source.getPage(slug) as Page | undefined;
  if (!post) {
    notFound();
  }

  // Get all posts and create the index with proper typing
  const posts = source.getPages() as unknown as Page[];
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

        <DocsBody>
          <PostBody
            data-animate
            data-animate-speed="fast"
            className="mdx"
            components={{ ...defaultMdxComponents, Tab, Tabs }}
          />
        </DocsBody>

        <section className="mt-32">
          <hr className="my-8" />
          <div className="flex flex-col justify-center items-center mb-8">
            <h2 className="opacity-60">Previous Post / Next Post</h2>
          </div>
          <div className="flex justify-between">
            {currentPostIndex.previous && (
              <Link
                href={currentPostIndex.previous.url}
                className="text-primary hover:bg-secondary/100 rounded-md px-2 py-1"
              >
                ← {currentPostIndex.previous.data.title}
              </Link>
            )}

            {currentPostIndex.next && (
              <Link
                href={currentPostIndex.next.url}
                className="text-primary hover:bg-secondary/100 rounded-md px-2 py-1"
              >
                {currentPostIndex.next.data.title} →
              </Link>
            )}
          </div>
        </section>
      </section>
    </PageTransition>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps) {
  const { slug } = await props.params;

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
