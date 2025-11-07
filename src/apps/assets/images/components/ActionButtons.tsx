import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Alert, App, Button, Select } from 'antd';
import { overlay } from 'overlay-kit';

import { imageQueries } from '@/shared/service/query/image';

import ImageUploadModal from './ImageUploadModal';
import type { UploadData } from './schema';

interface Props {
  selectedImageIds: string[];
  onRemoveImages: () => void;
}

export default function ActionButtons({
  selectedImageIds,
  onRemoveImages,
}: Props) {
  const queryClient = useQueryClient();
  const { message, modal } = App.useApp();

  const { page, sortBy, orderBy } = useSearch({
    from: '/(menus)/assets/images/',
  });
  const navigate = useNavigate({ from: '/assets/images' });

  const { mutate: uploadImage, isPending: isUploading } = useMutation({
    ...imageQueries.uploadImage,
    onSuccess: () => {
      message.success('이미지를 업로드했어요.');
      queryClient.invalidateQueries({
        queryKey: imageQueries.getList({ category: undefined }).queryKey,
      });
    },
    onError: () => {
      message.error('업로드 중 오류가 발생했어요.');
    },
    retry: false,
  });

  const { mutateAsync: removeImage } = useMutation({
    ...imageQueries.removeImage,
    retry: false,
  });

  const handleRemoveImages = async () => {
    const shouldRemove = await modal.confirm({
      title: '이미지 삭제',
      okText: '삭제',
      cancelText: '취소',
      okButtonProps: { danger: true },
      icon: null,
      content: (
        <Alert
          message="선택한 이미지를 삭제하시겠습니까?"
          description="삭제된 이미지는 복구할 수 없습니다."
          type="error"
        />
      ),
    });

    if (shouldRemove) {
      try {
        await Promise.all(
          selectedImageIds.map((id) => removeImage(id.toString()))
        );
        message.success('이미지를 삭제했어요.');
      } catch {
        message.error('삭제 중 오류가 발생했어요.');
      }
      onRemoveImages();
    }
  };

  const handleSelectSortField = (value: string) => {
    navigate({ search: { page, sortBy: value, orderBy } });
  };

  const handleToggleSortType = (type: 'asc' | 'desc') => {
    navigate({ search: { page, sortBy, orderBy: type } });
  };

  return (
    <div className="flex gap-4 justify-between">
      <div className="flex gap-1">
        <Select
          value={sortBy ?? undefined}
          style={{ width: 120 }}
          options={[
            { value: 'createdAt', label: '생성 날짜' },
            { value: 'updatedAt', label: '수정 날짜' },
            { value: 'name', label: '이름' },
            { value: 'category', label: '카테고리' },
          ]}
          onChange={handleSelectSortField}
        />
        <Button
          onClick={() =>
            handleToggleSortType(orderBy === 'desc' ? 'asc' : 'desc')
          }
        >
          {orderBy === 'desc' ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </Button>
      </div>
      <div>
        {selectedImageIds.length > 0 && (
          <Button danger onClick={handleRemoveImages}>
            선택된 이미지 삭제
          </Button>
        )}
        <Button
          loading={isUploading}
          disabled={isUploading}
          onClick={async () => {
            const uploadData = await overlay.openAsync<UploadData | null>(
              ({ close, isOpen }) => (
                <ImageUploadModal isOpen={isOpen} onClose={close} />
              )
            );

            if (uploadData) {
              const { fileList, category } = uploadData;
              fileList.forEach((file) => {
                uploadImage({ file, category });
              });
            }
          }}
        >
          이미지 업로드
        </Button>
      </div>
    </div>
  );
}
