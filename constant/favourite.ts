import { CharacterType } from '@/types/fav-types';

export const Anime = [
  {
    id: 1,
    AnimeName: 'Attack on Titan',
    Image: '/favourites/attack-on-titan.jpg',
    Description:
      'At its core, Attack on Titan begins with a world ravaged by mysterious, giant humanoid creatures called Titans, who exist to devour humanity. The remnants of mankind live behind towering walls, seeking protection from the terrifying beasts that roam outside. But this simple premise of survival against an external, seemingly insurmountable threat evolves into something much greater. As the walls are breached and humanity’s fight for survival intensifies, the story reveals deep layers of political intrigue, moral ambiguity, and existential questioning.Eren, the boy who once dreamed of a world beyond the walls, transforms into a symbol of unbridled freedom—but at a staggering cost. His quest for freedom morphs into a destructive obsession, one that questions whether true freedom can ever exist without infringing upon the freedoms of others. By the time we reach the final arcs of the series, we realize that the fight for freedom is not one-dimensional. It is interwoven with violence, sacrifice, and the burdens of history.',
    Genre: ['Action', 'Mystery'],
    Rankings: 10,
  },
];

export const characters: CharacterType[] = [
  {
    id: 1,
    Name: 'Levi Ackerman',
    Image: '/images/levi.jpg',
    Description:
      'Levi Ackerman is a soldier in the elite Survey Corps, known for his exceptional combat skills and leadership.',
    Personality:
      'Serious, Calm, Stoic, and Determined. Levi is known for his no-nonsense attitude and strict discipline.',
    Ranking: 9,
    Gender: 'Male',
  },
];

export const Quotes = [
  {
    id: 1,
    Quote:
      'The only limit to our realization of tomorrow is our doubts of today.',
    Tags: ['Motivation', 'Future', 'Success'],
    SaidBy: 'Franklin D. Roosevelt',
    Ranking: 9,
    Context:
      'This quote encourages people to overcome self-doubt and believe in their potential to shape the future.',
  },
];

export const Gallery = [
  {
    id: 1,
    Title: 'Sunset at the Beach',
    Image: '/images/sunset_beach.jpg',
    Context:
      'A beautiful sunset captured at the beach during a summer vacation.',
    Date: '2023-06-15',
    Tags: ['Nature', 'Sunset', 'Beach'],
  },
];

export const Other = [
  {
    id: 1,
    sub_category: 'Paintings',
    Title: 'Starry Night',
    Artist: 'Vincent van Gogh',
    Image: '/images/starrynight.jpg',
    Year: '1889',
    Inspiration:
      'Inspired by the view from his window in an asylum, reflecting the chaos and beauty of the night sky.',
  },
];
