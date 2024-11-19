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
        <div key={anime.id} className="overflow-hidden cursor-pointer">
          <Card
            onClick={() => onItemClick(anime)}
            className="transition-all duration-300 hover:shadow-xl transform hover:scale-105"
          >
            <CardHeader className="p-0 relative">
              <Image
                src={anime.Image}
                alt={anime.AnimeName}
                width={400}
                height={200}
                className="object-cover w-full h-48"
                placeholder="blur"
                blurDataURL="/path/to/placeholder.jpg"
              />
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-bold">
                {anime.AnimeName}
              </CardTitle>
              <div className="flex flex-wrap gap-2 mt-4">
                {anime.Genre.map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="transition-all duration-300 hover:scale-110"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Badge
                variant="outline"
                className="transition-all duration-300 hover:scale-110"
              >
                Ranking: {anime.Rankings}
              </Badge>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default AnimeSection;
