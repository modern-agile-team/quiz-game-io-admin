import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

import ImageAssetPage from '@/apps/assets/images';

const searchParamsSchema = z.object({
  page: z.number().min(1).default(1),
});

export const Route = createFileRoute('/(menus)/assets/images/')({
  component: ImageAssetPage,
  validateSearch: (search) => {
    const result = searchParamsSchema.safeParse(search);
    if (!result.success) {
      return { page: 1 };
    }
    return result.data;
  },
});
