import { mutationOptions, queryOptions } from '@tanstack/react-query';

import {
  createQuizImageControllerCreateQuizImageAdmin,
  deleteQuizImageControllerDeleteQuizImage,
  getQuizImageControllerGetQuizImage,
  listQuizImagesControllerListQuizImagesAdmin,
  updateQuizImageControllerUpdateQuizImage,
} from '@/lib/admins/_generated/quizzesGameIoBackend';
import type { UpdateQuizImageAdminDto } from '@/lib/apis/_generated/quizzesGameIoBackend.schemas';

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
      updateQuizImageDto: UpdateQuizImageAdminDto;
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
  getSingle: (imageId?: string) =>
    queryOptions({
      queryKey: ['admin', 'image', imageId] as const,
      queryFn: () => getQuizImageControllerGetQuizImage(imageId!),
      enabled: !!imageId,
    }),
};
