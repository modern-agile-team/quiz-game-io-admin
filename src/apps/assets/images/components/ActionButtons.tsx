import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert, App, Button } from 'antd';
import { overlay } from 'overlay-kit';

import { imageQueries } from '@/shared/service/query/image';

import ImageUploadModal from './ImageUploadModal';

interface UploadData {
  files: File[];
  category: string;
}

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

  return (
    <div className="flex gap-4 self-end">
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
            const { files, category } = uploadData;
            files.forEach((file) => {
              uploadImage({ file, category });
            });
          }
        }}
      >
        이미지 업로드
      </Button>
    </div>
  );
}
