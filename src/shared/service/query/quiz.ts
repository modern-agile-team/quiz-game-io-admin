import { mutationOptions, queryOptions } from '@tanstack/react-query';

import {
  createQuizzesControllerCreateQuizzesAdmin,
  listQuizzesControllerListQuizzes,
} from '@/lib/admins/_generated/quizzesGameIoBackend';
import type { CreateQuizzesDto } from '@/lib/apis/_generated/quizzesGameIoBackend.schemas';

export const quizQueries = {
  getList: queryOptions({
    queryKey: ['quiz'] as const,
    queryFn: listQuizzesControllerListQuizzes,
  }),
  bulkUpload: mutationOptions({
    mutationKey: ['quiz', 'create'] as const,
    mutationFn: (createQuizzesDto: CreateQuizzesDto[]) =>
      createQuizzesControllerCreateQuizzesAdmin(createQuizzesDto),
  }),
};
