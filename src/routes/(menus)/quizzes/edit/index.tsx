import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(menus)/quizzes/edit/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(menus)/quizzes/edit/"!</div>;
}
