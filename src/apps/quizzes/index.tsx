import { Spin } from 'antd';
import { Suspense } from 'react';

import QuizzesTable from './components/QuizzesTable';

export default function QuizListPage() {
  return (
    <div className="bg-contents-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-bg-100 rounded-lg shadow-lg overflow-hidden">
        <Suspense fallback={<Spin />}>
          <QuizzesTable />
        </Suspense>
      </div>
    </div>
  );
}
