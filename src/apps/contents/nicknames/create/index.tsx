import { PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { App, Badge, Button, Input, Popconfirm, Table, Typography } from 'antd';
import { useState } from 'react';

import { nicknameQueries } from '@/shared/service/query/nicknames';

export default function NicknameCreatePage() {
  const { message } = App.useApp();
  const navigate = useNavigate({ from: '/contents/nicknames/create' });

  const [nicknames, setNicknames] = useState<string[]>(['']);

  const {
    mutateAsync: addNickname,
    isPending,
    isSuccess,
  } = useMutation({
    ...nicknameQueries.addNickname,
    retry: false,
  });

  const addDisabled =
    nicknames.some((v) => v.trim().length === 0) || isPending || isSuccess;

  const handleAddNicknames = async () => {
    if (addDisabled) return;

    try {
      await Promise.all(
        nicknames.map((nickname) => addNickname({ name: nickname }))
      );
      message.success('닉네임 소스를 추가했어요.', 1, () => {
        navigate({ to: '/contents/nicknames', search: { page: 1 } });
      });
    } catch {
      message.error('닉네임 소스 추가 중 오류가 발생했어요.');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Typography.Title level={2}>닉네임 추가</Typography.Title>

      <Table
        columns={[
          {
            title: '추가할 닉네임',
            dataIndex: 'nickname',
            key: 'nickname',
            render: (_, record, index) => (
              <div className="flex gap-4 items-center">
                <Badge color="blue" count={index + 1} />
                <Input
                  type="text"
                  value={record.nickname}
                  onChange={(e) => {
                    const newNicknames = [...nicknames];
                    newNicknames[index] = e.target.value;
                    setNicknames(newNicknames);
                  }}
                />
                <Button
                  danger
                  onClick={() => {
                    const newNicknames = [...nicknames];
                    newNicknames.splice(index, 1);
                    setNicknames(newNicknames);
                  }}
                >
                  삭제
                </Button>
              </div>
            ),
          },
        ]}
        dataSource={nicknames.map((nickname, index) => ({
          key: index,
          nickname,
        }))}
        pagination={false}
      />

      <div className="flex justify-between w-full">
        <Button onClick={() => setNicknames([...nicknames, ''])}>
          <PlusOutlined />
        </Button>

        <Popconfirm
          title="닉네임을 추가하시겠습니다?"
          okText="네"
          cancelText="아니오"
          onConfirm={handleAddNicknames}
          disabled={addDisabled}
        >
          <Button type="primary" disabled={addDisabled}>
            닉네임 추가하기
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
}
