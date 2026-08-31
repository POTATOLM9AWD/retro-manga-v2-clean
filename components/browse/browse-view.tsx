'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import {
  MANGAS,
  ALL_TYPES,
  ALL_GENRES,
  ALL_YEARS,
  type MangaType,
} from '@/lib/data'
import { MangaCard } from '@/components/manga-card'
import { EmptyState } from '@/components/empty-state'
import { cn } from '@/lib/utils'

export function BrowseView({ initialGenre }: { initialGenre?: string }) {
  const [query, setQuery] = useState('')
  const [type, setType] = useState<MangaType | 'All'>('All')
  const [genre, setGenre] = useState<string>(initialGenre ?? 'All')
  const [year, setYear] = useState<number | 'All'>('All')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return MANGAS.filter((m) => {
      const matchesQuery =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.altTitle?.toLowerCase().includes(q) ||
        m.author.toLowerCase().includes(q)
      const matchesType = type === 'All' || m.type === type
      const matchesGenre = genre === 'All' || m.genres.includes(genre)
      const matchesYear = year === 'All' || m.year === year
      return matchesQuery && matchesType && matchesGenre && matchesYear
    })
  }, [query, type, genre, year])

  const hasFilters =
    query || type !== 'All' || genre !== 'All' || year !== 'All'

  const reset = () => {
    setQuery('')
    setType('All')
    setGenre('All')
    setYear('All')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-2 flex items-center gap-2 text-primary">
        <SlidersHorizontal className="size-4" />
        <span className="text-xs font-bold uppercase tracking-[0.2em]">
          The Library
        </span>
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Browse the Archive
      </h1>

      {/* Search bar */}
      <div className="mt-6 flex items-center gap-2 rounded-2xl border-2 border-ink bg-card px-4 py-1 shadow-comic">
        <Search className="size-5 shrink-0 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, or original name…"
          aria-label="Search manga by name"
          className="w-full bg-transparent py-3 text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-muted"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4">
        <FilterRow label="Type">
          <Chip active={type === 'All'} onClick={() => setType('All')}>
            All
          </Chip>
          {ALL_TYPES.map((t) => (
            <Chip key={t} active={type === t} onClick={() => setType(t)}>
              {t}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Genre">
          <Chip active={genre === 'All'} onClick={() => setGenre('All')}>
            All
          </Chip>
          {ALL_GENRES.map((g) => (
            <Chip key={g} active={genre === g} onClick={() => setGenre(g)}>
              {g}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Year">
          <Chip active={year === 'All'} onClick={() => setYear('All')}>
            All
          </Chip>
          {ALL_YEARS.map((y) => (
            <Chip key={y} active={year === y} onClick={() => setYear(y)}>
              {y}
            </Chip>
          ))}
        </FilterRow>
      </div>

      {/* Results header */}
      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm font-semibold text-muted-foreground">
          {results.length} result{results.length === 1 ? '' : 's'}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-card px-3 py-1.5 text-xs font-bold text-foreground shadow-comic-sm transition-transform hover:-translate-y-0.5"
          >
            <X className="size-3.5" /> Reset filters
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="mt-4">
        {results.length === 0 ? (
          <EmptyState
            title="No manga found"
            message="Try a different title, or reset the filters and let Retro-chan fetch you something else."
          />
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {results.map((m, i) => (
                <motion.div key={m.slug} layout>
                  <MangaCard manga={m} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function FilterRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="w-16 shrink-0 text-sm font-extrabold text-foreground">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border-2 px-3.5 py-1.5 text-sm font-bold transition-all',
        active
          ? 'border-ink bg-primary text-primary-foreground shadow-comic-sm'
          : 'border-border bg-card text-muted-foreground hover:border-ink hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}
