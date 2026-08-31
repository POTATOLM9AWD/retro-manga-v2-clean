'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MangaType } from '@/lib/data'

/* Brand wordmark */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('group inline-flex items-center gap-2', className)}
      aria-label="RETRO MANGA home"
    >
      <span className="grid size-9 place-items-center rounded-xl border-2 border-ink bg-[color:var(--yellow)] text-lg font-extrabold text-ink shadow-comic-sm transition-transform group-hover:-rotate-6">
        R
      </span>
      <span className="text-xl font-extrabold tracking-tight text-foreground">
        RETRO<span className="text-primary">MANGA</span>
      </span>
    </Link>
  )
}

/* Colored pill */
const pillTones = {
  pink: 'bg-primary/20 text-[color:var(--ink)] border-primary',
  blue: 'bg-secondary/30 text-[color:var(--ink)] border-secondary',
  yellow: 'bg-accent/30 text-[color:var(--ink)] border-accent',
  neutral: 'bg-muted text-muted-foreground border-border',
} as const

export function Pill({
  children,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode
  tone?: keyof typeof pillTones
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        pillTones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function TypePill({ type }: { type: MangaType }) {
  const tone = type === 'Manga' ? 'pink' : type === 'Manhwa' ? 'blue' : 'yellow'
  return <Pill tone={tone}>{type}</Pill>
}

export function Rating({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-sm font-bold text-foreground',
        className,
      )}
    >
      <Star className="size-4 fill-[color:var(--yellow)] text-[color:var(--yellow)]" />
      {value.toFixed(1)}
    </span>
  )
}

export function SectionHeading({
  kicker,
  title,
  action,
}: {
  kicker?: string
  title: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {kicker ? (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {kicker}
          </p>
        ) : null}
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground text-balance sm:text-3xl">
          {title}
        </h2>
      </div>
      {action}
    </div>
  )
}
