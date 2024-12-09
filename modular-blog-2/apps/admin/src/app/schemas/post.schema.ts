import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  content: z.string().min(1, 'Content is required'),
  authorId: z.string().min(1, 'Author is required'),
  tags: z.string(),
  createdAt: z.string().optional(),
  status: z.enum(['Draft', 'Published']),
});

export const postDataSchema = postSchema.omit({tags: true}).extend({
  tags: z.array(z.string())
});

export type PostFormData = z.infer<typeof postSchema>;
export type PostData = z.infer<typeof postDataSchema>;
