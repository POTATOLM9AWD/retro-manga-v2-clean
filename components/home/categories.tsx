'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ALL_GENRES, genreAr } from '@/lib/data'
import { SectionHeading } from '@/components/ui-bits'

const TONES = [
  'bg-primary/20 border-primary',
  'bg-secondary/30 border-secondary',
  'bg-accent/30 border-accent',
]

export function Categories() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading kicker="اقفز مباشرة" title="التصنيفات" />
      <div className="flex flex-wrap gap-3">
        {ALL_GENRES.map((genre, i) => (
          <motion.div
            key={genre}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
            whileHover={{ y: -4, rotate: -2 }}
          >
            <Link
              href={`/browse?genre=${encodeURIComponent(genre)}`}
              className={`inline-flex rounded-full border-2 border-ink px-5 py-2.5 text-sm font-extrabold text-ink shadow-comic-sm transition-shadow hover:shadow-comic ${
                TONES[i % TONES.length]
              }`}
            >
              {genreAr(genre)}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
