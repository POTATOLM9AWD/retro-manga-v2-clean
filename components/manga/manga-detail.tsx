'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Heart,
  Share2,
  Check,
  BookOpen,
  Calendar,
  Signal,
  User,
  ChevronRight,
} from 'lucide-react'
import { type Manga, STATUS_AR, genreAr } from '@/lib/data'
import { Pill, Rating, TypePill } from '@/components/ui-bits'
import { useFavorites } from '@/lib/favorites'
import { cn } from '@/lib/utils'

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('ar', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const statusTone = {
  Ongoing: 'blue',
  Completed: 'pink',
  Hiatus: 'yellow',
} as const

export function MangaDetail({ manga }: { manga: Manga }) {
  const { isFavorite, toggle, ready } = useFavorites()
  const fav = ready && isFavorite(manga.slug)
  const [copied, setCopied] = useState(false)

  const chaptersDesc = [...manga.chapters].sort((a, b) => b.number - a.number)
  const firstChapter = manga.chapters[0]

  const share = async () => {
    const url =
      typeof window !== 'undefined' ? window.location.href : `/manga/${manga.slug}`
    try {
      if (navigator.share) {
        await navigator.share({ title: manga.title, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* user cancelled share — ignore */
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <ChevronRight className="size-3.5 rotate-180" />
        <Link href="/browse" className="hover:text-primary">
          المكتبة
        </Link>
        <ChevronRight className="size-3.5 rotate-180" />
        <span className="font-semibold text-foreground">{manga.title}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-[260px_1fr]">
        {/* Cover column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto w-full max-w-[260px]"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-ink shadow-comic-lg">
            <Image
              src={manga.cover || '/placeholder.svg'}
              alt={`Cover of ${manga.title}`}
              fill
              sizes="260px"
              priority
              className="object-cover"
            />
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <Link
              href={`/read/${manga.slug}/${firstChapter.number}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-primary px-5 py-3 text-sm font-extrabold text-primary-foreground shadow-comic transition-transform hover:-translate-y-1 active:translate-y-0"
            >
              <BookOpen className="size-5" /> ابدأ القراءة
            </Link>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => toggle(manga.slug)}
                aria-pressed={fav}
                className={cn(
                  'inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-ink px-4 py-2.5 text-sm font-bold shadow-comic-sm transition-transform hover:-translate-y-0.5 active:translate-y-0',
                  fav
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-foreground',
                )}
              >
                <Heart className={cn('size-4', fav && 'fill-current')} />
                {fav ? 'في المفضلة' : 'أضف للمفضلة'}
              </button>
              <button
                type="button"
                onClick={share}
                aria-label="مشاركة"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-card px-4 py-2.5 text-sm font-bold text-foreground shadow-comic-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {copied ? (
                  <Check className="size-4 text-primary" />
                ) : (
                  <Share2 className="size-4" />
                )}
                <span className="sr-only sm:not-sr-only">
                  {copied ? 'تم النسخ' : 'مشاركة'}
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Info column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <TypePill type={manga.type} />
            <Pill tone={statusTone[manga.status]}>{STATUS_AR[manga.status]}</Pill>
            <Rating value={manga.rating} className="ml-1" />
            <span className="text-xs text-muted-foreground">
              ({manga.votes.toLocaleString('ar')} تصويت)
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground text-balance sm:text-4xl">
            {manga.title}
          </h1>
          {manga.altTitle && (
            <p className="mt-1 text-lg text-muted-foreground">
              {manga.altTitle}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {manga.genres.map((g) => (
              <Link
                key={g}
                href={`/browse?genre=${encodeURIComponent(g)}`}
                className="rounded-full border-2 border-border bg-card px-3 py-1 text-xs font-bold text-muted-foreground transition-colors hover:border-ink hover:text-foreground"
              >
                {genreAr(g)}
              </Link>
            ))}
          </div>

          {/* Info grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <InfoTile icon={User} label="المؤلف" value={manga.author} />
            <InfoTile icon={Calendar} label="السنة" value={String(manga.year)} />
            <InfoTile icon={Signal} label="الحالة" value={STATUS_AR[manga.status]} />
          </div>

          <p className="mt-6 leading-relaxed text-foreground/90 text-pretty">
            {manga.description}
          </p>
        </motion.div>
      </div>

      {/* Chapters */}
      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-foreground">
            الفصول{' '}
            <span className="text-base font-bold text-muted-foreground">
              ({manga.chapters.length})
            </span>
          </h2>
          <span className="text-xs font-semibold text-muted-foreground">
            الأحدث أولاً
          </span>
        </div>

        <ul className="flex flex-col gap-2">
          {chaptersDesc.map((c, i) => (
            <motion.li
              key={c.number}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.3) }}
            >
              <Link
                href={`/read/${manga.slug}/${c.number}`}
                className="group flex items-center justify-between gap-4 rounded-xl border-2 border-ink bg-card px-4 py-3 shadow-comic-sm transition-transform hover:-translate-y-0.5 hover:bg-[color:var(--yellow)]/30"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg border-2 border-ink bg-background text-sm font-extrabold text-foreground">
                    {c.number}
                  </span>
                  <div className="min-w-0">
                    <p className="line-clamp-1 font-bold text-foreground">
                      {c.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {fmtDate(c.releasedAt)} · {c.pages.length} صفحة
                    </p>
                  </div>
                </div>
                <BookOpen className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </Link>
            </motion.li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border-2 border-ink bg-card p-3 shadow-comic-sm">
      <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        <Icon className="size-3.5" /> {label}
      </p>
      <p className="mt-1 line-clamp-1 font-bold text-foreground">{value}</p>
    </div>
  )
}
