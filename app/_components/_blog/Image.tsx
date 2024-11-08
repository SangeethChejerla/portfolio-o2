import Image from 'next/image';
import React from 'react';

interface MDXImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  [key: string]: any;
}

export const MDXImage: React.FC<MDXImageProps> = ({
  src,
  alt,
  width,
  height,
  ...props
}) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    layout="responsive"
    {...props}
  />
);
