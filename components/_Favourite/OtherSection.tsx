// sections/OtherSection.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { OtherItemType } from '@/types/fav-types';
import Image from 'next/image';

interface OtherSectionProps {
  items: OtherItemType[];
  onItemClick: (item: OtherItemType) => void;
}

const OtherSection = ({ items, onItemClick }: OtherSectionProps) => {
  const otherCategories = [...new Set(items.map((item) => item.sub_category))];

  return (
    <div className="grid gap-8">
      {otherCategories.map((category) => (
        <div key={category}>
          <h3 className="mb-4 text-2xl font-bold">{category}</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items
              .filter((item) => item.sub_category === category)
              .map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden cursor-pointer"
                  onClick={() => onItemClick(item)}
                >
                  <CardHeader className="p-0">
                    <Image
                      src={item.Image}
                      alt={item.Title}
                      width={400}
                      height={200}
                      className="object-cover w-full h-48"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <h4 className="text-lg font-semibold">{item.Title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      By {item.Artist}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Year: {item.Year}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OtherSection;
