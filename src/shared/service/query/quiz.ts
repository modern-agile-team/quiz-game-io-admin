import { mutationOptions, queryOptions } from '@tanstack/react-query';

import {
  createQuizzesControllerCreateQuizzesAdmin,
  deleteQuizControllerDeleteQuizAdmin,
  getQuizControllerGetQuizzesAdmin,
  listQuizzesControllerListQuizzes,
  updateQuizControllerUpdateQuizAdmin,
} from '@/lib/admins/_generated/quizzesGameIoBackend';
import type { ListQuizzesControllerListQuizzesParams } from '@/lib/admins/_generated/quizzesGameIoBackend.schemas';
import type {
  CreateQuizzesAdminDto,
  UpdateQuizAdminDto,
} from '@/lib/apis/_generated/quizzesGameIoBackend.schemas';

interface UpdateParams {
  quizId: string;
  updateQuizDto: UpdateQuizAdminDto;
}

export const quizQueries = {
  getList: (params: ListQuizzesControllerListQuizzesParams) =>
    queryOptions({
      queryKey: ['quiz', params] as const,
      queryFn: () => listQuizzesControllerListQuizzes(params),
    }),
  getSingle: (id: string) =>
    queryOptions({
      queryKey: ['quiz', id] as const,
      queryFn: () => getQuizControllerGetQuizzesAdmin(id),
    }),
  bulkUpload: mutationOptions({
    mutationKey: ['quiz', 'create'] as const,
    mutationFn: (createQuizzesDto: CreateQuizzesAdminDto[]) =>
      createQuizzesControllerCreateQuizzesAdmin(createQuizzesDto),
  }),
  singleUpdate: mutationOptions({
    mutationKey: ['quiz', 'modified'] as const,
    mutationFn: ({ quizId, updateQuizDto }: UpdateParams) =>
      updateQuizControllerUpdateQuizAdmin(quizId, updateQuizDto),
  }),
  singleDelete: mutationOptions({
    mutationKey: ['quiz', 'delete'] as const,
    mutationFn: ({ quizId }: { quizId: string }) =>
      deleteQuizControllerDeleteQuizAdmin(quizId),
  }),
};
