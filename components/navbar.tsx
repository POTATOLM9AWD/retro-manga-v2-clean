'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, Home, Library, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui-bits'
import { ThemeToggle } from '@/components/theme-toggle'
import { useFavorites } from '@/lib/favorites'

const LINKS = [
  { href: '/', label: 'الرئيسية', icon: Home },
  { href: '/browse', label: 'المكتبة', icon: Library },
  { href: '/favorites', label: 'المفضلة', icon: Heart },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { count, ready } = useFavorites()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const labelFor = (href: string, label: string) =>
    href === '/favorites' && ready ? `${label} (${count})` : label

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'relative rounded-full px-4 py-2 text-sm font-bold transition-colors',
                isActive(l.href)
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {isActive(l.href) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-full border-2 border-ink bg-[color:var(--yellow)]/60"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {labelFor(l.href, l.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/browse"
            aria-label="ابحث عن مانجا"
            className="hidden size-10 place-items-center rounded-full border-2 border-ink bg-card shadow-comic-sm transition-transform hover:-translate-y-0.5 sm:grid"
          >
            <Search className="size-5" />
          </Link>
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border-2 border-ink bg-card shadow-comic-sm md:hidden"
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t-2 border-ink bg-background md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {LINKS.map((l) => {
                const Icon = l.icon
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-sm font-bold transition-colors',
                      isActive(l.href)
                        ? 'border-ink bg-[color:var(--yellow)]/60 text-foreground'
                        : 'border-transparent text-muted-foreground hover:bg-muted',
                    )}
                  >
                    <Icon className="size-5" />
                    {labelFor(l.href, l.label)}
                  </Link>
                )
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
