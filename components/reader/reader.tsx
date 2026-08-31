'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  Rows,
  MoveHorizontal,
  Home,
  Settings2,
  X,
} from 'lucide-react'
import type { Chapter, Manga } from '@/lib/data'
import { Mascot } from '@/components/mascot'
import { cn } from '@/lib/utils'

type Mode = 'webtoon' | 'rtl' | 'ltr'

const MODES: { id: Mode; label: string; icon: typeof Rows }[] = [
  { id: 'webtoon', label: 'Webtoon', icon: Rows },
  { id: 'rtl', label: 'RTL', icon: ArrowLeft },
  { id: 'ltr', label: 'LTR', icon: ArrowRight },
]

export function Reader({
  manga,
  chapter,
  prev,
  next,
}: {
  manga: Manga
  chapter: Chapter
  prev?: Chapter
  next?: Chapter
}) {
  const [mode, setMode] = useState<Mode>('webtoon')
  const [zoom, setZoom] = useState(100) // percent width for webtoon
  const [gap, setGap] = useState(12) // px gap between pages (webtoon)
  const [fullscreen, setFullscreen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)

  // Paged mode index (rtl / ltr)
  const [page, setPage] = useState(0)
  const pageCount = chapter.pages.length
  const isPaged = mode !== 'webtoon'

  const rootRef = useRef<HTMLDivElement>(null)

  // Reset page when mode/chapter changes
  useEffect(() => {
    setPage(0)
  }, [mode, chapter.number])

  const toggleFullscreen = useCallback(async () => {
    const el = rootRef.current
    if (!el) return
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch {
      /* fullscreen not available */
    }
  }, [])

  useEffect(() => {
    const onChange = () => setFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  // Keyboard nav for paged modes
  const goNext = useCallback(
    () => setPage((p) => Math.min(p + 1, pageCount - 1)),
    [pageCount],
  )
  const goPrev = useCallback(() => setPage((p) => Math.max(p - 1, 0)), [])

  useEffect(() => {
    if (!isPaged) return
    const onKey = (e: KeyboardEvent) => {
      // In RTL, ArrowLeft advances; in LTR ArrowRight advances
      if (mode === 'rtl') {
        if (e.key === 'ArrowLeft') goNext()
        if (e.key === 'ArrowRight') goPrev()
      } else {
        if (e.key === 'ArrowRight') goNext()
        if (e.key === 'ArrowLeft') goPrev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isPaged, mode, goNext, goPrev])

  return (
    <div
      ref={rootRef}
      className="relative min-h-dvh bg-background"
      dir={mode === 'rtl' ? 'rtl' : 'ltr'}
    >
      {/* Top toolbar */}
      <ReaderToolbar
        manga={manga}
        chapter={chapter}
        mode={mode}
        setMode={setMode}
        fullscreen={fullscreen}
        toggleFullscreen={toggleFullscreen}
        openSettings={() => setPanelOpen(true)}
      />

      {/* Settings panel */}
      <SettingsPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        mode={mode}
        zoom={zoom}
        setZoom={setZoom}
        gap={gap}
        setGap={setGap}
      />

      {/* Reading area */}
      {mode === 'webtoon' ? (
        <WebtoonView chapter={chapter} zoom={zoom} gap={gap} />
      ) : (
        <PagedView
          chapter={chapter}
          page={page}
          setPage={setPage}
          mode={mode}
          goNext={goNext}
          goPrev={goPrev}
        />
      )}

      {/* End-of-chapter / next chapter */}
      <EndOfChapter manga={manga} prev={prev} next={next} />
    </div>
  )
}

/* ---------------- Toolbar ---------------- */

function ReaderToolbar({
  manga,
  chapter,
  mode,
  setMode,
  fullscreen,
  toggleFullscreen,
  openSettings,
}: {
  manga: Manga
  chapter: Chapter
  mode: Mode
  setMode: (m: Mode) => void
  fullscreen: boolean
  toggleFullscreen: () => void
  openSettings: () => void
}) {
  return (
    <header
      dir="ltr"
      className="sticky top-0 z-40 border-b-2 border-ink bg-background/90 backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <Link
            href={`/manga/${manga.slug}`}
            aria-label="Back to series"
            className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-ink bg-card shadow-comic-sm transition-transform hover:-translate-y-0.5"
          >
            <ChevronLeft className="size-5" />
          </Link>
          <div className="min-w-0">
            <p className="line-clamp-1 text-sm font-extrabold text-foreground">
              {manga.title}
            </p>
            <p className="line-clamp-1 text-xs text-muted-foreground">
              Ch. {chapter.number} — {chapter.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode toggle */}
          <div className="flex items-center rounded-full border-2 border-ink bg-card p-0.5 shadow-comic-sm">
            {MODES.map((m) => {
              const Icon = m.icon
              const active = mode === m.id
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  aria-pressed={active}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors',
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Icon className="size-3.5" />
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={openSettings}
            aria-label="Reader settings"
            className="grid size-9 place-items-center rounded-full border-2 border-ink bg-card shadow-comic-sm transition-transform hover:-translate-y-0.5"
          >
            <Settings2 className="size-5" />
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            className="grid size-9 place-items-center rounded-full border-2 border-ink bg-card shadow-comic-sm transition-transform hover:-translate-y-0.5"
          >
            {fullscreen ? (
              <Minimize className="size-5" />
            ) : (
              <Maximize className="size-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

/* ---------------- Settings panel ---------------- */

function SettingsPanel({
  open,
  onClose,
  mode,
  zoom,
  setZoom,
  gap,
  setGap,
}: {
  open: boolean
  onClose: () => void
  mode: Mode
  zoom: number
  setZoom: (n: number) => void
  gap: number
  setGap: (n: number) => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink/40"
          />
          <motion.div
            dir="ltr"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-50 flex h-dvh w-80 max-w-[85vw] flex-col border-l-2 border-ink bg-card p-5 shadow-comic-lg"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-foreground">
                Reader Settings
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close settings"
                className="grid size-8 place-items-center rounded-full border-2 border-ink bg-background"
              >
                <X className="size-4" />
              </button>
            </div>

            {mode === 'webtoon' ? (
              <div className="flex flex-col gap-6">
                <SliderControl
                  icon={ZoomIn}
                  label="Zoom"
                  value={zoom}
                  min={50}
                  max={100}
                  step={5}
                  suffix="%"
                  onChange={setZoom}
                  onDec={() => setZoom(Math.max(50, zoom - 5))}
                  onInc={() => setZoom(Math.min(100, zoom + 5))}
                  DecIcon={ZoomOut}
                  IncIcon={ZoomIn}
                />
                <SliderControl
                  icon={MoveHorizontal}
                  label="Page gap"
                  value={gap}
                  min={0}
                  max={48}
                  step={4}
                  suffix="px"
                  onChange={setGap}
                  onDec={() => setGap(Math.max(0, gap - 4))}
                  onInc={() => setGap(Math.min(48, gap + 4))}
                  DecIcon={ZoomOut}
                  IncIcon={ZoomIn}
                />
              </div>
            ) : (
              <div className="rounded-xl border-2 border-dashed border-ink/40 bg-background p-4 text-sm text-muted-foreground">
                Zoom and gap apply to Webtoon mode. In RTL and LTR modes, use
                the arrows or your keyboard to flip pages.
              </div>
            )}

            <div className="mt-auto rounded-xl border-2 border-ink bg-background p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                Tip
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                In RTL mode the left arrow key goes forward — just like a real
                manga volume.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function SliderControl({
  icon: Icon,
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
  onDec,
  onInc,
  DecIcon,
  IncIcon,
}: {
  icon: typeof ZoomIn
  label: string
  value: number
  min: number
  max: number
  step: number
  suffix: string
  onChange: (n: number) => void
  onDec: () => void
  onInc: () => void
  DecIcon: typeof ZoomOut
  IncIcon: typeof ZoomIn
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-sm font-bold text-foreground">
          <Icon className="size-4" /> {label}
        </span>
        <span className="rounded-md border-2 border-ink bg-background px-2 py-0.5 text-xs font-extrabold tabular-nums">
          {value}
          {suffix}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDec}
          aria-label={`Decrease ${label}`}
          className="grid size-8 shrink-0 place-items-center rounded-lg border-2 border-ink bg-background"
        >
          <DecIcon className="size-4" />
        </button>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
        />
        <button
          type="button"
          onClick={onInc}
          aria-label={`Increase ${label}`}
          className="grid size-8 shrink-0 place-items-center rounded-lg border-2 border-ink bg-background"
        >
          <IncIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}

/* ---------------- Webtoon (vertical) ---------------- */

function WebtoonView({
  chapter,
  zoom,
  gap,
}: {
  chapter: Chapter
  zoom: number
  gap: number
}) {
  return (
    <div
      className="mx-auto flex flex-col items-center py-4"
      style={{ gap, width: `${zoom}%`, maxWidth: 900 }}
    >
      {chapter.pages.map((src, i) => (
        <div
          key={i}
          className="relative w-full overflow-hidden rounded-md border-2 border-ink bg-card"
        >
          <Image
            src={src || '/placeholder.svg'}
            alt={`Page ${i + 1}`}
            width={900}
            height={1350}
            loading={i < 2 ? 'eager' : 'lazy'}
            sizes="(max-width: 900px) 100vw, 900px"
            className="h-auto w-full"
          />
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-full border-2 border-ink bg-background/90 px-2 py-0.5 text-xs font-bold">
            {i + 1}/{chapter.pages.length}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ---------------- Paged (RTL / LTR) ---------------- */

function PagedView({
  chapter,
  page,
  setPage,
  mode,
  goNext,
  goPrev,
}: {
  chapter: Chapter
  page: number
  setPage: (n: number) => void
  mode: Mode
  goNext: () => void
  goPrev: () => void
}) {
  const pageCount = chapter.pages.length
  const src = chapter.pages[page]

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-3 py-4">
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: mode === 'rtl' ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === 'rtl' ? 40 : -40 }}
            transition={{ duration: 0.25 }}
            className="relative overflow-hidden rounded-md border-2 border-ink bg-card"
          >
            <Image
              src={src || '/placeholder.svg'}
              alt={`Page ${page + 1}`}
              width={900}
              height={1350}
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="mx-auto h-auto w-full"
            />
          </motion.div>
        </AnimatePresence>

        {/* Click zones */}
        <button
          type="button"
          onClick={mode === 'rtl' ? goNext : goPrev}
          aria-label={mode === 'rtl' ? 'Next page' : 'Previous page'}
          className="absolute inset-y-0 left-0 w-1/3 cursor-w-resize"
        />
        <button
          type="button"
          onClick={mode === 'rtl' ? goPrev : goNext}
          aria-label={mode === 'rtl' ? 'Previous page' : 'Next page'}
          className="absolute inset-y-0 right-0 w-1/3 cursor-e-resize"
        />
      </div>

      {/* Pager */}
      <div dir="ltr" className="mt-4 flex w-full items-center justify-between gap-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={page === 0}
          className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-card px-4 py-2 text-sm font-bold shadow-comic-sm transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-40"
        >
          <ChevronLeft className="size-4" /> Prev
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold tabular-nums text-foreground">
            {page + 1} / {pageCount}
          </span>
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={page === pageCount - 1}
          className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-card px-4 py-2 text-sm font-bold shadow-comic-sm transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-40"
        >
          Next <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Progress dots */}
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {chapter.pages.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to page ${i + 1}`}
            onClick={() => setPage(i)}
            className={cn(
              'h-2 rounded-full border border-ink transition-all',
              i === page ? 'w-6 bg-primary' : 'w-2 bg-muted',
            )}
          />
        ))}
      </div>
    </div>
  )
}

/* ---------------- End of chapter ---------------- */

function EndOfChapter({
  manga,
  prev,
  next,
}: {
  manga: Manga
  prev?: Chapter
  next?: Chapter
}) {
  return (
    <section
      dir="ltr"
      className="border-t-2 border-ink bg-card/50"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 py-12 text-center">
        <Mascot mood={next ? 'wave' : 'sleepy'} size={130} />
        <div>
          <h2 className="text-2xl font-extrabold text-foreground">
            {next ? 'End of chapter!' : 'You reached the end!'}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            {next
              ? 'Retro-chan has the next one ready for you.'
              : 'That was the latest chapter. Retro-chan is taking a nap until the next scan.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {prev ? (
            <Link
              href={`/read/${manga.slug}/${prev.number}`}
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-card px-5 py-2.5 text-sm font-bold shadow-comic-sm transition-transform hover:-translate-y-0.5"
            >
              <ChevronLeft className="size-4" /> Chapter {prev.number}
            </Link>
          ) : null}

          <Link
            href={`/manga/${manga.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-background px-5 py-2.5 text-sm font-bold shadow-comic-sm transition-transform hover:-translate-y-0.5"
          >
            <Home className="size-4" /> Series
          </Link>

          {next ? (
            <Link
              href={`/read/${manga.slug}/${next.number}`}
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-primary px-6 py-2.5 text-sm font-extrabold text-primary-foreground shadow-comic transition-transform hover:-translate-y-1"
            >
              Next Chapter <ChevronRight className="size-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}
