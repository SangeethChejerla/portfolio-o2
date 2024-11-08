// components/mdx/Link.tsx
import Link from 'next/link';

export const HLink = ({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={`
      text-blue-500 hover:text-blue-600 transition-colors
      ${className}
    `}
    >
      {children}
    </Link>
  );
};
