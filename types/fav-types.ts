export interface AnimeType {
  id: number;
  AnimeName: string;
  Image: string;
  Description: string;
  Genre: string[];
  Rankings: number;
}

export interface CharacterType {
  id: number;
  Name: string;
  Image: string;
  Description: string;
  Personality: string;
  Ranking: number;
  Gender: 'Male' | 'Female';
}

export interface QuoteType {
  id: number;
  Quote: string;
  Tags: string[];
  SaidBy: string;
  Ranking: number;
  Context: string;
}

export interface GalleryItemType {
  id: number;
  Title: string;
  Image: string;
  Context: string;
  Date: string;
  Tags: string[];
}

export interface OtherItemType {
  id: number;
  sub_category: string;
  Title: string;
  Artist: string;
  Image: string;
  Year: string;
  Inspiration: string;
}
