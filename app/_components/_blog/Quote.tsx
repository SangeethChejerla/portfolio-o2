export const Quote = ({ children }: { children: React.ReactNode }) => {
  return (
    <blockquote className="pl-6 my-6 border-l-2 border-neutral-300 dark:border-neutral-700 italic text-neutral-600 dark:text-neutral-300">
      {children}
    </blockquote>
  );
};
