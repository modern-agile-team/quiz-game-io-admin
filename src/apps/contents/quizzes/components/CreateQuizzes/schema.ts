import type { CreateQuizzesAdminDto } from '@/lib/apis/_generated/quizzesGameIoBackend.schemas';

export interface CreateQuizDto extends CreateQuizzesAdminDto {
  key: string;
  quizImageUrl: string;
}
