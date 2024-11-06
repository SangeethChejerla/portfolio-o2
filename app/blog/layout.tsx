import type { ReactNode } from 'react';

import NewMetadata from '@/lib/metadata';

export const metadata = NewMetadata({
  title: 'Sangeeth | blog',
  description: 'knowledge is for sharing.',
});

export default function Layout({ children }: { children: ReactNode }) {
  // return (
  //   <DocsLayout tree={source.pageTree} {...baseOptions}>
  //     {children}
  //   </DocsLayout>
  // );

  return children;
}
