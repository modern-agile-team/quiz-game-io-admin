import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(menus)/quizzes/$id/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(menus)/quizzes/$id/edit/"!</div>
}
