import { mutationOptions, queryOptions } from '@tanstack/react-query';

import {
  createNicknameSourceControllerCreateNicknameSourceAdmin,
  deleteNicknameSourceControllerDeleteNicknameSource,
  listNicknameSourcesControllerListNicknameSources,
} from '@/lib/admins/_generated/quizzesGameIoBackend';

export const nicknameQueries = {
  getList: (
    params: Parameters<
      typeof listNicknameSourcesControllerListNicknameSources
    >[0]
  ) =>
    queryOptions({
      queryKey: ['nicknames', 'list', params],
      queryFn: () => listNicknameSourcesControllerListNicknameSources(params),
    }),

  removeNickname: mutationOptions({
    mutationFn: deleteNicknameSourceControllerDeleteNicknameSource,
  }),

  addNickname: mutationOptions({
    mutationFn: createNicknameSourceControllerCreateNicknameSourceAdmin,
  }),
};
