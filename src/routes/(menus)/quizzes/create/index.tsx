import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(menus)/quizzes/create/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(menus)/quizzes/create/"!</div>;
}
