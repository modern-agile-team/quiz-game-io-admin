import { queryOptions } from '@tanstack/react-query';

import { listQuizzesControllerListQuizzes } from '@/lib/admins/_generated/quizzesGameIoBackend';

export const quizQueries = {
  getList: queryOptions({
    queryKey: ['quiz'],
    queryFn: listQuizzesControllerListQuizzes,
  }),
};
