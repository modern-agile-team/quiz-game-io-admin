import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Image, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { omit } from 'es-toolkit/object';
import { useState } from 'react';

import type { QuizImageAdminDto } from '@/lib/apis/_generated/quizzesGameIoBackend.schemas';
import { imageQueries } from '@/shared/service/query/image';

import ActionButtons from './components/ActionButtons';

const columns: ColumnsType<QuizImageAdminDto> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '이미지',
    dataIndex: 'quizImageUrl',
    key: 'quizImageUrl',
    render: (url) => <Image src={url} alt="이미지" style={{ height: 40 }} />,
  },
  {
    title: '카테고리',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: '이름',
    dataIndex: 'originalFileName',
    key: 'originalFileName',
  },
  {
    title: '생성일',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date) => dayjs(date).format('YYYY년 MM월 DD일'),
  },
];

const PAGE_SIZE = 30;

export default function ImageAssetPage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const {
    page: currentPage,
    sortBy,
    orderBy,
  } = useSearch({
    from: '/(menus)/assets/images/',
  });
  const navigate = useNavigate({ from: '/assets/images' });

  const { data, isLoading, refetch } = useQuery({
    ...imageQueries.getList({
      category: undefined,
      page: currentPage,
      perPage: PAGE_SIZE,
      sort: `${sortBy}:${orderBy}`,
    }),
    select: (res) => {
      return {
        dataSource: res.data.map((item) => ({ ...item, key: item.id })),
        meta: omit(res, ['data']),
      };
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <Typography.Title level={2}>이미지 관리</Typography.Title>
      <ActionButtons
        selectedImageIds={selectedRowKeys.map((key) => key.toString())}
        onRemoveImages={() => {
          refetch();
          setSelectedRowKeys([]);
        }}
      />
      <Table
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        loading={isLoading}
        columns={columns}
        dataSource={data?.dataSource}
        scroll={{ y: '70vh' }}
        pagination={{
          pageSize: PAGE_SIZE,
          current: currentPage,
          total: data?.meta.totalCount,
          showQuickJumper: true,
          showSizeChanger: false,
          showTotal: (total, range) =>
            `총 ${total.toLocaleString()}개 중 ${range[0]}-${range[1]}`,
          onChange(page) {
            navigate({ search: { page, sortBy, orderBy } });
          },
        }}
      />
    </div>
  );
}
