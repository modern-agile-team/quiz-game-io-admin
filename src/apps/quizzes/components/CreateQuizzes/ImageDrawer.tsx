import { Image } from 'antd';
import React from 'react';

import { IMAGE_GALLERY_MOCK } from '@/apps/quizzes/mock/quizzes';

interface ImageGalleryProps {
  onSelect: (imageUrl: string) => void;
}

const ImageDrawer: React.FC<ImageGalleryProps> = ({ onSelect }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
      }}
    >
      {IMAGE_GALLERY_MOCK.map((imageUrl) => (
        <Image
          key={imageUrl}
          src={imageUrl}
          alt={`${imageUrl}`}
          width={200}
          height={200}
          style={{
            objectFit: 'cover',
            cursor: 'pointer',
            border: '1px solid #999',
            borderRadius: 16,
          }}
          onClick={() => onSelect(imageUrl)}
          preview={false}
        />
      ))}
    </div>
  );
};

export default ImageDrawer;
