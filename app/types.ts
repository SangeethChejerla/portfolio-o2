export interface Post {
  url: string;
  slugs: string[];
  data: {
    title: string;
    description?: string;
    date: string;
    tags?: string[];
    body: React.ComponentType;
  };
}
