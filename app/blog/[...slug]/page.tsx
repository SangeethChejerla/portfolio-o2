import Header from '@/app/_components/Header';
import PageTransition from '@/app/_components/PageTransition';
import NewMetadata from '@/lib/metadata';
import { source } from '@/lib/source';
import { formatRelativeDate } from '@/lib/utils';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DocsBody } from 'fumadocs-ui/page';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PostData {
  title: string;
  date: string;
  description?: string;
  body: React.ComponentType<any>;
  tags?: string[];
}

interface Post {
  url: string;
  slugs: string[];
  data: PostData;
}

interface PostWithNavigation extends Post {
  previous: Post | null;
  next: Post | null;
}

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;

  const post = source.getPage(params.slug);
  const posts = source.getPages();

  if (!post) notFound();

  const formattedPost = {
    ...post,
    data: {
      ...post.data,
      date: formatRelativeDate(post.data.date),
    },
  };

  const MDX = formattedPost.data.body;
  const postsIndex = posts.reduce<Record<string, PostWithNavigation>>(
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

  const currentPost = postsIndex[formattedPost.slugs.join('/')];

  return (
    <section className="min-h-screen">
      <Header
        title={post.data.title}
        description={
          post.data.description || formatRelativeDate(post.data.date)
        }
        link={{ href: '/blog', text: 'Back to Blog' }}
      />

      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          {/* Tags */}
          {post.data.tags && (
            <div className="mb-8 flex flex-wrap gap-2">
              {post.data.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 
                           px-4 py-1 text-sm font-medium text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Main Content */}
          <div className="rounded-xl  p-8 ">
            <DocsBody>
              <MDX
                data-animate
                data-animate-speed="fast"
                className="prose prose-invert max-w-none"
                components={{ ...defaultMdxComponents, Tab, Tabs }}
              />
            </DocsBody>
          </div>

          {/* Navigation */}
          <div className="mt-16 space-y-4">
            <div className="flex justify-center">
              <h2 className="text-gray-400">Previous / Next Posts</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {currentPost.previous && (
                <Link
                  href={currentPost.previous.url}
                  className="group flex items-center gap-2 rounded-xl bg-gray-800/30 p-4 
                           backdrop-blur-lg transition-all duration-300 hover:bg-gray-800/50"
                >
                  <ArrowLeftIcon className="h-5 w-5 text-gray-400 group-hover:text-indigo-400" />
                  <span className="text-gray-100 group-hover:text-indigo-400">
                    {currentPost.previous.data.title}
                  </span>
                </Link>
              )}

              {currentPost.next && (
                <Link
                  href={currentPost.next.url}
                  className="group flex items-center justify-end gap-2 rounded-xl 
                           bg-gray-800/30 p-4 backdrop-blur-lg transition-all 
                           duration-300 hover:bg-gray-800/50"
                >
                  <span className="text-gray-100 group-hover:text-indigo-400">
                    {currentPost.next.data.title}
                  </span>
                  <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-indigo-400" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </PageTransition>
    </section>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return NewMetadata({
    title: page.data.title,
    description: page.data.description,
  });
}
