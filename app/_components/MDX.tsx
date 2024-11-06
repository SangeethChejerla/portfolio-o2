import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DocsBody } from 'fumadocs-ui/page';

interface MDXContentProps {
  content: string;
}

interface CustomDocsBodyProps {
  content: string;
  components: any; // Define this properly based on your components' structure
}

const CustomDocsBody = ({ content, components }: CustomDocsBodyProps) => {
  return <DocsBody content={content}>{content}</DocsBody>;
};

export default function MDXContent({ content }: MDXContentProps) {
  return (
    <CustomDocsBody
      content={content}
      components={{
        ...defaultMdxComponents,
        Tab,
        Tabs,
      }}
    />
  );
}
