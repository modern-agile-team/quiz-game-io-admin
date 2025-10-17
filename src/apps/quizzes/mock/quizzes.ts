export type Quiz = {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: 'multipleChoice' | 'shortAnswer';
  question: string;
  answer: string;
  imageUrl: string | null;
};

export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '질문',
    dataIndex: 'question',
    key: 'question',
  },
  {
    title: '정답',
    dataIndex: 'answer',
    key: 'answer',
  },
  {
    title: '이미지',
    dataIndex: 'image',
    key: 'image',
  },
  {
    title: '시점',
  },
];

export const QUIZZES_MOCK_DATA: Quiz[] = [
  {
    id: 'quiz-001',
    createdAt: '2025-10-12T07:06:18.021Z',
    updatedAt: '2025-10-12T07:06:18.021Z',
    type: 'multipleChoice',
    question: '대한민국의 수도는 어디인가요?',
    answer: '서울',
    imageUrl: null,
  },
  {
    id: 'quiz-002',
    createdAt: '2025-10-11T11:20:45.110Z',
    updatedAt: '2025-10-11T11:20:45.110Z',
    type: 'shortAnswer',
    question: '세상에서 가장 높은 산의 이름은 무엇인가요?',
    answer: '에베레스트 산',
    imageUrl: null,
  },
  {
    id: 'quiz-003',
    createdAt: '2025-10-10T02:55:00.987Z',
    updatedAt: '2025-10-10T02:55:00.987Z',
    type: 'multipleChoice',
    question: 'React를 개발한 회사는 어디인가요?',
    answer: 'Facebook (Meta)',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
  },
];

export const IMAGE_GALLERY_MOCK = [
  'https://images.unsplash.com/photo-1538485394074-75f3474c7590?q=80&w=200',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=200',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=200',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=200',
  'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=200',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200',
];
