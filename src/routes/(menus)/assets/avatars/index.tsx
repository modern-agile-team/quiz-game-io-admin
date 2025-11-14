import { createFileRoute } from '@tanstack/react-router';

import Avatars from '@/apps/assets/avatars';

export const Route = createFileRoute('/(menus)/assets/avatars/')({
  component: Avatars,
});
