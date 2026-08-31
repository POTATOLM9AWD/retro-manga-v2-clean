export type MangaType = 'Manga' | 'Manhwa' | 'Manhua'
export type MangaStatus = 'Ongoing' | 'Completed' | 'Hiatus'

export type Chapter = {
  number: number
  title: string
  releasedAt: string // ISO date
  pages: string[]
}

export type Manga = {
  slug: string
  title: string
  altTitle?: string
  author: string
  cover: string
  type: MangaType
  status: MangaStatus
  year: number
  rating: number // 0-10
  votes: number
  genres: string[]
  description: string
  chapters: Chapter[]
}

// Reusable page pool (mock manga pages)
const PAGES = ['/pages/page-1.png', '/pages/page-2.png']

function makeChapters(count: number, start = '1988'): Chapter[] {
  const year = Number.parseInt(start, 10)
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1
    return {
      number: n,
      title:
        n === 1
          ? 'The Beginning'
          : n === count
            ? 'Where It All Ends'
            : `Chapter ${n}`,
      releasedAt: new Date(year + Math.floor(i / 4), (i * 2) % 12, ((i * 5) % 27) + 1)
        .toISOString(),
      // 6-10 pages per chapter, alternating from the pool
      pages: Array.from(
        { length: 6 + (n % 5) },
        (_, p) => PAGES[p % PAGES.length],
      ),
    }
  })
}

export const MANGAS: Manga[] = [
  {
    slug: 'neon-samurai',
    title: 'Neon Samurai',
    altTitle: 'ネオン・サムライ',
    author: 'Hideo Tanaka',
    cover: '/covers/neon-samurai.png',
    type: 'Manga',
    status: 'Completed',
    year: 1987,
    rating: 9.2,
    votes: 4821,
    genres: ['Action', 'Cyberpunk', 'Drama'],
    description:
      'In a rain-soaked neon Tokyo of a future that never was, a masterless swordsman trades his blade for a glowing edge of light. Hunted by the corporations he once served, he carves a path through the underworld searching for the one who stole his name. A cult classic from 1987, finally translated in full.',
    chapters: makeChapters(24, '1987'),
  },
  {
    slug: 'magical-cafe-nights',
    title: 'Magical Café Nights',
    altTitle: '魔法喫茶の夜',
    author: 'Yumi Sato',
    cover: '/covers/magical-cafe.png',
    type: 'Manhwa',
    status: 'Ongoing',
    year: 1994,
    rating: 8.7,
    votes: 3110,
    genres: ['Slice of Life', 'Fantasy', 'Romance'],
    description:
      'Every night after closing, a tiny café brews potions instead of coffee — and its shy owner discovers that the loneliest customers carry the most magical wishes. A tender, screentone-soft shoujo gem from the mid-90s.',
    chapters: makeChapters(15, '1994'),
  },
  {
    slug: 'robot-heart',
    title: 'Robot Heart',
    altTitle: 'ロボットの心',
    author: 'Kenji Maruyama',
    cover: '/covers/robot-heart.png',
    type: 'Manhua',
    status: 'Hiatus',
    year: 1979,
    rating: 8.1,
    votes: 1987,
    genres: ['Sci-Fi', 'Mecha', 'Family'],
    description:
      'When the last war machine refuses its final order, it chooses instead to protect a single orphaned child beneath a dying orange sun. A quietly devastating 1970s mecha tale about what makes a heart real.',
    chapters: makeChapters(9, '1979'),
  },
]

export const ALL_GENRES = Array.from(
  new Set(MANGAS.flatMap((m) => m.genres)),
).sort()

export const ALL_TYPES: MangaType[] = ['Manga', 'Manhwa', 'Manhua']

export const ALL_YEARS = Array.from(new Set(MANGAS.map((m) => m.year))).sort(
  (a, b) => b - a,
)

export function getManga(slug: string): Manga | undefined {
  return MANGAS.find((m) => m.slug === slug)
}

export function getChapter(slug: string, chapterNumber: number) {
  const manga = getManga(slug)
  if (!manga) return undefined
  const index = manga.chapters.findIndex((c) => c.number === chapterNumber)
  if (index === -1) return undefined
  return {
    manga,
    chapter: manga.chapters[index],
    prev: manga.chapters[index - 1],
    next: manga.chapters[index + 1],
  }
}

// "Latest chapters" feed — flatten recent chapters across mangas
export function getLatestChapters(limit = 8) {
  return MANGAS.flatMap((m) =>
    m.chapters.slice(-3).map((c) => ({
      manga: m,
      chapter: c,
    })),
  )
    .sort(
      (a, b) =>
        new Date(b.chapter.releasedAt).getTime() -
        new Date(a.chapter.releasedAt).getTime(),
    )
    .slice(0, limit)
}

export function getPopular() {
  return [...MANGAS].sort((a, b) => b.votes - a.votes)
}

export type Suggestion = {
  id: string
  title: string
  by: string
  votes: number
  note: string
}

export const SUGGESTIONS: Suggestion[] = [
  {
    id: 's1',
    title: 'Galaxy Express Diner',
    by: 'otaku_1985',
    votes: 342,
    note: 'That old space cooking manga nobody scanned yet!',
  },
  {
    id: 's2',
    title: 'Sakura Detective Club',
    by: 'mangaqueen',
    votes: 289,
    note: '90s mystery shoujo, please translate volume 3+',
  },
  {
    id: 's3',
    title: 'Iron Alley Boys',
    by: 'retro_reader',
    votes: 201,
    note: 'Delinquent classic, RTL scans would be perfect.',
  },
  {
    id: 's4',
    title: 'Moonlight Ramen',
    by: 'nightowl',
    votes: 156,
    note: 'Cozy food manga from 1991, only raws exist.',
  },
]
