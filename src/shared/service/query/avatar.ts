import { queryOptions } from '@tanstack/react-query';

import { listAvatarsControllerListAvatars } from '@/lib/admins/_generated/quizzesGameIoBackend';
import type { ListAvatarsControllerListAvatarsParams } from '@/lib/admins/_generated/quizzesGameIoBackend.schemas';

export const avatarQueries = {
  getList: (params: ListAvatarsControllerListAvatarsParams) =>
    queryOptions({
      queryKey: ['avatar', 'list', params],
      queryFn: () => listAvatarsControllerListAvatars(params),
    }),
};
