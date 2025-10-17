import { createFileRoute } from '@tanstack/react-router';

import CreateQuizzes from '@/apps/quizzes/components/CreateQuizzes.tsx';

export const Route = createFileRoute('/(menus)/quizzes/create/')({
  component: CreateQuizzes,
});
