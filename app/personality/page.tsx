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
          src="/photos/train.webp"
          width={904}
          height={1200}
          side="left"
          className="left-0 top-16 hidden h-[240px] w-[320px] xl:block"
          imageClassName="object-[45%_45%] opacity-90 brightness-125 saturate-[0.6]"
        />
        <PageHero
          number="03"
          kicker="self"
          title="Собираю сам — от идеи до устройства."
          description="Software и hardware в одном подходе: код, инфраструктура, 3D-печать и ремонт железа."
          meta={[
            { label: "образование", value: "БГТУ «Военмех», 2 курс" },
            { label: "локация", value: "Санкт-Петербург" },
            { label: "фокус", value: "software × hardware" },
          ]}
        />
      </div>

      <section className="container-page pb-0" aria-labelledby="about-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_260px]">
          <div>
            <h2
              id="about-title"
              className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted/80"
            >
              о себе
            </h2>
            <div className="mt-6 max-w-xl space-y-4 text-[13px] leading-7 text-muted/85">
              <p>
                Меня зовут Артём Плюсенков, 19 лет, живу в Санкт-Петербурге.
                Инженер-разработчик с фокусом на стык software и hardware:
                код, инфраструктура, 3D-печать и ремонт железа.
              </p>
              <p>
                Учусь в БГТУ «Военмех» на направлении «Лазерные технологии»,
                второй курс. До вуза — гимназия №107 и Губернаторский ФМЛ №30,
                где проходил курс C и CGSG по компьютерной графике. Вуз дал
                САПР «Компас» и основы материаловедения.
              </p>
              <p>
                C/C++ — 4 года, Python — 3–4 года активно, 3D-моделирование —
                6–7 лет. В работе ценю проверяемый результат: журналы,
                независимую проверку доступности и честное описание границ
                проведённого тестирования.
              </p>
            </div>
          </div>

          <aside className="border-t border-line/40 pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <PhotoFigure
              src="/photos/portrait-artem.webp"
              alt="Портрет Артёма Плюсенкова"
              caption="Артём · Санкт-Петербург"
              width={900}
              height={1200}
              priority
              className="mb-8"
            />
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted/80">
              сейчас
            </p>
            <dl className="mt-5 space-y-4">
              {currently.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted/80">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-[11px] leading-5 text-foreground/70">{item.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <div className="mt-16" aria-labelledby="values-title">
          <h2
            id="values-title"
            className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted/80"
          >
            ценности
          </h2>
          <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-3">
            {values.map((value) => (
              <article key={value.index} className="border-t border-line/50 pt-4">
                <span className="font-mono text-[8px] tracking-[0.16em] text-muted/80">
                  {value.index}
                </span>
                <h3 className="mt-6 text-[13px] font-medium text-foreground">{value.title}</h3>
                <p className="mt-2 text-[12px] leading-6 text-muted/85">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PhotoBand
        src="/photos/after-rain.webp"
        caption="после дождя"
        width={1200}
        height={1200}
        imageClassName="object-[50%_72%]"
      />

      <section className="container-page pt-16 pb-20">
        <div aria-labelledby="approach-title">
          <h2
            id="approach-title"
            className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted/80"
          >
            подход
          </h2>
          <div className="mt-6 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {approach.map((item) => (
              <article key={item.index} className="border-t border-line/50 pt-4">
                <span className="font-mono text-[8px] tracking-[0.16em] text-muted/80">
                  {item.index}
                </span>
                <h3 className="mt-6 text-[13px] font-medium text-foreground">{item.title}</h3>
                <p className="mt-2 max-w-md text-[12px] leading-6 text-muted/85">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16" aria-labelledby="interests-title">
          <h2
            id="interests-title"
            className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted/80"
          >
            интересы
          </h2>
          <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
            {interests.map((item) => (
              <li
                key={item}
                className="border-t border-line/50 py-3 text-[12px] leading-6 text-muted/80"
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
              className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted/80"
            >
              вне работы
            </h2>
            <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted/80">
              04
            </span>
          </div>
          <p className="mt-3 max-w-xl text-[12px] leading-6 text-muted/80">
            Коты и велосипед — личные кадры.
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
