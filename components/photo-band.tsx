import Image from "next/image"

import { cn } from "@/lib/utils"

interface PhotoBandProps {
  src: string
  caption: string
  width: number
  height: number
  className?: string
  imageClassName?: string
}

export function PhotoBand({ src, caption, width, height, className, imageClassName }: PhotoBandProps) {
  return (
    <figure className={cn("relative mt-16 w-full overflow-hidden border-y border-line/30", className)}>
      <div className="relative h-[220px] sm:h-[300px]">
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          unoptimized
          className={cn(
            "h-full w-full object-cover opacity-55 saturate-[0.6] brightness-110",
            imageClassName,
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/35 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/60" />
        <figcaption className="container-page absolute inset-x-0 bottom-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          {caption}
        </figcaption>
      </div>
    </figure>
  )
}
