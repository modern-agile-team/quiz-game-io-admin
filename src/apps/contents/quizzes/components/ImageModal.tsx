import { useQuery } from '@tanstack/react-query';
import { Col, Flex, Image, Pagination, Row } from 'antd';
import { useState } from 'react';

import type { QuizImageAdminDto } from '@/lib/apis/_generated/quizzesGameIoBackend.schemas';
import { imageQueries } from '@/shared/service/query/image';

interface ImageGalleryProps {
  onSelect: (
    image: Pick<QuizImageAdminDto, 'quizImageUrl' | 'quizImageFileName'>
  ) => void;
}

const MAX_PAGE = 30;

export default function ImageModal({ onSelect }: ImageGalleryProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery(
    imageQueries.getList({
      category: undefined,
      page: currentPage,
      perPage: MAX_PAGE,
      sort: undefined,
    })
  );

  return (
    <Flex vertical>
      <Row gutter={[16, 16]} style={{ overflow: 'auto', maxHeight: 550 }}>
        {data?.data.map((image) => (
          <Col span={8}>
            <Image
              key={image.id}
              src={image.quizImageUrl}
              alt={image.name}
              width="100%"
              height={200}
              style={{
                objectFit: 'cover',
                cursor: 'pointer',
                borderRadius: 16,
              }}
              onClick={() => onSelect(image)}
              preview={false}
            />
          </Col>
        ))}
      </Row>
      <Pagination
        defaultCurrent={data?.currentPage}
        total={data?.totalCount}
        pageSize={MAX_PAGE}
        align="end"
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: 15 }}
      />
    </Flex>
  );
}
