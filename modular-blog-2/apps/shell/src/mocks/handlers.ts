import { http, HttpResponse } from 'msw'
import { Post } from '../domains/posts/entity';
import { LiveStorage } from '@mswjs/storage';


const posts = new LiveStorage('posts', [{
  postId: "bp1",
  title: "Introduction to Micro-Frontends",
  content: "Micro-frontends are a way to think about the web application as a composition of features...",
  authorId: "u1",
  createdAt: "2023-10-05T14:00:00Z",
  updatedAt: "2023-10-05T16:00:00Z",
  tags: ["architecture", "frontend", "microservices"],
  status: "Published"
},
{
  postId: "bp2",
  title: "Benefits of Modular Design",
  content: "Modular design in software development offers several key advantages...",
  authorId: "u2",
  createdAt: "2023-09-20T10:00:00Z",
  updatedAt: "2023-09-21T08:30:00Z",
  tags: ["design patterns", "modular", "development"],
  status: "Draft"
}])



const users = new LiveStorage('users', [
  {
    userId: "u1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "Editor"
  },
  {
    userId: "u2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    role: "Contributor"
  }
]);

export const handlers = [
  // Get all posts
  http.get('/api/posts', () => {
    return HttpResponse.json({ posts: posts.getValue() })
  }),

  // Get post by ID
  http.get('/api/posts/:postId', ({ params }) => {
    const { postId } = params;
    const post = posts.getValue().find(p => p.postId === postId);
    
    if (!post) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({ post });
  }),

  // Get all users
  http.get('/api/users', () => {
    return HttpResponse.json({ users: users.getValue() })
  }),

  // Add new post
  http.post('/api/posts', async ({ request }) => {
    const post = await request.json() as Post;
    const newPost = {
      ...post,
      postId: `bp${posts.getValue().length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: post.status || 'Draft'
    };
    posts.update((prevPosts) => prevPosts.concat(newPost));
    return HttpResponse.json({ post: newPost }, { status: 201 });
  }),

  // Delete post
  http.delete('/api/posts/:postId', ({ params }) => {
    const { postId } = params;
    const postIndex = posts.getValue().findIndex(p => p.postId === postId);
    
    if (postIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    posts.update((prevPosts) => prevPosts.filter(p => p.postId !== postId));
    return new HttpResponse(null, { status: 204 });
  }),

  // Update post
  http.put('/api/posts/:postId', async ({ params, request }) => {
    const { postId } = params;
    const updates = await request.json() as Partial<Post>;
    const postIndex = posts.getValue().findIndex(p => p.postId === postId);
    
    if (postIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedPost = {
      ...posts.getValue()[postIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    posts.update((prevPosts) => prevPosts.map(p => p.postId === postId ? updatedPost : p));
    return HttpResponse.json({ post: updatedPost });
  })
]
