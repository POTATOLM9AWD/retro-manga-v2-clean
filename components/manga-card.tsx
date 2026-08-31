'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Heart } from 'lucide-react'
import type { Manga } from '@/lib/data'
import { Rating, TypePill } from '@/components/ui-bits'
import { useFavorites } from '@/lib/favorites'
import { cn } from '@/lib/utils'

export function MangaCard({ manga, index = 0 }: { manga: Manga; index?: number }) {
  const { isFavorite, toggle, ready } = useFavorites()
  const fav = ready && isFavorite(manga.slug)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -8, rotate: -1 }}
      className="group relative h-full"
    >
      <Link
        href={`/manga/${manga.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-ink bg-card shadow-comic transition-shadow group-hover:shadow-comic-lg"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={manga.cover || '/placeholder.svg'}
            alt={`غلاف ${manga.title}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute right-2 top-2">
            <TypePill type={manga.type} />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-primary/90 py-2 text-sm font-bold text-primary-foreground transition-transform duration-300 group-hover:translate-y-0">
            <BookOpen className="size-4" /> اقرأ الآن
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-3">
          <h3 className="line-clamp-1 font-bold text-foreground">{manga.title}</h3>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {manga.year} · {manga.chapters.length} فصل
          </p>
          <div className="mt-auto flex items-center justify-between pt-1">
            <Rating value={manga.rating} />
            <span className="text-xs font-semibold text-muted-foreground">
              {manga.chapters.length} فصل
            </span>
          </div>
        </div>
      </Link>

      {/* Favorite heart — bottom-left corner of the cover */}
      <button
        type="button"
        onClick={() => toggle(manga.slug)}
        aria-pressed={fav}
        aria-label={fav ? `إزالة ${manga.title} من المفضلة` : `إضافة ${manga.title} إلى المفضلة`}
        className={cn(
          'absolute left-2 top-2 grid size-9 place-items-center rounded-full border-2 border-ink bg-card/90 shadow-comic-sm backdrop-blur transition-transform hover:-translate-y-0.5 active:translate-y-0',
        )}
      >
        <Heart
          className={cn(
            'size-4 transition-colors',
            fav ? 'fill-[#FF3B30] text-[#FF3B30]' : 'text-[#cccccc]',
          )}
        />
      </button>
    </motion.article>
  )
}
