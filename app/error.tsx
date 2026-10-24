"use client"

import Link from "next/link"
import { RotateCcw } from "lucide-react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: ErrorProps) {
  return (
    <section className="container-page flex min-h-[70vh] items-center pb-20 pt-28">
      <div className="max-w-md">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted/80">
          ошибка / error
        </p>
        <h1 className="mt-5 text-3xl font-normal tracking-[-0.03em] text-foreground">
          Страница не загрузилась.
        </h1>
        <p className="mt-3 text-[13px] leading-6 text-muted">
          Попробуйте обновить раздел. Если ошибка повторяется, вернитесь на главную.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition hover:text-foreground"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            попробовать снова
          </button>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition hover:text-foreground"
          >
            на главную
          </Link>
        </div>
      </div>
    </section>
  )
}
