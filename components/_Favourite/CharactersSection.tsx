// sections/CharactersSection.tsx
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CharacterType } from '@/types/fav-types';
import Image from 'next/image';

interface CharactersSectionProps {
  items: CharacterType[];
  onItemClick: (item: CharacterType) => void;
}

const CharactersSection = ({ items, onItemClick }: CharactersSectionProps) => {
  const maleCharacters = items.filter((char) => char.Gender === 'Male');
  const femaleCharacters = items.filter((char) => char.Gender === 'Female');

  return (
    <div className="grid gap-8">
      <div>
        <h3 className="mb-4 text-2xl font-bold">Male Characters</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {maleCharacters.map((character) => (
            <Card
              key={character.id}
              className="overflow-hidden cursor-pointer"
              onClick={() => onItemClick(character)}
            >
              <CardHeader className="p-0">
                <Image
                  src={character.Image}
                  alt={character.Name}
                  width={400}
                  height={200}
                  className="object-cover w-full h-48"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle>{character.Name}</CardTitle>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">Rating: {character.Ranking}/10</Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-2xl font-bold">Female Characters</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {femaleCharacters.map((character) => (
            <Card
              key={character.id}
              className="overflow-hidden cursor-pointer"
              onClick={() => onItemClick(character)}
            >
              <CardHeader className="p-0">
                <Image
                  src={character.Image}
                  alt={character.Name}
                  width={400}
                  height={200}
                  className="object-cover w-full h-48"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle>{character.Name}</CardTitle>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">Rating: {character.Ranking}/10</Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharactersSection;
