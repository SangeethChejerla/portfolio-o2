import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AnimeType,
  CharacterType,
  GalleryItemType,
  OtherItemType,
} from '@/types/fav-types';
import Image from 'next/image';

interface SelectedItemDialogProps {
  open: boolean;
  onClose: () => void;
  item: AnimeType | CharacterType | GalleryItemType | OtherItemType | null;
}

const SelectedItemDialog = ({
  open,
  onClose,
  item,
}: SelectedItemDialogProps) => {
  if (!item) return null;

  // Helper function to get the title
  const getTitle = (item: NonNullable<SelectedItemDialogProps['item']>) => {
    if ('AnimeName' in item) return item.AnimeName;
    if ('Name' in item) return item.Name;
    if ('Title' in item) return item.Title;
    return '';
  };

  // Helper function to get the image alt text
  const getAltText = (item: NonNullable<SelectedItemDialogProps['item']>) => {
    return getTitle(item);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl mt-14">
        <DialogHeader>
          <DialogTitle>{getTitle(item)}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 mt-4 mb-4 md:grid-cols-2">
          {'Image' in item && item.Image && (
            <div className="overflow-hidden rounded-lg">
              <Image
                src={item.Image}
                alt={getAltText(item)}
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
          )}
          <ScrollArea className="h-[400px] pr-4">
            {'Description' in item && item.Description && (
              <p className="mb-4">{item.Description}</p>
            )}
            {'Personality' in item && item.Personality && (
              <>
                <h4 className="mb-2 font-semibold">Personality</h4>
                <p className="mb-4">{item.Personality}</p>
              </>
            )}

            {'Inspiration' in item && item.Inspiration && (
              <>
                <h4 className="mb-2 font-semibold">Inspiration</h4>
                <p className="mb-4">{item.Inspiration}</p>
              </>
            )}
            {'Genre' in item && item.Genre && (
              <div className="flex flex-wrap gap-2 mt-4">
                {item.Genre.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            )}
            {'Tags' in item && item.Tags && (
              <div className="flex flex-wrap gap-2 mt-4">
                {item.Tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectedItemDialog;
