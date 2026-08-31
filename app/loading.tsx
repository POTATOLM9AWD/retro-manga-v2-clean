import { Mascot } from '@/components/mascot'

export default function Loading() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
      <Mascot mood="sleepy" size={150} priority />
      <p className="text-lg font-extrabold text-foreground">
        Retro-chan is dusting off the pages
      </p>
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="size-2.5 animate-bounce rounded-full bg-primary [animation-delay:-0.2s]" />
        <span className="size-2.5 animate-bounce rounded-full bg-secondary [animation-delay:-0.1s]" />
        <span className="size-2.5 animate-bounce rounded-full bg-accent" />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  )
}
