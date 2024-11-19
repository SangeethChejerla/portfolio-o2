import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CharacterType } from '@/types/fav-types';
import Image from 'next/image';
import React from 'react';

interface CharactersSectionProps {
  items: CharacterType[];
  onItemClick: (item: CharacterType) => void;
}

const CharactersSection: React.FC<CharactersSectionProps> = ({
  items,
  onItemClick,
}) => {
  const maleCharacters = items.filter((char) => char.Gender === 'Male');
  const femaleCharacters = items.filter((char) => char.Gender === 'Female');

  return (
    <div className="grid gap-12 bg-black text-white">
      <div>
        <h3 className="mb-6 text-3xl font-extrabold text-indigo-600">
          Male Characters
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {maleCharacters.map((character) => (
            <Card
              key={character.id}
              className="overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 shadow-lg "
              onClick={() => onItemClick(character)}
            >
              <CardHeader className="relative p-0">
                <Image
                  src={character.Image}
                  alt={character.Name}
                  width={400}
                  height={200}
                  className="object-cover w-full h-64"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent h-24"></div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-bold">
                  {character.Name}
                </CardTitle>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  <span className="text-indigo-500">#</span>
                  <span className="animate-pulse">{character.Ranking}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-6 text-3xl font-extrabold text-pink-600">
          Female Characters
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {femaleCharacters.map((character) => (
            <Card
              key={character.id}
              className="overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 shadow-lg"
              onClick={() => onItemClick(character)}
            >
              <CardHeader className="relative p-0">
                <Image
                  src={character.Image}
                  alt={character.Name}
                  width={400}
                  height={200}
                  className="object-cover w-full h-64"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent h-24"></div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-bold">
                  {character.Name}
                </CardTitle>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  <span className="text-pink-500">#</span>
                  <span className="animate-pulse">{character.Ranking}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharactersSection;
