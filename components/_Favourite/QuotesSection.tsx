import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { QuoteType } from '@/types/fav-types';

interface QuotesSectionProps {
  items: QuoteType[];
  onItemClick: (item: QuoteType) => void;
}

const QuotesSection = ({ items, onItemClick }: QuotesSectionProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((quote) => (
        <Card
          key={quote.id}
          className="cursor-pointer"
          onClick={() => onItemClick(quote)}
        >
          <CardContent className="p-6">
            <blockquote className="mb-4 italic">
              &ldquo;{quote.Quote}&rdquo;
            </blockquote>
            <p className="text-sm text-muted-foreground">- {quote.SaidBy}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {quote.Tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuotesSection;
