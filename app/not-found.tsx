import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70vh] items-center pb-20 pt-28">
      <div className="max-w-md">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted/80">
          404 / not found
        </p>
        <h1 className="mt-5 text-3xl font-normal tracking-[-0.03em] text-foreground">
          Страница не найдена.
        </h1>
        <p className="mt-3 text-[13px] leading-6 text-muted">
          Возможно, адрес изменился или раздел ещё не подключён.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          на главную
        </Link>
      </div>
    </section>
  )
}
