'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import type { Manga } from '@/lib/data'
import { Rating, TypePill } from '@/components/ui-bits'

export function MangaCard({ manga, index = 0 }: { manga: Manga; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -8, rotate: -1 }}
      className="group h-full"
    >
      <Link
        href={`/manga/${manga.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-ink bg-card shadow-comic transition-shadow group-hover:shadow-comic-lg"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={manga.cover || '/placeholder.svg'}
            alt={`Cover of ${manga.title}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-2 top-2">
            <TypePill type={manga.type} />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-primary/90 py-2 text-sm font-bold text-primary-foreground transition-transform duration-300 group-hover:translate-y-0">
            <BookOpen className="size-4" /> Read now
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-3">
          <h3 className="line-clamp-1 font-bold text-foreground">{manga.title}</h3>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {manga.year} · {manga.status}
          </p>
          <div className="mt-auto flex items-center justify-between pt-1">
            <Rating value={manga.rating} />
            <span className="text-xs font-semibold text-muted-foreground">
              {manga.chapters.length} ch
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
