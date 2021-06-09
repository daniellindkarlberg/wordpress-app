export interface Post {
  ID: number;
  author: Author;
  excerpt: string;
  comment: string;
}

interface Author {
  name: string;
}
