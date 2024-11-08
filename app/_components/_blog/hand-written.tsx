// app/_components/_blog/hand-written.tsx
import { Gochi_Hand } from 'next/font/google';
import { ReactNode } from 'react';

const gochiHand = Gochi_Hand({
  subsets: ['latin'],
  weight: '400',
});

interface CustomParagraphProps {
  children: ReactNode;
}

export const CustomParagraph = ({ children }: CustomParagraphProps) => (
  <div className={gochiHand.className}>{children}</div>
);
