import { useMutation, useQuery } from '@tanstack/react-query';
import {
  useBlocker,
  useNavigate,
  useParams,
  useRouter,
} from '@tanstack/react-router';
import {
  Button,
  Card,
  Form,
  Image,
  Popconfirm,
  Select,
  Skeleton,
  Space,
  Typography,
} from 'antd';
import useApp from 'antd/es/app/useApp';
import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';

import type { UpdateQuizDto } from '@/lib/apis/_generated/quizzesGameIoBackend.schemas';
import { queryClient } from '@/lib/queryClient';
import { quizQueries } from '@/shared/service/query/quiz';

import ImageModal from '../ImageModal';

interface UpdateQuiz extends UpdateQuizDto {
  quizImageUrl?: string | null;
}

export default function EditQuiz() {
  const router = useRouter();
  const navigate = useNavigate();
  const [form] = Form.useForm<UpdateQuiz>();
  const { message, modal } = useApp();
  const [formIsDirty, setFormIsDirty] = useState(false);

  useBlocker({
    shouldBlockFn: () => {
      if (!formIsDirty) return false;

      const shouldLeave = confirm(
        '변경사항이 저장되지 않았습니다. 정말로 나가시겠습니까?'
      );
      return !shouldLeave;
    },
    enableBeforeUnload: formIsDirty,
  });

  const { id: quizId } = useParams({
    from: '/(menus)/contents/quizzes/$id/edit/',
  });
  const {
    data: quiz,
    isLoading,
    isError,
  } = useQuery({
    ...quizQueries.getSingle(quizId!),
    enabled: !!quizId,
  });

  const { mutate: updateQuiz } = useMutation({
    ...quizQueries.singleUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz'] });
      queryClient.invalidateQueries({
        queryKey: quizQueries.singleUpdate.mutationKey,
      });
      router.history.back();
      message.success('퀴즈가 성공적으로 수정되었습니다.');
    },
    onError: () => {
      message.error('퀴즈 수정에 실패했습니다.');
    },
  });
  const { mutate: deleteQuiz } = useMutation({
    ...quizQueries.singleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz'] });
      queryClient.invalidateQueries({
        queryKey: quizQueries.singleDelete.mutationKey,
      });
      navigate({ to: '/contents/quizzes' });
      message.success('퀴즈가 성공적으로 삭제되었습니다.');
    },
    onError: () => {
      message.error('퀴즈 삭제에 실패했습니다.');
    },
  });

  const onFinish = (values: UpdateQuiz) => {
    const updateQuizDto: UpdateQuizDto = {
      answer: values.answer,
      question: values.question,
      type: values.type,
      imageFileName: values.imageFileName,
    };
    setFormIsDirty(false);
    updateQuiz({ quizId, updateQuizDto });
  };

  const showImagesModal = () => {
    const modalInstance = modal.info({
      title: '이미지 선택',
      content: (
        <ImageModal
          onSelect={({ quizImageUrl }) => {
            form.setFieldsValue({ quizImageUrl });
            setFormIsDirty(true);
            modalInstance.destroy();
          }}
        />
      ),
      icon: null,
      width: '60%',
      footer: null,
      closable: true,
    });
  };

  const imageUrlValue = Form.useWatch('quizImageUrl', form);

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

  return (
    <div className="p-6 min-h-screen">
      <Form<UpdateQuiz>
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={() => setFormIsDirty(true)}
        initialValues={{ ...quiz }}
      >
        <Card
          title={<Title level={3}>퀴즈 수정</Title>}
          className="shadow-md"
          extra={
            <div className="flex gap-2">
              <Button onClick={() => router.history.back()}>취소</Button>
              <Button type="primary" htmlType="submit">
                저장
              </Button>
              <Popconfirm
                title="정말로 삭제하시겠습니까?"
                description="한 번 삭제된 정보를 복구할 수 없습니다."
                onConfirm={() => deleteQuiz({ quizId })}
                onCancel={() => message.info('삭제를 취소했습니다.')}
                okText="삭제"
                cancelText="취소"
              >
                <Button type="primary" danger>
                  삭제
                </Button>
              </Popconfirm>
            </div>
          }
        >
          <div className="flex flex-col md:flex-row gap-8">
            <Form.Item
              name="quizImageUrl"
              className="flex-shrink-0 text-center"
            >
              <Space direction="vertical">
                {imageUrlValue ? (
                  <div className="flex flex-col">
                    <Image
                      width={250}
                      src={imageUrlValue}
                      alt="퀴즈 이미지"
                      className="rounded-lg shadow-sm"
                    />
                    <Form.Item name="imageFileName">
                      <Typography className="w-48 truncate text-ellipsis">
                        {quiz.imageFileName}
                      </Typography>
                    </Form.Item>
                  </div>
                ) : (
                  <div
                    className="w-[250px] h-[150px] bg-gray-200 rounded-lg flex items-center justify-center"
                    style={{ border: '1px dashed #d9d9d9' }}
                  >
                    <span className="text-gray-500">이미지 없음</span>
                  </div>
                )}
                <Button
                  onClick={showImagesModal}
                  type="primary"
                  style={{ width: '100%' }}
                >
                  {imageUrlValue ? '이미지 변경' : '이미지 추가'}
                </Button>
              </Space>
            </Form.Item>
            <div className="flex-grow">
              <Form.Item label="ID">
                <Input value={quiz.id} disabled />
              </Form.Item>
              <Form.Item
                name="type"
                label="카테고리"
                rules={[
                  { required: true, message: '카테고리를 선택해주세요.' },
                ]}
              >
                <Select
                  defaultValue={quiz.type}
                  options={[
                    { value: 'multipleChoice', label: '다중선택' },
                    { value: 'shortAnswer', label: '짧은 글' },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="question"
                label="질문"
                rules={[{ required: true, message: '질문을 입력해주세요.' }]}
              >
                <TextArea rows={4} defaultValue={quiz.question!} />
              </Form.Item>
              <Form.Item
                name="answer"
                label="정답"
                rules={[{ required: true, message: '정답을 입력해주세요.' }]}
              >
                <TextArea rows={2} defaultValue={quiz.answer} />
              </Form.Item>
            </div>
          </div>
        </Card>
      </Form>
    </div>
  );
}
