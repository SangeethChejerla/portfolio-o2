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

// Define the structure of your post data
interface PostData {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  body: any; // Adjust type if you have a more specific type for MDX content
}

// Define the structure of a page from source.getPage()
interface Page {
  url: string;
  slugs: string[];
  data: PostData;
}

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const post = source.getPage(params.slug) as Page | undefined;
  const posts = source.getPages() as unknown as Page[];
  if (!post) {
    notFound();
  }

  const postsIndex = posts.reduce((acc, post, index) => {
    acc[post.slugs.join('/')] = {
      ...post,
      previous: posts[index - 1] || null,
      next: posts[index + 1] || null,
    };
    return acc;
  }, {} as Record<string, { previous: Page | null; next: Page | null } & Page>);

  return (
    <PageTransition>
      <section>
        <Header
          title={post.data.title}
          description={
            post.data.description === undefined
              ? formatRelativeDate(new Date(post.data.date))
              : post.data.description
          }
          link={{ href: '/blog', text: 'blog' }}
        />

        <DocsBody>
          <post.data.body
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
            {postsIndex[post.slugs.join('/')].previous && (
              <Link
                href={postsIndex[post.slugs.join('/')].previous!.url}
                className="text-primary hover:bg-secondary/100 rounded-md px-2 py-1"
              >
                ← {postsIndex[post.slugs.join('/')].previous!.data.title}
              </Link>
            )}

            {postsIndex[post.slugs.join('/')].next && (
              <Link
                href={postsIndex[post.slugs.join('/')].next!.url}
                className="text-primary hover:bg-secondary/100 rounded-md px-2 py-1"
              >
                {postsIndex[post.slugs.join('/')].next!.data.title} →
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

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug) as Page | undefined;
  if (!page) {
    notFound();
  }

  return NewMetadata({
    title: page.data.title,
    description: page.data.description,
    tags: page.data.tags, // Assuming NewMetadata accepts tags
  });
}
