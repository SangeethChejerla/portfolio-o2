import { Card, CardContent } from '@/components/ui/card';
import { QuoteType } from '@/types/fav-types';
import React from 'react';

interface QuotesSectionProps {
  items: QuoteType[];
}

const QuotesSection: React.FC<QuotesSectionProps> = ({ items }) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
      {items.map((quote) => (
        <Card
          key={quote.id}
          className="cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-black text-white"
        >
          <CardContent className="p-6 flex flex-col">
            <blockquote className="mb-2 text-lg leading-relaxed italic">
              &ldquo;{quote.Quote}&rdquo;
            </blockquote>
            <cite className="text-sm font-semibold italic">
              — {quote.SaidBy}
            </cite>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuotesSection;
