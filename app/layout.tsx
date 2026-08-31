import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Baloo_2, Tajawal } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
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
  title: 'ريترو مانجا — مانجا نادرة قديمة، مترجمة بحب',
  description:
    'ريترو مانجا هو أدفأ أرشيف للمانجا والمانهوا والمانها النادرة من السبعينات والثمانينات والتسعينات — مترجمة بحب. اقرأ مع أفضل قارئ في العالم العربي.',
  generator: 'v0.app',
  keywords: ['مانجا', 'مانهوا', 'مانها', 'ريترو', 'ترجمة', 'قارئ', 'manga'],
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
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className="bg-background"
    >
      <body
        className={`${baloo.variable} ${tajawal.variable} font-arabic antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
