import { Image } from 'antd';
import React from 'react';

import { IMAGE_GALLERY_MOCK } from '@/apps/quizzes/mock/quizzes';

interface ImageGalleryProps {
  onSelect: (imageUrl: string) => void;
}

const ImageDrawer: React.FC<ImageGalleryProps> = ({ onSelect }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {IMAGE_GALLERY_MOCK.map((imageUrl) => (
        <Image
          key={imageUrl}
          src={imageUrl}
          alt={`${imageUrl}`}
          width={150}
          height={150}
          style={{ objectFit: 'cover', cursor: 'pointer' }}
          onClick={() => onSelect(imageUrl)}
          preview={false}
        />
      ))}
    </div>
  );
};

export default ImageDrawer;
