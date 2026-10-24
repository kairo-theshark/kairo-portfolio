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
  reveal?: "up" | "left" | "right"
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
  reveal = "up",
}: PhotoFigureProps) {
  const revealClass =
    reveal === "left" ? "photo-edge-left" : reveal === "right" ? "photo-edge-right" : "photo-reveal"

  return (
    <figure className={cn(revealClass, "group break-inside-avoid", className)}>
      <div className="overflow-hidden rounded-xl border border-line/40 bg-surface/20 transition-colors duration-500 group-hover:border-accent/35">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized
          priority={priority}
          className={cn(
            "h-auto w-full saturate-[0.72] transition duration-700 ease-out group-hover:scale-[1.03] group-hover:saturate-100",
            imageClassName,
          )}
        />
      </div>
      <figcaption className="mt-2 font-mono text-[8px] uppercase tracking-[0.14em] text-muted/85">
        {caption}
      </figcaption>
    </figure>
  )
}
