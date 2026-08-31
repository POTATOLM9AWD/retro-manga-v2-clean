'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type MascotMood = 'wave' | 'sleepy' | 'confused'

const SRC: Record<MascotMood, string> = {
  wave: '/mascot/retro-chan.png',
  sleepy: '/mascot/retro-chan-sleepy.png',
  confused: '/mascot/retro-chan-confused.png',
}

const ALT: Record<MascotMood, string> = {
  wave: 'Retro-chan, a cute cat mascot in glasses and a kimono, waving hello',
  sleepy: 'Retro-chan, a cute cat mascot, sleepily dozing off',
  confused: 'Retro-chan, a cute cat mascot, looking confused and lost',
}

export function Mascot({
  mood = 'wave',
  size = 160,
  float = true,
  className,
  priority = false,
}: {
  mood?: MascotMood
  size?: number
  float?: boolean
  className?: string
  priority?: boolean
}) {
  return (
    <motion.div
      className={cn('relative select-none', className)}
      style={{ width: size, height: size }}
      animate={
        float
          ? { y: [0, -10, 0], rotate: [-2, 2, -2] }
          : undefined
      }
      transition={
        float
          ? { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          : undefined
      }
    >
      <Image
        src={SRC[mood] || '/placeholder.svg'}
        alt={ALT[mood]}
        fill
        sizes={`${size}px`}
        priority={priority}
        className="object-contain drop-shadow-[3px_5px_0_rgba(58,47,42,0.15)]"
      />
    </motion.div>
  )
}
