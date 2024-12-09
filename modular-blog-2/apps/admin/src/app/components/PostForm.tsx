import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema, PostFormData, PostData } from '../schemas/post.schema';
import { useEffect } from 'react';

interface PostFormProps {
  postId?: string;
  initialData?: PostData;
  onSubmit: (data: PostData) => void;
}

const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2";

export function PostForm({ postId, initialData, onSubmit }: PostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        tags: initialData.tags.join(', '),
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (submittedData: PostFormData) => {
    const data: PostData = {
      ...submittedData,
      tags: submittedData.tags.split(',').map((tag) => tag.trim()),
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register('title')}
          className={inputClasses}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          rows={5}
          {...register('content')}
          className={inputClasses}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="authorId" className="block text-sm font-medium text-gray-700">
          Author
        </label>
        <select
          id="authorId"
          {...register('authorId')}
          className={inputClasses}
        >
          <option value="">Select an author</option>
          <option value="u1">Alice Johnson</option>
          <option value="u2">Bob Smith</option>
        </select>
        {errors.authorId && (
          <p className="mt-1 text-sm text-red-600">{errors.authorId.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          placeholder="e.g., react, typescript, web"
          {...register('tags')}
          className={inputClasses}
        />
        {errors.tags && (
          <p className="mt-1 text-sm text-red-600">{errors.tags.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          {...register('status')}
          className={inputClasses}
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : postId ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}
