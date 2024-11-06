import { remarkInstall } from 'fumadocs-docgen';
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  type DefaultMDXOptions,
} from 'fumadocs-mdx/config';
import { z } from 'zod';

export const { docs, meta } = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: frontmatterSchema.extend({
      date: z
        .string()
        .or(z.date())
        .transform((value, context) => {
          try {
            return new Date(value);
          } catch {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Invalid date',
            });
            return z.NEVER;
          }
        }),
      tags: z.array(z.string()).optional(),
    }),
  },
});

const mdxOptions: DefaultMDXOptions = {
  remarkPlugins: [remarkInstall],
  rehypePlugins: (v) => [...v],
};

export default defineConfig({
  lastModifiedTime: 'git',
  mdxOptions: mdxOptions,
  generateManifest: false,
});
