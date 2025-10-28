import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { Form, Input, Modal, Upload } from 'antd';
import { useState } from 'react';

interface UploadData {
  files: File[];
  category: string;
}

interface Props {
  isOpen: boolean;
  onClose: (data: UploadData | null) => void;
}

export default function ImageUploadModal({ isOpen, onClose }: Props) {
  const [form] = Form.useForm<{ category: string }>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleOk = async () => {
    const { category } = await form.validateFields();

    if (fileList.length === 0) {
      Modal.warning({ content: '업로드할 이미지를 하나 이상 선택해주세요.' });
      return;
    }

    if (confirm('이미지를 업로드 하시겠습니까?')) {
      onClose({
        files: fileList.map((file) => file.originFileObj as File),
        category,
      });
    }
  };

  const handleCancel = () => {
    if (fileList.length > 0) {
      if (
        !confirm('업로드하지 않은 이미지가 있습니다. 모달을 닫으시겠습니까?')
      ) {
        return;
      }
    }
    onClose(null);
  };

  return (
    <Modal
      title="이미지 업로드"
      open={isOpen}
      okText="업로드"
      cancelText="취소"
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form form={form} layout="vertical" initialValues={{ category: '' }}>
        <Form.Item
          name="category"
          label="카테고리"
          rules={[{ required: true, message: '카테고리를 입력해주세요.' }]}
        >
          <Input placeholder="예: 워크샵, 제품 사진 등" />
        </Form.Item>

        <Upload
          multiple
          fileList={fileList}
          beforeUpload={() => false}
          accept="image/*"
          listType="picture-card"
          onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          className="max-h-[500px] overflow-y-auto"
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>이미지 추가</div>
          </div>
        </Upload>
      </Form>
    </Modal>
  );
}
