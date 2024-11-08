export const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full overflow-x-auto my-8">
      <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
        {children}
      </table>
    </div>
  );
};

export const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500 dark:text-neutral-400 tracking-wider">
    {children}
  </th>
);

export const Td = ({ children }: { children: React.ReactNode }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800 dark:text-neutral-200">
    {children}
  </td>
);
