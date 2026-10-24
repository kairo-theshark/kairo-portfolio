"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

interface CopyEmailProps {
  email: string
  className?: string
}

export function CopyEmail({ email, className }: CopyEmailProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")

  async function handleCopy() {
    if (!navigator.clipboard) {
      setStatus("error")
      return
    }

    try {
      await navigator.clipboard.writeText(email)
      setStatus("copied")
      window.setTimeout(() => setStatus("idle"), 2000)
    } catch {
      setStatus("error")
    }
  }

  const label =
    status === "copied" ? "скопировано" : status === "error" ? "ошибка" : "копировать"

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80 transition hover:text-foreground",
        className,
      )}
      aria-label={`${label}: ${email}`}
    >
      {status === "copied" ? (
        <Check className="size-3 text-positive" aria-hidden="true" />
      ) : (
        <Copy className="size-3" aria-hidden="true" />
      )}
      <span aria-live="polite">{label}</span>
    </button>
  )
}
