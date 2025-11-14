import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Image, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { omit } from 'es-toolkit/object';
import { useState } from 'react';

import type { AvatarAdminDto } from '@/lib/apis/_generated/quizzesGameIoBackend.schemas';
import { avatarQueries } from '@/shared/service/query/avatar';

const columns: ColumnsType<AvatarAdminDto> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '아바타',
    dataIndex: 'avatarImageUrl',
    key: 'avatarImageUrl',
    render: (url) => <Image src={url} alt="아바타" style={{ height: 40 }} />,
  },
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '원래 파일명',
    dataIndex: 'originalFileName',
    key: 'originalFileName',
  },
  {
    title: '생성일',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date) => dayjs(date).format('YYYY년 MM월 DD일'),
  },
  {
    title: '사용 수',
    dataIndex: 'usageCount',
    key: 'usageCount',
  },
];

const PAGE_SIZE = 30;

export default function Avatars() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  type _SearchLike = { page?: number };
  const _search = useSearch({
    from: '/(menus)/assets/avatars/',
  }) as unknown as _SearchLike;
  const currentPage = _search.page ?? 1;
  const navigate = useNavigate({ from: '/assets/avatars' });
  const { data, isLoading } = useQuery({
    ...avatarQueries.getList({ page: currentPage, perPage: PAGE_SIZE }),
    select: (res) => ({
      dataSource: res.data.map((item) => ({ ...item, key: item.id })),
      meta: omit(res, ['data']),
    }),
  });

  return (
    <div className="flex flex-col gap-4">
      <Typography.Title level={2}>아바타 관리</Typography.Title>
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
            navigate({ search: { page } });
          },
        }}
      />
    </div>
  );
}
