import Image from "next/image"

import { cn } from "@/lib/utils"

interface PhotoBackdropProps {
  src: string
  width: number
  height: number
  className?: string
  imageClassName?: string
  side?: "left" | "right"
}

export function PhotoBackdrop({
  src,
  width,
  height,
  className,
  imageClassName,
  side = "right",
}: PhotoBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute select-none overflow-hidden",
        side === "right" ? "photo-mask-right photo-edge-in-right" : "photo-mask-left photo-edge-in-left",
        className,
      )}
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        unoptimized
        className={cn("h-full w-full object-cover saturate-[0.45] brightness-110", imageClassName)}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
    </div>
  )
}
