'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Anime } from '@/constant/anime';
import { characters } from '@/constant/favourite';
import { Gallery } from '@/constant/gallery';
import { Other } from '@/constant/other';
import { Quotes } from '@/constant/quotes';
import {
  AnimeType,
  CharacterType,
  GalleryItemType,
  OtherItemType,
} from '@/types/fav-types';
import { useState } from 'react';
import AnimeSection from './AnimeSection';
import CharactersSection from './CharactersSection';
import GallerySection from './GallerySection';
import OtherSection from './OtherSection';
import QuotesSection from './QuotesSection';
import SelectedItemDialog from './SelectedItemDialog';

export default function Favourite() {
  const [selectedItem, setSelectedItem] = useState<
    AnimeType | CharacterType | GalleryItemType | OtherItemType | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleItemClick = (
    item: AnimeType | CharacterType | GalleryItemType | OtherItemType
  ) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full px-4 py-6">
      <Tabs defaultValue="anime" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="anime">Anime</TabsTrigger>
          <TabsTrigger value="characters">Characters</TabsTrigger>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        <TabsContent value="anime" className="mt-6">
          <AnimeSection items={Anime} onItemClick={handleItemClick} />
        </TabsContent>

        <TabsContent value="characters" className="mt-6">
          <CharactersSection items={characters} onItemClick={handleItemClick} />
        </TabsContent>

        <TabsContent value="quotes" className="mt-6">
          <QuotesSection items={Quotes} />
        </TabsContent>

        <TabsContent value="gallery" className="mt-6">
          <GallerySection items={Gallery} onItemClick={handleItemClick} />
        </TabsContent>

        <TabsContent value="other" className="mt-6">
          <OtherSection items={Other} onItemClick={handleItemClick} />
        </TabsContent>
      </Tabs>

      <SelectedItemDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        item={selectedItem}
      />
    </div>
  );
}
