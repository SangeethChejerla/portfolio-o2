import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: 'Aryayama Nyx',
  },
  links: [
    {
      text: 'blog',
      url: '/blog',
      active: 'nested-url',
    },
    {
      text: 'favourite',
      url: '/favourite',
      active: 'nested-url',
    },
    {
      text: 'guestbook',
      url: '/guestbook',
      active: 'nested-url',
    },
  ],
};
