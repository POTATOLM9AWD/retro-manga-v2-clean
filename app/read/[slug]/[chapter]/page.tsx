import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Reader } from '@/components/reader/reader'
import { getChapter, MANGAS } from '@/lib/data'

export function generateStaticParams() {
  return MANGAS.flatMap((m) =>
    m.chapters.map((c) => ({ slug: m.slug, chapter: String(c.number) })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; chapter: string }>
}): Promise<Metadata> {
  const { slug, chapter } = await params
  const data = getChapter(slug, Number.parseInt(chapter, 10))
  if (!data) return { title: 'Not found — RETRO MANGA' }
  return {
    title: `${data.manga.title} · Ch. ${data.chapter.number} — RETRO MANGA`,
    description: `Read ${data.manga.title} chapter ${data.chapter.number}: ${data.chapter.title}.`,
  }
}

export default async function ReadPage({
  params,
}: {
  params: Promise<{ slug: string; chapter: string }>
}) {
  const { slug, chapter } = await params
  const chapterNumber = Number.parseInt(chapter, 10)
  if (Number.isNaN(chapterNumber)) notFound()

  const data = getChapter(slug, chapterNumber)
  if (!data) notFound()

  return (
    <Reader
      manga={data.manga}
      chapter={data.chapter}
      prev={data.prev}
      next={data.next}
    />
  )
}
