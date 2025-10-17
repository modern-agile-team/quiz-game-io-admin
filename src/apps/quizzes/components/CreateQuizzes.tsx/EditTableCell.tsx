import { Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

import type { CreateQuizDto } from './schema';

interface EditableCellProps {
  dataIndex: keyof CreateQuizDto;
  record: CreateQuizDto;
  inputType: 'number' | 'text' | 'select';
  onSave: (key: string, dataIndex: keyof CreateQuizDto, value: unknown) => void;
  children: React.ReactNode;
}

const SelectBox = ({
  record,
  dataIndex,
  onSave,
}: Omit<EditableCellProps, 'children' | 'inputType'>) => (
  <Select
    autoFocus
    defaultValue={record[dataIndex]}
    style={{ width: '100%', minWidth: '120px' }}
    onChange={(value) => onSave(record.key, dataIndex, value)}
    options={[
      { value: 'multipleChoice', label: '다중선택' },
      { value: 'shortAnswer', label: '짧은 글' },
      { value: 'selectPicture', label: '그림맞추기' },
      { value: 'correctWords', label: '단어맞추기' },
    ]}
  />
);

const TextBox = ({
  record,
  dataIndex,
  onSave,
}: Omit<EditableCellProps, 'children' | 'inputType'>) => (
  <TextArea
    defaultValue={record[dataIndex]}
    autoFocus
    autoSize
    onPressEnter={(e) =>
      onSave(record.key, dataIndex, (e.target as HTMLInputElement).value)
    }
    onBlur={(e) => onSave(record.key, dataIndex, e.target.value)}
  />
);

const EditableCell: React.FC<EditableCellProps> = ({
  dataIndex,
  record,
  inputType,
  onSave,
  children,
  ...restProps
}) => {
  const renderCell = () => {
    if (inputType === 'select') {
      return (
        <SelectBox
          record={record}
          dataIndex={dataIndex}
          onSave={onSave}
          {...restProps}
        />
      );
    }
    if (inputType === 'text') {
      return (
        <TextBox
          record={record}
          dataIndex={dataIndex}
          onSave={onSave}
          {...restProps}
        />
      );
    }
    return children;
  };

  return <td {...restProps}>{renderCell()}</td>;
};
export default EditableCell;
