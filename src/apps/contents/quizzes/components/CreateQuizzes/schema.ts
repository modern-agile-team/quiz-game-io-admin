import type { CreateQuizzesDto } from '@/lib/apis/_generated/quizzesGameIoBackend.schemas';

export interface CreateQuizDto extends CreateQuizzesDto {
  key: string;
}
