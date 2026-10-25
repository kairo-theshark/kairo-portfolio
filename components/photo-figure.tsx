import Image from "next/image"

import { cn } from "@/lib/utils"

interface PhotoFigureProps {
  src: string
  alt: string
  caption: string
  width: number
  height: number
  className?: string
  imageClassName?: string
  priority?: boolean
}

export function PhotoFigure({
  src,
  alt,
  caption,
  width,
  height,
  className,
  imageClassName,
  priority = false,
}: PhotoFigureProps) {
  return (
    <figure className={cn("break-inside-avoid", className)}>
      <div className="overflow-hidden rounded-xl border border-line/40 bg-surface/20">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized
          priority={priority}
          className={cn("h-auto w-full saturate-[0.72]", imageClassName)}
        />
      </div>
      <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted/85">
        {caption}
      </figcaption>
    </figure>
  )
}
