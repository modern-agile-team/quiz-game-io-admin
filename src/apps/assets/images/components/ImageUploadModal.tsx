import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { Form, Input, Modal, Upload } from 'antd';

interface FormValues {
  fileList: UploadFile[];
  category: string;
}

interface UploadData {
  fileList: File[];
  category: string;
}
interface Props {
  isOpen: boolean;
  onClose: (data: UploadData | null) => void;
}

export default function ImageUploadModal({ isOpen, onClose }: Props) {
  const [form] = Form.useForm<FormValues>();

  const handleOk = async () => {
    try {
      await form.validateFields();
    } catch {
      return;
    }

    const { fileList, category } = form.getFieldsValue();

    if (confirm('이미지를 업로드 하시겠습니까?')) {
      onClose({
        fileList: fileList.map(
          (file: UploadFile) => file.originFileObj as File
        ),
        category,
      });
    }
  };

  const handleCancel = () => {
    const fileList = form.getFieldValue('fileList') || [];
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
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ category: '', fileList: [] }}
      >
        <Form.Item
          name="category"
          label="카테고리"
          rules={[{ required: true, message: '카테고리 선택은 필수입니다.' }]}
        >
          <Input placeholder="예: 워크샵, 제품 사진 등" />
        </Form.Item>

        <Form.Item
          name="fileList"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
          rules={[
            {
              required: true,
              message: '업로드할 이미지를 하나 이상 선택해주세요.',
            },
          ]}
        >
          <Upload
            multiple
            beforeUpload={() => false}
            accept="image/*"
            listType="picture-card"
            className="max-h-[500px] overflow-y-auto"
          >
            <PlusOutlined />
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
