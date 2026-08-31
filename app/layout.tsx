import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Baloo_2, Tajawal } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { ElizabethProvider } from '@/components/ElizabethMascot'
import Elizabeth from '@/components/elizabeth'
import './globals.css'

const baloo = Baloo_2({
  subsets: ['latin'],
  variable: '--font-baloo',
  weight: ['400', '500', '600', '700', '800'],
})

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  variable: '--font-tajawal',
  weight: ['400', '500', '700', '800'],
})

export const metadata: Metadata = {
  title: 'RETRO MANGA — Rare Old Manga, Lovingly Translated',
  description:
    'RETRO MANGA is the coziest archive of rare manga, manhwa, and manhua from the 70s, 80s, and 90s — translated with love. Read with the best reader in the Arab world.',
  generator: 'v0.app',
  keywords: ['manga', 'manhwa', 'manhua', 'retro', 'translation', 'reader'],
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fdf6e3' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body className={`${baloo.variable} ${tajawal.variable} antialiased`}>
        <ThemeProvider>
          <ElizabethProvider>
            {children}
            <Elizabeth />
          </ElizabethProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
