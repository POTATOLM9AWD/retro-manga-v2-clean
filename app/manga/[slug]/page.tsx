import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SiteShell } from '@/components/site-shell'
import { MangaDetail } from '@/components/manga/manga-detail'
import { getManga, MANGAS } from '@/lib/data'

export function generateStaticParams() {
  return MANGAS.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const manga = getManga(slug)
  if (!manga) return { title: 'Not found — RETRO MANGA' }
  return {
    title: `${manga.title} — RETRO MANGA`,
    description: manga.description,
  }
}

export default async function MangaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const manga = getManga(slug)
  if (!manga) notFound()

  return (
    <SiteShell>
      <MangaDetail manga={manga} />
    </SiteShell>
  )
}
