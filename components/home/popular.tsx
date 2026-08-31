import Link from 'next/link'
import { getPopular } from '@/lib/data'
import { MangaCard } from '@/components/manga-card'
import { SectionHeading } from '@/components/ui-bits'

export function Popular() {
  const items = getPopular()

  return (
    <section className="border-y-2 border-ink bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <SectionHeading
          kicker="Reader favorites"
          title="Most Popular"
          action={
            <Link
              href="/browse"
              className="text-sm font-bold text-primary hover:underline"
            >
              View all
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((m, i) => (
            <MangaCard key={m.slug} manga={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
