import { createFileRoute } from '@tanstack/react-router';

import NicknameCreatePage from '@/apps/contents/nicknames/create';

export const Route = createFileRoute('/(menus)/contents/nicknames/create')({
  component: NicknameCreatePage,
});
