import { SiteShell } from '@/components/site-shell'
import { BrowseView } from '@/components/browse/browse-view'

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string }>
}) {
  const { genre } = await searchParams
  return (
    <SiteShell>
      <BrowseView initialGenre={genre} />
    </SiteShell>
  )
}
