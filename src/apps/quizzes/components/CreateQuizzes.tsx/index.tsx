import type { TableProps } from 'antd';
import { Button, Drawer, Form, Popconfirm, Table } from 'antd';
import { useState } from 'react';

import EditableCell from './EditTableCell';
import ImageDrawer from './ImageDrawer';
import type { CreateQuizDto } from './schema';

export default function CreateQuizzes() {
  const [form] = Form.useForm();
  const [data, setData] = useState<CreateQuizDto[]>([
    {
      key: '1',
      type: '',
      question: '',
      answer: '',
      imageUrl: '',
    },
  ]);
  const [count, setCount] = useState(2);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRowKey, setSelectedRowKey] = useState<string | null>(null);

  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const handleAdd = () => {
    const newData: CreateQuizDto = {
      key: count.toString(),
      type: '',
      question: '',
      answer: '',
      imageUrl: '',
    };
    setData([...data, newData]);
    setCount(count + 1);
  };

  const handleSave = (
    key: string,
    dataIndex: keyof CreateQuizDto,
    value: unknown
  ) => {
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        [dataIndex]: value,
      });
      setData(newData);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    if (selectedRowKey) {
      handleSave(selectedRowKey, 'imageUrl', imageUrl);
    }
    setDrawerVisible(false);
  };

  const columns: TableProps<CreateQuizDto>['columns'] = [
    {
      title: '번호',
      dataIndex: 'key',
      render: (_text, _record, index) => `${index + 1}`,
    },
    {
      title: '카테고리',
      dataIndex: 'type',
      width: '15%',
      onCell: (record: CreateQuizDto) => ({
        record,
        inputType: 'select',
        dataIndex: 'type',
        onSave: handleSave,
        isEdit: true,
        children: record.type,
      }),
    },
    {
      title: '질문',
      dataIndex: 'question',
      width: '45%',

      onCell: (record: CreateQuizDto) => ({
        record,
        inputType: 'text',
        dataIndex: 'question',
        onSave: handleSave,
        isEdit: true,
        children: record.question,
      }),
    },
    {
      title: '정답',
      dataIndex: 'answer',
      width: '15%',
      onCell: (record: CreateQuizDto) => ({
        record,
        inputType: 'text',
        dataIndex: 'answer',
        onSave: handleSave,
        isEdit: true,
        children: record.answer,
      }),
    },
    {
      title: '이미지',
      dataIndex: 'imageUrl',
      width: '10%',
      render: (imageUrl: string, record: CreateQuizDto) => (
        <>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="quiz"
              onClick={() => {
                setDrawerVisible(true);
                setSelectedRowKey(record.key);
              }}
            />
          ) : (
            <Button
              onClick={() => {
                setDrawerVisible(true);
                setSelectedRowKey(record.key);
              }}
            >
              이미지 선택
            </Button>
          )}
        </>
      ),
    },
    {
      title: '삭제',
      dataIndex: 'operation',
      render: (_, record: { key: React.Key }) =>
        data.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>삭제</a>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <>
      <header className="p-6 border-b border-contents-200 flex justify-between items-center">
        <div>
          <h1 className="text-title-2 font-bold">퀴즈 추가</h1>
          <p className="text-contents-600 mt-1">
            셀에 새로운 정보를 입력해 주세요.
          </p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors cursor-pointer">
          변경 사항 저장
        </button>
      </header>
      <main className="p-6">
        <Form form={form} component={false}>
          <Table
            components={{
              body: { cell: EditableCell },
            }}
            bordered
            dataSource={data}
            columns={columns}
            rowClassName="editable-row"
            pagination={false}
          />
        </Form>
        <Button
          onClick={handleAdd}
          type="primary"
          className="bg-primary-600 mt-5"
        >
          행 추가
        </Button>
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
