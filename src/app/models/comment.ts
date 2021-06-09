export interface Comment {
  ID: number;
  post: Post;
  author: Author;
  raw_content: string;
}

interface Author {
  name: string;
}

interface Post {
  ID: number;
}
