'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, BookOpen, Library } from 'lucide-react'
import { Mascot } from '@/components/mascot'
import { Pill } from '@/components/ui-bits'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink">
      {/* halftone corner texture */}
      <div className="halftone pointer-events-none absolute -right-10 -top-10 size-56 opacity-[0.08]" />
      <div className="halftone pointer-events-none absolute -bottom-12 -left-10 size-56 opacity-[0.08]" />

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Pill tone="pink" className="mb-4">
              <Sparkles className="size-3.5" /> 70s · 80s · 90s classics
            </Pill>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl md:text-6xl"
          >
            Rare old manga,{' '}
            <span
              className="text-glitch text-primary"
              data-text="lovingly"
            >
              lovingly
            </span>{' '}
            translated.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            Dig through the dusty archives with Retro-chan. Faded covers, warm
            screentones, and the best reader in the Arab world — all on cozy
            old paper.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground shadow-comic transition-transform hover:-translate-y-1 active:translate-y-0"
            >
              <Library className="size-5" /> Browse Library
            </Link>
            <Link
              href="/manga/neon-samurai"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-card px-6 py-3 text-sm font-extrabold text-foreground shadow-comic transition-transform hover:-translate-y-1 active:translate-y-0"
            >
              <BookOpen className="size-5" /> Start Reading
            </Link>
          </motion.div>
        </div>

        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, type: 'spring' }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 translate-y-6 scale-90 rounded-full bg-secondary/40 blur-2xl" />
            <div className="rounded-[2rem] border-2 border-ink bg-card/60 p-6 shadow-comic-lg">
              <Mascot mood="wave" size={240} priority />
            </div>
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -right-3 -top-3 rounded-full border-2 border-ink bg-[color:var(--yellow)] px-3 py-1 text-xs font-extrabold text-ink shadow-comic-sm"
            >
              Hi, I&apos;m Retro-chan!
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
