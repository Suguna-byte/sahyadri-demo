import Image from "next/image";
import clsx from "clsx";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Slow zoom on hover of the nearest `.group` ancestor. */
  zoom?: boolean;
};

/**
 * next/image in `fill` mode inside a positioned, clipped frame. The frame
 * owns the aspect ratio (set via className), which reserves space before
 * the image loads — no layout shift (CLS ≈ 0). The sand background doubles
 * as a placeholder colour while the photo streams in.
 */
export function Photo({ src, alt, className, sizes = "(min-width: 1024px) 50vw, 100vw", priority, zoom }: Props) {
  return (
    <div className={clsx("relative overflow-hidden bg-sand", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={clsx(
          "object-cover",
          zoom && "transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]",
        )}
      />
    </div>
  );
}
