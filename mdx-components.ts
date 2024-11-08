import {
  Callout,
  ErrorCallout,
  InfoCallout,
  SuccessCallout,
  WarningCallout,
} from '@/app/_components/_blog/Callout';
import { CustomParagraph } from '@/app/_components/_blog/hand-written';
import defaultComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { HLink } from './app/_components/_blog/HLink';
import { HR } from './app/_components/_blog/Hr';
import { MDXImage } from './app/_components/_blog/Image';
import { List } from './app/_components/_blog/List';
import { Table } from './app/_components/_blog/Table';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
    CustomParagraph,
    Table,
    List,
    Callout,
    ErrorCallout,
    InfoCallout,
    SuccessCallout,
    WarningCallout,
    HR,
    HLink,
    MDXImage,
  };
}
