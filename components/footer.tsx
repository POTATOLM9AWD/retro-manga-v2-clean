import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Logo } from '@/components/ui-bits'

export function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-ink bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A cozy archive of rare manga, manhwa, and manhua from the 70s, 80s,
            and 90s — translated with love for a new generation.
          </p>
        </div>

        <FooterCol
          title="Explore"
          links={[
            { href: '/', label: 'Home' },
            { href: '/browse', label: 'Browse Library' },
            { href: '/browse', label: 'Latest Chapters' },
            { href: '/browse', label: 'Most Popular' },
          ]}
        />
        <FooterCol
          title="Categories"
          links={[
            { href: '/browse', label: 'Manga' },
            { href: '/browse', label: 'Manhwa' },
            { href: '/browse', label: 'Manhua' },
            { href: '/browse', label: 'Retro Classics' },
          ]}
        />
        <FooterCol
          title="Community"
          links={[
            { href: '/', label: 'Suggest a Title' },
            { href: '/', label: 'Top Voted' },
            { href: '/', label: 'Discord' },
            { href: '/', label: 'About' },
          ]}
        />
      </div>

      <div className="border-t-2 border-ink">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} RETRO MANGA. Demo UI, no real content.</p>
          <p className="inline-flex items-center gap-1.5">
            Made with{' '}
            <Heart className="size-4 fill-primary text-primary" /> for retro
            readers
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string }[]
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-foreground">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {links.map((l, i) => (
          <li key={`${l.label}-${i}`}>
            <Link
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
