import { Spin } from 'antd';
import { Suspense } from 'react';

import QuizzesTable from './components/QuizzesTable';

export default function QuizListPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<Spin />}>
        <QuizzesTable />
      </Suspense>
    </div>
  );
}
