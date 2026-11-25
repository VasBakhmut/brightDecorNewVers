import Image from "next/image";
import { photos, type PhotoKey } from "@/lib/photos.generated";

type Props = {
  k: PhotoKey;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** Fills its (relatively positioned, sized) parent. */
export function Photo({ k, alt, sizes, priority, className = "" }: Props) {
  const p = photos[k];
  return (
    <Image
      src={p.src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`bg-paper-2 object-cover ${className}`}
    />
  );
}
