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
            أرشيف مريح للمانجا والمانهوا والمانها النادرة من السبعينات
            والثمانينات والتسعينات — مترجمة بحب لجيل جديد.
          </p>
        </div>

        <FooterCol
          title="استكشف"
          links={[
            { href: '/', label: 'الرئيسية' },
            { href: '/browse', label: 'تصفح المكتبة' },
            { href: '/browse', label: 'أحدث الفصول' },
            { href: '/browse', label: 'الأكثر رواجاً' },
          ]}
        />
        <FooterCol
          title="التصنيفات"
          links={[
            { href: '/browse', label: 'مانجا' },
            { href: '/browse', label: 'مانهوا' },
            { href: '/browse', label: 'مانها' },
            { href: '/browse', label: 'كلاسيكيات ريترو' },
          ]}
        />
        <FooterCol
          title="المجتمع"
          links={[
            { href: '/', label: 'اقترح عنواناً' },
            { href: '/', label: 'الأعلى تصويتاً' },
            { href: '/favorites', label: 'المفضلة' },
            { href: '/', label: 'عن الموقع' },
          ]}
        />
      </div>

      <div className="border-t-2 border-ink">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} ريترو مانجا. واجهة تجريبية، بدون محتوى حقيقي.</p>
          <p className="inline-flex items-center gap-1.5">
            صُنع بـ{' '}
            <Heart className="size-4 fill-primary text-primary" /> لعشّاق
            الريترو
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
