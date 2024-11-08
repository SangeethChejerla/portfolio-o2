// components/mdx/List.tsx
export const List = ({
  ordered = false,
  children,
}: {
  ordered?: boolean;
  children: React.ReactNode;
}) => {
  const Tag = ordered ? 'ol' : 'ul';

  return (
    <Tag
      className={`my-6 ml-6 space-y-2 ${
        ordered ? 'list-decimal' : 'list-disc'
      } text-neutral-800 dark:text-neutral-200`}
    >
      {children}
    </Tag>
  );
};
