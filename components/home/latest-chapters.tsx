'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { getLatestChapters } from '@/lib/data'
import { SectionHeading, TypePill } from '@/components/ui-bits'

function timeAgo(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('ar', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function LatestChapters() {
  const items = getLatestChapters(6)

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading
        kicker="طازج من الماسح الضوئي"
        title="أحدث الفصول"
        action={
          <Link
            href="/browse"
            className="text-sm font-bold text-primary hover:underline"
          >
            عرض الكل
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={`${it.manga.slug}-${it.chapter.number}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.3) }}
            whileHover={{ y: -4 }}
          >
            <Link
              href={`/read/${it.manga.slug}/${it.chapter.number}`}
              className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-card p-3 shadow-comic-sm transition-shadow hover:shadow-comic"
            >
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border-2 border-ink">
                <Image
                  src={it.manga.cover || '/placeholder.svg'}
                  alt={`Cover of ${it.manga.title}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <TypePill type={it.manga.type} />
                </div>
                <h3 className="line-clamp-1 font-bold text-foreground">
                  {it.manga.title}
                </h3>
                <p className="line-clamp-1 text-sm text-muted-foreground">
                  الفصل {it.chapter.number} — {it.chapter.title}
                </p>
                <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" /> {timeAgo(it.chapter.releasedAt)}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
