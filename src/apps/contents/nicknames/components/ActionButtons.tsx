import { useMutation } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Alert, App, Button } from 'antd';

import { nicknameQueries } from '@/shared/service/query/nicknames';

interface Props {
  selectedNicknameIds: string[];
  onRemoveNicknames: () => void;
}

export default function ActionButtons({
  selectedNicknameIds,
  onRemoveNicknames,
}: Props) {
  const { message, modal } = App.useApp();

  const { mutateAsync: removeNickname } = useMutation({
    ...nicknameQueries.removeNickname,
    retry: false,
  });

  const handleRemoveImages = async () => {
    const shouldRemove = await modal.confirm({
      title: '닉네임 소스 삭제',
      okText: '삭제',
      cancelText: '취소',
      okButtonProps: { danger: true },
      icon: null,
      content: (
        <Alert
          message="선택한 닉네임 소스를 삭제하시겠습니까?"
          description="삭제된 닉네임 소스는 복구할 수 없습니다."
          type="error"
        />
      ),
    });

    if (shouldRemove) {
      try {
        await Promise.all(selectedNicknameIds.map((id) => removeNickname(id)));
        message.success('닉네임 소스를 삭제했어요.');
      } catch {
        message.error('삭제 중 오류가 발생했어요.');
      }
      onRemoveNicknames();
    }
  };

  return (
    <div className="flex gap-4 self-end">
      {selectedNicknameIds.length > 0 && (
        <Button danger onClick={handleRemoveImages}>
          선택된 닉네임 삭제
        </Button>
      )}
      <Link to="/contents/nicknames/create">
        <Button type="primary">닉네임 추가</Button>
      </Link>
    </div>
  );
}
