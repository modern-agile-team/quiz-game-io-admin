import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

import NicknameListPage from '@/apps/contents/nicknames';

const searchParamsSchema = z.object({
  page: z.number().min(1).default(1),
});

export const Route = createFileRoute('/(menus)/contents/nicknames/')({
  component: NicknameListPage,
  validateSearch: (search) => {
    const result = searchParamsSchema.safeParse(search);
    if (!result.success) {
      return { page: 1 };
    }
    return result.data;
  },
});
