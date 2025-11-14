import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

import QuizPage from '@/apps/contents/quizzes';

const searchParamsSchema = z.object({
  imageId: z.string(),
});

export const Route = createFileRoute('/(menus)/contents/quizzes/')({
  component: QuizPage,
  validateSearch: (search) => {
    const result = searchParamsSchema.safeParse(search);
    if (!result.success) return { imageId: '' };
    return result.data;
  },
});
