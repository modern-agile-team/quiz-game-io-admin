import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from '@tanstack/react-router';
import { Button, Card, Descriptions, Image, Skeleton, Tag } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';

import { quizQueries } from '@/shared/service/query/quiz';

export default function SingleQuiz() {
  const navigate = useNavigate();
  const { id: quizId } = useParams({ from: '/(menus)/contents/quizzes/$id/' });
  const {
    data: quiz,
    isLoading,
    isError,
  } = useQuery({
    ...quizQueries.getSingle(quizId!),
    enabled: !!quizId,
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <Card>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Card>
      </div>
    );
  }

  if (isError || !quiz) {
    return (
      <div className="p-6">
        <Card>
          <Title level={4}>퀴즈 정보를 불러오는 데 실패했습니다.</Title>
          <Paragraph>잠시 후 다시 시도해 주세요.</Paragraph>
        </Card>
      </div>
    );
  }

  const routeEditHandler = () => {
    navigate({ to: '/contents/quizzes/$id/edit', params: { id: quizId } });
  };

  return (
    <div className="p-6 min-h-screen">
      <Card
        title={<Title level={3}>퀴즈 상세 정보</Title>}
        extra={
          <Button type="primary" onClick={routeEditHandler}>
            수정
          </Button>
        }
        className="shadow-md"
      >
        <div className="flex flex-col md:flex-row gap-8">
          {quiz.imageUrl && (
            <div className="flex-shrink-0 text-center">
              <Image
                width={250}
                src={quiz.imageUrl}
                alt="퀴즈 이미지"
                className="rounded-lg shadow-sm"
              />
            </div>
          )}
          <div className="flex-grow">
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="ID">
                <Paragraph copyable>{quiz.id}</Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="카테고리">
                <Tag color="blue" className="text-sm">
                  {quiz.type}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="질문">
                {quiz.question || <Paragraph type="secondary">N/A</Paragraph>}
              </Descriptions.Item>
              <Descriptions.Item label="정답">
                <Paragraph strong>{quiz.answer}</Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="생성일">
                {new Date(quiz.createdAt).toLocaleString('ko-KR')}
              </Descriptions.Item>
              <Descriptions.Item label="수정일">
                {new Date(quiz.updatedAt).toLocaleString('ko-KR')}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </Card>
    </div>
  );
}
