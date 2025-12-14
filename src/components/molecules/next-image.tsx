"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import fallbackImage from "@/public/images/news-fallback-image.jpg";
import { BlurHash } from "@/config/data";

export const NextImage: React.FC<ImageProps> = (props) => {
  const [error, setError] = useState(false);
  return (
    <Image
      {...props}
      src={error ? fallbackImage : props?.src}
      alt={error ? "fallback-image.png" : props?.alt}
      className={error ? "object-cover" : props?.className}
      sizes="(min-width: 1024px) 50vw, 100vw"
      onError={() => setError(true)}
      blurDataURL={BlurHash}
    />
  );
};
