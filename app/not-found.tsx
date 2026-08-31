import Link from 'next/link'
import { Home, Library } from 'lucide-react'
import { Mascot } from '@/components/mascot'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="halftone pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" />
      <Mascot mood="confused" size={200} priority />
      <div>
        <p className="text-sm font-extrabold uppercase tracking-[0.3em] text-primary">
          Error 404
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          This page got lost in the archive
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground text-pretty">
          Retro-chan searched every dusty shelf but could not find this one.
          Maybe it was never scanned?
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground shadow-comic transition-transform hover:-translate-y-1"
        >
          <Home className="size-5" /> Back Home
        </Link>
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-card px-6 py-3 text-sm font-extrabold text-foreground shadow-comic transition-transform hover:-translate-y-1"
        >
          <Library className="size-5" /> Browse Library
        </Link>
      </div>
    </div>
  )
}
