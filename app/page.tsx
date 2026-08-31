import { SiteShell } from '@/components/site-shell'
import { Hero } from '@/components/home/hero'
import { LatestChapters } from '@/components/home/latest-chapters'
import { Popular } from '@/components/home/popular'
import { Categories } from '@/components/home/categories'
import { Suggestions } from '@/components/home/suggestions'

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <LatestChapters />
      <Popular />
      <Categories />
      <Suggestions />
    </SiteShell>
  )
}
