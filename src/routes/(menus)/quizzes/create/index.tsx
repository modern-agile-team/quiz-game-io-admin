import { createFileRoute } from '@tanstack/react-router';

import CreateQuizzes from '@/apps/quizzes/components/CreateQuizzes';

export const Route = createFileRoute('/(menus)/quizzes/create/')({
  component: CreateQuizzes,
});
