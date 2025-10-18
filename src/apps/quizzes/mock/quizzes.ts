export type Quiz = {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: 'multipleChoice' | 'shortAnswer';
  question: string;
  answer: string;
  imageUrl: string | null;
};

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
  'https://dev-zoop.s3.ap-northeast-2.amazonaws.com/images/766971239455110853.png',
  'https://dev-zoop.s3.ap-northeast-2.amazonaws.com/images/767309255440708414.webp',
];
