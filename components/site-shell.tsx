import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ElizabethWalker } from '@/components/elizabeth'

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ElizabethWalker />
    </div>
  )
}
