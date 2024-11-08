// sections/GallerySection.tsx
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GalleryItemType } from '@/types/fav-types';
import Image from 'next/image';

interface GallerySectionProps {
  items: GalleryItemType[];
  onItemClick: (item: GalleryItemType) => void;
}

const GallerySection = ({ items, onItemClick }: GallerySectionProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
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
            <CardTitle>{item.Title}</CardTitle>
            <div className="flex flex-wrap gap-2 mt-4">
              {item.Tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            {item.Date}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default GallerySection;
