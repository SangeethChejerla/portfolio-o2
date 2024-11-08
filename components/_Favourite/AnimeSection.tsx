// sections/AnimeSection.tsx
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AnimeType } from '@/types/fav-types';
import Image from 'next/image';

interface AnimeSectionProps {
  items: AnimeType[];
  onItemClick: (item: AnimeType) => void;
}

const AnimeSection = ({ items, onItemClick }: AnimeSectionProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((anime) => (
        <Card
          key={anime.id}
          className="overflow-hidden cursor-pointer"
          onClick={() => onItemClick(anime)}
        >
          <CardHeader className="p-0">
            <Image
              src={anime.Image}
              alt={anime.AnimeName}
              width={400}
              height={200}
              className="object-cover w-full h-48"
            />
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle>{anime.AnimeName}</CardTitle>

            <div className="flex gap-2 mt-4">
              {anime.Genre.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Badge variant="outline">Rating: {anime.Rankings}/10</Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default AnimeSection;
