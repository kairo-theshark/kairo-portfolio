import type { Metadata } from "next"

import { PageHero } from "@/components/page-hero"
import { PhotoBackdrop } from "@/components/photo-backdrop"
import { PhotoBand } from "@/components/photo-band"
import { PhotoFigure } from "@/components/photo-figure"
import { approach, currently, interests, personalPhotos, values } from "@/lib/content"

export const metadata: Metadata = {
  title: "Личность",
  description:
    "Инженер-разработчик на стыке software и hardware: ценности, подход к работе и текущие интересы.",
}

export default function PersonalityPage() {
  return (
    <>
      <div className="relative overflow-hidden xl:pt-[196px]">
        <PhotoBackdrop
          src="/photos/placeholder-2.webp"
          width={904}
          height={1200}
          side="left"
          className="left-0 top-16 hidden h-[240px] w-[320px] xl:block"
          imageClassName="object-[45%_45%] opacity-90 brightness-125 saturate-[0.6]"
        />
        <PageHero
          number="03"
          kicker="self"
          title="Заголовок раздела"
          description="Одна строка описания раздела."
          meta={[
            { label: "образование", value: "Учебное заведение" },
            { label: "локация", value: "Город" },
            { label: "фокус", value: "Направление" },
          ]}
        />
      </div>

      <section className="container-page pb-0" aria-labelledby="about-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_260px]">
          <div>
            <h2
              id="about-title"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted/80"
            >
              о себе
            </h2>
            <div className="mt-6 max-w-xl space-y-4 text-[14px] leading-7 text-muted/85">
              <p>
                Короткий абзац о себе: чем занимаетесь, где учитесь или работаете
                и на что делаете упор.
              </p>
              <p>
                Второй абзац: образование, курсы, практический опыт — всё, что
                считаете важным показать.
              </p>
              <p>
                Третий абзац: технологии и инструменты, опыт в годах, принципы
                работы и отношение к результату.
              </p>
            </div>
          </div>

          <aside className="border-t border-line/40 pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <PhotoFigure
              src="/photos/placeholder-1.webp"
              alt="Описание фотографии"
              caption="Фотография"
              width={900}
              height={1200}
              priority
              imageClassName="saturate-100"
              className="mb-8"
            />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted/80">
              сейчас
            </p>
            <dl className="mt-5 space-y-4">
              {currently.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted/80">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-[14px] leading-5 text-foreground/70">{item.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <div className="mt-16" aria-labelledby="values-title">
          <h2
            id="values-title"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted/80"
          >
            ценности
          </h2>
          <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-3">
            {values.map((value) => (
              <article key={value.index} className="border-t border-line/50 pt-4">
                <span className="font-mono text-[11px] tracking-[0.16em] text-muted/80">
                  {value.index}
                </span>
                <h3 className="mt-6 text-[14px] font-medium text-foreground">{value.title}</h3>
                <p className="mt-2 text-[14px] leading-7 text-muted/85">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PhotoBand
        src="/photos/placeholder-3.webp"
        caption="Фотография"
        width={1200}
        height={1200}
        imageClassName="object-[50%_72%]"
      />

      <section className="container-page pt-16 pb-20">
        <div aria-labelledby="approach-title">
          <h2
            id="approach-title"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted/80"
          >
            подход
          </h2>
          <div className="mt-6 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {approach.map((item) => (
              <article key={item.index} className="border-t border-line/50 pt-4">
                <span className="font-mono text-[11px] tracking-[0.16em] text-muted/80">
                  {item.index}
                </span>
                <h3 className="mt-6 text-[14px] font-medium text-foreground">{item.title}</h3>
                <p className="mt-2 max-w-md text-[14px] leading-7 text-muted/85">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16" aria-labelledby="interests-title">
          <h2
            id="interests-title"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted/80"
          >
            интересы
          </h2>
          <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
            {interests.map((item) => (
              <li
                key={item}
                className="border-t border-line/50 py-3 text-[14px] leading-7 text-muted/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16" aria-labelledby="photos-title">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="photos-title"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted/80"
            >
              вне работы
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted/80">
              04
            </span>
          </div>
          <p className="mt-3 max-w-xl text-[14px] leading-7 text-muted/80">
            Описание фотографий раздела.
          </p>
          <div className="mt-6 columns-2 gap-4 lg:columns-3">
            {personalPhotos.map((photo) => (
              <PhotoFigure key={photo.src} {...photo} className="mb-4" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
