import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import dayjs from 'dayjs';
import { useState } from 'react';

import type { NicknameSourceAdminDto } from '@/lib/apis/_generated/quizzesGameIoBackend.schemas';
import { nicknameQueries } from '@/shared/service/query/nicknames';

import ActionButtons from './components/ActionButtons';

const columns: ColumnsType<NicknameSourceAdminDto> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '닉네임',
    dataIndex: 'fullname',
    key: 'fullname',
  },
  {
    title: '위치',
    dataIndex: 'sequence',
    key: 'sequence',
    render: (value) => (value === 0 ? '앞' : '뒤'),
  },
  {
    title: '생성일',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date) => dayjs(date).format('YYYY년 MM월 DD일'),
  },
  {
    title: '수정일',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (date) => dayjs(date).format('YYYY년 MM월 DD일'),
  },
];

const PAGE_SIZE = 30;

export default function NicknameListPage() {
  const currentPage = useSearch({ from: '/(menus)/contents/nicknames/' }).page;

  const { data, isLoading, refetch } = useQuery(
    nicknameQueries.getList({
      perPage: PAGE_SIZE,
      page: currentPage,
    })
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const navigate = useNavigate({ from: '/contents/nicknames' });

  return (
    <div className="flex flex-col gap-4">
      <Typography.Title level={2}>닉네임 소스 관리</Typography.Title>

      <ActionButtons
        selectedNicknameIds={selectedRowKeys.map((key) => key.toString())}
        onRemoveNicknames={() => {
          setSelectedRowKeys([]);
          refetch();
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
        dataSource={data?.data.map((item) => ({ ...item, key: item.id }))}
        scroll={{ y: '70vh' }}
        pagination={{
          pageSize: PAGE_SIZE,
          current: currentPage,
          total: data?.totalCount,
          showQuickJumper: true,
          showSizeChanger: false,
          showTotal: (total, range) =>
            `총 ${total.toLocaleString()}개 중 ${range[0]}-${range[1]}`,
          onChange(page) {
            navigate({ search: { page } });
          },
        }}
      />
    </div>
  );
}
