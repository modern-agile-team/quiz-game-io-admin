import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import {
  Button,
  Drawer,
  Form,
  Image,
  Input,
  notification,
  Popconfirm,
  Select,
  Typography,
} from 'antd';
import { useState } from 'react';

import { quizQueries } from '@/shared/service/query/quiz';

import ImageDrawer from './ImageDrawer';

import { TABLE } from '../../constants';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function CreateQuizzes() {
  const [notificationApi, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const { mutateAsync: quizMutation } = useMutation(quizQueries.bulkUpload);

  const handleBulkUpload = async () => {
    try {
      const values = await form.validateFields();
      const quizzes = values.quizzes || [];
      quizMutation(quizzes, {
        onSuccess: () => {
          navigate({ to: '/quizzes' });
        },
        onError: () => {
          notificationApi.error({
            message: '퀴즈 업로드에 실패했습니다.',
            description:
              '잠시 뒤 다시 요청을 보내거나, 새로고침 후 다시 시도해 보세요.',
            placement: 'topLeft',
          });
        },
      });
    } catch (errInfo) {
      console.error(errInfo);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    if (selectedRowIndex !== null) {
      const quizzes = form.getFieldValue('quizzes') || [];
      quizzes[selectedRowIndex].imageUrl = imageUrl;
      form.setFieldsValue({ quizzes });
    }
    setDrawerVisible(false);
  };

  const TableHeader = () => (
    <div className="flex items-center bg-gray-50 border-y border-gray-200 font-semibold">
      <div className="w-1/12 p-3 text-center">번호</div>
      <div className="w-2/12 p-3">카테고리</div>
      <div className="w-5/12 p-3">질문</div>
      <div className="w-2/12 p-3">정답</div>
      <div className="w-1/12 p-3 text-center">이미지</div>
      <div className="w-1/12 p-3 text-center">삭제</div>
    </div>
  );

  return (
    <>
      {contextHolder}
      <header className="p-6 border-b border-contents-200 flex justify-between items-center">
        <div>
          <Title level={2} className="!text-title-2 !font-bold">
            퀴즈 추가
          </Title>
          <Paragraph className="text-contents-600 mt-1">
            셀에 새로운 정보를 입력해 주세요.
          </Paragraph>
        </div>
        <button
          onClick={handleBulkUpload}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors cursor-pointer"
        >
          변경 사항 저장
        </button>
      </header>
      <main className="p-6">
        <Form form={form} autoComplete="off">
          <div className="border border-gray-200 rounded-lg">
            <TableHeader />
            <Form.List
              name="quizzes"
              initialValue={[
                {
                  type: 'multipleChoice',
                  question: '',
                  answer: '',
                  imageUrl: '',
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div
                      key={field.key}
                      className="flex items-center border-b border-gray-200"
                    >
                      <div className="w-1/12 p-3 text-center">{index + 1}</div>
                      <div className="w-2/12 p-2">
                        <Form.Item
                          name={[field.name, 'type']}
                          rules={[{ required: true, message: '카테고리 필수' }]}
                          className="!m-0"
                        >
                          <Select options={TABLE.TYPE_OPTIONS} />
                        </Form.Item>
                      </div>
                      <div className="w-5/12 p-2">
                        <Form.Item
                          name={[field.name, 'question']}
                          rules={[{ required: true, message: '질문 필수' }]}
                          className="!m-0"
                        >
                          <TextArea autoSize placeholder="질문을 입력하세요" />
                        </Form.Item>
                      </div>
                      <div className="w-2/12 p-2">
                        <Form.Item
                          name={[field.name, 'answer']}
                          rules={[{ required: true, message: '정답 필수' }]}
                          className="!m-0"
                        >
                          <TextArea autoSize placeholder="정답을 입력하세요" />
                        </Form.Item>
                      </div>
                      <div className="w-1/12 p-2 text-center">
                        <Form.Item
                          shouldUpdate={(prev, cur) =>
                            prev.quizzes[index] !== cur.quizzes[index]
                          }
                          className="!m-0"
                        >
                          {({ getFieldValue }) => {
                            const imageUrl =
                              getFieldValue(['quizzes', index, 'imageUrl']) ||
                              '';
                            return (
                              <>
                                {imageUrl ? (
                                  <Image
                                    src={imageUrl}
                                    alt="quiz"
                                    width="100%"
                                    preview={false}
                                    onClick={() => {
                                      setDrawerVisible(true);
                                      setSelectedRowIndex(index);
                                    }}
                                  />
                                ) : (
                                  <Button
                                    onClick={() => {
                                      setDrawerVisible(true);
                                      setSelectedRowIndex(index);
                                    }}
                                    className="w-full h-full flex items-center justify-center"
                                  >
                                    선택
                                  </Button>
                                )}
                              </>
                            );
                          }}
                        </Form.Item>
                      </div>
                      <div className="w-1/12 p-2 text-center">
                        <Popconfirm
                          title="이 행을 삭제하시겠습니까?"
                          onConfirm={() => remove(field.name)}
                        >
                          <Button type="text" danger>
                            삭제
                          </Button>
                        </Popconfirm>
                      </div>
                    </div>
                  ))}
                  <div className="p-4">
                    <Button
                      onClick={() =>
                        add({
                          type: '',
                          question: '',
                          answer: '',
                          imageUrl: '',
                        })
                      }
                      type="primary"
                      className="bg-primary-600"
                    >
                      행 추가
                    </Button>
                  </div>
                </>
              )}
            </Form.List>
          </div>
        </Form>
        <Drawer
          title="이미지 선택"
          placement="right"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          width={500}
        >
          <ImageDrawer onSelect={handleImageSelect} />
        </Drawer>
      </main>
    </>
  );
}
