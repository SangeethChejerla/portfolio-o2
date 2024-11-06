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

export interface PostMetadata {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
}

export interface BlogPost {
  url: string;
  slugs: string[];
  data: PostMetadata;
  content?: any; // MDX content type from your MDX loader
}
