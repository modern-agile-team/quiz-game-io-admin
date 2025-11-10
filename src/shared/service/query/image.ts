import { mutationOptions, queryOptions } from '@tanstack/react-query';

import {
  createQuizImageControllerCreateQuizImageAdmin,
  deleteQuizImageControllerDeleteQuizImage,
  listQuizImagesControllerListQuizImagesAdmin,
  updateQuizImageControllerUpdateQuizImage,
} from '@/lib/admins/_generated/quizzesGameIoBackend';
import type { UpdateQuizImageDto } from '@/lib/apis/_generated/quizzesGameIoBackend.schemas';

export const imageQueries = {
  uploadImage: mutationOptions({
    mutationFn: createQuizImageControllerCreateQuizImageAdmin,
  }),
  removeImage: mutationOptions({
    mutationFn: deleteQuizImageControllerDeleteQuizImage,
  }),
  updateImage: mutationOptions({
    mutationFn: ({
      quizImageId,
      updateQuizImageDto,
    }: {
      quizImageId: string;
      updateQuizImageDto: UpdateQuizImageDto;
    }) =>
      updateQuizImageControllerUpdateQuizImage(quizImageId, updateQuizImageDto),
  }),
  getList: (
    params: Parameters<typeof listQuizImagesControllerListQuizImagesAdmin>[0]
  ) =>
    queryOptions({
      queryKey: ['admin', 'images', 'list', params] as const,
      queryFn: () => listQuizImagesControllerListQuizImagesAdmin(params),
    }),
};
