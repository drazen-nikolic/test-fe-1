export interface Post {
    postId: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    status: string;
  }
  
  export interface PostWithAuthor extends Post {
    author?: string;
  }
  