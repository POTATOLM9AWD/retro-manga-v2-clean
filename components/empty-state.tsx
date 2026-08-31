import { Mascot } from '@/components/mascot'

export function EmptyState({
  title = 'لا يوجد شيء هنا بعد',
  message = 'بحثت إليزابيث في كل مكان لكنها لم تجد ما يطابق طلبك.',
  mood = 'confused',
}: {
  title?: string
  message?: string
  mood?: 'wave' | 'sleepy' | 'confused'
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-ink/40 bg-card/50 px-6 py-14 text-center">
      <Mascot mood={mood} size={140} />
      <h3 className="text-xl font-extrabold text-foreground text-balance">
        {title}
      </h3>
      <p className="max-w-sm text-sm text-muted-foreground text-pretty">
        {message}
      </p>
    </div>
  )
}
