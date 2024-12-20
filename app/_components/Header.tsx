// Header.tsx
import { Backlink } from './Link';
type HeaderProps = {
  title?: string;
  description?: string;
  link?: {
    href: string;
    text: string;
  };
};

export default function Header({ title, description, link }: HeaderProps) {
  return (
    <header className="mb-10 space-y-1">
      {link ? (
        <div data-animate data-animate-speed="fast">
          <Backlink text={link.text} href={link.href} />
        </div>
      ) : (
        <div className="invisible">.</div>
      )}
      <h1 className=" flex flex-wrap items-center break-all text-bold text-4xl">
        {title}
      </h1>
      {description && (
        <p className="text-sm text-gray-400 w-full">{description}</p>
      )}
    </header>
  );
}
